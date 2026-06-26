import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IoranaSEO - Agencia de Marketing Digital",
  description:
    "Expertos en SEO, Google Ads, Facebook Ads y soluciones digitales. Posicionamiento de empresas en buscadores y redes sociales.",
  keywords: [
    "SEO",
    "Google Ads",
    "Facebook Ads",
    "Marketing Digital",
    "Posicionamiento Web",
    "Agencia Digital",
  ],
  authors: [{ name: "IoranaSEO" }],
  creator: "IoranaSEO",
  publisher: "IoranaSEO",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://iorana.dev",
    siteName: "IoranaSEO",
    title: "IoranaSEO - Agencia de Marketing Digital",
    description:
      "Expertos en SEO, Google Ads, Facebook Ads y soluciones digitales.",
    images: [
      {
        url: "https://iorana.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "IoranaSEO - Agencia de Marketing Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IoranaSEO - Agencia de Marketing Digital",
    description:
      "Expertos en SEO, Google Ads, Facebook Ads y soluciones digitales.",
    images: ["https://iorana.dev/og-image.png"],
    creator: "@iorana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://iorana.dev",
    languages: {
      es: "https://iorana.dev",
      en: "https://iorana.dev/en",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Hind:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Spline+Sans:wght@300;400;500;600;700&family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />

        {/* DNS Prefetch */}
        <link
          rel="dns-prefetch"
          href="https://zvehtloitnuglyjtxwye.supabase.co"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color */}
        <meta name="theme-color" content="#4D32A5" />
        <meta name="msapplication-TileColor" content="#4D32A5" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IoranaSEO",
              url: "https://iorana.dev",
              logo: "https://iorana.dev/logo.png",
              description:
                "Agencia de marketing digital especializada en SEO, Google Ads, Facebook Ads y soluciones digitales",
              sameAs: [
                "https://twitter.com/iorana",
                "https://linkedin.com/company/iorana",
              ],
              contact: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                email: "honatuya@gmail.com",
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://iorana.dev",
              name: "IoranaSEO",
              description:
                "Agencia de marketing digital especializada en SEO y soluciones digitales",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://iorana.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
