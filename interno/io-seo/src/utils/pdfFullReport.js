import jsPDF from 'jspdf'

// ─── palette ─────────────────────────────────────────────────────────────────
const C = {
  brand:    [26,  26,  24],
  ok:       [76,  176, 80],
  warn:     [255, 152, 0],
  crit:     [220, 53,  69],
  info:     [33,  150, 243],
  text:     [20,  20,  20],
  light:    [102, 102, 102],
  muted:    [153, 153, 153],
  bg:       [245, 245, 245],
  white:    [255, 255, 255],
  border:   [221, 221, 221],
}

function scoreRgb(v, hi = 90, lo = 50) {
  if (v >= hi) return C.ok
  if (v >= lo) return C.warn
  return C.crit
}

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : C.text
}

// ─── PDF helper class ─────────────────────────────────────────────────────────
class Doc {
  constructor() {
    this.pdf = new jsPDF()
    this.W   = this.pdf.internal.pageSize.getWidth()
    this.H   = this.pdf.internal.pageSize.getHeight()
    this.m   = 15          // margin
    this.y   = 15
    this.iW  = this.W - 2 * this.m  // inner width
  }

  // ── render primitives
  rgb(arr) { return arr }

  fc(arr) { this.pdf.setFillColor(...arr) }
  tc(arr) { this.pdf.setTextColor(...arr) }
  dc(arr) { this.pdf.setDrawColor(...arr) }
  f(size, style = 'normal') { this.pdf.setFontSize(size); this.pdf.setFont(undefined, style) }

  txt(t, x, y, opts) { this.pdf.text(t ?? '', x, y, opts) }
  line(x1, y1, x2, y2) { this.pdf.line(x1, y1, x2, y2) }
  rect(x, y, w, h, s = 'F') { this.pdf.rect(x, y, w, h, s) }

  wrap(t, maxW) { return this.pdf.splitTextToSize(String(t ?? ''), maxW) }

  // ── flow control
  newPage() { this.pdf.addPage(); this.y = 20 }

  checkY(need = 20) { if (this.y + need > this.H - 18) this.newPage() }

  skip(n = 6) { this.y += n }

  footer() {
    const n = this.pdf.getNumberOfPages()
    for (let i = 1; i <= n; i++) {
      this.pdf.setPage(i)
      this.dc(C.border); this.line(this.m, this.H - 12, this.W - this.m, this.H - 12)
      this.f(7); this.tc(C.muted)
      this.txt('SEO Agent 2026 · Iorana Digital', this.m, this.H - 6)
      this.txt(`${i} / ${n}`, this.W - this.m, this.H - 6, { align: 'right' })
    }
    this.pdf.setPage(n)
  }

  // ── cover page
  cover(title, client, url, date) {
    this.fc(C.brand); this.rect(0, 0, this.W, this.H)
    this.tc(C.white)
    this.f(30, 'bold'); this.txt(title, this.W / 2, 75, { align: 'center' })
    this.f(14); this.txt(client || 'Sin especificar', this.W / 2, 105, { align: 'center' })
    this.f(11); this.tc(C.muted)
    const domain = (url || '').replace(/https?:\/\//, '').split('/')[0]
    this.txt(domain, this.W / 2, 125, { align: 'center' })
    this.f(10); this.tc([136, 136, 136])
    const d = new Date(date)
    const ds = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
    this.txt(`Generado: ${ds}`, this.W / 2, 195, { align: 'center' })
    this.txt('Iorana Digital · SEO Agent 2026', this.W / 2, this.H - 18, { align: 'center' })
  }

  // ── section header bar
  section(label, color = C.brand) {
    this.checkY(22)
    this.fc(color); this.rect(0, this.y - 3, this.W, 16)
    this.tc(C.white); this.f(11, 'bold')
    this.txt(label, this.m, this.y + 9)
    this.y += 20; this.tc(C.text)
  }

  // ── two-column label / value row
  row(label, value, even = false) {
    this.checkY(12)
    if (even) { this.fc(C.bg); this.rect(this.m, this.y - 3, this.iW, 11) }
    this.f(10); this.tc(C.light); this.txt(String(label), this.m + 2, this.y + 4)
    this.tc(C.text); this.txt(String(value ?? 'N/D'), this.W - this.m, this.y + 4, { align: 'right' })
    this.dc(C.border); this.line(this.m, this.y + 8, this.W - this.m, this.y + 8)
    this.y += 12
  }

  // ── score box (small pill)
  scoreBox(label, val, x, y, w = 42, h = 28) {
    this.fc(C.bg); this.rect(x, y, w, h)
    this.f(8); this.tc(C.light); this.txt(label, x + w / 2, y + 9, { align: 'center' })
    const rgb = typeof val === 'number' ? scoreRgb(val) : C.info
    this.f(15, 'bold'); this.tc(rgb)
    this.txt(typeof val === 'number' ? `${val}` : String(val ?? 'N/D'), x + w / 2, y + 23, { align: 'center' })
    this.tc(C.text)
  }

  // ── text block (wrapped)
  para(text, indent = 0) {
    const lines = this.wrap(text, this.iW - indent)
    this.checkY(lines.length * 5 + 4)
    this.f(10); this.tc(C.light)
    this.txt(lines, this.m + indent, this.y + 4)
    this.y += lines.length * 5 + 6
    this.tc(C.text)
  }

  // ── bullet item
  bullet(text, color = C.text) {
    this.checkY(10)
    this.tc(color); this.f(10)
    const lines = this.wrap(`• ${text}`, this.iW - 4)
    this.txt(lines, this.m + 4, this.y + 4)
    this.y += lines.length * 5 + 4
    this.tc(C.text)
  }

  // ── horizontal divider
  div() {
    this.checkY(8)
    this.dc(C.border); this.line(this.m, this.y, this.W - this.m, this.y)
    this.y += 8
  }
}

// ─── content extractors (called at save & at download) ────────────────────────

export function buildAuditContent({ psiData, linksData, schemaData, securityData, criticalItems, warnItems, compData }) {
  const mob    = psiData?.mobile
  const desk   = psiData?.desktop
  const mobCat  = mob?.lighthouseResult?.categories  || {}
  const deskCat = desk?.lighthouseResult?.categories || {}
  const aud     = mob?.lighthouseResult?.audits      || {}

  const score = (cat, key) => Math.round(((cat[key]?.score) ?? 0) * 100)

  const topFailed = Object.entries(aud)
    .filter(([, a]) => a.score !== null && a.score !== undefined && a.score < 0.9 &&
      !['manual', 'informative', 'notApplicable'].includes(a.scoreDisplayMode))
    .sort((a, b) => (a[1].score ?? 1) - (b[1].score ?? 1))
    .slice(0, 15)
    .map(([, a]) => ({ title: a.title, value: a.displayValue || '', score: Math.round((a.score ?? 0) * 100) }))

  const comps = {}
  Object.entries(compData || {}).forEach(([url, d]) => {
    const cat = d?.mobile?.lighthouseResult?.categories || d?.lighthouseResult?.categories
    if (!cat) return
    const cAud = d?.mobile?.lighthouseResult?.audits || d?.lighthouseResult?.audits || {}
    comps[url] = {
      perf: score(cat, 'performance'),
      seo:  score(cat, 'seo'),
      lcp:  cAud['largest-contentful-paint']?.displayValue || 'N/D',
      cls:  cAud['cumulative-layout-shift']?.displayValue  || 'N/D',
    }
  })

  return {
    scores: {
      mobile:  { perf: score(mobCat, 'performance'), seo: score(mobCat, 'seo'), a11y: score(mobCat, 'accessibility'), bp: score(mobCat, 'best-practices') },
      desktop: { perf: score(deskCat, 'performance'), seo: score(deskCat, 'seo') },
    },
    cwv: {
      lcp:  aud['largest-contentful-paint']?.displayValue || 'N/D',
      cls:  aud['cumulative-layout-shift']?.displayValue  || 'N/D',
      inp:  aud['interaction-to-next-paint']?.displayValue || 'N/D',
      fcp:  aud['first-contentful-paint']?.displayValue   || 'N/D',
      ttfb: aud['time-to-first-byte']?.displayValue       || 'N/D',
      tbt:  aud['total-blocking-time']?.displayValue      || 'N/D',
    },
    failedAudits: topFailed,
    competitors: comps,
    links: linksData ? {
      score:       linksData.score  || 0,
      total:       linksData.totalAnalyzed || 0,
      brokenCount: linksData.summary?.broken || 0,
      broken:      (linksData.broken || []).slice(0, 20),
      redirects:   linksData.summary?.redirects || 0,
    } : null,
    schema: schemaData ? {
      count:   schemaData.totalSchemas || (schemaData.schemas || []).length || 0,
      types:   (schemaData.schemas || []).map(s => s.type || s['@type'] || String(s)).slice(0, 10),
      score:   schemaData.score || 0,
      errors:  (schemaData.parseErrors || []).map(e => String(e)).slice(0, 5),
    } : null,
    security: securityData ? {
      score:   securityData.score || 0,
      headers: securityData.headers || {},
      issues:  (securityData.issues || securityData.missing || []).map(i => (typeof i === 'string' ? i : i.header || JSON.stringify(i))).slice(0, 10),
    } : null,
    checklist: {
      criticals: (criticalItems || []).slice(0, 20).map(i => i.label || i.text || String(i)),
      warnings:  (warnItems    || []).slice(0, 20).map(i => i.label || i.text || String(i)),
    },
  }
}

export function buildProspectingContent({ mainUrl, prospectData, subpagesData, competitorData, pageResults, selectedModules }) {
  const pages = {}
  const allUrls = [mainUrl, ...Object.keys(subpagesData || {})]

  allUrls.forEach(url => {
    const d = url === mainUrl ? prospectData : subpagesData?.[url]
    const cat = d?.lighthouseResult?.categories || {}
    const aud = d?.lighthouseResult?.audits     || {}
    const pr  = pageResults?.[url] || {}
    pages[url] = {
      isMain: url === mainUrl,
      cwv: d ? {
        perf: Math.round((cat.performance?.score || 0) * 100),
        seo:  Math.round((cat.seo?.score || 0) * 100),
        lcp:  aud['largest-contentful-paint']?.displayValue || 'N/D',
        cls:  aud['cumulative-layout-shift']?.displayValue  || 'N/D',
      } : null,
      links: pr.links ? {
        score:   pr.links.score || 0,
        broken:  pr.links.summary?.broken || 0,
        total:   pr.links.totalAnalyzed || 0,
        urls:    (pr.links.broken || []).slice(0, 10),
      } : null,
      schema: pr.schema ? {
        count: pr.schema.totalSchemas || 0,
        types: (pr.schema.schemas || []).map(s => s.type || s['@type'] || String(s)).slice(0, 6),
      } : null,
      security: pr.security ? { score: pr.security.score || 0 } : null,
    }
  })

  const comps = {}
  Object.entries(competitorData || {}).forEach(([url, d]) => {
    const cat = d?.lighthouseResult?.categories || {}
    const aud = d?.lighthouseResult?.audits     || {}
    comps[url] = {
      perf: Math.round((cat.performance?.score || 0) * 100),
      seo:  Math.round((cat.seo?.score || 0) * 100),
      lcp:  aud['largest-contentful-paint']?.displayValue || 'N/D',
    }
  })

  return { pages, competitors: comps, modules: selectedModules || [] }
}

export function buildAuditLocalContent({ results, linksData, schemaData, securityData }) {
  if (!results) return null
  return {
    projectPath: results.projectPath,
    projectInfo: results.projectInfo,
    tools: results.selectedTools || [],
    scores: Object.entries(results.results || {}).reduce((acc, [k, v]) => {
      if (v?.score !== undefined) acc[k] = v.score
      return acc
    }, {}),
    issues: Object.entries(results.results || {}).reduce((acc, [, v]) => {
      if (v?.issues?.length) {
        v.issues.slice(0, 5).forEach(i => acc.push(typeof i === 'object' ? (i.label || JSON.stringify(i)) : String(i)))
      }
      return acc
    }, []).slice(0, 20),
    links:    linksData  ? { score: linksData.score || 0,    broken: linksData.summary?.broken || 0 }  : null,
    schema:   schemaData ? { count: schemaData.totalSchemas || 0, score: schemaData.score || 0 }        : null,
    security: securityData ? { score: securityData.score || 0 }                                          : null,
  }
}

export function buildKWContent(analysisData) {
  if (!analysisData) return null
  return {
    project:      analysisData.project,
    metrics:      analysisData.metrics,
    keywords:     (analysisData.keywords || []).slice(0, 50).map(k => ({
      keyword: k.keyword, volume: k.volume, difficulty: k.difficulty, position: k.position, intent: k.intent,
    })),
    opportunities: (analysisData.opportunities || []).slice(0, 20).map(o => ({
      keyword: o.keyword, potential: o.potential, type: o.type,
    })),
    competitors: (analysisData.competitors || []).slice(0, 5).map(c => ({
      domain: c.domain, score: c.overallScore, keywords: c.keywords,
    })),
  }
}

// ─── PDF generators per type ──────────────────────────────────────────────────

function renderAudit(d, doc, meta) {
  if (!d) return
  const { scores, cwv, failedAudits, competitors, links, schema, security, checklist } = d

  // Performance Overview
  doc.section('⚡ Rendimiento · Core Web Vitals')
  const bx = doc.m
  const bW = (doc.iW - 16) / 4
  ;[
    ['Perf. Móvil',    scores?.mobile?.perf],
    ['Perf. Desktop',  scores?.desktop?.perf],
    ['SEO Score',      scores?.mobile?.seo],
    ['Accesibilidad',  scores?.mobile?.a11y],
  ].forEach(([lbl, val], i) => doc.scoreBox(lbl, val, bx + i * (bW + 4) + (i > 0 ? 2 : 0), doc.y, bW - 2))
  doc.y += 35; doc.skip(4)

  // CWV details
  if (cwv) {
    ;[['LCP', cwv.lcp], ['CLS', cwv.cls], ['INP', cwv.inp], ['FCP', cwv.fcp], ['TTFB', cwv.ttfb], ['TBT', cwv.tbt]].forEach(
      ([k, v], i) => doc.row(k, v, i % 2 === 0)
    )
  }
  doc.skip(6)

  // Failed audits
  if (failedAudits?.length) {
    doc.section('⚠ Auditorías con Problemas', C.crit)
    failedAudits.forEach((a, i) => {
      doc.checkY(14)
      const rgb = scoreRgb(a.score)
      doc.f(10); doc.tc(rgb); doc.txt(`${a.score}/100`, doc.m + 2, doc.y + 4)
      doc.tc(C.text); doc.txt(a.title, doc.m + 28, doc.y + 4)
      if (a.value) { doc.tc(C.light); doc.txt(a.value, doc.W - doc.m, doc.y + 4, { align: 'right' }) }
      doc.dc(C.border); doc.line(doc.m, doc.y + 8, doc.W - doc.m, doc.y + 8)
      doc.y += 12; doc.tc(C.text)
    })
    doc.skip(4)
  }

  // Competitors
  if (competitors && Object.keys(competitors).length) {
    doc.section('🏆 Comparativa de Competidores', [41, 98, 155])
    doc.row('Dominio', 'Perf. / SEO / LCP / CLS', false)
    Object.entries(competitors).forEach(([url, c], i) => {
      const domain = url.replace(/https?:\/\//, '').split('/')[0]
      doc.row(domain, `${c.perf} / ${c.seo} / ${c.lcp} / ${c.cls}`, i % 2 === 0)
    })
    doc.skip(6)
  }

  // Links
  if (links) {
    doc.section(`🔗 Links  (Score: ${links.score}/100)`, [33, 150, 243])
    doc.row('Total analizados', links.total, false)
    doc.row('Rotos',            links.brokenCount, true)
    doc.row('Redirecciones',   links.redirects,   false)
    if (links.broken?.length) {
      doc.skip(4); doc.f(10, 'bold'); doc.tc(C.crit); doc.txt('Enlaces rotos:', doc.m, doc.y + 4); doc.y += 10; doc.tc(C.text)
      links.broken.slice(0, 10).forEach(u => doc.bullet(String(u), C.crit))
    }
    doc.skip(4)
  }

  // Schema
  if (schema) {
    doc.section(`📋 Schema JSON-LD  (${schema.count} schemas)`, [76, 175, 80])
    if (schema.types?.length) {
      doc.f(10); doc.tc(C.light); doc.txt('Tipos detectados:', doc.m + 2, doc.y + 4); doc.y += 10
      schema.types.forEach(t => doc.bullet(t))
    }
    if (schema.errors?.length) {
      doc.f(10, 'bold'); doc.tc(C.crit); doc.txt('Errores:', doc.m + 2, doc.y + 4); doc.y += 10; doc.tc(C.text)
      schema.errors.forEach(e => doc.bullet(e, C.crit))
    }
    doc.skip(4)
  }

  // Security
  if (security) {
    doc.section(`🔒 Cabeceras HTTP  (Score: ${security.score}/100)`, [156, 39, 176])
    if (security.headers) {
      Object.entries(security.headers).slice(0, 10).forEach(([k, v], i) =>
        doc.row(k, typeof v === 'boolean' ? (v ? '✓ Presente' : '✗ Ausente') : String(v), i % 2 === 0)
      )
    }
    if (security.issues?.length) {
      doc.skip(4); doc.f(10, 'bold'); doc.tc(C.warn); doc.txt('Cabeceras faltantes:', doc.m + 2, doc.y + 4); doc.y += 10; doc.tc(C.text)
      security.issues.forEach(i => doc.bullet(String(i), C.warn))
    }
    doc.skip(4)
  }

  // Checklist
  if (checklist?.criticals?.length || checklist?.warnings?.length) {
    doc.section('📝 Checklist · Puntos de Acción', C.warn)
    if (checklist.criticals?.length) {
      doc.f(10, 'bold'); doc.tc(C.crit); doc.txt('Críticos:', doc.m + 2, doc.y + 4); doc.y += 10; doc.tc(C.text)
      checklist.criticals.forEach(c => doc.bullet(String(c), C.crit))
    }
    if (checklist.warnings?.length) {
      doc.skip(4)
      doc.f(10, 'bold'); doc.tc(C.warn); doc.txt('A mejorar:', doc.m + 2, doc.y + 4); doc.y += 10; doc.tc(C.text)
      checklist.warnings.forEach(w => doc.bullet(String(w), C.warn))
    }
  }
}

function renderProspecting(d, doc) {
  if (!d) return

  Object.entries(d.pages || {}).forEach(([url, page]) => {
    const label = page.isMain ? '★ Principal' : 'Subpágina'
    const domain = url.replace(/https?:\/\//, '').split('/')[0]
    doc.section(`${label}: ${domain}`, page.isMain ? [26, 26, 24] : [41, 98, 155])

    if (page.cwv) {
      ;[['Performance', page.cwv.perf], ['SEO', page.cwv.seo], ['LCP', page.cwv.lcp], ['CLS', page.cwv.cls]].forEach(
        ([k, v], i) => doc.row(k, v, i % 2 === 0)
      )
    }
    if (page.links)    doc.row('Links rotos', page.links.broken, false)
    if (page.schema)   doc.row('Schemas JSON-LD', page.schema.count, true)
    if (page.security) doc.row('Seguridad score', `${page.security.score}/100`, false)
    doc.skip(6)
  })

  if (Object.keys(d.competitors || {}).length) {
    doc.section('🏆 Competidores', [41, 98, 155])
    Object.entries(d.competitors).forEach(([url, c], i) => {
      const domain = url.replace(/https?:\/\//, '').split('/')[0]
      doc.row(domain, `Perf: ${c.perf}  SEO: ${c.seo}  LCP: ${c.lcp}`, i % 2 === 0)
    })
  }
}

function renderAuditLocal(d, doc) {
  if (!d) return

  doc.section('📁 Información del Proyecto')
  if (d.projectInfo?.name) doc.row('Nombre', d.projectInfo.name, false)
  doc.row('Ruta', d.projectPath, true)
  doc.row('Tipo', d.projectInfo?.type || 'N/D', false)
  doc.row('Herramientas ejecutadas', d.tools?.length || 0, true)
  doc.skip(6)

  if (Object.keys(d.scores || {}).length) {
    doc.section('📊 Scores por Herramienta', [41, 98, 155])
    const toolLabels = {
      'code-structure': 'Estructura de Código', 'config-audit': 'Configuración',
      'dependencies': 'Dependencias', 'code-quality': 'Calidad de Código',
      'seo-content': 'SEO de Contenido', 'semantic-html': 'HTML Semántica',
      'performance-local': 'Performance Local',
    }
    Object.entries(d.scores).forEach(([k, v], i) =>
      doc.row(toolLabels[k] || k, `${v}/100`, i % 2 === 0)
    )
    doc.skip(6)
  }

  if (d.links)    doc.row('Link Checker score', `${d.links.score}/100`, false), doc.row('Links rotos', d.links.broken, true)
  if (d.schema)   doc.row('Schemas detectados', d.schema.count, false), doc.row('Schema score', `${d.schema.score}/100`, true)
  if (d.security) doc.row('Seguridad score', `${d.security.score}/100`, false)

  if (d.issues?.length) {
    doc.section('⚠ Puntos a Mejorar', C.warn)
    d.issues.forEach(i => doc.bullet(String(i), C.warn))
  }
}

function renderKW(d, doc) {
  if (!d) return

  doc.section('🔑 Resumen de Keywords')
  const m = d.metrics || {}
  ;[
    ['Keywords analizadas',  m.totalKeywords   || d.keywords?.length || 0],
    ['Oportunidades',        m.opportunitiesFound || d.opportunities?.length || 0],
    ['Dificultad promedio',  m.avgDifficulty   || 'N/D'],
    ['Volumen potencial',    m.totalVolume     || 'N/D'],
  ].forEach(([k, v], i) => doc.row(k, v, i % 2 === 0))
  doc.skip(6)

  if (d.keywords?.length) {
    doc.section('📋 Keywords Principales', [41, 98, 155])
    // header
    doc.checkY(12)
    doc.f(9, 'bold'); doc.tc(C.light)
    doc.txt('Keyword', doc.m + 2, doc.y + 4)
    doc.txt('Vol', doc.m + 90, doc.y + 4)
    doc.txt('Dif', doc.m + 116, doc.y + 4)
    doc.txt('Pos', doc.m + 142, doc.y + 4)
    doc.txt('Intent', doc.m + 162, doc.y + 4)
    doc.dc(C.border); doc.line(doc.m, doc.y + 8, doc.W - doc.m, doc.y + 8)
    doc.y += 12; doc.tc(C.text)

    d.keywords.slice(0, 30).forEach((k, i) => {
      doc.checkY(10)
      if (i % 2 === 0) { doc.fc(C.bg); doc.rect(doc.m, doc.y - 3, doc.iW, 10) }
      doc.f(9); doc.tc(C.text)
      const kw = String(k.keyword || '').slice(0, 35)
      doc.txt(kw, doc.m + 2, doc.y + 4)
      doc.txt(String(k.volume    || 0),   doc.m + 90,  doc.y + 4)
      doc.txt(String(k.difficulty || 0),  doc.m + 116, doc.y + 4)
      doc.txt(String(k.position  || '-'), doc.m + 142, doc.y + 4)
      doc.txt(String(k.intent    || '-'), doc.m + 162, doc.y + 4)
      doc.y += 10
    })
    doc.skip(6)
  }

  if (d.opportunities?.length) {
    doc.section('🚀 Oportunidades de Posicionamiento', C.ok)
    d.opportunities.forEach((o, i) => {
      const label = `${o.keyword || ''} · ${o.type || ''}`
      const val   = o.potential ? `Potencial: ${o.potential}` : ''
      doc.row(label, val, i % 2 === 0)
    })
    doc.skip(4)
  }

  if (d.competitors?.length) {
    doc.section('🏆 Competidores', [41, 98, 155])
    d.competitors.forEach((c, i) =>
      doc.row(c.domain || 'N/D', `Score: ${c.score || 'N/D'} · KWs: ${c.keywords || 'N/D'}`, i % 2 === 0)
    )
  }
}

// ─── main export ──────────────────────────────────────────────────────────────

export function generateFullReportPDF(report) {
  const { type, fullContent, summary, clientName, url = '', date } = report
  const doc = new Doc()

  const TITLE_MAP = {
    'audit':       'INFORME SEO · Análisis Completo',
    'prospecting': 'INFORME SEO · Análisis Sitio Web',
    'audit-local': 'INFORME SEO · Auditoría Técnica Local',
    'kw-research': 'INFORME SEO · Keyword Research',
  }

  doc.cover(TITLE_MAP[type] || 'INFORME SEO', clientName, url, date)
  doc.newPage()

  // Executive summary
  doc.section('📌 Resumen Ejecutivo')
  const domain = url.replace(/https?:\/\//, '').split('/')[0]
  doc.para(`Informe de ${TITLE_MAP[type] || 'SEO'} para ${domain}. Generado el ${new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}.`)
  doc.skip(4)
  if (summary) {
    const LABELS = {
      perfMobile: 'Performance Móvil', perfDesktop: 'Performance Desktop',
      seoScore: 'SEO Score', accessibility: 'Accesibilidad',
      criticals: 'Críticos', warns: 'Avisos', competitors: 'Competidores',
      modules: 'Módulos', subpages: 'Subpáginas', perfScore: 'CWV Score',
      linksScore: 'Links Score', schemasFound: 'Schemas', securityScore: 'Seguridad',
      tools: 'Herramientas', projectType: 'Tipo de Proyecto', projectPath: 'Ruta',
      keywords: 'Keywords', opportunities: 'Oportunidades', industry: 'Sector',
    }
    Object.entries(summary).forEach(([k, v], i) => {
      if (v === null || v === undefined) return
      const label = LABELS[k] || k
      const val   = Array.isArray(v) ? v.join(', ') : v
      doc.row(label, val, i % 2 === 0)
    })
  }
  doc.skip(8)

  // Detailed content
  if (fullContent) {
    if (type === 'audit')       renderAudit(fullContent, doc, report)
    if (type === 'prospecting') renderProspecting(fullContent, doc)
    if (type === 'audit-local') renderAuditLocal(fullContent, doc)
    if (type === 'kw-research') renderKW(fullContent, doc)
  } else {
    doc.para('Los datos completos del análisis no están disponibles. Guarda el informe después de realizar un nuevo análisis para obtener el PDF completo.')
  }

  doc.footer()
  return doc.pdf
}
