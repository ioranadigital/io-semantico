// ═══════════════════════════════════════════════════════════
// IORANA DIGITAL — Metadatos SEO · Landing Pack Pyme
// Ubicación sugerida: app/servicios/pymes/page.tsx (Next.js App Router)
// ═══════════════════════════════════════════════════════════

import type { Metadata } from "next";

// ── 1. METADATA (Next.js 14+ App Router) ────────────────────
export const metadata: Metadata = {
  // Title optimizado: keyword principal | marca
  title: "Pack Digital para Pymes | Google Maps · Web · Soporte — Iorana Digital",

  description:
    "Solución digital integral para pequeñas y medianas empresas: posicionamiento en Google Maps, web de alta conversión y soporte directo con consultor senior. Sin permanencia. Resultados en 90 días.",

  // Canonical — evita contenido duplicado
  alternates: {
    canonical: "https://iorana.digital/servicios/pymes",
  },

  // Open Graph (LinkedIn / Facebook / WhatsApp preview)
  openGraph: {
    title: "Pack Digital para Pymes — Iorana Digital",
    description:
      "Google Maps · Web de Alta Conversión · Soporte Directo. Todo lo que necesita tu pyme para crecer online.",
    url: "https://iorana.digital/servicios/pymes",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://iorana.digital/og/pymes-pack.jpg", // 1200×630 px
        width: 1200,
        height: 630,
        alt: "Pack Digital para Pymes — Iorana Digital",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Pack Digital para Pymes — Iorana Digital",
    description:
      "Google Maps + Web de Alta Conversión + Soporte Directo. Sin permanencia.",
    images: ["https://iorana.digital/og/pymes-pack.jpg"],
    site: "@ioranadigital",
  },

  // Robots: indexable, sin parámetros de rastreo
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // Idioma y región (E-E-A-T)
  other: {
    "content-language": "es-ES",
  },
};

// ── 2. JSON-LD SCHEMAS (para <head> del layout) ─────────────
// Copia este array en un componente <SchemaBlock> e inyéctalo
// en el <head> via next/script o directamente en layout.tsx

export const PYMES_SCHEMAS = [

  // 2a. BreadcrumbList — silo semántico
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://iorana.digital",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://iorana.digital/servicios",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pack Digital para Pymes",
        item: "https://iorana.digital/servicios/pymes",
      },
    ],
  },

  // 2b. Organization (Home) — E-E-A-T core entity
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://iorana.digital/#organization",
    name: "Iorana Digital",
    url: "https://iorana.digital",
    logo: "https://iorana.digital/logo.svg",
    inLanguage: "es-ES",
    knowsAbout: [
      "SEO Técnico",
      "Inteligencia Artificial Estratégica",
      "Next.js",
      "Automatización de Marketing",
      "Google Business Profile",
      "Posicionamiento Local",
    ],
    sameAs: [
      "https://www.linkedin.com/company/iorana-digital",
      "https://twitter.com/ioranadigital",
      "https://www.instagram.com/ioranadigital",
      "https://www.facebook.com/ioranadigital",
      // Google Business URL cuando esté verificada
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "Spanish",
      contactOption: "TollFree",
    },
  },

  // 2c. Service — subproductos pyme
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://iorana.digital/servicios/pymes#pack-pyme",
    name: "Pack Digital Pyme",
    provider: { "@id": "https://iorana.digital/#organization" },
    description:
      "Servicio de digitalización integral para pymes españolas: posicionamiento Google Maps, web de alta conversión y soporte digital directo con consultor senior.",
    serviceType: [
      "Posicionamiento en Google Maps",
      "Diseño Web de Alta Conversión",
      "Consultoría Digital",
      "Soporte Técnico Web",
    ],
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    inLanguage: "es-ES",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Subproductos Pack Pyme",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Posicionamiento en Google Maps",
            description:
              "Optimización completa de ficha Google Business Profile para aparecer en el pack local de Google Maps.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web de Alta Conversión para Pymes",
            description:
              "Landing page semántica con arquitectura de conversión, Core Web Vitals verde y SEO on-page integrado.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Soporte Directo sin Intermediarios",
            description:
              "Consultor senior dedicado con respuesta en < 4 horas por WhatsApp Business y reuniones mensuales de seguimiento.",
          },
        },
      ],
    },
  },

  // 2d. FAQPage — posición cero y AI snippets
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto tarda en verse el resultado en Google Maps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La ficha se optimiza en las primeras 72 horas. El posicionamiento orgánico en el pack local empieza a moverse entre la semana 3 y la semana 6, dependiendo de la competencia en tu zona.",
        },
      },
      {
        "@type": "Question",
        name: "¿La web incluye alojamiento y dominio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. El primer año el dominio y el hosting en servidor europeo están incluidos en todos los planes Pyme, sin costes ocultos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Funciona para cualquier tipo de negocio local?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabajamos con clínicas, talleres, comercios, restaurantes, despachos y servicios B2B. Si tienes clientes en un radio geográfico concreto, nuestra metodología aplica.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa si ya tengo una web?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Auditamos la web actual sin coste. Si es recuperable la optimizamos; si no, proponemos una migración limpia sin perder el posicionamiento existente.",
        },
      },
    ],
  },
];

// ── 3. INTEGRACIÓN EN LAYOUT (Next.js App Router) ───────────
/*
  En app/servicios/pymes/page.tsx:

  import { PYMES_SCHEMAS } from "./metadata";

  export default function PymesPage() {
    return (
      <>
        {PYMES_SCHEMAS.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <PymesSection />
      </>
    );
  }
*/

// ── 4. CHECKLIST DE AUDITORÍA SEO TÉCNICO ───────────────────
/*
  □ <html lang="es-ES"> — variante regional confirmada
  □ <link rel="canonical" href="https://iorana.digital/servicios/pymes">
  □ Preconnect a fonts / CDN si se usan recursos externos
  □ Preload del hero image: <link rel="preload" as="image" href="/hero-pymes.webp" fetchpriority="high">
  □ robots.txt: Google-Extended Allow: / (para SGE/AI Overviews)
  □ humans.txt: actualizado con autor técnico del proyecto
  □ <meta name="author" content="Iorana Digital">
  □ rel="me" en los enlaces a perfiles sociales de la Home
  □ Todos los <img> con alt descriptivo (no vacío)
  □ aria-label en todos los botones sin texto visible
  □ Core Web Vitals: LCP < 2.5s · INP < 200ms · CLS < 0.1
  □ Formulario: no usa <form> nativo con action (manejo por onSubmit en React)
  □ RGPD: checkbox de consentimiento activo antes del envío
*/
