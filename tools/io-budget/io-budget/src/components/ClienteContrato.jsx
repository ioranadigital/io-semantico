import { useState } from "react";
import { ACCENT, IVA, fmt, fmtI, fmtDate, css } from "../data/constants.js";
import { mergePaquetes, mergeServicios } from "../data/defaults.js";
import { Card, SL, CH, MetricCard, Btn } from "./ui.jsx";
import { generarHtmlPropuesta } from "../utils/propuestaPDF.js";
import "./ClienteContrato.css";
import "./tabs.css";

const NAVY = "#0a2b49";
const CLOUD = "#ebf2f7";
const YELLOW_BG = "rgba(255,214,0,0.14)";
const YELLOW_BD = "#e8c000";

function estadoPaquete(p) {
  const t = new Date().toISOString().slice(0, 10);
  if (!p.fechaInicio) return "vigente";
  if (t < p.fechaInicio) return "proximo";
  if (!p.fechaFin || t <= p.fechaFin) return "vigente";
  return "expirado";
}

export default function ClienteContrato({
  client, globalClient, setClients,
  catalogoPaquetes, catalogoServicios,
  catalogoServiciosCategorizado,
  onAddRecord, onFinalizar, onReactivar, onDelete,
  records = [], onDel,
}) {
  const pkgs = mergePaquetes(catalogoPaquetes, client.paquetesActivos ? client.paquetesOverrides : globalClient.paquetesOverrides);
  const servs = mergeServicios(catalogoServicios, client.serviciosActivos ? client.servicios : globalClient.servicios);

  const [pkgServOff, setPkgServOff] = useState(new Set());
  const [months, setMonths] = useState(3);
  const [servSel, setServSel] = useState({});
  const [servRange, setServRange] = useState({});
  const [sessions, setSessions] = useState({});
  const [openIncluidos, setOpenIncluidos] = useState(true);
  const [openAdicionales, setOpenAdicionales] = useState(true);

  const isGlobal = client.id === "global";

  const togglePkgServ = servId => setPkgServOff(prev => {
    const n = new Set(prev);
    n.has(servId) ? n.delete(servId) : n.add(servId);
    return n;
  });

  const selPkgs = pkgs;
  const allPkgSubs = [...new Map(
    selPkgs.flatMap(p => p.subServicios || []).map(sub => [sub.id, sub])
  ).values()];
  const activePkgServIds = new Set(
    allPkgSubs.map(sub => sub.id).filter(id => !pkgServOff.has(id))
  );

  const minM = selPkgs.length ? Math.max(...selPkgs.map(p => p.minMonths || 3)) : 3;
  const safeM = Math.max(months, minM);
  const desc10 = safeM >= 6 ? 0.1 : 0;
  const mensual = selPkgs.reduce((a, p) => a + (p.price || 0), 0);
  const mensualD = mensual * (1 - desc10);
  const comprometido = mensualD * safeM;
  const ahorro = mensual * safeM * desc10;

  const subTotal = allPkgSubs.reduce((a, sub) => {
    if (pkgServOff.has(sub.id)) return a;
    const sv = servs.find(s => s.id === sub.id);
    if (!sv) return a;
    return a + (sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5)) * (sub.qty || 1);
  }, 0);

  const adicionales = servs.filter(sv => !activePkgServIds.has(sv.id));
  let puntual = 0;
  adicionales.forEach(s => {
    if (!servSel[s.id]) return;
    const r = servRange[s.id] ?? 0.5;
    puntual += (s.min === s.max ? s.min : s.min + (s.max - s.min) * r) * (s.perSession ? (sessions[s.id] || 1) : 1);
  });

  const sinIva = comprometido + puntual + subTotal;
  const iva = sinIva * IVA;
  const conIva = sinIva + iva;

  const contratadosIds = new Set([
    ...Array.from(activePkgServIds),
    ...adicionales.filter(sv => servSel[sv.id]).map(sv => sv.id),
  ]);

  const getPkgServItems = (pkg) =>
    (pkg.subServicios || [])
      .filter(sub => !pkgServOff.has(sub.id))
      .map(sub => {
        const sv = servs.find(s => s.id === sub.id);
        if (!sv) return null;
        const precio = (sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5)) * (sub.qty || 1);
        return { id: sub.id, name: sv.name, precio };
      })
      .filter(Boolean);

  return (
    <div className="cliente-contrato-wrapper">
      {isGlobal ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SL>Configuración global</SL>
            <div style={{ fontSize: 12, color: "rgba(10,43,73,0.55)" }}>
              Gestión centralizada de paquetes y servicios en Configuración Global.
            </div>
          </Card>
        </div>
      ) : (
        <div className="cliente-contrato-tab-contrato" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* 1. Título de sección */}
          <div style={{ paddingBottom: 12, borderBottom: "2px solid rgba(255,140,34,0.2)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 4 }}>
              📦 Configuración de Contrato
            </div>
            <div style={{ fontSize: 12, color: "rgba(10,43,73,0.55)" }}>
              Selecciona paquetes y visualiza la configuración de servicios heredados
            </div>
          </div>

          {/* 2. Selector de Meses (inline) */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "12px 14px", background: CLOUD, borderRadius: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>Duración:</span>
            <input
              type="number"
              min={minM}
              value={months}
              onChange={e => setMonths(+e.target.value)}
              style={{ ...css.inp, width: 60, fontSize: 12, height: 28 }}
            />
            <span style={{ fontSize: 12, color: "rgba(10,43,73,0.55)" }}>meses (mín. {minM})</span>
          </div>

          {/* 3. Paquetes activos del cliente */}
          {selPkgs.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {selPkgs.map(p => {
                const items = getPkgServItems(p);
                const subtotalServicios = items.reduce((a, i) => a + i.precio, 0);
                const subtotalMensual = (p.price || 0) + subtotalServicios;
                const total = subtotalMensual * safeM;
                const estado = estadoPaquete(p);
                return (
                  <Card key={p.id} style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 2 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)" }}>
                          Precio paquete: {fmt(p.price || 0)} €/mes
                        </div>
                      </div>
                      <span style={{
                        fontSize: 9,
                        padding: "3px 8px",
                        borderRadius: 3,
                        fontWeight: 600,
                        background: estado === "vigente" ? "#dcfce7" : "#fee2e2",
                        color: estado === "vigente" ? "#15803d" : "#991b1b",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}>
                        {estado === "vigente" ? "✓ Vigente" : "✕ No Activo"}
                      </span>
                    </div>

                    {items.length > 0 && (
                      <div style={{ paddingTop: 10, borderTop: "1px solid rgba(10,43,73,0.10)" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(10,43,73,0.55)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Servicios incluidos
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {items.map(item => (
                            <div key={item.id} style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 10,
                            }}>
                              <span style={{
                                fontSize: 11,
                                color: NAVY,
                              }}>
                                {item.name}
                              </span>
                              <span style={{ fontWeight: 700, color: NAVY, fontSize: 11, whiteSpace: "nowrap" }}>{fmtI(item.precio)} €</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{
                      paddingTop: 10,
                      borderTop: "1px solid rgba(10,43,73,0.10)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 11,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "rgba(10,43,73,0.55)" }}>Subtotal mensual</span>
                        <span style={{ fontWeight: 600, color: NAVY }}>{fmtI(subtotalMensual)} €</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4, borderTop: "1px solid rgba(10,43,73,0.08)" }}>
                        <span style={{ fontWeight: 600, color: NAVY }}>Total ({safeM}m)</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{fmtI(total)} €</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* 4. Resumen de métricas */}
          {selPkgs.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
              <MetricCard label="Total paquetes" value={selPkgs.length} unit="" />
              <MetricCard label="Total imponible" value={`${fmtI(selPkgs.reduce((a, p) => a + ((p.price || 0) * safeM), 0))} €`} unit="" />
              <MetricCard label="IVA" value={`${fmtI(selPkgs.reduce((a, p) => a + ((p.price || 0) * safeM), 0) * IVA)} €`} unit="" />
              <MetricCard label="Total con IVA" value={`${fmtI(selPkgs.reduce((a, p) => a + ((p.price || 0) * safeM), 0) * (1 + IVA))} €`} unit="" accent />
            </div>
          )}

          {/* 5. Contenedor de Acciones */}
          <div className="cliente-contrato-action-buttons">
            <Btn
              variant="ghost"
              onClick={() => {
                if (selPkgs.length === 0) {
                  alert("Selecciona al menos un paquete");
                  return;
                }
                generarHtmlPropuesta({
                  client,
                  selPkgs,
                  safeM,
                  mensualD,
                  comprometido,
                  subTotal,
                  puntual,
                  sinIva,
                  iva,
                  conIva,
                  ahorro,
                  desc10,
                  servs,
                  servSel,
                  servRange,
                  sessions,
                  activePkgServIds,
                  pkgServOff,
                  allPkgSubs,
                });
              }}
            >
              📄 Generar propuesta PDF
            </Btn>
            <Btn
              variant="primary"
              onClick={() => {
                if (selPkgs.length === 0) {
                  alert("Selecciona al menos un paquete");
                  return;
                }
                onAddRecord({
                  tipo: "contrato",
                  cliente: client.name,
                  clienteId: client.id,
                  paquete: selPkgs.map(p => p.name).join(" + ") || "—",
                  meses: safeM,
                  sinIva,
                  conIva,
                });
              }}
            >
              Guardar en resultados
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}
