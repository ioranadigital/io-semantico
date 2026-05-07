import { useState } from "react";
import { fmt, fmtDate, IVA } from "../data/constants.js";
import { Card, SL, Btn } from "./ui.jsx";

const NAVY = "#0a2b49";
const YELLOW_BG  = "rgba(255,214,0,0.08)";
const YELLOW_BD  = "rgba(255,196,0,0.35)";
const YELLOW_SEL = "rgba(255,214,0,0.18)";

/* ── Helpers ── */
function getPropTotal(prop) {
  const pkg = prop.paquete || {};
  return prop.tipo === "contrato"
    ? (pkg.price || 0) * (pkg.minMonths || 1)
    : (pkg.horas || 0) * (pkg.tarifa || 0);
}

function getPropDetalle(prop) {
  const pkg = prop.paquete || {};
  return prop.tipo === "contrato"
    ? `${pkg.minMonths || 1} meses · ${fmt(pkg.price || 0)} €/mes`
    : `${pkg.horas || 0}h · ${fmt(pkg.tarifa || 0)} €/h`;
}

function getSubServs(prop, catalogoServicios) {
  if (prop.tipo === "contrato") {
    return (prop.paquete?.subServicios || []).map(sub => {
      const sv = (catalogoServicios || []).find(s => s.id === sub.id);
      if (!sv) return null;
      const precio = (sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5)) * (sub.qty || 1);
      return { name: sv.name, precio };
    }).filter(Boolean);
  }
  return (prop.paquete?.servicios || []).map(s => ({ name: s.name, precio: s.precio || 0 }));
}

/* ── Toast ── */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      background: "#15803d", color: "#fff", borderRadius: 8,
      padding: "10px 18px", fontSize: 13, fontWeight: 600,
      boxShadow: "0 4px 16px rgba(0,0,0,0.18)", pointerEvents: "none",
    }}>
      ✓ {msg}
    </div>
  );
}

/* ── Fila expandible de propuesta ── */
function PropRow({
  prop, catalogoServicios,
  showCheckbox, checked, onCheck,
  showDelete, onDelete,
  expanded, onToggleExpand,
}) {
  const subServs = getSubServs(prop, catalogoServicios);
  const total    = getPropTotal(prop);
  const hasServs = subServs.length > 0;

  return (
    <div style={{
      border: `1px solid ${YELLOW_BD}`,
      borderRadius: 8,
      background: checked ? YELLOW_SEL : YELLOW_BG,
      overflow: "hidden",
    }}>
      {/* Fila principal */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
        {showCheckbox && (
          <input type="checkbox" checked={!!checked} onChange={onCheck}
            style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0 }} />
        )}
        <button
          onClick={hasServs ? onToggleExpand : undefined}
          style={{
            background: "none", border: "none", cursor: hasServs ? "pointer" : "default",
            fontSize: 11, color: hasServs ? "rgba(10,43,73,0.5)" : "transparent",
            padding: 0, flexShrink: 0, width: 16,
          }}
        >
          {expanded ? "▼" : "▶"}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: NAVY }}>{prop.nombre}</div>
          <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", marginTop: 1 }}>
            {fmtDate(prop.fecha)} · {getPropDetalle(prop)}
            {hasServs && <span style={{ marginLeft: 6, color: "rgba(10,43,73,0.4)" }}>· {subServs.length} servicios</span>}
          </div>
        </div>
        <span style={{
          fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600,
          background: prop.estado === "aprobada" ? "#dcfce7" : "rgba(255,214,0,0.30)",
          color: prop.estado === "aprobada" ? "#15803d" : "#7a5c00",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {prop.estado === "aprobada" ? "✓ Aprobada" : "Pendiente"}
        </span>
        <span style={{ fontWeight: 700, fontSize: 13, color: NAVY, whiteSpace: "nowrap" }}>
          {fmt(total)} €
        </span>
        {showDelete && (
          <Btn variant="danger" size="sm" onClick={onDelete}>×</Btn>
        )}
      </div>

      {/* Sub-servicios expandibles */}
      {expanded && hasServs && (
        <div style={{
          padding: "10px 12px 12px 36px",
          borderTop: "1px solid rgba(255,196,0,0.20)",
          background: "rgba(255,255,255,0.55)",
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: "rgba(10,43,73,0.45)",
            textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6,
          }}>
            Servicios incluidos
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {subServs.map((s, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 11, padding: "4px 0",
                borderBottom: i < subServs.length - 1 ? "1px solid rgba(10,43,73,0.06)" : "none",
              }}>
                <span style={{ color: NAVY }}>{s.name}</span>
                <span style={{ fontWeight: 600, color: NAVY }}>{fmt(s.precio)} €</span>
              </div>
            ))}
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 12, fontWeight: 700, color: NAVY,
              paddingTop: 8, marginTop: 4, borderTop: "2px solid rgba(10,43,73,0.10)",
            }}>
              <span>Total proyecto</span>
              <span>{fmt(total)} €</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Componente principal ── */
export default function ClientePropuestas({
  client, globalClient, setClients, catalogoPaquetes, catalogoServicios, onAddRecord
}) {
  const propuestas = client.propuestas || [];

  const [expandedMonths, setExpandedMonths] = useState(() => new Set());
  const [expandedProps,  setExpandedProps]  = useState(() => new Set());
  const [selPropIds,     setSelPropIds]     = useState({});
  const [toast,          setToast]          = useState("");

  const isGlobal = client.id === "global";
  const upd = patch => setClients(prev => prev.map(c => c.id === client.id ? { ...c, ...patch } : c));
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const eliminarPropuesta = id => {
    upd({ propuestas: propuestas.filter(p => p.id !== id) });
    showToast("Propuesta eliminada");
  };

  const toggleMonth = key => setExpandedMonths(prev => {
    const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n;
  });
  const toggleProp = key => setExpandedProps(prev => {
    const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n;
  });
  const toggleSel = id => setSelPropIds(prev => ({ ...prev, [id]: !prev[id] }));

  if (isGlobal) {
    return (
      <Card>
        <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", padding: "8px 0" }}>
          Selecciona un cliente para ver sus propuestas.
        </div>
      </Card>
    );
  }

  if (propuestas.length === 0) {
    return (
      <Card>
        <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", textAlign: "center", padding: "20px 0", fontStyle: "italic" }}>
          Sin propuestas aún. Usa "Nuevo Paquete" y pulsa "Agregar".
        </div>
      </Card>
    );
  }

  const propContrato = propuestas.filter(p => p.tipo === "contrato");
  const propHoras    = propuestas.filter(p => p.tipo === "horas");
  const hasSel       = Object.values(selPropIds).some(Boolean);
  const selItems     = propuestas.filter(p => selPropIds[p.id]);

  /* ── PDF con detalle de sub-servicios ── */
  const generarPDF = () => {
    const blocks = selItems.map(prop => {
      const subServs    = getSubServs(prop, catalogoServicios);
      const total       = getPropTotal(prop);
      const tipoLabel   = prop.tipo === "contrato" ? "Paquete Contrato" : "Bolsa de Horas";
      const srvRows     = subServs.length > 0
        ? subServs.map(s =>
            `<tr><td>${s.name}</td><td style="text-align:right;font-weight:600;">${fmt(s.precio)} €</td></tr>`
          ).join("")
        : `<tr><td colspan="2" style="color:#999;font-style:italic;">Sin servicios adicionales</td></tr>`;
      const srvTable    = subServs.length > 0
        ? `<table class="srv"><thead><tr><th>Servicio incluido</th><th style="text-align:right;">Precio</th></tr></thead>
           <tbody>${srvRows}</tbody></table>` : "";
      return `<div class="pkg">
        <div class="ph"><div><div class="pn">${prop.nombre}</div>
          <div class="pd">${tipoLabel} · ${getPropDetalle(prop)} · ${fmtDate(prop.fecha)}</div></div>
          <div class="pt">${fmt(total)} €</div></div>
        ${srvTable}
      </div>`;
    }).join("");

    const base = selItems.reduce((a, p) => a + getPropTotal(p), 0);
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Propuesta ${client.name}</title>
<style>
  *{box-sizing:border-box}body{font-family:Arial,sans-serif;padding:36px;color:#0a2b49;font-size:13px}
  h1{font-size:22px;margin:0 0 4px}
  .sub{font-size:13px;color:#666;margin-bottom:28px}
  .pkg{margin-bottom:24px;padding:14px 16px;border:1px solid #e8c000;border-radius:8px;background:rgba(255,214,0,0.04)}
  .ph{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
  .pn{font-size:15px;font-weight:700}.pd{font-size:11px;color:#666;margin-top:2px}
  .pt{font-size:17px;font-weight:700;white-space:nowrap}
  .srv{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px}
  .srv th{background:#0a2b49;color:#fff;padding:7px 10px;text-align:left;font-size:11px}
  .srv td{padding:7px 10px;border-bottom:1px solid #eee}
  .totals{margin-top:28px;padding:14px 16px;border:1px solid #e0e0e0;border-radius:8px;text-align:right}
  .totals div{margin-bottom:3px;font-size:13px}
  .grand{font-size:17px;font-weight:700;color:#0a2b49;margin-top:6px;padding-top:6px;border-top:2px solid #0a2b49}
  @media print{body{padding:20px}}
</style></head><body>
<h1>Propuesta Comercial</h1>
<div class="sub">${client.name} · ${new Date().toLocaleDateString("es-ES",{day:"2-digit",month:"long",year:"numeric"})}</div>
${blocks}
<div class="totals">
  <div>Base imponible: <strong>${fmt(base)} €</strong></div>
  <div>IVA (21%): <strong>${fmt(base * IVA)} €</strong></div>
  <div class="grand">Total con IVA: ${fmt(base * (1 + IVA))} €</div>
</div>
</body></html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.print();
    showToast("PDF generado correctamente");
  };

  /* ── Historial por mes ── */
  const byMonth = {};
  [...propuestas].sort((a, b) => b.fecha.localeCompare(a.fecha)).forEach(p => {
    const mes = p.fecha.slice(0, 7);
    if (!byMonth[mes]) byMonth[mes] = [];
    byMonth[mes].push(p);
  });
  const meses = Object.keys(byMonth);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Toast msg={toast} />

      {/* ── Sección 1: Propuestas con checkboxes para PDF ── */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SL mb={0}>Propuestas pendientes</SL>
          {hasSel && (
            <Btn variant="primary" onClick={generarPDF}>📄 Generar Propuesta PDF</Btn>
          )}
        </div>

        {propContrato.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.45)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
              Paquetes Contrato
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {propContrato.map(prop => (
                <PropRow
                  key={prop.id}
                  prop={prop}
                  catalogoServicios={catalogoServicios}
                  showCheckbox
                  checked={!!selPropIds[prop.id]}
                  onCheck={() => toggleSel(prop.id)}
                  showDelete={false}
                  expanded={expandedProps.has(prop.id)}
                  onToggleExpand={() => toggleProp(prop.id)}
                />
              ))}
            </div>
          </div>
        )}

        {propHoras.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.45)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
              Bolsas de Horas
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {propHoras.map(prop => (
                <PropRow
                  key={prop.id}
                  prop={prop}
                  catalogoServicios={catalogoServicios}
                  showCheckbox
                  checked={!!selPropIds[prop.id]}
                  onCheck={() => toggleSel(prop.id)}
                  showDelete={false}
                  expanded={expandedProps.has(prop.id)}
                  onToggleExpand={() => toggleProp(prop.id)}
                />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* ── Sección 2: Historial por mes ── */}
      <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>Historial de propuestas</div>
      {meses.map(mes => {
        const isOpen = expandedMonths.has(mes);
        const items    = byMonth[mes];
        const contrato = items.filter(p => p.tipo === "contrato");
        const horas    = items.filter(p => p.tipo === "horas");
        const totalMes = items.reduce((a, p) => a + getPropTotal(p), 0);
        const [anio, m] = mes.split("-");
        const mesLabel  = new Date(+anio, +m - 1, 1).toLocaleDateString("es-ES", { month: "long", year: "numeric" });

        return (
          <div key={mes} style={{ border: "1.5px solid rgba(255,196,0,0.40)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <button
              onClick={() => toggleMonth(mes)}
              style={{
                width: "100%", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
                background: isOpen ? "rgba(255,214,0,0.10)" : "rgba(255,214,0,0.06)",
                border: "none", borderBottom: isOpen ? "1px solid rgba(255,196,0,0.25)" : "none",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: NAVY, textTransform: "capitalize" }}>{mesLabel}</span>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, fontWeight: 600, background: "rgba(255,214,0,0.25)", color: "#7a5c00" }}>
                    {items.length} propuesta{items.length !== 1 ? "s" : ""}
                  </span>
                  {contrato.length > 0 && <span style={{ fontSize: 10, color: "rgba(10,43,73,0.45)" }}>{contrato.length} contrato</span>}
                  {horas.length > 0    && <span style={{ fontSize: 10, color: "rgba(10,43,73,0.45)" }}>{horas.length} horas</span>}
                </div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: NAVY, whiteSpace: "nowrap" }}>{fmt(totalMes)} €</span>
              <span style={{ fontSize: 14, color: "rgba(10,43,73,0.35)" }}>{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                {contrato.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.45)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                      Paquetes Contrato
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {contrato.map(prop => (
                        <PropRow
                          key={prop.id}
                          prop={prop}
                          catalogoServicios={catalogoServicios}
                          showCheckbox={false}
                          checked={false}
                          onCheck={null}
                          showDelete
                          onDelete={() => eliminarPropuesta(prop.id)}
                          expanded={expandedProps.has(prop.id + "-hist")}
                          onToggleExpand={() => toggleProp(prop.id + "-hist")}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {horas.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.45)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                      Bolsas de Horas
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {horas.map(prop => (
                        <PropRow
                          key={prop.id}
                          prop={prop}
                          catalogoServicios={catalogoServicios}
                          showCheckbox={false}
                          checked={false}
                          onCheck={null}
                          showDelete
                          onDelete={() => eliminarPropuesta(prop.id)}
                          expanded={expandedProps.has(prop.id + "-hist")}
                          onToggleExpand={() => toggleProp(prop.id + "-hist")}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
