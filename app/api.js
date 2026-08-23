// Talks to the live Supabase project and shapes the raw rows into what the
// dashboard components expect. The anon key is safe to ship client-side —
// row level security only grants it public SELECT, nothing else.
window.MilaanAPI = (function () {
  const SUPABASE_URL = "https://rhircihyzromoynqvmya.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaXJjaWh5enJvbW95bnF2bXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NzI2MzIsImV4cCI6MjEwMzA0ODYzMn0.UP-zHYcGLJcMNyE6HbBgxJdd8bStHdB3k-Yij4yu7eI";
  const headers = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` };

  async function get(path) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers });
    if (!res.ok) throw new Error(`Supabase request failed (${res.status}): ${path}`);
    return res.json();
  }

  function classify(match) {
    const r = match.reason;
    if (r.startsWith("Duplicate reference")) return "duplicate";
    if (r.startsWith("Present only in")) return "missing";
    if (r.includes("absent from")) {
      const hasDelta = /Δamount = ₹(?!0\.00)/.test(r) || /Δdate = (?!0d)/.test(r);
      return hasDelta ? "variance" : "partial";
    }
    return match.status === "matched" ? "matched" : "variance";
  }

  function buildRow(match, txById) {
    const rows = match.transaction_ids.map((id) => txById[id]).filter(Boolean);
    const bySource = { ledger: null, settlement: null, bank: null };
    for (const r of rows) if (!bySource[r.source]) bySource[r.source] = r;
    const primary = bySource.ledger || bySource.settlement || bySource.bank || rows[0];

    const amounts = rows.map((r) => Number(r.amount));
    const variance = amounts.length ? Math.max(...amounts) - Math.min(...amounts) : 0;
    const dates = new Set(rows.map((r) => r.date));
    const refs = new Set(rows.map((r) => r.reference_id));

    const disagree = [];
    if (variance > 0) disagree.push("amount");
    if (dates.size > 1) disagree.push("date");
    if (refs.size > 1) disagree.push("reference");

    const records = {};
    for (const s of ["ledger", "settlement", "bank"]) {
      if (bySource[s]) {
        records[s] = {
          amount: Number(bySource[s].amount),
          date: bySource[s].date,
          reference: bySource[s].reference_id,
        };
      }
    }

    return {
      id: match.id,
      date: primary ? primary.date : null,
      cp: bySource.ledger ? bySource.ledger.counterparty : "—",
      sources: { ledger: !!bySource.ledger, settlement: !!bySource.settlement, bank: !!bySource.bank },
      why: match.reason,
      amount: primary ? Number(primary.amount) : 0,
      variance,
      state: classify(match),
      signal: match.match_stage === "gemini" ? "review" : "break",
      stage: match.match_stage,
      status: match.status,
      confidence: match.confidence,
      records,
      disagree,
      note: match.reason,
      rawRows: rows,
    };
  }

  async function loadLatestBatch() {
    const [batch] = await get("batches?select=*&order=run_at.desc&limit=1");
    if (!batch) return null;

    const [transactions, matches] = await Promise.all([
      get(`raw_transactions?batch_id=eq.${batch.id}&select=*`),
      get(`match_results?batch_id=eq.${batch.id}&select=*&order=created_at.asc`),
    ]);
    const txById = Object.fromEntries(transactions.map((t) => [t.id, t]));

    const exceptions = matches
      .filter((m) => m.status === "exception")
      .map((m) => buildRow(m, txById))
      .sort((a, b) => b.amount - a.amount);
    const matchedRows = matches
      .filter((m) => m.status === "matched")
      .map((m) => buildRow(m, txById))
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    const stageCounts = matches.reduce((acc, m) => {
      acc[m.match_stage] = (acc[m.match_stage] ?? 0) + 1;
      return acc;
    }, {});
    const sourceCounts = transactions.reduce((acc, t) => {
      acc[t.source] = (acc[t.source] ?? 0) + 1;
      return acc;
    }, {});

    const totalAmount = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const exceptionAmount = exceptions.reduce((sum, r) => sum + r.amount, 0);
    const matchedAmount = matchedRows.reduce((sum, r) => sum + r.amount, 0);

    return {
      batch,
      transactions,
      matches,
      exceptions,
      matchedRows,
      stats: {
        totalDecisions: matches.length,
        matchedCount: matchedRows.length,
        exceptionCount: exceptions.length,
        underReviewCount: exceptions.filter((r) => r.stage === "gemini").length,
        matchRate:
          batch.match_rate != null
            ? Number(batch.match_rate)
            : matches.length
              ? matchedRows.length / matches.length
              : 0,
        totalAmount,
        exceptionAmount,
        matchedAmount,
        totalRecords: batch.total_records,
        stageCounts,
        sourceCounts,
      },
    };
  }

  return { loadLatestBatch };
})();
