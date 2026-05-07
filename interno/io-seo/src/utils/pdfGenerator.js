import jsPDF from 'jspdf'
import { getScoreSemaphore } from './leadAnalysis.js'

export function generateReportPDF(clientData, technicalVariables, psiData, score, recommendations) {
  const pdf = new jsPDF()
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const colors = {
    dark: '#1a1a18',
    text: '#000',
    textLight: '#666',
    textLighter: '#999',
    white: '#fff',
    ok: '#4cb050',
    warn: '#ff9800',
    crit: '#dc3545',
    border: '#ddd',
  }

  const semaphore = getScoreSemaphore(score)
  const date = new Date()
  const dateStr = `${date.getDate()} de ${['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][date.getMonth()]} de ${date.getFullYear()}`

  // ── PÁGINA 1: PORTADA ──────────────────────────────────────────────
  pdf.setFillColor(...hexToRgb(colors.dark))
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')

  pdf.setTextColor(...hexToRgb(colors.white))
  pdf.setFontSize(32)
  pdf.text('Informe SEO Gratuito', pageWidth / 2, 60, { align: 'center' })

  pdf.setFontSize(16)
  pdf.setTextColor(...hexToRgb(colors.textLight))
  const urlDisplay = clientData.url.replace(/https?:\/\//, '')
  pdf.text(urlDisplay, pageWidth / 2, 100, { align: 'center' })

  pdf.setFontSize(12)
  pdf.text(`Análisis realizado el ${dateStr}`, pageWidth / 2, 140, { align: 'center' })

  // Scoring box
  pdf.setFillColor(...hexToRgb(semaphore.color))
  pdf.roundedRect(pageWidth / 2 - 30, 165, 60, 25, 2, 2, 'F')

  pdf.setFontSize(20)
  pdf.setTextColor(...hexToRgb(colors.white))
  pdf.text(`${score}/20`, pageWidth / 2, 182, { align: 'center', fontStyle: 'bold' })

  pdf.setFontSize(11)
  pdf.setTextColor(...hexToRgb(colors.textLight))
  const percentage = Math.round((score / 20) * 100)
  pdf.text(`${percentage}% Salud SEO`, pageWidth / 2, 200, { align: 'center' })

  pdf.addPage()

  // ── PÁGINA 2: RESUMEN EJECUTIVO ────────────────────────────────────
  pdf.setTextColor(...hexToRgb(colors.text))
  pdf.setFontSize(16)
  pdf.text('Resumen Ejecutivo', 20, 25)

  pdf.setFontSize(11)
  pdf.setTextColor(...hexToRgb(colors.textLight))
  const summaryText = `Análisis realizado el ${dateStr} para ${clientData.url}. Tu web tiene una puntuación SEO de ${score}/20, lo que indica oportunidades significativas de mejora en visibilidad y tráfico orgánico.`
  const summaryLines = pdf.splitTextToSize(summaryText, pageWidth - 40)
  pdf.text(summaryLines, 20, 40)

  let yPos = 65

  // Top 3 problemas
  pdf.setFontSize(12)
  pdf.setTextColor(...hexToRgb(colors.crit))
  pdf.text('🔴 Top 3 Problemas Detectados', 20, yPos)
  yPos += 10

  const problems = generateProblems(technicalVariables, psiData).slice(0, 3)
  problems.forEach((problem, i) => {
    pdf.setTextColor(...hexToRgb(colors.text))
    pdf.setFontSize(10)
    pdf.text(`${i + 1}. ${problem}`, 25, yPos, { maxWidth: pageWidth - 50 })
    yPos += 12
  })

  yPos += 5

  // Top 3 oportunidades
  pdf.setFontSize(12)
  pdf.setTextColor(...hexToRgb(colors.ok))
  pdf.text('🟢 Top 3 Oportunidades', 20, yPos)
  yPos += 10

  const opportunities = generateOpportunities(psiData).slice(0, 3)
  opportunities.forEach((opp, i) => {
    pdf.setTextColor(...hexToRgb(colors.text))
    pdf.setFontSize(10)
    pdf.text(`${i + 1}. ${opp}`, 25, yPos, { maxWidth: pageWidth - 50 })
    yPos += 12
  })

  pdf.addPage()

  // ── PÁGINA 3: RESULTADOS DETALLADOS ────────────────────────────────
  pdf.setTextColor(...hexToRgb(colors.text))
  pdf.setFontSize(16)
  pdf.text('Resultados Detallados', 20, 25)

  let yPos3 = 40

  // Tabla: Variables técnicas
  pdf.setFontSize(11)
  pdf.setTextColor(...hexToRgb(colors.text))
  pdf.text('Variables Técnicas', 20, yPos3)
  yPos3 += 8

  const techVars = Object.entries(technicalVariables).map(([key, value]) => {
    const varData = { 'robots-txt': 'robots.txt', 'sitemap-xml': 'sitemap.xml', 'https': 'HTTPS', 'meta-description': 'Meta Desc.', 'h1': 'H1', 'schema': 'Schema', 'analytics': 'Analytics', 'og-tags': 'OG Tags', 'viewport': 'Viewport', 'favicon': 'Favicon' }
    return [varData[key] || key, value ? '✓ Sí' : '✗ No', getImpactForVar(key)]
  })

  pdf.setFontSize(9)
  drawTable(pdf, ['Variable', 'Estado', 'Impacto'], techVars, 20, yPos3, pageWidth - 40)
  yPos3 += 70

  // Métricas PSI
  if (psiData?.mobile) {
    pdf.setFontSize(11)
    pdf.setTextColor(...hexToRgb(colors.text))
    pdf.text('Métricas de Velocidad (Móvil)', 20, yPos3)
    yPos3 += 8

    const mob = psiData.mobile.lighthouseResult
    const psiMetrics = [
      ['LCP', formatPSIValue(mob.audits['largest-contentful-paint']?.numericValue), '≤2.5s'],
      ['INP', formatPSIValue(mob.audits['interaction-to-next-paint']?.numericValue), '≤200ms'],
      ['CLS', formatPSIValue(mob.audits['cumulative-layout-shift']?.numericValue), '≤0.1'],
      ['Performance', `${Math.round(mob.categories.performance.score * 100)}/100`, '>75'],
      ['SEO Score', `${Math.round(mob.categories.seo.score * 100)}/100`, '>80'],
    ]

    pdf.setFontSize(9)
    drawTable(pdf, ['Métrica', 'Valor', 'Objetivo'], psiMetrics, 20, yPos3, pageWidth - 40)
  }

  pdf.addPage()

  // ── PÁGINA 4: RECOMENDACIONES Y CTA ────────────────────────────────
  pdf.setTextColor(...hexToRgb(colors.text))
  pdf.setFontSize(16)
  pdf.text('Recomendaciones Priorizadas', 20, 25)

  let yPos4 = 40
  pdf.setFontSize(10)

  recommendations.slice(0, 5).forEach((rec, i) => {
    pdf.setTextColor(...hexToRgb(colors.text))
    const impact = rec.impact === 'Alto' ? '🔴' : rec.impact === 'Medio' ? '🟠' : '🟡'
    pdf.text(`${i + 1}. ${impact} ${rec.text}`, 20, yPos4, { maxWidth: pageWidth - 40 })
    yPos4 += 20
  })

  yPos4 += 10

  // CTA
  pdf.setFontSize(12)
  pdf.setTextColor(...hexToRgb(colors.text))
  pdf.text('¿Quieres mejorar estos resultados?', 20, yPos4)
  yPos4 += 10

  pdf.setFontSize(10)
  pdf.setTextColor(...hexToRgb(colors.textLight))
  pdf.text('Contacta con nosotros para una auditoría completa y un plan de acción personalizado.', 20, yPos4, { maxWidth: pageWidth - 40 })

  yPos4 += 20
  pdf.setFontSize(11)
  pdf.setTextColor(...hexToRgb(colors.text))
  pdf.text('Email: honatuya@gmail.com', 20, yPos4)
  yPos4 += 8
  pdf.text('Web: https://iorana.digital', 20, yPos4)

  pdf.setFontSize(9)
  pdf.setTextColor(...hexToRgb(colors.textLighter))
  pdf.text('Informe generado por SEO Agent 2026', pageWidth / 2, pageHeight - 10, { align: 'center' })

  return pdf
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0]
}

function formatPSIValue(val) {
  if (!val) return 'N/D'
  if (val > 1000) return `${(val / 1000).toFixed(2)}s`
  if (val > 100) return `${Math.round(val)}ms`
  return val.toFixed(3)
}

function getImpactForVar(key) {
  const impacts = {
    'robots-txt': 'Alto',
    'sitemap-xml': 'Alto',
    'https': 'Alto',
    'meta-description': 'Alto',
    'h1': 'Alto',
    'schema': 'Medio',
    'analytics': 'Medio',
    'og-tags': 'Bajo',
    'viewport': 'Alto',
    'favicon': 'Bajo',
  }
  return impacts[key] || 'Bajo'
}

function generateProblems(technicalVariables, psiData) {
  const problems = []
  const failedVars = Object.entries(technicalVariables).filter(([, v]) => !v)
  failedVars.forEach(([key]) => {
    if (key === 'robots-txt') problems.push('robots.txt no está configurado')
    if (key === 'sitemap-xml') problems.push('sitemap.xml no encontrado')
    if (key === 'meta-description') problems.push('Meta descriptions faltantes o incompletas')
    if (key === 'h1') problems.push('H1 no detectado en la homepage')
    if (key === 'schema') problems.push('Schema Markup no implementado')
  })

  if (psiData?.mobile?.lighthouseResult) {
    const mob = psiData.mobile.lighthouseResult
    const perfScore = Math.round(mob.categories.performance.score * 100)
    if (perfScore < 50) problems.push('Velocidad de carga crítica (Performance <50)')

    const lcp = mob.audits['largest-contentful-paint']?.numericValue
    if (lcp && lcp > 4000) problems.push('LCP muy alto (>4s) afecta experiencia de usuario')
  }

  return problems
}

function generateOpportunities(psiData) {
  const opportunities = []
  if (psiData?.mobile?.lighthouseResult) {
    const mob = psiData.mobile.lighthouseResult
    const perfScore = Math.round(mob.categories.performance.score * 100)
    const seoScore = Math.round(mob.categories.seo.score * 100)

    if (perfScore > 50) opportunities.push(`Performance en móvil de ${perfScore} — mejorando velocidad`)
    if (seoScore > 60) opportunities.push(`SEO score de ${seoScore} — buena base de indexación`)
    opportunities.push('Posicionamiento en búsqueda local')
  }

  return opportunities
}

function drawTable(pdf, headers, rows, startX, startY, width) {
  const cellPadding = 2
  const cellHeight = 8
  const colWidths = [width * 0.5, width * 0.25, width * 0.25]

  // Headers
  pdf.setFillColor(240, 240, 240)
  headers.forEach((header, i) => {
    pdf.rect(startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), startY, colWidths[i], cellHeight, 'F')
    pdf.text(header, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0) + cellPadding, startY + cellHeight - cellPadding)
  })

  // Rows
  rows.forEach((row, rowIdx) => {
    const y = startY + cellHeight * (rowIdx + 1)
    row.forEach((cell, colIdx) => {
      pdf.rect(startX + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0), y, colWidths[colIdx], cellHeight)
      pdf.text(String(cell).substring(0, 20), startX + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0) + cellPadding, y + cellHeight - cellPadding)
    })
  })
}
