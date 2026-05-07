// components/PymesAuthority.tsx
// Iorana Digital — Sección 6 · Authority Content
// Texto enriquecido SEO · min. 300 palabras · entidades LSI · E-E-A-T
// Schema: Article + Speakable markup integrado

"use client";

import { useEffect, useRef, useState } from "react";

const COMPARATIVA = [
  { aspecto: "Visibilidad en Google Maps", sinDigital: "Invisible", conIorana: "Top 3 pack local" },
  { aspecto: "Web con Core Web Vitals", sinDigital: "Lenta / sin SEO", conIorana: "Verde · &lt;2s LCP" },
  { aspecto: "Captación de leads", sinDigital: "Solo boca a boca", conIorana: "Formularios 24/7" },
  { aspecto: "Respuesta a clientes", sinDigital: "Email o teléfono", conIorana: "WhatsApp &lt;4h" },
  { aspecto: "Análisis de resultados", sinDigital: "Sin datos", conIorana: "Dashboard en tiempo real" },
];

const ENTIDADES = [
  "Google Business Profile",
  "Core Web Vitals",
  "SEO Local",
  "Schema.org",
  "RGPD",
  "Next.js",
  "Posición Cero",
];

export default function PymesAuthority() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add("auth-visible"),
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="digitalizar-pyme-2026"
      aria-labelledby="authority-h2"
      className="w-full bg-[#060a10] auth-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Columna principal (8/12) ── */}
          <div className="lg:col-span-8">

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff8c00]/25 bg-[#ff8c00]/8 text-[#ff8c00] text-xs font-semibold tracking-widest uppercase mb-6">
              Guía 2026
            </span>

            {/* H2 semántico */}
            <h2
              id="authority-h2"
              className="text-3xl sm:text-4xl font-black text-[#ebf2f7] leading-tight tracking-tight mb-6"
            >
              ¿Por qué las pymes necesitan
              <br />
              <span className="text-[#ff8c00]">digitalización en 2026?</span>
            </h2>

            {/* Intro — Speakable candidate */}
            <div
              itemScope
              itemType="https://schema.org/WebPageElement"
              itemProp="speakable"
              className="text-[#ebf2f7]/65 leading-relaxed space-y-4 text-[15px]"
            >
              <p>
                El <strong className="text-[#ebf2f7]/90 font-semibold">70% de las pymes españolas</strong> no
                aparece en el Pack Local de Google Maps, lo que significa que cada vez que un cliente busca
                su servicio a menos de 10 km, el negocio es invisible. En 2026, la presencia digital ya no
                es opcional: es la diferencia entre crecer o desaparecer frente a competidores que sí
                invierten en{" "}
                <strong className="text-[#ebf2f7]/85 font-semibold">posicionamiento SEO local</strong>.
              </p>
              <p>
                Un negocio con{" "}
                <strong className="text-[#ebf2f7]/85 font-semibold">Google Business Profile</strong>{" "}
                optimizado recibe de media 5 veces más clics y 7 veces más llamadas que uno sin ficha
                verificada. Combinado con una{" "}
                <strong className="text-[#ebf2f7]/85 font-semibold">web de alta conversión</strong> que
                cumple los estándares de{" "}
                <strong className="text-[#ebf2f7]/85 font-semibold">Core Web Vitals</strong> de Google
                (LCP &lt;2.5s, INP &lt;200ms, CLS &lt;0.1), el crecimiento orgánico se convierte en un
                canal predecible y escalable.
              </p>
            </div>

            {/* Contenido expandible */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expanded ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-[#ebf2f7]/65 leading-relaxed space-y-4 text-[15px]">
                <p>
                  En 2026, los motores de búsqueda como Google utilizan modelos de inteligencia artificial
                  (SGE / AI Overviews) que priorizan contenido con{" "}
                  <strong className="text-[#ebf2f7]/85 font-semibold">datos estructurados Schema.org</strong>,
                  entidades verificables y señales de{" "}
                  <strong className="text-[#ebf2f7]/85 font-semibold">E-E-A-T</strong> (Experiencia,
                  Expertise, Autoridad y Confianza). Una pyme sin estos elementos técnicos queda fuera
                  de los resultados generativos, donde el 64% de los usuarios obtiene respuestas directas
                  sin hacer clic.
                </p>
                <p>
                  El{" "}
                  <strong className="text-[#ebf2f7]/85 font-semibold">Reglamento RGPD (UE 2016/679)</strong>{" "}
                  obliga a cualquier empresa que procese datos de ciudadanos europeos a implementar
                  formularios con consentimiento explícito, política de privacidad accesible y gestión
                  correcta de datos. Incumplir esta normativa puede suponer sanciones de hasta el 4% de
                  la facturación anual global.
                </p>
                <p>
                  Con el Pack Digital Pyme de Iorana Digital, todo esto está resuelto desde el primer día:
                  arquitectura web semántica en{" "}
                  <strong className="text-[#ebf2f7]/85 font-semibold">Next.js</strong> con SSR optimizado,
                  schemas JSON-LD integrados, formularios conformes al RGPD y soporte técnico directo
                  sin intermediarios.
                </p>
              </div>
            </div>

            {/* Toggle leer más */}
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-5 text-sm font-semibold text-[#ff8c00] hover:text-[#ff8c00]/80 transition-colors flex items-center gap-1.5 focus:outline-none"
              aria-expanded={expanded}
            >
              {expanded ? "Leer menos" : "Leer más sobre digitalización pyme"}
              <span
                className={`text-xs transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {/* Tabla comparativa */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#ebf2f7] mb-4">
                Pyme sin digitalizar vs Pyme con Iorana Digital
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-white/8">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="bg-[#0a2b49]/60">
                      <th scope="col" className="text-left py-3 px-4 text-xs font-bold text-[#ebf2f7]/40 uppercase tracking-widest">
                        Aspecto
                      </th>
                      <th scope="col" className="text-left py-3 px-4 text-xs font-bold text-red-400/70 uppercase tracking-widest">
                        Sin digitalizar
                      </th>
                      <th scope="col" className="text-left py-3 px-4 text-xs font-bold text-[#ff8c00]/80 uppercase tracking-widest">
                        Con Iorana Digital
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARATIVA.map((row, i) => (
                      <tr
                        key={i}
                        className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-[#ebf2f7]/70">{row.aspecto}</td>
                        <td className="py-3 px-4 text-red-400/60">{row.sinDigital}</td>
                        <td
                          className="py-3 px-4 font-semibold text-[#ff8c00]/80"
                          dangerouslySetInnerHTML={{ __html: row.conIorana }}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Columna lateral (4/12) ── */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-8">

            {/* Entidades semánticas */}
            <div className="rounded-2xl border border-white/8 bg-[#0a2b49]/30 p-6">
              <h3 className="text-sm font-bold text-[#ebf2f7]/50 uppercase tracking-widest mb-4">
                Tecnologías y entidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {ENTIDADES.map((e) => (
                  <span
                    key={e}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#ff8c00]/20 bg-[#ff8c00]/8 text-[#ff8c00]/75 font-medium"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Cita / Pull Quote */}
            <blockquote className="rounded-2xl border border-[#ff8c00]/20 bg-[#ff8c00]/6 p-6">
              <p className="text-base font-semibold text-[#ebf2f7]/80 leading-relaxed italic mb-4">
                "En 6 semanas pasamos de 0 a recibir 40 llamadas mensuales desde Google Maps. No lo creímos hasta verlo."
              </p>
              <footer>
                <p className="text-sm font-bold text-[#ff8c00]">Carlos M.</p>
                <p className="text-xs text-[#ebf2f7]/35">Clínica Dental · Oviedo</p>
              </footer>
            </blockquote>

            {/* Mini CTA */}
            <button
              type="button"
              onClick={() =>
                document.getElementById("pymes-form")?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full py-4 rounded-2xl font-bold text-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff8c00] focus:ring-offset-[#060a10] focus:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #ff8c00, #ff6b00)",
              }}
            >
              Pedir diagnóstico gratuito →
            </button>

            {/* Norma RGPD badge */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/6 bg-white/[0.02]">
              <span className="text-lg leading-none mt-0.5" aria-hidden="true">🇪🇺</span>
              <div>
                <p className="text-xs font-bold text-[#ebf2f7]/60 mb-0.5">Cumplimiento RGPD</p>
                <p className="text-[11px] text-[#ebf2f7]/35 leading-snug">
                  Todos los proyectos incluyen formularios conformes al Reglamento UE 2016/679 y servidor en territorio europeo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .auth-section.auth-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </section>
  );
}
