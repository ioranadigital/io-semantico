import { useState } from "react";
import { ACCENT, fmt, fmtI, css } from "../data/constants.js";
import { mergePaquetes, mergeServicios } from "../data/defaults.js";
import { Card, SL, CH, Btn, ConfirmBtn } from "./ui.jsx";

const NAVY = "#0a2b49";
const CLOUD = "#ebf2f7";

export default function ClienteServicios({
  client, globalClient, setClients,
  catalogoPaquetes, catalogoServicios, catalogoServiciosCategorizado
}) {
  const isGlobal = client.id === "global";
  const upd = patch => setClients(prev => prev.map(c => c.id === client.id ? { ...c, ...patch } : c));
  const [expandedCat, setExpandedCat] = useState(new Set());

  const toggleCat = id => setExpandedCat(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const updPrecioCliente = (id, val) => {
    const precio = val === "" ? null : +val;
    const lista = client.servicios || [];
    const existe = lista.find(s => s.id === id);
    if (existe) {
      upd({ servicios: lista.map(s => s.id === id ? { ...s, precio } : s) });
    } else {
      const cat = catalogoServicios.find(s => s.id === id);
      upd({ servicios: [...lista, { id, precio, ...(cat ? { min: cat.min, max: cat.max } : {}) }] });
    }
  };

  const toggleServicio = (id) => {
    const lista = client.servicios || [];
    const existe = lista.find(s => s.id === id);
    if (existe) {
      upd({ servicios: lista.filter(s => s.id !== id) });
    } else {
      const cat = catalogoServicios.find(s => s.id === id);
      upd({ servicios: [...lista, { id, precio: null, ...(cat ? { min: cat.min, max: cat.max } : {}) }] });
    }
  };

  const clientServiceIds = new Set((client.servicios || []).map(s => s.id));
  const serviciosAñadidos = (client.servicios || []).map(s => catalogoServicios.find(cs => cs.id === s.id) || s);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, minHeight: "100%" }}>

      {/* ─────────────────────────────────────────────────────────
          COLUMNA IZQUIERDA: SERVICIOS AGREGADOS
          ───────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{
            padding: "10px 14px",
            background: CLOUD,
            borderBottom: "1px solid rgba(10,43,73,0.10)",
            fontSize: 12,
            fontWeight: 700,
            color: NAVY,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            flexShrink: 0,
          }}>
            Servicios agregados al cliente
          </div>

          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}>
            {serviciosAñadidos.length === 0 ? (
              <div style={{ fontSize: 12, color: "rgba(10,43,73,0.45)", fontStyle: "italic", padding: "8px 0" }}>
                Sin servicios agregados aún.
              </div>
            ) : (
              serviciosAñadidos.map(sv => {
                const clientSrv = (client.servicios || []).find(s => s.id === sv.id);
                const precioMuestra = clientSrv?.precio !== null && clientSrv?.precio !== undefined
                  ? clientSrv.precio
                  : (sv.min === sv.max ? sv.min : `${fmtI(sv.min)}−${fmtI(sv.max)}`);
                return (
                  <div key={sv.id} style={{
                    padding: "10px 12px",
                    border: "1px solid rgba(10,43,73,0.10)",
                    borderRadius: 6,
                    background: "rgba(10,43,73,0.02)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, wordBreak: "break-word" }}>
                          {sv.name}
                        </div>
                        {sv.resumen && (
                          <div style={{ fontSize: 10, color: "rgba(10,43,73,0.45)", marginTop: 2 }}>
                            {sv.resumen}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, whiteSpace: "nowrap" }}>
                        {precioMuestra} €
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", paddingTop: 6, borderTop: "1px solid rgba(10,43,73,0.10)" }}>
                      <input
                        type="number"
                        min="0"
                        value={clientSrv?.precio ?? ""}
                        onChange={e => updPrecioCliente(sv.id, e.target.value)}
                        placeholder={sv.min === sv.max ? `${sv.min}` : `${fmtI(sv.min)}−${fmtI(sv.max)}`}
                        style={{ ...css.inp, fontSize: 10, padding: "4px 6px", height: 28, flex: 1 }}
                      />
                      <ConfirmBtn onConfirm={() => toggleServicio(sv.id)} children="Quitar" size="sm" msg="¿Quitar?" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      {/* ─────────────────────────────────────────────────────────
          COLUMNA DERECHA: CATÁLOGO POR CATEGORÍA
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
                    const isSelected = clientServiceIds.has(sv.id);
                    const clientSrv = (client.servicios || []).find(s => s.id === sv.id);
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
                            checked={isSelected}
                            onChange={() => toggleServicio(sv.id)}
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

                        {isSelected && (
                          <div style={{ display: "flex", gap: 4, alignItems: "center", paddingTop: 6, borderTop: "1px solid rgba(10,43,73,0.10)" }}>
                            <input
                              type="number"
                              min="0"
                              value={clientSrv?.precio ?? ""}
                              onChange={e => updPrecioCliente(sv.id, e.target.value)}
                              placeholder="—"
                              style={{ ...css.inp, fontSize: 9, padding: "3px 5px", height: 24, flex: 1 }}
                            />
                          </div>
                        )}

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
