/**
 * Helpers compartidos entre Resultados y el tab Historial de ClienteContrato.
 */
import { ACCENT, fmt, fmtDate, css } from "../data/constants.js";
import { Badge, Btn, DateTag } from "./ui.jsx";

const NAVY = "#0a2b49";

// ── Colores de período ────────────────────────────────────────────
export const PC = {
  activo: {
    bg:          "rgba(22,163,74,0.09)",
    border:      "rgba(22,163,74,0.35)",
    badgeBg:     "rgba(22,163,74,0.18)",
    badgeColor:  "#166534",
    leftBorder:  "rgba(22,163,74,0.40)",
    label:       "● Activo",
  },
  finalizado: {
    bg:          "rgba(220,38,38,0.07)",
    border:      "rgba(220,38,38,0.20)",
    badgeBg:     "rgba(220,38,38,0.14)",
    badgeColor:  "#991b1b",
    leftBorder:  "rgba(220,38,38,0.25)",
    label:       "○ Finalizado",
  },
};

// ── buildPeriodos ─────────────────────────────────────────────────
export function buildPeriodos(cl) {
  const cerrados  = (cl.periodos || []).map(p => ({ ...p, activo: false }));
  const corriente = { inicio: cl.creadoEn, fin: cl.fechaFin || null, activo: (cl.estado || "activo") === "activo" };
  return [...cerrados, corriente].sort((a, b) => (a.inicio || "").localeCompare(b.inicio || ""));
}

// ── enPeriodo ─────────────────────────────────────────────────────
export function enPeriodo(r, periodo) {
  const d = r.ts.slice(0, 10);
  const ok_ini = !periodo.inicio || d >= periodo.inicio;
  const ok_fin = periodo.fin === null || d <= periodo.fin;
  return ok_ini && ok_fin;
}

// ── PeriodoHeader (clickable para expand/collapse) ────────────────
export function PeriodoHeader({ num, total, periodo, recordCount, expanded, onToggle }) {
  const c = periodo.activo ? PC.activo : PC.finalizado;
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
        padding: "8px 12px", borderRadius: 8, marginBottom: expanded ? 8 : 0,
        background: c.bg, border: `1px solid ${c.border}`,
        cursor: recordCount > 0 ? "pointer" : "default",
        userSelect: "none", transition: "opacity 0.15s",
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.55)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Período {num}
      </span>
      <span style={{ fontSize: 11, color: "rgba(10,43,73,0.55)" }}>
        {fmtDate(periodo.inicio)}
        {periodo.fin ? ` → ${fmtDate(periodo.fin)}` : " → actualidad"}
      </span>
      <span style={{
        fontSize: 11, padding: "2px 8px", borderRadius: 999, fontWeight: 600,
        background: c.badgeBg, color: c.badgeColor,
      }}>
        {c.label}
      </span>
      {recordCount > 0 && (
        <>
          <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 13, color: NAVY }}>{fmt(total)} €</span>
          <span style={{ fontSize: 12, color: "rgba(10,43,73,0.40)" }}>{expanded ? "▲" : "▼"}</span>
        </>
      )}
    </div>
  );
}

// ── RecordRow ─────────────────────────────────────────────────────
export function RecordRow({ r, onDel }) {
  const tipo = r.tipo;
  const isContrato = tipo === "contrato";
  const isPack     = tipo === "horas_pack";

  let bg, badgeColor, badgeBg, badgeLabel, detail;
  if (isContrato) {
    bg = "#ebf2f7"; badgeColor = NAVY; badgeBg = "#dce8f2"; badgeLabel = "Contrato";
    detail = `${r.paquete} · ${r.meses}m`;
  } else if (isPack) {
    bg = "rgba(10,43,73,0.05)"; badgeColor = "#fff"; badgeBg = NAVY; badgeLabel = "Pack horas";
    const fechas = r.fechaInicio ? ` · ${r.fechaInicio}${r.fechaFin ? ` → ${r.fechaFin}` : ""}` : "";
    detail = `${r.nombre || "Paquete"} · ${r.horas}h · ${fmt(r.tarifa)} €/h${fechas}`;
  } else {
    bg = "rgba(255,140,34,0.07)"; badgeColor = ACCENT; badgeBg = "rgba(255,140,34,0.18)"; badgeLabel = "Horas";
    detail = `${r.horas}h · ${fmt(r.tarifa)} €/h`;
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "6px 10px",
      background: bg, borderRadius: 8, marginBottom: 4,
    }}>
      <Badge color={badgeColor} bg={badgeBg}>{badgeLabel}</Badge>
      <span style={{ fontSize: 12, flex: 1, color: NAVY }}>{detail}</span>
      <DateTag date={r.ts} />
      <span style={{ fontWeight: 600, fontSize: 13, color: NAVY }}>{fmt(r.sinIva)} €</span>
      <span style={{ fontWeight: 500, fontSize: 12, color: "rgba(10,43,73,0.5)" }}>{fmt(r.conIva)} € c/IVA</span>
      {onDel && <Btn variant="danger" size="sm" onClick={() => onDel(r.id)}>×</Btn>}
    </div>
  );
}

// ── HistorialCliente: períodos + registros colapsables ────────────
// expandedSet: Set<string> de claves "clienteKey-periodoIdx"
// onToggle: (key) => void
export function HistorialPeriodos({ cl, items, clientKey, expandedSet, onToggle, onDel }) {
  const periodos = buildPeriodos(cl);

  return periodos.map((periodo, idx) => {
    const pRecords = items.filter(r => enPeriodo(r, periodo));
    const pTotal   = pRecords.reduce((a, r) => a + r.sinIva, 0);
    const cItems   = pRecords.filter(r => r.tipo === "contrato");
    const hItems   = pRecords.filter(r => r.tipo === "horas" || r.tipo === "horas_pack");
    const expKey   = `${clientKey}-${idx}`;
    const open     = expandedSet.has(expKey);

    if (pRecords.length === 0 && !periodo.activo) return null;

    return (
      <div key={idx} style={{ marginBottom: 8 }}>
        <PeriodoHeader
          num={idx + 1} total={pTotal} periodo={periodo}
          recordCount={pRecords.length} expanded={open}
          onToggle={() => pRecords.length > 0 && onToggle(expKey)}
        />

        {open && (
          pRecords.length === 0 ? (
            <div style={{ fontSize: 12, color: "rgba(10,43,73,0.45)", padding: "6px 12px", fontStyle: "italic" }}>
              Sin presupuestos guardados en este período aún.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: cItems.length > 0 && hItems.length > 0 ? "1fr 1fr" : "1fr", gap: 12, paddingLeft: 10, borderLeft: `2px solid ${periodo.activo ? PC.activo.leftBorder : PC.finalizado.leftBorder}`, marginBottom: 4 }}>
              {cItems.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, color: "rgba(10,43,73,0.4)", fontWeight: 700, marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Contratos</div>
                  {cItems.map(r => <RecordRow key={r.id} r={r} onDel={onDel} />)}
                </div>
              )}
              {hItems.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, color: "rgba(10,43,73,0.4)", fontWeight: 700, marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Horas</div>
                  {hItems.map(r => <RecordRow key={r.id} r={r} onDel={onDel} />)}
                </div>
              )}
            </div>
          )
        )}

        {!open && pRecords.length > 0 && (
          <div style={{ fontSize: 11, color: "rgba(10,43,73,0.4)", padding: "3px 12px 6px", fontStyle: "italic" }}>
            {pRecords.length} registro{pRecords.length !== 1 ? "s" : ""} · haz clic en el período para ver el detalle
          </div>
        )}
      </div>
    );
  });
}
