export interface SEOAuditResult {
  score: number;
  rating: "excellent" | "good" | "fair" | "poor";
  findings: Array<{
    category: string;
    status: "pass" | "warning" | "fail";
    message: string;
  }>;
  timestamp: Date;
}

export function calculateSEOScore(findings: SEOAuditResult["findings"]): {
  score: number;
  rating: SEOAuditResult["rating"];
} {
  const total = findings.length;
  const passes = findings.filter((f) => f.status === "pass").length;
  const score = Math.round((passes / total) * 100);

  const rating: SEOAuditResult["rating"] =
    score >= 90
      ? "excellent"
      : score >= 70
        ? "good"
        : score >= 50
          ? "fair"
          : "poor";

  return { score, rating };
}

export function generateSEOReport(
  findings: SEOAuditResult["findings"],
): string {
  const { score, rating } = calculateSEOScore(findings);

  let report = `SEO AUDIT REPORT\n`;
  report += `================\n\n`;
  report += `Overall Score: ${score}/100 (${rating.toUpperCase()})\n\n`;

  const grouped = findings.reduce(
    (acc, finding) => {
      if (!acc[finding.category]) acc[finding.category] = [];
      acc[finding.category].push(finding);
      return acc;
    },
    {} as Record<string, typeof findings>,
  );

  Object.entries(grouped).forEach(([category, items]) => {
    report += `${category}\n`;
    report += `-`.repeat(category.length) + "\n";

    items.forEach((item) => {
      const icon =
        item.status === "pass" ? "✓" : item.status === "warning" ? "⚠" : "✕";
      report += `${icon} ${item.message}\n`;
    });

    report += "\n";
  });

  return report;
}

export interface OpenGraphMeta {
  "og:title"?: string;
  "og:description"?: string;
  "og:image"?: string;
  "og:url"?: string;
  "og:type"?: string;
  "og:site_name"?: string;
  "twitter:card"?: string;
  "twitter:title"?: string;
  "twitter:description"?: string;
  "twitter:image"?: string;
}

export function generateOpenGraphTags(meta: OpenGraphMeta): string {
  const tags = Object.entries(meta)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `<meta property="${key}" content="${escapeHtml(value)}" />`,
    )
    .join("\n");

  return tags;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export interface StructuredDataSchema {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

export function generateJsonLd(schema: StructuredDataSchema): string {
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): StructuredDataSchema {
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

export function createOrganizationSchema(data: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
}): StructuredDataSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
    ...(data.contactPoint && { contactPoint: data.contactPoint }),
  };
}

export function createArticleSchema(data: {
  headline: string;
  description: string;
  image?: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
}): StructuredDataSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    ...(data.image && { image: data.image }),
    ...(data.author && { author: { "@type": "Person", name: data.author } }),
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
  };
}

export interface CanonicalOptions {
  pageUrl: string;
  preferredVersion?: "www" | "non-www" | "https";
}

export function generateCanonicalUrl(options: CanonicalOptions): string {
  let url = new URL(options.pageUrl);

  if (options.preferredVersion === "www" && !url.hostname.startsWith("www.")) {
    url.hostname = `www.${url.hostname}`;
  } else if (
    options.preferredVersion === "non-www" &&
    url.hostname.startsWith("www.")
  ) {
    url.hostname = url.hostname.substring(4);
  }

  if (options.preferredVersion === "https") {
    url.protocol = "https:";
  }

  return url.toString();
}

export interface HrefLangOptions {
  currentUrl: string;
  alternates: Array<{
    lang: string;
    url: string;
  }>;
}

export function generateHrefLangTags(options: HrefLangOptions): string {
  let tags = options.alternates
    .map(
      (alt) =>
        `<link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`,
    )
    .join("\n");

  tags += `\n<link rel="alternate" hreflang="x-default" href="${options.currentUrl}" />`;

  return tags;
}
