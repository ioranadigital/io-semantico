// components/PymesCases.tsx
// Iorana Digital — Sección 5 · Mini Casos de Éxito Pymes
// Mismo sistema de diseño que CasesSection.tsx · motion framer · 3 cards

"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Trophy, MapPin, Globe, Headphones } from "lucide-react";

const CASES = [
  {
    company: "Clínica Dental Oviedo",
    sector: "Salud · SEO Local",
    service: "Google Maps",
    result: "+340%",
    resultLabel: "Llamadas orgánicas",
    period: "90 días",
    desc: "La ficha de Google Business pasó de 8 a 47 llamadas semanales. Posición #2 en el pack local para 'dentista Oviedo'.",
    tags: ["Google Maps", "GBP", "Reseñas"],
    icon: MapPin,
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.06)",
    accentBorder: "rgba(52,211,153,0.18)",
  },
  {
    company: "Taller AutoService",
    sector: "Automoción · Web",
    service: "Web de Alta Conversión",
    result: "4.2%",
    resultLabel: "Tasa de conversión",
    period: "vs 1.1% sector",
    desc: "Nueva landing con arquitectura de conversión CRO. El formulario de cita previa generó 64 leads en el primer mes.",
    tags: ["Landing Page", "CRO", "Core Web Vitals"],
    icon: Globe,
    accent: "#818cf8",
    accentBg: "rgba(129,140,248,0.06)",
    accentBorder: "rgba(129,140,248,0.18)",
  },
  {
    company: "Academia de Inglés BCN",
    sector: "Educación · Soporte",
    service: "Pack Completo",
    result: "NPS 91",
    resultLabel: "Satisfacción cliente",
    period: "+18 meses activo",
    desc: "Pack completo con soporte directo. Crecimiento del 210% en matriculaciones online en el primer semestre.",
    tags: ["Pack Completo", "Soporte &lt;4h", "Analítica"],
    icon: Headphones,
    accent: "#fbbf24",
    accentBg: "rgba(251,191,36,0.06)",
    accentBorder: "rgba(251,191,36,0.18)",
  },
];

const PymesCases = () => {
  return (
    <section
      id="casos-pymes"
      aria-labelledby="cases-h2"
      className="w-full py-24 bg-[#08223a] overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 overflow-visible">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase flex items-center gap-2">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Resultados reales
            </span>
            <h2
              id="cases-h2"
              className="text-3xl md:text-5xl font-heading font-extrabold mt-4 text-[#ebf2f7] tracking-tight"
            >
              Pymes como la{" "}
              <span className="text-[#ff8c00]">tuya</span>
            </h2>
            <p className="mt-4 text-[#ebf2f7]/50 text-base max-w-lg leading-relaxed">
              Casos reales de pequeñas y medianas empresas que digitalizaron su presencia con Iorana Digital.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button
              type="button"
              onClick={() =>
                document.getElementById("pymes-form")?.scrollIntoView({ behavior: "smooth" })
              }
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#ff8c00]/30 text-[#ff8c00] text-sm font-bold hover:bg-[#ff8c00]/10 transition-all duration-300 focus:outline-none"
            >
              Quiero resultados similares →
            </button>
          </motion.div>
        </div>

        {/* Grid de Casos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-visible">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl border overflow-hidden transition-all duration-500 shadow-2xl hover:-translate-y-1 hover:shadow-black/30"
                style={{
                  background: c.accentBg,
                  borderColor: c.accentBorder,
                }}
              >
                {/* Header card */}
                <div className="relative h-36 overflow-hidden" style={{ background: "rgba(8,22,40,0.6)" }}>
                  {/* Patrón decorativo */}
                  <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`dot-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1.5" fill="white" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#dot-${i})`} />
                    </svg>
                  </div>

                  {/* Gradiente inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08223a] to-transparent z-10" />

                  {/* Tags */}
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                      style={{ background: `${c.accent}18`, borderColor: `${c.accent}35`, color: c.accent }}
                    >
                      {c.service}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#0a2b49]/80 border border-white/10 text-[10px] font-bold text-[#ebf2f7] uppercase tracking-widest">
                      {c.sector}
                    </span>
                  </div>

                  {/* Icono flotante */}
                  <div
                    className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{ background: `${c.accent}18`, borderColor: `${c.accent}30`, color: c.accent }}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-7 relative z-20 -mt-8">
                  {/* KPI principal */}
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <TrendingUp
                      className="w-5 h-5 shrink-0 mt-0.5"
                      style={{ color: c.accent }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-3xl font-black tabular-nums"
                      style={{
                        color: c.accent,
                        textShadow: `0 0 24px ${c.accent}40`,
                      }}
                    >
                      {c.result}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#ebf2f7]/40 uppercase tracking-widest mb-1">
                    {c.resultLabel}
                  </p>
                  <p className="text-[11px]" style={{ color: `${c.accent}80` }}>
                    {c.period}
                  </p>

                  {/* Divider */}
                  <div className="h-px my-4" style={{ background: `${c.accent}20` }} />

                  {/* Company */}
                  <h3 className="text-base font-bold text-[#ebf2f7] mb-2">{c.company}</h3>
                  <p
                    className="text-sm text-[#ebf2f7]/55 leading-relaxed mb-5"
                  >
                    {c.desc}
                  </p>

                  {/* Micro tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{
                          background: `${c.accent}10`,
                          borderColor: `${c.accent}25`,
                          color: `${c.accent}90`,
                        }}
                        dangerouslySetInnerHTML={{ __html: tag }}
                      />
                    ))}
                  </div>
                </div>

                {/* Barra hover inferior */}
                <div
                  className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: c.accent }}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>

        {/* CTA móvil */}
        <div className="mt-10 text-center md:hidden">
          <button
            type="button"
            onClick={() =>
              document.getElementById("pymes-form")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#ff8c00]/30 text-[#ff8c00] text-sm font-bold hover:bg-[#ff8c00]/10 transition-all duration-300"
          >
            Quiero resultados similares →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PymesCases;
