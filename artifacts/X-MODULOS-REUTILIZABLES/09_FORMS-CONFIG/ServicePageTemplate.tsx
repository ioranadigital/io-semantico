// components/ServicePageTemplate.tsx
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronDown } from "lucide-react";
import ServiceContactForm from "@/components/ServiceContactForm";

// Colores extraídos de globals.css — body: #0a2b49 / text: #ebf2f7
// Panel más oscuro: #07213a  |  Panel elevado: #0d3355
// Borde sutil: rgba(255,255,255,0.08)
const C = {
  bg:          "bg-[#0a2b49]",
  panel:       "bg-[#07213a]",
  panelAlt:    "bg-[#0d3355]",
  border:      "border-white/10",
  text:        "text-[#ebf2f7]",
  muted:       "text-[#7fa8c9]",
  accent:      "text-[#ff8c00]",
  accentBg:    "bg-[#ff8c00]",
  accentHover: "hover:bg-[#e67e00]",
} as const;

/* ─── TIPOS ─────────────────────────────────────────────── */
export interface ServicePageData {
  meta: { title: string; description: string; ogImage?: string };
  hero: {
    title: string;
    subtitle: string;
    whyPoints: string[];
    ctaLabel?: string;
    ctaHref?: string;
  };
  includes: { text: string }[];
  process:  { title: string; description: string }[];
  results:  { value: string; label: string }[];
  faq:      { q: string; a: string }[];
  form?:    { endpoint: string };
}

/* ─── METADATA ───────────────────────────────────────────── */
export function buildMetadata(data: ServicePageData): Metadata {
  return {
    title: `${data.meta.title} | IORANA Digital`,
    description: data.meta.description,
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      images: data.meta.ogImage ? [data.meta.ogImage] : [],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: data.meta.title },
  };
}

/* ─── HELPER: primera palabra blanca, resto naranja ─────── */
function SplitTitle({ text, center = false, size = "text-3xl md:text-4xl" }: { text: string; center?: boolean; size?: string }) {
  const words = text.trim().split(" ");
  const first = words[0];
  const rest  = words.slice(1).join(" ");
  return (
    <span className={`block font-extrabold leading-tight ${size} ${center ? "text-center" : ""}`}>
      <span className="text-white">{first}</span>
      {rest && <> <span className="text-[#ff8c00]">{rest}</span></>}
    </span>
  );
}

/* ─── TEMPLATE ───────────────────────────────────────────── */
export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const { hero, includes, process, results, faq } = data;

  return (
    <main className={`w-full ${C.bg} ${C.text} font-body pt-20`}>

      {/* ── HERO + QUÉ INCLUYE ── */}
      <section
        aria-label="Presentación del servicio"
        className="max-w-5xl mx-auto px-6 pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        {/* Columna izquierda: título + subtítulo */}
        <div className="flex flex-col gap-8">
          <div>
            <span
              aria-hidden="true"
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${C.panel} border ${C.border} ${C.muted} mb-5`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </span>
            {/* H1: primera palabra blanca, resto naranja, dos líneas */}
            <h1 className="mb-4">
              <SplitTitle text={hero.title} size="text-5xl md:text-6xl" />
            </h1>
            <p className={`${C.muted} text-base`}>{hero.subtitle}</p>
          </div>
        </div>

        {/* Columna derecha: card ¿Por qué importa? + CTA */}
        <div className="flex flex-col gap-4">
          <aside
            aria-label="Por qué importa"
            className="bg-[#0d3355] border border-[#ebf2f7]/25 rounded-xl p-7"
          >
            {/* Título más grande con icono */}
            <h2 className={`flex items-center gap-2 text-xl font-bold ${C.text} mb-5`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#ff8c00] shrink-0" aria-hidden="true">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
              </svg>
              ¿Por qué <em className={`not-italic ${C.accent} ml-1`}>importa</em>?
            </h2>
            <ul role="list" className="space-y-4">
              {hero.whyPoints.map((p, i) => (
                <li key={i} className={`flex items-start gap-3 text-sm ${C.text}`}>
                  <span aria-hidden="true" className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#ff8c00] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </aside>

          {/* Botón CTA debajo del card — fondo claro, texto oscuro */}
          <Link
            href={hero.ctaHref ?? "#contacto"}
            className="block w-full text-center py-3 px-5 rounded-xl bg-[#ebf2f7] hover:bg-white text-[#07213a] text-sm font-semibold transition-colors"
          >
            {hero.ctaLabel ?? "Solicítanos Más Información"} →
          </Link>
        </div>
      </section>

      {/* ── QUÉ INCLUYE — ancho completo, 3 columnas ── */}
      <section aria-labelledby="includes-title-full" className="max-w-5xl mx-auto px-6 pb-16">
        <h2 id="includes-title-full" className="mb-6">
          <SplitTitle text="¿Qué incluye?" size="text-2xl md:text-3xl" />
        </h2>
        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {includes.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-[#0d3355] border border-[#ebf2f7]/20 rounded-xl px-5 py-4 text-sm text-[#ebf2f7]"
            >
              <CheckCircle2 size={18} className="text-[#ff8c00] shrink-0 mt-0.5" aria-hidden="true" />
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      {/* ── PROCESO ── */}
      <section aria-labelledby="process-title" className="w-full max-w-5xl mx-auto px-6 py-16">
        <h2 id="process-title" className="text-center mb-10">
          <SplitTitle text="Nuestro proceso" center size="text-3xl md:text-4xl" />
        </h2>
        <ol role="list" className="flex flex-col gap-4">
          {process.map((step, i) => (
            <li key={i} className={`flex items-start gap-5 ${C.panel} border ${C.border} rounded-xl px-6 py-5`}>
              <span
                aria-label={`Paso ${i + 1}`}
                className={`shrink-0 w-9 h-9 rounded-full ${C.accentBg} text-white font-extrabold text-sm flex items-center justify-center font-mono`}
              >
                {i + 1}
              </span>
              <div>
                <h3 className={`text-base font-bold ${C.text} mb-1`}>{step.title}</h3>
                <p className={`text-sm ${C.muted}`}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── RESULTADOS ── */}
      <section aria-labelledby="results-title" className={`w-full ${C.bg} py-16 px-6 text-center`}>
        <h2 id="results-title" className="mb-10">
          <SplitTitle text="Resultados reales" center size="text-3xl md:text-4xl" />
        </h2>
        <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {results.map((r, i) => (
            <li key={i} className="flex flex-col gap-1">
              <strong className={`text-4xl font-black ${C.accent}`}>{r.value}</strong>
              <span className={`text-xs ${C.muted} uppercase tracking-widest`}>{r.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ + CONTACTO — layout 2 columnas ── */}
      <section
        id="contacto"
        aria-labelledby="faq-title"
        className="w-full max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Columna izquierda: FAQs ── */}
          <div>
            <h2 id="faq-title" className="mb-8">
              <SplitTitle text="Preguntas frecuentes" size="text-3xl md:text-4xl" />
            </h2>
            <dl className="flex flex-col gap-3">
              {faq.map((item, i) => (
                <div key={i} className={`${C.panel} border ${C.border} rounded-xl overflow-hidden`}>
                  <details>
                    <summary className={`flex justify-between items-center px-5 py-4 cursor-pointer text-sm font-semibold ${C.text} list-none [&::-webkit-details-marker]:hidden`}>
                      {item.q}
                      <ChevronDown size={18} aria-hidden="true" className={`${C.muted} shrink-0 transition-transform duration-200`} />
                    </summary>
                    <dd className={`px-5 pb-4 text-sm ${C.muted} m-0`}>{item.a}</dd>
                  </details>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Columna derecha: Formulario ── */}
          <div className="lg:sticky lg:top-28">
            <h2 className={`text-3xl md:text-4xl font-extrabold ${C.text} mb-2`}>
              ¿Tienes <span className="text-[#ff8c00]">preguntas?</span>
            </h2>
            <p className={`${C.muted} text-sm mb-6`}>
              Estaremos encantados de responderte. Contáctanos y estudiaremos tu caso sin compromiso.
            </p>
            <div className="bg-[#07213a] border border-white/15 rounded-2xl p-7">
              <ServiceContactForm service={hero.title} />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

// ContactForm eliminado — usar ServiceContactForm desde @/components/ServiceContactForm
