"use client";

import React from "react";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

interface Step {
  num: string;
  title: string;
  body: string;
  detail: string;
  duration: string;
  color: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Auditoría Local",
    body: "Analizamos tu ficha actual, la consistencia NAP en directorios, las reseñas existentes y la posición real de tu negocio en el pack local frente a competidores.",
    detail: "Análisis NAP · Reseñas · Posición competitiva",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Optimización de Ficha",
    body: "Completamos y optimizamos cada campo de Google Business: categorías, atributos, servicios, horarios, fotografías profesionales y descripción con keywords locales.",
    detail: "GBP setup · Categorías · Fotos profesionales",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Estrategia de Contenido Local",
    body: "Creamos un calendario de Google Posts, preguntas y respuestas, y actualizaciones que mantienen la ficha activa y relevante para el algoritmo local.",
    detail: "Google Posts · Q&A · Calendario editorial",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Gestión de Reseñas",
    body: "Implementamos un sistema de captación de reseñas auténticas, respondemos a todos los comentarios y neutralizamos el impacto de valoraciones negativas.",
    detail: "Sistema de captación · Respuestas · Reputación",
    duration: "Semana 4",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Monitorización y Reporting",
    body: "Reporting mensual con evolución de posición en el pack local, llamadas generadas, visitas a la web desde Maps y comparativa vs. competencia.",
    detail: "Reporting mensual · Analytics · Comparativa",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

interface NuestroProcesoLocalProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  steps?: Step[];
}

export default function NuestroProcesoLocal({
  title = "¿Cómo desarrollamos",
  titleHighlight = "SEO Local?",
  description = "Proceso probado en más de 80 proyectos. Sin tecnicismos, sin sorpresas.",
  steps = STEPS,
}: NuestroProcesoLocalProps = {}) {
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
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "16px",
              lineHeight: "1.3",
            }}
          >
            {title} <span style={{ color: "#4D32A5" }}>{titleHighlight}</span>
          </h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "#666",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            {description}
          </p>
        </div>

        {/* Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "30px",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                opacity: 1,
                padding: "20px 15px",
                textAlign: "center",
                backgroundColor: "rgba(150, 150, 150, 0.08)",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${step.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(150, 150, 150, 0.08)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0 auto 12px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid ${step.color}`,
                  backgroundColor: `${step.color}14`,
                  color: step.color,
                }}
              >
                {step.icon}
              </div>

              {/* Duration */}
              <div
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: step.color,
                  padding: "4px 8px",
                  marginBottom: "10px",
                  border: `1px solid ${step.color}30`,
                  backgroundColor: `${step.color}10`,
                  borderRadius: "8px",
                }}
              >
                {step.duration}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#000",
                  marginBottom: "8px",
                  lineHeight: "1.3",
                  margin: "0 0 8px 0",
                }}
              >
                {step.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: "13px",
                  color: "#333",
                  lineHeight: "1.5",
                  marginBottom: "10px",
                  margin: "0 0 10px 0",
                }}
              >
                {step.body}
              </p>

              {/* Detail */}
              <p
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: step.color,
                  fontWeight: "700",
                  margin: "0",
                }}
              >
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
