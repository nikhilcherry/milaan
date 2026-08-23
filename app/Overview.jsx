(function () {
const { Card, Button, Badge, Icon, VarianceBar, Amount, LedgerTable, SourceTriad, MatchStatus, Tag } = window.MilaanUI;

function Stat({ label, value, sub, tone }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", padding: "var(--space-7)", background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-raised)" }}>
      <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{label}</span>
      <span style={{ font: "var(--type-figure)", fontVariantNumeric: "tabular-nums lining-nums", color: tone || "var(--text-primary)", letterSpacing: "-0.01em" }}>{value}</span>
      <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>{sub}</span>
    </div>
  );
}

const STAGE_LABELS = {
  exact: "Exact reference match",
  fuzzy: "Fuzzy match (±₹20/2%, ±1 day)",
  gemini: "Gemini fallback",
};

function Overview({ onOpenBreaks }) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    window.MilaanAPI.loadLatestBatch().then(setData).catch((e) => setError(String(e)));
  }, []);

  if (error) {
    return <div style={{ padding: "var(--space-9)", color: "var(--signal-break)", font: "var(--type-body)" }}>Couldn't load reconciliation data: {error}</div>;
  }
  if (!data) {
    return <div style={{ padding: "var(--space-9)", color: "var(--text-tertiary)", font: "var(--type-body)" }}>Loading the latest run…</div>;
  }

  const { stats, exceptions, batch } = data;
  const periodLabel = new Date(batch.run_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const rupees = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "var(--space-9) var(--space-8) var(--space-12)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
            {periodLabel} · run {batch.id.slice(0, 8)}
          </span>
          <h1 style={{ font: "var(--type-display-md)", letterSpacing: "var(--tracking-display)", margin: 0 }}>
            {rupees(stats.exceptionAmount)} does not add up
          </h1>
          <p style={{ font: "var(--type-body)", color: "var(--text-secondary)", margin: 0, maxWidth: "56ch" }}>
            Across {stats.totalDecisions} transactions this run. {stats.matchedCount} matched automatically;
            {" "}{stats.exceptionCount} need a decision from you.
          </p>
        </div>
        <Button variant="secondary" iconAfter="arrow-right" onClick={onOpenBreaks}>Review breaks</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-6)" }}>
        <Stat label="Reconciled" value={stats.matchedCount.toLocaleString()} sub={`${(stats.matchRate * 100).toFixed(1)}% of ${stats.totalDecisions} transactions`} />
        <Stat label="Under review" value={stats.underReviewCount.toLocaleString()} sub="Flagged for Gemini adjudication" tone="var(--signal-review)" />
        <Stat label="Breaks" value={stats.exceptionCount.toLocaleString()} sub={`${rupees(stats.exceptionAmount)} at risk`} tone="var(--signal-break)" />
        <Stat label="Match rate" value={`${(stats.matchRate * 100).toFixed(1)}%`} sub={`${stats.totalRecords} raw records read`} />
      </div>

      <Card title="Value by state">
        <VarianceBar currency="INR" matched={stats.matchedAmount} review={0} broken={stats.exceptionAmount} />
      </Card>

      <Card
        title="Breaks needing a decision"
        padding="0"
        action={<Button variant="ghost" size="sm" iconAfter="arrow-right" onClick={onOpenBreaks}>All {stats.exceptionCount}</Button>}
      >
        <LedgerTable
          onRowClick={onOpenBreaks}
          emptyMessage="Every transaction in this run matched cleanly."
          columns={[
            { key: "date", header: "Date", width: 100 },
            { key: "cp", header: "Counterparty" },
            { key: "sources", header: "Sources", render: (r) => <SourceTriad {...r.sources} /> },
            { key: "why", header: "Reason", render: (r) => <span style={{ color: "var(--text-secondary)" }}>{r.why}</span> },
            { key: "amount", header: "Amount", numeric: true, render: (r) => <Amount value={r.amount} currency="INR" /> },
            { key: "variance", header: "Variance", numeric: true, render: (r) => <Amount value={r.variance} currency="INR" delta /> },
            { key: "state", header: "State", render: (r) => <MatchStatus state={r.state} /> },
          ]}
          rows={exceptions.slice(0, 5)}
        />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-6)" }}>
        <Card title="Last run">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {[
              ["Ledger", "ledger", "NetSuite export"],
              ["Settlement", "settlement", "Razorpay settlement report"],
              ["Bank", "bank", "Bank statement"],
            ].map(([label, key, sys]) => (
              <div key={key} style={{ display: "grid", gridTemplateColumns: "96px 1fr auto", alignItems: "center", gap: "var(--space-6)", paddingBottom: "var(--space-5)", borderBottom: "1px solid var(--border-hairline)" }}>
                <span style={{ font: "var(--weight-medium) var(--text-body-sm)/1 var(--font-sans)" }}>{label}</span>
                <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>{sys}</span>
                <span style={{ font: "var(--type-mono-sm)", color: "var(--text-secondary)" }}>{(stats.sourceCounts[key] ?? 0).toLocaleString()} lines</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Icon name="shield-check" size={14} color="var(--signal-match)" />
              <span style={{ font: "var(--type-caption)", color: "var(--text-secondary)" }}>
                All three sources read cleanly. Run at {new Date(batch.run_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}.
              </span>
            </div>
          </div>
        </Card>

        <Card title="Stages that did the work">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {["exact", "fuzzy", "gemini"].map((stage) => (
              <div key={stage} style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
                <Tag mono>{stage.toUpperCase()}</Tag>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", color: "var(--text-secondary)", flex: 1 }}>{STAGE_LABELS[stage]}</span>
                <span style={{ font: "var(--type-mono-sm)", fontVariantNumeric: "tabular-nums" }}>{stats.stageCounts[stage] ?? 0}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
window.MilaanOverview = Overview;
})();
