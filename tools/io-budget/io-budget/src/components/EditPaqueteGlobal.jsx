import { useState, Fragment } from "react";
import { ACCENT, fmt, fmtI, fmtDate, COLORS, css } from "../data/constants.js";
import { Ghost, SL, Divider, CH, DateTag, Btn } from "./ui.jsx";

export default function EditPaqueteGlobal({ pkg, catalogoServicios, categorias, onSave, onCancel }) {
  const [data, setData] = useState({ ...pkg, subServicios: (pkg.subServicios || []).map(s => ({ ...s })) });
  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));

  const toggleSub = (id) => {
    if (data.subServicios.find(s => s.id === id))
      setData(p => ({ ...p, subServicios: p.subServicios.filter(s => s.id !== id) }));
    else
      setData(p => ({ ...p, subServicios: [...p.subServicios, { id, ratio: 0.5, qty: 1 }] }));
  };
  const updSub = (id, k, v) => setData(p => ({ ...p, subServicios: p.subServicios.map(s => s.id === id ? { ...s, [k]: v } : s) }));

  const subTot = data.subServicios.reduce((a, sub) => {
    const sv = catalogoServicios.find(x => x.id === sub.id); if (!sv) return a;
    return a + (sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5)) * (sub.qty || 1);
  }, 0);

  return (
    <Ghost style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 70px", gap: 8, alignItems: "end" }}>
        <div><SL>Nombre</SL><input value={data.name} onChange={e => upd("name", e.target.value)} style={{ ...css.inp, width: "100%" }} /></div>
        <div><SL>€/mes</SL><input type="number" value={data.price} onChange={e => upd("price", +e.target.value)} style={{ ...css.inp, width: "100%" }} /></div>
        <div><SL>Mín. m.</SL><input type="number" min={1} max={24} value={data.minMonths} onChange={e => upd("minMonths", +e.target.value)} style={{ ...css.inp, width: "100%" }} /></div>
      </div>
      <div>
        <SL>Color</SL>
        <div style={{ display: "flex", gap: 6 }}>
          {COLORS.map(c => (
            <button key={c} onClick={() => upd("color", c)} style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: c,
              border: data.color === c ? `3px solid #0a2b49` : "2px solid transparent",
              cursor: "pointer",
            }} />
          ))}
        </div>
      </div>
      {data.creadoEn && <DateTag date={data.creadoEn} prefix="Creado el " />}
      <Divider />
      <SL>Servicios agencia incluidos por defecto</SL>
      <Ghost style={{ padding: "8px 10px", background: "#ffffff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto 60px 60px", gap: "6px 10px", alignItems: "center", paddingBottom: 6, borderBottom: "1px solid rgba(10,43,73,0.08)", marginBottom: 6 }}>
          <CH></CH><CH>Servicio</CH><CH align="center">Precio base</CH><CH align="center">Cant.</CH><CH align="right">Total</CH>
        </div>
        {(categorias || []).map((cat, catIdx) => (
          <Fragment key={cat.id}>
            <div style={{ gridColumn: "1/-1", paddingTop: catIdx > 0 ? 10 : 0, paddingBottom: 4, borderTop: catIdx > 0 ? "1px solid rgba(10,43,73,0.06)" : "none" }}>
              <span style={{
                display: "inline-block",
                padding: "8px 12px",
                background: "rgba(255,140,34,0.15)",
                border: "1px solid rgba(255,140,34,0.35)",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                color: "#0a2b49",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>
                {String(catIdx + 1).padStart(2, "0")} {cat.nombre}
              </span>
            </div>
            {cat.servicios.map(sv => {
              const sub = data.subServicios.find(s => s.id === sv.id);
              const active = !!sub;
              const ratio = sub?.ratio ?? 0.5;
              const qty = sub?.qty ?? 1;
              const val = sv.min + (sv.max - sv.min) * ratio;
              return (
                <div key={sv.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto 60px 60px", gap: "4px 10px", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(10,43,73,0.08)" }}>
                  <input type="checkbox" checked={active} onChange={() => toggleSub(sv.id)} style={{ width: 14, height: 14, cursor: "pointer" }} />
                  <div>
                    <span style={{ fontSize: 13, color: active ? "#0a2b49" : "rgba(10,43,73,0.5)", fontWeight: active ? 500 : 400 }}>{sv.name}</span>
                    {sv.creadoEn && <div style={{ marginTop: 2 }}><DateTag date={sv.creadoEn} /></div>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {sv.min !== sv.max && <input type="range" min={0} max={1} step={0.01} value={ratio} disabled={!active} onChange={e => updSub(sv.id, "ratio", +e.target.value)} style={{ width: 60, opacity: active ? 1 : 0.3 }} />}
                    <span style={{ fontSize: 11, color: ACCENT, minWidth: 42, textAlign: "right" }}>{active ? `${fmtI(val)}€` : "—"}</span>
                  </div>
                  <input type="number" min={1} max={99} value={qty} disabled={!active} onChange={e => updSub(sv.id, "qty", +e.target.value)} style={{ ...css.inp, width: "100%", fontSize: 12, padding: "3px 6px", height: 30, opacity: active ? 1 : 0.3, textAlign: "center" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, textAlign: "right", color: active ? ACCENT : "rgba(10,43,73,0.4)" }}>{active ? `${fmtI(val * qty)}€` : "—"}</span>
                </div>
              );
            })}
          </Fragment>
        ))}
        {data.subServicios.length > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center", marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(10,43,73,0.08)" }}>
            <span style={{ fontSize: 13, color: "rgba(10,43,73,0.6)" }}>Total base</span>
            <span style={{ fontWeight: 600, fontSize: 15, color: ACCENT }}>{fmt(subTot)} €</span>
          </div>
        )}
      </Ghost>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Btn variant="ghost" onClick={onCancel}>Cancelar</Btn>
        <Btn variant="primary" onClick={() => onSave(data)}>Guardar en catálogo</Btn>
      </div>
    </Ghost>
  );
}
