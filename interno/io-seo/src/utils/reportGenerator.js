/**
 * Builds the prompt string for Claude report generation.
 * Separated so Claude Code can extend it easily.
 */
export function buildReportPrompt({ config, psiData, criticalItems, warnItems, compData }) {
  const mob = psiData?.mobile
  if (!mob) return ''

  const audits = mob.lighthouseResult?.audits ?? {}
  const pM = Math.round((mob.lighthouseResult?.categories?.performance?.score ?? 0) * 100)
  const pD = Math.round((psiData.desktop?.lighthouseResult?.categories?.performance?.score ?? 0) * 100)
  const seo = Math.round((mob.lighthouseResult?.categories?.seo?.score ?? 0) * 100)
  const acc = Math.round((mob.lighthouseResult?.categories?.accessibility?.score ?? 0) * 100)

  const lcp  = audits['largest-contentful-paint']?.displayValue || 'N/D'
  const inp  = audits['interaction-to-next-paint']?.displayValue || 'N/D'
  const cls  = audits['cumulative-layout-shift']?.displayValue || 'N/D'
  const fcp  = audits['first-contentful-paint']?.displayValue || 'N/D'
  const ttfb = audits['server-response-time']?.displayValue || 'N/D'

  const compLines = Object.entries(compData)
    .filter(([, d]) => d?.lighthouseResult?.categories?.performance?.score != null)
    .map(([url, d]) => `  - ${url.replace(/https?:\/\//, '').split('/')[0]}: performance ${Math.round(d.lighthouseResult.categories.performance.score * 100)}/100`)
    .join('\n')

  const gscBlock = config.gscClicks ? `
GOOGLE SEARCH CONSOLE (28 días):
- Clicks: ${config.gscClicks}${config.gscPrev ? ` (anterior: ${config.gscPrev})` : ''}
- Impresiones: ${config.gscImpr || 'N/D'}
- CTR: ${config.gscCtr || 'N/D'}%
- Posición media: ${config.gscPos || 'N/D'}
- Top 3: ${config.gscTop3 || 'N/D'} keywords
- Top 10: ${config.gscTop10 || 'N/D'} keywords
- Top 100: ${config.gscTop100 || 'N/D'} keywords` : ''

  return `Genera un informe SEO profesional y ejecutivo para el cliente "${config.clientName || config.url}" (${config.url}).
Sector: ${config.sector || 'no especificado'} · Mercado: ${config.market || 'España'}${config.isLocal === 'si' ? ' · Negocio local con presencia física' : ''}.

DATOS REALES DEL ANÁLISIS AUTOMÁTICO:

Core Web Vitals (móvil):
- LCP: ${lcp} (objetivo: ≤ 2.5s)
- INP: ${inp} (objetivo: ≤ 200ms)
- CLS: ${cls} (objetivo: ≤ 0.1)
- FCP: ${fcp} (objetivo: ≤ 1.8s)
- TTFB: ${ttfb} (objetivo: ≤ 800ms)

Scores Lighthouse:
- Performance móvil: ${pM}/100
- Performance escritorio: ${pD}/100
- SEO score: ${seo}/100
- Accesibilidad: ${acc}/100
${gscBlock}
${compLines ? `\nCOMPETIDORES ANALIZADOS:\n${compLines}` : ''}
${criticalItems.length ? `\nVARIABLES CRÍTICAS (checklist manual):\n${criticalItems.map(i => `- ${i}`).join('\n')}` : ''}
${warnItems.length ? `\nVARIABLES A MEJORAR:\n${warnItems.map(i => `- ${i}`).join('\n')}` : ''}

ESTRUCTURA DEL INFORME:
1. Resumen ejecutivo — 3 párrafos orientados al cliente (sin jerga técnica)
2. Dashboard de estado por categoría — semáforos ✅ ⚠️ ❌ con datos reales
3. Top 5 acciones prioritarias — ordenadas por impacto estimado, con esfuerzo (horas) y métrica de éxito
4. ${config.isLocal === 'si' ? 'Análisis SEO local y GBP — diagnóstico y recomendaciones\n5. ' : ''}Comparativa con competidores — ${compLines ? 'basada en datos reales' : 'recomendaciones genéricas del sector'}
${config.isLocal === 'si' ? '6.' : '5.'} Próximos pasos — plan de 30 días con responsable y fecha sugerida

Tono: ejecutivo, positivo, orientado al ROI. Formato markdown listo para copiar en PowerPoint o enviar como documento.`
}

export function buildStrategyPrompt({ config, psiData, criticalItems, warnItems }) {
  const mob = psiData?.mobile
  if (!mob) return ''
  const pM = Math.round((mob.lighthouseResult?.categories?.performance?.score ?? 0) * 100)
  const audits = mob.lighthouseResult?.audits ?? {}
  const lcp = audits['largest-contentful-paint']?.displayValue || 'N/D'
  const cls = audits['cumulative-layout-shift']?.displayValue || 'N/D'

  return `Crea un plan de acción SEO a 90 días para ${config.clientName || config.url} (${config.url}).

Datos base:
- Performance móvil: ${pM}/100
- LCP: ${lcp} · CLS: ${cls}
${config.gscClicks ? `- GSC: ${config.gscClicks} clicks, posición ${config.gscPos}, Top 10: ${config.gscTop10} keywords` : ''}
${criticalItems.length ? `- Problemas críticos: ${criticalItems.join(', ')}` : ''}
${warnItems.length ? `- Mejoras pendientes: ${warnItems.join(', ')}` : ''}

Organiza en 3 sprints de 30 días:
- Sprint 1 (días 1-30): Quick wins — mejoras con alto impacto y bajo esfuerzo
- Sprint 2 (días 31-60): Optimización estructural — mejoras técnicas y de contenido
- Sprint 3 (días 61-90): Crecimiento — autoridad, link building, contenido estratégico

Para cada acción: tarea concreta · recurso necesario · esfuerzo estimado (horas) · impacto esperado · cómo medirlo en GSC/Analytics.`
}
