// ── Google Sheets API utilities ────────────────────────────────────────────
import * as XLSX from 'xlsx'

// Extrae Sheet ID de URL de Google Sheets
// Soporta: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit#gid=0
export function extractSheetId(url) {
  if (!url) return null
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return match?.[1]
}

// Importa datos desde Google Sheets usando API v4 (público, sin OAuth)
// Returns { kpis: {...}, keywords: [...], error?: string }
export async function importFromSheets(sheetId, apiKey, sheetName = 'KPIs') {
  if (!sheetId || !apiKey) {
    return { error: 'Faltan Sheet ID o API Key' }
  }

  try {
    const range = `${sheetName}!A:B` // Dos columnas: Campo, Valor
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

    const res = await fetch(url)
    if (!res.ok) {
      return { error: `Error Sheets API: ${res.status} ${res.statusText}` }
    }

    const data = await res.json()
    const values = data.values || []

    if (values.length === 0) {
      return { error: 'No se encontraron datos en la hoja' }
    }

    // Parsear KPIs (primera columna = nombre, segunda = valor)
    const kpis = {}
    for (let i = 1; i < values.length; i++) { // Skip header
      const [field, value] = values[i] || []
      if (!field) continue

      const normalized = normalizeFieldName(field)
      if (normalized) {
        kpis[normalized] = value || ''
      }
    }

    // Si hay sheet "Keywords", importarla
    let keywords = []
    if (sheetName !== 'Keywords') {
      const kwResult = await importFromSheets(sheetId, apiKey, 'Keywords')
      if (!kwResult.error && kwResult.keywords) {
        keywords = kwResult.keywords
      }
    } else {
      // Parser de Keywords: columnas son Keyword, Clicks, Posición, Impresiones, CTR
      keywords = values.slice(1).map(row => {
        if (!row[0]) return null
        const [keyword, clicks, pos] = row
        return [keyword, clicks || 0, pos || 0].join(',')
      }).filter(Boolean)
    }

    return { kpis, keywords, error: null }
  } catch (err) {
    return { error: `Error: ${err.message}` }
  }
}

// Mapea nombres de campos del sheet a keys del config de la app
function normalizeFieldName(fieldName) {
  if (!fieldName) return null

  const mapping = {
    'clicks (28 días)':        'gscClicks',
    'clicks':                   'gscClicks',
    'impresiones':             'gscImpr',
    'ctr medio (%)':           'gscCtr',
    'ctr':                      'gscCtr',
    'posición media':          'gscPos',
    'posición':                'gscPos',
    'keywords top 3':          'gscTop3',
    'top 3':                   'gscTop3',
    'keywords top 10':         'gscTop10',
    'top 10':                  'gscTop10',
    'keywords top 100':        'gscTop100',
    'top 100':                 'gscTop100',
    'clicks período anterior': 'gscPrev',
    'clicks período ant.':     'gscPrev',
    'clicks anterior':         'gscPrev',
  }

  const lower = fieldName.toLowerCase().trim()
  return mapping[lower] || null
}

// Genera XLSX con dos hojas: KPIs y Keywords
export function generateXLSXTemplate() {
  const kpiData = [
    ['Campo', 'Valor'],
    ['Clicks (28 días)', ''],
    ['Impresiones', ''],
    ['CTR medio (%)', ''],
    ['Posición media', ''],
    ['Keywords Top 3', ''],
    ['Keywords Top 10', ''],
    ['Keywords Top 100', ''],
    ['Clicks período anterior', ''],
  ]

  const keywordData = [
    ['Keyword', 'Clicks', 'Posición', 'Impresiones', 'CTR'],
    ['ejemplo keyword 1', 100, 5, 2000, 5],
    ['ejemplo keyword 2', 80, 8, 1800, 4.4],
  ]

  // Crear workbook con dos hojas
  const wb = XLSX.utils.book_new()
  const ws1 = XLSX.utils.aoa_to_sheet(kpiData)
  const ws2 = XLSX.utils.aoa_to_sheet(keywordData)

  // Ancho de columnas
  ws1['!cols'] = [{ wch: 30 }, { wch: 15 }]
  ws2['!cols'] = [{ wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 12 }]

  XLSX.utils.book_append_sheet(wb, ws1, 'KPIs')
  XLSX.utils.book_append_sheet(wb, ws2, 'Keywords')

  return wb
}

// Descarga XLSX
export function downloadCSV(filename = 'SEO-GSC-Template.xlsx') {
  const wb = generateXLSXTemplate()
  XLSX.writeFile(wb, filename)
}

// localStorage helpers
export const SHEETS_STORAGE = {
  lastUrl: 'gsc-sheets-lastUrl',
  mode: 'gsc-mode', // 'manual' | 'sheets'
  configBackup: 'gsc-config-backup',
}

export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (err) {
    console.warn('localStorage error:', err)
  }
}

export function loadPreference(key, defaultValue = null) {
  try {
    return localStorage.getItem(key) || defaultValue
  } catch (err) {
    return defaultValue
  }
}
