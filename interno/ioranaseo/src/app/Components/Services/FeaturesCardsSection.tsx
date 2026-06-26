"use client";

import React, { FC } from "react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const FeaturesCardsSection: FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      icon: "🚀",
      title: "Posicionamiento Rápido",
      description:
        "Estrategias SEO optimizadas que te posicionan en Google en menos tiempo con resultados comprobados.",
    },
    {
      id: 2,
      icon: "💡",
      title: "Soluciones Personalizadas",
      description:
        "Cada estrategia se adapta a tu industria, competencia y objetivos específicos de negocio.",
    },
    {
      id: 3,
      icon: "📈",
      title: "Resultados Medibles",
      description:
        "Tracking detallado de métricas, tráfico orgánico y conversiones en tiempo real.",
    },
    {
      id: 4,
      icon: "🎨",
      title: "Diseño Limpio y Moderno",
      description:
        "Landing pages y sitios web optimizados que convierten visitantes en clientes.",
    },
    {
      id: 5,
      icon: "🔧",
      title: "Soporte Continuo",
      description:
        "Asesoramiento experto y ajustes constantes para mantener tu posicionamiento en el tiempo.",
    },
    {
      id: 6,
      icon: "🏆",
      title: "Casos de Éxito Demostrado",
      description:
        "Más de 200+ empresas han multiplicado sus ventas con nuestras estrategias SEO.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 20px",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#4D32A5",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Explora nuestras características
          </p>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "20px",
              lineHeight: "1.3",
            }}
          >
            Por qué elegir <span style={{ color: "#4D32A5" }}>Iorana SEO</span>
          </h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "#666",
              fontSize: "18px",
              lineHeight: "1.7",
              fontWeight: "500",
            }}
          >
            Somos especialistas en posicionamiento SEO y marketing digital con
            un único objetivo: que tu negocio crezca.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              style={{
                backgroundColor: "#ffffff",
                padding: "40px 30px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                border: "1px solid #f0f0f0",
                transition: "all 0.3s ease",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(77, 50, 165, 0.15)";
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70px",
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: "14px",
                  lineHeight: "1.4",
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "#666",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  margin: "0",
                  fontWeight: "500",
                }}
              >
                {feature.description}
              </p>

              {/* Bottom Accent */}
              <div
                style={{
                  marginTop: "24px",
                  height: "3px",
                  width: "50px",
                  backgroundColor: "#4D32A5",
                  borderRadius: "2px",
                  margin: "24px auto 0",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCardsSection;
