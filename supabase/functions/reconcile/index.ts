// Milaan matching engine.
//
// Pulls the committed synthetic dataset straight from the public repo,
// normalizes it, runs it through three matching stages (exact -> fuzzy ->
// Gemini), and writes a full audit trail to Supabase. Every decision gets
// a logged reason, whether it resolved a transaction or flagged it as an
// exception — that log is the actual deliverable, not the match itself.
//
// Invoke with POST (no body needed): reads seed/data from
// generator/output/*.csv on the `master` branch of nikhilcherry/milaan.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DATA_BASE = "https://raw.githubusercontent.com/nikhilcherry/milaan/master/generator/output";
const AMOUNT_TOLERANCE_FLAT = 20; // rupees
const AMOUNT_TOLERANCE_PCT = 0.02;
const DATE_TOLERANCE_DAYS = 1;

type Source = "ledger" | "settlement" | "bank";

interface NormalizedRow {
  source: Source;
  date: string;
  amount: number;
  reference_id: string;
  counterparty: string | null;
  raw_row: Record<string, unknown>;
}

interface StoredRow extends NormalizedRow {
  id: string;
}

interface MatchDecision {
  transaction_ids: string[];
  match_stage: "exact" | "fuzzy" | "gemini";
  confidence: number | null;
  status: "matched" | "exception";
  reason: string;
}

// ---------- CSV ----------

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] ?? ""));
    return row;
  });
}

// ---------- normalize ----------

function ddmmyyyyToIso(d: string): string {
  const [dd, mm, yyyy] = d.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

function extractBankReference(narration: string): string {
  const m = narration.match(/([A-Z]{2,})0*(\d{3,})/);
  if (!m) return narration;
  return `${m[1]}-${m[2]}`;
}

function normalizeLedger(row: Record<string, string>): NormalizedRow {
  return {
    source: "ledger",
    date: row["Date"],
    amount: Number(row["Amount"]),
    reference_id: row["Invoice No"],
    counterparty: row["Party"] || null,
    raw_row: row,
  };
}

function normalizeSettlement(row: Record<string, string>): NormalizedRow {
  return {
    source: "settlement",
    date: row["settled_at"],
    amount: Number(row["amount"]) / 100,
    reference_id: row["notes.reference"],
    counterparty: null,
    raw_row: row,
  };
}

function normalizeBank(row: Record<string, string>): NormalizedRow {
  return {
    source: "bank",
    date: ddmmyyyyToIso(row["value_date"]),
    amount: Number(row["amount"]),
    reference_id: extractBankReference(row["narration"]),
    counterparty: null,
    raw_row: row,
  };
}

// ---------- matching helpers ----------

function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00Z`).getTime();
  const db = new Date(`${b}T00:00:00Z`).getTime();
  return Math.abs(da - db) / 86_400_000;
}

function amountTolerance(...amounts: number[]): number {
  return Math.max(AMOUNT_TOLERANCE_FLAT, AMOUNT_TOLERANCE_PCT * Math.max(...amounts));
}

function amountsAgree(rows: StoredRow[]): boolean {
  const tol = amountTolerance(...rows.map((r) => r.amount));
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      if (Math.abs(rows[i].amount - rows[j].amount) > tol) return false;
    }
  }
  return true;
}

function datesAgree(rows: StoredRow[]): boolean {
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      if (daysBetween(rows[i].date, rows[j].date) > DATE_TOLERANCE_DAYS) return false;
    }
  }
  return true;
}

function maxAmountDelta(rows: StoredRow[]): number {
  const amounts = rows.map((r) => r.amount);
  return Math.max(...amounts) - Math.min(...amounts);
}

function maxDateDelta(rows: StoredRow[]): number {
  let max = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      max = Math.max(max, daysBetween(rows[i].date, rows[j].date));
    }
  }
  return max;
}

async function askGemini(
  apiKey: string,
  rows: StoredRow[],
): Promise<{ match: boolean; reason: string } | null> {
  const prompt = `You are reconciling financial transactions across three sources for an Indian merchant. Below are candidate records that could be the same underlying transaction. Sources: ledger (merchant's own book), settlement (Razorpay settlement report), bank (bank statement).

${rows.map((r) => `- ${r.source}: reference="${r.reference_id}", date=${r.date}, amount=₹${r.amount.toFixed(2)}, raw=${JSON.stringify(r.raw_row)}`).join("\n")}

Are these the same underlying transaction? Reply with strict JSON only: {"match": true|false, "reason": "<one plain-English sentence, under 25 words>"}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    const parsed = JSON.parse(text);
    if (typeof parsed.match !== "boolean" || typeof parsed.reason !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

// ---------- main ----------

Deno.serve(async () => {
  try {
    const [ledgerCsv, settlementCsv, bankCsv, runConfigRaw] = await Promise.all([
      fetch(`${DATA_BASE}/ledger.csv`).then((r) => r.text()),
      fetch(`${DATA_BASE}/settlements.csv`).then((r) => r.text()),
      fetch(`${DATA_BASE}/bank.csv`).then((r) => r.text()),
      fetch(`${DATA_BASE}/run_config.json`).then((r) => r.text()),
    ]);
    const runConfig = JSON.parse(runConfigRaw);

    const ledgerRows = parseCsv(ledgerCsv).map(normalizeLedger);
    const settlementRows = parseCsv(settlementCsv).map(normalizeSettlement);
    const bankRows = parseCsv(bankCsv).map(normalizeBank);

    const secretKeys = (() => {
      try {
        return JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
      } catch {
        return {};
      }
    })();
    const serviceKey = secretKeys.default ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey!);
    const geminiKey = Deno.env.get("GEMINI_API_KEY");

    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .insert({ seed: runConfig.seed, total_records: 0, exception_count: 0 })
      .select()
      .single();
    if (batchError || !batch) throw new Error(`batch insert failed: ${batchError?.message}`);
    const batchId = batch.id as string;

    async function insertSource(rows: NormalizedRow[]): Promise<StoredRow[]> {
      if (rows.length === 0) return [];
      const { data, error } = await supabase
        .from("raw_transactions")
        .insert(rows.map((r) => ({ ...r, batch_id: batchId })))
        .select("id");
      if (error || !data) throw new Error(`raw_transactions insert failed: ${error?.message}`);
      return rows.map((r, i) => ({ ...r, id: data[i].id as string }));
    }

    const ledger = await insertSource(ledgerRows);
    const settlement = await insertSource(settlementRows);
    const bank = await insertSource(bankRows);

    const claimed = new Set<string>();
    const decisions: MatchDecision[] = [];
    const pendingReview: StoredRow[][] = []; // groups worth a Gemini look

    function groupByRef(rows: StoredRow[]): Map<string, StoredRow[]> {
      const map = new Map<string, StoredRow[]>();
      for (const r of rows) {
        const arr = map.get(r.reference_id) ?? [];
        arr.push(r);
        map.set(r.reference_id, arr);
      }
      return map;
    }
    const ledgerByRef = groupByRef(ledger);
    const settlementByRef = groupByRef(settlement);
    const bankByRef = groupByRef(bank);
    const allRefs = new Set([...ledgerByRef.keys(), ...settlementByRef.keys(), ...bankByRef.keys()]);

    // Stage 1 — exact reference match
    for (const ref of allRefs) {
      const l = ledgerByRef.get(ref) ?? [];
      const s = settlementByRef.get(ref) ?? [];
      const b = bankByRef.get(ref) ?? [];
      if (l.length > 1 || s.length > 1 || b.length > 1) {
        const dupIn: string[] = [];
        if (l.length > 1) dupIn.push(`ledger (${l.length}x)`);
        if (s.length > 1) dupIn.push(`settlement (${s.length}x)`);
        if (b.length > 1) dupIn.push(`bank (${b.length}x)`);
        const rows = [...l, ...s, ...b];
        decisions.push({
          transaction_ids: rows.map((r) => r.id),
          match_stage: "exact",
          confidence: 0,
          status: "exception",
          reason: `Duplicate reference "${ref}" — found ${dupIn.join(", ")}.`,
        });
        rows.forEach((r) => claimed.add(r.id));
        continue;
      }
      if (l.length === 1 && s.length === 1 && b.length === 1) {
        const rows = [l[0], s[0], b[0]];
        if (amountsAgree(rows) && datesAgree(rows)) {
          const exact = maxAmountDelta(rows) === 0 && maxDateDelta(rows) === 0;
          decisions.push({
            transaction_ids: rows.map((r) => r.id),
            match_stage: exact ? "exact" : "fuzzy",
            confidence: exact ? 1 : 0.85,
            status: "matched",
            reason: exact
              ? "Reference, amount, and date agree exactly across ledger, settlement, and bank."
              : `Reference matches exactly; amount/date differ within tolerance (Δamount ≤ ₹${maxAmountDelta(rows).toFixed(2)}, Δdate ≤ ${maxDateDelta(rows)}d, likely T+1 settlement lag or a small fee).`,
          });
          rows.forEach((r) => claimed.add(r.id));
        } else {
          // same reference, but genuinely out of tolerance — worth a second opinion
          pendingReview.push(rows);
          rows.forEach((r) => claimed.add(r.id));
        }
      }
      // partial presence (1-2 sources only) falls through to stage 2 unclaimed pool
    }

    // Stage 2 — fuzzy cross-reference match on amount + date for whatever's left unclaimed
    const leftover = {
      ledger: ledger.filter((r) => !claimed.has(r.id)),
      settlement: settlement.filter((r) => !claimed.has(r.id)),
      bank: bank.filter((r) => !claimed.has(r.id)),
    };

    function findFuzzyCandidate(anchor: StoredRow, pool: StoredRow[]): StoredRow | null {
      let best: StoredRow | null = null;
      let bestScore = Infinity;
      for (const cand of pool) {
        if (claimed.has(cand.id)) continue;
        const tol = amountTolerance(anchor.amount, cand.amount);
        if (Math.abs(anchor.amount - cand.amount) > tol) continue;
        if (daysBetween(anchor.date, cand.date) > DATE_TOLERANCE_DAYS) continue;
        const score = Math.abs(anchor.amount - cand.amount) + daysBetween(anchor.date, cand.date) * 1000;
        if (score < bestScore) {
          bestScore = score;
          best = cand;
        }
      }
      return best;
    }

    // Anchor from every source in turn — a transaction can be missing from
    // *any* one source, not just ledger, and each case needs to pair up
    // correctly rather than falling through as two disconnected solo rows.
    const pools: Record<Source, StoredRow[]> = {
      ledger: leftover.ledger,
      settlement: leftover.settlement,
      bank: leftover.bank,
    };
    const otherTwo = (s: Source): [Source, Source] =>
      (["ledger", "settlement", "bank"] as Source[]).filter((x) => x !== s) as [Source, Source];

    for (const anchorSource of ["ledger", "settlement", "bank"] as Source[]) {
      for (const anchor of pools[anchorSource]) {
        if (claimed.has(anchor.id)) continue;
        const [o1, o2] = otherTwo(anchorSource);
        const c1 = findFuzzyCandidate(anchor, pools[o1]);
        const c2 = findFuzzyCandidate(anchor, pools[o2]);
        if (c1 && c2) {
          const rows = [anchor, c1, c2];
          decisions.push({
            transaction_ids: rows.map((r) => r.id),
            match_stage: "fuzzy",
            confidence: 0.75,
            status: "matched",
            reason: `Amount and date align within tolerance across all three sources (Δamount ≤ ₹${maxAmountDelta(rows).toFixed(2)}, Δdate ≤ ${maxDateDelta(rows)}d), even though references were written differently.`,
          });
          rows.forEach((r) => claimed.add(r.id));
        } else if (c1 || c2) {
          pendingReview.push([anchor, (c1 ?? c2)!]);
          claimed.add(anchor.id);
          claimed.add((c1 ?? c2)!.id);
        }
      }
    }

    // Stage 3 — Gemini fallback (or honest degradation) for ambiguous multi-source candidates.
    // Every group here has 2 or 3 rows (see how pendingReview is populated above).
    for (const rows of pendingReview) {
      const involvedSources = new Set(rows.map((r) => r.source));
      const missingSources = (["ledger", "settlement", "bank"] as Source[]).filter(
        (s) => !involvedSources.has(s),
      );

      let verdict: { match: boolean; reason: string } | null = null;
      if (geminiKey) verdict = await askGemini(geminiKey, rows);

      if (verdict) {
        decisions.push({
          transaction_ids: rows.map((r) => r.id),
          match_stage: "gemini",
          confidence: verdict.match ? 0.6 : 0,
          status: verdict.match ? "matched" : "exception",
          reason: verdict.reason,
        });
      } else {
        const reasonParts = [
          `Δamount = ₹${maxAmountDelta(rows).toFixed(2)}`,
          `Δdate = ${maxDateDelta(rows)}d`,
        ];
        if (missingSources.length) reasonParts.push(`absent from ${missingSources.join(", ")}`);
        decisions.push({
          transaction_ids: rows.map((r) => r.id),
          match_stage: "gemini",
          confidence: null,
          status: "exception",
          reason: `Candidate found but outside auto-match tolerance (${reasonParts.join(", ")}). Gemini adjudication ${geminiKey ? "returned no verdict" : "not configured"} — flagged for manual review.`,
        });
      }
    }

    // Rows with no candidate anywhere within tolerance — genuinely present in
    // only one source.
    for (const r of [...leftover.ledger, ...leftover.settlement, ...leftover.bank]) {
      if (claimed.has(r.id)) continue;
      const others = (["ledger", "settlement", "bank"] as Source[]).filter((s) => s !== r.source);
      decisions.push({
        transaction_ids: [r.id],
        match_stage: "fuzzy",
        confidence: 0,
        status: "exception",
        reason: `Present only in ${r.source} (reference "${r.reference_id}", ₹${r.amount.toFixed(2)}) — no candidate found in ${others.join(" or ")} within tolerance.`,
      });
      claimed.add(r.id);
    }

    const { error: matchError } = await supabase.from("match_results").insert(
      decisions.map((d) => ({ ...d, batch_id: batchId })),
    );
    if (matchError) throw new Error(`match_results insert failed: ${matchError.message}`);

    const totalRecords = ledger.length + settlement.length + bank.length;
    const exceptionCount = decisions.filter((d) => d.status === "exception").length;
    const matchedCount = decisions.filter((d) => d.status === "matched").length;
    const matchRate = decisions.length ? matchedCount / decisions.length : 0;

    await supabase
      .from("batches")
      .update({ total_records: totalRecords, match_rate: matchRate, exception_count: exceptionCount })
      .eq("id", batchId);

    return Response.json({
      batch_id: batchId,
      total_records: totalRecords,
      decisions: decisions.length,
      matched: matchedCount,
      exceptions: exceptionCount,
      match_rate: matchRate,
      gemini_configured: Boolean(geminiKey),
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
});
