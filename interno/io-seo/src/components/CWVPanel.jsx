import React, { useState } from 'react'
import { CWV_METRICS, getCWVStatus, formatCWVValue, getScoreStatus, getCWVScore1to10 } from '../utils/constants.js'
import { Badge, Divider } from './UI.jsx'

function CWVCard({ metric, raw }) {
  const status = getCWVStatus(raw, metric)
  const formatted = formatCWVValue(raw, metric)
  const score1to10 = getCWVScore1to10(raw, metric)
  const color = status === 'ok' ? 'var(--ok)' : status === 'warn' ? 'var(--warn)' : status === 'crit' ? 'var(--crit)' : 'var(--text-2)'
  const badgeType = status === 'na' ? 'na' : status
  const badgeLabel = { ok: 'Bueno', warn: 'Mejorar', crit: 'Crítico', na: 'N/D' }[status]

  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
      <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{metric.label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Badge type={badgeType}>{badgeLabel}</Badge>
          {score1to10 != null && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{Math.round(score1to10)}/10</span>}
        </div>
      </div>
      <div style={{ fontSize: 20, fontWeight: 500, color }}>{formatted}</div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{metric.desc}</div>
    </div>
  )
}

export function CWVPanel({ data }) {
  const [strategy, setStrategy] = useState('mobile')
  const current = data?.[strategy]

  if (current?.error) {
    return <div style={{ color: 'var(--crit)', padding: '1rem' }}>
      <strong>Error:</strong> {current.error.message}
    </div>
  }

  if (!current?.lighthouseResult?.audits) return <div style={{ color: 'var(--text-3)' }}>Cargando datos...</div>

  const audits = current.lighthouseResult.audits
  const perfScore = current.lighthouseResult.categories?.performance?.score
  if (!perfScore && perfScore !== 0) return <div style={{ color: 'var(--text-3)' }}>Datos incompletos</div>

  const score = Math.round(perfScore * 100)
  const scoreStatus = getScoreStatus(score)
  const scoreColor = scoreStatus === 'ok' ? 'var(--ok)' : scoreStatus === 'warn' ? 'var(--warn)' : 'var(--crit)'

  const opportunities = Object.values(audits)
    .filter(a => a.score !== null && a.score < 0.9 && a.details?.type === 'opportunity')
    .slice(0, 6)

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '1rem' }}>
        <select value={strategy} onChange={e => setStrategy(e.target.value)} style={{ maxWidth: 160 }}>
          <option value="mobile">Móvil</option>
          <option value="desktop">Escritorio</option>
        </select>
        <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
          Puntuación performance: <span style={{ fontSize: 20, fontWeight: 500, color: scoreColor }}>{score}</span>
          <span style={{ marginLeft: 8 }}>
            <Badge type={scoreStatus}>{scoreStatus === 'ok' ? 'Bueno' : scoreStatus === 'warn' ? 'Mejorar' : 'Crítico'}</Badge>
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1rem' }}>
        {CWV_METRICS.map(m => (
          <CWVCard key={m.key} metric={m} raw={audits[m.psi]?.numericValue} />
        ))}
      </div>

      {opportunities.length > 0 && (
        <>
          <Divider />
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Oportunidades de mejora detectadas</p>
          {opportunities.map(o => (
            <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
              <span>{o.title}</span>
              {o.displayValue && <Badge type="warn">{o.displayValue}</Badge>}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
