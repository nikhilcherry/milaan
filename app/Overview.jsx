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

function Overview({ onOpenBreaks }) {
  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "var(--space-9) var(--space-8) var(--space-12)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
            August 2026 · 4 accounts
          </span>
          <h1 style={{ font: "var(--type-display-md)", letterSpacing: "var(--tracking-display)", margin: 0 }}>
            $17,300 does not add up
          </h1>
          <p style={{ font: "var(--type-body)", color: "var(--text-secondary)", margin: 0, maxWidth: "56ch" }}>
            Across 17 transactions. Twelve are timing differences that will clear
            on the next bank file; five need a decision from you.
          </p>
        </div>
        <Button variant="secondary" iconAfter="arrow-right" onClick={onOpenBreaks}>Review breaks</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-6)" }}>
        <Stat label="Reconciled" value="1,225" sub="97.4% of 1,258 transactions" />
        <Stat label="Under review" value="16" sub="Awaiting the 08-16 bank file" tone="var(--signal-review)" />
        <Stat label="Breaks" value="17" sub="5 above the $250 tolerance" tone="var(--signal-break)" />
        <Stat label="Value at risk" value="$17,300" sub="1.4% of period volume" />
      </div>

      <Card title="Value by state">
        <VarianceBar matched={1225400} review={42100} broken={17300} />
      </Card>

      <Card
        title="Breaks needing a decision"
        padding="0"
        action={<Button variant="ghost" size="sm" iconAfter="arrow-right" onClick={onOpenBreaks}>All 17</Button>}
      >
        <LedgerTable
          onRowClick={onOpenBreaks}
          columns={[
            { key: "date", header: "Date", width: 100 },
            { key: "cp", header: "Counterparty" },
            { key: "sources", header: "Sources", render: (r) => <SourceTriad {...r.sources} /> },
            { key: "why", header: "Reason", render: (r) => <span style={{ color: "var(--text-secondary)" }}>{r.why}</span> },
            { key: "amount", header: "Amount", numeric: true, render: (r) => <Amount value={r.amount} /> },
            { key: "variance", header: "Variance", numeric: true, render: (r) => <Amount value={r.variance} delta /> },
            { key: "state", header: "State", render: (r) => <MatchStatus state={r.state} /> },
          ]}
          rows={window.MILAAN_BREAKS.slice(0, 5)}
        />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-6)" }}>
        <Card title="Last run">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {[
              ["Ledger", "NetSuite", "1,258 lines", "08:41"],
              ["Settlement", "Stripe, Adyen, Braintree", "1,241 lines", "08:41"],
              ["Bank", "Chase, Barclays", "1,196 lines", "08:39"],
            ].map(([src, sys, lines, at]) => (
              <div key={src} style={{ display: "grid", gridTemplateColumns: "96px 1fr auto auto", alignItems: "center", gap: "var(--space-6)", paddingBottom: "var(--space-5)", borderBottom: "1px solid var(--border-hairline)" }}>
                <span style={{ font: "var(--weight-medium) var(--text-body-sm)/1 var(--font-sans)" }}>{src}</span>
                <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>{sys}</span>
                <span style={{ font: "var(--type-mono-sm)", color: "var(--text-secondary)" }}>{lines}</span>
                <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>{at}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Icon name="shield-check" size={14} color="var(--signal-match)" />
              <span style={{ font: "var(--type-caption)", color: "var(--text-secondary)" }}>
                All three sources read cleanly. 62 lines were excluded by rules.
              </span>
            </div>
          </div>
        </Card>

        <Card title="Rules that did the work">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {[["RULE-001", "Reference exact", 1102], ["RULE-042", "Reference + ±0.50", 96], ["RULE-108", "Amount + date ±2d", 27]].map(([id, name, n]) => (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
                <Tag mono>{id}</Tag>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", color: "var(--text-secondary)", flex: 1 }}>{name}</span>
                <span style={{ font: "var(--type-mono-sm)", fontVariantNumeric: "tabular-nums" }}>{n}</span>
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
