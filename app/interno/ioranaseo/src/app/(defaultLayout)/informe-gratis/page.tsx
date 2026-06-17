"use client";

import { useState } from "react";
import Link from "next/link";

export default function InformeGratisPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const website = formData.get("website") as string;
    const email = formData.get("email") as string;
    const nombre = formData.get("nombre") as string;
    const telefono = formData.get("telefono") as string;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    main: {
      minHeight: "calc(100vh - 400px)",
      backgroundColor: "#F5F5FD",
      position: "relative" as const,
      overflow: "hidden" as const,
      paddingTop: "160px",
      paddingBottom: "80px",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 24px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
      gap: "80px",
      alignItems: "start",
    },
    leftBlock: {
      position: "sticky" as const,
      top: "96px",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      borderRadius: "9999px",
      backgroundColor: "rgba(77, 50, 165, 0.1)",
      border: "1px solid rgba(77, 50, 165, 0.2)",
      color: "#4D32A5",
      fontSize: "10px",
      fontWeight: "bold",
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
      marginBottom: "32px",
    },
    h1: {
      fontSize: "56px",
      fontWeight: "900",
      color: "#1a1a1a",
      lineHeight: "1.1",
      letterSpacing: "-0.02em",
      marginBottom: "32px",
    },
    h1Span: {
      color: "#4D32A5",
    },
    p: {
      fontSize: "18px",
      color: "#666",
      lineHeight: "1.6",
      marginBottom: "48px",
      maxWidth: "540px",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1a1a1a",
      marginBottom: "32px",
    },
    ul: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column" as const,
      gap: "20px",
    },
    li: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      color: "#333",
      fontSize: "18px",
    },
    icon: {
      width: "20px",
      height: "20px",
      color: "#4D32A5",
      flexShrink: 0,
    },
    footer: {
      marginTop: "64px",
      paddingTop: "32px",
      borderTop: "1px solid rgba(77, 50, 165, 0.1)",
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "32px 32px",
    },
    footerItem: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "10px",
      fontWeight: "bold",
      color: "#999",
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
    },
    formCard: {
      position: "relative" as const,
      minHeight: "600px",
    },
    formCardInner: {
      backgroundColor: "#ffffff",
      padding: "48px",
      borderRadius: "40px",
      border: "1px solid rgba(77, 50, 165, 0.2)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
      height: "100%",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
    },
    h2: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#1a1a1a",
      marginBottom: "32px",
    },
    h2Span: {
      color: "#4D32A5",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "24px",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
    },
    label: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#666",
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
      marginLeft: "4px",
    },
    input: {
      width: "100%",
      fontSize: "14px",
      padding: "16px 20px",
      backgroundColor: "#f8f7fc",
      border: "1px solid #ddd",
      borderRadius: "12px",
      color: "#1a1a1a",
      fontFamily: "inherit",
      boxSizing: "border-box" as const,
      transition: "all 0.2s",
    },
    textarea: {
      width: "100%",
      fontSize: "14px",
      padding: "16px 20px",
      backgroundColor: "#f8f7fc",
      border: "1px solid #ddd",
      borderRadius: "12px",
      color: "#1a1a1a",
      fontFamily: "inherit",
      boxSizing: "border-box" as const,
      resize: "none" as const,
      minHeight: "120px",
    },
    checkboxGroup: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      paddingTop: "8px",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      cursor: "pointer",
      flexShrink: 0,
    },
    checkboxLabel: {
      fontSize: "12px",
      color: "#666",
      lineHeight: "1.5",
      cursor: "pointer",
      margin: 0,
    },
    checkboxLink: {
      color: "#4D32A5",
      textDecoration: "none",
      fontWeight: "bold",
    },
    button: {
      width: "100%",
      padding: "20px 28px",
      backgroundColor: "#ff6b35",
      color: "white",
      border: "none",
      borderRadius: "16px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      boxShadow: "0 10px 30px rgba(255, 107, 53, 0.3)",
    },
    successMessage: {
      textAlign: "center" as const,
      padding: "48px",
    },
    successIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(77, 50, 165, 0.1)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 32px",
    },
    successTitle: {
      fontSize: "36px",
      fontWeight: "900",
      color: "#1a1a1a",
      marginBottom: "24px",
    },
    successText: {
      fontSize: "18px",
      color: "#666",
      lineHeight: "1.6",
      marginBottom: "40px",
      maxWidth: "420px",
      margin: "0 auto 40px",
    },
    successButton: {
      backgroundColor: "#ff6b35",
      color: "white",
      padding: "16px 40px",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "12px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
      display: "inline-block",
      transition: "all 0.3s",
    },
  };

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        {/* Bloque Izquierdo */}
        <div style={styles.leftBlock}>
          <div style={styles.badge}>INFORME GRATUITO</div>

          <h1 style={styles.h1}>
            ¿Cómo está <br />
            <span style={styles.h1Span}>optimizada tu web?</span>
          </h1>

          <p style={styles.p}>
            Descubre el verdadero rendimiento de tu sitio web. Analizamos tu
            velocidad, SEO técnico, experiencia móvil y oportunidades de
            conversión — completamente gratis y sin compromiso.
          </p>

          <div>
            <h3 style={styles.h3}>
              ¿Qué incluye el <span style={styles.h2Span}>informe</span>?
            </h3>
            <ul style={styles.ul}>
              {[
                "Análisis de velocidad de carga y rendimiento",
                "Detección de errores técnicos SEO críticos",
                "Evaluación de experiencia móvil y usabilidad",
                "Oportunidades de mejora y quick wins",
                "Análisis básico de competencia digital",
              ].map((item, i) => (
                <li key={i} style={styles.li}>
                  <svg
                    style={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.footer}>
            {["SIN COMPROMISO", "RESPUESTA EN 24-48H", "100% GRATUITO"].map(
              (text, i) => (
                <div key={i} style={styles.footerItem}>
                  <svg
                    style={{ width: "16px", height: "16px", color: "#ccc" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {text}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Bloque Formulario */}
        <div style={styles.formCard}>
          <div style={styles.formCardInner}>
            {!submitted ? (
              <>
                <h2 style={styles.h2}>
                  Solicita <span style={styles.h2Span}>tu informe</span>
                </h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Nombre de contacto *</label>
                      <input
                        name="nombre"
                        type="text"
                        required
                        placeholder="Tu nombre"
                        style={styles.input}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#4D32A5")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Teléfono de contacto *</label>
                      <input
                        name="telefono"
                        type="tel"
                        required
                        placeholder="Tu teléfono"
                        style={styles.input}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#4D32A5")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      />
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email corporativo *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="tu@empresa.com"
                        style={styles.input}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#4D32A5")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>URL de tu sitio web *</label>
                      <input
                        name="website"
                        type="url"
                        required
                        placeholder="https://tusitio.com"
                        style={styles.input}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#4D32A5")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      ¿Quién es tu mayor competidor? (Opcional)
                    </label>
                    <input
                      name="competidor"
                      type="text"
                      placeholder="Ej: competencia.com"
                      style={styles.input}
                      onFocus={(e) => (e.target.style.borderColor = "#4D32A5")}
                      onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      ¿Qué te preocupa de tu web hoy? *
                    </label>
                    <textarea
                      name="duda"
                      required
                      placeholder="Cuéntanos brevemente tu situación actual"
                      style={styles.textarea}
                      onFocus={(e) => (e.target.style.borderColor = "#4D32A5")}
                      onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                    />
                  </div>

                  <div style={styles.checkboxGroup}>
                    <input
                      id="legal"
                      type="checkbox"
                      required
                      style={styles.checkbox}
                    />
                    <label htmlFor="legal" style={styles.checkboxLabel}>
                      Acepto el tratamiento de mis datos según la{" "}
                      <a href="/legal/privacidad" style={styles.checkboxLink}>
                        Política de Privacidad
                      </a>
                      . *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ ...styles.button, opacity: loading ? 0.5 : 1 }}
                  >
                    {loading
                      ? "Preparando análisis..."
                      : "Quiero mi informe gratuito"}
                    {!loading && (
                      <svg
                        style={{ width: "16px", height: "16px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    )}
                  </button>

                  {error && (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#dc2626",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "16px",
                      }}
                    >
                      {error}
                    </p>
                  )}
                </form>
              </>
            ) : (
              <div style={styles.successMessage}>
                <div style={styles.successIcon}>
                  <svg
                    style={{ width: "40px", height: "40px", color: "#4D32A5" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h2 style={styles.successTitle}>¡Análisis solicitado!</h2>
                <p style={styles.successText}>
                  Estamos escaneando tu sitio web. En un plazo de{" "}
                  <strong>24-48 horas</strong> recibirás el informe detallado en
                  tu email corporativo.
                </p>
                <Link href="/" style={styles.successButton}>
                  Volver al inicio
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
