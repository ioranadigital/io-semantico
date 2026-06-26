// SEO Configuration y utilidades
export const siteConfig = {
  name: "IoranaSEO",
  description:
    "Agencia de marketing digital especializada en SEO, Google Ads, Facebook Ads y más",
  url: "https://iorana.dev",
  ogImage: "https://iorana.dev/og-image.png",
  links: {
    twitter: "https://twitter.com/iorana",
    linkedin: "https://linkedin.com/company/iorana",
  },
};

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  canonical?: string;
}

export function generateMetadata(seo: SEOMetadata) {
  return {
    title: `${seo.title} | ${siteConfig.name}`,
    description: seo.description,
    keywords: seo.keywords?.join(", "),
    canonical: seo.canonical || siteConfig.url,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: seo.ogType || "website",
      url: seo.canonical || siteConfig.url,
      images: [
        {
          url: seo.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || siteConfig.ogImage],
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IoranaSEO",
    url: siteConfig.url,
    logo: "https://iorana.dev/logo.png",
    description: siteConfig.description,
    sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Address",
      addressLocality: "Your City",
      addressCountry: "ES",
    },
    contact: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "honatuya@gmail.com",
      telephone: "+34-XXX-XXX-XXX",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  price?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    image: service.image,
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "EUR",
      },
    }),
  };
}
