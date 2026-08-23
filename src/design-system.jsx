/* Milaan design system — the full component kit (icons, buttons, inputs,
   cards, badges, the reconciliation-specific primitives like ThreeWayCompare
   and LedgerTable) as one dependency-free module. Compiles in-browser via
   Babel standalone; no build step required. */
(function () {
  var React = window.React;

// ── components/core/Icon.jsx ──
// GENERATED from assets/icons/*.svg (Lucide, ISC). Do not hand-edit geometry.
// Each entry is the inner markup of the source file; the wrapper <svg> is
// supplied by Icon.jsx so stroke width and size stay consistent.

const ICONS = {
  "arrow-left": '<path d="m12 19-7-7 7-7"></path> <path d="M19 12H5"></path>',
  "arrow-left-right": '<path d="M8 3 4 7l4 4"></path> <path d="M4 7h16"></path> <path d="m16 21 4-4-4-4"></path> <path d="M20 17H4"></path>',
  "arrow-right": '<path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path>',
  "arrow-up-right": '<path d="M7 7h10v10"></path> <path d="M7 17 17 7"></path>',
  "bell": '<path d="M10.268 21a2 2 0 0 0 3.464 0"></path> <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>',
  "book-open": '<path d="M12 5v16"></path> <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"></path>',
  "calendar": '<path d="M8 2v3"></path> <path d="M16 2v3"></path> <rect x="3" y="3" width="18" height="18" rx="2"></rect> <path d="M3 9h18"></path>',
  "check": '<path d="M20 6 9 17l-5-5"></path>',
  "check-check": '<path d="M18 6 7 17l-5-5"></path> <path d="m22 10-7.5 7.5L13 16"></path>',
  "chevron-down": '<path d="m6 9 6 6 6-6"></path>',
  "chevron-left": '<path d="m15 18-6-6 6-6"></path>',
  "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
  "chevrons-up-down": '<path d="m7 15 5 5 5-5"></path> <path d="m7 9 5-5 5 5"></path>',
  "circle-alert": '<circle cx="12" cy="12" r="10"></circle> <line x1="12" x2="12" y1="8" y2="12"></line> <line x1="12" x2="12.01" y1="16" y2="16"></line>',
  "circle-check": '<circle cx="12" cy="12" r="10"></circle> <path d="m9 12 2 2 4-4"></path>',
  "clock": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 6v6l4 2"></path>',
  "download": '<path d="M12 15V3"></path> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <path d="m7 10 5 5 5-5"></path>',
  "ellipsis": '<circle cx="12" cy="12" r="1"></circle> <circle cx="19" cy="12" r="1"></circle> <circle cx="5" cy="12" r="1"></circle>',
  "external-link": '<path d="M15 3h6v6"></path> <path d="M10 14 21 3"></path> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>',
  "eye": '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path> <circle cx="12" cy="12" r="3"></circle>',
  "file-spreadsheet": '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path> <path d="M14 2v5a1 1 0 0 0 1 1h5"></path> <path d="M8 13h2"></path> <path d="M14 13h2"></path> <path d="M8 17h2"></path> <path d="M14 17h2"></path>',
  "flag": '<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"></path>',
  "funnel": '<path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path>',
  "git-compare-arrows": '<circle cx="5" cy="6" r="3"></circle> <path d="M12 6h5a2 2 0 0 1 2 2v7"></path> <path d="m15 9-3-3 3-3"></path> <circle cx="19" cy="18" r="3"></circle> <path d="M12 18H7a2 2 0 0 1-2-2V9"></path> <path d="m9 15 3 3-3 3"></path>',
  "info": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 16v-4"></path> <path d="M12 8h.01"></path>',
  "landmark": '<path d="M10 18v-7"></path> <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"></path> <path d="M14 18v-7"></path> <path d="M18 18v-7"></path> <path d="M3 22h18"></path> <path d="M6 18v-7"></path>',
  "link": '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path> <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
  "loader-circle": '<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>',
  "lock": '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  "merge": '<path d="m8 6 4-4 4 4"></path> <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"></path> <path d="m20 22-5-5"></path>',
  "message-square": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>',
  "minus": '<path d="M5 12h14"></path>',
  "panel-right-close": '<rect width="18" height="18" x="3" y="3" rx="2"></rect> <path d="M15 3v18"></path> <path d="m8 9 3 3-3 3"></path>',
  "plus": '<path d="M5 12h14"></path> <path d="M12 5v14"></path>',
  "receipt": '<path d="M12 17V7"></path> <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"></path> <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"></path>',
  "refresh-cw": '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path> <path d="M21 3v5h-5"></path> <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path> <path d="M8 16H3v5"></path>',
  "scale": '<path d="M12 3v18"></path> <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path> <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path> <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path> <path d="M7 21h10"></path>',
  "search": '<path d="m21 21-4.34-4.34"></path> <circle cx="11" cy="11" r="8"></circle>',
  "settings": '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path> <circle cx="12" cy="12" r="3"></circle>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path>',
  "sliders-horizontal": '<path d="M10 5H3"></path> <path d="M12 19H3"></path> <path d="M14 3v4"></path> <path d="M16 17v4"></path> <path d="M21 12h-9"></path> <path d="M21 19h-5"></path> <path d="M21 5h-7"></path> <path d="M8 10v4"></path> <path d="M8 12H3"></path>',
  "split": '<path d="M16 3h5v5"></path> <path d="M8 3H3v5"></path> <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"></path> <path d="m15 9 6-6"></path>',
  "trash-2": '<path d="M10 11v6"></path> <path d="M14 11v6"></path> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path> <path d="M3 6h18"></path> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
  "triangle-alert": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path> <path d="M12 9v4"></path> <path d="M12 17h.01"></path>',
  "unlink": '<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"></path> <path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"></path> <line x1="8" x2="8" y1="2" y2="5"></line> <line x1="2" x2="5" y1="8" y2="8"></line> <line x1="16" x2="16" y1="19" y2="22"></line> <line x1="19" x2="22" y1="16" y2="16"></line>',
  "upload": '<path d="M12 3v12"></path> <path d="m17 8-5-5-5 5"></path> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>',
  "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path> <circle cx="12" cy="7" r="4"></circle>',
  "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <path d="M16 3.128a4 4 0 0 1 0 7.744"></path> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <circle cx="9" cy="7" r="4"></circle>',
  "x": '<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path>',
};

const ICON_NAMES = ["arrow-left","arrow-left-right","arrow-right","arrow-up-right","bell","book-open","calendar","check","check-check","chevron-down","chevron-left","chevron-right","chevrons-up-down","circle-alert","circle-check","clock","download","ellipsis","external-link","eye","file-spreadsheet","flag","funnel","git-compare-arrows","info","landmark","link","loader-circle","lock","merge","message-square","minus","panel-right-close","plus","receipt","refresh-cw","scale","search","settings","shield-check","sliders-horizontal","split","trash-2","triangle-alert","unlink","upload","user","users","x"];

/** Lucide glyph at Milaan's stroke settings. Size follows font-size by default. */
function Icon({ name, size = 16, strokeWidth = 1.75, color = "currentColor", label, style, ...rest }) {
  const markup = ICONS[name];
  if (!markup) return null;
  return React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color, strokeWidth,
    strokeLinecap: "round", strokeLinejoin: "round",
    role: label ? "img" : undefined,
    "aria-label": label, "aria-hidden": label ? undefined : true,
    focusable: "false",
    style: { display: "block", flexShrink: 0, ...style },
    dangerouslySetInnerHTML: { __html: markup },
    ...rest,
  });
}


// ── components/core/Wordmark.jsx ──

/** Milaan wordmark. No logo mark exists yet — the name is always set in
 *  Instrument Serif, with the two a's carrying the only optical detail:
 *  a plum period after the word when used as a standalone lockup. */
function Wordmark({ size = 22, color = "var(--text-primary)", dot = true, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        font: `var(--weight-regular) ${size}px/1 var(--font-display)`,
        letterSpacing: "-0.015em",
        color,
        ...style,
      }}
      {...rest}
    >
      Milaan
      {dot ? <span style={{ color: "var(--brand-plum)" }}>.</span> : null}
    </span>
  );
}


// ── components/core/Button.jsx ──

const SIZES = {
  sm: { h: "var(--control-sm)", px: "var(--space-4)", font: "var(--text-caption)", gap: "5px", icon: 13 },
  md: { h: "var(--control-md)", px: "var(--space-5)", font: "var(--text-body-sm)", gap: "6px", icon: 15 },
  lg: { h: "var(--control-lg)", px: "var(--space-7)", font: "var(--text-body)", gap: "8px", icon: 17 },
};

const VARIANTS = {
  primary: {
    background: "var(--action-primary-bg)",
    color: "var(--action-primary-fg)",
    border: "1px solid var(--action-primary-bg)",
    boxShadow: "var(--shadow-inset-top)",
  },
  secondary: {
    background: "var(--action-secondary-bg)",
    color: "var(--action-secondary-fg)",
    border: "1px solid var(--border-default)",
    boxShadow: "var(--shadow-raised)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
  danger: {
    background: "var(--action-danger-bg)",
    color: "var(--action-danger-fg)",
    border: "1px solid var(--action-danger-bg)",
    boxShadow: "var(--shadow-inset-top)",
  },
};

const HOVER = {
  primary: { background: "var(--action-primary-bg-hover)", borderColor: "var(--action-primary-bg-hover)" },
  secondary: { background: "var(--surface-hover)", borderColor: "var(--border-strong)" },
  ghost: { background: "var(--surface-hover)", color: "var(--text-primary)" },
  danger: { background: "oklch(0.49 0.115 32)", borderColor: "oklch(0.49 0.115 32)" },
};

/** Milaan's action control. Label text is sentence case and starts with a verb. */
function Button({
  variant = "secondary",
  size = "md",
  icon,
  iconAfter,
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.secondary;
  const off = disabled || loading;

  return (
    <button
      type="button"
      disabled={off}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.h,
        padding: `0 ${s.px}`,
        font: `var(--weight-medium) ${s.font}/1 var(--font-sans)`,
        letterSpacing: "0.002em",
        borderRadius: "var(--radius-md)",
        cursor: off ? "not-allowed" : "pointer",
        opacity: off ? 0.45 : 1,
        transform: active && !off ? "translateY(0.5px)" : "none",
        transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
        whiteSpace: "nowrap",
        ...v,
        ...(hover && !off ? HOVER[variant] : null),
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <span style={{ display: "flex", animation: "milaan-spin 700ms linear infinite" }}>
          <Icon name="loader-circle" size={s.icon} />
        </span>
      ) : icon ? (
        <Icon name={icon} size={s.icon} />
      ) : null}
      {children}
      {iconAfter ? <Icon name={iconAfter} size={s.icon} /> : null}
      <style>{"@keyframes milaan-spin{to{transform:rotate(360deg)}}"}</style>
    </button>
  );
}


// ── components/core/IconButton.jsx ──

/** Square icon-only control for toolbars and table row affordances. */
function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
  selected = false,
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = size === "sm" ? "var(--control-sm)" : size === "lg" ? "var(--control-lg)" : "var(--control-md)";
  const glyph = size === "sm" ? 13 : size === "lg" ? 18 : 15;
  const bordered = variant === "outline";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        padding: 0,
        borderRadius: "var(--radius-md)",
        border: bordered ? "1px solid var(--border-default)" : "1px solid transparent",
        background: selected
          ? "var(--surface-active)"
          : hover && !disabled
          ? "var(--surface-hover)"
          : bordered
          ? "var(--surface-card)"
          : "transparent",
        color: selected || hover ? "var(--text-primary)" : "var(--text-tertiary)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={glyph} />
    </button>
  );
}


// ── components/core/Input.jsx ──

const H = { sm: "var(--control-sm)", md: "var(--control-md)", lg: "var(--control-lg)" };

/** Text field. Numeric and identifier inputs pass mono so entered figures
 *  align with the tables they will be compared against. */
function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  mono = false,
  size = "md",
  disabled = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  const bad = Boolean(error);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }}>
      {label ? (
        <label htmlFor={uid} style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
          {label}
        </label>
      ) : null}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          height: H[size] || H.md,
          padding: "0 var(--space-5)",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          border: `1px solid ${bad ? "var(--signal-break)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--focus-ring)" : "var(--shadow-raised)",
          transition: "var(--transition-control)",
        }}
      >
        {icon ? <Icon name={icon} size={14} color="var(--text-tertiary)" /> : null}
        <input
          id={uid}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: 0,
            outline: "none",
            background: "transparent",
            font: mono ? "var(--type-mono)" : `var(--weight-regular) var(--text-body-sm)/1.4 var(--font-sans)`,
            fontVariantNumeric: mono ? "tabular-nums lining-nums" : undefined,
            color: "var(--text-primary)",
          }}
          {...rest}
        />
        {suffix ? (
          <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>{suffix}</span>
        ) : null}
      </div>
      {error || hint ? (
        <span style={{ font: "var(--type-caption)", color: bad ? "var(--signal-break)" : "var(--text-tertiary)" }}>
          {error || hint}
        </span>
      ) : null}
    </div>
  );
}


// ── components/core/Select.jsx ──

/** Native select wearing Milaan's control skin. */
function Select({ label, options = [], size = "md", disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  const h = size === "sm" ? "var(--control-sm)" : size === "lg" ? "var(--control-lg)" : "var(--control-md)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }}>
      {label ? (
        <label htmlFor={uid} style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
          {label}
        </label>
      ) : null}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: h,
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          border: `1px solid ${focus ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--focus-ring)" : "var(--shadow-raised)",
          transition: "var(--transition-control)",
        }}
      >
        <select
          id={uid}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            width: "100%",
            height: "100%",
            border: 0,
            outline: "none",
            background: "transparent",
            padding: "0 var(--space-9) 0 var(--space-5)",
            font: `var(--weight-regular) var(--text-body-sm)/1 var(--font-sans)`,
            color: "var(--text-primary)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        >
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return <option key={value} value={value}>{text}</option>;
          })}
        </select>
        <span style={{ position: "absolute", right: "var(--space-4)", pointerEvents: "none", color: "var(--text-tertiary)" }}>
          <Icon name="chevron-down" size={14} />
        </span>
      </div>
    </div>
  );
}


// ── components/core/Checkbox.jsx ──

/** Checkbox. `indeterminate` is used by table headers over partial selections. */
function Checkbox({ checked = false, indeterminate = false, label, description, disabled = false, onChange, id, style, ...rest }) {
  const uid = id || React.useId();
  const on = checked || indeterminate;
  return (
    <label
      htmlFor={uid}
      style={{
        display: "inline-flex",
        alignItems: description ? "flex-start" : "center",
        gap: "var(--space-4)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
    >
      <input
        id={uid}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 15,
          height: 15,
          marginTop: description ? 2 : 0,
          flexShrink: 0,
          borderRadius: "var(--radius-xs)",
          border: `1px solid ${on ? "var(--ink-950)" : "var(--border-strong)"}`,
          background: on ? "var(--ink-950)" : "var(--surface-card)",
          color: "var(--paper)",
          transition: "var(--transition-control)",
        }}
      >
        {indeterminate ? <Icon name="minus" size={11} strokeWidth={2.4} /> : checked ? <Icon name="check" size={11} strokeWidth={2.6} /> : null}
      </span>
      {label ? (
        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ font: "var(--weight-regular) var(--text-body-sm)/1.35 var(--font-sans)", color: "var(--text-primary)" }}>{label}</span>
          {description ? <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
}


// ── components/core/Radio.jsx ──

/** Radio, for 2–4 mutually exclusive options shown together. */
function Radio({ checked = false, label, description, name, value, disabled = false, onChange, id, style, ...rest }) {
  const uid = id || React.useId();
  return (
    <label
      htmlFor={uid}
      style={{
        display: "inline-flex",
        alignItems: description ? "flex-start" : "center",
        gap: "var(--space-4)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
    >
      <input
        id={uid}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 15,
          height: 15,
          marginTop: description ? 2 : 0,
          flexShrink: 0,
          borderRadius: "var(--radius-pill)",
          border: `1px solid ${checked ? "var(--ink-950)" : "var(--border-strong)"}`,
          background: "var(--surface-card)",
          transition: "var(--transition-control)",
        }}
      >
        {checked ? <span style={{ width: 7, height: 7, borderRadius: "var(--radius-pill)", background: "var(--ink-950)" }} /> : null}
      </span>
      {label ? (
        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ font: "var(--weight-regular) var(--text-body-sm)/1.35 var(--font-sans)" }}>{label}</span>
          {description ? <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
}


// ── components/core/Switch.jsx ──

/** Switch — for settings that take effect immediately (auto-match, alerts). */
function Switch({ checked = false, label, disabled = false, onChange, id, style, ...rest }) {
  const uid = id || React.useId();
  return (
    <label
      htmlFor={uid}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-5)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
    >
      <input
        id={uid}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span
        aria-hidden="true"
        style={{
          position: "relative",
          width: 32,
          height: 18,
          flexShrink: 0,
          borderRadius: "var(--radius-pill)",
          background: checked ? "var(--ink-950)" : "var(--ink-300)",
          transition: "background-color var(--dur-base) var(--ease-standard)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 16 : 2,
            width: 14,
            height: 14,
            borderRadius: "var(--radius-pill)",
            background: "var(--paper-pure)",
            boxShadow: "0 1px 2px oklch(0.155 0.022 318 / 0.28)",
            transition: "left var(--dur-base) var(--ease-out)",
          }}
        />
      </span>
      {label ? <span style={{ font: "var(--weight-regular) var(--text-body-sm)/1.35 var(--font-sans)" }}>{label}</span> : null}
    </label>
  );
}


// ── components/core/Badge.jsx ──

const TONES = {
  neutral: { bg: "var(--ink-100)", fg: "var(--text-secondary)", edge: "var(--border-default)", dot: "var(--ink-500)" },
  match: { bg: "var(--tint-match)", fg: "oklch(0.42 0.10 152)", edge: "var(--edge-match)", dot: "var(--signal-match)" },
  review: { bg: "var(--tint-review)", fg: "oklch(0.42 0.10 70)", edge: "var(--edge-review)", dot: "var(--signal-review)" },
  break: { bg: "var(--tint-break)", fg: "oklch(0.42 0.10 32)", edge: "var(--edge-break)", dot: "var(--signal-break)" },
  info: { bg: "var(--tint-info)", fg: "oklch(0.42 0.10 235)", edge: "var(--edge-info)", dot: "var(--signal-info)" },
  plum: { bg: "var(--tint-plum)", fg: "oklch(0.42 0.10 320)", edge: "var(--edge-info)", dot: "var(--brand-plum)" },
};

/** Status pill. The only pill-shaped thing in Milaan, so a pill always means
 *  "this is a state", never "this is a button". */
function Badge({ tone = "neutral", dot = false, children, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        height: 20,
        padding: "0 8px",
        borderRadius: "var(--radius-pill)",
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.edge}`,
        font: "var(--weight-medium) var(--text-micro)/1 var(--font-mono)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot ? <span style={{ width: 5, height: 5, borderRadius: "var(--radius-pill)", background: t.dot }} /> : null}
      {children}
    </span>
  );
}


// ── components/core/Tag.jsx ──

/** Square-cornered metadata chip. Used for filters, rule names, and account
 *  labels. Removable when it represents an applied filter. */
function Tag({ icon, onRemove, mono = false, children, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        height: 22,
        padding: onRemove ? "0 4px 0 7px" : "0 7px",
        borderRadius: "var(--radius-sm)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        color: "var(--text-secondary)",
        font: mono ? "var(--type-mono-sm)" : "var(--weight-regular) var(--text-caption)/1 var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={12} color="var(--text-tertiary)" /> : null}
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: "flex",
            border: 0,
            background: "transparent",
            padding: 2,
            borderRadius: "var(--radius-xs)",
            cursor: "pointer",
            color: "var(--text-tertiary)",
          }}
        >
          <Icon name="x" size={11} />
        </button>
      ) : null}
    </span>
  );
}


// ── components/core/Card.jsx ──

/** Surface container. Depth is a hairline border, not a shadow — `floating`
 *  is only for things detached from the page. `ruled` fills the body with the
 *  ledger-rule texture, used behind empty states. */
function Card({ title, action, padding = "var(--space-7)", floating = false, ruled = false, children, style, ...rest }) {
  return (
    <section
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-hairline)",
        borderRadius: "var(--radius-lg)",
        boxShadow: floating ? "var(--shadow-popover)" : "var(--shadow-raised)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {title || action ? (
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-5)",
            padding: `var(--space-5) var(--space-7)`,
            borderBottom: "1px solid var(--border-hairline)",
            background: "var(--surface-card)",
          }}
        >
          <h3 style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)", margin: 0 }}>
            {title}
          </h3>
          {action}
        </header>
      ) : null}
      <div style={{ padding, background: ruled ? "var(--texture-ruled)" : undefined }}>{children}</div>
    </section>
  );
}


// ── components/core/Tabs.jsx ──

/** Underlined tab bar. The active tab is marked by a 1.5px ink rule that
 *  sits on the same hairline as the container's bottom border. */
function Tabs({ items = [], value, onChange, counts = {}, style, ...rest }) {
  const [hover, setHover] = React.useState(null);
  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: "var(--space-7)",
        borderBottom: "1px solid var(--border-hairline)",
        ...style,
      }}
      {...rest}
    >
      {items.map((it) => {
        const id = typeof it === "string" ? it : it.value;
        const text = typeof it === "string" ? it : it.label;
        const active = id === value;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(id)}
            onMouseEnter={() => setHover(id)}
            onMouseLeave={() => setHover(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-4)",
              padding: "0 0 var(--space-5)",
              marginBottom: -1,
              border: 0,
              borderBottom: `1.5px solid ${active ? "var(--ink-950)" : "transparent"}`,
              background: "transparent",
              cursor: "pointer",
              color: active ? "var(--text-primary)" : hover === id ? "var(--text-secondary)" : "var(--text-tertiary)",
              font: `var(--weight-medium) var(--text-body-sm)/1 var(--font-sans)`,
              transition: "var(--transition-control)",
            }}
          >
            {text}
            {counts[id] != null ? (
              <span style={{ font: "var(--type-mono-sm)", color: "var(--text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
                {counts[id]}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}


// ── components/core/Dialog.jsx ──

/** Modal. Milaan uses dialogs only for irreversible decisions and for
 *  posting adjustments — never for information that could be inline. */
function Dialog({ open = true, title, description, footer, width = 480, onClose, children, style, ...rest }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "oklch(0.155 0.022 318 / 0.32)",
        padding: "var(--space-9)",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "100%",
          background: "var(--surface-card)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-dialog)",
          overflow: "hidden",
          animation: "milaan-rise var(--dur-base) var(--ease-out)",
          ...style,
        }}
        {...rest}
      >
        <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-6)", padding: "var(--space-7) var(--space-7) var(--space-5)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <h2 style={{ font: "var(--type-subtitle)", letterSpacing: "var(--tracking-title)", margin: 0 }}>{title}</h2>
            {description ? <p style={{ fontFamily: "var(--font-sans)", fontWeight: "var(--weight-regular)", fontSize: "var(--text-body-sm)", lineHeight: 1.5, color: "var(--text-secondary)", margin: 0 }}>{description}</p> : null}
          </div>
          {onClose ? <IconButton icon="x" label="Close" size="sm" onClick={onClose} /> : null}
        </header>
        {children ? <div style={{ padding: "0 var(--space-7) var(--space-7)" }}>{children}</div> : null}
        {footer ? (
          <footer style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-4)", padding: "var(--space-5) var(--space-7)", borderTop: "1px solid var(--border-hairline)", background: "var(--ink-050)" }}>
            {footer}
          </footer>
        ) : null}
        <style>{"@keyframes milaan-rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}"}</style>
      </div>
    </div>
  );
}


// ── components/core/Tooltip.jsx ──

/** Hover explanation. Dark, mono, terse — used heavily in tables to expand
 *  a rule id or a truncated reference without leaving the row. */
function Tooltip({ label, side = "top", children, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const pos =
    side === "bottom" ? { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }
    : side === "left" ? { right: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" }
    : side === "right" ? { left: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" }
    : { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" };

  return (
    <span
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...rest}
    >
      {children}
      {open ? (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            ...pos,
            zIndex: 40,
            padding: "5px 8px",
            maxWidth: 260,
            background: "var(--ink-950)",
            color: "var(--paper)",
            borderRadius: "var(--radius-sm)",
            font: "var(--type-mono-sm)",
            lineHeight: 1.45,
            whiteSpace: "pre-wrap",
            boxShadow: "var(--shadow-popover)",
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}


// ── components/core/Toast.jsx ──

const TONE = {
  info: { icon: "info", color: "var(--signal-info)" },
  match: { icon: "circle-check", color: "var(--signal-match)" },
  review: { icon: "triangle-alert", color: "var(--signal-review)" },
  break: { icon: "circle-alert", color: "var(--signal-break)" },
};

/** Transient confirmation. Always states what happened in past tense and
 *  offers the undo, because reconciliation actions are reversible. */
function Toast({ tone = "info", title, detail, action, onClose, style, ...rest }) {
  const t = TONE[tone] || TONE.info;
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-5)",
        width: 360,
        padding: "var(--space-5) var(--space-5) var(--space-5) var(--space-6)",
        background: "var(--ink-950)",
        color: "var(--paper)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-dialog)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ marginTop: 1, color: t.color }}><Icon name={t.icon} size={15} /></span>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ font: `var(--weight-medium) var(--text-body-sm)/1.35 var(--font-sans)` }}>{title}</span>
        {detail ? <span style={{ font: "var(--type-mono-sm)", color: "var(--ink-400)" }}>{detail}</span> : null}
      </div>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          style={{ border: 0, background: "transparent", color: "var(--paper)", font: `var(--weight-medium) var(--text-caption)/1 var(--font-sans)`, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer", padding: "3px 2px" }}
        >
          {action.label}
        </button>
      ) : null}
      {onClose ? <IconButton icon="x" label="Dismiss" size="sm" onClick={onClose} style={{ color: "var(--ink-400)" }} /> : null}
    </div>
  );
}


// ── components/data/Amount.jsx ──

const SYMBOL = { USD: "$", EUR: "\u20ac", GBP: "\u00a3", INR: "\u20b9", JPY: "\u00a5" };

function group(n, decimals) {
  return Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Every figure in Milaan goes through Amount. Tabular mono, slashed zero,
 *  currency symbol muted, negatives in parentheses (accounting convention,
 *  not a minus sign), and a `delta` mode that colours by signal. */
function Amount({
  value = 0,
  currency = "USD",
  decimals = 2,
  size = "body",
  delta = false,
  showSymbol = true,
  align = "right",
  style,
  ...rest
}) {
  const neg = value < 0;
  const fs =
    size === "figure" ? "var(--text-title)"
    : size === "lg" ? "var(--text-subtitle)"
    : size === "sm" ? "var(--text-caption)"
    : "var(--text-body-sm)";
  const color = delta
    ? value === 0 ? "var(--signal-match)" : "var(--signal-break)"
    : "var(--text-primary)";

  return (
    <span
      data-numeric=""
      style={{
        display: "inline-flex",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        alignItems: "baseline",
        gap: 1,
        fontFamily: "var(--font-mono)",
        fontSize: fs,
        fontWeight: size === "figure" ? "var(--weight-medium)" : "var(--weight-regular)",
        fontVariantNumeric: "tabular-nums lining-nums",
        fontFeatureSettings: '"zero" 1',
        letterSpacing: "-0.01em",
        color,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {neg ? "(" : delta && value > 0 ? "+" : ""}
      {showSymbol ? <span style={{ color: "var(--text-tertiary)", marginRight: 1 }}>{SYMBOL[currency] || currency}</span> : null}
      {group(value, decimals)}
      {neg ? ")" : ""}
    </span>
  );
}


// ── components/data/SourceChip.jsx ──

/** The three records Milaan reads. A SourceChip always uses the same glyph
 *  and the same order — ledger, settlement, bank — so a reader learns the
 *  triad's shape once. */
const SOURCES = {
  ledger: { label: "Ledger", icon: "book-open", short: "LDG" },
  settlement: { label: "Settlement", icon: "receipt", short: "STL" },
  bank: { label: "Bank", icon: "landmark", short: "BNK" },
};

function SourceChip({ source = "ledger", present = true, short = false, style, ...rest }) {
  const s = SOURCES[source] || SOURCES.ledger;
  return (
    <span
      title={present ? `${s.label}: present` : `${s.label}: missing`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        height: 20,
        padding: "0 6px",
        borderRadius: "var(--radius-sm)",
        border: `1px ${present ? "solid" : "dashed"} ${present ? "var(--border-default)" : "var(--edge-break)"}`,
        background: present ? "var(--surface-card)" : "var(--tint-break)",
        color: present ? "var(--text-secondary)" : "var(--signal-break)",
        font: "var(--weight-medium) var(--text-micro)/1 var(--font-mono)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        opacity: present ? 1 : 0.95,
        ...style,
      }}
      {...rest}
    >
      <Icon name={s.icon} size={11} strokeWidth={1.9} />
      {short ? s.short : s.label}
    </span>
  );
}

/** All three sources at a glance: filled where the record exists, dashed
 *  where it is missing. This is the product's core glyph. */
function SourceTriad({ ledger = true, settlement = true, bank = true, short = true, style, ...rest }) {
  return (
    <span style={{ display: "inline-flex", gap: "var(--space-2)", ...style }} {...rest}>
      <SourceChip source="ledger" present={ledger} short={short} />
      <SourceChip source="settlement" present={settlement} short={short} />
      <SourceChip source="bank" present={bank} short={short} />
    </span>
  );
}


// ── components/data/MatchStatus.jsx ──

/** The five states a transaction can be in. This vocabulary is fixed: every
 *  screen, export, and API response uses these five words and no synonyms. */
const MATCH_STATES = {
  matched: { tone: "match", label: "Matched", blurb: "All three records agree." },
  partial: { tone: "review", label: "Partial", blurb: "Two of three records agree." },
  variance: { tone: "review", label: "Variance", blurb: "Records agree on identity, not on amount." },
  missing: { tone: "break", label: "Missing", blurb: "A record does not exist in one source." },
  duplicate: { tone: "break", label: "Duplicate", blurb: "The same transaction appears twice in one source." },
};

function MatchStatus({ state = "matched", withDot = true, style, ...rest }) {
  const s = MATCH_STATES[state] || MATCH_STATES.matched;
  return (
    <Badge tone={s.tone} dot={withDot} title={s.blurb} style={style} {...rest}>
      {s.label}
    </Badge>
  );
}


// ── components/data/VarianceBar.jsx ──

/** Reconciliation summary bar: how much of a period's value is settled,
 *  under review, and broken. Segments only, no legend inside — the caller
 *  labels them. Zero-width segments are dropped rather than shown as slivers. */
function VarianceBar({ matched = 0, review = 0, broken = 0, currency = "USD", showTotals = true, height = 8, style, ...rest }) {
  const total = matched + review + broken || 1;
  const segs = [
    { key: "matched", v: matched, c: "var(--signal-match)", label: "Matched" },
    { key: "review", v: review, c: "var(--signal-review)", label: "Under review" },
    { key: "broken", v: broken, c: "var(--signal-break)", label: "Breaks" },
  ].filter((s) => s.v > 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", ...style }} {...rest}>
      <div style={{ display: "flex", gap: 2, height, borderRadius: "var(--radius-pill)", overflow: "hidden", background: "var(--ink-100)" }}>
        {segs.map((s) => (
          <div key={s.key} title={`${s.label} ${(s.v / total * 100).toFixed(1)}%`} style={{ width: `${(s.v / total) * 100}%`, background: s.c }} />
        ))}
      </div>
      {showTotals ? (
        <div style={{ display: "flex", gap: "var(--space-8)", flexWrap: "wrap" }}>
          {segs.map((s) => (
            <div key={s.key} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "var(--radius-pill)", background: s.c, flexShrink: 0 }} />
              <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
                {s.label}
              </span>
              <Amount value={s.v} currency={currency} decimals={0} size="sm" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}


// ── components/data/LedgerTable.jsx ──

/** Milaan's table. Hairline rules, no zebra striping, no vertical borders;
 *  a left signal rule marks rows that need attention. Columns declare
 *  `numeric` so figures right-align in mono automatically.
 *
 *  columns: [{ key, header, width, numeric, render }]
 */
function LedgerTable({
  columns = [],
  rows = [],
  selectable = false,
  selected = [],
  onSelect,
  onRowClick,
  activeId,
  dense = false,
  emptyMessage = "Nothing to reconcile here.",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(null);
  const rowH = dense ? "var(--row-height-dense)" : "var(--row-height)";
  const allOn = rows.length > 0 && selected.length === rows.length;

  const toggle = (id) => {
    if (!onSelect) return;
    onSelect(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  return (
    <div style={{ width: "100%", overflow: "auto", ...style }} {...rest}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
            {selectable ? (
              <th style={{ width: 34, padding: "0 0 var(--space-4) var(--space-6)" }}>
                <Checkbox
                  checked={allOn}
                  indeterminate={selected.length > 0 && !allOn}
                  onChange={() => onSelect && onSelect(allOn ? [] : rows.map((r) => r.id))}
                />
              </th>
            ) : null}
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  width: c.width,
                  padding: `0 var(--space-6) var(--space-4)`,
                  textAlign: c.numeric ? "right" : "left",
                  font: "var(--type-label)",
                  letterSpacing: "var(--tracking-label)",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  whiteSpace: "nowrap",
                }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ padding: "var(--space-11) var(--space-6)", textAlign: "center", background: "var(--texture-ruled)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-4)", padding: "var(--space-4) var(--space-6)", background: "var(--surface-card)", font: "var(--type-mono)", color: "var(--text-tertiary)" }}>
                  <Icon name="check-check" size={14} color="var(--signal-match)" />
                  {emptyMessage}
                </span>
              </td>
            </tr>
          ) : (
            rows.map((r) => {
              const on = selected.includes(r.id);
              const active = activeId === r.id;
              const signal =
                r.signal === "break" ? "var(--signal-break)"
                : r.signal === "review" ? "var(--signal-review)"
                : r.signal === "match" ? "var(--signal-match)"
                : "transparent";
              return (
                <tr
                  key={r.id}
                  onMouseEnter={() => setHover(r.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onRowClick && onRowClick(r)}
                  style={{
                    height: rowH,
                    borderBottom: "1px solid var(--border-hairline)",
                    background: active ? "var(--surface-selected)" : on ? "var(--ink-050)" : hover === r.id ? "var(--surface-hover)" : "transparent",
                    cursor: onRowClick ? "pointer" : "default",
                    transition: "background-color var(--dur-instant) var(--ease-standard)",
                    boxShadow: `inset 2px 0 0 ${signal}`,
                  }}
                >
                  {selectable ? (
                    <td style={{ padding: "0 0 0 var(--space-6)" }} onClick={(e) => { e.stopPropagation(); toggle(r.id); }}>
                      <Checkbox checked={on} onChange={() => {}} />
                    </td>
                  ) : null}
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      style={{
                        padding: `0 var(--space-6)`,
                        textAlign: c.numeric ? "right" : "left",
                        font: c.numeric ? "var(--type-mono)" : `var(--weight-regular) var(--text-body-sm)/1.4 var(--font-sans)`,
                        fontVariantNumeric: c.numeric ? "tabular-nums lining-nums" : undefined,
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.render ? c.render(r) : r[c.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}


// ── components/data/ThreeWayCompare.jsx ──

/** The three-way comparison. Milaan's answer to "why doesn't this add up":
 *  one row per source, the same field down the column, and the disagreeing
 *  cell marked. Rows for missing records are dashed and struck.
 *
 *  records: { ledger, settlement, bank } — each { amount, date, reference } or null
 *  disagree: array of field names that differ, e.g. ["amount"]
 */
function ThreeWayCompare({ records = {}, disagree = [], currency = "USD", note, style, ...rest }) {
  const order = ["ledger", "settlement", "bank"];
  const bad = (f) => disagree.includes(f);

  const cellStyle = (f, missing) => ({
    padding: "var(--space-5) var(--space-6)",
    font: "var(--type-mono)",
    fontVariantNumeric: "tabular-nums lining-nums",
    color: missing ? "var(--text-disabled)" : bad(f) ? "var(--signal-break)" : "var(--text-primary)",
    background: bad(f) && !missing ? "var(--tint-break)" : "transparent",
    borderBottom: "1px solid var(--border-hairline)",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--surface-card)", ...style }} {...rest}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Source", "Amount", "Value date", "Reference"].map((h, i) => (
              <th key={h} style={{ padding: "var(--space-4) var(--space-6)", textAlign: i === 1 ? "right" : "left", font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-tertiary)", background: "var(--ink-050)", borderBottom: "1px solid var(--border-default)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {order.map((k) => {
            const r = records[k];
            const missing = !r;
            const meta = SOURCES[k];
            return (
              <tr key={k}>
                <td style={{ ...cellStyle("source", missing), background: "transparent" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-4)", color: missing ? "var(--signal-break)" : "var(--text-secondary)" }}>
                    <Icon name={meta.icon} size={13} />
                    <span style={{ font: `var(--weight-medium) var(--text-body-sm)/1 var(--font-sans)` }}>{meta.label}</span>
                  </span>
                </td>
                <td style={{ ...cellStyle("amount", missing), textAlign: "right" }}>
                  {missing ? <span style={{ letterSpacing: "0.2em" }}>———</span> : <Amount value={r.amount} currency={currency} />}
                </td>
                <td style={cellStyle("date", missing)}>{missing ? "—" : r.date}</td>
                <td style={{ ...cellStyle("reference", missing), color: missing ? "var(--text-disabled)" : "var(--text-secondary)" }}>
                  {missing ? "not present in source" : r.reference}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {note ? (
        <div style={{ display: "flex", gap: "var(--space-5)", padding: "var(--space-5) var(--space-6)", background: "var(--ink-050)" }}>
          <span style={{ marginTop: 2, color: "var(--signal-break)" }}><Icon name="circle-alert" size={14} /></span>
          <p style={{ margin: 0, font: `var(--weight-regular) var(--text-body-sm)/1.5 var(--font-sans)`, color: "var(--text-secondary)" }}>{note}</p>
        </div>
      ) : null}
    </div>
  );
}


  window.MilaanUI = { ICONS, ICON_NAMES, Icon, Wordmark, SIZES, VARIANTS, HOVER, Button, IconButton, H, Input, Select, Checkbox, Radio, Switch, TONES, Badge, Tag, Card, Tabs, Dialog, Tooltip, TONE, Toast, SYMBOL, Amount, SOURCES, SourceChip, SourceTriad, MATCH_STATES, MatchStatus, VarianceBar, LedgerTable, ThreeWayCompare };
})();
