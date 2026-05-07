import { useState } from "react";
import { fmtI, fmtDate } from "../data/constants.js";
import { Card, Btn } from "./ui.jsx";

const NAVY = "#0a2b49";
const CLOUD = "#ebf2f7";

function buildPeriodos(client) {
  const list = [];
  (client.periodos || []).forEach(p => {
    list.push({ inicio: p.inicio, fin: p.fin, estado: "finalizado" });
  });
  if (client.creadoEn) {
    list.push({ inicio: client.creadoEn, fin: client.fechaFin || null, estado: client.estado || "activo" });
  }
  return list.reverse();
}

export default function ClienteHistorial({ client, records = [], onDel }) {
  const [expanded, setExpanded] = useState(() => new Set(["0"]));

  const clientRecords = records.filter(
    r => r.clienteId === client.id || r.cliente === client.name
  );
  const propuestas = client.propuestas || [];
  const periodos = buildPeriodos(client);

  const toggle = key => setExpanded(prev => {
    const n = new Set(prev);
    n.has(key) ? n.delete(key) : n.add(key);
    return n;
  });

  if (periodos.length === 0) {
    return (
      <Card>
        <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", fontStyle: "italic", padding: "8px 0" }}>
          Sin historial para {client.name}.
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {periodos.map((periodo, idx) => {
        const key = String(idx);
        const isExpanded = expanded.has(key);
        const isActivo = periodo.estado === "activo";

        const propsPeriodo = propuestas.filter(p =>
          p.fecha >= periodo.inicio &&
          (!periodo.fin || p.fecha <= periodo.fin)
        );
        const propDefinitiva =
          propsPeriodo.find(p => p.definitiva) ||
          propsPeriodo[propsPeriodo.length - 1];

        const recsPeriodo = clientRecords.filter(r => {
          const ts = r.ts ? r.ts.slice(0, 10) : "";
          return ts >= periodo.inicio && (!periodo.fin || ts <= periodo.fin);
        });

        const borderColor = isActivo ? "rgba(22,163,74,0.35)" : "rgba(10,43,73,0.12)";
        const bgColor = isActivo ? "rgba(22,163,74,0.03)" : "#fff";
        const badgeStyle = isActivo
          ? { background: "rgba(22,163,74,0.18)", color: "#166534" }
          : { background: CLOUD, color: "rgba(10,43,73,0.55)" };

        return (
          <div key={key} style={{
            border: `1.5px solid ${borderColor}`,
            borderRadius: 12,
            overflow: "hidden",
            background: bgColor,
          }}>

            {/* Cabecera del período */}
            <button
              onClick={() => toggle(key)}
              style={{
                width: "100%",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "transparent",
                border: "none",
                borderBottom: isExpanded ? `1px solid ${borderColor}` : "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>
                    {fmtDate(periodo.inicio)} — {periodo.fin ? fmtDate(periodo.fin) : "Presente"}
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 5,
                    padding: "2px 8px",
                    ...badgeStyle,
                  }}>
                    {isActivo ? "● Activo" : "○ Finalizado"}
                  </span>
                </div>
                {propDefinitiva && (
                  <div style={{ fontSize: 12, color: "rgba(10,43,73,0.55)", marginTop: 4 }}>
                    Propuesta:{" "}
                    <strong style={{ color: NAVY }}>{propDefinitiva.nombre}</strong>
                    {propDefinitiva.snapshot?.totalConIva
                      ? ` · ${fmtI(propDefinitiva.snapshot.totalConIva)} € c/IVA`
                      : ""}
                    {propDefinitiva.definitiva && (
                      <span style={{
                        marginLeft: 6,
                        fontSize: 10,
                        background: "rgba(29,158,117,0.18)",
                        color: "#1D9E75",
                        borderRadius: 4,
                        padding: "1px 6px",
                        fontWeight: 700,
                      }}>
                        DEFINITIVA
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ textAlign: "right", fontSize: 12 }}>
                  <div style={{ color: "rgba(10,43,73,0.45)" }}>
                    {recsPeriodo.length} registro{recsPeriodo.length !== 1 ? "s" : ""} · {propsPeriodo.length} propuesta{propsPeriodo.length !== 1 ? "s" : ""}
                  </div>
                  {recsPeriodo.length > 0 && (
                    <div style={{ fontWeight: 700, color: NAVY }}>
                      {fmtI(recsPeriodo.reduce((a, r) => a + (r.conIva || 0), 0))} € c/IVA
                    </div>
                  )}
                </div>
                <span style={{ fontSize: 16, color: "rgba(10,43,73,0.35)" }}>
                  {isExpanded ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {isExpanded && (
              <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>

                {/* Propuesta acordada */}
                {propDefinitiva ? (
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "rgba(10,43,73,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 8,
                    }}>
                      Propuesta acordada
                    </div>
                    <div style={{
                      border: `1.5px solid ${propDefinitiva.definitiva ? "rgba(29,158,117,0.40)" : "rgba(10,43,73,0.10)"}`,
                      borderRadius: 8,
                      padding: "12px 14px",
                      background: propDefinitiva.definitiva ? "rgba(29,158,117,0.05)" : CLOUD,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{propDefinitiva.nombre}</span>
                            {propDefinitiva.definitiva && (
                              <span style={{
                                fontSize: 10,
                                background: "rgba(29,158,117,0.18)",
                                color: "#1D9E75",
                                borderRadius: 4,
                                padding: "2px 7px",
                                fontWeight: 700,
                              }}>
                                DEFINITIVA
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", marginTop: 3 }}>
                            {fmtDate(propDefinitiva.fecha)}
                            {propDefinitiva.snapshot?.paquetes?.length > 0 &&
                              ` · ${propDefinitiva.snapshot.paquetes.map(p => p.name).join(", ")}`}
                            {propDefinitiva.snapshot?.meses &&
                              ` · ${propDefinitiva.snapshot.meses} meses`}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>
                            {fmtI(propDefinitiva.snapshot?.totalConIva || 0)} €
                          </div>
                          <div style={{ fontSize: 10, color: "rgba(10,43,73,0.45)" }}>
                            con IVA · sin IVA: {fmtI(propDefinitiva.snapshot?.totalSinIva || 0)} €
                          </div>
                        </div>
                      </div>
                    </div>
                    {propsPeriodo.length > 1 && (
                      <div style={{ marginTop: 6, fontSize: 11, color: "rgba(10,43,73,0.45)" }}>
                        + {propsPeriodo.length - 1} propuesta(s) más en este período
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: "rgba(10,43,73,0.45)", fontStyle: "italic" }}>
                    Sin propuestas en este período
                  </div>
                )}

                {/* Registros del período */}
                {recsPeriodo.length > 0 && (
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "rgba(10,43,73,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 8,
                    }}>
                      Registros guardados
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {recsPeriodo.map((r) => (
                        <div key={r.id} style={{
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
                            <span style={{ color: NAVY, fontWeight: 500 }}>
                              {r.paquete || r.tipo}
                            </span>
                            {r.meses && (
                              <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(10,43,73,0.45)" }}>
                                {r.meses} meses
                              </span>
                            )}
                            {r.horas && (
                              <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(10,43,73,0.45)" }}>
                                {r.horas} h
                              </span>
                            )}
                          </div>
                          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontWeight: 600, color: NAVY }}>{fmtI(r.conIva)} € c/IVA</div>
                              <div style={{ fontSize: 10, color: "rgba(10,43,73,0.45)" }}>
                                sin IVA: {fmtI(r.sinIva)} €
                              </div>
                            </div>
                            {onDel && (
                              <Btn variant="danger" size="sm" onClick={() => onDel(r.id)}>×</Btn>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {recsPeriodo.length === 0 && !propDefinitiva && (
                  <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", fontStyle: "italic", textAlign: "center", padding: "8px 0" }}>
                    Sin actividad registrada en este período
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
