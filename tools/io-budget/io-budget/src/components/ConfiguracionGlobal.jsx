import { useState } from "react";
import { ACCENT, fmtI, fmtDate, hoy, uid, css } from "../data/constants.js";
import { Card, Ghost, SL, CH, Badge, Btn, DateTag, Divider, ConfirmBtn } from "./ui.jsx";
import EditPaqueteGlobal from "./EditPaqueteGlobal.jsx";

const NAVY  = "#0a2b49";
const CLOUD = "#ebf2f7";

export default function ConfiguracionGlobal({
  catalogoPaquetes, setCatalogoPaquetes,
  catalogoServicios, flatServicios,
  setCatalogoServicios, setClients,
}) {
  const [editPkgGlobal,   setEditPkgGlobal]   = useState(null);
  const [expandedCats,    setExpandedCats]     = useState(new Set());
  const [editingCatName,  setEditingCatName]   = useState(null);
  const [expandedDesc,    setExpandedDesc]     = useState(new Set()); // svId con desc visible

  const toggleDesc = id => setExpandedDesc(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const toggleCat = id => setExpandedCats(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  // ── Catálogo global paquetes ──────────────────────────────────
  const savePkgGlobal = (data) => {
    if (data._isNew) {
      const { _isNew, ...clean } = data;
      setCatalogoPaquetes(prev => [...prev, clean]);
    } else {
      setCatalogoPaquetes(prev => prev.map(p => p.id === data.id ? data : p));
    }
    setEditPkgGlobal(null);
  };
  const delPkgGlobal = (id) => {
    setCatalogoPaquetes(prev => prev.filter(p => p.id !== id));
    setClients(prev => prev.map(c => ({ ...c, paquetesOverrides: (c.paquetesOverrides || []).filter(o => o.id !== id) })));
  };

  // ── Categorías ────────────────────────────────────────────────
  const addCategoria = () => {
    const nCat = { id: uid(), nombre: "Nueva categoría", creadoEn: hoy(), servicios: [] };
    setCatalogoServicios(prev => [...prev, nCat]);
    setExpandedCats(prev => new Set([...prev, nCat.id]));
    setEditingCatName(nCat.id);
  };
  const renameCategoria = (catId, nombre) => {
    setCatalogoServicios(prev => prev.map(c => c.id === catId ? { ...c, nombre } : c));
  };
  const delCategoria = (catId) => {
    const svIds = (catalogoServicios.find(c => c.id === catId)?.servicios || []).map(s => s.id);
    setCatalogoServicios(prev => prev.filter(c => c.id !== catId));
    if (svIds.length) setClients(prev => prev.map(c => ({ ...c, servicios: (c.servicios || []).filter(s => !svIds.includes(s.id)) })));
  };

  // ── Servicios dentro de categoría ────────────────────────────
  const addServicio = (catId) => {
    const nv = { id: uid(), name: "Nuevo servicio", min: 500, max: 1000, creadoEn: hoy() };
    setCatalogoServicios(prev => prev.map(c => c.id === catId ? { ...c, servicios: [...c.servicios, nv] } : c));
    setClients(prev => prev.map(c => ({ ...c, servicios: [...(c.servicios || []), { ...nv }] })));
  };
  const updServicio = (catId, svId, field, val) => {
    const parsed = (field === "name" || field === "descripcion") ? val : +val;
    setCatalogoServicios(prev => prev.map(c =>
      c.id === catId
        ? { ...c, servicios: c.servicios.map(s => s.id === svId ? { ...s, [field]: parsed } : s) }
        : c
    ));
    setClients(prev => prev.map(c => ({
      ...c,
      servicios: (c.servicios || []).map(s => s.id === svId ? { ...s, [field]: parsed } : s),
    })));
  };
  const delServicio = (catId, svId) => {
    setCatalogoServicios(prev => prev.map(c =>
      c.id === catId ? { ...c, servicios: c.servicios.filter(s => s.id !== svId) } : c
    ));
    setClients(prev => prev.map(c => ({ ...c, servicios: (c.servicios || []).filter(s => s.id !== svId) })));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start" }}>

      {/* ── Catálogo global paquetes ── */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: NAVY }}>Paquetes Contrato — Catálogo global</span>
          <Badge color="#fff" bg={ACCENT}>Se propaga a todos los clientes</Badge>
        </div>
        {editPkgGlobal ? (
          <EditPaqueteGlobal pkg={editPkgGlobal} catalogoServicios={flatServicios} categorias={catalogoServicios} onSave={savePkgGlobal} onCancel={() => setEditPkgGlobal(null)} />
        ) : (
          <Ghost style={{ padding: "8px 10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 80px 70px 80px auto auto", gap: "6px 10px", alignItems: "center", paddingBottom: 6, borderBottom: "1px solid rgba(10,43,73,0.08)", marginBottom: 6 }}>
              <CH></CH><CH>Nombre</CH><CH align="center">€/mes</CH><CH align="center">Mín.</CH><CH align="center">Alta</CH><CH align="center">Servicios</CH><CH align="right">Acciones</CH>
            </div>
            {catalogoPaquetes.map(p => (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr 80px 70px 80px auto auto", gap: "6px 10px", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(10,43,73,0.08)" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color || ACCENT }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: NAVY }}>{p.name}</span>
                <span style={{ fontSize: 13, textAlign: "center", fontWeight: 600, color: NAVY }}>{fmtI(p.price)} €</span>
                <span style={{ fontSize: 13, textAlign: "center", color: "rgba(10,43,73,0.6)" }}>{p.minMonths}m</span>
                <span style={{ fontSize: 11, textAlign: "center", color: "rgba(10,43,73,0.55)" }}>{fmtDate(p.creadoEn)}</span>
                <span style={{ textAlign: "center" }}>
                  {(p.subServicios || []).length > 0
                    ? <Badge>{p.subServicios.length} incl.</Badge>
                    : <span style={{ color: "rgba(10,43,73,0.4)", fontSize: 12 }}>—</span>}
                </span>
                <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                  <Btn variant="ghost" size="sm" onClick={() => setEditPkgGlobal(p)}>Editar</Btn>
                  <ConfirmBtn size="sm" onConfirm={() => delPkgGlobal(p.id)} msg="¿Borrar paquete?" />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 10 }}>
              <Btn variant="ghost" size="sm" style={{ border: "1px dashed rgba(10,43,73,0.25)", color: "rgba(10,43,73,0.6)" }}
                onClick={() => setEditPkgGlobal({ id: uid(), name: "Nuevo paquete", price: 800, minMonths: 3, color: ACCENT, subServicios: [], creadoEn: hoy(), _isNew: true })}>
                + Nuevo paquete al catálogo
              </Btn>
            </div>
          </Ghost>
        )}
      </Card>

      {/* ── Catálogo global servicios con categorías ── */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: NAVY }}>Servicios Agencia — Catálogo global</span>
            <Badge color="#fff" bg={ACCENT}>Se propaga a todos los clientes</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "rgba(10,43,73,0.45)" }}>
              {catalogoServicios.length} categorías · {flatServicios.length} servicios
            </span>
            <Btn variant="primary" size="sm" onClick={addCategoria}>+ Categoría</Btn>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {catalogoServicios.map((cat, catIdx) => {
            const open = expandedCats.has(cat.id);
            const isRenamingThis = editingCatName === cat.id;
            return (
              <div key={cat.id} style={{
                border: "1px solid rgba(10,43,73,0.10)",
                borderRadius: 10, overflow: "hidden",
              }}>
                {/* Cabecera de categoría */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 14px",
                  background: open ? CLOUD : "#ffffff",
                  borderBottom: open ? "1px solid rgba(10,43,73,0.08)" : "none",
                  cursor: "pointer",
                }} onClick={() => !isRenamingThis && toggleCat(cat.id)}>
                  {/* Número de orden */}
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,43,73,0.35)", minWidth: 18 }}>
                    {String(catIdx + 1).padStart(2, "0")}
                  </span>

                  {/* Nombre editable */}
                  {isRenamingThis ? (
                    <input
                      autoFocus
                      value={cat.nombre}
                      onChange={e => renameCategoria(cat.id, e.target.value)}
                      onBlur={() => setEditingCatName(null)}
                      onKeyDown={e => e.key === "Enter" && setEditingCatName(null)}
                      onClick={e => e.stopPropagation()}
                      style={{ ...css.inp, fontSize: 13, fontWeight: 600, height: 30, flex: 1 }}
                    />
                  ) : (
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: NAVY, flex: 1 }}
                      onDoubleClick={e => { e.stopPropagation(); setEditingCatName(cat.id); }}
                      title="Doble clic para renombrar"
                    >
                      {cat.nombre}
                    </span>
                  )}

                  {/* Conteo */}
                  <span style={{ fontSize: 11, color: "rgba(10,43,73,0.45)", whiteSpace: "nowrap" }}>
                    {cat.servicios.length} servicio{cat.servicios.length !== 1 ? "s" : ""}
                  </span>

                  {/* Acciones de categoría */}
                  <div style={{ display: "flex", gap: 4 }} onClick={e => e.stopPropagation()}>
                    <Btn variant="ghost" size="sm" onClick={() => setEditingCatName(cat.id)}>✎</Btn>
                    <ConfirmBtn size="sm" onConfirm={() => delCategoria(cat.id)} msg="¿Borrar categoría?" />
                  </div>

                  <span style={{ fontSize: 12, color: "rgba(10,43,73,0.35)" }}>{open ? "▲" : "▼"}</span>
                </div>

                {/* Servicios de la categoría */}
                {open && (
                  <div style={{ padding: "10px 14px" }}>
                    {cat.servicios.length > 0 ? (
                      <>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px auto", gap: "6px 10px", alignItems: "center", paddingBottom: 6, borderBottom: "1px solid rgba(10,43,73,0.08)", marginBottom: 6 }}>
                          <CH>Nombre del servicio</CH><CH align="center">Mín. €</CH><CH align="center">Máx. €</CH><CH align="center">Alta</CH><CH></CH>
                        </div>
                        {cat.servicios.map(sv => {
                          const descOpen = expandedDesc.has(sv.id);
                          const hasDesc  = !!(sv.descripcion || "").trim();
                          return (
                            <div key={sv.id} style={{ borderBottom: "1px solid rgba(10,43,73,0.06)", paddingBottom: descOpen ? 8 : 0 }}>
                              {/* Fila principal */}
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px auto auto", gap: "4px 8px", alignItems: "center", padding: "5px 0" }}>
                                <input
                                  value={sv.name}
                                  onChange={e => updServicio(cat.id, sv.id, "name", e.target.value)}
                                  style={{ ...css.inp, fontSize: 12, padding: "4px 8px", height: 32 }}
                                />
                                <input
                                  type="number" value={sv.min}
                                  onChange={e => updServicio(cat.id, sv.id, "min", e.target.value)}
                                  style={{ ...css.inp, fontSize: 12, padding: "4px 6px", textAlign: "center", height: 32 }}
                                />
                                <input
                                  type="number" value={sv.max}
                                  onChange={e => updServicio(cat.id, sv.id, "max", e.target.value)}
                                  style={{ ...css.inp, fontSize: 12, padding: "4px 6px", textAlign: "center", height: 32 }}
                                />
                                <span style={{ fontSize: 11, color: "rgba(10,43,73,0.50)", textAlign: "center" }}>
                                  {fmtDate(sv.creadoEn)}
                                </span>
                                {/* Toggle descripción */}
                                <button
                                  onClick={() => toggleDesc(sv.id)}
                                  title={descOpen ? "Cerrar descripción" : "Añadir/ver descripción"}
                                  style={{
                                    border: `1px solid ${hasDesc ? "rgba(255,140,34,0.40)" : "rgba(10,43,73,0.18)"}`,
                                    background: descOpen ? CLOUD : "transparent",
                                    borderRadius: 6, cursor: "pointer", padding: "0 7px", height: 30,
                                    fontSize: 13, color: hasDesc ? ACCENT : "rgba(10,43,73,0.40)",
                                  }}>
                                  {descOpen ? "▲" : "▸"}
                                </button>
                                <ConfirmBtn size="sm" onConfirm={() => delServicio(cat.id, sv.id)} msg="¿Borrar?" />
                              </div>
                              {/* Descripción expandible */}
                              {descOpen && (
                                <div style={{ paddingLeft: 4, paddingRight: 4, marginTop: 4 }}>
                                  <textarea
                                    rows={3}
                                    placeholder="Describe brevemente qué abarca este servicio (visible en la propuesta PDF)…"
                                    value={sv.descripcion || ""}
                                    onChange={e => updServicio(cat.id, sv.id, "descripcion", e.target.value)}
                                    style={{
                                      ...css.inp, width: "100%", height: "auto", resize: "vertical",
                                      fontSize: 12, padding: "6px 8px", lineHeight: 1.5,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div style={{ fontSize: 12, color: "rgba(10,43,73,0.4)", fontStyle: "italic", marginBottom: 8 }}>
                        Sin servicios en esta categoría aún.
                      </div>
                    )}
                    <div style={{ marginTop: 10 }}>
                      <Btn
                        variant="ghost" size="sm"
                        style={{ border: "1px dashed rgba(10,43,73,0.25)", color: "rgba(10,43,73,0.6)" }}
                        onClick={() => addServicio(cat.id)}
                      >
                        + Añadir servicio a "{cat.nombre}"
                      </Btn>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {catalogoServicios.length === 0 && (
          <div style={{ fontSize: 13, color: "rgba(10,43,73,0.45)", fontStyle: "italic", textAlign: "center", padding: "16px 0" }}>
            Sin categorías. Usa "+ Categoría" para empezar.
          </div>
        )}
      </Card>
    </div>
  );
}
