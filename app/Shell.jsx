(function () {
const { Wordmark, Icon, Badge, IconButton, Button } = window.MilaanUI;

const NAV = [
  { id: "overview", label: "Overview", icon: "scale" },
  { id: "breaks", label: "Breaks", icon: "git-compare-arrows", count: 17 },
  { id: "rules", label: "Rules", icon: "sliders-horizontal" },
  { id: "connections", label: "Connections", icon: "link" },
];

function Shell({ view, onView, children }) {
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "var(--sidebar-w) 1fr", height: "100%", background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
      <aside style={{ borderRight: "1px solid var(--border-hairline)", background: "var(--paper)", display: "flex", flexDirection: "column" }}>
        <div style={{ height: "var(--topbar-h)", display: "flex", alignItems: "center", padding: "0 var(--space-7)", borderBottom: "1px solid var(--border-hairline)" }}>
          <a href="../index.html" title="Marketing site" style={{ display: "inline-flex" }}><Wordmark size={20} /></a>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", padding: "var(--space-6) var(--space-4)" }}>
          {NAV.map((n) => {
            const on = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => onView(n.id)}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                style={{
                  display: "flex", alignItems: "center", gap: "var(--space-5)",
                  height: 30, padding: "0 var(--space-5)", border: 0,
                  borderRadius: "var(--radius-sm)", cursor: "pointer", textAlign: "left",
                  background: on ? "var(--ink-100)" : hover === n.id ? "var(--surface-hover)" : "transparent",
                  color: on ? "var(--text-primary)" : "var(--text-secondary)",
                  font: `var(--weight-${on ? "medium" : "regular"}) var(--text-body-sm)/1 var(--font-sans)`,
                  transition: "var(--transition-control)",
                }}
              >
                <Icon name={n.icon} size={14} color={on ? "var(--text-primary)" : "var(--text-tertiary)"} />
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.count ? (
                  <span style={{ font: "var(--type-mono-sm)", color: "var(--signal-break)", fontVariantNumeric: "tabular-nums" }}>{n.count}</span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", padding: "var(--space-6)", borderTop: "1px solid var(--border-hairline)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
            Period
          </span>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ font: "var(--type-mono)" }}>2026-08</span>
            <Badge tone="review" dot>Open</Badge>
          </div>
        </div>
      </aside>

      <main style={{ display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <header style={{ height: "var(--topbar-h)", flexShrink: 0, display: "flex", alignItems: "center", gap: "var(--space-6)", padding: "0 var(--space-8)", borderBottom: "1px solid var(--border-hairline)", background: "var(--paper)" }}>
          <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>
            Northwind Trading <span style={{ color: "var(--ink-300)" }}>/</span>{" "}
            <span style={{ color: "var(--text-primary)" }}>{NAV.find((n) => n.id === view).label}</span>
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>Last run 08:41</span>
            <IconButton icon="bell" label="Alerts" size="sm" />
            <IconButton icon="settings" label="Settings" size="sm" />
            <Button variant="primary" size="sm" icon="refresh-cw">Run match</Button>
          </div>
        </header>
        <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
      </main>
    </div>
  );
}
window.MilaanShell = Shell;
})();
