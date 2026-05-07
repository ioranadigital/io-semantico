// KW Research analyzer — Lógica para identificar oportunidades y calcular metrics

export function identifyIntention(keyword) {
  const commercialPatterns = ['buy', 'comprar', 'precio', 'cost', 'free trial', 'demo', 'software', 'tool', 'herramienta', 'servicio']
  const localPatterns = ['near me', 'local', 'cerca', 'próximo', 'en', 'agencia', 'empresa en']
  const transactionalPatterns = ['sign up', 'registr', 'descargar', 'download', 'get started']

  const lowerKeyword = keyword.toLowerCase()

  if (localPatterns.some(p => lowerKeyword.includes(p))) return 'Local'
  if (transactionalPatterns.some(p => lowerKeyword.includes(p))) return 'Transaccional'
  if (commercialPatterns.some(p => lowerKeyword.includes(p))) return 'Comercial'
  return 'Informacional'
}

export function calculateDifficultyScore(frequency, competitorCount, uniqueness = 0.5) {
  // Algoritmo simplificado: basado en frecuencia y aparición en competidores
  let score = 50 // base

  // Más frecuencia = más dificultad
  if (frequency > 50) score += 30
  else if (frequency > 30) score += 20
  else if (frequency > 15) score += 10

  // Más competidores = más dificultad
  score += competitorCount * 10

  // Menos único = más difícil
  score += (1 - uniqueness) * 15

  return Math.min(Math.max(score, 0), 100)
}

export function findOpportunities(keywords, competitors) {
  // Oportunidades: baja dificultad + frecuencia media-alta + no en competidores
  const opportunities = keywords
    .filter(kw => {
      const competitorCount = kw.sources.filter(s => s.includes('Competitor')).length
      return kw.difficulty < 45 && kw.frequency > 10 && competitorCount < 2
    })
    .map(kw => ({
      keyword: kw.keyword,
      difficulty: kw.difficulty,
      potentialTraffic: estimateTraffic(kw.frequency, kw.difficulty),
      reason: generateOpportunityReason(kw, competitors),
    }))
    .sort((a, b) => b.difficulty - a.difficulty)
    .slice(0, 10)

  return opportunities
}

export function estimateTraffic(frequency, difficulty) {
  // Estimación simple basada en frecuencia e inverso de dificultad
  const baseTraffic = frequency * (100 - difficulty) / 10
  const min = Math.round(baseTraffic * 0.8)
  const max = Math.round(baseTraffic * 1.3)
  return `${min}-${max}`
}

export function generateOpportunityReason(keyword, competitors) {
  let reasons = []

  if (keyword.difficulty < 35) reasons.push('Baja dificultad')
  if (keyword.frequency > 30) reasons.push('Frecuencia media-alta')
  if (keyword.frequency > 50) reasons.push('Alto volumen')

  const competitorMatches = keyword.sources.filter(s => s.includes('Competitor')).length
  if (competitorMatches === 0) reasons.push('No posicionado por competencia')
  if (competitorMatches === 1) reasons.push('Débil competencia')

  if (keyword.intention === 'Comercial') reasons.push('Intención comercial')

  return reasons.join(' + ') || 'Oportunidad detectada'
}

export function calculateCompetitiveMetrics(clientKeywords, competitorData) {
  // Analiza solapamientos y gaps vs competencia
  const clientKwSet = new Set(clientKeywords.map(k => k.keyword.toLowerCase()))

  return competitorData.map(comp => {
    const compKwSet = new Set(comp.commonKW.map(k => k.toLowerCase()))
    const commonKW = [...clientKwSet].filter(k => compKwSet.has(k))
    const uniqueToClient = [...clientKwSet].filter(k => !compKwSet.has(k))

    return {
      ...comp,
      commonKW: commonKW.length > 0 ? commonKW : comp.commonKW,
      gapOpportunities: uniqueToClient.length,
    }
  })
}

export function calculatePerformanceMetrics(keywords) {
  const avgSEOScore = Math.round(keywords.reduce((sum, k) => sum + (100 - k.difficulty), 0) / keywords.length)
  const estimatedTraffic = keywords.reduce((sum, k) => {
    const [min] = estimateTraffic(k.frequency, k.difficulty).split('-').map(Number)
    return sum + min
  }, 0)

  return {
    avgSEOScore,
    estimatedTraffic: estimatedTraffic,
    potentialAdditionalTraffic: Math.round(estimatedTraffic * 0.3), // +30% con optimización
    recommendedFocus: keywords.filter(k => k.difficulty < 50).slice(0, 3),
  }
}
