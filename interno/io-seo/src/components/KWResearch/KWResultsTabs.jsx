import React from 'react'
import { Card, SectionTitle, Tabs, Badge, Btn } from '../UI.jsx'

export function KWResultsTabs({ data, onExport }) {
  const [activeTab, setActiveTab] = React.useState('resumen')
  const [resumenSubTab, setResumenSubTab] = React.useState('metricas')

  const kwTabs = [
    { id: 'resumen', label: '📈 Resumen' },
    { id: 'keywords', label: '🔑 Keywords' },
    { id: 'competencia', label: '⚔️ Competencia' },
    { id: 'oportunidades', label: '💡 Oportunidades' },
    { id: 'rendimiento', label: '⚡ Rendimiento' },
  ]

  const resumenSubTabs = [
    { id: 'metricas', label: 'Métricas' },
    { id: 'variables', label: 'Diccionario de Variables' },
  ]

  return (
    <Card>
      {/* Tabs */}
      <Tabs tabs={kwTabs} active={activeTab} onChange={setActiveTab} />

      <div id="kw-results-content">
        {/* 1. RESUMEN TAB */}
        {activeTab === 'resumen' && (
          <div>
            {/* Sub-tabs dentro de Resumen */}
            <div style={{ marginBottom: '1rem' }}>
              <Tabs tabs={resumenSubTabs} active={resumenSubTab} onChange={setResumenSubTab} />
            </div>

            {/* RESUMEN SUB-TAB 1: MÉTRICAS */}
            {resumenSubTab === 'metricas' && (
              <div>
                <SectionTitle>Métricas del Análisis</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: '1rem' }}>
                  <MetricBox label="Total Keywords" value={data.metrics.totalKeywords} />
                  <MetricBox label="Comerciales" value={data.metrics.commercialKW} />
                  <MetricBox label="Informacionales" value={data.metrics.informationalKW} />
                  <MetricBox label="Locales" value={data.metrics.localKW} />
                  <MetricBox label="Dificultad Promedio" value={`${data.metrics.avgDifficulty}%`} />
                  <MetricBox label="Oportunidades" value={data.metrics.opportunitiesFound} />
                  <MetricBox label="Competidores" value={data.metrics.competitorsAnalyzed} />
                </div>

                <div style={{ fontSize: 12, color: 'var(--text-2)', padding: '10px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)' }}>
                  <p><strong>Proyecto:</strong> {data.project.name}</p>
                  <p><strong>URL:</strong> {data.project.mainURL}</p>
                  <p><strong>Industrias:</strong> {data.project.industries.join(', ') || 'No especificadas'}</p>
                  <p><strong>Fecha:</strong> {new Date(data.project.timestamp).toLocaleString('es-ES')}</p>
                </div>
              </div>
            )}

            {/* RESUMEN SUB-TAB 2: DICCIONARIO DE VARIABLES */}
            {resumenSubTab === 'variables' && (
              <div>
                <SectionTitle>Diccionario de Variables</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                  <VariableExplanation
                    variable="Keyword"
                    description="Palabra clave o frase de búsqueda que los usuarios buscan en Google."
                  />
                  <VariableExplanation
                    variable="Intención de Búsqueda"
                    description="Tipo de intención: Comercial (comprar/contratar), Informacional (aprender), Local (servicios locales), Transaccional (realizar acción)."
                  />
                  <VariableExplanation
                    variable="Dificultad (0-100%)"
                    description="Indicador de competencia para posicionar. Verde (0-30%): fácil | Amarillo (31-70%): medio | Rojo (71-100%): competido."
                  />
                  <VariableExplanation
                    variable="Frecuencia"
                    description="Número de veces que aparece la keyword en fuentes (GSC, competidores, análisis de contenido). Mayor número = más búsquedas potenciales."
                  />
                  <VariableExplanation
                    variable="Fuentes"
                    description="De dónde se extrajo la keyword: GSC (Google Search Console real), Competitor N (analizada en competidores), Blog (contenido detectado)."
                  />
                  <VariableExplanation
                    variable="Keywords Comerciales"
                    description="Palabras con alta intención de compra/contratación. Alto valor de conversión. Ejemplo: 'comprar plantas online'."
                  />
                  <VariableExplanation
                    variable="Keywords Informacionales"
                    description="Palabras con intención educativa. Generan tráfico pero menor conversión directa. Ejemplo: 'cómo cuidar plantas'."
                  />
                  <VariableExplanation
                    variable="Keywords Locales"
                    description="Palabras con intención local/geográfica. Ejemplo: 'jardinería cerca de mi', 'servicio Madrid'."
                  />
                  <VariableExplanation
                    variable="Performance Score"
                    description="Puntuación de rendimiento del sitio rival (0-100). Basado en Core Web Vitals, velocidad y optimización técnica."
                  />
                  <VariableExplanation
                    variable="On-Page Score"
                    description="Puntuación de optimización SEO en la página (0-100). Incluye: H1, meta tags, keywords density, estructura, enlaces internos."
                  />
                  <VariableExplanation
                    variable="Oportunidades"
                    description="Keywords con bajo esfuerzo (dificultad &lt;40%) pero alto potencial de tráfico. Quick wins para posicionamiento rápido."
                  />
                  <VariableExplanation
                    variable="Tráfico Potencial"
                    description="Estimación de visitas mensuales potenciales si posicionas en ese keyword. Basado en frecuencia e inverso de dificultad."
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. KEYWORDS TAB */}
        {activeTab === 'keywords' && (
          <div>
            <SectionTitle>Listado de Keywords</SectionTitle>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-2)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500, color: 'var(--text)' }}>Keyword</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontWeight: 500, color: 'var(--text)' }}>Intención</th>
                    <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500, color: 'var(--text)' }}>Dificultad</th>
                    <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500, color: 'var(--text)' }}>Frecuencia</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontWeight: 500, color: 'var(--text)' }}>Fuentes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.keywords.map((kw, idx) => (
                    <tr key={idx} style={{ borderBottom: '0.5px solid var(--border)' }}>
                      <td style={{ padding: '8px 0' }}>{kw.keyword}</td>
                      <td style={{ padding: '8px' }}>
                        <Badge type={getIntentionBadgeType(kw.intention)}>
                          {kw.intention}
                        </Badge>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <DifficultyBar value={kw.difficulty} />
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-2)' }}>{kw.frequency}</td>
                      <td style={{ padding: '8px', fontSize: 11 }}>
                        {kw.sources.map((src, i) => (
                          <Badge key={i} type="info" style={{ marginRight: 4, marginBottom: 2 }}>
                            {src}
                          </Badge>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. COMPETENCIA TAB */}
        {activeTab === 'competencia' && (
          <div>
            <SectionTitle>Análisis Competitivo</SectionTitle>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-2)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Sitio Web</th>
                    <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500 }}>Keywords Únicos</th>
                    <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500 }}>Performance</th>
                    <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500 }}>On-Page</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontWeight: 500 }}>Palabras Clave Comunes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.competitors.map((comp, idx) => (
                    <tr key={idx} style={{ borderBottom: '0.5px solid var(--border)' }}>
                      <td style={{ padding: '8px 0' }}>{comp.url}</td>
                      <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-2)' }}>{comp.uniqueKW}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <Badge type={comp.performanceScore >= 75 ? 'ok' : comp.performanceScore >= 50 ? 'warn' : 'crit'}>
                          {comp.performanceScore}%
                        </Badge>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <Badge type={comp.onPageScore >= 80 ? 'ok' : comp.onPageScore >= 60 ? 'warn' : 'crit'}>
                          {comp.onPageScore}%
                        </Badge>
                      </td>
                      <td style={{ padding: '8px', fontSize: 11 }}>
                        {comp.commonKW.slice(0, 3).map((kw, i) => (
                          <Badge key={i} type="info" style={{ marginRight: 4, marginBottom: 2 }}>
                            {kw}
                          </Badge>
                        ))}
                        {comp.commonKW.length > 3 && <span>+{comp.commonKW.length - 3}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. OPORTUNIDADES TAB */}
        {activeTab === 'oportunidades' && (
          <div>
            <SectionTitle>Oportunidades de Posicionamiento</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 10 }}>
              {data.opportunities.map((opp, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-2)',
                    border: '0.5px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px',
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{opp.keyword}</p>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 11 }}>
                    <Badge type={opp.difficulty < 40 ? 'ok' : 'warn'}>
                      Dif: {opp.difficulty}%
                    </Badge>
                    <Badge type="info">Tráfico: {opp.potentialTraffic}</Badge>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.4 }}>
                    {opp.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. RENDIMIENTO TAB */}
        {activeTab === 'rendimiento' && (
          <div>
            <SectionTitle>Métricas de Rendimiento</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
              <MetricBox label="SEO Score Promedio" value={`${100 - data.metrics.avgDifficulty}%`} />
              <MetricBox label="Tráfico Estimado" value={`+${Math.round(data.keywords.reduce((sum, k) => sum + k.frequency, 0) * 0.3)}`} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-2)', padding: '10px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', marginTop: '1rem' }}>
              <strong>Recomendación estratégica:</strong> Enfócate en keywords con dificultad &lt; 50%. Éstas ofrecen el mejor balance entre esfuerzo e impacto. Después de posicionar, escala hacia keywords más competidas.
            </p>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '1rem', paddingTop: '1rem', borderTop: '0.5px solid var(--border)' }}>
        <Btn onClick={() => onExport('csv')} style={{ flex: 1, fontSize: 12, padding: '8px 12px' }}>
          📥 CSV
        </Btn>
        <Btn onClick={() => onExport('json')} style={{ flex: 1, fontSize: 12, padding: '8px 12px' }}>
          📥 JSON
        </Btn>
        <Btn onClick={() => onExport('pdf')} style={{ flex: 1, fontSize: 12, padding: '8px 12px' }}>
          📥 PDF
        </Btn>
        <Btn onClick={() => onExport('gsheets')} style={{ flex: 1, fontSize: 12, padding: '8px 12px' }}>
          📊 Google Sheets
        </Btn>
      </div>
    </Card>
  )
}

// ── Utility Components ────────────────────────────────────────────────────
function MetricBox({ label, value }) {
  return (
    <div style={{
      background: 'var(--bg-2)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px',
      textAlign: 'center'
    }}>
      <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>
        {value}
      </p>
      <p style={{ fontSize: 11, color: 'var(--text-2)' }}>{label}</p>
    </div>
  )
}

function DifficultyBar({ value }) {
  const color = value < 35 ? 'var(--ok)' : value < 70 ? 'var(--warn)' : 'var(--crit)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ height: 6, width: 50, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{value}%</span>
    </div>
  )
}

function getIntentionBadgeType(intention) {
  switch (intention) {
    case 'Comercial': return 'crit'
    case 'Informacional': return 'info'
    case 'Local': return 'warn'
    case 'Transaccional': return 'ok'
    default: return 'na'
  }
}

function VariableExplanation({ variable, description }) {
  return (
    <div style={{
      background: 'var(--bg-2)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px',
    }}>
      <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>
        {variable}
      </p>
      <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  )
}
