import React, { useState } from 'react'
import { Card, SectionTitle, FormRow, FormCol, Btn, Badge } from './UI.jsx'
import { SaveReportBar } from './SaveReportBar.jsx'
import { useMCPTools } from '../hooks/useMCPTools.js'
import { generateFullReportPDF, buildAuditLocalContent } from '../utils/pdfFullReport.js'
import { LinkCheckerSection } from './LinkCheckerSection.jsx'
import { SchemaSection } from './SchemaSection.jsx'
import { SecurityHeadersSection } from './SecurityHeadersSection.jsx'

const WEB_TOOL_IDS = ['link-checker', 'schema-validator', 'security-headers']

const MCP_TOOLS = [
  {
    id: 'code-structure',
    label: 'Análisis de Estructura de Código',
    description: 'Examina carpetas, archivos, arquitectura del proyecto',
    mcp: 'crawl-mcp',
  },
  {
    id: 'config-audit',
    label: 'Auditoría de Configuración',
    description: 'package.json, tsconfig, eslint, prettier, etc',
    mcp: 'crawl-mcp',
  },
  {
    id: 'dependencies',
    label: 'Análisis de Dependencias',
    description: 'Verifica versiones, vulnerabilidades, outdated',
    mcp: 'crawl-mcp',
  },
  {
    id: 'code-quality',
    label: 'Calidad de Código',
    description: 'Métricas: complejidad, duplicación, maintainability',
    mcp: 'fastmcp-seo',
  },
  {
    id: 'seo-content',
    label: 'Auditoría SEO de Contenido',
    description: 'Analiza componentes React, metadata, estructura',
    mcp: 'fastmcp-seo',
  },
  {
    id: 'semantic-html',
    label: 'Validación HTML Semántica',
    description: 'Estructura HTML, accesibilidad, semántica',
    mcp: 'puppeteer-mcp',
  },
  {
    id: 'performance-local',
    label: 'Análisis de Performance Local',
    description: 'Build time, bundle size, assets optimization',
    mcp: 'crawl-mcp',
  },
  {
    id: 'link-checker',
    label: 'Link Checker',
    description: 'Detecta enlaces rotos (4xx/5xx) y redirecciones. Requiere URL del sitio.',
    mcp: 'link-checker-mcp',
  },
  {
    id: 'schema-validator',
    label: 'Schema JSON-LD',
    description: 'Valida schemas JSON-LD y elegibilidad para Rich Results. Requiere URL del sitio.',
    mcp: 'schema-validator-mcp',
  },
  {
    id: 'security-headers',
    label: 'Cabeceras HTTP',
    description: 'Audita HSTS, CSP, X-Frame-Options y su impacto en E-E-A-T técnico. Requiere URL del sitio.',
    mcp: 'security-headers-mcp',
  },
]

export function AuditTecnicaLocal({ onSaveReport }) {
  const [webUrl, setWebUrl] = useState('')
  const { linksData, schemaData, securityData, loadingLinks, loadingSchema, loadingSecurity, checkLinks, validateSchema, checkSecurityHeaders } = useMCPTools()

  const [projectPath, setProjectPath] = useState('')
  const [projectInfo, setProjectInfo] = useState(null)
  const [selectedTools, setSelectedTools] = useState(
    MCP_TOOLS.map(t => t.id)
  )
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const toggleTool = (toolId) => {
    setSelectedTools(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    )
  }

  const hasWebTools = selectedTools.some(id => WEB_TOOL_IDS.includes(id))
  const selectAll = () => setSelectedTools(MCP_TOOLS.map(t => t.id))
  const deselectAll = () => setSelectedTools([])

  const handlePathChange = (e) => {
    const path = e.target.value
    setProjectPath(path)

    // Detectar tipo de proyecto
    if (path.includes('io-seo') || path.includes('seo-agent')) {
      setProjectInfo({
        name: 'io-seo (Auditoría SEO)',
        type: 'Next.js / React',
        framework: 'Next.js 16',
        language: 'TypeScript',
      })
    } else if (path.includes('esgarden')) {
      setProjectInfo({
        name: 'Esgarden (Tienda Jardinería)',
        type: 'E-Commerce / Next.js',
        framework: 'Next.js',
        language: 'TypeScript',
      })
    }
  }

  const handleAudit = async () => {
    if (!projectPath.trim()) {
      setError('Por favor ingresa la ruta del proyecto local')
      return
    }

    setError(null)
    setLoading(true)

    try {
      // Simulación — cuando MCPs estén conectados:
      // Esto ejecutará análisis reales en la carpeta local

      const mockResults = {
        projectPath,
        projectInfo,
        selectedTools: [...selectedTools],
        timestamp: new Date().toISOString(),
        results: {
          'code-structure': selectedTools.includes('code-structure') ? generateMockCodeStructure() : null,
          'config-audit': selectedTools.includes('config-audit') ? generateMockConfigAudit() : null,
          'dependencies': selectedTools.includes('dependencies') ? generateMockDependencies() : null,
          'code-quality': selectedTools.includes('code-quality') ? generateMockCodeQuality() : null,
          'seo-content': selectedTools.includes('seo-content') ? generateMockSeoContent() : null,
          'semantic-html': selectedTools.includes('semantic-html') ? generateMockSemanticHtml() : null,
          'performance-local': selectedTools.includes('performance-local') ? generateMockPerformanceLocal() : null,
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1500))
      setResults(mockResults)

      // Lanzar herramientas web reales si hay URL
      if (webUrl.trim()) {
        const url = webUrl.startsWith('http') ? webUrl : `https://${webUrl}`
        if (selectedTools.includes('link-checker'))     checkLinks(url)
        if (selectedTools.includes('schema-validator')) validateSchema(url)
        if (selectedTools.includes('security-headers')) checkSecurityHeaders(url)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* ── Panel de Configuración ─────────────────────────────────────── */}
      <Card>
        <SectionTitle>Configuración de Auditoría Local</SectionTitle>

        <FormRow>
          <FormCol>
            <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
              📁 Ruta Local del Proyecto
            </label>
            <textarea
              placeholder="Ej: E:\git\io-seo&#10;O: E:\git\clientes\esgarden&#10;O: C:\Users\tu-usuario\proyectos\mi-sitio"
              value={projectPath}
              onChange={handlePathChange}
              style={{ minHeight: 60, fontFamily: 'monospace', fontSize: 12 }}
            />
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
              💡 Ingresa la ruta absoluta de tu proyecto en local
            </p>
          </FormCol>
        </FormRow>

        {/* Project Info Detected */}
        {projectInfo && (
          <div style={{ fontSize: 12, color: 'var(--text)', padding: '8px', background: 'var(--ok-bg)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 4px 0' }}>✓ <strong>Proyecto detectado:</strong> {projectInfo.name}</p>
            <p style={{ margin: '0 0 2px 0', fontSize: 11 }}>🔧 Framework: {projectInfo.framework} ({projectInfo.language})</p>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 8, color: 'var(--text-2)', fontWeight: 500 }}>
            🔧 Herramientas de Auditoría (MCPs Disponibles)
          </label>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <Btn onClick={selectAll} style={{ fontSize: 11, padding: '6px 12px' }}>
              ✓ Seleccionar Todo
            </Btn>
            <Btn onClick={deselectAll} style={{ fontSize: 11, padding: '6px 12px' }}>
              ✗ Deseleccionar Todo
            </Btn>
            <span style={{ fontSize: 11, color: 'var(--text-2)', padding: '6px 12px', alignSelf: 'center' }}>
              {selectedTools.length} de {MCP_TOOLS.length} seleccionadas
            </span>
          </div>

          {/* Tools grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
            {MCP_TOOLS.map(tool => (
              <div
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                style={{
                  padding: '10px',
                  border: selectedTools.includes(tool.id) ? '1px solid var(--info)' : '0.5px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedTools.includes(tool.id) ? 'var(--info-bg)' : 'var(--bg-2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(tool.id)}
                    onChange={() => toggleTool(tool.id)}
                    style={{ marginTop: 2 }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, margin: '0 0 4px 0', color: 'var(--text)' }}>
                      {tool.label}
                    </p>
                    <p style={{ fontSize: 11, margin: 0, color: 'var(--text-2)' }}>
                      {tool.description}
                    </p>
                    <Badge type="info" style={{ marginTop: 6 }}>
                      {tool.mcp}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasWebTools && (
          <FormRow style={{ marginBottom: '1rem' }}>
            <FormCol>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
                🌐 URL del sitio web <span style={{ color: 'var(--warn)', fontWeight: 400 }}>(requerida para Link Checker, Schema y Cabeceras HTTP)</span>
              </label>
              <input
                type="text"
                placeholder="https://www.cliente.com"
                value={webUrl}
                onChange={e => setWebUrl(e.target.value)}
              />
            </FormCol>
          </FormRow>
        )}

        <Btn
          onClick={handleAudit}
          disabled={!projectPath.trim() || selectedTools.length === 0 || loading}
          variant="primary"
          style={{ width: '100%', padding: '10px 20px', fontSize: 14, fontWeight: 500 }}
        >
          {loading ? '⏳ Auditando proyecto...' : `▶ Iniciar Auditoría Local (${selectedTools.length} herramientas)`}
        </Btn>
      </Card>

      {/* Error */}
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

      {/* Resultados */}
      {results && (
        <Card>
          <SectionTitle>Resultados de Auditoría Local</SectionTitle>

          <div style={{ fontSize: 12, color: 'var(--text-2)', padding: '10px', background: 'var(--info-bg)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 4px 0' }}><strong>Proyecto:</strong> {results.projectInfo?.name}</p>
            <p style={{ margin: '0 0 4px 0' }}><strong>Ruta:</strong> {results.projectPath}</p>
            <p style={{ margin: 0 }}><strong>Timestamp:</strong> {new Date(results.timestamp).toLocaleString('es-ES')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            {results.results['code-structure'] && (
              <ResultSection title="📂 Estructura de Código" data={results.results['code-structure']} />
            )}
            {results.results['config-audit'] && (
              <ResultSection title="⚙️ Auditoría de Configuración" data={results.results['config-audit']} />
            )}
            {results.results['dependencies'] && (
              <ResultSection title="📦 Análisis de Dependencias" data={results.results['dependencies']} />
            )}
            {results.results['code-quality'] && (
              <ResultSection title="🎯 Calidad de Código" data={results.results['code-quality']} />
            )}
            {results.results['seo-content'] && (
              <ResultSection title="🔍 Auditoría SEO de Contenido" data={results.results['seo-content']} />
            )}
            {results.results['semantic-html'] && (
              <ResultSection title="📝 Validación HTML Semántica" data={results.results['semantic-html']} />
            )}
            {results.results['performance-local'] && (
              <ResultSection title="⚡ Performance Local" data={results.results['performance-local']} />
            )}

            {/* Resultados herramientas web */}
            {(loadingLinks || linksData) && results.selectedTools?.includes('link-checker') && (
              <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>🔗 Link Checker</p>
                <LinkCheckerSection data={linksData} loading={loadingLinks} onRun={checkLinks} url={webUrl} />
              </div>
            )}
            {(loadingSchema || schemaData) && results.selectedTools?.includes('schema-validator') && (
              <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>📋 Schema JSON-LD</p>
                <SchemaSection data={schemaData} loading={loadingSchema} onRun={validateSchema} url={webUrl} />
              </div>
            )}
            {(loadingSecurity || securityData) && results.selectedTools?.includes('security-headers') && (
              <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>🔒 Cabeceras HTTP</p>
                <SecurityHeadersSection data={securityData} loading={loadingSecurity} onRun={checkSecurityHeaders} url={webUrl} />
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Descargar + Guardar informe */}
      {results && (
        <>
          <div style={{ display: 'flex', gap: 8, margin: '0.75rem 0 0.5rem' }}>
            <Btn
              onClick={() => {
                const content = buildAuditLocalContent({ results, linksData, schemaData, securityData })
                const name    = results.projectInfo?.name || results.projectPath?.split(/[\\/]/).pop() || 'proyecto'
                const report  = {
                  type: 'audit-local', clientName: name, url: webUrl || '', date: new Date().toISOString(),
                  summary: { tools: results.selectedTools?.length || 0, projectType: results.projectInfo?.type || 'Local' },
                  fullContent: content,
                }
                const pdf = generateFullReportPDF(report)
                pdf.save(`SEO_AuditLocal_${name}_${new Date().toISOString().split('T')[0]}.pdf`)
              }}
              style={{ flex: 1, background: 'var(--info)', color: 'white', border: 'none', fontWeight: 500 }}
            >
              ⬇ Descargar resultados PDF
            </Btn>
          </div>
          {onSaveReport && (
            <SaveReportBar
              defaultName={results.projectInfo?.name || results.projectPath?.split(/[\\/]/).pop() || ''}
              onSave={clientName => {
                const content = buildAuditLocalContent({ results, linksData, schemaData, securityData })
                onSaveReport({
                  type: 'audit-local', clientName, url: webUrl || '',
                  summary: { tools: results.selectedTools?.length || 0, projectType: results.projectInfo?.type || 'Local', projectPath: results.projectPath },
                  fullContent: content,
                })
              }}
            />
          )}
        </>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-2)' }}>
          ⏳ Ejecutando {selectedTools.length} auditorías en paralelo...
        </div>
      )}

      {/* Empty state */}
      {!results && !loading && (
        <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-2)', fontSize: 13 }}>
          <p>👇 Ingresa la ruta local de tu proyecto y selecciona las herramientas de auditoría</p>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
            💡 Ejemplo: E:\git\io-seo<br/>
            Las auditorías usarán MCPs locales: puppeteer-mcp, crawl-mcp, fastmcp-seo
          </p>
        </div>
      )}
    </div>
  )
}

function ResultSection({ title, data }) {
  // Detectar tipo de resultado por el título
  if (title.includes('Estructura de Código')) return <CodeStructureSection data={data} />
  if (title.includes('Configuración')) return <ConfigAuditSection data={data} />
  if (title.includes('Dependencias')) return <DependenciesSection data={data} />
  if (title.includes('Calidad de Código')) return <CodeQualitySection data={data} />
  if (title.includes('SEO de Contenido')) return <SeoContentSection data={data} />
  if (title.includes('HTML Semántica')) return <SemanticHtmlSection data={data} />
  if (title.includes('Performance Local')) return <PerformanceLocalSection data={data} />

  // Fallback genérico
  return (
    <div style={{
      background: 'var(--bg-2)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px',
    }}>
      <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>{title}</p>
      <pre style={{ fontSize: 11, overflow: 'auto', maxHeight: 200, color: 'var(--text-2)', margin: 0 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

// Componentes específicos para cada tipo de auditoría
function CodeStructureSection({ data }) {
  const getStatus = (score) => score >= 85 ? 'ok' : score >= 70 ? 'warn' : 'crit'
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MetricCard label="Score General" value={data.score} status={getStatus(data.score)} />
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Componentes Encontrados</p>
        <AuditRow label="Componentes React" value={`${data.folders.components} archivos`} status="ok" />
        <AuditRow label="Páginas" value={`${data.folders.pages} archivos`} status="ok" />
        <AuditRow label="Custom Hooks" value={`${data.folders.hooks} archivos`} status="ok" />
        <AuditRow label="Archivos TypeScript" value={`${data.tsFiles} archivos`} status={data.tsFiles > 150 ? 'ok' : 'warn'} />
      </div>
      {data.issues && data.issues.length > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Puntos a Mejorar</p>
          {data.issues.map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

function ConfigAuditSection({ data }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MetricCard label="Score" value={data.score} status={data.score >= 80 ? 'ok' : 'warn'} />
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <AuditRow label="package.json" value={data.packageJson} status="ok" />
        <AuditRow label="TypeScript Config" value={data.tsconfig} status="ok" />
        <AuditRow label="ESLint" value={data.eslint} status="ok" />
        <AuditRow label="Prettier" value={data.prettier} status="ok" />
        <AuditRow label=".env Config" value={data.env} status={data.env.includes('⚠') ? 'warn' : 'ok'} />
      </div>
      {data.issues && data.issues.length > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Puntos a Mejorar</p>
          {data.issues.map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

function DependenciesSection({ data }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MetricCard label="Score" value={data.score} status={data.score >= 75 ? 'ok' : 'warn'} />
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <AuditRow label="Dependencias Totales" value={`${data.total} paquetes`} status="ok" />
        <AuditRow label="Dependencias Outdated" value={`${data.outdated} paquetes`} status={data.outdated === 0 ? 'ok' : 'warn'} />
        <AuditRow label="Vulnerabilidades" value={`${data.vulnerabilities} encontradas`} status={data.vulnerabilities === 0 ? 'ok' : 'crit'} />
      </div>
      {data.issues && data.issues.length > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Puntos a Mejorar</p>
          {data.issues.map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

function CodeQualitySection({ data }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MetricCard label="Score Mantenibilidad" value={data.maintainability.score} status={data.maintainability.score >= 80 ? 'ok' : 'warn'} />
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <AuditRow label="Complejidad Promedio" value={`${data.complexity.average.toFixed(1)}`} status={data.complexity.average < 5 ? 'ok' : 'warn'} />
        <AuditRow label="Duplicación de Código" value={`${data.duplication.percentage}%`} status={data.duplication.percentage < 5 ? 'ok' : 'warn'} />
        <AuditRow label="Líneas de Código" value={`${data.linesOfCode.toLocaleString()}`} status="ok" />
        <AuditRow label="Cobertura de Comentarios" value={data.commentCoverage} status={data.commentCoverage >= '30%' ? 'ok' : 'warn'} />
      </div>
      {data.issues && data.issues.length > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Puntos a Mejorar</p>
          {data.issues.map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

function SeoContentSection({ data }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MetricCard label="Score SEO" value={data.score} status={data.score >= 85 ? 'ok' : 'warn'} />
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <AuditRow label="Componentes con Metadata" value={`${data.componentsWithMetadata} encontrados`} status="ok" />
        <AuditRow label="Meta Tags Faltantes" value={`${data.missingMetaTags} elementos`} status={data.missingMetaTags === 0 ? 'ok' : 'warn'} />
        <AuditRow label="Open Graph Tags" value={data.openGraphTags} status="ok" />
        <AuditRow label="Densidad de Keywords" value={data.keywordDensity} status="ok" />
      </div>
      {data.issues && data.issues.length > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Puntos a Mejorar</p>
          {data.issues.map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

function SemanticHtmlSection({ data }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MetricCard label="Score Semántica" value={data.score} status={data.score >= 85 ? 'ok' : 'warn'} />
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <AuditRow label="Elementos Semánticos" value={`${Object.values(data.semanticElements).reduce((a,b) => a+b, 0)} encontrados`} status="ok" />
        <AuditRow label="Labels ARIA" value={`${data.accessibility.ariaLabels}`} status="ok" />
        <AuditRow label="Textos Alt en Imágenes" value={data.accessibility.altTexts} status="ok" />
        <AuditRow label="Contraste WCAG" value={data.accessibility.contrastRatio} status="ok" />
      </div>
      {data.issues && data.issues.length > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Puntos a Mejorar</p>
          {data.issues.map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

function PerformanceLocalSection({ data }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <MetricCard label="Score Performance" value={data.score} status={data.score >= 85 ? 'ok' : 'warn'} />
      <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <AuditRow label="Build Time" value={data.buildTime} status="ok" />
        <AuditRow label="Bundle Principal" value={data.bundleSize.main} status="ok" />
        <AuditRow label="Tree Shaking" value={data.optimizations.treeshaking} status="ok" />
        <AuditRow label="Code Minification" value={data.optimizations.codeMinification} status="ok" />
        <AuditRow label="Dynamic Imports" value={`${data.optimizations.dynamicImports.match(/\d+/)?.[0] || 0} encontrados`} status="ok" />
      </div>
      {data.issues && data.issues.length > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Puntos a Mejorar</p>
          {data.issues.map((issue, i) => (
            <IssueItem key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}

function IssueItem({ issue }) {
  const [expanded, setExpanded] = React.useState(false)
  const isError = issue.severity === 'crit' || issue.label?.includes('⚠')
  const statusColor = issue.severity === 'ok' ? 'var(--ok)' : isError ? 'var(--crit)' : issue.severity === 'info' ? 'var(--info)' : 'var(--warn)'
  const hasMultipleFiles = issue.files && issue.files.length > 1

  return (
    <div style={{
      borderBottom: '0.5px solid var(--border)',
      paddingBottom: 8,
      marginBottom: 8,
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: 12,
          color: 'var(--text)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          <span style={{ color: statusColor }}>
            {expanded ? '▼' : '▶'}
          </span>
          <span style={{ color: statusColor, fontWeight: 500 }}>
            {typeof issue === 'string' ? issue : issue.label}
          </span>
          {hasMultipleFiles && <span style={{ fontSize: 10, color: 'var(--text-3)' }}>({issue.files.length} archivos)</span>}
          {issue.severity && <Badge type={issue.severity}>{issue.severity === 'crit' ? 'Crítico' : issue.severity === 'ok' ? 'OK' : issue.severity === 'info' ? 'Info' : 'Mejorar'}</Badge>}
        </div>
      </button>

      {expanded && typeof issue === 'object' && (
        <div style={{
          background: 'var(--bg-3)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 8px 10px 24px',
          marginTop: 4,
          borderLeft: `3px solid ${statusColor}`,
          fontSize: 11,
        }}>
          {issue.files ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {issue.files.map((file, idx) => (
                <div key={idx} style={{ background: 'var(--bg-2)', padding: '8px', borderRadius: 3, borderLeft: `2px solid ${statusColor}` }}>
                  {file.file && (
                    <p style={{ margin: '0 0 4px 0', color: 'var(--text-2)', fontSize: 10 }}>
                      <strong>📁 {file.file}</strong>
                      {file.line && <span> • Línea {file.line}</span>}
                    </p>
                  )}
                  {file.url && (
                    <p style={{ margin: '0 0 4px 0', color: 'var(--text-2)', fontSize: 10 }}>
                      <strong>🔗 {file.url}</strong>
                    </p>
                  )}
                  {file.description && (
                    <p style={{ margin: '0 0 4px 0', color: 'var(--text-2)', fontSize: 10, lineHeight: 1.3 }}>
                      {file.description}
                    </p>
                  )}
                  {file.code && (
                    <div style={{ margin: '4px 0', background: 'var(--bg)', padding: '6px', borderRadius: 2, overflow: 'auto', maxHeight: 100 }}>
                      <pre style={{ margin: 0, fontSize: 9, fontFamily: 'monospace', color: 'var(--text-3)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {file.code}
                      </pre>
                    </div>
                  )}
                  {file.action && (
                    <p style={{ margin: '4px 0 0 0', color: 'var(--ok)', fontWeight: 500, fontSize: 10 }}>
                      ✓ {file.action}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              {issue.file && (
                <p style={{ margin: '0 0 6px 0', color: 'var(--text-2)' }}>
                  <strong>📁 Archivo:</strong> <code style={{ background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 3 }}>{issue.file}</code>
                </p>
              )}
              {issue.url && (
                <p style={{ margin: '0 0 6px 0', color: 'var(--text-2)' }}>
                  <strong>🔗 URL:</strong> <code style={{ background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 3 }}>{issue.url}</code>
                </p>
              )}
              {issue.line && (
                <p style={{ margin: '0 0 6px 0', color: 'var(--text-2)' }}>
                  <strong>📍 Línea:</strong> {issue.line}
                </p>
              )}
              {issue.code && (
                <div style={{ margin: '6px 0', background: 'var(--bg-2)', padding: '8px', borderRadius: 3, overflow: 'auto', maxHeight: 120 }}>
                  <pre style={{ margin: 0, fontSize: 10, fontFamily: 'monospace', color: 'var(--text-2)' }}>
                    {issue.code}
                  </pre>
                </div>
              )}
              {issue.description && (
                <p style={{ margin: '6px 0 0 0', color: 'var(--text-2)', lineHeight: 1.4 }}>
                  {issue.description}
                </p>
              )}
              {issue.action && (
                <p style={{ margin: '6px 0 0 0', color: 'var(--ok)', fontWeight: 500 }}>
                  ✓ {issue.action}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

function MetricCard({ label, value, status }) {
  const statusColor = status === 'ok' ? 'var(--ok)' : status === 'warn' ? 'var(--warn)' : 'var(--crit)'
  const statusLabel = { ok: 'Bueno', warn: 'Mejorar', crit: 'Crítico' }[status]

  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}>{label}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 500, color: statusColor }}>{value}</span>
        <Badge type={status}>{statusLabel}</Badge>
      </div>
    </div>
  )
}

function AuditRow({ label, value, status }) {
  const badgeType = status === 'ok' ? 'ok' : status === 'warn' ? 'warn' : 'crit'
  const badgeLabel = { ok: 'OK', warn: 'Mejorar', crit: 'Crítico' }[status]

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid var(--border)', fontSize: 12 }}>
      <span style={{ flex: 1 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: 'var(--text-2)', textAlign: 'right', minWidth: 100 }}>{value}</span>
        <Badge type={badgeType}>{badgeLabel}</Badge>
      </div>
    </div>
  )
}

// Mock data generators para auditoría LOCAL
function generateMockCodeStructure() {
  return {
    projectType: 'Next.js + React + TypeScript',
    folders: {
      components: 45,
      pages: 12,
      hooks: 8,
      utils: 6,
      styles: 'CSS modules + Tailwind',
      public: 'Assets estáticos',
      nodeModules: 'Dependencias instaladas'
    },
    totalFiles: 287,
    tsFiles: 198,
    jsxFiles: 89,
    score: 88,
    issues: [
      {
        label: '⚠️ 3 componentes sin documentación',
        severity: 'warn',
        files: [
          { file: 'src/components/KWResearch/KWResultsTabs.jsx', description: 'Componente complejo sin JSDoc', action: 'Agregar comentarios descriptivos en la función' },
          { file: 'src/components/AuditTecnicaLocal.jsx', description: 'Componente sin documentación de props', action: 'Documentar interface de props' },
          { file: 'src/components/ReportsHistory.jsx', description: 'Funciones helper sin explicar', action: 'Adicionar JSDoc básico' }
        ]
      },
      {
        label: '💡 Posibilidad de extraer 5 custom hooks',
        severity: 'info',
        file: 'src/components/KWResearch/KWResearch.jsx',
        line: '28-56',
        description: 'La lógica de análisis podría extraerse a un custom hook reutilizable',
        action: 'Crear hook useKWAnalysis() para mejorar reusabilidad'
      },
      {
        label: 'ℹ️ Archivos CSS sin utilizar (3 encontrados)',
        severity: 'info',
        files: [
          { file: 'src/styles/legacy.css', description: 'Estilos heredados no referenciados', action: 'Eliminar' },
          { file: 'src/styles/deprecated.css', description: 'Clases no utilizadas', action: 'Revisar y limpiar' }
        ]
      }
    ]
  }
}

function generateMockConfigAudit() {
  return {
    packageJson: '✓ Configurado correctamente',
    tsconfig: '✓ TypeScript v5.0+',
    eslint: '✓ ESLint activo (airbnb config)',
    prettier: '✓ Prettier configurado',
    gitignore: '✓ Presente',
    env: '⚠️ .env.example presente pero falta documentación',
    nextConfig: '✓ next.config.js optimizado',
    score: 85,
    issues: [
      {
        label: '⚠️ .env.example sin documentación completa',
        severity: 'warn',
        file: '.env.example',
        description: 'Faltan descripciones de variables de entorno',
        code: 'NEXT_PUBLIC_API_KEY=\nNEXT_PUBLIC_API_URL=\nPRIVATE_DB_PASSWORD=',
        action: 'Agregar comentarios explicativos encima de cada variable'
      },
      {
        label: '💡 Falta configuración de husky',
        severity: 'info',
        file: 'package.json',
        description: 'Sin pre-commit hooks configurados',
        code: '"prepare": "husky install"',
        action: 'Ejecutar: npm install husky && npx husky install'
      },
      {
        label: '💡 GitHub Actions no configurado',
        severity: 'info',
        file: '.github/workflows/',
        description: 'Sin pipeline de CI/CD',
        url: '.github/workflows/ci.yml',
        action: 'Crear workflow de test y build en CI'
      }
    ]
  }
}

function generateMockDependencies() {
  return {
    total: 156,
    outdated: 12,
    vulnerabilities: 0,
    devDependencies: 89,
    productionDependencies: 67,
    largest: [
      { package: 'next', version: '16.0.0', size: '45MB' },
      { package: 'react', version: '18.3.1', size: '42MB' },
      { package: 'typescript', version: '5.4.0', size: '28MB' }
    ],
    score: 78,
    issues: [
      {
        label: '⚠️ 12 paquetes con versiones desactualizadas',
        severity: 'warn',
        file: 'package.json',
        description: 'Hay actualizaciones disponibles para dependencias',
        code: 'html2canvas: ^1.4.1 → ^1.4.3\njspdf: ^4.2.1 → ^4.2.3\neslint: ^8.50.0 → ^8.52.0',
        action: 'Ejecutar: npm update para actualizar a versiones menores'
      },
      {
        label: '💡 Posibilidad de remover 5 dependencias sin uso',
        severity: 'info',
        file: 'package.json',
        description: 'Algunos paquetes instalados no se usan en el código',
        code: 'lodash, moment, classnames (verificar uso real)',
        action: 'Ejecutar: npm prune --production && npx depcheck'
      },
      {
        label: '⚠️ Bundle principal > 140KB',
        severity: 'warn',
        file: 'package.json',
        description: 'El bundle combinado es bastante grande',
        action: 'Considerar dynamic imports y code splitting'
      }
    ]
  }
}

function generateMockCodeQuality() {
  return {
    complexity: {
      average: 4.2,
      status: '✓ Bueno'
    },
    maintainability: {
      score: 82,
      status: '✓ Excelente'
    },
    duplication: {
      percentage: 2.1,
      status: '✓ Bajo'
    },
    linesOfCode: 24587,
    commentCoverage: '34%',
    score: 84,
    issues: [
      {
        label: '⚠️ Funciones con complejidad alta (2)',
        severity: 'warn',
        files: [
          {
            file: 'src/utils/kwAnalyzer.js',
            line: '45-120',
            description: 'Complejidad ciclomática: 8 (recomendado < 5)',
            code: 'function calculateDifficultyScore() {\n  // 8 branches anidadas\n}',
            action: 'Refactorizar en funciones más pequeñas'
          },
          {
            file: 'src/components/KWResearch/KWResultsTabs.jsx',
            line: '1-327',
            description: 'Componente muy largo (327 líneas)',
            action: 'Extraer sub-componentes para cada tab'
          }
        ]
      },
      {
        label: '💡 Cobertura de comentarios baja (34%)',
        severity: 'info',
        description: 'Aunque el código es legible, faltan explicaciones de lógica compleja',
        action: 'Agregar comentarios en funciones críticas y lógica de negocio'
      },
      {
        label: '⚠️ 2.1% código duplicado encontrado',
        severity: 'warn',
        file: 'src/components/KWResearch/',
        description: 'Bloques similares de validación de formularios repetidos',
        action: 'Extraer en función reutilizable validate()'
      }
    ]
  }
}

function generateMockSeoContent() {
  return {
    componentsWithMetadata: 28,
    missingMetaTags: 2,
    openGraphTags: '✓ Implementados',
    structuredData: 'schema.org implementado',
    keywordDensity: 'Optimal',
    headingStructure: '✓ H1-H6 correctamente jerarquizado',
    score: 89,
    issues: [
      {
        label: '⚠️ 2 páginas sin meta description',
        severity: 'warn',
        files: [
          {
            file: 'src/pages/KWResearch.jsx',
            line: '1-50',
            description: 'Falta meta description en head',
            code: '<Head>\n  <title>KW Research</title>\n  {/* Falta meta description */}\n</Head>',
            action: 'Agregar: <meta name="description" content="..." />'
          },
          {
            file: 'src/pages/AuditTecnica.jsx',
            line: '1-40',
            description: 'Sin meta description configurada',
            action: 'Configurar meta description de 155-160 caracteres'
          }
        ]
      },
      {
        label: '💡 Oportunidad de agregar FAQ Schema',
        severity: 'info',
        file: 'src/pages/FAQ.jsx',
        description: 'La página de preguntas frecuentes podría usar FAQPage schema',
        code: '"@type": "FAQPage",\n"mainEntity": [{\n  "@type": "Question",\n  "name": "...",\n  "acceptedAnswer": { "@type": "Answer", "text": "..." }\n}]',
        action: 'Implementar FAQPage schema JSON-LD'
      },
      {
        label: '⚠️ Densidad de keywords baja en home',
        severity: 'warn',
        file: 'src/pages/index.jsx',
        description: 'Las keywords target aparecen < 1% en el contenido',
        action: 'Mejorar redacción y distribuir keywords naturalmente'
      }
    ]
  }
}

function generateMockSemanticHtml() {
  return {
    semanticElements: {
      header: 3,
      nav: 2,
      main: 5,
      article: 8,
      section: 12,
      aside: 2,
      footer: 3
    },
    accessibility: {
      ariaLabels: 45,
      altTexts: '92%',
      contrastRatio: '✓ WCAG AA compliant'
    },
    langAttribute: '✓ Presente (es-ES)',
    score: 87,
    issues: [
      {
        label: '⚠️ 3 imágenes sin atributo alt',
        severity: 'warn',
        files: [
          {
            file: 'src/components/ReportsHistory.jsx',
            line: '120',
            description: 'Badge icon sin alt text',
            code: '<img src="/badge.svg" />',
            action: 'Agregar: <img src="/badge.svg" alt="Status badge" />'
          },
          {
            file: 'src/components/KWResearch/KWResultsTabs.jsx',
            line: '180, 200',
            description: '2 imágenes de competidores sin alt',
            code: '<img src={comp.logo} />',
            action: 'Agregar: alt={`Logo de ${comp.name}`}'
          }
        ]
      },
      {
        label: '💡 Mejorar labels ARIA en formarios',
        severity: 'info',
        file: 'src/components/KWResearch/KWResearchPanel.jsx',
        description: 'Algunos inputs no tienen aria-label asociado',
        code: '<input type="text" /> {/* Sin aria-label */}',
        action: 'Vincular inputs con <label> o agregar aria-label'
      },
      {
        label: '✓ Estructura semántica excelente',
        severity: 'ok',
        description: 'Uso correcto de elementos semánticos HTML5'
      }
    ]
  }
}

function generateMockPerformanceLocal() {
  return {
    buildTime: '28.4s',
    bundleSize: {
      main: '145KB',
      framework: '42KB',
      vendor: '312KB'
    },
    optimizations: {
      treeshaking: '✓ Activo',
      codeMinification: '✓ Habilitado',
      imageOptimization: '✓ next/image en uso',
      dynamicImports: '✓ 8 encontrados'
    },
    score: 86,
    issues: [
      {
        label: '⚠️ Build time > 25s (lento)',
        severity: 'warn',
        file: 'next.config.js',
        description: 'El build tarda 28.4s, ideal es < 20s',
        code: '// En next.config.js falta:\nswcMinify: true,\ntrailingSlash: false,\noptimizeFonts: true',
        action: 'Optimizar next.config.js y considerar SWC minification'
      },
      {
        label: '⚠️ Vendor bundle > 300KB',
        severity: 'warn',
        file: 'package.json',
        description: 'Librerías de terceros muy grandes',
        code: 'html2canvas: 142KB\njsPDF: 98KB',
        action: 'Evaluar usar alternativas más livianas o lazy loading'
      },
      {
        label: '💡 Aplicar Code Splitting a rutas secundarias',
        severity: 'info',
        file: 'src/pages/*.jsx',
        description: 'Las rutas /audit, /kw-research podrían cargar bajo demanda',
        code: 'const KWResearch = dynamic(() => import(\'./KWResearch\'),\n  { loading: () => <div>Cargando...</div> })',
        action: 'Implementar dynamic imports con suspense en rutas de menor tráfico'
      },
      {
        label: '✓ Tree shaking activo y minificación correcta',
        severity: 'ok',
        description: 'Bundle está correctamente optimizado'
      }
    ]
  }
}
