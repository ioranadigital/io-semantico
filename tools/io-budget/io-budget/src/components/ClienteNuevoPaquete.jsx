import { useState } from "react";
import { ACCENT, IVA, fmt, fmtI, fmtDate, hoy, uid, css } from "../data/constants.js";
import { Card, SL, CH, Btn, ConfirmBtn } from "./ui.jsx";

const NAVY = "#0a2b49";
const CLOUD = "#ebf2f7";

function estadoPaquete(p) {
  const t = hoy();
  if (!p.fechaInicio) return "sin_fecha";
  if (t < p.fechaInicio) return "proximo";
  if (!p.fechaFin || t <= p.fechaFin) return "vigente";
  return "expirado";
}

const ESTADO_PACK = {
  vigente:   { label: "✓ Vigente",  bg: "#dcfce7",  color: "#15803d" },
  proximo:   { label: "Próximo",  bg: CLOUD,   color: "rgba(10,43,73,0.65)" },
  expirado:  { label: "✕ No Activo", bg: "#fee2e2",   color: "#991b1b" },
  sin_fecha: { label: "Sin fecha",bg: CLOUD,   color: "rgba(10,43,73,0.45)" },
};

export default function ClienteNuevoPaquete({
  client, globalClient, setClients,
  catalogoServicios, catalogoServiciosCategorizado
}) {
  const [expandedCat, setExpandedCat] = useState(new Set());
  const [packNombre,  setPackNombre]  = useState("");
  const [packHoras,   setPackHoras]   = useState(20);
  const [packTarifa,  setPackTarifa]  = useState(client.tarifaBase || 40);
  const [packInicio,  setPackInicio]  = useState(hoy());
  const [packFin,     setPackFin]     = useState("");
  const [packServs,   setPackServs]   = useState([]);
  const [editingPkgId, setEditingPkgId] = useState(null);

  const isGlobal = client.id === "global";
  const paquetesHoras = client.paquetesHoras || [];
  const upd = patch => setClients(prev => prev.map(c => c.id === client.id ? { ...c, ...patch } : c));

  const agregarPropuesta = (pkg) => {
    const nueva = { id: uid(), tipo: "horas", fecha: hoy(), nombre: pkg.nombre, estado: "pendiente", paquete: { ...pkg } };
    upd({ propuestas: [...(client.propuestas || []), nueva] });
  };

  const updatePaqueteServicio = (pkgId, newServicios) => {
    upd({ paquetesHoras: paquetesHoras.map(p => p.id === pkgId ? { ...p, servicios: newServicios } : p) });
  };

  const toggleCat = id => setExpandedCat(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const addServicio = sv => {
    if (packServs.find(s => s.id === sv.id)) return;
    const precio = sv.min === sv.max ? sv.min : sv.min;
    setPackServs(prev => [...prev, { id: sv.id, name: sv.name, precio, min: sv.min, max: sv.max }]);
  };

  const removeServicio = id => setPackServs(prev => prev.filter(s => s.id !== id));

  const guardarPaquete = () => {
    if (!packNombre.trim()) {
      alert("Ingresa un nombre para el paquete");
      return;
    }
    const nuevo = {
      id: uid(),
      nombre: packNombre.trim(),
      horas: packHoras,
      tarifa: packTarifa,
      fechaInicio: packInicio || null,
      fechaFin: packFin || null,
      creadoEn: hoy(),
      servicios: packServs,
    };
    upd({ paquetesHoras: [...paquetesHoras, nuevo] });
    setPackNombre("");
    setPackHoras(20);
    setPackTarifa(client.tarifaBase || 40);
    setPackInicio(hoy());
    setPackFin("");
    setPackServs([]);
  };

  const delPaquete = id => upd({ paquetesHoras: paquetesHoras.filter(p => p.id !== id) });

  const totalPackBase = packHoras * packTarifa;
  const totalPackServicios = packServs.reduce((a, s) => a + (s.precio || 0), 0);
  const totalPack = totalPackBase + totalPackServicios;

  if (isGlobal) {
    return (
      <Card>
        <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", fontStyle: "italic", padding: "8px 0" }}>
          Gestión de paquetes de horas en configuración cliente.
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, minHeight: "100%" }}>

      {/* ─────────────────────────────────────────────────────────
          COLUMNA IZQUIERDA: PAQUETES EXISTENTES + NUEVO
          ───────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Nuevo paquete */}
        <Card style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "10px 14px",
            background: CLOUD,
            borderBottom: "1px solid rgba(10,43,73,0.10)",
            fontSize: 12,
            fontWeight: 700,
            color: NAVY,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            ⏱ Nuevo Paquete
          </div>

          <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px", gap: 8 }}>
              <div>
                <CH>Nombre</CH>
                <input
                  value={packNombre}
                  onChange={e => setPackNombre(e.target.value)}
                  placeholder="Ej: Mantenimiento Q2"
                  style={{ ...css.inp, width: "100%", marginTop: 4 }}
                />
              </div>
              <div>
                <CH>Horas</CH>
                <input
                  type="number"
                  min={1}
                  max={9999}
                  value={packHoras}
                  onChange={e => setPackHoras(Math.max(1, +e.target.value))}
                  style={{ ...css.inp, width: "100%", marginTop: 4 }}
                />
              </div>
              <div>
                <CH>€/h</CH>
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={packTarifa}
                  onChange={e => setPackTarifa(Math.max(1, +e.target.value))}
                  style={{ ...css.inp, width: "100%", marginTop: 4 }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <CH>Fecha inicio</CH>
                <input
                  type="date"
                  value={packInicio}
                  onChange={e => setPackInicio(e.target.value)}
                  style={{ ...css.inp, width: "100%", marginTop: 4 }}
                />
              </div>
              <div>
                <CH>Fecha fin (opcional)</CH>
                <input
                  type="date"
                  value={packFin}
                  onChange={e => setPackFin(e.target.value)}
                  style={{ ...css.inp, width: "100%", marginTop: 4 }}
                />
              </div>
            </div>

            {packServs.length > 0 && (
              <div style={{
                padding: "12px",
                background: "rgba(10,43,73,0.02)",
                borderRadius: 6,
                border: "1px solid rgba(10,43,73,0.08)",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.55)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Servicios agregados
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {packServs.map(s => (
                    <div key={s.id} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 8px",
                      background: "#fff",
                      borderRadius: 4,
                      border: "1px solid rgba(10,43,73,0.10)",
                      fontSize: 12,
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, color: NAVY }}>{s.name}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontWeight: 600, color: NAVY, whiteSpace: "nowrap" }}>{fmt(s.precio)} €</span>
                        <ConfirmBtn size="sm" onConfirm={() => removeServicio(s.id)} msg="¿Quitar?" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              padding: "10px 12px",
              background: "rgba(255,140,34,0.08)",
              borderRadius: 6,
              border: `1px solid rgba(255,140,34,0.20)`,
            }}>
              <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", marginBottom: 4 }}>Total estimado</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>
                {fmt(totalPack)} €
              </div>
              {packServs.length > 0 && (
                <div style={{ fontSize: 10, color: "rgba(10,43,73,0.55)", marginTop: 4 }}>
                  Horas: {fmt(totalPackBase)} € + Servicios: {fmt(totalPackServicios)} €
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Btn
                variant="primary"
                onClick={guardarPaquete}
                style={{ flex: 1 }}
              >
                Guardar Nuevo Paquete
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => {
                  setPackNombre("");
                  setPackHoras(20);
                  setPackTarifa(client.tarifaBase || 40);
                  setPackInicio(hoy());
                  setPackFin("");
                  setPackServs([]);
                }}
                style={{ flex: 1 }}
              >
                Limpiar
              </Btn>
            </div>
          </div>
        </Card>

        {/* Paquetes existentes */}
        {paquetesHoras.length > 0 && (
          <Card>
            <SL>Paquetes existentes</SL>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {paquetesHoras.map(p => {
                const est = estadoPaquete(p);
                const { label, bg, color } = ESTADO_PACK[est];
                const totalSinIva = p.horas * p.tarifa;
                const isEditing = editingPkgId === p.id;

                return (
                  <div key={p.id} style={{
                    border: "1px solid rgba(255,196,0,0.35)",
                    borderRadius: 10,
                    background: "rgba(255,214,0,0.08)",
                    overflow: "hidden",
                  }}>
                    {/* Fila principal */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px",
                      justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 600, color: NAVY, minWidth: 80 }}>{p.nombre}</span>
                        <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap" }}>{p.horas}h · {p.servicios?.length || 0} servicios</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", flexShrink: 0 }}>
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, fontWeight: 600, background: bg, color, whiteSpace: "nowrap", flexShrink: 0 }}>
                          {label}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>{fmt(totalSinIva)} €</span>
                        <Btn variant="primary" size="sm" onClick={() => agregarPropuesta(p)}>Agregar</Btn>
                        <Btn variant="ghost" size="sm" onClick={() => setEditingPkgId(isEditing ? null : p.id)}>
                          {isEditing ? "Cerrar" : "Editar"}
                        </Btn>
                        <ConfirmBtn size="sm" onConfirm={() => delPaquete(p.id)} msg="¿Borrar?" />
                      </div>
                    </div>

                    {/* Sección expandible: Editar servicios */}
                    {isEditing && (
                      <div style={{
                        padding: "12px",
                        borderTop: "1px solid rgba(10,43,73,0.08)",
                        background: "rgba(10,43,73,0.01)",
                      }}>
                        {/* Servicios existentes */}
                        {p.servicios?.length > 0 && (
                          <div style={{ marginBottom: 12 }}>
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
                                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                    {s.precio !== undefined && (
                                      <span style={{ fontWeight: 600, color: NAVY, whiteSpace: "nowrap" }}>
                                        {fmt(s.precio)} €
                                      </span>
                                    )}
                                    <button
                                      onClick={() => updatePaqueteServicio(p.id, p.servicios.filter((_, i) => i !== idx))}
                                      style={{
                                        padding: "2px 6px",
                                        background: "#e74c3c",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 3,
                                        cursor: "pointer",
                                        fontSize: 10,
                                        fontWeight: 700,
                                      }}
                                    >
                                      ×
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Catálogo para agregar servicios */}
                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.55)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Agregar servicios
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 6 }}>
                          {catalogoServiciosCategorizado?.flatMap(cat => cat.servicios || []).map(sv => {
                            const isIncluded = p.servicios?.find(s => s.id === sv.id);
                            return (
                              <button
                                key={sv.id}
                                onClick={() => {
                                  if (!isIncluded) {
                                    const newServ = [...(p.servicios || []), { id: sv.id, name: sv.name, precio: sv.min, min: sv.min, max: sv.max }];
                                    updatePaqueteServicio(p.id, newServ);
                                  }
                                }}
                                style={{
                                  padding: "6px 8px",
                                  background: isIncluded ? "rgba(10,43,73,0.10)" : "#fff",
                                  border: `1px solid ${isIncluded ? "rgba(10,43,73,0.20)" : "rgba(10,43,73,0.10)"}`,
                                  borderRadius: 4,
                                  cursor: isIncluded ? "not-allowed" : "pointer",
                                  fontSize: 10,
                                  color: NAVY,
                                  fontWeight: 500,
                                  opacity: isIncluded ? 0.5 : 1,
                                }}
                                disabled={isIncluded}
                              >
                                + {sv.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────
          COLUMNA DERECHA: CATÁLOGO DE SERVICIOS
          ───────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card>
          <SL>Catálogo de servicios</SL>
          {catalogoServiciosCategorizado?.map((cat, cidx) => (
            <div key={cat.id || cidx} style={{ marginBottom: 12 }}>
              <button
                onClick={() => toggleCat(cat.id)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: expandedCat.has(cat.id) ? CLOUD : "rgba(10,43,73,0.04)",
                  border: `1px solid ${expandedCat.has(cat.id) ? "rgba(10,43,73,0.12)" : "rgba(10,43,73,0.08)"}`,
                  borderRadius: expandedCat.has(cat.id) ? "8px 8px 0 0" : 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: NAVY,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <span>{cat.nombre}</span>
                <span style={{ fontSize: 12 }}>{expandedCat.has(cat.id) ? "▼" : "▶"}</span>
              </button>

              {expandedCat.has(cat.id) && (
                <div style={{
                  padding: 12,
                  background: CLOUD,
                  borderRadius: "0 0 8px 8px",
                  border: `1px solid rgba(10,43,73,0.08)`,
                  borderTop: "none",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: 10,
                }}>
                  {cat.servicios?.map(sv => {
                    const isSelected = packServs.find(s => s.id === sv.id);
                    const precioBase = sv.min === sv.max ? sv.min : `${fmtI(sv.min)}−${fmtI(sv.max)}`;
                    return (
                      <div key={sv.id} style={{
                        padding: 10,
                        background: isSelected ? "rgba(255,140,34,0.10)" : "#ffffff",
                        border: isSelected ? `2px solid ${ACCENT}` : "1px solid rgba(10,43,73,0.10)",
                        borderRadius: 6,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        transition: "all 0.15s",
                      }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={() => isSelected ? removeServicio(sv.id) : addServicio(sv)}
                            style={{ width: 14, height: 14, cursor: "pointer", accentColor: ACCENT, marginTop: 2, flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: NAVY, wordBreak: "break-word" }}>
                              {sv.name}
                            </div>
                            {sv.resumen && (
                              <div style={{ fontSize: 9, color: "rgba(10,43,73,0.45)", marginTop: 2 }}>
                                {sv.resumen}
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{ fontSize: 9, color: "rgba(10,43,73,0.55)", fontStyle: "italic", marginTop: "auto" }}>
                          {precioBase} €
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </Card>
      </div>

    </div>
  );
}
