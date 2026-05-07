import { useState } from "react";
import { ACCENT, fmt, fmtI, COLORS, css } from "../data/constants.js";
import { Ghost, SL, Divider, CH, Btn } from "./ui.jsx";

export default function EditPaquete({ pkg, servicios, onSave, onCancel }) {
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
    const sv = servicios.find(x => x.id === sub.id); if (!sv) return a;
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
            <button key={c} onClick={() => upd("color", c)} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: data.color === c ? "3px solid var(--color-text-primary)" : "2px solid transparent", cursor: "pointer" }} />
          ))}
        </div>
      </div>
      <Divider />
      <SL>Servicios incluidos en el paquete</SL>
      <Ghost style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto 60px 60px", gap: "6px 10px", alignItems: "center", paddingBottom: 6, borderBottom: "0.5px solid var(--color-border-tertiary)", marginBottom: 6 }}>
          <CH></CH><CH>Servicio</CH><CH align="center">Precio</CH><CH align="center">Cant.</CH><CH align="right">Total</CH>
        </div>
        {servicios.map(sv => {
          const sub = data.subServicios.find(s => s.id === sv.id);
          const active = !!sub;
          const ratio = sub?.ratio ?? 0.5;
          const qty = sub?.qty ?? 1;
          const val = sv.min + (sv.max - sv.min) * ratio;
          return (
            <div key={sv.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto 60px 60px", gap: "4px 10px", alignItems: "center", padding: "6px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
              <input type="checkbox" checked={active} onChange={() => toggleSub(sv.id)} style={{ accentColor: ACCENT, width: 14, height: 14, cursor: "pointer" }} />
              <span style={{ fontSize: 13, color: active ? "var(--color-text-primary)" : "var(--color-text-tertiary)" }}>{sv.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                {sv.min !== sv.max && <input type="range" min={0} max={1} step={0.01} value={ratio} disabled={!active} onChange={e => updSub(sv.id, "ratio", +e.target.value)} style={{ width: 60, opacity: active ? 1 : 0.3 }} />}
                <span style={{ fontSize: 11, color: ACCENT, minWidth: 40, textAlign: "right" }}>{active ? `${fmtI(val)}€` : "—"}</span>
              </div>
              <input type="number" min={1} max={99} value={qty} disabled={!active} onChange={e => updSub(sv.id, "qty", +e.target.value)} style={{ ...css.inp, width: "100%", fontSize: 12, padding: "3px 6px", opacity: active ? 1 : 0.3, textAlign: "center" }} />
              <span style={{ fontSize: 12, fontWeight: 500, textAlign: "right", color: active ? ACCENT : "var(--color-text-tertiary)" }}>{active ? `${fmtI(val * qty)}€` : "—"}</span>
            </div>
          );
        })}
        {data.subServicios.length > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center", marginTop: 8, paddingTop: 8, borderTop: "0.5px solid var(--color-border-tertiary)" }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Total incluido</span>
            <span style={{ fontWeight: 500, fontSize: 15, color: ACCENT }}>{fmt(subTot)} €</span>
          </div>
        )}
      </Ghost>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Btn variant="ghost" onClick={onCancel}>Cancelar</Btn>
        <Btn variant="primary" onClick={() => onSave(data)}>Guardar paquete</Btn>
      </div>
    </Ghost>
  );
}
