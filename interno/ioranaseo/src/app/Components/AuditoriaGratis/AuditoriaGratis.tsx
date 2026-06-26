"use client";

import { useState } from "react";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  website: string;
  competidor?: string;
  duda: string;
}

export default function AuditoriaGratis() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    website: "",
    competidor: "",
    duda: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Aquí iría la integración con tu backend
      console.log("Datos del formulario:", formData);
      setSubmitted(true);
    } catch (err) {
      setError("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        padding: "80px 20px",
        backgroundColor: "#f9fafb",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* Bloque Izquierdo */}
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                backgroundColor: "rgba(77, 50, 165, 0.1)",
                border: "1px solid rgba(77, 50, 165, 0.2)",
                borderRadius: "20px",
                color: "#4D32A5",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "32px",
              }}
            >
              AUDITORÍA GRATUITA
            </div>

            <h2
              style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#1a1a1a",
                lineHeight: "1.2",
                marginBottom: "32px",
              }}
            >
              Quiero conocer cómo está{" "}
              <span style={{ color: "#FF8C00" }}>
                mi web y la presencia digital de mi marca
              </span>
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "#666",
                lineHeight: "1.6",
                marginBottom: "48px",
                maxWidth: "500px",
              }}
            >
              Descubre el verdadero rendimiento de tu sitio web y conoce cómo es
              la presencia digital de tu negocio - Gratis y sin compromiso.
            </p>

            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: "24px",
                }}
              >
                ¿Qué incluye el{" "}
                <span style={{ color: "#FF8C00" }}>informe</span>?
              </h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "Análisis de velocidad de carga y rendimiento",
                  "Detección de errores técnicos SEO críticos",
                  "Evaluación de experiencia móvil y usabilidad",
                  "Oportunidades de mejora y quick wins",
                  "Análisis básico de tu Presencia en Google, Maps y los principales buscadores",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      color: "#333",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        color: "#22c55e",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: "flex",
                gap: "32px",
                paddingTop: "32px",
                borderTop: "1px solid #e5e7eb",
                marginTop: "32px",
              }}
            >
              {["SIN COMPROMISO", "RESPUESTA EN 24-48H", "100% GRATUITO"].map(
                (text, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <span style={{ color: "#999" }}>✓</span>
                    {text}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Bloque Formulario / Éxito */}
          <div>
            {!submitted ? (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "48px",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "32px",
                  }}
                >
                  Solicita{" "}
                  <span style={{ color: "#FF8C00" }}>tu auditoría</span>
                </h2>

                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "8px",
                        }}
                      >
                        NOMBRE *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#FF8C00";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(255, 140, 0, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "8px",
                        }}
                      >
                        TELÉFONO *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        placeholder="Tu teléfono"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#FF8C00";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(255, 140, 0, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "8px",
                        }}
                      >
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@empresa.com"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#FF8C00";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(255, 140, 0, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "8px",
                        }}
                      >
                        SITIO WEB *
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        required
                        placeholder="https://tusitio.com"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#FF8C00";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(255, 140, 0, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "8px",
                      }}
                    >
                      ¿QUIÉN ES TU MAYOR COMPETIDOR? (OPCIONAL)
                    </label>
                    <input
                      type="text"
                      name="competidor"
                      value={formData.competidor}
                      onChange={handleChange}
                      placeholder="Ej: competencia.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#FF8C00";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(255, 140, 0, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "8px",
                      }}
                    >
                      ¿QUÉ TE PREOCUPA DE TU WEB HOY? *
                    </label>
                    <textarea
                      name="duda"
                      value={formData.duda}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Cuéntanos brevemente tu situación actual"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        resize: "vertical",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#FF8C00";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(255, 140, 0, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#FF8C00",
                      color: "#ffffff",
                      padding: "14px 32px",
                      borderRadius: "20px",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: loading ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#4D32A5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FF8C00";
                    }}
                  >
                    {loading
                      ? "Preparando análisis..."
                      : "Quiero mi auditoría gratuita"}{" "}
                    →
                  </button>

                  {error && (
                    <p
                      style={{
                        color: "#ef4444",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </p>
                  )}
                </form>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "48px",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "rgba(255, 140, 0, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    fontSize: "40px",
                  }}
                >
                  ✨
                </div>
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "24px",
                  }}
                >
                  ¡Auditoría solicitada!
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    lineHeight: "1.6",
                    marginBottom: "32px",
                    maxWidth: "400px",
                    margin: "0 auto 32px",
                  }}
                >
                  Estamos escaneando tu sitio web. En un plazo de{" "}
                  <strong>24-48 horas</strong> recibirás el informe detallado en
                  tu email corporativo.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nombre: "",
                      email: "",
                      telefono: "",
                      website: "",
                      competidor: "",
                      duda: "",
                    });
                  }}
                  style={{
                    backgroundColor: "#FF8C00",
                    color: "#ffffff",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#4D32A5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF8C00";
                  }}
                >
                  Volver a intentarlo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
