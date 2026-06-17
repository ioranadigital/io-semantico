"use client";

import React from "react";

interface Feature {
  name: string;
  activa: string | boolean;
  acelera: string | boolean;
  lidera: string | boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  isPopular?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Activa Digital",
    price: "$299",
    description: "Plan perfecto para empezar",
    isPopular: false,
  },
  {
    name: "Acelera Digital",
    price: "$699",
    description: "El más popular",
    isPopular: true,
  },
  {
    name: "Lidera Digital",
    price: "$1,299",
    description: "Para empresas grandes",
    isPopular: false,
  },
];

const FEATURES: Feature[] = [
  {
    name: "Auditoría SEO inicial",
    activa: true,
    acelera: true,
    lidera: true,
  },
  {
    name: "Optimización de palabras clave",
    activa: true,
    acelera: true,
    lidera: true,
  },
  {
    name: "Reporte mensual",
    activa: "Básico",
    acelera: "Detallado",
    lidera: "Completo",
  },
  {
    name: "Optimización on-page",
    activa: true,
    acelera: true,
    lidera: true,
  },
  {
    name: "Link building",
    activa: false,
    acelera: true,
    lidera: true,
  },
  {
    name: "Análisis de competencia",
    activa: false,
    acelera: true,
    lidera: true,
  },
  {
    name: "Soporte directo",
    activa: "Email",
    acelera: "WhatsApp",
    lidera: "24/7",
  },
  {
    name: "Estrategia de contenido",
    activa: false,
    acelera: true,
    lidera: true,
  },
  {
    name: "Optimización técnica avanzada",
    activa: false,
    acelera: false,
    lidera: true,
  },
  {
    name: "Consultoría mensual",
    activa: false,
    acelera: "1 sesión",
    lidera: "4 sesiones",
  },
];

const renderFeatureValue = (value: string | boolean) => {
  if (typeof value === "boolean") {
    return value ? (
      <span style={{ fontSize: "24px", color: "#22c55e" }}>✓</span>
    ) : (
      <span style={{ color: "#9ca3af", fontSize: "14px" }}>No incluido</span>
    );
  }
  return <span style={{ color: "#1f2937", fontWeight: "500" }}>{value}</span>;
};

const PricingComparison: React.FC = () => {
  return (
    <section style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "44px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "16px",
              lineHeight: "1.2",
            }}
          >
            Compara Nuestros Planes
          </h2>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "0" }}>
            Encuentra el plan perfecto para tu negocio
          </p>
        </div>

        {/* Tabla */}
        <div style={{ overflowX: "auto", marginBottom: "40px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "0",
                    textAlign: "left",
                    width: "25%",
                    verticalAlign: "bottom",
                    paddingBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                    }}
                  >
                    Características
                  </h3>
                </th>

                {/* Tarjetas de precio */}
                {PRICING_PLANS.map((plan, index) => (
                  <th
                    key={index}
                    style={{
                      padding: "0 20px",
                      textAlign: "center",
                      width: "25%",
                      verticalAlign: "top",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        border: plan.isPopular ? "2px solid #FF8C00" : "none",
                        borderRadius: "24px",
                        padding: "32px 20px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        marginBottom: "20px",
                      }}
                    >
                      {plan.isPopular && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-12px",
                            left: "0",
                            right: "0",
                            backgroundColor: "#FF8C00",
                            color: "#ffffff",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "700",
                            textAlign: "center",
                            borderRadius: "12px",
                            margin: "0 auto",
                            width: "fit-content",
                          }}
                        >
                          Más Popular
                        </div>
                      )}

                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#1a1a1a",
                          marginBottom: "8px",
                          marginTop: plan.isPopular ? "16px" : "0",
                        }}
                      >
                        {plan.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          marginBottom: "24px",
                        }}
                      >
                        {plan.description}
                      </p>

                      <div style={{ marginBottom: "24px" }}>
                        <span
                          style={{
                            fontSize: "36px",
                            fontWeight: "700",
                            color: "#1a1a1a",
                          }}
                        >
                          {plan.price}
                        </span>
                        <span style={{ color: "#666", marginLeft: "8px" }}>
                          /mes
                        </span>
                      </div>

                      <button
                        style={{
                          width: "100%",
                          padding: "14px 20px",
                          backgroundColor: plan.isPopular
                            ? "#FF8C00"
                            : "#f3f4f6",
                          color: plan.isPopular ? "#ffffff" : "#1a1a1a",
                          border: "none",
                          borderRadius: "20px",
                          fontWeight: "600",
                          fontSize: "14px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = plan.isPopular
                            ? "#4D32A5"
                            : "#e5e7eb";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = plan.isPopular
                            ? "#FF8C00"
                            : "#f3f4f6";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        Elegir Plan ↗
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {FEATURES.map((feature, featureIndex) => (
                <tr key={featureIndex}>
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid #f0f0f0",
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {feature.name}
                  </td>

                  {[feature.activa, feature.acelera, feature.lidera].map(
                    (value, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          padding: "20px",
                          borderBottom: "1px solid #f0f0f0",
                          textAlign: "center",
                          backgroundColor:
                            colIndex === 1
                              ? "rgba(255, 140, 0, 0.08)"
                              : featureIndex % 2 === 0
                                ? "#ffffff"
                                : "#fafafa",
                        }}
                      >
                        {renderFeatureValue(value)}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#f0f9ff",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#1a1a1a", margin: "0" }}>
            ¿No estás seguro de cuál elegir?{" "}
            <a
              href="/contact"
              style={{
                color: "#FF8C00",
                fontWeight: "600",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#4D32A5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#FF8C00";
              }}
            >
              Contacta con nosotros
            </a>{" "}
            para una consulta personalizada.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
