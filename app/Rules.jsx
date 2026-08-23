(function () {
const { Card, Tag, Badge, Icon, LedgerTable } = window.MilaanUI;

const STAGES = [
  {
    id: "exact",
    name: "Exact reference match",
    scope: "All accounts",
    detail:
      "Groups rows by an identical reference_id across ledger, settlement, and bank. If exactly one row exists in each source and the amount and date agree exactly, it's matched here — no tolerance, no judgment call.",
    thresholds: [["Amount tolerance", "0 (exact)"], ["Date tolerance", "0 days (exact)"]],
  },
  {
    id: "fuzzy",
    name: "Fuzzy match",
    scope: "All accounts",
    detail:
      "For anything the exact stage couldn't tie together — a reference written differently across sources, a settlement that lands a day late, a small fee-sized gap — Milaan searches the other sources for the closest candidate within tolerance and matches on amount + date proximity instead of the reference string.",
    thresholds: [["Amount tolerance", "±₹20 or 2%, whichever is larger"], ["Date tolerance", "±1 day"]],
  },
  {
    id: "gemini",
    name: "Gemini fallback",
    scope: "All accounts",
    detail:
      "For genuinely ambiguous candidates — a discrepancy bigger than tolerance, or a transaction present in only one or two sources — Milaan sends the candidate records to Gemini for a match / no-match verdict with a plain-English reason. Without a configured key, this stage logs an honest “not configured” reason instead of guessing.",
    thresholds: [["Model", "gemini-2.0-flash"], ["Falls back to", "manual review, reason logged either way"]],
  },
];

function Rules() {
  const [active, setActive] = React.useState("fuzzy");
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    window.MilaanAPI.loadLatestBatch().then(setData).catch((e) => setError(String(e)));
  }, []);

  const stage = STAGES.find((s) => s.id === active);
  const counts = data ? data.stats.stageCounts : {};

  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "var(--space-9) var(--space-8) var(--space-12)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-sm)", fontWeight: "var(--weight-regular)", lineHeight: 1.1, letterSpacing: "var(--tracking-display)", margin: 0 }}>
            Matching rules
          </h1>
          <p style={{ font: "var(--type-body)", color: "var(--text-secondary)", margin: 0, maxWidth: "60ch" }}>
            Three stages run in order for every transaction. The first one that
            resolves it wins, and the stage that made the call is recorded on
            every row — these aren't configurable per-account yet, they're the
            same three constants for everyone.
          </p>
        </div>
      </div>

      {error ? <div style={{ color: "var(--signal-break)", font: "var(--type-body)" }}>Couldn't load match counts: {error}</div> : null}

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--space-6)", alignItems: "start" }}>
        <Card title="Order of evaluation" padding="0">
          <LedgerTable
            activeId={active}
            onRowClick={(r) => setActive(r.id)}
            columns={[
              { key: "id", header: "Stage", width: 96, render: (r) => <Tag mono>{r.id.toUpperCase()}</Tag> },
              { key: "name", header: "Definition" },
              { key: "scope", header: "Scope", render: (r) => <span style={{ color: "var(--text-tertiary)" }}>{r.scope}</span> },
              { key: "matched", header: "Decisions", numeric: true, render: (r) => (data ? (counts[r.id] ?? 0).toLocaleString() : "…") },
            ]}
            rows={STAGES}
          />
        </Card>

        <Card title={stage.name}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <p style={{ margin: 0, font: "var(--weight-regular) var(--text-body-sm)/1.55 var(--font-sans)", color: "var(--text-secondary)" }}>
              {stage.detail}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-hairline)" }}>
              <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
                Thresholds
              </span>
              {stage.thresholds.map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-5)" }}>
                  <span style={{ font: "var(--type-body-sm)", color: "var(--text-secondary)" }}>{label}</span>
                  <span style={{ font: "var(--type-mono-sm)", color: "var(--text-primary)" }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-hairline)" }}>
              <Icon name="scale" size={14} color="var(--text-tertiary)" />
              <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>
                {data ? `${counts[stage.id] ?? 0} of ${data.stats.totalDecisions} decisions this run` : "Loading decision counts…"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
window.MilaanRules = Rules;
})();
