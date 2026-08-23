# Milaan synthetic data generator

Produces a reproducible 3-way reconciliation dataset: a merchant ledger export,
a Razorpay-style settlement report, and a bank statement, all describing the
same underlying transactions — deliberately mismatched in the ways real
reconciliation breaks actually happen.

## Usage

```bash
npm install
npm run generate                        # seed=88231, count=120, ./output
npm run generate -- --seed=1 --count=200 --out=../data/demo
```

Same seed → byte-identical CSVs and JSON every time (only the `generatedAt`
timestamp in `run_config.json` changes). That's the point: the dashboard, the
pitch numbers, and the demo video should all trace back to one regenerable run.

## Output

| File | What it is |
|---|---|
| `ledger.csv` | The merchant's own record of each sale |
| `settlements.csv` | What Razorpay says it settled (amounts in paise, like a real settlement report) |
| `bank.csv` | What actually landed in the bank account |
| `ground_truth.json` | The answer key — every transaction's true reference/date/amount and, for breaks, which type and which source it was injected into. Not something to show judges as "the answer" — it's how you check the matching engine actually gets the right numbers before you trust them in the pitch. |
| `run_config.json` | The seed, count, and the break-type distribution actually produced by that run |

## Break types

~65% of transactions match cleanly across all three sources. The rest split
evenly across:

- **missing** — dropped from one or two sources entirely
- **duplicate** — the same reference appears twice in one source
- **date_drift** — bank credit lands 1–3 days after the ledger/settlement date (T+1 lag)
- **amount_mismatch** — either a small fee-sized gap or a flat data-entry-sized one
- **format_diff** — the reference is written differently in one source (lowercase, zero-padded, prefix swapped, underscore instead of dash)

Bank narrations always strip the dash from references (`INV-88231` →
`INV88231`) — that's just how bank feeds look, not one of the five break
types above.
