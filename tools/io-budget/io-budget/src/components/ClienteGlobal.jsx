import { useState } from "react";
import { fmt, fmtI, fmtDate } from "../data/constants.js";
import { mergePaquetes } from "../data/defaults.js";
import { Card, SL, MetricCard, TipoBadge, EstadoBadge, Btn } from "./ui.jsx";

const NAVY = "#0a2b49";
const CLOUD = "#ebf2f7";

function estadoPaquete(p) {
  const t = new Date().toISOString().slice(0, 10);
  if (!p.fechaInicio) return "vigente";
  if (t < p.fechaInicio) return "proximo";
  if (!p.fechaFin || t <= p.fechaFin) return "vigente";
  return "expirado";
}

export default function ClienteGlobal({
  client, globalClient, catalogoPaquetes, records = []
}) {
  const [showRecords, setShowRecords] = useState(false);
  const isGlobal = client.id === "global";

  const pkgs = mergePaquetes(
    catalogoPaquetes,
    client.paquetesActivos ? client.paquetesOverrides : globalClient.paquetesOverrides
  );

  const clientRecords = records.filter(
    r => r.clienteId === client.id || r.cliente === client.name
  );
  const contratoRecords = clientRecords.filter(r => r.tipo === "contrato");
  const horasRecords = clientRecords.filter(r => r.tipo === "horas" || r.tipo === "bolsa");

  const totalContratoSinIva = contratoRecords.reduce((a, r) => a + (r.sinIva || 0), 0);
  const totalContratoConIva = contratoRecords.reduce((a, r) => a + (r.conIva || 0), 0);

  const paquetesHoras = client.paquetesHoras || [];
  const hoy = new Date().toISOString().slice(0, 10);
  const vigentes = paquetesHoras.filter(p => {
    if (!p.fechaInicio) return false;
    return hoy >= p.fechaInicio && (!p.fechaFin || hoy <= p.fechaFin);
  });
  const totalHorasVigentes = vigentes.reduce((a, p) => a + (p.horas || 0), 0);
  const totalImporteVigente = vigentes.reduce((a, p) => a + (p.importe || 0), 0);

  const propuestas = client.propuestas || [];
  const propDefinitiva = propuestas.find(p => p.definitiva) || propuestas[propuestas.length - 1];

  if (isGlobal) {
    return (
      <Card>
        <div style={{ fontSize: 13, color: "rgba(10,43,73,0.55)", padding: "8px 0" }}>
          Configuración global — selecciona un cliente para ver su dashboard.
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Header - Nombre cliente */}
      <Card>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 8 }}>
              {client.name}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <TipoBadge tipo={client.tipo} />
              <EstadoBadge estado={client.estado} fechaInicio={client.creadoEn} fechaFin={client.fechaFin} />
              {client.creadoEn && (
                <span style={{ fontSize: 12, color: "rgba(10,43,73,0.55)" }}>
                  Cliente desde {fmtDate(client.creadoEn)}
                </span>
              )}
            </div>
          </div>
          {propDefinitiva && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "rgba(10,43,73,0.45)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                Última propuesta
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{propDefinitiva.nombre}</div>
              <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)" }}>{fmtDate(propDefinitiva.fecha)}</div>
              {propDefinitiva.snapshot?.totalConIva && (
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginTop: 2 }}>
                  {fmtI(propDefinitiva.snapshot.totalConIva)} € c/IVA
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Paquetes Contratados Vigentes */}
      {(client.tipo === "contrato" || client.tipo === "ambos") && pkgs.length > 0 && (
        <Card>
          <SL>Paquetes Contratados Vigentes</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {pkgs.map(p => {
              const subtotalMensual = p.price || 0;
              const total = subtotalMensual * (p.minMonths || 1);
              const estado = estadoPaquete(p);
              return (
                <div key={p.id} style={{
                  padding: 12,
                  border: "1px solid rgba(10,43,73,0.10)",
                  borderRadius: 8,
                  background: "rgba(10,43,73,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", marginTop: 3 }}>
                        {p.subServicios?.length || 0} servicios
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
                  <div style={{ paddingTop: 8, borderTop: "1px solid rgba(10,43,73,0.10)", fontSize: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "rgba(10,43,73,0.55)" }}>Subtotal mensual</span>
                      <span style={{ fontWeight: 600, color: NAVY }}>{fmt(subtotalMensual)} €</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(10,43,73,0.55)" }}>Total ({p.minMonths}m)</span>
                      <span style={{ fontWeight: 700, color: NAVY, fontSize: 12 }}>{fmt(total)} €</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Bolsas de horas vigentes */}
      {vigentes.length > 0 && (
        <Card>
          <SL>Bolsas de horas vigentes</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {vigentes.map((p, i) => {
              const fechaInicio = new Date(p.fechaInicio);
              const fechaFin = p.fechaFin ? new Date(p.fechaFin) : new Date(p.fechaInicio);
              const meses = Math.max(1, Math.round((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24 * 30.44)));
              const subtotalMensual = meses > 0 ? (p.importe || 0) / meses : (p.importe || 0);
              const estado = estadoPaquete(p);
              return (
                <div key={i} style={{
                  padding: 12,
                  border: "1px solid rgba(10,43,73,0.10)",
                  borderRadius: 8,
                  background: "rgba(10,43,73,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>
                        {p.nombre || `Bolsa ${i + 1}`}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", marginTop: 2 }}>
                        {fmtDate(p.fechaInicio)} — {p.fechaFin ? fmtDate(p.fechaFin) : "Sin fecha fin"}
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
                  <div style={{ paddingTop: 8, borderTop: "1px solid rgba(10,43,73,0.10)", fontSize: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "rgba(10,43,73,0.55)" }}>Total de horas</span>
                      <span style={{ fontWeight: 600, color: NAVY }}>{p.horas} h</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "rgba(10,43,73,0.55)" }}>Subtotal mensual</span>
                      <span style={{ fontWeight: 600, color: NAVY }}>{fmtI(subtotalMensual)} €</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(10,43,73,0.55)" }}>Total ({meses}m)</span>
                      <span style={{ fontWeight: 700, color: NAVY, fontSize: 12 }}>{fmtI(p.importe)} €</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Resumen de Contratos - Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        {(client.tipo === "contrato" || client.tipo === "ambos") && (
          <>
            <MetricCard label="Contratos registrados" value={contratoRecords.length} unit="" />
            <MetricCard label="Total contrato sin IVA" value={`${fmtI(totalContratoSinIva)} €`} unit="" />
            <MetricCard label="Total contrato con IVA" value={`${fmtI(totalContratoConIva)} €`} unit="" accent />
          </>
        )}
        {(client.tipo === "horas" || client.tipo === "ambos") && (
          <>
            <MetricCard label="Bolsas horas vigentes" value={vigentes.length} unit="" />
            <MetricCard label="Horas vigentes" value={totalHorasVigentes} unit="h" />
            <MetricCard label="Importe horas vigente" value={`${fmtI(totalImporteVigente)} €`} unit="" accent />
          </>
        )}
        <MetricCard label="Propuestas guardadas" value={propuestas.length} unit="" />
        <MetricCard label="Registros totales" value={clientRecords.length} unit="" />
      </div>

      {/* Últimos registros (colapsable) */}
      {clientRecords.length > 0 && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <button
            onClick={() => setShowRecords(!showRecords)}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "transparent",
              border: "none",
              borderBottom: showRecords ? "1px solid rgba(10,43,73,0.10)" : "none",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>
              Últimos registros
            </div>
            <span style={{ fontSize: 16, color: "rgba(10,43,73,0.35)" }}>
              {showRecords ? "▲" : "▼"}
            </span>
          </button>
          {showRecords && (
            <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
              {[...clientRecords].reverse().slice(0, 5).map((r, i) => (
                <div key={i} style={{
                  fontSize: 12,
                  padding: "8px 12px",
                  background: "rgba(10,43,73,0.02)",
                  borderRadius: 6,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid rgba(10,43,73,0.07)",
                }}>
                  <div>
                    <span style={{ color: NAVY, fontWeight: 500 }}>{r.paquete || r.tipo}</span>
                    <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(10,43,73,0.45)" }}>
                      {r.tipo}
                    </span>
                  </div>
                  <span style={{ fontWeight: 600, color: NAVY }}>{fmtI(r.conIva)} € c/IVA</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {clientRecords.length === 0 && propuestas.length === 0 && (
        <Card>
          <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", textAlign: "center", padding: "20px 0", fontStyle: "italic" }}>
            Sin actividad registrada aún para {client.name}
          </div>
        </Card>
      )}
    </div>
  );
}
