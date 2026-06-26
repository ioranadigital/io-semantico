"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Palette, Rocket, TrendingUp } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Diagnóstico gratuito",
    body: "En menos de 48 horas analizamos tu presencia digital actual: posicionamiento local, velocidad web, competencia y oportunidades de captación. Sin compromiso.",
    detail: "Auditoría SEO · análisis GBP · benchmark sector",
    duration: "48 h",
    color: "#ff8c00",
    icon: Search,
  },
  {
    num: "02",
    title: "Configuración y diseño",
    body: "Optimizamos la ficha de Google Business, construimos o rediseñamos la web con arquitectura de conversión y configuramos los canales de soporte directo.",
    detail: "GBP setup · landing CWV · WhatsApp Business",
    duration: "7 días",
    color: "#818cf8",
    icon: Palette,
  },
  {
    num: "03",
    title: "Activación y publicación",
    body: "Lanzamos todo en producción: web en servidor europeo de alta velocidad, SEO on-page listo, schemas estructurados y primeras acciones de posicionamiento local activas.",
    detail: "Deploy Vercel · Schema JSON-LD · Core Web Vitals verde",
    duration: "Día 14",
    color: "#34d399",
    icon: Rocket,
  },
  {
    num: "04",
    title: "Seguimiento y crecimiento",
    body: "Reunión mensual con KPIs en directo, actualizaciones de contenido, optimización continua y soporte directo vía WhatsApp. Tú decides cuándo escalar.",
    detail: "Reporting mensual · soporte <4h · optimización continua",
    duration: "Mes a mes",
    color: "#fbbf24",
    icon: TrendingUp,
  },
];

export default function PymesProcess() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items =
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            (e.target as HTMLElement).classList.add("step-visible");
        }),
      { threshold: 0.15 },
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "60px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
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
            ¿Cómo desarrollamos{" "}
            <span style={{ color: "#4D32A5" }}>SEO Local?</span>
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
            Proceso probado en más de 80 proyectos. Sin tecnicismos, sin
            sorpresas.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-step
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                padding: "30px",
                textAlign: "center",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "0 auto 20px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid ${step.color}`,
                  backgroundColor: `${step.color}14`,
                }}
              >
                <step.icon
                  size={32}
                  style={{ color: step.color, strokeWidth: 2 }}
                />
              </div>

              {/* Duration */}
              <div
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: step.color,
                  padding: "6px 12px",
                  marginBottom: "16px",
                  border: `1px solid ${step.color}30`,
                  backgroundColor: `${step.color}10`,
                  borderRadius: "12px",
                }}
              >
                {step.duration}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#000",
                  marginBottom: "12px",
                  lineHeight: "1.4",
                }}
              >
                {step.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#333",
                  lineHeight: "1.6",
                  marginBottom: "16px",
                }}
              >
                {step.body}
              </p>

              {/* Detail */}
              <p
                style={{
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: step.color,
                  fontWeight: "700",
                }}
              >
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button
            type="button"
            onClick={() => router.push("/informe-gratuito")}
            className="btn-barrido-cta"
            style={{
              padding: "14px 32px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#FF8C00",
              border: "none",
              borderRadius: "24px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>
              Empezar el diagnóstico gratuito →
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .step-visible[data-step] {
          opacity: 1 !important;
          transform: none !important;
        }

        .btn-barrido-cta {
          position: relative;
          overflow: hidden;
          background: #FF8C00 !important;
        }

        .btn-barrido-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #4D32A5;
          transition: left 0.4s ease;
          z-index: 0;
        }

        .btn-barrido-cta:hover::before {
          left: 0;
        }

        .btn-barrido-cta span {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
