(function () {
const { Card, Button, Input, Select, Checkbox, Switch, Radio, Tag, Badge, Icon, LedgerTable, Amount } = window.MilaanUI;

const RULES = [
  { id: "RULE-001", name: "Reference exact", scope: "All accounts", matched: 1102, signal: "match", on: true },
  { id: "RULE-042", name: "Reference + amount within $0.50", scope: "Stripe, Adyen", matched: 96, signal: "match", on: true },
  { id: "RULE-108", name: "Amount exact + value date within 2 days", scope: "All accounts", matched: 27, signal: "match", on: true },
  { id: "RULE-140", name: "Bank-only fee lines to 6420", scope: "Chase", matched: 6, signal: "review", on: true },
  { id: "RULE-155", name: "Ignore Wise transfers in settlement", scope: "Wise", matched: 0, signal: null, on: false },
];

function Rules() {
  const [active, setActive] = React.useState(RULES[1].id);
  const rule = RULES.find((r) => r.id === active);

  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "var(--space-9) var(--space-8) var(--space-12)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-sm)", fontWeight: "var(--weight-regular)", lineHeight: 1.1, letterSpacing: "var(--tracking-display)", margin: 0 }}>
            Matching rules
          </h1>
          <p style={{ font: "var(--type-body)", color: "var(--text-secondary)", margin: 0, maxWidth: "60ch" }}>
            Rules run in order. The first one that matches a transaction wins, and
            the rule that made the match is recorded on every row.
          </p>
        </div>
        <Button variant="primary" icon="plus">New rule</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--space-6)", alignItems: "start" }}>
        <Card title="Order of evaluation" padding="0">
          <LedgerTable
            activeId={active}
            onRowClick={(r) => setActive(r.id)}
            columns={[
              { key: "id", header: "Rule", width: 96, render: (r) => <Tag mono>{r.id}</Tag> },
              { key: "name", header: "Definition" },
              { key: "scope", header: "Scope", render: (r) => <span style={{ color: "var(--text-tertiary)" }}>{r.scope}</span> },
              { key: "matched", header: "Matched", numeric: true, render: (r) => (r.on ? r.matched.toLocaleString() : "—") },
              { key: "on", header: "", width: 60, render: (r) => (r.on ? <Badge tone="match">On</Badge> : <Badge tone="neutral">Off</Badge>) },
            ]}
            rows={RULES}
          />
        </Card>

        <Card title={rule.id}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
            <Input label="Name" defaultValue={rule.name} />
            <Select label="Match on" options={["Reference", "Reference + amount", "Amount + value date", "Counterparty + amount"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
              <Input label="Amount tolerance" mono suffix="USD" defaultValue="0.50" />
              <Input label="Date tolerance" mono suffix="days" defaultValue="0" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-hairline)" }}>
              <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Sources required</span>
              <Checkbox checked label="Ledger" />
              <Checkbox checked label="Settlement" />
              <Checkbox checked label="Bank" description="Unchecking allows a two-way match, reported as Partial." />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-hairline)" }}>
              <Switch checked label="Auto-close matches within tolerance" />
              <Switch label="Notify me when this rule stops matching" />
            </div>

            <div style={{ display: "flex", gap: "var(--space-4)" }}>
              <Button variant="primary" style={{ flex: 1 }}>Save rule</Button>
              <Button variant="secondary" icon="eye">Dry run</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
window.MilaanRules = Rules;
})();
