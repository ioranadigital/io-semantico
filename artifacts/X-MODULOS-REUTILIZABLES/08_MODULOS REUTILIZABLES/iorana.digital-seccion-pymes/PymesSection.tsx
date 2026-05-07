// components/PymesSection.tsx
// Iorana Digital — Sección Pymes 2026
// ✅ Sistema de diseño EXACTO de iorana.digital
//    bg-[#0a2b49] / bg-[#08223a] / text-[#ebf2f7] / text-[#ff8c00]
//    font-heading font-extrabold / border-[#ebf2f7]/5 / hover:border-[#ff8c00]/30
//    Mismo patrón que CasesSection.tsx

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, Headphones, TrendingUp, Trophy, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────────
   SUBPRODUCTOS
───────────────────────────────────────────── */
const SUBPRODUCTS = [
  {
    id: "google-maps",
    tag: "Visibilidad Local",
    Icon: MapPin,
    h2: "Posicionamiento en Google Maps",
    pitch:
      "Tu negocio en el Top 3 del mapa de búsqueda local. Cuando alguien busca tu servicio a 5 km, apareces tú.",
    bullets: [
      "Ficha de Google Business optimizada y verificada",
      "Gestión de reseñas y reputación online",
      "Categorías, atributos y fotografía profesional SEO",
      "Tracking de llamadas y visitas desde el mapa",
    ],
    result: "+340% llamadas orgánicas en 90 días",
    cta: "Quiero aparecer en el mapa",
  },
  {
    id: "web-conversion",
    tag: "Captación 24/7",
    Icon: Globe,
    h2: "Web de Alta Conversión para Pymes",
    pitch:
      "Una web que trabaja mientras duermes. Diseñada para convertir visitas en clientes, no para ganar premios de diseño.",
    bullets: [
      "Landing page con arquitectura de conversión probada",
      "Velocidad de carga < 2 s (Core Web Vitals verde)",
      "SEO on-page y Schema estructurado integrado",
      "Formularios de captación con CRM básico incluido",
    ],
    result: "Media 4,2% conversión vs 1,1% del sector",
    cta: "Quiero una web que convierta",
  },
  {
    id: "soporte-directo",
    tag: "Apoyo Continuo",
    Icon: Headphones,
    h2: "Soporte Directo sin Intermediarios",
    pitch:
      "Un consultor senior responde en menos de 4 horas. Sin tickets, sin bots, sin franquicias. Persona real, solución real.",
    bullets: [
      "Canal de soporte dedicado por WhatsApp Business",
      "Reunión mensual de seguimiento con KPIs en directo",
      "Actualizaciones de contenido y mantenimiento técnico",
      "Acceso al panel de analítica en tiempo real",
    ],
    result: "NPS 91/100 · clientes activos +18 meses",
    cta: "Quiero soporte real",
  },
];

/* ─────────────────────────────────────────────
   FAQS
───────────────────────────────────────────── */
const FAQS = [
  {
    q: "¿Cuánto tarda en verse el resultado en Google Maps?",
    a: "La ficha se optimiza en las primeras 72 horas. El posicionamiento orgánico en el pack local empieza a moverse entre la semana 3 y 6, dependiendo de la competencia en tu zona.",
  },
  {
    q: "¿La web incluye alojamiento y dominio?",
    a: "Sí. El primer año el dominio y el hosting en servidor europeo están incluidos en todos los planes Pyme. Sin costes ocultos.",
  },
  {
    q: "¿Funciona para cualquier tipo de negocio local?",
    a: "Trabajamos con clínicas, talleres, comercios, restaurantes, despachos y servicios B2B. Si tienes clientes en un radio geográfico concreto, nuestra metodología aplica.",
  },
  {
    q: "¿Qué pasa si ya tengo una web?",
    a: "Auditamos la web actual sin coste. Si es recuperable la optimizamos; si no, proponemos una migración limpia sin perder el posicionamiento existente.",
  },
];

/* ─────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────── */
const PymesSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nombre: "", email: "", telefono: "", empresa: "", subproducto: "", mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar con Supabase — ver INSTRUCCIONES-INSTALACION.md Paso 3c
    setSubmitted(true);
  };

  const scrollToForm = (sub?: string) => {
    if (sub) setFormData((f) => ({ ...f, subproducto: sub }));
    document.getElementById("pymes-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://iorana.digital/servicios/pymes#service",
                name: "Pack Digital Pyme — Iorana Digital",
                provider: { "@type": "Organization", name: "Iorana Digital", url: "https://iorana.digital" },
                description: "Solución digital integral para pymes: Google Maps, web de alta conversión y soporte directo.",
                serviceType: ["Posicionamiento en Google Maps", "Web de Alta Conversión", "Soporte Digital Directo"],
                areaServed: { "@type": "Country", name: "España" },
                inLanguage: "es-ES",
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQS.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              },
            ],
          }),
        }}
      />

      {/* ══════════════════════════════════════
          HERO — bg-[#0a2b49] igual que el site
      ══════════════════════════════════════ */}
      <section
        id="pymes"
        aria-labelledby="pymes-h1"
        className="w-full py-24 bg-[#0a2b49] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Cabecera */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase flex items-center justify-center gap-2 mb-6">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Pack Digital para Pymes
            </span>

            <h1
              id="pymes-h1"
              className="text-4xl md:text-6xl font-heading font-extrabold text-[#ebf2f7] tracking-tight leading-[1.05] mb-6"
            >
              Digitaliza tu Pyme.<br />
              <span className="text-[#ff8c00]">Clientes Reales.</span>{" "}
              <span className="text-[#ebf2f7]">Resultados Medibles.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-[#ebf2f7]/60 text-lg leading-relaxed">
              Todo lo que necesita una pequeña o mediana empresa para crecer online:
              presencia local en Google, una web que convierte y un consultor humano que
              responde. Sin agencias enormes. Sin costes innecesarios.
            </p>

            {/* Trust bar */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mt-10">
              {[
                "+ 80 pymes digitalizadas",
                "Soporte en < 4 h",
                "Sin permanencia",
                "Garantía 90 días",
              ].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm text-[#ebf2f7]/50">
                  <svg className="w-4 h-4 text-[#ff8c00]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Cards subproductos — patrón CasesSection ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-visible">
            {SUBPRODUCTS.map((p, i) => {
              const Icon = p.Icon;
              return (
                <motion.article
                  key={p.id}
                  id={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-[#08223a] rounded-3xl border border-[#ebf2f7]/5 overflow-hidden hover:border-[#ff8c00]/30 transition-all duration-500 shadow-2xl flex flex-col"
                >
                  {/* Cabecera con fondo tonal + icono decorativo */}
                  <div className="h-36 bg-[#0a2b49] relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08223a] to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]" aria-hidden="true">
                      <Icon className="w-28 h-28 text-[#ff8c00]" />
                    </div>
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-[#ff8c00] text-[10px] font-bold text-[#08223a] uppercase tracking-widest">
                        {p.tag}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-8 relative z-20 -mt-10 flex flex-col flex-1">
                    {/* KPI — igual al result de CasesSection */}
                    <div className="flex items-center gap-2 text-[#ff8c00] mb-3">
                      <TrendingUp className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-black drop-shadow-[0_0_8px_rgba(255,140,0,0.4)]">
                        {p.result}
                      </span>
                    </div>

                    {/* H2 */}
                    <h2 className="text-xl font-heading font-extrabold text-[#ebf2f7] mb-3 leading-snug">
                      {p.h2}
                    </h2>

                    {/* Pitch */}
                    <p className="text-[#ebf2f7]/60 text-sm leading-relaxed mb-5">
                      {p.pitch}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2 mb-8 flex-1" role="list">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-[#ebf2f7]/60">
                          <TrendingUp className="w-3.5 h-3.5 text-[#ff8c00] shrink-0 mt-0.5" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* CTA link — igual a "Ver Proyecto" de CasesSection */}
                    <button
                      type="button"
                      onClick={() => scrollToForm(p.h2)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#ebf2f7] group-hover:text-[#ff8c00] transition-colors focus:outline-none"
                    >
                      {p.cta}
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </button>
                  </div>

                  {/* Barra hover naranja — IDÉNTICA a CasesSection */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff8c00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ — bg-[#08223a]
      ══════════════════════════════════════ */}
      <section
        aria-labelledby="pymes-faq-h2"
        className="w-full py-24 bg-[#08223a]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase flex items-center gap-2 mb-4">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Dudas frecuentes
            </span>
            <h2
              id="pymes-faq-h2"
              className="text-3xl md:text-5xl font-heading font-extrabold text-[#ebf2f7] tracking-tight"
            >
              Preguntas sobre el{" "}
              <span className="text-[#ff8c00]">Pack Pyme</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl divide-y divide-[#ebf2f7]/8">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="py-6"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex justify-between items-start w-full text-left gap-4 group focus:outline-none"
                >
                  <h3 className="text-base font-bold text-[#ebf2f7] group-hover:text-[#ff8c00] transition-colors leading-snug">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`shrink-0 w-5 h-5 text-[#ff8c00] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <p className="mt-4 text-sm text-[#ebf2f7]/60 leading-relaxed pr-10">
                    {faq.a}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORMULARIO — bg-[#0a2b49]
          Layout: copy izquierda · form derecha
          Igual que ContactSection de Iorana
      ══════════════════════════════════════ */}
      <section
        id="pymes-form"
        aria-labelledby="pymes-form-h2"
        className="w-full py-24 bg-[#0a2b49]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Copy izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-5/12"
            >
              <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase flex items-center gap-2 mb-5">
                Hablemos de tu proyecto
              </span>
              <h2
                id="pymes-form-h2"
                className="text-3xl md:text-5xl font-heading font-extrabold text-[#ebf2f7] tracking-tight leading-tight mb-6"
              >
                ¿Listo para{" "}
                <span className="text-[#ff8c00]">crecer juntos?</span>
              </h2>
              <p className="text-[#ebf2f7]/60 text-base leading-relaxed mb-8">
                Cuéntanos tu proyecto y en menos de 48h te contactamos con un análisis inicial y una propuesta adaptada a tus objetivos.
              </p>

              <p className="text-sm font-bold text-[#ebf2f7]/70 mb-4">
                ¿En qué podemos <span className="text-[#ff8c00]">ayudarte</span>?
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "SEO Técnico & Google Maps",
                  "Web de Alta Conversión",
                  "Soporte Directo sin Intermediarios",
                  "Pack completo (los 3 servicios)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#ebf2f7]/60">
                    <svg className="w-4 h-4 text-[#ff8c00] shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-6 text-xs text-[#ebf2f7]/30 uppercase tracking-widest">
                <span>Sin compromiso</span>
                <span className="text-[#ff8c00]/30">✓</span>
                <span>Respuesta en 24–48h</span>
                <span className="text-[#ff8c00]/30">✓</span>
                <span>Primera consulta gratis</span>
              </div>
            </motion.div>

            {/* Formulario derecha */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-7/12 w-full"
            >
              <div className="bg-[#08223a] rounded-3xl border border-[#ebf2f7]/5 p-8 lg:p-10">

                {submitted ? (
                  <div role="alert" className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#ff8c00]/15 border border-[#ff8c00]/30 flex items-center justify-center mx-auto mb-5">
                      <svg className="w-8 h-8 text-[#ff8c00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-[#ebf2f7] mb-2">¡Mensaje recibido!</h3>
                    <p className="text-[#ebf2f7]/50 text-sm">Te contactamos en menos de 48h.</p>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="space-y-5" aria-label="Formulario Pack Pyme">

                    <p className="text-lg font-heading font-extrabold text-[#ebf2f7] mb-2">
                      Envíanos tu <span className="text-[#ff8c00]">consulta</span>
                    </p>

                    {/* Nombre + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="py-nombre" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                          Nombre de contacto *
                        </label>
                        <input
                          id="py-nombre" type="text" required autoComplete="name"
                          placeholder="Tu nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData((f) => ({ ...f, nombre: e.target.value }))}
                          className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="py-email" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                          Email *
                        </label>
                        <input
                          id="py-email" type="email" required autoComplete="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                          className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="py-tel" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                          Teléfono (opcional)
                        </label>
                        <input
                          id="py-tel" type="tel" autoComplete="tel"
                          placeholder="+34 600 000 000"
                          value={formData.telefono}
                          onChange={(e) => setFormData((f) => ({ ...f, telefono: e.target.value }))}
                          className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="py-empresa" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                          Empresa / Web
                        </label>
                        <input
                          id="py-empresa" type="text" autoComplete="organization"
                          placeholder="tuempresa.com"
                          value={formData.empresa}
                          onChange={(e) => setFormData((f) => ({ ...f, empresa: e.target.value }))}
                          className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Servicio */}
                    <div>
                      <label htmlFor="py-servicio" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                        ¿Qué servicio te interesa? *
                      </label>
                      <select
                        id="py-servicio" required
                        value={formData.subproducto}
                        onChange={(e) => setFormData((f) => ({ ...f, subproducto: e.target.value }))}
                        className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] focus:outline-none focus:border-[#ff8c00]/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Selecciona un servicio</option>
                        {SUBPRODUCTS.map((p) => (
                          <option key={p.id} value={p.h2}>{p.h2}</option>
                        ))}
                        <option value="Pack completo">Pack completo (los 3 servicios)</option>
                      </select>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label htmlFor="py-msg" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                        Cuéntanos tu proyecto *
                      </label>
                      <textarea
                        id="py-msg" rows={4}
                        placeholder="¿Cuál es tu objetivo principal? ¿Qué retos tienes ahora mismo?"
                        value={formData.mensaje}
                        onChange={(e) => setFormData((f) => ({ ...f, mensaje: e.target.value }))}
                        className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors resize-none"
                      />
                    </div>

                    {/* RGPD */}
                    <p className="text-[11px] text-[#ebf2f7]/25 leading-relaxed">
                      He leído y acepto la{" "}
                      <a href="/privacidad" className="underline hover:text-[#ebf2f7]/50 transition-colors">Política de Privacidad</a>{" "}
                      y los{" "}
                      <a href="/terminos" className="underline hover:text-[#ebf2f7]/50 transition-colors">Términos y Condiciones</a>.
                      También puedes consultar nuestra{" "}
                      <a href="/cookies" className="underline hover:text-[#ebf2f7]/50 transition-colors">Política de Cookies</a>.
                    </p>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl font-heading font-extrabold text-base text-[#08223a] bg-[#ff8c00] hover:bg-[#ff9f20] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff8c00] focus:ring-offset-2 focus:ring-offset-[#08223a] flex items-center justify-center gap-2"
                    >
                      Enviar mensaje
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M2 8l10 0M9 4l4 4-4 4" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PymesSection;
