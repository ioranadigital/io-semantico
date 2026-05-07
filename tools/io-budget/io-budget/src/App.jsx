import { useState } from "react";
import { ACCENT, hoy } from "./data/constants.js";
import { DEMO_CLIENTS, DEF_PAQUETES_GLOBAL, DEF_CATEGORIAS_SERVICIOS, flattenServicios } from "./data/defaults.js";
import { useStorage, useRecords } from "./hooks/useStorage.js";
import ClientSelector from "./components/ClientSelector.jsx";
import ClienteUnificado from "./components/ClienteUnificado.jsx";
import Resultados from "./components/Resultados.jsx";
import ConfigurarCliente from "./components/ConfigurarCliente.jsx";
import CarteraClientes from "./components/CarteraClientes.jsx";
import ConfiguracionGlobal from "./components/ConfiguracionGlobal.jsx";
import "./App.css";

const TABS = [
  { id: "clientes",   label: "👥 Clientes" },
  { id: "resultados", label: "📊 Resultados" },
  { id: "config",     label: "👤 Nuevo Cliente" },
  { id: "cartera",    label: "📋 Cartera de Clientes" },
  { id: "global",     label: "⚙ Configuración Global" },
];

export default function App() {
  const [tab, setTab] = useState("clientes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clients, setClients] = useStorage("iorana_clients_v7", DEMO_CLIENTS);
  const [catalogoPaquetes, setCatalogoPaquetes] = useStorage("iorana_pkgs_v8", DEF_PAQUETES_GLOBAL);
  const [catalogoServicios, setCatalogoServicios] = useStorage("iorana_servs_v8", DEF_CATEGORIAS_SERVICIOS);
  const flatServicios = flattenServicios(catalogoServicios);
  const [activeCliente, setActiveCliente] = useState("retailmax");
  const { records, add, del } = useRecords();

  const globalClient = clients.find(c => c.id === "global") || clients[0];
  const clActivo = clients.find(c => c.id === activeCliente) || clients.find(c => c.tipo === "contrato" || c.tipo === "horas" || c.tipo === "ambos") || globalClient;

  const finalizarCliente = (id, fecha) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, estado: "inactivo", fechaFin: fecha } : c));
  };
  const reactivarCliente = (id) => {
    setClients(prev => prev.map(c => {
      if (c.id !== id) return c;
      const periodosCerrado = [...(c.periodos || []), { inicio: c.creadoEn, fin: c.fechaFin || hoy() }];
      return { ...c, estado: "activo", creadoEn: hoy(), fechaFin: null, periodos: periodosCerrado };
    }));
  };
  const eliminarCliente = (id) => {
    const remaining = clients.filter(c => c.id !== id);
    setClients(remaining);
    if (activeCliente === id) {
      const next = remaining.find(c => c.id !== "global" && (c.tipo === "contrato" || c.tipo === "horas" || c.tipo === "ambos"));
      setActiveCliente(next?.id || "global");
    }
  };

  const handleTabChange = (id) => {
    setTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <div className={`app-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="app-sidebar-header">
          <div className="app-sidebar-brand">iorana.digital</div>
          <div className="app-sidebar-title">Calculadora</div>
        </div>
        <nav className="app-sidebar-nav">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`app-sidebar-nav-item ${tab === t.id ? "active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="app-main">
        <div className="app-content">
          <div className="app-header-wrapper">
            <div className="app-header">
              <div className="app-header-brand">iorana.digital</div>
              <div className="app-header-title">Calculadora de presupuestos</div>
              <div className="app-header-subtitle">Gestión de contratos, horas y proyección de ingresos</div>
            </div>
            {tab === "clientes" && (
              <div className="app-client-selector">
                <ClientSelector clients={clients} activeId={activeCliente} onChange={setActiveCliente} />
              </div>
            )}
          </div>

          {tab === "clientes" && (
            <div className="app-cliente-container">
              <ClienteUnificado
                key={clActivo.id}
                client={clActivo}
                globalClient={globalClient}
                setClients={setClients}
                catalogoPaquetes={catalogoPaquetes}
                catalogoServicios={catalogoServicios}
                flatServicios={flatServicios}
                onAddRecord={add}
                onFinalizar={finalizarCliente}
                onReactivar={reactivarCliente}
                onDelete={eliminarCliente}
                records={records}
                onDel={del}
              />
            </div>
          )}
          {tab === "resultados" && <Resultados records={records} clients={clients} onDel={del} />}
          {tab === "config" && (
            <ConfigurarCliente clients={clients} setClients={setClients} catalogoPaquetes={catalogoPaquetes} />
          )}
          {tab === "cartera" && (
            <CarteraClientes clients={clients} />
          )}
          {tab === "global" && (
            <ConfiguracionGlobal
              catalogoPaquetes={catalogoPaquetes}
              setCatalogoPaquetes={setCatalogoPaquetes}
              catalogoServicios={catalogoServicios}
              flatServicios={flatServicios}
              setCatalogoServicios={setCatalogoServicios}
              setClients={setClients}
            />
          )}

          <div style={{ marginTop: "2rem", padding: "12px 16px", borderTop: "1px solid rgba(10,43,73,0.08)", fontSize: 11, color: "rgba(10,43,73,0.45)", lineHeight: 1.8 }}>
            Precios sin IVA salvo indicación expresa · Descuentos por tramo no acumulables entre sí · Validez del presupuesto: 30 días · IVA: 21%
          </div>
        </div>
      </div>
    </div>
  );
}
