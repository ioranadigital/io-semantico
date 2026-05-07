import { Card, CH, TipoBadge, EstadoBadge, DateTag } from "./ui.jsx";
import "./CarteraClientes.css";

export default function CarteraClientes({ clients }) {
  const listed = clients.filter(c => c.id !== "global");

  if (listed.length === 0) {
    return (
      <div className="cartera-clientes-wrapper">
        <Card>
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "rgba(10,43,73,0.5)" }}>
              No hay clientes registrados aún.
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="cartera-clientes-wrapper">
      <Card>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#0a2b49" }}>CARTERA DE CLIENTES</div>

        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 80px 80px 90px 120px 100px 150px 100px 100px auto", gap: "6px 12px", alignItems: "center", paddingBottom: 8, borderBottom: "1px solid rgba(10,43,73,0.08)", marginBottom: 4, minWidth: "1200px" }}>
            <CH>Nombre</CH>
            <CH>Tipo</CH>
            <CH>Alta</CH>
            <CH>Estado</CH>
            <CH>Email</CH>
            <CH>Teléfono</CH>
            <CH>Sector</CH>
            <CH>Contacto</CH>
            <CH>Cargo</CH>
          </div>

          {listed.map(c => (
            <div key={c.id} style={{
              display: "grid", gridTemplateColumns: "1.5fr 80px 80px 90px 120px 100px 150px 100px 100px auto",
              gap: "6px 12px", alignItems: "center",
              padding: "8px 0", borderBottom: "1px solid rgba(10,43,73,0.06)",
              opacity: (c.estado || "activo") === "inactivo" ? 0.6 : 1,
              minWidth: "1200px"
            }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#0a2b49", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
              <TipoBadge tipo={c.tipo} />
              <DateTag date={c.creadoEn} />
              <EstadoBadge estado={c.estado} fechaInicio={c.creadoEn} fechaFin={c.fechaFin} />
              <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.email || "—"}</span>
              <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap" }}>{c.telefono || "—"}</span>
              <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.sector || "—"}</span>
              <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.nombreContacto ? `${c.nombreContacto} ${c.apellidosContacto || ""}`.trim() : "—"}</span>
              <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.cargo || "—"}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: "rgba(10,43,73,0.45)", paddingTop: 8, borderTop: "1px solid rgba(10,43,73,0.08)" }}>
          <strong>{listed.filter(c => (c.estado || "activo") === "activo").length}</strong> activos
          · <strong>{listed.filter(c => (c.estado || "activo") === "inactivo").length}</strong> inactivos
        </div>
      </Card>
    </div>
  );
}
