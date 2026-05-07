import React, { useState } from 'react'
import { Badge, Btn, Divider } from './UI.jsx'
import { SaveReportBar } from './SaveReportBar.jsx'
import { usePSI } from '../hooks/usePSI.js'
import { useSocialMediaAnalysis } from '../hooks/useSocialMediaAnalysis.js'
import { LinkCheckerSection } from './LinkCheckerSection.jsx'
import { SchemaSection } from './SchemaSection.jsx'
import { SecurityHeadersSection } from './SecurityHeadersSection.jsx'
import { LocalSEOSection } from './LocalSEOSection.jsx'
import { getScoreStatus } from '../utils/constants.js'
import { generateFullReportPDF, buildProspectingContent } from '../utils/pdfFullReport.js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zvehtloitnuglyjtxwye.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const EDGE_FN = `${SUPABASE_URL}/functions/v1/analyze-psi`

const ANALYSIS_MODULES = [
  { id: 'cwv',          label: 'Core Web Vitals',  description: 'Performance, LCP, CLS, INP — análisis PSI móvil',             mcp: 'analyze-psi',           icon: '⚡' },
  { id: 'competidores', label: 'Competidores',      description: 'Compara CWV de hasta 3 competidores directos',                mcp: 'analyze-psi',           icon: '🏆' },
  { id: 'links',        label: 'Link Checker',      description: 'Detecta enlaces rotos (4xx/5xx) y redirecciones',             mcp: 'link-checker-mcp',      icon: '🔗' },
  { id: 'schema',       label: 'Schema JSON-LD',    description: 'Valida schemas y elegibilidad para Rich Results de Google',   mcp: 'schema-validator-mcp',  icon: '📋' },
  { id: 'security',     label: 'Cabeceras HTTP',    description: 'Audita HSTS, CSP, X-Frame-Options y E-E-A-T técnico',        mcp: 'security-headers-mcp',  icon: '🔒' },
  { id: 'social',       label: 'Redes Sociales',    description: 'Detecta presencia en Instagram, LinkedIn, Facebook, YouTube', mcp: 'analyze-psi (fetchSocial)', icon: '📱' },
  { id: 'local-seo',   label: 'SEO Local / GBP',   description: 'Audita GBP, NAP, Map Pack y señales de SEO local',            mcp: 'analyze-psi (checkLocalSEO)', icon: '📍' },
]

async function callEdge(body) {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), 35000)
  try {
    const res = await fetch(EDGE_FN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(tid)
    return await res.json()
  } catch (e) {
    clearTimeout(tid)
    throw e
  }
}

function normalizeUrl(u) {
  return u.startsWith('http') ? u : `https://${u}`
}

function shortLabel(url) {
  return url.replace(/https?:\/\//, '').replace(/\/$/, '')
}

// Muestra resultados por página con tabs
function PageSection({ pages, renderPage }) {
  const [active, setActive] = useState(0)
  const safeActive = Math.min(active, pages.length - 1)
  if (pages.length === 0) return null
  if (pages.length === 1) return renderPage(pages[0])
  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
        {pages.map((url, i) => (
          <button
            key={url}
            onClick={() => setActive(i)}
            style={{
              padding: '4px 10px', fontSize: 11, fontFamily: 'monospace',
              borderRadius: 'var(--radius-sm)',
              border: safeActive === i ? '1px solid var(--info)' : '0.5px solid var(--border)',
              background: safeActive === i ? 'var(--info-bg)' : 'var(--bg-2)',
              color: safeActive === i ? 'var(--info)' : 'var(--text-2)',
              cursor: 'pointer', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
            title={url}
          >
            {shortLabel(url)}
          </button>
        ))}
      </div>
      {renderPage(pages[safeActive])}
    </div>
  )
}

function ProspectCard({ url, data, isMainTarget, label }) {
  if (!data?.lighthouseResult?.categories) return null
  const perf = Math.round(data.lighthouseResult.categories.performance?.score * 100) || 0
  const seo  = Math.round(data.lighthouseResult.categories.seo?.score * 100) || 0
  const audits = data.lighthouseResult.audits || {}
  const lcp = audits['largest-contentful-paint']?.displayValue || 'N/D'
  const cls = audits['cumulative-layout-shift']?.displayValue || 'N/D'
  const st = getScoreStatus(perf)
  return (
    <div style={{ border: isMainTarget ? '2px solid var(--info)' : '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
      {label && <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 3 }}>{label}</div>}
      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, wordBreak: 'break-all' }}>
        {isMainTarget && <span style={{ color: 'var(--info)' }}>★ </span>}{shortLabel(url)}
      </div>
      {[
        { label: 'Performance', val: <Badge type={st}>{perf}</Badge> },
        { label: 'SEO', val: seo },
        { label: 'LCP', val: lcp },
        { label: 'CLS', val: cls },
      ].map(r => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, padding: '3px 0', borderBottom: '0.5px solid var(--border)' }}>
          <span style={{ color: 'var(--text-2)' }}>{r.label}</span>
          <span>{r.val}</span>
        </div>
      ))}
    </div>
  )
}

function SocialCard({ url, socialData, loading }) {
  if (loading) return <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Analizando redes...</div>
  const found = Object.keys(socialData).filter(k => socialData[k])
  return (
    <div style={{ border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, wordBreak: 'break-all' }}>
        {shortLabel(url)}
      </div>
      {found.length === 0
        ? <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Sin redes detectadas</p>
        : <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{found.map(p => <Badge key={p} type="ok">{p}</Badge>)}</div>
      }
    </div>
  )
}

export function ProspectingPanel({ apiKeyValid, onValidateKey, validatingKey, onSaveReport }) {
  const [prospectUrl, setProspectUrl]     = useState('')
  const [subpageUrls, setSubpageUrls]     = useState(['', ''])
  const [competitorUrls, setCompetitorUrls] = useState(['', '', ''])
  const [selectedModules, setSelectedModules] = useState(ANALYSIS_MODULES.map(m => m.id))
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  // PSI
  const [prospectData, setProspectData]     = useState(null)
  const [subpagesData, setSubpagesData]     = useState({}) // { url: psiData }
  const [competitorData, setCompetitorData] = useState({})
  const [socialData, setSocialData]         = useState({})

  // MCP por página: { url: { links?, schema?, security?, loadingLinks?, loadingSchema?, loadingSecurity? } }
  const [pageResults, setPageResults] = useState({})

  const { analyzeUrl } = usePSI()
  const { analyze: analyzeSocial } = useSocialMediaAnalysis()

  const toggleModule = (id) =>
    setSelectedModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const selectAll   = () => setSelectedModules(ANALYSIS_MODULES.map(m => m.id))
  const deselectAll = () => setSelectedModules([])

  function validateUrl(url) {
    try { new URL(normalizeUrl(url)); return true } catch { return false }
  }

  function setPageKey(url, key, value) {
    setPageResults(prev => ({ ...prev, [url]: { ...(prev[url] || {}), [key]: value } }))
  }

  async function runLinksForPage(pageUrl) {
    setPageKey(pageUrl, 'loadingLinks', true)
    try {
      setPageKey(pageUrl, 'links', await callEdge({ url: pageUrl, checkLinks: true }))
    } catch (e) {
      setPageKey(pageUrl, 'links', { error: e.message })
    } finally {
      setPageKey(pageUrl, 'loadingLinks', false)
    }
  }

  async function runSchemaForPage(pageUrl) {
    setPageKey(pageUrl, 'loadingSchema', true)
    try {
      setPageKey(pageUrl, 'schema', await callEdge({ url: pageUrl, validateSchema: true }))
    } catch (e) {
      setPageKey(pageUrl, 'schema', { error: e.message })
    } finally {
      setPageKey(pageUrl, 'loadingSchema', false)
    }
  }

  async function runSecurityForPage(pageUrl) {
    setPageKey(pageUrl, 'loadingSecurity', true)
    try {
      setPageKey(pageUrl, 'security', await callEdge({ url: pageUrl, checkSecurityHeaders: true }))
    } catch (e) {
      setPageKey(pageUrl, 'security', { error: e.message })
    } finally {
      setPageKey(pageUrl, 'loadingSecurity', false)
    }
  }

  async function handleAnalyze() {
    setError('')
    setAnalyzed(false)
    setPageResults({})
    setProspectData(null)
    setSubpagesData({})
    setCompetitorData({})
    setSocialData({})

    if (!prospectUrl.trim() || !validateUrl(prospectUrl)) { setError('URL del prospecto inválida'); return }

    const url      = normalizeUrl(prospectUrl)
    const subpages = subpageUrls.filter(u => u.trim()).map(normalizeUrl)
    const compUrls = competitorUrls.filter(u => u.trim()).map(normalizeUrl)
    const allPages = [url, ...subpages]

    setLoading(true)
    let psiError = ''
    try {
      // CWV — main + subpáginas en paralelo
      if (selectedModules.includes('cwv')) {
        const [mainRes, ...subRes] = await Promise.allSettled([
          analyzeUrl(url),
          ...subpages.map(u => analyzeUrl(u)),
        ])
        if (mainRes.status !== 'fulfilled' || !mainRes.value) {
          psiError = 'PSI: No se pudo analizar. Verifica API Key, URL o intenta mas tarde. Continuando con otros modulos...'
          console.error('PSI Error:', mainRes.reason?.message || 'Unknown')
        } else {
          setProspectData(mainRes.value)
        }
        const subMap = {}
        subRes.forEach((r, i) => { if (r.status === 'fulfilled' && r.value) subMap[subpages[i]] = r.value })
        setSubpagesData(subMap)
      }

      // Competidores
      if (selectedModules.includes('competidores') && compUrls.length > 0) {
        const results = await Promise.allSettled(compUrls.map(u => analyzeUrl(u)))
        const cMap = {}
        results.forEach((r, i) => { if (r.status === 'fulfilled' && r.value) cMap[compUrls[i]] = r.value })
        setCompetitorData(cMap)
      }

      // Redes sociales (dominio principal + competidores)
      if (selectedModules.includes('social')) {
        const urlsToCheck = [url, ...compUrls]
        const resolved = await Promise.allSettled(urlsToCheck.map(u => analyzeSocial(u).then(data => ({ url: u, data }))))
        const sMap = {}
        resolved.forEach(r => { if (r.status === 'fulfilled') sMap[r.value.url] = r.value.data })
        setSocialData(sMap)
      }

      // MCP tools — una llamada por página, en paralelo (fire & forget)
      const mcpCalls = []
      allPages.forEach(pageUrl => {
        if (selectedModules.includes('links'))    mcpCalls.push(runLinksForPage(pageUrl))
        if (selectedModules.includes('schema'))   mcpCalls.push(runSchemaForPage(pageUrl))
        if (selectedModules.includes('security')) mcpCalls.push(runSecurityForPage(pageUrl))
      })
      Promise.allSettled(mcpCalls)

      setAnalyzed(true)
    } catch (err) {
      setError(err.message || 'Error al analizar')
    } finally {
      setLoading(false)
      if (psiError && !error) setError(psiError)
    }
  }

  // Valores derivados para el render
  const mainUrl  = prospectUrl.trim() ? normalizeUrl(prospectUrl) : ''
  const subpages = subpageUrls.filter(u => u.trim()).map(normalizeUrl)
  const compUrls = competitorUrls.filter(u => u.trim()).map(normalizeUrl)
  const allPages = mainUrl ? [mainUrl, ...subpages] : []
  const pagesKey = allPages.join('|') // para resetear tabs si cambian las páginas

  return (
    <div>
      {/* ── Formulario ───────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>Prospecto · Subpáginas · Competidores</p>
          <Btn
            onClick={onValidateKey}
            disabled={validatingKey || apiKeyValid}
            style={{ padding: '6px 12px', fontSize: 11, background: apiKeyValid ? 'var(--ok)' : 'var(--crit)', color: 'white', border: 'none', cursor: apiKeyValid ? 'default' : 'pointer', opacity: apiKeyValid ? 0.7 : 1 }}
          >
            {validatingKey ? '⏳ Validando...' : apiKeyValid ? '✓ API Key Válida' : 'Validar API Key'}
          </Btn>
        </div>

        {/* URL principal */}
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
            Prospecto * <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>— página de inicio</span>
          </label>
          <input
            type="text"
            value={prospectUrl}
            onChange={e => setProspectUrl(e.target.value)}
            placeholder="www.prospecto.com"
            style={{ width: '100%' }}
          />
        </div>

        {/* Subpáginas */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
            Subpáginas <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>— opcional (servicios, blog, contacto...)</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {subpageUrls.map((u, i) => (
              <input
                key={i}
                type="text"
                value={u}
                onChange={e => { const arr = [...subpageUrls]; arr[i] = e.target.value; setSubpageUrls(arr) }}
                placeholder={i === 0 ? 'ej: www.prospecto.com/servicios' : 'ej: www.prospecto.com/contacto'}
              />
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
            Link Checker, Schema y Cabeceras HTTP se ejecutarán en cada página indicada
          </p>
        </div>

        {/* Competidores (solo si módulo activo) */}
        {selectedModules.includes('competidores') && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>Competidores Directos</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {competitorUrls.map((u, i) => (
                <input
                  key={i}
                  type="text"
                  value={u}
                  onChange={e => { const arr = [...competitorUrls]; arr[i] = e.target.value; setCompetitorUrls(arr) }}
                  placeholder={`Competidor ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Módulos */}
        <Divider />
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>Variables a analizar</p>
            <div style={{ display: 'flex', gap: 6 }}>
              <Btn onClick={selectAll}   style={{ fontSize: 11, padding: '4px 10px' }}>Todas</Btn>
              <Btn onClick={deselectAll} style={{ fontSize: 11, padding: '4px 10px' }}>Ninguna</Btn>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
            {ANALYSIS_MODULES.map(mod => {
              const active = selectedModules.includes(mod.id)
              return (
                <div
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  style={{ padding: '10px', border: active ? '1px solid var(--info)' : '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', background: active ? 'var(--info-bg)' : 'var(--bg)', cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <input type="checkbox" checked={active} onChange={() => toggleModule(mod.id)} style={{ marginTop: 2 }} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, margin: '0 0 3px 0' }}>{mod.icon} {mod.label}</p>
                      <p style={{ fontSize: 11, margin: '0 0 5px 0', color: 'var(--text-2)' }}>{mod.description}</p>
                      <Badge type="info" style={{ fontSize: 10 }}>{mod.mcp}</Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
            {selectedModules.length} de {ANALYSIS_MODULES.length} módulos
            {allPages.length > 1 && ` · Link Checker, Schema y Cabeceras en ${allPages.length} páginas`}
          </p>
        </div>

        {error && <p style={{ fontSize: 11, color: 'var(--crit)', marginBottom: '0.75rem' }}>⚠ {error}</p>}

        <Btn onClick={handleAnalyze} disabled={loading || selectedModules.length === 0} variant="primary" style={{ width: '100%' }}>
          {loading
            ? 'Analizando...'
            : `Analizar prospecto (${selectedModules.length} módulos${allPages.length > 1 ? `, ${allPages.length} páginas` : ''}) →`}
        </Btn>
      </div>

      {/* ── Resultados ───────────────────────────────────────────────────── */}
      {analyzed && (
        <>
          {/* CWV: todas las URLs en grid comparativo */}
          {selectedModules.includes('cwv') && prospectData && (
            <>
              <p style={{ fontSize: 12, fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text-2)' }}>⚡ Core Web Vitals</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8, marginBottom: '1.5rem' }}>
                <ProspectCard url={mainUrl} data={prospectData} isMainTarget label="Principal" />
                {subpages.map(u => subpagesData[u] && (
                  <ProspectCard key={u} url={u} data={subpagesData[u]} isMainTarget={false} label="Subpágina" />
                ))}
                {selectedModules.includes('competidores') && Object.entries(competitorData).map(([u, d]) => (
                  <ProspectCard key={u} url={u} data={d} isMainTarget={false} label="Competidor" />
                ))}
              </div>
              <Divider />
            </>
          )}

          {/* Link Checker por página */}
          {selectedModules.includes('links') && (
            <>
              <p style={{ fontSize: 12, fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text-2)' }}>🔗 Link Checker</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <PageSection key={`links-${pagesKey}`} pages={allPages} renderPage={pageUrl => (
                  <LinkCheckerSection
                    data={pageResults[pageUrl]?.links}
                    loading={pageResults[pageUrl]?.loadingLinks}
                    onRun={runLinksForPage}
                    url={pageUrl}
                  />
                )} />
              </div>
              <Divider />
            </>
          )}

          {/* Schema por página */}
          {selectedModules.includes('schema') && (
            <>
              <p style={{ fontSize: 12, fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text-2)' }}>📋 Schema JSON-LD</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <PageSection key={`schema-${pagesKey}`} pages={allPages} renderPage={pageUrl => (
                  <SchemaSection
                    data={pageResults[pageUrl]?.schema}
                    loading={pageResults[pageUrl]?.loadingSchema}
                    onRun={runSchemaForPage}
                    url={pageUrl}
                  />
                )} />
              </div>
              <Divider />
            </>
          )}

          {/* Cabeceras HTTP por página */}
          {selectedModules.includes('security') && (
            <>
              <p style={{ fontSize: 12, fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text-2)' }}>🔒 Cabeceras HTTP</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <PageSection key={`security-${pagesKey}`} pages={allPages} renderPage={pageUrl => (
                  <SecurityHeadersSection
                    data={pageResults[pageUrl]?.security}
                    loading={pageResults[pageUrl]?.loadingSecurity}
                    onRun={runSecurityForPage}
                    url={pageUrl}
                  />
                )} />
              </div>
              <Divider />
            </>
          )}

          {/* Redes sociales (dominio + competidores) */}
          {selectedModules.includes('social') && (
            <>
              <p style={{ fontSize: 12, fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text-2)' }}>📱 Redes Sociales</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, marginBottom: '1.5rem' }}>
                <SocialCard url={mainUrl} socialData={socialData[mainUrl] || {}} loading={loading} />
                {selectedModules.includes('competidores') && compUrls.map(u => (
                  <SocialCard key={u} url={u} socialData={socialData[u] || {}} loading={loading} />
                ))}
              </div>
            </>
          )}

          {/* SEO Local */}
          {selectedModules.includes('local-seo') && (
            <>
              <p style={{ fontSize: 12, fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text-2)' }}>📍 SEO Local / GBP</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <LocalSEOSection url={mainUrl} />
              </div>
              <Divider />
            </>
          )}

          {/* Descargar + Guardar informe */}
          {(() => {
            const domain = mainUrl.replace(/https?:\/\//, '').split('/')[0]
            const buildSummary = () => ({
              modules:       selectedModules,
              subpages:      subpages.length,
              perfScore:     prospectData?.lighthouseResult?.categories?.performance?.score
                               ? Math.round(prospectData.lighthouseResult.categories.performance.score * 100) : null,
              seoScore:      prospectData?.lighthouseResult?.categories?.seo?.score
                               ? Math.round(prospectData.lighthouseResult.categories.seo.score * 100) : null,
              linksScore:    pageResults[mainUrl]?.links?.score,
              schemasFound:  pageResults[mainUrl]?.schema?.totalSchemas,
              securityScore: pageResults[mainUrl]?.security?.score,
            })
            const handleDownload = () => {
              const content = buildProspectingContent({ mainUrl, prospectData, subpagesData, competitorData, pageResults, selectedModules })
              const report  = { type: 'prospecting', clientName: domain, url: mainUrl, date: new Date().toISOString(), summary: buildSummary(), fullContent: content }
              const pdf = generateFullReportPDF(report)
              pdf.save(`SEO_Prospecto_${domain}_${new Date().toISOString().split('T')[0]}.pdf`)
            }
            return (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: '0.5rem' }}>
                  <Btn
                    onClick={handleDownload}
                    style={{ flex: 1, background: 'var(--info)', color: 'white', border: 'none', fontWeight: 500 }}
                  >
                    ⬇ Descargar resultados PDF
                  </Btn>
                </div>
                {onSaveReport && (
                  <SaveReportBar
                    defaultName={domain}
                    onSave={clientName => {
                      const content = buildProspectingContent({ mainUrl, prospectData, subpagesData, competitorData, pageResults, selectedModules })
                      onSaveReport({ type: 'prospecting', clientName, url: mainUrl, summary: buildSummary(), fullContent: content })
                    }}
                  />
                )}
              </>
            )
          })()}
        </>
      )}
    </div>
  )
}
