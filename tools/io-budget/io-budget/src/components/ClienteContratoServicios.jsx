import { useState } from "react";
import { ACCENT, IVA, fmt, fmtI, uid, hoy, css } from "../data/constants.js";
import { mergePaquetes, mergeServicios } from "../data/defaults.js";
import { Card, SL, CH, Btn } from "./ui.jsx";

const NAVY = "#0a2b49";
const CLOUD = "#ebf2f7";

export default function ClienteContratoServicios({
  client, globalClient, setClients,
  catalogoPaquetes, catalogoServicios, catalogoServiciosCategorizado,
  onAddRecord,
}) {
  const pkgs = mergePaquetes(
    catalogoPaquetes,
    client.paquetesActivos ? client.paquetesOverrides : globalClient.paquetesOverrides
  );

  const servs = mergeServicios(
    catalogoServicios,
    client.serviciosActivos ? client.servicios : globalClient.servicios
  );

  const [expandedCat, setExpandedCat] = useState(new Set());
  const [pkgBaseId, setPkgBaseId] = useState(catalogoPaquetes[0]?.id || null);
  const [packNombre, setPackNombre] = useState("");
  const [packPrecio, setPackPrecio] = useState(0);
  const [packMinMonths, setPackMinMonths] = useState(3);
  const [packServs, setPackServs] = useState([]);
  const [servPrecios, setServPrecios] = useState({});
  const [editingPkgId, setEditingPkgId] = useState(null);
  const [expandedEditCat, setExpandedEditCat] = useState(new Set());

  const isGlobal = client.id === "global";
  const upd = patch => setClients(prev => prev.map(c => c.id === client.id ? { ...c, ...patch } : c));

  const agregarPropuesta = (pkg) => {
    const nueva = { id: uid(), tipo: "contrato", fecha: hoy(), nombre: pkg.name, estado: "pendiente", paquete: { ...pkg } };
    upd({ propuestas: [...(client.propuestas || []), nueva] });
  };

  const estadoPaquete = (p) => {
    const t = hoy();
    if (!p.fechaInicio) return "vigente";
    if (t < p.fechaInicio) return "proximo";
    if (!p.fechaFin || t <= p.fechaFin) return "vigente";
    return "expirado";
  };

  const toggleCat = id => setExpandedCat(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const pkgBase = catalogoPaquetes.find(p => p.id === pkgBaseId);

  const addServicio = sv => {
    if (packServs.find(s => s.id === sv.id)) return;
    const precio = servPrecios[sv.id] ?? (sv.min === sv.max ? sv.min : sv.min);
    setPackServs(prev => [...prev, { id: sv.id, name: sv.name, precio }]);
    setServPrecios(prev => ({ ...prev, [sv.id]: undefined }));
  };

  const removeServicio = id => setPackServs(prev => prev.filter(s => s.id !== id));

  const guardarPaquete = () => {
    if (!packNombre.trim()) {
      alert("Ingresa un nombre para el paquete");
      return;
    }
    const nuevo = {
      id: uid(),
      name: packNombre.trim(),
      price: packPrecio,
      minMonths: packMinMonths,
      subServicios: packServs.map(s => ({ id: s.id, ratio: 0.5, qty: 1 })),
      creadoEn: hoy(),
    };

    const overrides = client.paquetesActivos
      ? client.paquetesOverrides
      : globalClient.paquetesOverrides.map(p => ({...p, subServicios: [...(p.subServicios || [])]}));

    upd({ paquetesActivos: true, paquetesOverrides: [...overrides, nuevo] });

    if (onAddRecord) {
      const sinIva = packPrecio * packMinMonths;
      const conIva = sinIva * (1 + IVA);
      onAddRecord({
        tipo: "contrato",
        cliente: client.name,
        clienteId: client.id,
        paquete: packNombre.trim(),
        meses: packMinMonths,
        sinIva,
        conIva,
      });
    }

    setPackNombre("");
    setPackPrecio(0);
    setPackMinMonths(3);
    setPackServs([]);
    setPkgBaseId(catalogoPaquetes[0]?.id || null);
  };

  if (isGlobal) {
    return (
      <Card>
        <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", padding: "8px 0" }}>
          Configuración de paquetes por cliente — selecciona un cliente específico.
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, minHeight: "100%" }}>

      {/* ─────────────────────────────────────────────────────────
          COLUMNA IZQUIERDA: FORMULARIO NUEVO PAQUETE
          ───────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
            Nuevo paquete
          </div>

          <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Selector de paquete base */}
            <div>
              <CH>Paquete base</CH>
              <select
                value={pkgBaseId || ""}
                onChange={e => {
                  setPkgBaseId(e.target.value);
                  setTimeout(() => {
                    const selected = catalogoPaquetes.find(p => p.id === e.target.value);
                    if (selected) {
                      setPackNombre(selected.name);
                      setPackPrecio(selected.price);
                      setPackMinMonths(selected.minMonths);
                      setPackServs((selected.subServicios || []).map(sub => {
                        const sv = servs.find(s => s.id === sub.id);
                        if (!sv) return null;
                        const precio = (sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5)) * (sub.qty || 1);
                        return { id: sub.id, name: sv.name, precio };
                      }).filter(Boolean));
                    }
                  }, 0);
                }}
                style={{ ...css.inp, width: "100%", marginTop: 4 }}
              >
                <option value="">Selecciona un paquete...</option>
                {catalogoPaquetes.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Nombre */}
            <div>
              <CH>Nombre</CH>
              <input
                value={packNombre}
                onChange={e => setPackNombre(e.target.value)}
                placeholder="Ej: Arranque Digital Customizado"
                style={{ ...css.inp, width: "100%", marginTop: 4 }}
              />
            </div>

            {/* Grid 3 columnas: €/mes, Mín, Alta */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px", gap: 8 }}>
              <div>
                <CH>€/mes</CH>
                <input
                  type="number"
                  min={0}
                  value={packPrecio}
                  onChange={e => setPackPrecio(+e.target.value)}
                  style={{ ...css.inp, width: "100%", marginTop: 4 }}
                />
              </div>
              <div>
                <CH>Mín.</CH>
                <input
                  type="number"
                  min={1}
                  max={36}
                  value={packMinMonths}
                  onChange={e => setPackMinMonths(Math.max(1, +e.target.value))}
                  style={{ ...css.inp, width: "100%", marginTop: 4 }}
                />
              </div>
              <div>
                <CH>Alta</CH>
                <div style={{ marginTop: 4, padding: "6px 10px", background: CLOUD, borderRadius: 6, fontSize: 12, fontWeight: 600, color: NAVY }}>
                  —
                </div>
              </div>
            </div>

            {/* Resumen de costes - Carrito */}
            <div style={{
              padding: "12px",
              background: "rgba(10,43,73,0.02)",
              borderRadius: 6,
              border: "1px solid rgba(10,43,73,0.08)",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.55)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Resumen de costes
              </div>

              {/* Paquete base */}
              <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(10,43,73,0.10)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: NAVY, fontWeight: 500 }}>Paquete base</span>
                  <span style={{ fontWeight: 600, color: NAVY }}>{fmt(packPrecio)} €/mes</span>
                </div>
                {packMinMonths > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(10,43,73,0.55)" }}>
                    <span>Total ({packMinMonths}m)</span>
                    <span style={{ fontWeight: 600 }}>{fmt(packPrecio * packMinMonths)} €</span>
                  </div>
                )}
              </div>

              {/* Servicios agregados */}
              {packServs.length > 0 ? (
                <>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(10,43,73,0.55)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Servicios adicionales
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {packServs.map(s => (
                        <div key={s.id} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 10px",
                          background: "#fff",
                          borderRadius: 4,
                          border: "1px solid rgba(10,43,73,0.10)",
                          fontSize: 11,
                        }}>
                          <span style={{ color: NAVY, fontWeight: 500 }}>{s.name}</span>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <span style={{ fontWeight: 600, color: NAVY, whiteSpace: "nowrap" }}>{fmt(s.precio)} €</span>
                            <button
                              onClick={() => removeServicio(s.id)}
                              style={{
                                padding: "4px 10px",
                                background: "#e74c3c",
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                cursor: "pointer",
                                fontSize: 11,
                                fontWeight: 700,
                                transition: "background 0.2s",
                              }}
                              onMouseOver={e => e.target.style.background = "#c0392b"}
                              onMouseOut={e => e.target.style.background = "#e74c3c"}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ paddingTop: 8, borderTop: "1px solid rgba(10,43,73,0.10)", fontSize: 10, color: "rgba(10,43,73,0.55)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span>Subtotal servicios</span>
                      <span style={{ fontWeight: 600, color: NAVY }}>{fmt(packServs.reduce((a, s) => a + s.precio, 0))} €</span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 10, color: "rgba(10,43,73,0.45)", fontStyle: "italic", marginBottom: 8 }}>
                  Sin servicios adicionales
                </div>
              )}

              {/* Total final */}
              <div style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: "2px solid rgba(255,140,34,0.30)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Total estimado</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: ACCENT }}>
                  {fmt(packPrecio * packMinMonths + packServs.reduce((a, s) => a + s.precio, 0))} €
                </span>
              </div>
            </div>

            {/* Acciones */}
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
                  setPackPrecio(0);
                  setPackMinMonths(3);
                  setPackServs([]);
                  setPkgBaseId(catalogoPaquetes[0]?.id || null);
                }}
                style={{ flex: 1 }}
              >
                Limpiar
              </Btn>
            </div>
          </div>
        </Card>

        {/* Paquetes existentes */}
        {pkgs.length > 0 && (
          <Card>
            <SL>Paquetes existentes</SL>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pkgs.map(p => {
                const subtotalMensual = p.price || 0;
                const servicios = (p.subServicios || []).map(sub => {
                  const sv = servs.find(s => s.id === sub.id);
                  if (!sv) return null;
                  const precio = (sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5)) * (sub.qty || 1);
                  return { id: sub.id, name: sv.name, precio };
                }).filter(Boolean);
                const subtotalServicios = servicios.reduce((a, s) => a + s.precio, 0);
                const totalMensual = subtotalMensual + subtotalServicios;
                const total = totalMensual * (p.minMonths || 1);
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
                        <span style={{ fontWeight: 600, fontSize: 13, color: NAVY, minWidth: 100 }}>{p.name}</span>
                        <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap" }}>{p.minMonths}m · {servicios.length} servicios</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", flexShrink: 0 }}>
                        <span style={{
                          fontSize: 10,
                          padding: "4px 10px",
                          borderRadius: 4,
                          fontWeight: 600,
                          background: estadoPaquete(p) === "vigente" ? "#dcfce7" : "#fee2e2",
                          color: estadoPaquete(p) === "vigente" ? "#15803d" : "#991b1b",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}>
                          {estadoPaquete(p) === "vigente" ? "✓ Vigente" : "✕ No Activo"}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>{fmt(total)} €</span>
                        <Btn variant="ghost" size="sm" onClick={() => setEditingPkgId(isEditing ? null : p.id)}>
                          {isEditing ? "Cerrar" : "Editar"}
                        </Btn>
                      </div>
                    </div>

                    {/* Sección expandible: Editar servicios */}
                    {isEditing && (
                      <div style={{
                        padding: "12px",
                        borderTop: "1px solid rgba(10,43,73,0.08)",
                        background: "rgba(10,43,73,0.01)",
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.55)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Servicios del paquete
                        </div>

                        {/* Servicios existentes */}
                        {servicios.length > 0 && (
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 10, color: "rgba(10,43,73,0.55)", marginBottom: 6 }}>Incluidos:</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              {servicios.map(s => (
                                <div key={s.id} style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "6px 8px",
                                  background: "#fff",
                                  borderRadius: 4,
                                  border: "1px solid rgba(10,43,73,0.10)",
                                  fontSize: 10,
                                }}>
                                  <span style={{ color: NAVY, fontWeight: 500 }}>{s.name}</span>
                                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                    <span style={{ fontWeight: 600, color: NAVY }}>{fmt(s.precio)} €</span>
                                    <button
                                      onClick={() => {
                                        const newSubs = p.subServicios.filter(sub => sub.id !== s.id);
                                        const newOverrides = (client.paquetesActivos ? client.paquetesOverrides : globalClient.paquetesOverrides).map(pkg =>
                                          pkg.id === p.id ? { ...pkg, subServicios: newSubs } : pkg
                                        );
                                        upd({ paquetesActivos: true, paquetesOverrides: newOverrides });
                                      }}
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
                        <div style={{ fontSize: 10, color: "rgba(10,43,73,0.55)", marginBottom: 6 }}>Agregar:</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 6, marginBottom: 12 }}>
                          {catalogoServiciosCategorizado?.flatMap(cat => cat.servicios || []).map(sv => {
                            const isIncluded = p.subServicios.find(sub => sub.id === sv.id);
                            return (
                              <button
                                key={sv.id}
                                onClick={() => {
                                  if (!isIncluded) {
                                    const newSubs = [...p.subServicios, { id: sv.id, ratio: 0.5, qty: 1 }];
                                    const newOverrides = (client.paquetesActivos ? client.paquetesOverrides : globalClient.paquetesOverrides).map(pkg =>
                                      pkg.id === p.id ? { ...pkg, subServicios: newSubs } : pkg
                                    );
                                    upd({ paquetesActivos: true, paquetesOverrides: newOverrides });
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

                        {/* Botón Actualizar */}
                        <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: "1px solid rgba(10,43,73,0.08)" }}>
                          <Btn
                            variant="primary"
                            onClick={() => {
                              setEditingPkgId(null);
                              if (onAddRecord) {
                                const servicios = p.subServicios.map(sub => {
                                  const sv = servs.find(s => s.id === sub.id);
                                  if (!sv) return null;
                                  const precio = (sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5)) * (sub.qty || 1);
                                  return { id: sub.id, name: sv.name, precio };
                                }).filter(Boolean);
                                const totalServicios = servicios.reduce((a, s) => a + s.precio, 0);
                                onAddRecord({
                                  tipo: "contrato",
                                  cliente: client.name,
                                  clienteId: client.id,
                                  paquete: p.name,
                                  meses: 3,
                                  sinIva: (p.price || 0) * 3 + totalServicios * 3,
                                  conIva: ((p.price || 0) * 3 + totalServicios * 3) * (1 + IVA),
                                });
                              }
                            }}
                            style={{ flex: 1 }}
                          >
                            Actualizar paquete
                          </Btn>
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
                <div
                  style={{
                    padding: 12,
                    background: CLOUD,
                    borderRadius: "0 0 8px 8px",
                    border: `1px solid rgba(10,43,73,0.08)`,
                    borderTop: "none",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 10,
                  }}
                >
                  {cat.servicios?.map(sv => {
                    const isSelected = packServs.find(s => s.id === sv.id);
                    const precioBase = sv.min === sv.max ? sv.min : `${fmtI(sv.min)}−${fmtI(sv.max)}`;
                    const precioEditado = servPrecios[sv.id];

                    return (
                      <div
                        key={sv.id}
                        style={{
                          padding: 10,
                          background: isSelected ? "rgba(255,140,34,0.10)" : "#ffffff",
                          border: isSelected ? `2px solid ${ACCENT}` : "1px solid rgba(10,43,73,0.10)",
                          borderRadius: 6,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          transition: "all 0.15s",
                        }}
                      >
                        <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={() => isSelected ? removeServicio(sv.id) : addServicio(sv)}
                            style={{
                              width: 14,
                              height: 14,
                              cursor: "pointer",
                              accentColor: ACCENT,
                              marginTop: 2,
                              flexShrink: 0,
                            }}
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

                        <div style={{ fontSize: 9, color: "rgba(10,43,73,0.55)", fontStyle: "italic" }}>
                          Rango: {precioBase} €
                        </div>

                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          placeholder={sv.min}
                          value={precioEditado ?? ""}
                          onChange={e => setServPrecios(prev => ({ ...prev, [sv.id]: e.target.value ? parseFloat(e.target.value) : undefined }))}
                          style={{
                            ...css.inp,
                            fontSize: 11,
                            padding: "6px 8px",
                            width: "100%",
                            marginTop: 2,
                          }}
                        />
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
