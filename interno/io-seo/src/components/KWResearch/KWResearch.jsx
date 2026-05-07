import React, { useState, useCallback } from 'react'
import { KWResearchPanel } from './KWResearchPanel.jsx'
import { KWResultsTabs } from './KWResultsTabs.jsx'
import { SaveReportBar } from '../SaveReportBar.jsx'
import { generateMockAnalysis } from './utils/mockData.js'
import { exportToCSV, exportToJSON, exportToPDF, getGoogleSheetsInstructions } from './utils/exporters.js'
import { generateFullReportPDF, buildKWContent } from '../../utils/pdfFullReport.js'

const DEFAULT_KW_CONFIG = {
  projectName: '',
  mainUrl: '',
  industries: [],
  gscAccess: '',
  gscProperty: '',
  gscEmail: '',
  gscPassword: '',
  competitors: ['', '', ''],
}

export function KWResearch({ onSaveReport }) {
  const [config, setConfig] = useState(DEFAULT_KW_CONFIG)
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateConfig = useCallback((field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleAnalyze = async () => {
    setError(null)
    setLoading(true)

    try {
      // Validación básica
      if (!config.projectName.trim() || !config.mainUrl.trim()) {
        throw new Error('Por favor completa el nombre del proyecto y la URL')
      }

      // Simular pequeño delay para UX
      await new Promise(resolve => setTimeout(resolve, 800))

      // Generar análisis con mockups
      // TODO: Reemplazar con llamadas a MCPs reales:
      // - fastmcp-seo:extract_keywords (para URL principal y competidores)
      // - puppeteer-mcp:audit_seo_on_page (para scores)
      // - gsc-mcp:get_performance (si GSC está conectado)
      // - crawl-mcp:crawl_site (opcional, para análisis profundo)
      const data = generateMockAnalysis(config)

      setAnalysisData(data)
    } catch (err) {
      setError(err.message)
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (format) => {
    if (!analysisData) return

    try {
      switch (format) {
        case 'csv':
          exportToCSV(analysisData)
          break
        case 'json':
          exportToJSON(analysisData)
          break
        case 'pdf':
          await exportToPDF('kw-results-content', analysisData.project.name)
          break
        case 'gsheets':
          exportToCSV(analysisData)
          const instructions = getGoogleSheetsInstructions(`kw-research-${analysisData.project.name}.csv`)
          alert(instructions)
          break
        default:
          break
      }
    } catch (err) {
      console.error(`Export error (${format}):`, err)
      setError(`Error al exportar a ${format.toUpperCase()}`)
    }
  }

  return (
    <div>
      {/* Configuration Panel */}
      <KWResearchPanel
        config={config}
        onChange={updateConfig}
        onAnalyze={handleAnalyze}
        loading={loading}
      />

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '10px 15px',
          background: 'var(--crit-bg)',
          border: '0.5px solid var(--crit-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--crit)',
          fontSize: 13,
          marginBottom: '1rem',
        }}>
          ❌ {error}
        </div>
      )}

      {/* Results Panel */}
      {analysisData && (
        <>
          <KWResultsTabs data={analysisData} onExport={handleExport} />
          <div style={{ display: 'flex', gap: 8, margin: '0.75rem 0 0.5rem' }}>
            <button
              onClick={() => {
                const content = buildKWContent(analysisData)
                const report  = {
                  type: 'kw-research', clientName: config.projectName, url: config.mainUrl,
                  date: new Date().toISOString(),
                  summary: {
                    keywords: analysisData.metrics?.totalKeywords, opportunities: analysisData.metrics?.opportunitiesFound,
                    industry: config.industries?.[0] || '', competitors: config.competitors.filter(c => c.trim()).length,
                  },
                  fullContent: content,
                }
                const pdf = generateFullReportPDF(report)
                pdf.save(`SEO_KW_${config.projectName}_${new Date().toISOString().split('T')[0]}.pdf`)
              }}
              style={{ flex: 1, padding: '10px 16px', background: 'var(--info)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 500, fontSize: 13 }}
            >
              ⬇ Descargar resultados PDF
            </button>
          </div>
          {onSaveReport && (
            <SaveReportBar
              defaultName={config.projectName}
              onSave={clientName => {
                const content = buildKWContent(analysisData)
                onSaveReport({
                  type: 'kw-research', clientName, url: config.mainUrl,
                  summary: {
                    keywords: analysisData.metrics?.totalKeywords, opportunities: analysisData.metrics?.opportunitiesFound,
                    industry: config.industries?.[0] || '', competitors: config.competitors.filter(c => c.trim()).length,
                  },
                  fullContent: content,
                })
              }}
            />
          )}
        </>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: 'var(--text-2)',
          fontSize: 14,
        }}>
          ⏳ Analizando keywords, competidores y oportunidades...
        </div>
      )}

      {/* Empty State */}
      {!analysisData && !loading && (
        <div style={{
          padding: '30px 20px',
          textAlign: 'center',
          color: 'var(--text-2)',
          fontSize: 13,
        }}>
          <p>👇 Completa la configuración y haz clic en "Iniciar Análisis" para comenzar</p>
          <p style={{ fontSize: 11, marginTop: 8, color: 'var(--text-3)' }}>
            Los datos se generarán automáticamente. Pronto se integrarán MCPs reales para análisis más precisos.
          </p>
        </div>
      )}
    </div>
  )
}
