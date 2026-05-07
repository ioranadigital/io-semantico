import React from 'react'
import { Badge, Btn } from './UI.jsx'

const HEADER_LABELS = {
  'Strict-Transport-Security': { label: 'HSTS', impact: 'HTTPS obligatorio — señal de seguridad para Google' },
  'Content-Security-Policy':   { label: 'CSP',  impact: 'Protección XSS — E-E-A-T técnico' },
  'X-Frame-Options':           { label: 'X-Frame', impact: 'Previene clickjacking' },
  'X-Content-Type-Options':    { label: 'X-Content-Type', impact: 'Evita MIME sniffing' },
  'Referrer-Policy':           { label: 'Referrer-Policy', impact: 'Controla atribución en GSC/Analytics' },
  'Permissions-Policy':        { label: 'Permissions-Policy', impact: 'Limita APIs del navegador' },
  'Cache-Control':             { label: 'Cache-Control', impact: 'Mejora TTFB — impacto en CWV' },
}

export function SecurityHeadersSection({ data, loading, onRun, url }) {
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-2)' }}>
        <div style={{ fontSize: 13 }}>Analizando cabeceras HTTP de seguridad...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12 }}>
          Audita HSTS, CSP, X-Frame-Options y su impacto en E-E-A-T técnico
        </p>
        {url && <Btn onClick={() => onRun(url)} variant="primary">Auditar cabeceras →</Btn>}
      </div>
    )
  }

  if (data.error) {
    return <div style={{ color: 'var(--crit)', padding: '1rem', fontSize: 13 }}>Error: {data.error}</div>
  }

  const { score, summary, headers = {}, isHttps, verdict, recommendations = [] } = data
  const verdictStatus = verdict === 'ok' ? 'ok' : verdict === 'warn' ? 'warn' : 'crit'
  const verdictText = verdict === 'ok' ? 'Seguro' : verdict === 'warn' ? 'Mejorable' : 'Deficiente'

  return (
    <div>
      {/* Score + resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: '1rem' }}>
        {[
          { label: 'Score', value: `${score}/100`, status: verdictStatus },
          { label: 'HTTPS', value: isHttps ? '✓' : '✗', status: isHttps ? 'ok' : 'crit' },
          { label: 'Correctas', value: summary.ok, status: 'ok' },
          { label: 'Críticas', value: summary.crit, status: summary.crit === 0 ? 'ok' : 'crit' },
        ].map(({ label, value, status }) => {
          const color = status === 'ok' ? 'var(--ok)' : status === 'warn' ? 'var(--warn)' : 'var(--crit)'
          return (
            <div key={label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 500, color }}>{value}</div>
            </div>
          )
        })}
      </div>

      {/* Veredicto */}
      <div style={{ padding: '8px 12px', marginBottom: '1rem', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Veredicto E-E-A-T técnico</span>
        <Badge type={verdictStatus}>{verdictText}</Badge>
      </div>

      {/* Headers tabla */}
      <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Cabeceras de seguridad</p>
      {Object.entries(headers).map(([name, info]) => {
        const meta = HEADER_LABELS[name] || { label: name, impact: '' }
        return (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: 12 }}>
            <Badge type={info.status}>{info.present ? 'OK' : info.status === 'crit' ? 'Crítico' : 'Falta'}</Badge>
            <span style={{ flex: 1, fontWeight: 500 }}>{meta.label}</span>
            <span style={{ flex: 2, fontSize: 11, color: 'var(--text-2)' }}>
              {info.value ?? meta.impact}
            </span>
          </div>
        )
      })}

      {/* Recomendaciones */}
      {recommendations.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '10px', background: 'var(--warn-bg, rgba(234,179,8,0.08))', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--warn)' }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--warn)', marginBottom: 6 }}>Acciones recomendadas</p>
          {recommendations.map((r, i) => (
            <p key={i} style={{ fontSize: 11, color: 'var(--text-2)', margin: '3px 0', fontFamily: 'monospace' }}>→ {r}</p>
          ))}
        </div>
      )}

      {url && (
        <Btn onClick={() => onRun(url)} style={{ marginTop: '0.75rem', fontSize: 12 }}>
          Volver a analizar
        </Btn>
      )}
    </div>
  )
}
