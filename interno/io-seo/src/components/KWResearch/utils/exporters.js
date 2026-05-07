import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// ── CSV Exporter ──────────────────────────────────────────────────────────
export function exportToCSV(data) {
  const { project, keywords, competitors, opportunities, metrics } = data

  let csv = `Keyword Research Report\n`
  csv += `Proyecto,${project.name}\n`
  csv += `URL,${project.mainURL}\n`
  csv += `Fecha,${new Date(project.timestamp).toLocaleString('es-ES')}\n`
  csv += `Industrias,"${project.industries.join('; ')}"\n\n`

  csv += `KEYWORDS\n`
  csv += `Keyword,Intención,Dificultad,Frecuencia,Fuentes\n`
  keywords.forEach(kw => {
    csv += `"${kw.keyword}","${kw.intention}",${kw.difficulty},${kw.frequency},"${kw.sources.join('; ')}"\n`
  })

  csv += `\nCOMPETIDORES\n`
  csv += `Sitio Web,Keywords Únicos,Performance Score,On-Page Score,Palabras Clave Comunes\n`
  competitors.forEach(comp => {
    csv += `"${comp.url}",${comp.uniqueKW},${comp.performanceScore}%,${comp.onPageScore}%,"${comp.commonKW.join('; ')}"\n`
  })

  csv += `\nOPORTUNIDADES\n`
  csv += `Keyword,Dificultad,Tráfico Potencial,Razón\n`
  opportunities.forEach(opp => {
    csv += `"${opp.keyword}",${opp.difficulty}%,"${opp.potentialTraffic}","${opp.reason}"\n`
  })

  csv += `\nMÉTRICAS GENERALES\n`
  csv += `Total Keywords,${metrics.totalKeywords}\n`
  csv += `Keywords Comerciales,${metrics.commercialKW}\n`
  csv += `Keywords Informacionales,${metrics.informationalKW}\n`
  csv += `Keywords Locales,${metrics.localKW}\n`
  csv += `Dificultad Promedio,${metrics.avgDifficulty}%\n`
  csv += `Oportunidades Encontradas,${metrics.opportunitiesFound}\n`
  csv += `Competidores Analizados,${metrics.competitorsAnalyzed}\n`

  downloadFile(csv, `kw-research-${project.name}.csv`, 'text/csv')
}

// ── JSON Exporter ─────────────────────────────────────────────────────────
export function exportToJSON(data) {
  const json = JSON.stringify(data, null, 2)
  downloadFile(json, `kw-research-${data.project.name}.json`, 'application/json')
}

// ── PDF Exporter ──────────────────────────────────────────────────────────
export async function exportToPDF(elementId, projectName) {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      alert('Error: No se encontró el contenedor para exportar a PDF')
      return
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= 297

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297
    }

    pdf.save(`kw-research-${projectName}.pdf`)
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    alert('Error al exportar a PDF. Intenta con Print-to-PDF (Ctrl+P)')
  }
}

// ── Utility: Download File ─────────────────────────────────────────────────
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// ── Google Sheets Instructions ────────────────────────────────────────────
export function getGoogleSheetsInstructions(csvFileName) {
  return `
📊 IMPORTAR A GOOGLE SHEETS

1. Descargaste: ${csvFileName}
2. Ve a Google Sheets (sheets.google.com)
3. Crea una nueva hoja en blanco
4. Menú → Archivo → Importar → Subir archivo
5. Selecciona el CSV descargado
6. Elige opción "Reemplazar hoja" o "Insertar nuevas hojas"
7. ¡Hecho! Tus datos están en Google Sheets

Alternativa rápida:
- Archivo → Importar → Google Drive → Busca tu CSV
  `
}
