const STORAGE_KEY = 'seo-reports-history'

const TYPE_LABELS = {
  'audit':       'Analizar Sitio Web',
  'prospecting': 'Informe Sitio Web',
  'audit-local': 'Auditoría Local',
  'kw-research': 'KW Research',
}

export function buildReportTitle(type, clientName, date = new Date()) {
  const d = new Date(date)
  const dateStr = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  const label = TYPE_LABELS[type] || type
  return `${label} · ${clientName} · ${dateStr}`
}

export function loadReports() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

export function persistReport(reportData) {
  const report = { id: Date.now(), date: new Date().toISOString(), ...reportData }
  report.title = buildReportTitle(report.type, report.clientName, report.date)
  const updated = [report, ...loadReports()]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return { report, updated }
}

export function deleteReportById(id) {
  const updated = loadReports().filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
