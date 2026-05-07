import { useState } from "react";
import { ACCENT, fmt, fmtI, hoy, uid, css } from "../data/constants.js";
import { DEF_TRAMOS, mkClient } from "../data/defaults.js";
import { Card, Ghost, SL, CH, Badge, Btn, TipoBadge, EstadoBadge, DateTag } from "./ui.jsx";
import "./ConfigurarCliente.css";

export default function ConfigurarCliente({ clients, setClients, catalogoPaquetes = [] }) {
  // Identificación
  const [newName,   setNewName]   = useState("");
  const [newApellidos, setNewApellidos] = useState("");
  const [newRazonSocial, setNewRazonSocial] = useState("");
  const [newNif, setNewNif] = useState("");
  // Datos Operativos
  const [newNombreContacto, setNewNombreContacto] = useState("");
  const [newApellidosContacto, setNewApellidosContacto] = useState("");
  const [newContactoEsEmpresa, setNewContactoEsEmpresa] = useState(false);
  // Contacto
  const [newEmail, setNewEmail] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  // Ubicación
  const [newDireccion, setNewDireccion] = useState("");
  const [newCiudad, setNewCiudad] = useState("");
  const [newPais, setNewPais] = useState("España");
  // Datos B2B
  const [newCargo, setNewCargo] = useState("");
  const [newWeb, setNewWeb] = useState("");
  // Tipo y config
  const [newTipo, setNewTipo] = useState("contrato");
  const [newDate, setNewDate] = useState(hoy());
  const [newTarifa, setNewTarifa] = useState(40);
  // Marketing
  const [newOrigen, setNewOrigen] = useState("");
  const [newSector, setNewSector] = useState("");
  const [newRangoEdad, setNewRangoEdad] = useState("");
  // Financiero
  const [newIban, setNewIban] = useState("");
  const [newCondicionesPago, setNewCondicionesPago] = useState("30");
  const [mostrarMarketing, setMostrarMarketing] = useState(false);
  const [mostrarFinanciero, setMostrarFinanciero] = useState(false);
  // Paquetes
  const [selectedPaquetes, setSelectedPaquetes] = useState([]);
  const [flash, setFlash] = useState(null);

  const togglePaquete = (pkgId) => {
    setSelectedPaquetes(prev =>
      prev.includes(pkgId) ? prev.filter(id => id !== pkgId) : [...prev, pkgId]
    );
  };

  const totalPaquetesMensual = catalogoPaquetes
    .filter(p => selectedPaquetes.includes(p.id))
    .reduce((sum, p) => sum + (p.price || 0), 0);

  const addClient = () => {
    if (!newName.trim()) return;
    const nc = mkClient({
      name: newName.trim(),
      apellidos: newApellidos.trim(),
      razonSocial: newRazonSocial.trim(),
      nif: newNif.trim(),
      nombreContacto: newNombreContacto.trim(),
      apellidosContacto: newApellidosContacto.trim(),
      contactoEsEmpresa: newContactoEsEmpresa,
      email: newEmail.trim(),
      telefono: newTelefono.trim(),
      direccion: newDireccion.trim(),
      ciudad: newCiudad.trim(),
      pais: newPais || "España",
      cargo: newCargo.trim(),
      web: newWeb.trim(),
      tipo: newTipo,
      creadoEn: newDate,
      tarifaBase: newTarifa,
      origen: newOrigen,
      sector: newSector.trim(),
      rangoEdad: newRangoEdad,
      iban: newIban.trim(),
      condicionesPago: newCondicionesPago,
      estado: "activo",
      fechaFin: null,
      tramos: DEF_TRAMOS.map(t => ({ ...t, id: uid() })),
      paquetesActivos: selectedPaquetes.length > 0,
      paquetesOverrides: selectedPaquetes.length > 0
        ? catalogoPaquetes
            .filter(p => selectedPaquetes.includes(p.id))
            .map(p => ({ id: p.id, price: p.price, minMonths: p.minMonths, subServicios: [...(p.subServicios || [])] }))
        : [],
      servicios: [],
    });
    setClients(prev => [...prev, nc]);
    setFlash(nc.name);
    // Reset all fields
    setNewName("");
    setNewApellidos("");
    setNewRazonSocial("");
    setNewNif("");
    setNewNombreContacto("");
    setNewApellidosContacto("");
    setNewContactoEsEmpresa(false);
    setNewEmail("");
    setNewTelefono("");
    setNewDireccion("");
    setNewCiudad("");
    setNewPais("España");
    setNewCargo("");
    setNewWeb("");
    setNewTipo("contrato");
    setNewDate(hoy());
    setNewTarifa(40);
    setNewOrigen("");
    setNewSector("");
    setNewRangoEdad("");
    setNewIban("");
    setNewCondicionesPago("30");
    setSelectedPaquetes([]);
    setMostrarMarketing(false);
    setMostrarFinanciero(false);
    setTimeout(() => setFlash(null), 3500);
  };

  return (
    <div className="configurar-cliente-wrapper active-section">

      {/* ── Formulario de alta ── */}
      <div className="configurar-cliente-form">
      <Card>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#0a2b49" }}>DATOS DEL NUEVO CLIENTE</div>

        {flash && (
          <div style={{
            marginBottom: 12, padding: "10px 14px", borderRadius: 8,
            background: "rgba(255,140,34,0.12)", border: "1px solid rgba(255,140,34,0.30)",
            fontSize: 13, color: "#0a2b49", display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>✓</span>
            <strong>{flash}</strong> dado de alta correctamente — disponible en las pestañas Contrato / Horas.
          </div>
        )}

        <div className="configurar-cliente-grid">
          {/* BLOQUE 1: Datos Nuevo Cliente, Contacto, Ubicación, Datos Operativos */}
          <div className="configurar-cliente-bloque bloque-1">

          {/* Sección A: Identificación Básica */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#0a2b49", textTransform: "uppercase", letterSpacing: "0.05em" }}>Identificación Básica</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <SL>Nombre / Empresa *</SL>
                <input
                  placeholder="Ej. Empresa S.L."
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addClient()}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
              <div>
                <SL>Apellidos</SL>
                <input
                  placeholder="Ej. García López"
                  value={newApellidos}
                  onChange={e => setNewApellidos(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <SL>Razón Social</SL>
                <input
                  placeholder="Ej. Empresa S.L."
                  value={newRazonSocial}
                  onChange={e => setNewRazonSocial(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
              <div>
                <SL>NIF / CIF</SL>
                <input
                  placeholder="Ej. 12345678A"
                  value={newNif}
                  onChange={e => setNewNif(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Sección B: Información de Contacto */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#0a2b49", textTransform: "uppercase", letterSpacing: "0.05em" }}>Información de Contacto</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <SL>Email principal</SL>
                <input
                  type="email"
                  placeholder="contacto@empresa.com"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
              <div>
                <SL>Teléfono</SL>
                <input
                  type="tel"
                  placeholder="+34 600 123 456"
                  value={newTelefono}
                  onChange={e => setNewTelefono(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Sección C: Ubicación */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#0a2b49", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ubicación</div>
            <div style={{ marginBottom: 10 }}>
              <SL>Dirección postal</SL>
              <input
                placeholder="Ej. Calle Principal 123"
                value={newDireccion}
                onChange={e => setNewDireccion(e.target.value)}
                style={{ ...css.inp, width: "100%" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <SL>Ciudad</SL>
                <input
                  placeholder="Ej. Madrid"
                  value={newCiudad}
                  onChange={e => setNewCiudad(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
              <div>
                <SL>País</SL>
                <input
                  placeholder="España"
                  value={newPais}
                  onChange={e => setNewPais(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Sección D: Datos Operativos B2B */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#0a2b49", textTransform: "uppercase", letterSpacing: "0.05em" }}>Datos Operativos</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <SL>Nombre persona contacto</SL>
                <input
                  placeholder="Ej. Juan"
                  value={newNombreContacto}
                  onChange={e => setNewNombreContacto(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
              <div>
                <SL>Apellido persona contacto</SL>
                <input
                  placeholder="Ej. Pérez"
                  value={newApellidosContacto}
                  onChange={e => setNewApellidosContacto(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={newContactoEsEmpresa}
                onChange={e => setNewContactoEsEmpresa(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: 13, color: "#0a2b49" }}>Es el mismo que el nombre de empresa</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <SL>Cargo persona contacto</SL>
                <input
                  placeholder="Ej. Director de Marketing"
                  value={newCargo}
                  onChange={e => setNewCargo(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
              <div>
                <SL>Sitio web empresa</SL>
                <input
                  type="url"
                  placeholder="https://www.empresa.com"
                  value={newWeb}
                  onChange={e => setNewWeb(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
            </div>
          </div>
          </div>

          {/* BLOQUE 2: Tipo de Configuración, Paquetes, Personalización y Marketing */}
          <div className="configurar-cliente-bloque bloque-2">

          {/* Sección E: Tipo y Configuración */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#0a2b49", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tipo y Configuración</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: 10 }}>
              <div>
                <SL>Tipo de cliente</SL>
                <select value={newTipo} onChange={e => setNewTipo(e.target.value)} style={{ ...css.inp, width: "100%" }}>
                  <option value="contrato">Contrato mensual</option>
                  <option value="horas">Por horas</option>
                  <option value="ambos">Contrato + Horas</option>
                </select>
              </div>
              <div>
                <SL>Fecha de alta</SL>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ ...css.inp, width: "100%" }} />
              </div>
              <div>
                <SL>Tarifa €/h</SL>
                <input type="number" min={1} max={999} value={newTarifa} onChange={e => setNewTarifa(+e.target.value)} style={{ ...css.inp, width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Sección F: Paquetes de Productos */}
          {catalogoPaquetes.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#0a2b49", textTransform: "uppercase", letterSpacing: "0.05em" }}>Paquetes de Productos</div>
              <Ghost style={{ padding: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {catalogoPaquetes.map(pkg => (
                    <label
                      key={pkg.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: selectedPaquetes.includes(pkg.id)
                          ? `1px solid rgba(255,140,34,0.4)`
                          : "1px solid rgba(10,43,73,0.10)",
                        background: selectedPaquetes.includes(pkg.id)
                          ? "rgba(255,140,34,0.08)"
                          : "transparent",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPaquetes.includes(pkg.id)}
                        onChange={() => togglePaquete(pkg.id)}
                        style={{ marginRight: 10, marginTop: 2, cursor: "pointer" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0a2b49" }}>
                          {pkg.name}
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(10,43,73,0.55)", marginTop: 2 }}>
                          {pkg.subServicios?.length || 0} servicios incluidos
                        </div>
                      </div>
                      <div style={{ textAlign: "right", whiteSpace: "nowrap", marginLeft: 8 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#0a2b49" }}>
                          {fmt(pkg.price || 0)} €/mes
                        </div>
                        <div style={{ fontSize: 10, color: "rgba(10,43,73,0.55)" }}>
                          mín. {pkg.minMonths || 1}m
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {selectedPaquetes.length > 0 && (
                  <div style={{
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: "1px solid rgba(10,43,73,0.10)",
                    fontSize: 12,
                    color: "#0a2b49",
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span>{selectedPaquetes.length} paquete{selectedPaquetes.length !== 1 ? "s" : ""} seleccionado{selectedPaquetes.length !== 1 ? "s" : ""}</span>
                    <span style={{ color: ACCENT }}>Total: {fmt(totalPaquetesMensual)} €/mes</span>
                  </div>
                )}
              </Ghost>
            </div>
          )}

          {/* Sección G: Marketing (colapsable) */}
          <div>
            <button
              onClick={() => setMostrarMarketing(!mostrarMarketing)}
              style={{
                width: "100%",
                padding: "10px 0",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(10,43,73,0.08)",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(10,43,73,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Personalización y Marketing (opcional)
              <span style={{ fontSize: 14 }}>{mostrarMarketing ? "▲" : "▼"}</span>
            </button>
            {mostrarMarketing && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <div>
                  <SL>Origen del cliente</SL>
                  <select value={newOrigen} onChange={e => setNewOrigen(e.target.value)} style={{ ...css.inp, width: "100%" }}>
                    <option value="">Seleccionar...</option>
                    <option value="referido">Referido</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="web">Web / SEO</option>
                    <option value="rrss">Redes Sociales</option>
                    <option value="evento">Evento</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <SL>Rango de edad</SL>
                  <select value={newRangoEdad} onChange={e => setNewRangoEdad(e.target.value)} style={{ ...css.inp, width: "100%" }}>
                    <option value="">Seleccionar...</option>
                    <option value="18-25">18–25</option>
                    <option value="26-35">26–35</option>
                    <option value="36-45">36–45</option>
                    <option value="46-55">46–55</option>
                    <option value="55+">55+</option>
                  </select>
                </div>
              </div>
            )}
            {mostrarMarketing && (
              <div style={{ marginTop: 10 }}>
                <SL>Sector de actividad</SL>
                <input
                  placeholder="Ej. Tecnología, E-commerce, Consultoría..."
                  value={newSector}
                  onChange={e => setNewSector(e.target.value)}
                  style={{ ...css.inp, width: "100%" }}
                />
              </div>
            )}
          </div>
          </div>

          {/* BLOQUE 3: Datos Financieros */}
          <div className="configurar-cliente-bloque bloque-3">

          {/* Sección H: Datos Financieros (colapsable) */}
          <div>
            <button
              onClick={() => setMostrarFinanciero(!mostrarFinanciero)}
              style={{
                width: "100%",
                padding: "10px 0",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(10,43,73,0.08)",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(10,43,73,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Datos Financieros (opcional)
              <span style={{ fontSize: 14 }}>{mostrarFinanciero ? "▲" : "▼"}</span>
            </button>
            {mostrarFinanciero && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <div>
                  <SL>IBAN</SL>
                  <input
                    placeholder="ES91 1234 5678 9012 3456 7890"
                    value={newIban}
                    onChange={e => setNewIban(e.target.value)}
                    style={{ ...css.inp, width: "100%" }}
                  />
                </div>
                <div>
                  <SL>Condiciones de pago</SL>
                  <select value={newCondicionesPago} onChange={e => setNewCondicionesPago(e.target.value)} style={{ ...css.inp, width: "100%" }}>
                    <option value="prepago">Prepago</option>
                    <option value="15">Pago a 15 días</option>
                    <option value="30">Pago a 30 días</option>
                    <option value="60">Pago a 60 días</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

          <Ghost style={{ padding: "10px 12px" }}>
            <div style={{ fontSize: 12, color: "rgba(10,43,73,0.6)", lineHeight: 1.6 }}>
              El cliente se creará con la <strong style={{ color: "#0a2b49" }}>configuración global</strong> como base.
              {selectedPaquetes.length > 0 && (
                <div style={{ marginTop: 4 }}>
                  ✓ <strong>{selectedPaquetes.length} paquete{selectedPaquetes.length !== 1 ? "s" : ""}</strong> activado{selectedPaquetes.length !== 1 ? "s" : ""}.
                </div>
              )}
              Podrás ajustar precios y tramos directamente desde la pestaña de trabajo del cliente.
            </div>
          </Ghost>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Btn variant="primary" onClick={addClient}>Dar de alta</Btn>
          </div>
      </Card>
      </div>
    </div>
  );
}
