import jsPDF from 'jspdf'

const BRAND_COLOR = '#1a1a18'
const OK_COLOR = '#4cb050'
const WARN_COLOR = '#ff9800'
const CRIT_COLOR = '#dc3545'
const TEXT_COLOR = '#000'
const TEXT_LIGHT = '#666'

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0]
}

function getStatusColor(value, thresholds = { ok: 75, warn: 50 }) {
  if (value >= thresholds.ok) return OK_COLOR
  if (value >= thresholds.warn) return WARN_COLOR
  return CRIT_COLOR
}

function formatDate(isoDate) {
  const d = new Date(isoDate)
  const month = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][d.getMonth()]
  return `${d.getDate()} de ${month} de ${d.getFullYear()}`
}

export function generateReportPDF(report) {
  const pdf = new jsPDF()
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const { type, clientName, url, date, summary = {} } = report
  
  // Portada
  pdf.setFillColor(...hexToRgb(BRAND_COLOR))
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')
  
  pdf.setTextColor(...hexToRgb('#fff'))
  pdf.setFontSize(28)
  pdf.setFont(undefined, 'bold')
  pdf.text('INFORME SEO', pageWidth / 2, 60, { align: 'center' })
  
  pdf.setFontSize(14)
  pdf.setFont(undefined, 'normal')
  pdf.text(clientName || 'Sin especificar', pageWidth / 2, 90, { align: 'center' })
  
  pdf.setFontSize(11)
  pdf.setTextColor(...hexToRgb('#999'))
  const domain = url.replace(/https?:\/\//, '').split('/')[0]
  pdf.text(domain, pageWidth / 2, 110, { align: 'center' })
  
  pdf.setFontSize(10)
  pdf.text(`Generado el ${formatDate(date)}`, pageWidth / 2, 180, { align: 'center' })
  
  pdf.addPage()
  
  // Página 2: Resumen
  pdf.setFillColor(...hexToRgb(BRAND_COLOR))
  pdf.rect(0, 0, pageWidth, 30, 'F')
  
  pdf.setTextColor(...hexToRgb('#fff'))
  pdf.setFontSize(12)
  pdf.setFont(undefined, 'bold')
  pdf.text('Resumen Ejecutivo', 15, 20)
  
  let y = 40
  pdf.setTextColor(...hexToRgb(TEXT_LIGHT))
  pdf.setFontSize(10)
  const summaryText = `Análisis realizado el ${formatDate(date)}. Este informe contiene un análisis completo de ${domain}.`
  const lines = pdf.splitTextToSize(summaryText, pageWidth - 30)
  pdf.text(lines, 15, y)
  
  y += lines.length * 5 + 15
  
  // Métricas por tipo
  if (type === 'audit') {
    const metrics = [
      ['Performance Móvil', summary.perfMobile, '/100'],
      ['Performance Desktop', summary.perfDesktop, '/100'],
      ['SEO Score', summary.seoScore, '/100'],
      ['Accesibilidad', summary.accessibility, '/100'],
    ]
    
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(...hexToRgb(TEXT_COLOR))
    pdf.text('Puntuaciones Lighthouse:', 15, y)
    y += 8
    
    metrics.forEach(([label, value]) => {
      pdf.setFontSize(10)
      pdf.setFont(undefined, 'normal')
      pdf.text(label, 20, y)
      
      const color = getStatusColor(value)
      pdf.setTextColor(...hexToRgb(color))
      pdf.setFont(undefined, 'bold')
      pdf.text(`${value}/100`, pageWidth - 20, y, { align: 'right' })
      
      y += 8
    })
    
    pdf.setTextColor(...hexToRgb(TEXT_COLOR))
    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    y += 5
    
    if (summary.criticals > 0) pdf.text(`Elementos críticos: ${summary.criticals}`, 20, y), (y += 6)
    if (summary.warns > 0) pdf.text(`Elementos a mejorar: ${summary.warns}`, 20, y), (y += 6)
    if (summary.competitors > 0) pdf.text(`Competidores analizados: ${summary.competitors}`, 20, y)
  }
  
  if (type === 'prospecting') {
    const metrics = []
    if (summary.perfScore !== undefined) metrics.push(['Core Web Vitals', summary.perfScore, '/100'])
    if (summary.seoScore !== undefined) metrics.push(['SEO Score', summary.seoScore, '/100'])
    if (summary.securityScore !== undefined) metrics.push(['Seguridad', summary.securityScore, '/100'])
    
    if (metrics.length > 0) {
      pdf.setFontSize(11)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(...hexToRgb(TEXT_COLOR))
      pdf.text('Puntuaciones:', 15, y)
      y += 8
      
      metrics.forEach(([label, value]) => {
        pdf.setFontSize(10)
        pdf.setFont(undefined, 'normal')
        pdf.text(label, 20, y)
        
        const color = getStatusColor(value)
        pdf.setTextColor(...hexToRgb(color))
        pdf.setFont(undefined, 'bold')
        pdf.text(`${value}/100`, pageWidth - 20, y, { align: 'right' })
        
        y += 8
      })
    }
    
    pdf.setTextColor(...hexToRgb(TEXT_COLOR))
    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    y += 5
    
    if (summary.modules?.length > 0) pdf.text(`Módulos analizados: ${summary.modules.length}`, 20, y), (y += 6)
    if (summary.subpages > 0) pdf.text(`Subpáginas detectadas: ${summary.subpages}`, 20, y), (y += 6)
    if (summary.schemasFound > 0) pdf.text(`Schemas encontrados: ${summary.schemasFound}`, 20, y)
  }
  
  if (type === 'audit-local') {
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(...hexToRgb(TEXT_COLOR))
    pdf.text('Configuración del Proyecto:', 15, y)
    y += 8
    
    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    if (summary.tools) pdf.text(`Herramientas: ${summary.tools}`, 20, y), (y += 6)
    if (summary.projectType) pdf.text(`Tipo: ${summary.projectType}`, 20, y)
  }
  
  if (type === 'kw-research') {
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(...hexToRgb(TEXT_COLOR))
    pdf.text('Análisis de Keywords:', 15, y)
    y += 8
    
    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    if (summary.keywords) pdf.text(`Keywords analizadas: ${summary.keywords}`, 20, y), (y += 6)
    if (summary.opportunities) pdf.text(`Oportunidades: ${summary.opportunities}`, 20, y), (y += 6)
    if (summary.industry) pdf.text(`Sector: ${summary.industry}`, 20, y)
  }
  
  // Footer
  pdf.setDrawColor(...hexToRgb('#ddd'))
  pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15)
  pdf.setTextColor(...hexToRgb('#999'))
  pdf.setFontSize(8)
  pdf.text('Informe generado por SEO Agent 2026', pageWidth / 2, pageHeight - 8, { align: 'center' })
  
  return pdf
}
