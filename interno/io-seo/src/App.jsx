import React, { useState, useCallback, useEffect } from 'react'
import { ConfigPanel } from './components/ConfigPanel.jsx'
import { CWVPanel } from './components/CWVPanel.jsx'
import { CompPanel } from './components/CompPanel.jsx'
import { GSCPanel } from './components/GSCPanel.jsx'
import { OnPagePanel, TecnicoPanel } from './components/AuditPanels.jsx'
import { ChecklistPanel } from './components/ChecklistPanel.jsx'
import { VariablesPanel } from './components/VariablesPanel.jsx'
import { ProspectingPanel } from './components/ProspectingPanel.jsx'
import { KWResearch } from './components/KWResearch/KWResearch.jsx'
import { LeadFormPage } from './pages/LeadFormPage.jsx'
import { ReportsHistory } from './components/ReportsHistory.jsx'
import { AuditTecnicaLocal } from './components/AuditTecnicaLocal.jsx'
import { LinkCheckerSection } from './components/LinkCheckerSection.jsx'
import { SchemaSection } from './components/SchemaSection.jsx'
import { SecurityHeadersSection } from './components/SecurityHeadersSection.jsx'
import { LocalSEOSection } from './components/LocalSEOSection.jsx'
import { Card, SectionTitle, MetricCard, Tabs, Btn, Divider } from './components/UI.jsx'
import { SaveReportBar } from './components/SaveReportBar.jsx'
import { usePSI } from './hooks/usePSI.js'
import { useChecklist } from './hooks/useChecklist.js'
import { useMCPTools } from './hooks/useMCPTools.js'
import { getScoreStatus } from './utils/constants.js'
import { buildReportPrompt, buildStrategyPrompt } from './utils/reportGenerator.js'
import { SHEETS_STORAGE, savePreference, loadPreference } from './utils/sheetsUtils.js'
import { loadReports, persistReport, deleteReportById } from './utils/reportStorage.js'
import { generateFullReportPDF, buildAuditContent } from './utils/pdfFullReport.js'

const TABS_KW = [
  { id: 'kw-research', label: 'KW Research 🔍' },
]

const TABS_PSI = [
  { id: 'cwv',      label: 'Core Web Vitals' },
  { id: 'comp',     label: 'Competidores' },
  { id: 'gsc',      label: 'Search Console' },
  { id: 'onpage',   label: 'On-Page' },
  { id: 'tecnico',  label: 'Técnico' },
  { id: 'links',    label: 'Links' },
  { id: 'schema',   label: 'Schema JSON-LD' },
  { id: 'seguridad',  label: 'Cabeceras HTTP' },
  { id: 'local-seo',  label: '📍 SEO Local' },
  { id: 'variables',  label: 'Variables 📊' },
  { id: 'manual',     label: 'Checklist manual' },
]

const DEFAULT_CONFIG = {
  url: '', clientName: '', sector: '', isLocal: 'si', market: 'España',
  apiKey: '',
  comp1: '', comp2: '', comp3: '',
  gscClicks: '', gscImpr: '', gscCtr: '', gscPos: '',
  gscTop3: '', gscTop10: '', gscTop100: '', gscPrev: '', gscKeywords: '',
}

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [activeTab, setActiveTab] = useState('cwv')
  const [compData, setCompData] = useState({})
  const [compLoading, setCompLoading] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [error, setError] = useState(null)
  const [isLeadFormPage, setIsLeadFormPage] = useState(false)
  const [mainTab, setMainTab] = useState('audit') // 'audit', 'kw-research', 'informes'
  const [reports, setReports] = useState([])
  const [psiData, setPsiData] = useState({ mobile: null, desktop: null })
  const [apiKeyValid, setApiKeyValid] = useState(false)
  const [validatingKey, setValidatingKey] = useState(false)
  const [psiDiag, setPsiDiag] = useState(null)
  const [diagRunning, setDiagRunning] = useState(false)

  const { data: hookPsiData, loading, analyze: hookAnalyze, analyzeUrl, testKey, checkPSIHealth } = usePSI()
  const { items, setStatus, setValue, summary, criticalItems, warnItems } = useChecklist()
  const { linksData, schemaData, securityData, localSEOData, loadingLinks, loadingSchema, loadingSecurity, loadingLocalSEO, checkLinks, validateSchema, checkSecurityHeaders, checkLocalSEO, reset: resetMCP, resetLocalSEO } = useMCPTools()

  // Cargar reportes desde localStorage
  useEffect(() => { setReports(loadReports()) }, [])

  // Detectar si estamos en /lead-form
  useEffect(() => {
    const path = window.location.hash.substring(1) || window.location.pathname
    setIsLeadFormPage(path.includes('lead-form'))
  }, [])

  // Restaurar config desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SHEETS_STORAGE.configBackup)
      if (saved) {
        const restored = JSON.parse(saved)
        setConfig(prev => ({ ...prev, ...restored }))
      }
    } catch (err) {
      console.warn('Error restoring config from localStorage:', err)
    }
  }, [])

  const updateConfig = useCallback((field, value) => {
    setConfig(prev => {
      const updated = { ...prev, [field]: value }
      // Guardar en localStorage cada cambio
      try {
        localStorage.setItem(SHEETS_STORAGE.configBackup, JSON.stringify(updated))
      } catch (err) {
        console.warn('Error saving config to localStorage:', err)
      }
      return updated
    })
  }, [])

  async function handleValidateKey() {
    setValidatingKey(true)
    try {
      const isValid = await testKey()
      setApiKeyValid(isValid)
    } catch (err) {
      console.error('Error validating key:', err)
      setApiKeyValid(false)
    } finally {
      setValidatingKey(false)
    }
  }

  async function handleAnalyze() {
    setError(null)
    setCompData({})
    resetMCP()
    console.log('🔍 Iniciando análisis...')
    const result = await hookAnalyze(config.url)
    console.log('📊 Resultado de análisis:', result)
    if (!result) { setError('No se pudo analizar el sitio. Verifica la URL y la API key.'); return }
    console.log('💾 Guardando datos en estado...')
    setPsiData(result)
    setAnalyzed(true)
    setApiKeyValid(true)
    console.log('✅ Estado actualizado')

    // Lanzar los tres MCP tools en paralelo
    checkLinks(config.url)
    validateSchema(config.url)
    checkSecurityHeaders(config.url)

    // Analyze competitors in background
    const compUrls = [config.comp1, config.comp2, config.comp3].filter(u => u.trim())
    if (compUrls.length) {
      setCompLoading(true)
      const results = await Promise.allSettled(compUrls.map(u => analyzeUrl(u)))
      const compMap = {}
      results.forEach((r, i) => { if (r.status === 'fulfilled' && r.value) compMap[compUrls[i]] = r.value })
      setCompData(compMap)
      setCompLoading(false)
    }
  }

  function handleCopyPrompt() {
    const prompt = buildReportPrompt({ config, psiData, criticalItems, warnItems, compData })
    navigator.clipboard?.writeText(prompt).catch(() => {})
    alert('📋 Prompt copiado al portapapeles. Pégalo en Claude.ai para generar el informe.')
  }

  function handleStrategy() {
    const prompt = buildStrategyPrompt({ config, psiData, criticalItems, warnItems })
    navigator.clipboard?.writeText(prompt).catch(() => {})
    alert('Prompt copiado al portapapeles. Pégalo en Claude.ai para generar el plan de acción.')
  }

  function handleSaveReport(reportData) {
    const { report, updated } = persistReport(reportData)
    setReports(updated)
    return report
  }

  const auditDefaultName = config.clientName || (config.url ? config.url.replace(/https?:\/\//, '').split('/')[0] : '')

  function buildAuditSummary() {
    const mob  = psiData?.mobile?.lighthouseResult?.categories
    const desk = psiData?.desktop?.lighthouseResult?.categories
    return {
      perfMobile:    Math.round(mob?.performance?.score  * 100) || 0,
      perfDesktop:   Math.round(desk?.performance?.score * 100) || 0,
      seoScore:      Math.round(mob?.seo?.score          * 100) || 0,
      accessibility: Math.round(mob?.accessibility?.score * 100) || 0,
      criticals:     criticalItems?.length || 0,
      warns:         warnItems?.length     || 0,
      competitors:   Object.keys(compData).length,
    }
  }

  function handleDownloadAudit() {
    const content = buildAuditContent({ psiData, linksData, schemaData, securityData, criticalItems, warnItems, compData })
    const report  = { type: 'audit', clientName: config.clientName || config.url, url: config.url, date: new Date().toISOString(), summary: buildAuditSummary(), fullContent: content }
    const pdf = generateFullReportPDF(report)
    const domain = config.url.replace(/https?:\/\//, '').split('/')[0]
    pdf.save(`SEO_${domain}_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  function handleSaveAuditReport(clientName) {
    const content = buildAuditContent({ psiData, linksData, schemaData, securityData, criticalItems, warnItems, compData })
    handleSaveReport({
      type: 'audit',
      clientName,
      url: config.url,
      summary: buildAuditSummary(),
      fullContent: content,
    })
  }

  // Summary metrics
  const mob = psiData?.mobile
  const desk = psiData?.desktop
  const mobCat = mob?.lighthouseResult?.categories
  const deskCat = desk?.lighthouseResult?.categories
  const summaryMetrics = mobCat ? [
    { label: 'Perf. móvil',      value: Math.round(mobCat.performance?.score * 100) || 0,   status: getScoreStatus(Math.round(mobCat.performance?.score * 100) || 0) },
    ...(deskCat ? [{ label: 'Perf. escritorio', value: Math.round(deskCat.performance?.score * 100) || 0, status: getScoreStatus(Math.round(deskCat.performance?.score * 100) || 0) }] : []),
    { label: 'SEO score',        value: Math.round(mobCat.seo?.score * 100) || 0,           status: getScoreStatus(Math.round(mobCat.seo?.score * 100) || 0) },
    { label: 'Accesibilidad',    value: Math.round(mobCat.accessibility?.score * 100) || 0, status: getScoreStatus(Math.round(mobCat.accessibility?.score * 100) || 0) },
    { label: 'Best practices',   value: Math.round(mobCat['best-practices']?.score * 100) || 0, status: getScoreStatus(Math.round(mobCat['best-practices']?.score * 100) || 0) },
  ] : []

  // Mostrar página de formulario si está en /lead-form
  if (isLeadFormPage) {
    return <LeadFormPage />
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-3)' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg)', borderBottom: '0.5px solid var(--border)', padding: '1rem 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)' }}>SEO Agent 2026</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Auditoría completa · Core Web Vitals · GSC · Competidores · Checklist 147 variables</p>
        </div>
      </div>

      {/* Chrome-style Tabs */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 0, maxWidth: 900, margin: '0 auto' }}>
        {['audit', 'informe-sitio-web', 'audit-tecnica', 'kw-research', 'informes'].map(tab => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: mainTab === tab ? 600 : 400,
              border: mainTab === tab ? '0.5px solid var(--border)' : '0.5px solid transparent',
              borderBottom: mainTab === tab ? 'none' : '0.5px solid var(--border)',
              background: mainTab === tab ? 'var(--bg)' : 'var(--bg-2)',
              color: 'var(--text)',
              cursor: 'pointer',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              marginRight: 4,
              transition: 'all 0.15s',
            }}
          >
            {tab === 'audit' && '🔍 Analizar Sitio Web'}
            {tab === 'informe-sitio-web' && '📋 Informe Sitio Web'}
            {tab === 'audit-tecnica' && '🔧 Auditoría Técnica Local'}
            {tab === 'kw-research' && '🔑 KW Research'}
            {tab === 'informes' && `📊 Informes (${reports.length})`}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem 1rem' }}>

        {error && (
          <div style={{ marginBottom: '1rem', padding: '10px 12px', background: 'rgba(220,53,69,0.07)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--crit)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: psiDiag ? 8 : 0 }}>
              <p style={{ fontSize: 13, color: error.startsWith('⚠') ? 'var(--warn)' : 'var(--crit)', flex: 1 }}>{error}</p>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {error.toLowerCase().includes('timeout') || error.toLowerCase().includes('psi') ? (
                  <Btn
                    disabled={diagRunning}
                    onClick={async () => {
                      setDiagRunning(true); setPsiDiag(null)
                      const r = await checkPSIHealth()
                      setPsiDiag(r)
                      setDiagRunning(false)
                    }}
                    style={{ fontSize: 11, padding: '5px 12px' }}
                  >
                    {diagRunning ? '⏳ Verificando...' : '🔍 Diagnosticar PSI'}
                  </Btn>
                ) : null}
                {!error.startsWith('⚠') && (
                  <Btn onClick={handleAnalyze} style={{ fontSize: 11, padding: '5px 12px' }}>↺ Reintentar</Btn>
                )}
              </div>
            </div>
            {psiDiag && (
              <p style={{ fontSize: 11, color: psiDiag.ok ? 'var(--ok)' : 'var(--warn)', marginTop: 4 }}>
                {psiDiag.ok
                  ? '✓ PSI API accesible desde Supabase. El problema es específico de la URL analizada (sitio lento).'
                  : `✗ PSI error: ${psiDiag.reason}`}
              </p>
            )}
          </div>
        )}

        {/* TAB 1: AUDIT SITIO WEB */}
        {mainTab === 'audit' && (
          <>
            <ConfigPanel
              config={config}
              onChange={updateConfig}
              onAnalyze={handleAnalyze}
              loading={loading}
              onTestKey={testKey}
            />

            {analyzed && (mob || desk) && (
              <>
                {/* Summary metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginBottom: '1rem' }}>
                  {summaryMetrics.map(m => <MetricCard key={m.label} {...m} />)}
                </div>

                {/* Result tabs */}
                <Card>
                  <Tabs tabs={TABS_PSI} active={activeTab} onChange={setActiveTab} />

                  {activeTab === 'cwv'       && <CWVPanel data={psiData} />}
                  {activeTab === 'comp'      && <CompPanel clientUrl={config.url} clientData={mob} compData={compData} loading={compLoading} />}
                  {activeTab === 'gsc'       && <GSCPanel config={config} />}
                  {activeTab === 'onpage'    && <OnPagePanel data={psiData} />}
                  {activeTab === 'tecnico'   && <TecnicoPanel data={psiData} />}
                  {activeTab === 'links'     && <LinkCheckerSection data={linksData} loading={loadingLinks} onRun={checkLinks} url={config.url} />}
                  {activeTab === 'schema'    && <SchemaSection data={schemaData} loading={loadingSchema} onRun={validateSchema} url={config.url} />}
                  {activeTab === 'seguridad'  && <SecurityHeadersSection data={securityData} loading={loadingSecurity} onRun={checkSecurityHeaders} url={config.url} />}
                  {activeTab === 'local-seo'  && <LocalSEOSection data={localSEOData} loading={loadingLocalSEO} onRun={d => checkLocalSEO({ url: config.url, ...d })} onReset={resetLocalSEO} url={config.url} />}
                  {activeTab === 'variables'  && <VariablesPanel />}
                  {activeTab === 'manual'    && <ChecklistPanel items={items} setStatus={setStatus} setValue={setValue} summary={summary} />}
                </Card>

                {/* Action buttons */}
                <Divider />
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Btn onClick={handleCopyPrompt} variant="primary" style={{ flex: 2, padding: '10px 20px', fontSize: 14 }}>
                    Copiar prompt informe ejecutivo →
                  </Btn>
                  <Btn onClick={handleStrategy} style={{ flex: 1 }}>
                    Plan de acción 90 días →
                  </Btn>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
                  Copia el prompt al portapapeles listo para Claude.ai o Claude Code.
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: '0.75rem' }}>
                  <Btn
                    onClick={handleDownloadAudit}
                    style={{ flex: 1, background: 'var(--info)', color: 'white', border: 'none', fontWeight: 500 }}
                  >
                    ⬇ Descargar resultados PDF
                  </Btn>
                </div>
                <SaveReportBar defaultName={auditDefaultName} onSave={handleSaveAuditReport} />
              </>
            )}
          </>
        )}

        {/* TAB 2: INFORME SITIO WEB */}
        {mainTab === 'informe-sitio-web' && (
          <ProspectingPanel apiKeyValid={apiKeyValid} onValidateKey={handleValidateKey} validatingKey={validatingKey} onSaveReport={handleSaveReport} />
        )}

        {/* TAB 3: AUDITORÍA TÉCNICA LOCAL */}
        {mainTab === 'audit-tecnica' && (
          <AuditTecnicaLocal onSaveReport={handleSaveReport} />
        )}

        {/* TAB 4: KW RESEARCH */}
        {mainTab === 'kw-research' && (
          <KWResearch onSaveReport={handleSaveReport} />
        )}

        {/* TAB 5: INFORMES */}
        {mainTab === 'informes' && (
          <ReportsHistory reports={reports} onDelete={(id) => setReports(deleteReportById(id))} />
        )}
      </div>
    </div>
  )
}
