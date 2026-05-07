import { useState } from "react";
import ClienteGlobal from "./ClienteGlobal.jsx";
import ClienteContrato from "./ClienteContrato.jsx";
import ClienteHoras from "./ClienteHoras.jsx";
import ClienteContratoServicios from "./ClienteContratoServicios.jsx";
import ClienteNuevoPaquete from "./ClienteNuevoPaquete.jsx";
import ClientePropuestas from "./ClientePropuestas.jsx";
import ClienteHistorial from "./ClienteHistorial.jsx";
import "./tabs.css";

const L2_PAQUETES = [
  { id: "contrato",     label: "📦 Contrato" },
  { id: "nuevopaquete", label: "➕ Nuevo Paquete" },
];

const L2_HORAS = [
  { id: "contrato",      label: "⏱ Contrato" },
  { id: "nuevopaquete",  label: "➕ Nuevo Paquete" },
];

function L2Tabs({ tabs, active, onChange }) {
  return (
    <div className="btabs-l2-wrap">
      <div className="btabs-l2-bar">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`btab-l2${active === t.id ? " active" : ""}`}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ClienteUnificado({
  client,
  globalClient,
  setClients,
  catalogoPaquetes,
  catalogoServicios,
  flatServicios,
  onAddRecord,
  onFinalizar,
  onReactivar,
  onDelete,
  records = [],
  onDel,
}) {
  const [subTab, setSubTab]   = useState("global");
  const [pkgL2, setPkgL2]     = useState("contrato");
  const [horasL2, setHorasL2] = useState("contrato");

  const L1_TABS = [
    { id: "global",     label: "🌐 Global" },
    { id: "paquetes",   label: "📦 Contrato Paquetes" },
    { id: "horas",      label: "⏱ Contrato Horas" },
    { id: "propuestas", label: "📄 Propuestas" },
    { id: "historial",  label: "📋 Historial" },
  ];

  return (
    <div className="btabs-l1">
      <div className="btabs-l1-bar">
        {L1_TABS.map(t => (
          <button
            key={t.id}
            className={`btab-l1${subTab === t.id ? " active" : ""}`}
            onClick={() => setSubTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="btabs-l1-content">

        {/* ── Global ── */}
        {subTab === "global" && (
          <ClienteGlobal
            key={client.id + "-global"}
            client={client}
            globalClient={globalClient}
            catalogoPaquetes={catalogoPaquetes}
            records={records}
          />
        )}

        {/* ── Contrato Paquetes ── */}
        {subTab === "paquetes" && (
          <>
            <L2Tabs tabs={L2_PAQUETES} active={pkgL2} onChange={setPkgL2} />
            <div className="btabs-l2-content">
              {pkgL2 === "contrato" && (
                <ClienteContrato
                  key={client.id + "-contrato"}
                  client={client}
                  globalClient={globalClient}
                  setClients={setClients}
                  catalogoPaquetes={catalogoPaquetes}
                  catalogoServicios={flatServicios}
                  catalogoServiciosCategorizado={catalogoServicios}
                  onAddRecord={onAddRecord}
                  onFinalizar={onFinalizar}
                  onReactivar={onReactivar}
                  onDelete={onDelete}
                  records={records}
                  onDel={onDel}
                />
              )}
              {pkgL2 === "nuevopaquete" && (
                <ClienteContratoServicios
                  key={client.id + "-nuevopaquete"}
                  client={client}
                  globalClient={globalClient}
                  setClients={setClients}
                  catalogoPaquetes={catalogoPaquetes}
                  catalogoServicios={flatServicios}
                  catalogoServiciosCategorizado={catalogoServicios}
                  onAddRecord={onAddRecord}
                />
              )}
            </div>
          </>
        )}

        {/* ── Contrato Horas ── */}
        {subTab === "horas" && (
          <>
            <L2Tabs tabs={L2_HORAS} active={horasL2} onChange={setHorasL2} />
            <div className="btabs-l2-content">
              {horasL2 === "contrato" && (
                <ClienteHoras
                  key={client.id + "-horas"}
                  client={client}
                  globalClient={globalClient}
                  setClients={setClients}
                  catalogoServicios={flatServicios}
                  onAddRecord={onAddRecord}
                  onFinalizar={onFinalizar}
                  onReactivar={onReactivar}
                  onDelete={onDelete}
                />
              )}
              {horasL2 === "nuevopaquete" && (
                <ClienteNuevoPaquete
                  key={client.id + "-nuevopaquete"}
                  client={client}
                  globalClient={globalClient}
                  setClients={setClients}
                  catalogoServicios={flatServicios}
                  catalogoServiciosCategorizado={catalogoServicios}
                />
              )}
            </div>
          </>
        )}

        {/* ── Propuestas ── */}
        {subTab === "propuestas" && (
          <ClientePropuestas
            key={client.id + "-propuestas"}
            client={client}
            globalClient={globalClient}
            setClients={setClients}
            catalogoPaquetes={catalogoPaquetes}
            catalogoServicios={flatServicios}
            onAddRecord={onAddRecord}
          />
        )}

        {/* ── Historial ── */}
        {subTab === "historial" && (
          <ClienteHistorial
            key={client.id + "-historial"}
            client={client}
            records={records}
            onDel={onDel}
          />
        )}

      </div>
    </div>
  );
}
