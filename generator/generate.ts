// Reproducible synthetic dataset for Milaan's 3-way reconciliation demo.
// Same seed -> byte-identical output, so the dashboard, the pitch numbers,
// and the demo video all come from one traceable run.
//
// Usage: npm run generate -- [--seed=88231] [--count=120] [--out=./output]

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

function arg(name: string, fallback: string): string {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

const SEED = Number(arg("seed", "88231"));
const COUNT = Number(arg("count", "120"));
const OUT_DIR = arg("out", join(import.meta.dirname, "output"));

// mulberry32 — small, deterministic, no dependency
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;
const pick = <T,>(arr: readonly T[]): T => arr[randInt(0, arr.length - 1)];
function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const COUNTERPARTIES = [
  "Meridian Foods Pvt Ltd", "Kavya Textiles", "BluePeak Logistics", "Rana Electricals",
  "Saffron & Co", "Verve Retail", "Orbit Analytics", "Copper Kettle Cafe",
  "Nimbus Cloud Services", "Falcon Freight", "Ashoka Traders", "Lumen Design Studio",
  "Ridgeline Hardware", "Petal & Stem", "Coral Bay Hospitality", "Zenith Motors",
  "Harbor Point Exports", "Aster Wellness",
] as const;

type Source = "ledger" | "settlement" | "bank";
const SOURCES: readonly Source[] = ["ledger", "settlement", "bank"];

type BreakType = "clean" | "missing" | "duplicate" | "date_drift" | "amount_mismatch" | "format_diff";
const BREAK_TYPES: readonly BreakType[] = ["missing", "duplicate", "date_drift", "amount_mismatch", "format_diff"];

interface GroundTruthTxn {
  id: string;
  reference: string;
  date: string;
  amount: number;
  counterparty: string;
  breakType: BreakType;
  breakDetail: Record<string, unknown>;
}

const isoDate = (day: number) => `2026-08-${String(day).padStart(2, "0")}`;
const ddmmyyyy = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
const rupees = (n: number) => n.toFixed(2);
const paise = (n: number) => String(Math.round(n * 100));
const randRef = (n: number) => `INV-${n}`;

// Banks strip punctuation from references in narration text — that's just
// how bank feeds look, not a "break" we're modeling.
const bankRefFromCanonical = (ref: string) => ref.replace("-", "");

const FORMAT_CORRUPTIONS: ReadonlyArray<{ name: string; apply: (ref: string) => string }> = [
  { name: "lowercase", apply: (ref) => ref.toLowerCase() },
  { name: "zero-padded", apply: (ref) => ref.replace(/(\d+)/, (m) => m.padStart(m.length + 2, "0")) },
  { name: "prefix-swap", apply: (ref) => ref.replace("INV-", "REF") },
  { name: "underscore", apply: (ref) => ref.replace("-", "_") },
];

mkdirSync(OUT_DIR, { recursive: true });

const cleanCount = Math.round(COUNT * 0.65);
const breakCount = COUNT - cleanCount;
const perType = Math.floor(breakCount / BREAK_TYPES.length);
const remainder = breakCount - perType * BREAK_TYPES.length;
const typeAssignment: BreakType[] = [
  ...Array<BreakType>(cleanCount).fill("clean"),
  ...BREAK_TYPES.flatMap((t, i) => Array<BreakType>(perType + (i < remainder ? 1 : 0)).fill(t)),
];
const shuffledTypes = shuffle(typeAssignment);

const groundTruth: GroundTruthTxn[] = [];
for (let i = 0; i < COUNT; i++) {
  groundTruth.push({
    id: `GT-${String(i + 1).padStart(4, "0")}`,
    reference: randRef(88001 + i),
    date: isoDate(randInt(1, 20)),
    amount: randInt(30000, 4800000) / 100, // ₹300.00 – ₹48,000.00
    counterparty: pick(COUNTERPARTIES),
    breakType: shuffledTypes[i],
    breakDetail: {},
  });
}

const ledgerRows: Record<string, unknown>[] = [];
const settlementRows: Record<string, unknown>[] = [];
const bankRows: Record<string, unknown>[] = [];

function emitLedger(ref: string, date: string, amount: number, cp: string) {
  ledgerRows.push({ Date: date, "Invoice No": ref, Party: cp, Amount: rupees(amount), Type: "Sale" });
}
function emitSettlement(ref: string, date: string, amount: number, id: string) {
  const fee = Math.round(amount * 0.02 * 100) / 100;
  const tax = Math.round(fee * 0.18 * 100) / 100;
  const net = Math.round((amount - fee - tax) * 100) / 100;
  settlementRows.push({
    settlement_id: `setl_${id}`,
    payment_id: `pay_${id}`,
    order_id: `order_${id}`,
    amount: paise(amount),
    fee: paise(fee),
    tax: paise(tax),
    net_amount: paise(net),
    utr: `UTR${id}`,
    settled_at: date,
    "notes.reference": ref,
  });
}
function emitBank(ref: string, date: string, amount: number) {
  bankRows.push({
    value_date: ddmmyyyy(date),
    narration: `NEFT-${bankRefFromCanonical(ref)}-RAZORPAY SETTLEMENT`,
    amount: rupees(amount),
    type: "CREDIT",
  });
}

for (const t of groundTruth) {
  const idSuffix = t.id.replace("GT-", "");
  switch (t.breakType) {
    case "clean": {
      emitLedger(t.reference, t.date, t.amount, t.counterparty);
      emitSettlement(t.reference, t.date, t.amount, idSuffix);
      emitBank(t.reference, t.date, t.amount);
      break;
    }
    case "missing": {
      const dropped = shuffle(SOURCES).slice(0, pick([1, 2]));
      t.breakDetail = { droppedFrom: dropped };
      if (!dropped.includes("ledger")) emitLedger(t.reference, t.date, t.amount, t.counterparty);
      if (!dropped.includes("settlement")) emitSettlement(t.reference, t.date, t.amount, idSuffix);
      if (!dropped.includes("bank")) emitBank(t.reference, t.date, t.amount);
      break;
    }
    case "duplicate": {
      const dupSource = pick(SOURCES);
      t.breakDetail = { duplicatedIn: dupSource };
      emitLedger(t.reference, t.date, t.amount, t.counterparty);
      emitSettlement(t.reference, t.date, t.amount, idSuffix);
      emitBank(t.reference, t.date, t.amount);
      if (dupSource === "ledger") emitLedger(t.reference, t.date, t.amount, t.counterparty);
      if (dupSource === "settlement") emitSettlement(t.reference, t.date, t.amount, `${idSuffix}b`);
      if (dupSource === "bank") emitBank(t.reference, t.date, t.amount);
      break;
    }
    case "date_drift": {
      const drift = randInt(1, 3);
      t.breakDetail = { driftDays: drift, in: "bank" };
      emitLedger(t.reference, t.date, t.amount, t.counterparty);
      emitSettlement(t.reference, t.date, t.amount, idSuffix);
      emitBank(t.reference, addDays(t.date, drift), t.amount);
      break;
    }
    case "amount_mismatch": {
      const feeFlavor = rand() < 0.6;
      const delta = feeFlavor
        ? Math.round((t.amount * randInt(1, 3)) / 100) // 1-3% "fee"
        : randInt(50, 500); // flat data-entry error
      t.breakDetail = { flavor: feeFlavor ? "fee" : "error", delta };
      emitLedger(t.reference, t.date, t.amount, t.counterparty);
      emitSettlement(t.reference, t.date, t.amount, idSuffix);
      emitBank(t.reference, t.date, Math.round((t.amount - delta) * 100) / 100);
      break;
    }
    case "format_diff": {
      const corrupt = pick(FORMAT_CORRUPTIONS);
      const target = pick(["ledger", "settlement"] as const);
      t.breakDetail = { corruptedIn: target, style: corrupt.name };
      const ledgerRef = target === "ledger" ? corrupt.apply(t.reference) : t.reference;
      const settlementRef = target === "settlement" ? corrupt.apply(t.reference) : t.reference;
      emitLedger(ledgerRef, t.date, t.amount, t.counterparty);
      emitSettlement(settlementRef, t.date, t.amount, idSuffix);
      emitBank(t.reference, t.date, t.amount);
      break;
    }
  }
}

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(",")];
  for (const row of rows) lines.push(headers.map((h) => escape(row[h])).join(","));
  return `${lines.join("\n")}\n`;
}

writeFileSync(join(OUT_DIR, "ledger.csv"), toCsv(ledgerRows));
writeFileSync(join(OUT_DIR, "settlements.csv"), toCsv(settlementRows));
writeFileSync(join(OUT_DIR, "bank.csv"), toCsv(bankRows));
writeFileSync(join(OUT_DIR, "ground_truth.json"), JSON.stringify(groundTruth, null, 2));

const distribution = groundTruth.reduce<Record<string, number>>((acc, t) => {
  acc[t.breakType] = (acc[t.breakType] ?? 0) + 1;
  return acc;
}, {});

writeFileSync(
  join(OUT_DIR, "run_config.json"),
  JSON.stringify(
    {
      seed: SEED,
      count: COUNT,
      generatedAt: new Date().toISOString(),
      rowCounts: { ledger: ledgerRows.length, settlement: settlementRows.length, bank: bankRows.length },
      breakDistribution: distribution,
    },
    null,
    2,
  ),
);

console.log(`Generated ${COUNT} ground-truth transactions (seed=${SEED}) -> ${OUT_DIR}`);
console.log(`  ledger.csv:      ${ledgerRows.length} rows`);
console.log(`  settlements.csv: ${settlementRows.length} rows`);
console.log(`  bank.csv:        ${bankRows.length} rows`);
console.log(`  break distribution:`, distribution);
