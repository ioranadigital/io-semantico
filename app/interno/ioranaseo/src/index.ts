// Export performance utilities and types
export {
  useWebVitals,
  getCacheHeaders,
  optimizeImageUrl,
  compressImage,
} from "@/lib/performance";
export type {
  CacheConfig,
  ImageOptimizationOptions,
  PerformanceMetrics,
} from "@/lib/performance";

// Export content analysis utilities and types
export {
  validateH1,
  analyzeKeywordDensity,
  analyzeInternalLinks,
  validateAndGenerateMetaDescription,
  generateMetaDescriptionOptions,
} from "@/lib/content";
export type {
  H1ValidationResult,
  KeywordMetrics,
  KeywordAnalysisResult,
  InternalLink,
  InternalLinkingAnalysis,
  MetaDescriptionValidation,
} from "@/lib/content";

// Export technical SEO utilities and types
export {
  useWebVitalsTracker,
  checkMobileOptimization,
  getPerformanceMetrics,
  pingSitemapToSearchEngines,
  validateRobotsMeta,
  generateSitemap,
  defaultSearchEngines,
  VITALS_THRESHOLDS,
} from "@/lib/technical-seo";
export type {
  WebVitalsMetrics,
  MobileCheckResult,
  PerformanceMetricsData,
  SitemapPingConfig,
  RobotsMetaValidation,
} from "@/lib/technical-seo";

// Export SEO utilities and types
export {
  calculateSEOScore,
  generateSEOReport,
  generateOpenGraphTags,
  generateJsonLd,
  createBreadcrumbSchema,
  createOrganizationSchema,
  createArticleSchema,
  generateCanonicalUrl,
  generateHrefLangTags,
} from "@/lib/seo-utils";
export type {
  SEOAuditResult,
  OpenGraphMeta,
  StructuredDataSchema,
  CanonicalOptions,
  HrefLangOptions,
} from "@/lib/seo-utils";

// Export React components
export { OptimizedImage, ResponsiveImage } from "@/components/OptimizedImage";
export { WebVitalsMonitor } from "@/components/WebVitalsMonitor";
export { PerformanceMetrics } from "@/components/PerformanceMetrics";
export { ContentAnalyzer } from "@/components/ContentAnalyzer";
export { SEODashboard } from "@/components/SEODashboard";
