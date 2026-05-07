import React from 'react'
import { Badge, Btn } from './UI.jsx'

function ScoreBox({ label, value, status }) {
  const color = status === 'ok' ? 'var(--ok)' : status === 'warn' ? 'var(--warn)' : 'var(--crit)'
  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 500, color }}>{value}</div>
    </div>
  )
}

function LinkList({ items, type }) {
  const bg = type === 'broken' ? 'var(--crit-bg, rgba(239,68,68,0.08))' : 'var(--warn-bg, rgba(234,179,8,0.08))'
  const color = type === 'broken' ? 'var(--crit)' : 'var(--warn)'
  if (!items?.length) return null
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <p style={{ fontSize: 12, fontWeight: 500, color, marginBottom: 6 }}>
        {type === 'broken' ? `❌ Rotos (${items.length})` : `↪ Redirecciones (${items.length})`}
      </p>
      <div style={{ maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {items.map((b, i) => (
          <div key={i} style={{ fontSize: 11, padding: '4px 8px', background: bg, borderRadius: 4, fontFamily: 'monospace', wordBreak: 'break-all', color: 'var(--text)' }}>
            {b}
          </div>
        ))}
      </div>
    </div>
  )
}

export function LinkCheckerSection({ data, loading, onRun, url }) {
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-2)' }}>
        <div style={{ fontSize: 13 }}>Verificando enlaces...</div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>Puede tardar 15-30s según el número de links</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12 }}>
          Detecta enlaces rotos (4xx/5xx) y redirecciones en la página
        </p>
        {url && (
          <Btn onClick={() => onRun(url)} variant="primary">
            Verificar enlaces →
          </Btn>
        )}
      </div>
    )
  }

  if (data.error) {
    return <div style={{ color: 'var(--crit)', padding: '1rem', fontSize: 13 }}>Error: {data.error}</div>
  }

  const { totalAnalyzed, summary, score, broken = [], redirects = [] } = data
  const scoreStatus = score >= 90 ? 'ok' : score >= 70 ? 'warn' : 'crit'

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: '1rem' }}>
        <ScoreBox label="Score" value={`${score}/100`} status={scoreStatus} />
        <ScoreBox label="Rotos" value={summary.broken} status={summary.broken === 0 ? 'ok' : 'crit'} />
        <ScoreBox label="Redirecciones" value={summary.redirects} status={summary.redirects === 0 ? 'ok' : 'warn'} />
      </div>

      <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: '0.75rem' }}>
        {totalAnalyzed} enlaces analizados · {summary.ok} correctos
      </p>

      <LinkList items={broken} type="broken" />
      <LinkList items={redirects} type="redirect" />

      {broken.length === 0 && redirects.length === 0 && (
        <p style={{ fontSize: 13, color: 'var(--ok)', textAlign: 'center', padding: '1rem' }}>
          ✅ Sin enlaces rotos ni redirecciones problemáticas detectadas
        </p>
      )}

      {url && (
        <Btn onClick={() => onRun(url)} style={{ marginTop: '0.75rem', fontSize: 12 }}>
          Volver a analizar
        </Btn>
      )}
    </div>
  )
}
