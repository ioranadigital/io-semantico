import { useState } from "react";
import { ACCENT, IVA, fmt, fmtI, fmtDate, hoy, uid, css } from "../data/constants.js";
import { SH, MODS } from "../data/defaults.js";
import { getTramo } from "../hooks/useStorage.js";
import { Card, Ghost, SL, CH, Btn, Toggle, MetricCard, TipoBadge, EstadoBadge, Divider, ConfirmBtn } from "./ui.jsx";
import "./ClienteHoras.css";

const NAVY = "#0a2b49";
const CLOUD = "#ebf2f7";

// Estado de un paquete de horas según fechas
function estadoPaquete(p) {
  const t = hoy();
  if (!p.fechaInicio) return "sin_fecha";
  if (t < p.fechaInicio) return "proximo";
  if (!p.fechaFin || t <= p.fechaFin) return "vigente";
  return "expirado";
}

const ESTADO_PACK = {
  vigente:   { label: "Vigente",  bg: ACCENT,  color: "#fff" },
  proximo:   { label: "Próximo",  bg: CLOUD,   color: "rgba(10,43,73,0.65)" },
  expirado:  { label: "Expirado", bg: CLOUD,   color: "rgba(10,43,73,0.45)" },
  sin_fecha: { label: "Sin fecha",bg: CLOUD,   color: "rgba(10,43,73,0.45)" },
};

export default function ClienteHoras({
  client, globalClient, setClients, catalogoServicios,
  onAddRecord, onFinalizar, onReactivar, onDelete,
}) {
  const tramos = client.tramosActivos ? client.tramos : globalClient.tramos;

  const [horas,      setHoras]      = useState(10);
  const [servicio,   setServicio]   = useState("");
  const [modSel,     setModSel]     = useState({});
  const [rangoServ,  setRangoServ]  = useState(0.5);
  const [endDate,    setEndDate]    = useState(hoy());
  const [showFin,    setShowFin]    = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [showTramos, setShowTramos] = useState(false);
  const [expandedPkgs, setExpandedPkgs] = useState(new Set());


  const isGlobal = client.id === "global";
  const activo   = (client.estado || "activo") === "activo";

  // ── Helpers ──────────────────────────────────────────────────
  const upd = patch => setClients(prev => prev.map(c => c.id === client.id ? { ...c, ...patch } : c));
  const updTramo = (id, field, val) => upd({ tramos: client.tramos.map(t => t.id === id ? { ...t, [field]: field === "label" ? val : +val } : t) });
  const addTramo = () => {
    const l = client.tramos[client.tramos.length - 1];
    upd({ tramos: [...client.tramos.slice(0, -1), { ...l, id: uid(), max: l.min + 19 }, { id: uid(), min: l.min + 20, max: 9999, rate: 28, label: `${l.min + 20}+h`, pct: -30 }] });
  };
  const delTramo = id => { if (client.tramos.length <= 2) return; upd({ tramos: client.tramos.filter(t => t.id !== id) }); };

  // Paquetes de horas
  const paquetesHoras = client.paquetesHoras || [];
  const delPaquete = id => upd({ paquetesHoras: paquetesHoras.filter(p => p.id !== id) });
  const toggleExpandPkg = id => setExpandedPkgs(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const savePaquete = p => onAddRecord({
    tipo: "horas_pack", cliente: client.name, clienteId: client.id,
    nombre: p.nombre, horas: p.horas, tarifa: p.tarifa,
    fechaInicio: p.fechaInicio, fechaFin: p.fechaFin,
    sinIva: p.horas * p.tarifa,
    conIva: p.horas * p.tarifa * (1 + IVA),
  });

  // ── Cálculo calculadora libre ────────────────────────────────
  const tramoActivo = getTramo(tramos, horas);
  const srv         = SH.find(s => s.id === servicio);
  const rateServ    = srv ? srv.min + (srv.max - srv.min) * rangoServ : tramoActivo.rate;
  let modPct = 0;
  MODS.forEach(m => { if (modSel[m.id]) modPct += m.value * m.sign; });
  const rateFinal = Math.max(0, rateServ * (1 + modPct));
  const sinIva    = rateFinal * horas;
  const iva       = sinIva * IVA;
  const conIva    = sinIva + iva;
  const ahorro    = Math.max(0, (client.tarifaBase - rateFinal) * horas);

  return (
    <div className="cliente-horas-wrapper active-section">

      {/* ── Título de sección ── */}
      {!isGlobal && (
        <div style={{ paddingBottom: 12, marginBottom: 14, borderBottom: "2px solid rgba(255,140,34,0.2)" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 4 }}>
            ⏱ Configuración de Contrato por Horas
          </div>
          <div style={{ fontSize: 12, color: "rgba(10,43,73,0.55)" }}>
            Gestiona bolsas de horas, tarificación y cálculos por hora
          </div>
        </div>
      )}

      <div className="cliente-horas-top">
      {/* ── Paquetes de horas ── */}
      {!isGlobal && (
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: paquetesHoras.length > 0 ? 12 : 0 }}>
            <SL mb={0}>Paquetes de horas</SL>
          </div>

          {/* Lista de paquetes */}
          {paquetesHoras.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {paquetesHoras.map(p => {
                const est = estadoPaquete(p);
                const { label, bg, color } = ESTADO_PACK[est];
                const totalSinIva = p.horas * p.tarifa;
                const isExpanded = expandedPkgs.has(p.id);
                const hasServicios = p.servicios && p.servicios.length > 0;

                return (
                  <div key={p.id} style={{
                    border: `1px solid ${est === "vigente" ? "rgba(255,140,34,0.25)" : "rgba(10,43,73,0.09)"}`,
                    borderRadius: 10,
                    background: est === "vigente" ? "rgba(255,140,34,0.06)" : CLOUD,
                    overflow: "hidden",
                  }}>
                    {/* Encabezado del paquete */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
                      padding: "10px 12px",
                      justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                        {/* Botón expandir */}
                        {hasServicios && (
                          <button
                            onClick={() => toggleExpandPkg(p.id)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 14,
                              color: "rgba(10,43,73,0.6)",
                              padding: 0,
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {isExpanded ? "▼" : "▶"}
                          </button>
                        )}
                        {!hasServicios && <div style={{ width: 20, flexShrink: 0 }} />}

                        {/* Nombre */}
                        <span style={{ fontWeight: 600, fontSize: 13, color: NAVY, minWidth: 100 }}>{p.nombre}</span>
                        {/* Horas y tarifa */}
                        <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap" }}>{p.horas}h · {fmt(p.tarifa)} €/h</span>
                        {/* Fechas */}
                        {p.fechaInicio && (
                          <span style={{ fontSize: 11, color: "rgba(10,43,73,0.5)", whiteSpace: "nowrap" }}>
                            📅 {fmtDate(p.fechaInicio)}{p.fechaFin ? ` → ${fmtDate(p.fechaFin)}` : " → abierto"}
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", flexShrink: 0 }}>
                        {/* Estado */}
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, fontWeight: 600, background: bg, color, whiteSpace: "nowrap" }}>
                          {label}
                        </span>
                        {/* Total */}
                        <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>{fmt(totalSinIva)} €</span>
                        {/* Acciones */}
                        <Btn variant="ghost" size="sm" onClick={() => savePaquete(p)}>Guardar</Btn>
                        {est === "vigente" && (
                          <ConfirmBtn size="sm" onConfirm={() => delPaquete(p.id)} msg="¿Finalizar?" />
                        )}
                        <ConfirmBtn size="sm" onConfirm={() => delPaquete(p.id)} msg="¿Borrar?" />
                      </div>
                    </div>

                    {/* Sección expandible: Servicios */}
                    {isExpanded && hasServicios && (
                      <div style={{
                        padding: "12px 12px 12px 52px",
                        borderTop: "1px solid rgba(10,43,73,0.08)",
                        background: "rgba(10,43,73,0.01)",
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.55)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Servicios contratados
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {p.servicios.map((s, idx) => (
                            <div key={idx} style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 10px",
                              background: "#fff",
                              borderRadius: 6,
                              border: "1px solid rgba(10,43,73,0.08)",
                              fontSize: 11,
                            }}>
                              <div>
                                <div style={{ color: NAVY, fontWeight: 500 }}>{s.name}</div>
                                {s.min !== undefined && s.max !== undefined && (
                                  <div style={{ fontSize: 10, color: "rgba(10,43,73,0.45)", marginTop: 2 }}>
                                    Rango: {fmt(s.min)}€ − {fmt(s.max)}€
                                  </div>
                                )}
                              </div>
                              {s.precio !== undefined && (
                                <span style={{ fontWeight: 600, color: NAVY, whiteSpace: "nowrap", marginLeft: 12 }}>
                                  {fmt(s.precio)} €
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {paquetesHoras.length === 0 && (
            <div style={{ fontSize: 12, color: "rgba(10,43,73,0.45)", fontStyle: "italic", marginTop: 8 }}>
              Sin paquetes definidos. Usa la pestaña "Nuevo Paquete" para crear uno.
            </div>
          )}
        </Card>
      )}
      </div>

      <div className="cliente-horas-main">
        <div className="cliente-horas-calculator">
      {/* ── Calculadora libre de horas ── */}
      <Card className="cliente-horas-compact-card">
        <SL>Calculadora de horas</SL>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <input type="range" min={1} max={160} step={1} value={horas} onChange={e => setHoras(+e.target.value)} style={{ flex: 1 }} />
          <input type="number" min={1} max={999} value={horas} onChange={e => setHoras(Math.max(1, +e.target.value))} style={{ ...css.inp, width: 64, fontSize: 14 }} />
          <span style={{ fontSize: 13, color: "rgba(10,43,73,0.6)" }}>h</span>
        </div>
        <div className="cliente-horas-tramos">
          {tramos.map((t, i) => {
            const active = t === tramoActivo;
            return (
              <div key={i} className="cliente-horas-tramo-card" style={{
                background: active ? ACCENT : CLOUD,
                color: active ? "#ffffff" : "rgba(10,43,73,0.7)",
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.03em" }}>{t.label}</div>
                <div className="rate">{t.rate} €</div>
                <div style={{ fontSize: 9, opacity: 0.75 }}>{t.pct === 0 ? "base" : `${t.pct}%`}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Tipo de servicio ── */}
      <Card className="cliente-horas-compact-card">
        <SL>Tipo de servicio</SL>
        <select value={servicio} onChange={e => { setServicio(e.target.value); setRangoServ(0.5); }} style={{ ...css.inp, width: "100%", marginBottom: 10 }}>
          <option value="">— Tarifa base del tramo ({tramoActivo.rate} €/h)</option>
          {SH.map(sv => <option key={sv.id} value={sv.id}>{sv.name} — {sv.min}–{sv.max} €/h</option>)}
        </select>
        {srv && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", minWidth: 32 }}>{srv.min}€</span>
            <input type="range" min={0} max={1} step={0.01} value={rangoServ} onChange={e => setRangoServ(+e.target.value)} style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", minWidth: 32, textAlign: "right" }}>{srv.max}€</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: NAVY, minWidth: 60, textAlign: "right" }}>{fmt(rateServ)} €/h</span>
          </div>
        )}
      </Card>

        </div>

        <div className="cliente-horas-modifiers">
      {/* ── Modificadores ── */}
      <Card className="cliente-horas-compact-card">
        <SL>Modificadores de tarifa</SL>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
          {MODS.map(m => (
            <label key={m.id} style={{
              display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
              padding: "9px 10px", borderRadius: 8,
              background: modSel[m.id] ? "rgba(255,140,34,0.10)" : CLOUD,
              border: modSel[m.id] ? "1px solid rgba(255,140,34,0.30)" : "1px solid transparent",
              transition: "all 0.15s",
            }}>
              <input type="checkbox" checked={!!modSel[m.id]} onChange={e => setModSel(p => ({ ...p, [m.id]: e.target.checked }))} style={{ width: 14, height: 14 }} />
              <span style={{ fontSize: 12, flex: 1, color: NAVY }}>{m.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>
                {m.sign > 0 ? "+" : "−"}{m.value * 100}%
              </span>
            </label>
          ))}
        </div>
      </Card>
        </div>
      </div>

      <div className="cliente-horas-metrics">
      {/* ── Métricas ── */}
      <div className="cliente-horas-metrics-bar">
        <div className="cliente-horas-metric-card accent">
          <div className="label">Tarifa/hora</div>
          <div className="value">{fmt(rateFinal)} €</div>
        </div>
        <div className="cliente-horas-metric-card">
          <div className="label">Horas</div>
          <div className="value">{horas} h</div>
        </div>
        <div className="cliente-horas-metric-card">
          <div className="label">Base imponible</div>
          <div className="value">{fmt(sinIva)} €</div>
        </div>
        <div className="cliente-horas-metric-card">
          <div className="label">IVA 21%</div>
          <div className="value">{fmt(iva)} €</div>
        </div>
        <div className="cliente-horas-metric-card accent">
          <div className="label">Total con IVA</div>
          <div className="value">{fmt(conIva)} €</div>
        </div>
        {ahorro > 0 && (
          <div className="cliente-horas-metric-card">
            <div className="label">Ahorro vs base</div>
            <div className="value">{fmt(ahorro)} €</div>
          </div>
        )}
      </div>
      </div>

      {/* ── Botones de acción al final en contenedor gris ── */}
      <div className="cliente-horas-action-buttons">
        <Btn variant="primary" onClick={() => onAddRecord({ tipo: "horas", cliente: client.name, clienteId: client.id, horas, tarifa: rateFinal, sinIva, conIva })}>
          Guardar en resultados
        </Btn>
      </div>

      {/* ── Ajuste de tramos (colapsable) ── */}
      {!isGlobal && (
        <div>
          <button onClick={() => setShowTramos(v => !v)} style={{
            width: "100%", padding: "10px 16px", borderRadius: 10,
            border: "1px dashed rgba(10,43,73,0.20)",
            background: showTramos ? CLOUD : "transparent",
            color: "rgba(10,43,73,0.6)", fontSize: 12, fontWeight: 500,
            cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>Ajuste de tramos para {client.name}</span>
            <span style={{ fontSize: 14 }}>{showTramos ? "▲" : "▼"}</span>
          </button>

          {showTramos && (
            <Ghost style={{ marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <SL mb={0}>Tramos por volumen</SL>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "rgba(10,43,73,0.5)" }}>
                    {client.tramosActivos ? "propio" : "global"}
                  </span>
                  <Toggle active={client.tramosActivos} onToggle={() => upd({ tramosActivos: !client.tramosActivos })} />
                </div>
              </div>
              {client.tramosActivos ? (
                <Ghost style={{ padding: "8px 10px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 60px 60px auto", gap: "6px 10px", alignItems: "center", paddingBottom: 6, borderBottom: "1px solid rgba(10,43,73,0.08)", marginBottom: 6 }}>
                    <CH>Tramo</CH><CH>Slider</CH><CH align="center">€/h</CH><CH align="center">%</CH><CH></CH>
                  </div>
                  {client.tramos.map(t => (
                    <div key={t.id} style={{ display: "grid", gridTemplateColumns: "90px 1fr 60px 60px auto", gap: "4px 10px", alignItems: "center", padding: "5px 0", borderBottom: "1px solid rgba(10,43,73,0.08)" }}>
                      <input value={t.label} onChange={e => updTramo(t.id, "label", e.target.value)} style={{ ...css.inp, fontSize: 12, padding: "3px 6px", height: 32 }} />
                      <input type="range" min={5} max={300} step={1} value={t.rate} onChange={e => updTramo(t.id, "rate", e.target.value)} />
                      <input type="number" min={5} max={300} value={t.rate} onChange={e => updTramo(t.id, "rate", e.target.value)} style={{ ...css.inp, fontSize: 12, padding: "3px 6px", textAlign: "center", height: 32 }} />
                      <input type="number" min={-100} max={100} value={t.pct} onChange={e => updTramo(t.id, "pct", e.target.value)} style={{ ...css.inp, fontSize: 12, padding: "3px 6px", textAlign: "center", height: 32 }} />
                      <ConfirmBtn size="sm" onConfirm={() => delTramo(t.id)} msg="¿Borrar?" />
                    </div>
                  ))}
                  <div style={{ marginTop: 8 }}>
                    <Btn variant="ghost" size="sm" style={{ border: "1px dashed rgba(10,43,73,0.25)", color: "rgba(10,43,73,0.6)" }} onClick={addTramo}>+ Añadir tramo</Btn>
                  </div>
                </Ghost>
              ) : (
                <div style={{ fontSize: 12, color: "rgba(10,43,73,0.5)", textAlign: "center", padding: "6px 0" }}>
                  Usando tramos del catálogo global
                </div>
              )}
            </Ghost>
          )}
        </div>
      )}
    </div>
  );
}
