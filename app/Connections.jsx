(function () {
const { Card, Button, Badge, Icon, Input, Tag, Amount } = window.MilaanUI;

const SOURCES = [
  {
    key: "ledger", title: "Ledger", icon: "book-open",
    blurb: "The book of record. Milaan reads it, never writes to it without your say.",
    connections: [{ name: "NetSuite", detail: "Marigold Retail · 4 subsidiaries", state: "ok", last: "08:41", lines: 1258 }],
  },
  {
    key: "settlement", title: "Settlement", icon: "receipt",
    blurb: "What Razorpay says it settled, and what it withheld.",
    connections: [
      { name: "Razorpay", detail: "acct_MRGD01 · INR", state: "ok", last: "08:41", lines: 812 },
    ],
  },
  {
    key: "bank", title: "Bank", icon: "landmark",
    blurb: "What actually arrived. The only source that settles the argument.",
    connections: [
      { name: "HDFC Bank", detail: "•••• 4410 · current account", state: "ok", last: "08:39", lines: 908 },
      { name: "ICICI Bank", detail: "•••• 7712 · current account", state: "ok", last: "08:39", lines: 288 },
    ],
  },
];

function Row({ c }) {
  const tone = c.state === "ok" ? "match" : "review";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", alignItems: "center", gap: "var(--space-6)", padding: "var(--space-5) 0", borderBottom: "1px solid var(--border-hairline)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ font: "var(--weight-medium) var(--text-body-sm)/1.3 var(--font-sans)" }}>{c.name}</span>
        <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>{c.detail}</span>
      </div>
      <span style={{ font: "var(--type-mono-sm)", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{c.lines.toLocaleString()} lines</span>
      <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>{c.last}</span>
      <Badge tone={tone} dot>{c.state === "ok" ? "Live" : "Stale"}</Badge>
    </div>
  );
}

function Connections() {
  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "var(--space-9) var(--space-8) var(--space-12)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-8)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-sm)", fontWeight: "var(--weight-regular)", lineHeight: 1.1, letterSpacing: "var(--tracking-display)", margin: 0 }}>
            Three sources
          </h1>
          <p style={{ font: "var(--type-body)", color: "var(--text-secondary)", margin: 0, maxWidth: "60ch" }}>
            Milaan needs all three to say anything useful. Two sources can tell you
            that something differs; three tell you which one is wrong.
          </p>
        </div>
        <Button variant="secondary" icon="plus">Connect a source</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)", alignItems: "start" }}>
        {SOURCES.map((s) => (
          <Card key={s.key} title={s.title} action={<Icon name={s.icon} size={15} color="var(--text-tertiary)" />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <p style={{ margin: 0, font: "var(--weight-regular) var(--text-body-sm)/1.5 var(--font-sans)", color: "var(--text-secondary)" }}>{s.blurb}</p>
              <div>{s.connections.map((c) => <Row key={c.name} c={c} />)}</div>
              <Button variant="ghost" size="sm" icon="plus">Add {s.title.toLowerCase()}</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Read-only by design">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-9)" }}>
          {[
            ["lock", "Read-only credentials", "Milaan asks for read scopes only. It cannot move money, and it cannot post to your ledger without an explicit approval."],
            ["shield-check", "Every read logged", "Each run records which files were read, at what time, and which rule touched each line."],
            ["clock", "Nothing is cached longer than the period", "Source files are dropped once the period closes. Matches and audit trail are kept."],
          ].map(([icon, t, d]) => (
            <div key={t} style={{ display: "flex", gap: "var(--space-5)" }}>
              <span style={{ marginTop: 2, color: "var(--text-tertiary)" }}><Icon name={icon} size={15} /></span>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <span style={{ font: "var(--weight-medium) var(--text-body-sm)/1.3 var(--font-sans)" }}>{t}</span>
                <span style={{ font: "var(--type-caption)", color: "var(--text-secondary)", lineHeight: 1.55 }}>{d}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
window.MilaanConnections = Connections;
})();
