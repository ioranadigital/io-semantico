import { useEffect, useState } from "react";

export interface WebVitalsMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  rating: "good" | "needs-improvement" | "poor";
}

export const VITALS_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 600, poor: 1800 },
};

function rateMetric(
  value: number | null,
  good: number,
  poor: number,
): "good" | "needs-improvement" | "poor" {
  if (value === null) return "needs-improvement";
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

export function useWebVitalsTracker(): WebVitalsMetrics {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    rating: "needs-improvement",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateMetrics = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      const paint = performance.getEntriesByType("paint");
      const fcpEntry = paint.find(
        (entry) => entry.name === "first-contentful-paint",
      );

      const ttfb = navigation
        ? navigation.responseStart - navigation.fetchStart
        : null;
      const fcp = fcpEntry ? fcpEntry.startTime : null;

      setMetrics((prev) => ({
        ...prev,
        ttfb,
        fcp,
      }));
    };

    updateMetrics();

    const handleLCP = (list: PerformanceEntryList) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics((prev) => ({
        ...prev,
        lcp: (lastEntry as any).renderTime || (lastEntry as any).loadTime,
      }));
    };

    const handleCLS = (list: PerformanceEntryList) => {
      const entries = list.getEntries();
      let clsValue = 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setMetrics((prev) => ({
        ...prev,
        cls: clsValue,
      }));
    };

    try {
      const lcpObserver = new PerformanceObserver(handleLCP);
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      // LCP not supported
    }

    try {
      const clsObserver = new PerformanceObserver(handleCLS);
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      // CLS not supported
    }

    return () => {
      // Cleanup
    };
  }, []);

  const overallRating = calculateOverallRating(metrics);

  return {
    ...metrics,
    rating: overallRating,
  };
}

function calculateOverallRating(
  metrics: Omit<WebVitalsMetrics, "rating">,
): "good" | "needs-improvement" | "poor" {
  const ratings = [
    rateMetric(
      metrics.lcp,
      VITALS_THRESHOLDS.lcp.good,
      VITALS_THRESHOLDS.lcp.poor,
    ),
    rateMetric(
      metrics.fid,
      VITALS_THRESHOLDS.fid.good,
      VITALS_THRESHOLDS.fid.poor,
    ),
    rateMetric(
      metrics.cls,
      VITALS_THRESHOLDS.cls.good,
      VITALS_THRESHOLDS.cls.poor,
    ),
    rateMetric(
      metrics.fcp,
      VITALS_THRESHOLDS.fcp.good,
      VITALS_THRESHOLDS.fcp.poor,
    ),
    rateMetric(
      metrics.ttfb,
      VITALS_THRESHOLDS.ttfb.good,
      VITALS_THRESHOLDS.ttfb.poor,
    ),
  ];

  const poorCount = ratings.filter((r) => r === "poor").length;
  const goodCount = ratings.filter((r) => r === "good").length;

  if (poorCount > 0) return "poor";
  if (goodCount >= 4) return "good";
  return "needs-improvement";
}

export interface MobileCheckResult {
  hasViewportMeta: boolean;
  isMobileOptimized: boolean;
  hasResponsiveImages: boolean;
  touchTargetSize: boolean;
  readableText: boolean;
  suggestions: string[];
}

export function checkMobileOptimization(
  htmlContent: string,
): MobileCheckResult {
  const result: MobileCheckResult = {
    hasViewportMeta: /<meta\s+name="viewport"/.test(htmlContent),
    isMobileOptimized: true,
    hasResponsiveImages:
      /<img[^>]*srcset/.test(htmlContent) || /<picture>/.test(htmlContent),
    touchTargetSize: true,
    readableText: true,
    suggestions: [],
  };

  if (!result.hasViewportMeta) {
    result.suggestions.push("Add viewport meta tag for mobile optimization");
    result.isMobileOptimized = false;
  }

  if (!result.hasResponsiveImages) {
    result.suggestions.push(
      "Consider using responsive images with srcset or picture elements",
    );
  }

  const fontSizeMatches =
    htmlContent.match(/<[^>]*style="[^"]*font-size:\s*(\d+)/gi) || [];
  if (
    fontSizeMatches.some((match) => {
      const size = parseInt(match.match(/\d+/)![0]);
      return size < 12;
    })
  ) {
    result.suggestions.push(
      "Some text is too small on mobile devices (minimum 12px recommended)",
    );
    result.readableText = false;
  }

  return result;
}

export interface PerformanceMetricsData {
  domContentLoaded: number | null;
  loadComplete: number | null;
  resourceCount: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  totalSize: number;
}

export function getPerformanceMetrics(): PerformanceMetricsData {
  if (typeof window === "undefined") {
    return {
      domContentLoaded: null,
      loadComplete: null,
      resourceCount: 0,
      jsSize: 0,
      cssSize: 0,
      imageSize: 0,
      totalSize: 0,
    };
  }

  const navigation = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  const resources = performance.getEntriesByType("resource");

  let jsSize = 0;
  let cssSize = 0;
  let imageSize = 0;

  resources.forEach((resource: any) => {
    if (resource.name.endsWith(".js")) {
      jsSize += resource.transferSize || 0;
    } else if (resource.name.endsWith(".css")) {
      cssSize += resource.transferSize || 0;
    } else if (/\.(jpg|jpeg|png|webp|avif|svg)$/i.test(resource.name)) {
      imageSize += resource.transferSize || 0;
    }
  });

  return {
    domContentLoaded: navigation?.domContentLoadedEventEnd
      ? navigation.domContentLoadedEventEnd - navigation.fetchStart
      : null,
    loadComplete: navigation?.loadEventEnd
      ? navigation.loadEventEnd - navigation.fetchStart
      : null,
    resourceCount: resources.length,
    jsSize,
    cssSize,
    imageSize,
    totalSize: jsSize + cssSize + imageSize,
  };
}

export interface SitemapPingConfig {
  sitemapUrl: string;
  searchEngines: Array<{
    name: string;
    pingUrl: string;
  }>;
}

export const defaultSearchEngines = [
  {
    name: "Google",
    pingUrl: "https://www.google.com/ping?sitemap=",
  },
  {
    name: "Bing",
    pingUrl: "https://www.bing.com/ping?sitemap=",
  },
  {
    name: "Yandex",
    pingUrl: "https://www.yandex.com/ping?sitemap=",
  },
];

export async function pingSitemapToSearchEngines(
  sitemapUrl: string,
  engines: typeof defaultSearchEngines = defaultSearchEngines,
): Promise<Array<{ engine: string; success: boolean; error?: string }>> {
  const results: Array<{ engine: string; success: boolean; error?: string }> =
    [];

  for (const engine of engines) {
    try {
      const pingUrl = `${engine.pingUrl}${encodeURIComponent(sitemapUrl)}`;
      const response = await fetch(pingUrl, { method: "GET" });
      results.push({
        engine: engine.name,
        success: response.ok,
      });
    } catch (error) {
      results.push({
        engine: engine.name,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return results;
}

export interface RobotsMetaValidation {
  noindex: boolean;
  nofollow: boolean;
  nosnippet: boolean;
  suggestions: string[];
}

export function validateRobotsMeta(htmlContent: string): RobotsMetaValidation {
  const robotsMetaRegex = /<meta\s+name="robots"\s+content="([^"]*)"/i;
  const match = htmlContent.match(robotsMetaRegex);
  const content = match ? match[1].toLowerCase() : "";

  const result: RobotsMetaValidation = {
    noindex: content.includes("noindex"),
    nofollow: content.includes("nofollow"),
    nosnippet: content.includes("nosnippet"),
    suggestions: [],
  };

  if (result.noindex) {
    result.suggestions.push(
      "Page is blocked from indexing with noindex meta tag",
    );
  }
  if (result.nofollow) {
    result.suggestions.push(
      "Page is blocked from following links with nofollow meta tag",
    );
  }
  if (!content) {
    result.suggestions.push("Consider adding explicit robots meta tag");
  }

  return result;
}

export function generateSitemap(
  urls: Array<{
    url: string;
    lastmod?: string;
    priority?: number;
    changefreq?: string;
  }>,
): string {
  const urlEntries = urls
    .map(
      (item) => `
  <url>
    <loc>${item.url}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ""}
    ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ""}
    ${item.priority ? `<priority>${item.priority}</priority>` : ""}
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}
