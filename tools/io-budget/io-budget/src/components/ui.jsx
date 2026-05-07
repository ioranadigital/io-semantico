import { useState } from "react";
import { ACCENT, fmtI, fmtDate, css } from "../data/constants.js";

const NAVY  = "#0a2b49";
const CLOUD = "#ebf2f7";

export function SL({ children, mb = 8 }) {
  return <div style={{ ...css.lbl, marginBottom: mb }}>{children}</div>;
}

export function Card({ children, style, accent = ACCENT }) {
  return (
    <div style={{ ...css.card, borderLeft: `3px solid ${accent}`, ...style }}>
      {children}
    </div>
  );
}

export function Ghost({ children, style }) {
  return <div style={{ ...css.ghost, ...style }}>{children}</div>;
}

export function Divider({ m = 12 }) {
  return <div style={{ borderTop: "1px solid rgba(10,43,73,0.08)", margin: `${m}px 0` }} />;
}

export function CH({ children, align = "left" }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, letterSpacing: "0.07em",
      textTransform: "uppercase", color: "rgba(10,43,73,0.6)",
      textAlign: align, display: "block",
    }}>
      {children}
    </span>
  );
}

// Badge: naranja solo cuando bg=ACCENT (texto blanco); por defecto navy/cloud
export function Badge({ children, color = NAVY, bg = CLOUD }) {
  return (
    <span style={{
      fontSize: 11, padding: "2px 9px", borderRadius: 999,
      background: bg, color, fontWeight: 500, whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

export function DateTag({ date, prefix = "" }) {
  if (!date) return null;
  const d = date.length > 10 ? date.slice(0, 10) : date;
  return <span style={css.dateTag}>📅 {prefix}{fmtDate(d)}</span>;
}

// MetricCard: accent=true → fondo naranja + texto blanco (legible)
// accent=false → fondo blanco + número navy
export function MetricCard({ label, value, accent }) {
  return (
    <div style={{
      background: accent ? ACCENT : "#ffffff",
      border: accent ? "none" : "1px solid rgba(10,43,73,0.10)",
      borderRadius: 10,
      padding: "0.85rem 1rem",
      boxShadow: accent ? "0 2px 8px rgba(255,140,34,0.20)" : "0 1px 3px rgba(10,43,73,0.05)",
    }}>
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
        color: accent ? "rgba(255,255,255,0.75)" : "rgba(10,43,73,0.55)",
        marginBottom: 5,
      }}>{label}</div>
      <div style={{
        fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em",
        color: accent ? "#ffffff" : NAVY,
      }}>{value}</div>
    </div>
  );
}

export function Btn({ children, onClick, variant = "ghost", size = "md", color, style }) {
  const base = {
    border: "none", cursor: "pointer", fontWeight: 500, borderRadius: 8,
    fontSize: size === "sm" ? 12 : 13, lineHeight: 1, transition: "background 0.15s, opacity 0.15s",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
  };
  const variants = {
    // Primario: naranja BG + texto blanco ✓
    primary: {
      background: color || ACCENT,
      color: "#ffffff",
      padding: size === "sm" ? "5px 12px" : "9px 20px",
      border: "none",
    },
    // Ghost: borde navy suave, texto navy
    ghost: {
      background: "transparent",
      border: `1px solid ${color ? color + "55" : "rgba(10,43,73,0.20)"}`,
      color: color || NAVY,
      padding: size === "sm" ? "4px 10px" : "8px 16px",
    },
    // Danger: borde naranja, icono naranja (pequeño, de acento)
    danger: {
      background: "rgba(255,140,34,0.10)",
      border: "1px solid rgba(255,140,34,0.28)",
      color: ACCENT,
      padding: "0",
      borderRadius: "50%",
      width: size === "sm" ? 24 : 30,
      height: size === "sm" ? 24 : 30,
      flexShrink: 0,
    },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

export function Toggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 36, height: 20, borderRadius: 10,
        background: active ? NAVY : CLOUD,
        border: `1px solid ${active ? NAVY : "rgba(10,43,73,0.15)"}`,
        position: "relative", cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
      }}
    >
      <div style={{
        width: 14, height: 14, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2, left: active ? 18 : 2,
        transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
      }} />
    </div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 3, background: CLOUD, borderRadius: 10, padding: 4, flexWrap: "wrap" }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1, padding: "9px 14px",
            border: active === t.id ? "1.5px solid rgba(255,140,34,0.35)" : "1.5px solid transparent",
            borderRadius: 8, cursor: "pointer", fontSize: 13,
            fontWeight: active === t.id ? 600 : 400, whiteSpace: "nowrap",
            background: active === t.id ? "#ffffff" : "transparent",
            color: NAVY,
            boxShadow: active === t.id ? "0 1px 4px rgba(10,43,73,0.09)" : "none",
            transition: "all 0.15s",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// TipoBadge: "Por horas" → naranja BG + texto blanco para máximo contraste
export function TipoBadge({ tipo }) {
  const map = {
    contrato: [NAVY,    CLOUD,   "Contrato"],
    horas:    ["#fff",  ACCENT,  "Por horas"],
    ambos:    [NAVY,    CLOUD,   "Contrato + Horas"],
  };
  const [c, bg, l] = map[tipo] || map.contrato;
  return <Badge color={c} bg={bg}>{l}</Badge>;
}

// EstadoBadge: activo → naranja BG + texto blanco; inactivo → cloud + navy
export function EstadoBadge({ estado, fechaInicio, fechaFin }) {
  const activo = (estado || "activo") === "activo";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, padding: "3px 9px", borderRadius: 999, fontWeight: 600, whiteSpace: "nowrap",
      background: activo ? ACCENT : CLOUD,
      color: activo ? "#ffffff" : "rgba(10,43,73,0.55)",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
        background: activo ? "#ffffff" : "rgba(10,43,73,0.35)",
      }} />
      {activo
        ? `Activo${fechaInicio ? ` · desde ${fmtDate(fechaInicio)}` : ""}`
        : `Inactivo${fechaFin ? ` · hasta ${fmtDate(fechaFin)}` : ""}`}
    </span>
  );
}

// MiniBar: barras navy (visible sobre blanco), área de fondo sutil
export function MiniBar({ data, h = 110 }) {
  if (!data?.length) return (
    <div style={{ height: h, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(10,43,73,0.4)", fontSize: 13 }}>
      Sin datos aún
    </div>
  );
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: h, background: "#f0f4f8", borderRadius: 8, padding: "8px 8px 0" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {d.value > 0 && <span style={{ fontSize: 9, color: NAVY, fontWeight: 600 }}>{fmtI(d.value)}€</span>}
          <div style={{
            width: "100%", minHeight: 4,
            height: Math.max(4, (d.value / max) * (h - 42)),
            background: NAVY, borderRadius: "4px 4px 0 0", transition: "height 0.35s",
          }} />
          <span style={{ fontSize: 9, color: "rgba(10,43,73,0.55)", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%", paddingBottom: 4 }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ConfirmBtn({ onConfirm, children = "×", size = "sm", msg = "¿Eliminar?" }) {
  const [pending, setPending] = useState(false);
  if (pending) return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span style={{ fontSize: 11, color: "rgba(10,43,73,0.6)" }}>{msg}</span>
      <button onClick={() => { onConfirm(); setPending(false); }}
        style={{ background: "#dc2626", color: "#fff", border: "none", borderRadius: 4, padding: "2px 7px", cursor: "pointer", fontSize: 11 }}>
        ✓
      </button>
      <button onClick={() => setPending(false)}
        style={{ background: "rgba(10,43,73,0.08)", color: "#0a2b49", border: "none", borderRadius: 4, padding: "2px 7px", cursor: "pointer", fontSize: 11 }}>
        ✗
      </button>
    </span>
  );
  return <Btn variant="danger" size={size} onClick={() => setPending(true)}>{children}</Btn>;
}
