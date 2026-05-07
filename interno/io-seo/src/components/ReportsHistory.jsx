import React, { useState } from 'react'
import { Card, SectionTitle, Badge, Btn } from './UI.jsx'
import { generateFullReportPDF } from '../utils/pdfFullReport.js'

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || ''
const WEBHOOK_CONFIGURED = WEBHOOK_URL && !WEBHOOK_URL.includes('tu-instancia')

const SECTIONS = [
  { type: 'audit',       icon: '🔍', label: 'Analizar Sitio Web',     empty: 'Ningún informe guardado. Analiza un sitio y guárdalo.' },
  { type: 'prospecting', icon: '📋', label: 'Informe Sitio Web',       empty: 'Ningún informe guardado. Ve a "Informe Sitio Web" y guarda el análisis.' },
  { type: 'audit-local', icon: '🔧', label: 'Auditoría Local',         empty: 'Ningún informe guardado. Ve a "Auditoría Técnica Local" y guarda el análisis.' },
  { type: 'kw-research', icon: '🔑', label: 'KW Research',             empty: 'Ningún informe guardado. Ejecuta un análisis de keywords y guárdalo.' },
]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function MetricPill({ label, value }) {
  if (value === null || value === undefined) return null
  return (
    <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 10, background: 'var(--bg-3)', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
      {label} <strong style={{ color: 'var(--text)' }}>{value}</strong>
    </span>
  )
}

function ScorePill({ label, value }) {
  if (value === null || value === undefined) return null
  const color = value >= 90 ? 'var(--ok)' : value >= 50 ? 'var(--warn)' : 'var(--crit)'
  return (
    <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 10, background: 'var(--bg-3)', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
      {label} <strong style={{ color }}>{value}</strong>
    </span>
  )
}

function SummaryMetrics({ type, summary }) {
  if (!summary) return null
  if (type === 'audit') return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
      <ScorePill label="Perf. móvil"   value={summary.perfMobile} />
      <ScorePill label="Perf. desktop" value={summary.perfDesktop} />
      <ScorePill label="SEO"           value={summary.seoScore} />
      <ScorePill label="Accessibility" value={summary.accessibility} />
      {summary.criticals > 0 && <MetricPill label="Críticos" value={summary.criticals} />}
      {summary.warns     > 0 && <MetricPill label="Avisos"   value={summary.warns} />}
    </div>
  )
  if (type === 'prospecting') return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
      <ScorePill label="CWV"      value={summary.perfScore} />
      <ScorePill label="SEO"      value={summary.seoScore} />
      {summary.modules?.length > 0 && <MetricPill label="Módulos" value={summary.modules.length} />}
      {summary.subpages > 0        && <MetricPill label="Subpáginas" value={summary.subpages} />}
    </div>
  )
  if (type === 'audit-local') return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
      <MetricPill label="Herramientas" value={summary.tools} />
      {summary.projectType && <MetricPill label="Tipo" value={summary.projectType} />}
    </div>
  )
  if (type === 'kw-research') return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
      <MetricPill label="Keywords"      value={summary.keywords} />
      <MetricPill label="Oportunidades" value={summary.opportunities} />
      {summary.industry && <MetricPill label="Sector" value={summary.industry} />}
    </div>
  )
  return null
}

// ─── Send Modal (email + Drive) ───────────────────────────────────────────────

function SendModal({ report, onClose }) {
  const [email,    setEmail]    = useState('')
  const [driveUrl, setDriveUrl] = useState('')
  const [status,   setStatus]   = useState(null)  // { type: 'ok'|'err'|'info', msg }
  const [sending,  setSending]  = useState(false)

  const filename = `SEO_${report.clientName || 'informe'}_${new Date(report.date).toISOString().split('T')[0]}.pdf`

  async function handleSend() {
    if (!email.trim() && !driveUrl.trim()) { setStatus({ type: 'err', msg: 'Ingresa al menos un email o URL de carpeta Drive.' }); return }
    setSending(true); setStatus(null)
    try {
      const pdf = generateFullReportPDF(report)

      if (!WEBHOOK_CONFIGURED) {
        // Fallback: download locally + open Drive folder
        pdf.save(filename)
        if (driveUrl.trim()) window.open(driveUrl, '_blank')
        setStatus({ type: 'info', msg: `PDF descargado localmente.${driveUrl ? ' Carpeta Drive abierta — sube el PDF manualmente.' : ''} Para envío automático configura VITE_WEBHOOK_URL en .env` })
        return
      }

      // POST to n8n webhook
      const pdfDataUri = pdf.output('datauristring')
      const payload = {
        action:       'send_report',
        to_email:     email.trim()    || null,
        drive_folder: driveUrl.trim() || null,
        pdf_base64:   pdfDataUri,
        filename,
        report_title: report.title   || report.clientName,
        client_name:  report.clientName,
        report_type:  report.type,
        report_date:  report.date,
      }
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Webhook respondió ${res.status}`)
      setStatus({ type: 'ok', msg: `Enviado correctamente${email ? ` a ${email}` : ''}${driveUrl ? ' y subido a Drive' : ''}.` })
    } catch (err) {
      setStatus({ type: 'err', msg: err.message })
    } finally { setSending(false) }
  }

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', maxWidth: 440, width: '100%', position: 'relative' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px' }}>Enviar / Guardar informe</p>
            <p style={{ fontSize: 11, color: 'var(--text-3)', margin: 0 }}>{report.title || report.clientName}</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--text-3)', padding: '2px 6px' }}>✕</button>
        </div>

        {/* Webhook status notice */}
        {!WEBHOOK_CONFIGURED && (
          <div style={{ fontSize: 11, padding: '6px 10px', background: 'var(--warn-bg)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', color: 'var(--warn)' }}>
            ⚠ Webhook n8n no configurado. El PDF se descargará localmente. Para envío automático, configura <code>VITE_WEBHOOK_URL</code> en <code>.env</code>
          </div>
        )}

        {/* Email input */}
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
            ✉ Enviar por email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="cliente@empresa.com"
            style={{ width: '100%' }}
          />
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>El PDF se adjuntará automáticamente al email.</p>
        </div>

        {/* Drive folder URL */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
            ☁ Guardar en Google Drive
          </label>
          <input
            type="url"
            value={driveUrl}
            onChange={e => setDriveUrl(e.target.value)}
            placeholder="https://drive.google.com/drive/folders/..."
            style={{ width: '100%' }}
          />
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>
            {WEBHOOK_CONFIGURED
              ? 'URL de la carpeta de destino. n8n subirá el PDF automáticamente.'
              : 'La carpeta se abrirá en nueva pestaña para subida manual.'}
          </p>
        </div>

        {/* Status feedback */}
        {status && (
          <div style={{
            fontSize: 12, padding: '8px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem',
            background: status.type === 'ok' ? 'var(--ok-bg)' : status.type === 'err' ? 'var(--crit-bg)' : 'var(--info-bg)',
            color:      status.type === 'ok' ? 'var(--ok)'    : status.type === 'err' ? 'var(--crit)'    : 'var(--info)',
          }}>
            {status.type === 'ok' ? '✓ ' : status.type === 'err' ? '✗ ' : 'ℹ '}{status.msg}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleSend}
            disabled={sending}
            style={{ flex: 1, padding: '10px', background: 'var(--info)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: sending ? 'default' : 'pointer', fontWeight: 500, fontSize: 13, opacity: sending ? 0.7 : 1 }}
          >
            {sending ? '⏳ Enviando...' : WEBHOOK_CONFIGURED ? '✉ Enviar / Guardar en Drive' : '⬇ Descargar PDF'}
          </button>
          <button onClick={onClose} style={{ padding: '10px 14px', background: 'transparent', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13 }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Report Card ──────────────────────────────────────────────────────────────

function ReportCard({ report, onDelete }) {
  const [showSendModal, setShowSendModal] = useState(false)
  const summary   = report.summary || null
  const domain    = report.url ? report.url.replace(/https?:\/\//, '').split('/')[0] : ''
  const hasLegacy = !summary && report.metrics

  function handleDownloadPDF() {
    try {
      const pdf = generateFullReportPDF(report)
      const filename = `SEO_${report.clientName || domain || 'informe'}_${new Date(report.date).toISOString().split('T')[0]}.pdf`
      pdf.save(filename)
    } catch (err) {
      console.error('Error descargando PDF:', err)
      alert('Error al descargar el informe. Verifica la consola.')
    }
  }

  return (
    <>
      {showSendModal && <SendModal report={report} onClose={() => setShowSendModal(false)} />}
      <div style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '12px 14px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: '0 0 3px', wordBreak: 'break-word' }}>
              {report.title || report.clientName || '—'}
            </p>
            <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--text-3)', flexWrap: 'wrap' }}>
              <span>{formatDate(report.date)}</span>
              {domain && <span>🔗 {domain}</span>}
              {report.fullContent && <span style={{ color: 'var(--ok)' }}>✓ Datos completos</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 5, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button
              onClick={handleDownloadPDF}
              title="Descargar PDF completo"
              style={{ padding: '4px 8px', fontSize: 11, background: 'transparent', color: 'var(--text-2)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              ⬇ PDF
            </button>
            <button
              onClick={() => setShowSendModal(true)}
              title="Enviar por email o guardar en Google Drive"
              style={{ padding: '4px 8px', fontSize: 11, background: 'transparent', color: 'var(--info)', border: '0.5px solid var(--info)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              ✉ / ☁
            </button>
            <button
              onClick={() => onDelete(report.id)}
              title="Eliminar informe"
              style={{ padding: '4px 8px', fontSize: 11, background: 'transparent', color: 'var(--text-3)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Metrics */}
        <SummaryMetrics type={report.type} summary={summary} />

        {/* Legacy fallback */}
        {hasLegacy && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {report.metrics.psi           !== undefined && <ScorePill label="Performance"    value={report.metrics.psi} />}
            {report.metrics.keywords      !== undefined && <MetricPill label="Keywords"       value={report.metrics.keywords} />}
            {report.metrics.opportunities !== undefined && <MetricPill label="Oportunidades"  value={report.metrics.opportunities} />}
          </div>
        )}
      </div>
    </>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({ section, reports, onDelete }) {
  const [collapsed, setCollapsed] = useState(false)
  const sectionReports = reports.filter(r => r.type === section.type)

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: collapsed ? 0 : '0.75rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>{section.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{section.label}</span>
          <Badge type={sectionReports.length > 0 ? 'info' : 'na'}>{sectionReports.length}</Badge>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{collapsed ? '▼' : '▲'}</span>
      </div>

      {!collapsed && (
        sectionReports.length === 0
          ? <p style={{ fontSize: 12, color: 'var(--text-3)', padding: '12px 0 4px' }}>{section.empty}</p>
          : <div style={{ display: 'grid', gap: 8 }}>
              {sectionReports.map(r => <ReportCard key={r.id} report={r} onDelete={onDelete} />)}
            </div>
      )}
    </Card>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ReportsHistory({ reports, onDelete }) {
  const total = reports.length

  return (
    <div>
      {total > 0 && (
        <div style={{ display: 'flex', gap: 10, marginBottom: '1rem', fontSize: 12, color: 'var(--text-2)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span>Total guardados: <strong>{total}</strong></span>
          {SECTIONS.map(s => {
            const n = reports.filter(r => r.type === s.type).length
            return n > 0 ? <span key={s.type}>{s.icon} {n}</span> : null
          })}
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>·</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
            ⬇ PDF · ✉/☁ Email / Drive
            {!WEBHOOK_CONFIGURED && ' (webhook no configurado — descarga local)'}
          </span>
        </div>
      )}

      {SECTIONS.map(section => (
        <Section key={section.type} section={section} reports={reports} onDelete={onDelete} />
      ))}

      {total === 0 && (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
          <p>No hay informes guardados aún.</p>
          <p style={{ fontSize: 11, marginTop: 6 }}>Analiza un sitio en cualquiera de las otras pestañas y usa el botón "Guardar informe".</p>
        </div>
      )}
    </div>
  )
}
