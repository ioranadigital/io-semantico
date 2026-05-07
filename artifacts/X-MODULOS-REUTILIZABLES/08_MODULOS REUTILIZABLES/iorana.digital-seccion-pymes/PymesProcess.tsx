// components/PymesProcess.tsx
// Iorana Digital — Sección 4 · Proceso "¿Cómo funciona?"
// 4 pasos · timeline visual · animación de entrada via IntersectionObserver

"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Diagnóstico gratuito",
    body: "En menos de 48 horas analizamos tu presencia digital actual: posicionamiento local, velocidad web, competencia y oportunidades de captación. Sin compromiso.",
    detail: "Auditoría SEO · análisis GBP · benchmark sector",
    duration: "48 h",
    color: "#ff8c00",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Configuración y diseño",
    body: "Optimizamos la ficha de Google Business, construimos o rediseñamos la web con arquitectura de conversión y configuramos los canales de soporte directo.",
    detail: "GBP setup · landing CWV · WhatsApp Business",
    duration: "7 días",
    color: "#818cf8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Activación y publicación",
    body: "Lanzamos todo en producción: web en servidor europeo de alta velocidad, SEO on-page listo, schemas estructurados y primeras acciones de posicionamiento local activas.",
    detail: "Deploy Vercel · Schema JSON-LD · Core Web Vitals verde",
    duration: "Día 14",
    color: "#34d399",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Seguimiento y crecimiento",
    body: "Reunión mensual con KPIs en directo, actualizaciones de contenido, optimización continua y soporte directo vía WhatsApp. Tú decides cuándo escalar.",
    detail: "Reporting mensual · soporte &lt;4h · optimización continua",
    duration: "Mes a mes",
    color: "#fbbf24",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4-8 4 4 4-6 4 10" />
      </svg>
    ),
  },
];

export default function PymesProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("step-visible");
        }),
      { threshold: 0.15 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-h2"
      className="relative w-full bg-[#060a10] overflow-hidden"
    >
      {/* BG decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#ff8c00]/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">

        {/* Header */}
        <header className="text-center mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff8c00]/25 bg-[#ff8c00]/8 text-[#ff8c00] text-xs font-semibold tracking-widest uppercase mb-5">
            Proceso
          </span>
          <h2
            id="process-h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#ebf2f7] leading-tight tracking-tight"
          >
            ¿Cómo digitalizamos{" "}
            <span className="text-[#ff8c00]">tu pyme en 30 días?</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[#ebf2f7]/50 text-base leading-relaxed">
            Proceso probado en más de 80 proyectos. Sin tecnicismos, sin sorpresas.
          </p>
        </header>

        {/* Steps — desktop: grid 4 col / móvil: timeline vertical */}
        <div className="hidden lg:grid grid-cols-4 gap-4 relative">
          {/* Línea conectora */}
          <div
            aria-hidden="true"
            className="absolute top-[52px] left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(to right, #ff8c00 0%, #818cf8 33%, #34d399 66%, #fbbf24 100%)",
              opacity: 0.25,
            }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-step
              className="step-card relative flex flex-col items-center text-center"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
              }}
            >
              {/* Icono / número */}
              <div
                className="relative z-10 w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 border"
                style={{
                  background: `${step.color}14`,
                  borderColor: `${step.color}35`,
                  color: step.color,
                  boxShadow: `0 0 24px ${step.color}18`,
                }}
              >
                {step.icon}
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                  style={{ background: step.color, color: "#060a10" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>

              {/* Badge duración */}
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 border"
                style={{
                  background: `${step.color}10`,
                  borderColor: `${step.color}30`,
                  color: step.color,
                }}
              >
                {step.duration}
              </span>

              <h3 className="text-base font-bold text-[#ebf2f7] mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-[#ebf2f7]/50 leading-relaxed mb-3">
                {step.body}
              </p>
              <p
                className="text-[11px] font-mono"
                style={{ color: `${step.color}80` }}
                dangerouslySetInnerHTML={{ __html: step.detail }}
              />
            </div>
          ))}
        </div>

        {/* Móvil: timeline vertical */}
        <div className="lg:hidden relative">
          {/* Línea vertical */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, #ff8c00, #818cf8, #34d399, #fbbf24)",
              opacity: 0.2,
            }}
          />

          <ol className="space-y-10 relative" role="list">
            {STEPS.map((step, i) => (
              <li
                key={step.num}
                data-step
                className="relative flex gap-5"
                style={{
                  opacity: 0,
                  transform: "translateX(-16px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                {/* Icono lateral */}
                <div
                  className="relative z-10 shrink-0 w-[54px] h-[54px] rounded-2xl flex items-center justify-center border"
                  style={{
                    background: `${step.color}12`,
                    borderColor: `${step.color}30`,
                    color: step.color,
                  }}
                >
                  {step.icon}
                </div>

                {/* Contenido */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border"
                      style={{
                        background: `${step.color}10`,
                        borderColor: `${step.color}25`,
                        color: step.color,
                      }}
                    >
                      {step.duration}
                    </span>
                    <span className="text-xs text-[#ebf2f7]/25">·</span>
                    <span className="text-xs font-bold text-[#ebf2f7]/30">{step.num}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#ebf2f7] mb-1.5">{step.title}</h3>
                  <p className="text-sm text-[#ebf2f7]/50 leading-relaxed">{step.body}</p>
                  <p
                    className="mt-2 text-[11px] font-mono"
                    style={{ color: `${step.color}70` }}
                    dangerouslySetInnerHTML={{ __html: step.detail }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA debajo del proceso */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() =>
              document.getElementById("pymes-form")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white border border-[#ff8c00]/40 hover:bg-[#ff8c00]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff8c00] focus:ring-offset-2 focus:ring-offset-[#060a10]"
          >
            Empezar el diagnóstico gratuito
            <span aria-hidden="true" className="text-[#ff8c00]">→</span>
          </button>
        </div>
      </div>

      {/* Animación CSS */}
      <style>{`
        .step-visible[data-step] {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </section>
  );
}
