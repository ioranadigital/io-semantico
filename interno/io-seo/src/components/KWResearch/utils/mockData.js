// Mock data for KW Research — Generado contextuales según industria

const INDUSTRY_DATA = {
  ecommerce: {
    keywords: [
      { keyword: 'tienda online plantas', intention: 'Comercial', difficulty: 45, frequency: 38, sources: ['GSC', 'Competitor 1'] },
      { keyword: 'comprar plantas online', intention: 'Comercial', difficulty: 52, frequency: 42, sources: ['Competitor 2'] },
      { keyword: 'macetas decorativas', intention: 'Comercial', difficulty: 48, frequency: 35, sources: ['GSC'] },
      { keyword: 'envio de plantas a domicilio', intention: 'Comercial', difficulty: 55, frequency: 28, sources: ['Competitor 1'] },
      { keyword: 'plantas resistentes al frio', intention: 'Informacional', difficulty: 32, frequency: 25, sources: ['Blog'] },
      { keyword: 'como cuidar plantas de interior', intention: 'Informacional', difficulty: 28, frequency: 48, sources: ['Competitor 3'] },
      { keyword: 'semillas organicas para huerto', intention: 'Comercial', difficulty: 38, frequency: 32, sources: ['GSC'] },
      { keyword: 'jardineria para principiantes', intention: 'Informacional', difficulty: 25, frequency: 55, sources: ['Blog'] },
      { keyword: 'abonos fertilizantes ecologicos', intention: 'Comercial', difficulty: 42, frequency: 24, sources: ['Competitor 2'] },
      { keyword: 'herramientas de jardin profesionales', intention: 'Comercial', difficulty: 46, frequency: 19, sources: ['GSC'] },
    ],
    competitors: [
      { url: 'floresnline.es', uniqueKW: 187, performanceScore: 78, onPageScore: 82, commonKW: ['plantas', 'flores', 'comprar'] },
      { url: 'plantasexoticas.com', uniqueKW: 156, performanceScore: 72, onPageScore: 79, commonKW: ['plantas', 'semillas', 'jardin'] },
      { url: 'jardineriashop.es', uniqueKW: 143, performanceScore: 68, onPageScore: 74, commonKW: ['herramientas', 'macetas', 'cuidados'] },
    ],
    opportunities: [
      { keyword: 'plantas para regalar', difficulty: 35, potentialTraffic: '380-520', reason: 'Baja dificultad + Alto potencial comercial + Estacional' },
      { keyword: 'jardin vertical interior', difficulty: 38, potentialTraffic: '290-410', reason: 'Tendencia en alza + Baja competencia' },
      { keyword: 'compostera domestica', difficulty: 32, potentialTraffic: '200-300', reason: 'Nicho verde + Alta intención compra' },
    ]
  },
  local: {
    keywords: [
      { keyword: 'jardineria cerca de mi', intention: 'Local', difficulty: 35, frequency: 32, sources: ['GSC'] },
      { keyword: 'servicio jardineria madrid', intention: 'Local', difficulty: 42, frequency: 28, sources: ['Competitor 1'] },
      { keyword: 'empresa mantenimiento jardines', intention: 'Local', difficulty: 48, frequency: 22, sources: ['GSC'] },
      { keyword: 'diseño paisajistico local', intention: 'Local', difficulty: 45, frequency: 18, sources: ['Blog'] },
      { keyword: 'poda y tala de arboles', intention: 'Local', difficulty: 38, frequency: 24, sources: ['Competitor 2'] },
      { keyword: 'jardinero profesional zona norte', intention: 'Local', difficulty: 32, frequency: 26, sources: ['GSC'] },
      { keyword: 'tratamiento plagas plantas', intention: 'Comercial', difficulty: 44, frequency: 20, sources: ['Blog'] },
      { keyword: 'riego automatico instalacion', intention: 'Comercial', difficulty: 40, frequency: 16, sources: ['Competitor 1'] },
      { keyword: 'cesped artificial presupuesto', intention: 'Comercial', difficulty: 50, frequency: 21, sources: ['GSC'] },
      { keyword: 'reforma jardin transformacion', intention: 'Comercial', difficulty: 52, frequency: 17, sources: ['Competitor 3'] },
    ],
    competitors: [
      { url: 'jardincomoseredprofesional.es', uniqueKW: 134, performanceScore: 74, onPageScore: 76, commonKW: ['jardin', 'servicios', 'mantenimiento'] },
      { url: 'diseñojardinesplanos.es', uniqueKW: 112, performanceScore: 68, onPageScore: 70, commonKW: ['diseño', 'paisajismo', 'reforma'] },
      { url: 'jardinerocerrcanousame.es', uniqueKW: 98, performanceScore: 64, onPageScore: 68, commonKW: ['poda', 'mantenimiento', 'local'] },
    ],
    opportunities: [
      { keyword: 'diseño jardin pequeno', difficulty: 33, potentialTraffic: '220-340', reason: 'Baja dificultad + Demanda creciente' },
      { keyword: 'jardin bajo mantenimiento', difficulty: 36, potentialTraffic: '280-380', reason: 'Tendencia sustentabilidad + Menos competencia' },
      { keyword: 'cesped bajo mantenimiento', difficulty: 34, potentialTraffic: '190-290', reason: 'Niccho ecologico + Alta intención' },
    ]
  },
  saas: {
    keywords: [
      { keyword: 'software jardineria', intention: 'Comercial', difficulty: 55, frequency: 34, sources: ['GSC'] },
      { keyword: 'herramienta gestion jardines', intention: 'Comercial', difficulty: 58, frequency: 28, sources: ['Competitor 1'] },
      { keyword: 'app planificacion plantas', intention: 'Comercial', difficulty: 45, frequency: 32, sources: ['Blog'] },
      { keyword: 'sistema riego automatico controlado', intention: 'Comercial', difficulty: 52, frequency: 24, sources: ['GSC'] },
      { keyword: 'software cultivo organico', intention: 'Comercial', difficulty: 48, frequency: 19, sources: ['Competitor 2'] },
      { keyword: 'plataforma e-learning jardineria', intention: 'Informacional', difficulty: 42, frequency: 22, sources: ['Blog'] },
      { keyword: 'integracion sistemas riego', intention: 'Comercial', difficulty: 56, frequency: 15, sources: ['GSC'] },
      { keyword: 'analytics cultivo sostenible', intention: 'Comercial', difficulty: 50, frequency: 18, sources: ['Competitor 3'] },
      { keyword: 'api integracion botanica', intention: 'Comercial', difficulty: 62, frequency: 12, sources: ['GSC'] },
      { keyword: 'saas green technology', intention: 'Comercial', difficulty: 54, frequency: 20, sources: ['Blog'] },
    ],
    competitors: [
      { url: 'gardentech.io', uniqueKW: 198, performanceScore: 82, onPageScore: 85, commonKW: ['software', 'jardin', 'automatizacion'] },
      { url: 'plantmanagement.app', uniqueKW: 167, performanceScore: 76, onPageScore: 79, commonKW: ['app', 'plantas', 'datos'] },
      { url: 'ecocultivasaas.com', uniqueKW: 145, performanceScore: 71, onPageScore: 74, commonKW: ['cultivo', 'sostenible', 'analytics'] },
    ],
    opportunities: [
      { keyword: 'software vivero gratis', difficulty: 40, potentialTraffic: '450-650', reason: 'Alta demanda + Baja competencia premium' },
      { keyword: 'integracion iot jardineria', difficulty: 48, potentialTraffic: '320-480', reason: 'Tendencia IoT + Nicho especializado' },
      { keyword: 'ia prediccion cosechas', difficulty: 52, potentialTraffic: '280-420', reason: 'Tecnologia emergente + Alto valor' },
    ]
  },
}

const INDUSTRY_DEFAULT = {
  keywords: [
    { keyword: 'jardineria general', intention: 'Informacional', difficulty: 35, frequency: 28, sources: ['GSC'] },
    { keyword: 'consejos cuidado plantas', intention: 'Informacional', difficulty: 30, frequency: 35, sources: ['Blog'] },
    { keyword: 'plantas decorativas interior', intention: 'Comercial', difficulty: 42, frequency: 32, sources: ['Competitor 1'] },
    { keyword: 'semillas germinacion', intention: 'Informacional', difficulty: 28, frequency: 24, sources: ['GSC'] },
    { keyword: 'abono organico casero', intention: 'Informacional', difficulty: 25, frequency: 42, sources: ['Blog'] },
    { keyword: 'plagas comunes plantas', intention: 'Informacional', difficulty: 32, frequency: 26, sources: ['GSC'] },
    { keyword: 'herramientas jardin', intention: 'Comercial', difficulty: 44, frequency: 20, sources: ['Competitor 2'] },
    { keyword: 'calendario siembra', intention: 'Informacional', difficulty: 29, frequency: 38, sources: ['Blog'] },
    { keyword: 'riego plantas interior', intention: 'Informacional', difficulty: 26, frequency: 31, sources: ['GSC'] },
    { keyword: 'luces cultivolámparas', intention: 'Comercial', difficulty: 48, frequency: 18, sources: ['Competitor 3'] },
  ],
  competitors: [
    { url: 'botanicabasica.es', uniqueKW: 134, performanceScore: 72, onPageScore: 78, commonKW: ['plantas', 'cuidados', 'guias'] },
    { url: 'jardininfos.com', uniqueKW: 112, performanceScore: 68, onPageScore: 72, commonKW: ['jardin', 'consejos', 'plantas'] },
    { url: 'cultivoecologico.net', uniqueKW: 98, performanceScore: 64, onPageScore: 70, commonKW: ['organico', 'huerto', 'natural'] },
  ],
  opportunities: [
    { keyword: 'plantas para sombra interior', difficulty: 32, potentialTraffic: '250-380', reason: 'Baja dificultad + Alta demanda' },
    { keyword: 'compost para plantas', difficulty: 36, potentialTraffic: '180-280', reason: 'Tendencia sostenible + Bajo esfuerzo' },
    { keyword: 'hidroponia casera', difficulty: 38, potentialTraffic: '220-340', reason: 'Nicho en crecimiento + Baja competencia' },
  ]
}

export const generateMockAnalysis = (config) => {
  // Detectar industria primaria (si hay múltiples, usar la primera)
  const mainIndustry = config.industries?.[0] || 'local'
  const industryData = INDUSTRY_DATA[mainIndustry] || INDUSTRY_DEFAULT

  return {
    project: {
      name: config.projectName,
      mainURL: config.mainUrl,
      industries: config.industries,
      competitors: config.competitors.filter(c => c),
      timestamp: new Date().toISOString(),
    },
    keywords: industryData.keywords,
    competitors: industryData.competitors,
    opportunities: industryData.opportunities,
    metrics: {
      totalKeywords: industryData.keywords.length,
      commercialKW: industryData.keywords.filter(k => k.intention === 'Comercial').length,
      informationalKW: industryData.keywords.filter(k => k.intention === 'Informacional').length,
      localKW: industryData.keywords.filter(k => k.intention === 'Local').length,
      avgDifficulty: Math.round(industryData.keywords.reduce((sum, k) => sum + k.difficulty, 0) / industryData.keywords.length),
      opportunitiesFound: industryData.opportunities.length,
      competitorsAnalyzed: config.competitors.filter(c => c).length,
    },
  }
}
