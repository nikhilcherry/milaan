(function () {
const { Wordmark, Button, Badge, Icon, Card, Tag, Amount, ThreeWayCompare, SourceTriad, MatchStatus, VarianceBar, LedgerTable } = window.MilaanUI;

const MAX = { maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--space-9)" };
const LBL = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" };

function Placeholder({ label, height = 280 }) {
  return (
    <div style={{ height, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", background: "repeating-linear-gradient(135deg, var(--ink-050) 0 8px, var(--ink-100) 8px 16px)", display: "grid", placeItems: "center" }}>
      <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)", background: "var(--paper)", padding: "5px 10px", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-hairline)" }}>
        {label}
      </span>
    </div>
  );
}

function Nav() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "oklch(0.985 0.006 85 / 0.88)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border-hairline)" }}>
      <div style={{ ...MAX, height: 60, display: "flex", alignItems: "center", gap: "var(--space-9)" }}>
        <Wordmark size={21} dot={false} />
        <nav style={{ display: "flex", gap: "var(--space-8)" }}>
          {[["How it works", "#how"], ["Sources", "#sources"], ["Numbers", "#numbers"], ["Security", "#security"]].map(([t, href]) => (
            <a key={t} href={href} style={{ font: "var(--weight-regular) var(--text-body-sm)/1 var(--font-sans)", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{t}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
          <a href="app/index.html" style={{ font: "var(--weight-regular) var(--text-body-sm)/1 var(--font-sans)", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>Sign in</a>
          <Button variant="primary" size="sm" iconAfter="arrow-right">Book a walkthrough</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ borderBottom: "1px solid var(--border-hairline)", background: "var(--paper)" }}>
      <div style={{ ...MAX, paddingTop: "var(--space-13)", paddingBottom: "var(--space-12)", display: "grid", gap: "var(--space-11)" }}>
        <div style={{ display: "grid", gap: "var(--space-7)" }}>
          <span style={LBL}>Three-way reconciliation</span>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-display-xl)", fontWeight: "var(--weight-regular)", lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)", maxWidth: "18ch" }}>
            Milaan reads all three, and tells you which one is wrong
          </h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "var(--space-11)", alignItems: "start" }}>
          <p style={{ margin: 0, font: "var(--weight-regular) var(--text-subtitle)/1.6 var(--font-sans)", color: "var(--text-secondary)", maxWidth: "46ch" }}>
            Your ledger, your processor settlements, and your bank statement rarely
            agree line for line. Milaan matches every transaction across the three,
            then names the exceptions and the reason each one broke.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <div style={{ display: "flex", gap: "var(--space-4)" }}>
              <Button variant="primary" size="lg" iconAfter="arrow-right">Book a walkthrough</Button>
              <Button variant="secondary" size="lg" icon="book-open">Read the docs</Button>
            </div>
            <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>
              Read-only credentials. No implementation project. First close in a week.
            </span>
          </div>
        </div>
      </div>

      <div style={{ ...MAX, paddingBottom: "var(--space-12)" }}>
        <Placeholder label="product shot — breaks table with inspector open" height={420} />
      </div>
    </section>
  );
}

function Triad() {
  const cols = [
    ["Ledger", "book-open", "What you booked.", "NetSuite, Xero, QuickBooks, Sage, or a CSV export."],
    ["Settlement", "receipt", "What the processor paid.", "Stripe, Adyen, Braintree, Checkout, Shopify Payments."],
    ["Bank", "landmark", "What actually arrived.", "Any account reachable over open banking or BAI2."],
  ];
  return (
    <section id="sources" style={{ borderBottom: "1px solid var(--border-hairline)", background: "var(--surface-page)", scrollMarginTop: 60 }}>
      <div style={{ ...MAX, padding: "var(--space-12) var(--space-9)", display: "grid", gap: "var(--space-9)" }}>
        <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: "44ch" }}>
          <span style={LBL}>Why three</span>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-display-md)", fontWeight: "var(--weight-regular)", lineHeight: 1.1, letterSpacing: "var(--tracking-display)" }}>
            Two sources argue. Three settle it.
          </h2>
          <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-secondary)" }}>
            A two-way match tells you a number differs. It cannot tell you which
            side to trust. With the third record in hand, the answer is usually
            obvious and always defensible.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          {cols.map(([t, icon, line, sub]) => (
            <div key={t} style={{ padding: "var(--space-8)", background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", display: "grid", gap: "var(--space-5)" }}>
              <Icon name={icon} size={18} color="var(--text-tertiary)" />
              <span style={LBL}>{t}</span>
              <span style={{ font: "var(--weight-medium) var(--text-subtitle)/1.3 var(--font-sans)" }}>{line}</span>
              <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)", lineHeight: 1.55 }}>{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explain() {
  return (
    <section id="how" style={{ borderBottom: "1px solid var(--border-hairline)", background: "var(--paper)", scrollMarginTop: 60 }}>
      <div style={{ ...MAX, padding: "var(--space-12) var(--space-9)", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "var(--space-11)", alignItems: "center" }}>
        <div style={{ display: "grid", gap: "var(--space-6)" }}>
          <span style={LBL}>The exception report</span>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-display-md)", fontWeight: "var(--weight-regular)", lineHeight: 1.1, letterSpacing: "var(--tracking-display)" }}>
            Not just what broke. Why.
          </h2>
          <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-secondary)", maxWidth: "44ch" }}>
            Every exception arrives with the three records side by side, the field
            that disagrees marked, and a plain sentence naming the likely cause.
            Accept the suggestion and the journal entry is drafted for you.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", paddingTop: "var(--space-3)" }}>
            <MatchStatus state="variance" />
            <MatchStatus state="missing" />
            <MatchStatus state="duplicate" />
            <MatchStatus state="partial" />
          </div>
        </div>
        <ThreeWayCompare
          disagree={["amount"]}
          records={{
            ledger: { amount: 4820.0, date: "2026-08-14", reference: "INV-88231" },
            settlement: { amount: 4820.0, date: "2026-08-14", reference: "INV-88231" },
            bank: { amount: 4407.81, date: "2026-08-15", reference: "INV-88231" },
          }}
          note="The bank credit is $412.19 short of the settlement. The gap matches the processor's August chargeback fee, which is not posted to the ledger."
        />
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section id="numbers" data-theme="ink" style={{ background: "var(--surface-page)", color: "var(--text-primary)", scrollMarginTop: 60 }}>
      <div style={{ ...MAX, padding: "var(--space-12) var(--space-9)", display: "grid", gap: "var(--space-9)" }}>
        <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: "46ch" }}>
          <span style={{ ...LBL, color: "var(--text-tertiary)" }}>A month at Northwind Trading</span>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-display-md)", fontWeight: "var(--weight-regular)", lineHeight: 1.1, letterSpacing: "var(--tracking-display)", color: "var(--text-primary)" }}>
            1,258 transactions. 17 questions.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-9)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-hairline)" }}>
          {[["Matched automatically", "97.4%"], ["Breaks surfaced", "17"], ["Value explained", "$1.28m"], ["Close time", "3 days"]].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gap: "var(--space-4)" }}>
              <span style={{ ...LBL, color: "var(--text-tertiary)" }}>{k}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "34px", fontWeight: "var(--weight-medium)", fontVariantNumeric: "tabular-nums lining-nums", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: "var(--space-6)" }}>
          <VarianceBar matched={1225400} review={42100} broken={17300} />
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section id="security" style={{ borderBottom: "1px solid var(--border-hairline)", background: "var(--paper)", scrollMarginTop: 60 }}>
      <div style={{ ...MAX, padding: "var(--space-12) var(--space-9)", display: "grid", gap: "var(--space-9)" }}>
        <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: "44ch" }}>
          <span style={LBL}>How it behaves</span>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-display-md)", fontWeight: "var(--weight-regular)", lineHeight: 1.1, letterSpacing: "var(--tracking-display)" }}>
            Read-only, and auditable line by line
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-9)" }}>
          {[
            ["lock", "Read scopes only", "Milaan cannot move money. Posting to your ledger needs an explicit approval, recorded against your name."],
            ["shield-check", "Every read logged", "Each run records the files read, the rule that touched each line, and who accepted each resolution."],
            ["clock", "Source files expire", "Statements and settlement files are dropped when the period closes. Matches and audit trail are kept."],
          ].map(([icon, t, d]) => (
            <div key={t} style={{ display: "grid", gap: "var(--space-5)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-hairline)" }}>
              <Icon name={icon} size={17} color="var(--text-tertiary)" />
              <span style={{ font: "var(--weight-medium) var(--text-subtitle)/1.3 var(--font-sans)" }}>{t}</span>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: "var(--weight-regular)", fontSize: "var(--text-body-sm)", lineHeight: 1.6, color: "var(--text-secondary)" }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ background: "var(--surface-page)" }}>
      <div style={{ ...MAX, padding: "var(--space-13) var(--space-9)", display: "grid", gap: "var(--space-8)", justifyItems: "center", textAlign: "center", background: "var(--texture-ruled)" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-display-lg)", fontWeight: "var(--weight-regular)", lineHeight: 1.05, letterSpacing: "var(--tracking-display)", maxWidth: "24ch" }}>
          Bring one month. We will show you what does not add up.
        </h2>
        <div style={{ display: "flex", gap: "var(--space-4)" }}>
          <Button variant="primary" size="lg" iconAfter="arrow-right">Book a walkthrough</Button>
          <Button variant="secondary" size="lg" icon="upload">Send a trial file</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Product", [["Open the workspace", "app/index.html"], ["How it works", "#how"], ["Sources", "#sources"], ["Security", "#security"]]],
    ["Company", [["About", "#"], ["Careers", "#"], ["Contact", "#"]]],
    ["Resources", [["Docs", "#"], ["API reference", "#"], ["Status", "#"]]],
  ];
  return (
    <footer data-theme="ink" style={{ background: "var(--surface-page)", color: "var(--text-secondary)" }}>
      <div style={{ ...MAX, padding: "var(--space-11) var(--space-9)", display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)", gap: "var(--space-9)" }}>
        <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
          <Wordmark size={26} color="var(--paper)" />
          <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)", maxWidth: "30ch", lineHeight: 1.6 }}>
            Milaan is Hindi and Urdu for meeting — the point where separate records
            finally come together.
          </span>
        </div>
        {cols.map(([t, links]) => (
          <div key={t} style={{ display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
            <span style={{ ...LBL, color: "var(--text-tertiary)" }}>{t}</span>
            {links.map(([l, href]) => (
              <a key={l} href={href} style={{ font: "var(--weight-regular) var(--text-body-sm)/1 var(--font-sans)", color: "var(--text-secondary)" }}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--border-hairline)" }}>
        <div style={{ ...MAX, padding: "var(--space-6) var(--space-9)", display: "flex", gap: "var(--space-8)" }}>
          <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>© 2026 Milaan Systems</span>
          <span style={{ marginLeft: "auto", font: "var(--type-mono-sm)", color: "var(--text-tertiary)" }}>SOC 2 Type II</span>
        </div>
      </div>
    </footer>
  );
}

function Site() {
  return (
    <div>
      <Nav /><Hero /><Triad /><Explain /><Numbers /><Trust /><CTA /><Footer />
    </div>
  );
}
window.MilaanSite = Site;
})();
