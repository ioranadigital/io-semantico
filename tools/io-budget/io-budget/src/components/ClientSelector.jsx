import { css } from "../data/constants.js";
import { Ghost, TipoBadge, EstadoBadge, DateTag } from "./ui.jsx";

export default function ClientSelector({ clients, activeId, onChange, filter }) {
  const visible = clients.filter(c => c.id !== "global" && (c.tipo === filter || c.tipo === "ambos" || !filter));
  const cl = visible.find(c => c.id === activeId) || visible[0];
  const isInactivo = cl && (cl.estado || "activo") === "inactivo";

  const selectColor = isInactivo ? "#d85a30" : "#1D9E75";

  return (
    <Ghost style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap" }}>Cliente activo</span>
      <select
        value={cl?.id || ""}
        onChange={e => onChange(e.target.value)}
        style={{
          ...css.inp,
          flex: 1,
          borderColor: selectColor,
          borderWidth: 2,
          color: selectColor,
          fontWeight: 600
        }}
      >
        {visible.map(c => {
          const inactivo = (c.estado || "activo") === "inactivo";
          return (
            <option key={c.id} value={c.id} style={{ color: inactivo ? "rgba(10,43,73,0.4)" : "#0a2b49" }}>
              {inactivo ? "○" : "●"} {c.name}{inactivo ? " (inactivo)" : ""}
            </option>
          );
        })}
      </select>
      {cl && <TipoBadge tipo={cl.tipo} />}
      {cl && <EstadoBadge estado={cl.estado} fechaInicio={cl.creadoEn} fechaFin={cl.fechaFin} />}
    </Ghost>
  );
}
