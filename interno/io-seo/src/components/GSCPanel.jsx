import React from 'react'
import { Badge, Divider } from './UI.jsx'

export function GSCPanel({ config }) {
  const clicks = parseInt(config.gscClicks)
  const impr = parseInt(config.gscImpr)
  const ctr = parseFloat(config.gscCtr)
  const pos = parseFloat(config.gscPos)
  const top3 = parseInt(config.gscTop3)
  const top10 = parseInt(config.gscTop10)
  const top100 = parseInt(config.gscTop100)
  const prev = parseInt(config.gscPrev)

  if (!clicks && !impr) {
    return <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Introduce datos de Google Search Console en la sección de configuración para ver el dashboard.</p>
  }

  const diff = prev && clicks ? Math.round((clicks - prev) / prev * 100) : null

  const metrics = [
    { label: 'Clicks', value: clicks?.toLocaleString(), status: null, extra: diff !== null ? <Badge type={diff >= 0 ? 'ok' : 'crit'}>{diff >= 0 ? '+' : ''}{diff}% vs anterior</Badge> : null },
    { label: 'Impresiones', value: impr?.toLocaleString(), status: null },
    { label: 'CTR medio', value: ctr ? `${ctr.toFixed(1)}%` : null, status: ctr >= 3 ? 'ok' : ctr >= 1.5 ? 'warn' : 'crit' },
    { label: 'Posición media', value: pos ? pos.toFixed(1) : null, status: pos <= 10 ? 'ok' : pos <= 20 ? 'warn' : 'crit' },
    { label: 'Keywords Top 3', value: top3?.toLocaleString(), status: 'ok' },
    { label: 'Keywords Top 10', value: top10?.toLocaleString(), status: 'warn' },
    { label: 'Keywords Top 100', value: top100?.toLocaleString(), status: null },
  ].filter(m => m.value)

  const color = s => s === 'ok' ? 'var(--ok)' : s === 'warn' ? 'var(--warn)' : s === 'crit' ? 'var(--crit)' : 'var(--text)'

  // Parse keywords
  const kwRows = config.gscKeywords
    ? config.gscKeywords.trim().split('\n').map(l => { const [kw, c, p] = l.split(','); return { kw: kw?.trim(), clicks: c?.trim(), pos: parseFloat(p) || 0 } }).filter(r => r.kw)
    : []

  const kwStatus = pos => pos <= 3 ? { type: 'ok', label: 'Top 3' } : pos <= 10 ? { type: 'warn', label: 'Top 10' } : pos <= 20 ? { type: 'crit', label: 'Top 20' } : { type: 'na', label: '>20' }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginBottom: '1rem' }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: color(m.status) }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{m.label}</div>
            {m.extra && <div style={{ marginTop: 4 }}>{m.extra}</div>}
          </div>
        ))}
      </div>

      {ctr && pos && (
        <>
          <Divider />
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Diagnóstico rápido</p>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8 }}>
            {ctr < 2 && <p>⚠️ CTR bajo ({ctr}%) — revisar titles y meta descriptions para mejorar el atractivo en SERP.</p>}
            {pos > 20 && <p>⚠️ Posición media alta ({pos}) — el dominio tiene poca visibilidad. Priorizar contenido y autoridad.</p>}
            {pos <= 10 && pos > 5 && <p>ℹ️ Posición media {pos} — potencial para escalar al Top 5 con optimización on-page y link building.</p>}
            {top10 > 0 && top3 === 0 && <p>ℹ️ {top10} keywords en Top 10 sin ninguna en Top 3 — oportunidad inmediata de optimización.</p>}
            {ctr >= 3 && pos <= 10 && <p>✅ Buen CTR y posicionamiento — mantener consistencia y escalar volumen.</p>}
          </div>
        </>
      )}

      {kwRows.length > 0 && (
        <>
          <Divider />
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Top keywords</p>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Keyword', 'Clicks', 'Posición', 'Estado'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '5px 8px', borderBottom: '0.5px solid var(--border-2)', color: 'var(--text-2)', fontSize: 11 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {kwRows.map((r, i) => {
                const st = kwStatus(r.pos)
                return (
                  <tr key={i}>
                    <td style={{ padding: '5px 8px', borderBottom: '0.5px solid var(--border)' }}>{r.kw}</td>
                    <td style={{ padding: '5px 8px', borderBottom: '0.5px solid var(--border)' }}>{r.clicks}</td>
                    <td style={{ padding: '5px 8px', borderBottom: '0.5px solid var(--border)' }}>{r.pos.toFixed(1)}</td>
                    <td style={{ padding: '5px 8px', borderBottom: '0.5px solid var(--border)' }}><Badge type={st.type}>{st.label}</Badge></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
