(function () {
const { Button, IconButton, Tabs, Tag, Input, Badge, Icon, Amount, LedgerTable, SourceTriad, MatchStatus, ThreeWayCompare, Dialog, Toast, Tooltip } = window.MilaanUI;

function Inspector({ row, onClose, onResolve }) {
  if (!row) return null;
  return (
    <aside style={{ width: "var(--inspector-w)", flexShrink: 0, borderLeft: "1px solid var(--border-hairline)", background: "var(--surface-card)", display: "flex", flexDirection: "column", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", flexWrap: "wrap", padding: "var(--space-6) var(--space-7)", borderBottom: "1px solid var(--border-hairline)" }}>
        <Tag mono>{row.id}</Tag>
        <MatchStatus state={row.state} />
        <span style={{ marginLeft: "auto" }}><IconButton icon="x" label="Close inspector" size="sm" onClick={onClose} /></span>
      </div>

      <div style={{ padding: "var(--space-7)", display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Variance</span>
          <Amount value={row.variance} size="figure" delta align="left" />
          <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>{row.cp} · {row.date}</span>
        </div>

        <ThreeWayCompare records={row.records} disagree={row.disagree} note={row.note} />

        <div style={{ display: "flex", gap: "var(--space-5)", padding: "var(--space-6)", background: "var(--tint-plum)", border: "1px solid var(--edge-info)", borderRadius: "var(--radius-md)" }}>
          <span style={{ marginTop: 2, color: "var(--brand-plum)" }}><Icon name="scale" size={14} /></span>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--brand-plum)" }}>Suggested resolution</span>
            <p style={{ margin: 0, font: "var(--weight-regular) var(--text-body-sm)/1.5 var(--font-sans)", color: "var(--text-primary)" }}>{row.suggestion}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Button variant="primary" icon="check" fullWidth onClick={onResolve}>Accept resolution</Button>
          <div style={{ display: "flex", gap: "var(--space-4)" }}>
            <Button variant="secondary" icon="flag" style={{ flex: 1 }}>Flag</Button>
            <Button variant="secondary" icon="message-square" style={{ flex: 1 }}>Comment</Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-hairline)" }}>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Audit trail</span>
          {[["08:41", "Matched by RULE-042, then reopened on amount variance"], ["08:41", "Read 3 sources"], ["Aug 14", "Created by the 08-14 settlement file"]].map(([t, d]) => (
            <div key={d} style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "var(--space-5)" }}>
              <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>{t}</span>
              <span style={{ font: "var(--type-caption)", color: "var(--text-secondary)", lineHeight: 1.5 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Breaks() {
  const rows = window.MILAAN_BREAKS;
  const [tab, setTab] = React.useState("Breaks");
  const [sel, setSel] = React.useState([]);
  const [open, setOpen] = React.useState(rows[0]);
  const [dialog, setDialog] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [dense, setDense] = React.useState(false);

  const shown = tab === "Matched" ? [] : tab === "Under review" ? rows.filter(r => r.signal === "review") : rows;

  return (
    <div style={{ display: "flex", height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "var(--space-8) var(--space-8) 0", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
            <Input icon="search" placeholder="Reference, amount, counterparty" style={{ width: 280 }} />
            <Tag icon="funnel" onRemove={() => {}}>Variance over $250</Tag>
            <Tag icon="calendar" onRemove={() => {}}>August 2026</Tag>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Tooltip label="Toggle 30px rows" side="bottom">
                <IconButton icon="sliders-horizontal" label="Row density" variant="outline" selected={dense} onClick={() => setDense(d => !d)} />
              </Tooltip>
              <IconButton icon="download" label="Export" variant="outline" />
            </div>
          </div>
          <Tabs
            items={["Breaks", "Under review", "Matched"]}
            value={tab} onChange={setTab}
            counts={{ Breaks: rows.length, "Under review": rows.filter(r => r.signal === "review").length, Matched: 1225 }}
          />
        </div>

        {sel.length > 0 ? (
          <div style={{ margin: "var(--space-6) var(--space-8) 0", display: "flex", alignItems: "center", gap: "var(--space-5)", padding: "var(--space-4) var(--space-6)", background: "var(--ink-950)", color: "var(--paper)", borderRadius: "var(--radius-md)" }}>
            <span style={{ font: "var(--type-mono-sm)" }}>{sel.length} selected</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: "var(--space-4)" }}>
              <Button variant="ghost" size="sm" icon="check-check" style={{ color: "var(--paper)" }} onClick={() => setDialog(true)}>Accept all</Button>
              <Button variant="ghost" size="sm" icon="x" style={{ color: "var(--ink-300)" }} onClick={() => setSel([])}>Clear</Button>
            </div>
          </div>
        ) : null}

        <div style={{ flex: 1, overflow: "auto", padding: "var(--space-6) var(--space-8) var(--space-11)" }}>
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", paddingTop: "var(--space-6)", boxShadow: "var(--shadow-raised)" }}>
            <LedgerTable
              selectable dense={dense}
              selected={sel} onSelect={setSel}
              activeId={open && open.id}
              onRowClick={setOpen}
              emptyMessage="Every transaction in this period is matched."
              columns={[
                { key: "date", header: "Date", width: 100 },
                { key: "cp", header: "Counterparty" },
                { key: "sources", header: "Sources", render: (r) => <SourceTriad {...r.sources} /> },
                { key: "why", header: "Reason", render: (r) => <span style={{ color: "var(--text-secondary)" }}>{r.why}</span> },
                { key: "amount", header: "Amount", numeric: true, render: (r) => <Amount value={r.amount} /> },
                { key: "variance", header: "Variance", numeric: true, render: (r) => <Amount value={r.variance} delta /> },
                { key: "state", header: "State", render: (r) => <MatchStatus state={r.state} /> },
              ]}
              rows={shown}
            />
          </div>
        </div>
      </div>

      <Inspector row={open} onClose={() => setOpen(null)} onResolve={() => { setToast(true); setOpen(null); }} />

      <Dialog
        open={dialog}
        title={`Accept ${sel.length} suggested resolutions?`}
        description="Each break is closed with the resolution Milaan proposed. Journal entries are posted to the August period and every step is written to the audit trail."
        onClose={() => setDialog(false)}
        footer={
          <>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button variant="primary" icon="check-check" onClick={() => { setDialog(false); setSel([]); setToast(true); }}>
              Accept and post
            </Button>
          </>
        }
      />

      {toast ? (
        <div style={{ position: "absolute", left: "var(--space-8)", bottom: "var(--space-8)", zIndex: 60 }}>
          <Toast tone="match" title="Break closed" detail="BRK-1180 · adjustment $412.19 posted" action={{ label: "Undo", onClick: () => setToast(false) }} onClose={() => setToast(false)} />
        </div>
      ) : null}
    </div>
  );
}
window.MilaanBreaks = Breaks;
})();
