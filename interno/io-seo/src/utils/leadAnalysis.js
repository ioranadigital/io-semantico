// ── Lead Analysis Utilities ────────────────────────────────────────────

const PROXY_URL = 'https://api.allorigins.win/get?url='

export const TECHNICAL_VARIABLES = {
  'robots-txt': { label: 'robots.txt accesible', impact: 'Alto' },
  'sitemap-xml': { label: 'sitemap.xml presente', impact: 'Alto' },
  'https': { label: 'HTTPS activo', impact: 'Alto' },
  'meta-description': { label: 'Meta description', impact: 'Alto' },
  'h1': { label: 'H1 presente', impact: 'Alto' },
  'schema': { label: 'Schema markup', impact: 'Medio' },
  'analytics': { label: 'Google Analytics/GTM', impact: 'Medio' },
  'og-tags': { label: 'Open Graph tags', impact: 'Bajo' },
  'viewport': { label: 'Viewport meta tag', impact: 'Alto' },
  'favicon': { label: 'Favicon presente', impact: 'Bajo' },
}

async function fetchHtmlProxy(url) {
  try {
    const response = await fetch(PROXY_URL + encodeURIComponent(url))
    const data = await response.json()
    return data.contents
  } catch (err) {
    console.warn('Proxy fetch failed:', err)
    return null
  }
}

export async function analyzeHomepage(url) {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
  const domain = new URL(normalizedUrl).hostname

  const results = {
    'https': normalizedUrl.startsWith('https'),
    'robots-txt': false,
    'sitemap-xml': false,
    'meta-description': false,
    'h1': false,
    'schema': false,
    'analytics': false,
    'og-tags': false,
    'viewport': false,
    'favicon': false,
  }

  // Fetch homepage HTML
  const html = await fetchHtmlProxy(normalizedUrl)
  if (!html) {
    return { ...results, verified: false }
  }

  // Meta description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
  results['meta-description'] = !!metaDescMatch

  // H1
  results['h1'] = /<h1[^>]*>/i.test(html)

  // Schema markup
  results['schema'] = /application\/ld\+json|itemscope/i.test(html)

  // Google Analytics / GTM
  results['analytics'] = /gtag|ga\(|GTM-|google-analytics/i.test(html)

  // Open Graph
  results['og-tags'] = /og:title|og:description/i.test(html)

  // Viewport
  results['viewport'] = /viewport|width=device-width/i.test(html)

  // Favicon
  results['favicon'] = /rel=["']icon["']|favicon\.ico/i.test(html)

  // Check robots.txt and sitemap
  try {
    const robotsUrl = new URL('/robots.txt', normalizedUrl).href
    const robotsHtml = await fetchHtmlProxy(robotsUrl)
    if (robotsHtml && robotsHtml.length > 0) {
      results['robots-txt'] = true
      // Look for sitemap reference in robots.txt
      if (/sitemap:/i.test(robotsHtml)) {
        results['sitemap-xml'] = true
      }
    }
  } catch (err) {
    // robots.txt check failed
  }

  // Check sitemap.xml directly if not found
  if (!results['sitemap-xml']) {
    try {
      const sitemapUrl = new URL('/sitemap.xml', normalizedUrl).href
      const sitemapHtml = await fetchHtmlProxy(sitemapUrl)
      if (sitemapHtml && sitemapHtml.includes('<?xml') && sitemapHtml.includes('urlset')) {
        results['sitemap-xml'] = true
      }
    } catch (err) {
      // sitemap.xml check failed
    }
  }

  return { ...results, verified: true }
}

export function calculateScoring(technicalVariables, psiData) {
  let score = 0
  const maxScore = 20

  // Grupo A: Presencia/ausencia (máx 10 puntos)
  Object.values(technicalVariables).forEach(val => {
    if (val === true) score += 1
  })

  // Límite máximo para Grupo A
  score = Math.min(score, 10)

  const mob = psiData?.mobile?.lighthouseResult
  const desk = psiData?.desktop?.lighthouseResult

  // Grupo B: Métricas PSI
  if (mob) {
    const perfScore = Math.round(mob.categories.performance.score * 100)
    if (perfScore > 75) score += 2
    else if (perfScore > 50) score += 1

    const seoScore = Math.round(mob.categories.seo.score * 100)
    if (seoScore > 80) score += 2
    else if (seoScore > 60) score += 1

    const lcpMs = mob.audits['largest-contentful-paint']?.numericValue
    if (lcpMs && lcpMs <= 2500) score += 2
    else if (lcpMs && lcpMs <= 4000) score += 1

    const cls = mob.audits['cumulative-layout-shift']?.numericValue
    if (cls != null && cls <= 0.1) score += 2
    else if (cls != null && cls <= 0.25) score += 1
  }

  if (desk) {
    const perfScore = Math.round(desk.categories.performance.score * 100)
    if (perfScore > 90) score += 2
    else if (perfScore > 70) score += 1
  }

  return Math.min(Math.max(score, 0), maxScore)
}

export function getScoreSemaphore(score) {
  if (score >= 15) return { color: '#4cb050', label: 'Verde', emoji: '🟢' }
  if (score >= 10) return { color: '#ff9800', label: 'Naranja', emoji: '🟠' }
  return { color: '#dc3545', label: 'Rojo', emoji: '🔴' }
}

export async function generateAutomaticRecommendations(technicalVariables, psiData) {
  const recommendations = []
  const impact = {
    'Alto': 1,
    'Medio': 2,
    'Bajo': 3,
  }

  // Recomendaciones basadas en variables faltantes
  const failedVariables = Object.entries(technicalVariables)
    .filter(([, val]) => val === false)
    .map(([key]) => key)

  const baseRecommendations = {
    'robots-txt': { text: 'Crea un archivo robots.txt en la raíz del dominio para controlar el rastreo de Google', impact: 'Alto' },
    'sitemap-xml': { text: 'Genera un sitemap.xml y añade su ubicación al archivo robots.txt', impact: 'Alto' },
    'https': { text: 'Migra tu web completamente a HTTPS para mejorar seguridad y SEO', impact: 'Alto' },
    'meta-description': { text: 'Añade meta descriptions únicas en todas las páginas (140-160 caracteres)', impact: 'Alto' },
    'h1': { text: 'Verifica que todas las páginas tengan un H1 único con la keyword principal', impact: 'Alto' },
    'schema': { text: 'Implementa Schema Markup (Organization, BreadcrumbList, Article) en tu sitio', impact: 'Medio' },
    'analytics': { text: 'Instala Google Analytics 4 o Google Tag Manager para medir el tráfico', impact: 'Medio' },
    'og-tags': { text: 'Añade Open Graph tags para mejorar la apariencia en redes sociales', impact: 'Bajo' },
    'viewport': { text: 'Configura el viewport meta tag para que el sitio se vea bien en móvil', impact: 'Alto' },
    'favicon': { text: 'Añade un favicon distintivo para mejorar la marca en navegadores', impact: 'Bajo' },
  }

  failedVariables.forEach(key => {
    if (baseRecommendations[key]) {
      recommendations.push({
        ...baseRecommendations[key],
        key,
        impactOrder: impact[baseRecommendations[key].impact],
      })
    }
  })

  // Añadir recomendaciones PSI si la puntuación es baja
  const mob = psiData?.mobile?.lighthouseResult
  if (mob) {
    const perfScore = Math.round(mob.categories.performance.score * 100)
    if (perfScore < 50) {
      recommendations.push({
        text: 'Optimiza la velocidad de carga: reduce imágenes, usa lazy loading y caché HTTP',
        impact: 'Alto',
        impactOrder: 1,
      })
    }

    const lcpMs = mob.audits['largest-contentful-paint']?.numericValue
    if (lcpMs && lcpMs > 4000) {
      recommendations.push({
        text: 'Mejora el LCP (tiempo hasta el elemento más grande): precarga fuentes, optimiza imágenes LCP',
        impact: 'Alto',
        impactOrder: 1,
      })
    }
  }

  // Ordenar por impacto y tomar las 5 primeras
  return recommendations.sort((a, b) => a.impactOrder - b.impactOrder).slice(0, 5)
}
