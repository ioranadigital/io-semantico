// ── Core Web Vitals definitions (2026 thresholds) ──────────────────────────
export const CWV_METRICS = [
  { key: 'LCP',  label: 'LCP',        good: 2500, needs: 4000, unit: 's',  div: 1000, dec: 2, psi: 'largest-contentful-paint',   desc: 'Largest Contentful Paint' },
  { key: 'INP',  label: 'INP',        good: 200,  needs: 500,  unit: 'ms', div: 1,    dec: 0, psi: 'interaction-to-next-paint',   desc: 'Interaction to Next Paint · reemplaza FID desde 2024' },
  { key: 'CLS',  label: 'CLS',        good: 0.1,  needs: 0.25, unit: '',   div: 1,    dec: 3, psi: 'cumulative-layout-shift',     desc: 'Cumulative Layout Shift' },
  { key: 'FCP',  label: 'FCP',        good: 1800, needs: 3000, unit: 's',  div: 1000, dec: 2, psi: 'first-contentful-paint',      desc: 'First Contentful Paint' },
  { key: 'TTFB', label: 'TTFB',       good: 800,  needs: 1800, unit: 's',  div: 1000, dec: 2, psi: 'server-response-time',        desc: 'Time to First Byte' },
  { key: 'SI',   label: 'Speed Index', good: 3400, needs: 5800, unit: 's',  div: 1000, dec: 2, psi: 'speed-index',                 desc: 'Speed Index' },
]

// ── Lighthouse audits → on-page ──────────────────────────────────────────
export const ONPAGE_AUDITS = [
  { label: 'Title tag presente y único',         key: 'document-title' },
  { label: 'Meta description presente',           key: 'meta-description' },
  { label: 'Links con texto descriptivo',         key: 'link-text' },
  { label: 'Imágenes con alt text',               key: 'image-alt' },
  { label: 'robots.txt válido',                   key: 'robots-txt' },
  { label: 'Links rastreables',                   key: 'crawlable-anchors' },
  { label: 'hreflang válido',                     key: 'hreflang' },
  { label: 'Viewport configurado',                key: 'viewport' },
  { label: 'HTTPS en uso',                        key: 'is-on-https' },
  { label: 'Sin plugins obsoletos',               key: 'plugins' },
  { label: 'Charset declarado',                   key: 'charset' },
  { label: 'Errores en consola',                  key: 'errors-in-console' },
]

// ── Lighthouse audits → técnico ──────────────────────────────────────────
export const TECNICO_AUDITS = [
  { label: 'Compresión Brotli / GZIP',            key: 'uses-text-compression' },
  { label: 'Imágenes en WebP / AVIF',             key: 'modern-image-formats' },
  { label: 'Lazy loading en imágenes',             key: 'offscreen-images' },
  { label: 'Recursos render-blocking',             key: 'render-blocking-resources' },
  { label: 'CSS no utilizado',                    key: 'unused-css-rules' },
  { label: 'JavaScript no utilizado',             key: 'unused-javascript' },
  { label: 'Caché eficiente (long TTL)',           key: 'uses-long-cache-ttl' },
  { label: 'Tamaño de imágenes optimizado',        key: 'uses-responsive-images' },
  { label: 'font-display: swap',                  key: 'font-display' },
  { label: 'Preconnect a dominios clave',          key: 'uses-rel-preconnect' },
  { label: 'HTTP/2 activo',                       key: 'uses-http2' },
  { label: 'Total Blocking Time',                 key: 'total-blocking-time' },
  { label: 'Imágenes con dimensiones width/height', key: 'unsized-images' },
  { label: 'Elemento LCP precargado (fetchpriority)', key: 'prioritize-lcp-image' },
  { label: 'Animaciones CSS eficientes',          key: 'non-composited-animations' },
  { label: 'Evitar document.write()',             key: 'no-document-write' },
  { label: 'JavaScript legado (no ES5)',          key: 'legacy-javascript' },
  { label: 'Recursos de terceros con impacto',    key: 'third-party-summary' },
  { label: 'Tiempo de CPU en hilo principal',     key: 'mainthread-work-breakdown' },
  { label: 'Tamaño del DOM (nodos excesivos)',    key: 'dom-size' },
  { label: 'Solicitudes de red minimizadas',      key: 'network-requests' },
  { label: 'Peso total de la página',             key: 'total-byte-weight' },
  { label: 'Profundidad de solicitudes críticas', key: 'critical-request-chains' },
  { label: 'Evitar múltiples redirects',          key: 'redirects' },
]

// ── Manual checklist (147 variables) ────────────────────────────────────
export const MANUAL_CHECKLIST = [
  {
    cat: 'Rastreabilidad',
    items: [
      'robots.txt presente y sin bloqueos críticos',
      'Sitemap XML existente y enviado a GSC',
      'URLs en sitemap indexadas (≥ 95%)',
      'Errores 4xx ≤ 1% del total de URLs',
      'Errores 5xx = 0%',
      'Sin cadenas de redirección (máx. 1 salto)',
      'Páginas huérfanas = 0%',
      'Profundidad de rastreo ≤ 3 clicks desde home',
      'hreflang correcto si hay multiidioma',
    ],
  },
  {
    cat: 'Indexación',
    items: [
      'URLs indexadas = páginas publicadas útiles',
      'Errores de indexación en GSC ≤ 5%',
      'Sin páginas con noindex involuntario',
      'Canibalización de keywords = 0 casos críticos',
      'Contenido duplicado interno < 5%',
      'Contenido duplicado externo = 0%',
      'Canonical tags correctas en 100% de páginas',
      'Paginación tratada correctamente',
    ],
  },
  {
    cat: 'Arquitectura Web',
    items: [
      'URLs limpias sin parámetros innecesarios',
      'URLs en minúscula con guiones (-)',
      'Longitud media de URL ≤ 75 caracteres',
      'Enlazado interno 3-10 links útiles por página',
      'Estructura en silos / clusters temáticos',
      'Breadcrumbs implementados + Schema',
    ],
  },
  {
    cat: 'Metadatos y H1',
    items: [
      'Todas las páginas con title único (50-60 car.)',
      'Meta descriptions únicas (140-160 car.)',
      'Sin titles ni metas duplicadas',
      '1 único H1 por página con keyword principal',
      'H1 diferente del title tag',
      'Jerarquía H1→H2→H3 sin saltar niveles',
      'Keywords secundarias en H2/H3 de forma natural',
    ],
  },
  {
    cat: 'Schema Markup',
    items: [
      'Schema Organization en homepage',
      'Schema WebSite con Sitelinks Searchbox',
      'Schema BreadcrumbList',
      'Schema Article/BlogPosting en posts',
      'Schema Product (si eCommerce)',
      'Schema FAQPage donde aplica',
      'Schema HowTo en tutoriales',
      'Schema LocalBusiness (si negocio local)',
      'Sin errores en Rich Results Test',
    ],
  },
  {
    cat: 'Contenido y E-E-A-T',
    items: [
      'Autor identificable con bio en artículos',
      'Página "Sobre nosotros" con credenciales reales',
      'Política de privacidad y aviso legal presentes',
      'Contenido con datos propios o experiencia',
      'Fecha de publicación y actualización visibles',
      'Contenido actualizado en los últimos 12 meses (≥ 80%)',
      'Sin thin content (páginas < 300 palabras útiles)',
      'FAQ sección al final de artículos principales',
      'Respuesta directa a la intención en primeros 100 palabras',
    ],
  },
  {
    cat: 'SEO Local y GBP',
    items: [
      'Perfil GBP verificado',
      'NAP consistente en web, GBP y directorios',
      'Categoría principal GBP correcta y específica',
      'Categorías secundarias GBP añadidas (máx. 9)',
      'Descripción GBP optimizada (750 car. con keywords)',
      '≥ 20 fotos en GBP actualizadas',
      'Posts GBP ≥ 1 por semana',
      'Q&A con FAQs propias respondidas',
      'Puntuación media ≥ 4.3 estrellas',
      '100% de reseñas respondidas (≤ 72h)',
      'Embed Google Maps en la web',
      'Schema LocalBusiness con todos los campos',
      'Keyword + ciudad en title y H1',
      'Listado en Bing Places y Apple Maps',
    ],
  },
  {
    cat: 'Autoridad y Linkbuilding',
    items: [
      'Crecimiento mensual positivo de referring domains',
      'Ratio dofollow ≥ 60% del perfil',
      'Backlinks de dominios DR > 30 ≥ 70%',
      'Anchor text brandizado ≥ 40%',
      'Anchor text keyword exacta ≤ 5%',
      'Backlinks tóxicos = 0% (disavow si existen)',
      '≥ 1 mención en medios del sector (últimos 6 meses)',
    ],
  },
  {
    cat: 'AI Overviews 2026',
    items: [
      'Respuesta directa en los primeros 100 palabras',
      'Definición explícita: "X es..." en artículos informativos',
      'Estructura de listas y tablas para datos clave',
      'FAQ con pregunta explícita en H2/H3',
      'Schema FAQPage y HowTo implementados',
      'Contenido con citas de fuentes expertas (E-E-A-T)',
      'Perfil de entidad consistente web + GBP + redes',
      'Marca mencionada en fuentes externas de calidad',
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────
export function getCWVStatus(raw, metric) {
  if (raw == null) return 'na'
  if (raw <= metric.good) return 'ok'
  if (raw <= metric.needs) return 'warn'
  return 'crit'
}

export function getScoreStatus(score) {
  if (score >= 90) return 'ok'
  if (score >= 50) return 'warn'
  return 'crit'
}

export function formatCWVValue(raw, metric) {
  if (raw == null) return 'N/D'
  if (metric.unit === 'ms') return `${Math.round(raw)} ms`
  if (metric.unit === '') return raw.toFixed(metric.dec)
  return `${(raw / metric.div).toFixed(metric.dec)} s`
}

// ── Score 1-10 helpers ─────────────────────────────────────────────────
export function getScore1to10(status) {
  // Para estados ok/warn/crit basados en badges simples
  if (status === 'ok') return 9
  if (status === 'warn') return 6
  if (status === 'crit') return 3
  return null // na
}

export function getCWVScore1to10(raw, metric) {
  // Para Core Web Vitals, calcula proporcionalmente entre los umbrales
  if (raw == null) return null

  const { key, good, needs } = metric

  // Si está en rango bueno, escala 10 a good/2
  if (raw <= good) {
    if (key === 'LCP') return 10 - (raw / 1000)
    if (key === 'INP') return 10 - (raw / 50)
    if (key === 'CLS') return 10 - (raw / 0.01)
    if (key === 'FCP') return 10 - (raw / 1000)
    if (key === 'TTFB') return 10 - (raw / 800)
    if (key === 'SI') return 10 - (raw / 1000)
    return 9
  }

  // Si está en rango mejorable, escala 8-5
  if (raw <= needs) {
    const pct = (raw - good) / (needs - good)
    return 8 - (pct * 3) // 8 hasta 5
  }

  // Si está en rango crítico, escala 4-1
  const maxCrit = key === 'LCP' ? 6000 : key === 'INP' ? 800 : key === 'CLS' ? 0.4 : key === 'FCP' ? 4500 : key === 'TTFB' ? 3000 : 8000
  const pct = Math.min(1, (raw - needs) / (maxCrit - needs))
  return Math.max(1, 4 - (pct * 3)) // 4 hasta 1
}

export function getAuditScore1to10(score) {
  // Para audits con score 0-1
  if (score == null) return null
  if (score === 1) return 9
  if (score >= 0.5) return 6
  return 3
}

// ── Descripciones de audits en español ──────────────────────────────────
export const AUDIT_DESCRIPTIONS_ES = {
  'document-title': 'El documento debe tener un elemento <title> para mejorar el SEO y la experiencia del usuario.',
  'meta-description': 'Los documentos deben tener una meta description para optimizar la apariencia en los resultados de búsqueda.',
  'link-text': 'El texto de los enlaces debe ser descriptivo para ayudar a los usuarios y motores de búsqueda.',
  'image-alt': 'Los elementos de imagen deben tener atributos alt para ayudar a lectores de pantalla y Google Images.',
  'robots-txt': 'El archivo robots.txt debe estar bien formado para controlar correctamente el rastreo de Googlebot.',
  'crawlable-anchors': 'Los enlaces deben ser rastreables para que Google pueda seguirlos e indexar el contenido enlazado.',
  'hreflang': 'Los atributos hreflang deben ser válidos para indicar correctamente el idioma y región de cada página.',
  'viewport': 'El viewport debe estar configurado para que la página se adapte correctamente a dispositivos móviles.',
  'is-on-https': 'La página debe servirse en HTTPS para garantizar la seguridad y mejorar el posicionamiento.',
  'plugins': 'La página no debe usar plugins obsoletos (Flash, Java) que ya no soportan los navegadores modernos.',
  'charset': 'La página debe declarar el charset (codificación) para que el texto se muestre correctamente.',
  'errors-in-console': 'No deben aparecer errores en la consola del navegador que puedan afectar la funcionalidad.',
  'uses-text-compression': 'Los recursos de texto deben enviarse comprimidos (Brotli/GZIP) para reducir el tiempo de carga.',
  'modern-image-formats': 'Las imágenes deben usar formatos modernos como WebP o AVIF que ofrecen mejor compresión.',
  'offscreen-images': 'Las imágenes fuera de pantalla deben cargarse de forma diferida (lazy loading) para acelerar la carga inicial.',
  'render-blocking-resources': 'Los recursos que bloquean el renderizado deben eliminarse o diferirse para acelerar la carga visible.',
  'unused-css-rules': 'El CSS no utilizado debe eliminarse o diferirse para reducir el tiempo de análisis del navegador.',
  'unused-javascript': 'El JavaScript no utilizado debe eliminarse o diferirse para reducir el tiempo de análisis y ejecución.',
  'uses-long-cache-ttl': 'Los recursos estáticos deben tener un TTL de caché largo (≥1 año) para reducir peticiones repetidas.',
  'uses-responsive-images': 'Las imágenes deben tener el tamaño adecuado para el dispositivo para ahorrar datos y acelerar la carga.',
  'font-display': 'Las fuentes web deben usar font-display: swap para evitar texto invisible durante la carga.',
  'uses-rel-preconnect': 'Se deben usar preconnect a orígenes de terceros críticos para reducir la latencia de conexión.',
  'uses-http2': 'El servidor debe usar HTTP/2 para permitir carga paralela de recursos y reducir la latencia.',
  'total-blocking-time': 'El tiempo total de bloqueo del hilo principal debe minimizarse para mejorar la interactividad.',
  'unsized-images': 'Las imágenes deben tener width y height declarados para evitar saltos de layout (CLS) durante la carga.',
  'prioritize-lcp-image': 'La imagen LCP debe tener fetchpriority="high" para que el navegador la descargue con máxima prioridad.',
  'non-composited-animations': 'Las animaciones deben usar propiedades CSS compuestas (transform, opacity) para no bloquear el hilo principal.',
  'no-document-write': 'document.write() bloquea el parser del navegador y retrasa significativamente la carga de la página.',
  'legacy-javascript': 'El JavaScript moderno (ES2015+) permite al bundler generar código más eficiente para navegadores actuales.',
  'third-party-summary': 'Los scripts de terceros (analytics, chat, ads) pueden impactar significativamente el rendimiento de carga.',
  'mainthread-work-breakdown': 'El trabajo excesivo en el hilo principal bloquea la interactividad. Objetivo: <4 segundos total.',
  'dom-size': 'Un DOM excesivo (>1500 nodos) ralentiza el renderizado y aumenta el consumo de memoria. Objetivo: <800 nodos.',
  'network-requests': 'Minimizar el número de peticiones de red reduce la latencia total de carga de la página.',
  'total-byte-weight': 'El peso total de la página debe ser bajo. Objetivo: <1.6MB en móvil para conexiones lentas.',
  'critical-request-chains': 'Las cadenas de solicitudes críticas en serie retrasan la carga. Deben minimizarse con preload.',
  'redirects': 'Cada redirect añade una ida y vuelta al servidor. Las páginas deben servirse directamente sin redirects.',
}
