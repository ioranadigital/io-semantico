# SEO Advanced Implementation — Pasos 4, 5, 6

**Proyecto**: IoranaSEO  
**Fecha**: 2026-06-19  
**Status**: ✅ Implementado

---

## PASO 4: PERFORMANCE ⚡

### Archivos Creados

#### `src/lib/performance.ts`

Librerías para optimización de performance:

- **`getCacheHeaders(strategy)`** — Retorna headers HTTP optimizados para cache
  - Estrategias: `static`, `html`, `api`, `image`
  - Soporta: `max-age`, `stale-while-revalidate`, `stale-if-error`

- **`optimizeImageUrl(src, options)`** — Genera URLs optimizadas de imágenes
  - Parámetros: width, height, quality, format (webp/avif/auto), priority
  - Uso: `optimizeImageUrl('/image.jpg', { width: 800, height: 600, quality: 75 })`

- **`useWebVitals()`** — Hook para monitoreo en cliente
  - Retorna: `{ lcp, fid, cls, fcp, ttfb }`
  - Metrics: LCP, FCP, FID, CLS, TTFB

- **`compressImage(file, quality)`** — Comprime imágenes a WebP
  - Async/Promise-based
  - Quality: 0-1 (default: 0.8)

#### `src/components/OptimizedImage.tsx`

Componentes para imágenes optimizadas:

- **`<OptimizedImage />`** — Wrapper de Next.js Image
  - Props: src, alt, width, height, priority, quality, sizes, fill
  - Lazy loading automático

- **`<ResponsiveImage />`** — Imagen responsiva con srcSet
  - Breakpoints: 640px, 1024px, 1280px
  - Automatic sizing

### Configuración en `next.config.mjs`

```javascript
// Image optimization
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}

// Cache headers
- Static assets: 1 year (immutable)
- Images: 1 year (stale-while-revalidate)
- Fonts: 1 year (immutable)
- HTML: 0s (stale-while-revalidate 3600s)
- API: 60s (stale-while-revalidate 300s)

// Code splitting
- vendor chunk: 100+ KB
- seo-lib chunk: Separado
- react-vendor: Prioritario
```

### Uso

```typescript
import { OptimizedImage, useWebVitals, compressImage } from '@/lib/performance';

// En componente
const metrics = useWebVitals();
console.log(metrics); // { lcp: 2100, fcp: 1200, ... }

// Imagen optimizada
<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>

// Comprimir imagen
const blob = await compressImage(file, 0.85);
```

---

## PASO 5: CONTENIDO & KEYWORDS 📝

### Archivos Creados

#### `src/lib/content.ts`

Analizadores de contenido y palabras clave:

- **`validateH1(htmlContent)`** — Valida tag H1
  - Returns: `{ isPresent, content, length, isOptimal, suggestions }`
  - Checks: Presencia, longitud (30-60 chars), unicidad

- **`analyzeKeywordDensity(content, keyword)`** — Analiza densidad de keywords
  - Returns: `{ totalWords, keywords[], mainKeyword, suggestions }`
  - Optimal range: 0.5% - 2.5%

- **`analyzeInternalLinks(htmlContent, baseUrl)`** — Mapea enlaces internos
  - Returns: `{ totalInternalLinks, uniqueLinkedPages, links[], suggestions }`
  - Detecta: URLs, texto de enlace, fragmentos

- **`validateAndGenerateMetaDescription(title, content, custom?)`** — Valida/genera meta description
  - Range óptimo: 120-160 caracteres
  - Genera 3 opciones si no existe

#### `src/components/ContentAnalyzer.tsx`

Componente visual para análisis de contenido:

- Panel de análisis H1
- Panel de densidad de keywords
- Panel de meta description
- Sugerencias en tiempo real

### Uso

```typescript
import {
  validateH1,
  analyzeKeywordDensity,
  analyzeInternalLinks,
} from "@/lib/content";

// Validar H1
const h1 = validateH1("<h1>My Title</h1>");
// { isPresent: true, length: 8, isOptimal: false, suggestions: [...] }

// Analizar keywords
const kw = analyzeKeywordDensity("contenido...", "python");
// { totalWords: 150, keywords: [{keyword: 'python', density: 1.33, count: 2}] }

// Analizar enlaces internos
const links = analyzeInternalLinks(html, "https://example.com");
// { totalInternalLinks: 5, uniqueLinkedPages: Set(4), suggestions: [...] }
```

---

## PASO 6: TECHNICAL SEO 🔧

### Archivos Creados

#### `src/lib/technical-seo.ts`

Herramientas para technical SEO:

- **`useWebVitalsTracker()`** — Hook para Core Web Vitals
  - Returns: `{ lcp, fid, cls, fcp, ttfb, rating }`
  - Rating: 'good' | 'needs-improvement' | 'poor'
  - Thresholds built-in

- **`checkMobileOptimization(htmlContent)`** — Valida mobile readiness
  - Checks: viewport meta, responsive images, text size, touch targets
  - Returns: `{ hasViewportMeta, isMobileOptimized, suggestions[] }`

- **`getPerformanceMetrics()`** — Extrae métricas de performance
  - Returns: `{ domContentLoaded, loadComplete, resourceCount, jsSize, cssSize, imageSize }`

- **`pingSitemapToSearchEngines(url, engines?)`** — Notifica sitemap a buscadores
  - Soporta: Google, Bing, Yandex
  - Async, retorna resultados

- **`validateRobotsMeta(htmlContent)`** — Valida meta robots
  - Checks: noindex, nofollow, nosnippet
  - Returns: `{ noindex, nofollow, nosnippet, suggestions[] }`

- **`generateSitemap(urls)`** — Genera XML sitemap
  - Input: Array con `{ url, lastmod?, priority?, changefreq? }`
  - Output: XML válido para search engines

#### `src/components/WebVitalsMonitor.tsx`

Monitor visual de Core Web Vitals:

- Badge para cada métrica (LCP, FCP, FID, CLS, TTFB)
- Color coding: green (good), yellow (needs-improvement), red (poor)
- Umbrales según Google standards

#### `src/components/PerformanceMetrics.tsx`

Dashboard de métricas de performance:

- DOM Content Loaded time
- Load Complete time
- Resource count
- Asset breakdown (JS, CSS, Images)
- Gráficos de distribución
- Recomendaciones automáticas

#### `src/components/SEODashboard.tsx`

Dashboard consolidado con 4 tabs:

1. **Web Vitals** — Monitoreo de Core Web Vitals
2. **Performance** — Análisis de assets y timing
3. **Mobile** — Checklist de mobile optimization
4. **Technical** — Robots meta, internal links, sitemap

### Uso

```typescript
import {
  useWebVitalsTracker,
  checkMobileOptimization,
  pingSitemapToSearchEngines,
  generateSitemap,
} from "@/lib/technical-seo";

// Track Web Vitals
const vitals = useWebVitalsTracker();
if (vitals.lcp > 2500) console.warn("LCP is slow");

// Check mobile
const mobile = checkMobileOptimization(html);
console.log(mobile.suggestions);

// Ping sitemap
const results = await pingSitemapToSearchEngines(
  "https://example.com/sitemap.xml",
);

// Generate sitemap
const xml = generateSitemap([
  { url: "https://example.com", changefreq: "weekly", priority: 1.0 },
  { url: "https://example.com/blog", changefreq: "daily", priority: 0.8 },
]);
```

---

## ARCHIVO ADICIONAL: `src/lib/seo-utils.ts`

Utilidades avanzadas de SEO:

- **`calculateSEOScore(findings)`** — Score 0-100 con rating
- **`generateSEOReport(findings)`** — Reporte en texto
- **`generateOpenGraphTags(meta)`** — Tags OG/Twitter
- **`generateJsonLd(schema)`** — Schema.org JSON-LD
- **`createBreadcrumbSchema(items)`** — Schema breadcrumb
- **`createOrganizationSchema(data)`** — Schema organización
- **`createArticleSchema(data)`** — Schema artículo
- **`generateCanonicalUrl(options)`** — URL canónica
- **`generateHrefLangTags(options)`** — Tags hreflang

---

## ARCHIVO ÍNDICE: `src/index.ts`

Exporta todas las librerías y componentes:

```typescript
import {
  OptimizedImage,
  validateH1,
  useWebVitalsTracker,
  WebVitalsMonitor,
  SEODashboard,
  generateJsonLd,
  // ... más
} from "@/index";
```

---

## Validación

```bash
# Tipo checking
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Dev
pnpm dev  # Puerto 3005
```

---

## Checklist de Implementación

- ✅ Paso 4: Performance (images, cache, code splitting)
- ✅ Paso 5: Content (H1, keywords, meta, internal links)
- ✅ Paso 6: Technical SEO (web vitals, mobile, robots, sitemap)
- ✅ next.config.mjs actualizado (cache headers, code splitting)
- ✅ Componentes visuales (5 componentes)
- ✅ Librerías de utilidades (4 módulos)
- ✅ Exports centralizados (index.ts)

---

## SLA

- Implementación: ✅ 100% completada
- Testing: Pendiente (manual o playwright)
- Deployment: Ready para staging

---

**Versión**: 1.0  
**Status**: ✅ Operacional  
**Última actualización**: 2026-06-19
