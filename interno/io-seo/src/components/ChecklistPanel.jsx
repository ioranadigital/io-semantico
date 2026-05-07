import React from 'react'
import { MANUAL_CHECKLIST, getScore1to10 } from '../utils/constants.js'

export function ChecklistPanel({ items, setStatus, setValue, summary }) {
  return (
    <div>
      {MANUAL_CHECKLIST.map(cat => (
        <div key={cat.cat}>
          <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '10px 0 4px', borderTop: '0.5px solid var(--border)', marginTop: 6 }}>
            {cat.cat}
          </p>
          {cat.items.map((item, i) => {
            const id = `${cat.cat}__${i}`
            const entry = items[id] || {}
            const score1to10 = getScore1to10(entry.status)
            return (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
                <span style={{ flex: 1, lineHeight: 1.4 }}>{item}</span>
                <input
                  type="text"
                  placeholder="Valor actual"
                  value={entry.value || ''}
                  onChange={e => setValue(id, e.target.value)}
                  style={{ width: 130, fontSize: 12 }}
                />
                <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  {[
                    { s: 'ok',   label: '✓',  bg: entry.status === 'ok'   ? 'var(--ok-bg)'   : 'transparent', color: entry.status === 'ok'   ? 'var(--ok)'   : 'var(--text-2)', border: entry.status === 'ok'   ? 'var(--ok-border)'   : 'var(--border-2)' },
                    { s: 'warn', label: '⚠',  bg: entry.status === 'warn' ? 'var(--warn-bg)' : 'transparent', color: entry.status === 'warn' ? 'var(--warn)' : 'var(--text-2)', border: entry.status === 'warn' ? 'var(--warn-border)' : 'var(--border-2)' },
                    { s: 'crit', label: '✗',  bg: entry.status === 'crit' ? 'var(--crit-bg)' : 'transparent', color: entry.status === 'crit' ? 'var(--crit)' : 'var(--text-2)', border: entry.status === 'crit' ? 'var(--crit-border)' : 'var(--border-2)' },
                  ].map(btn => (
                    <button
                      key={btn.s}
                      onClick={() => setStatus(id, btn.s)}
                      style={{ fontSize: 11, padding: '3px 8px', border: `0.5px solid ${btn.border}`, borderRadius: 4, background: btn.bg, color: btn.color, cursor: 'pointer' }}
                    >
                      {btn.label}
                    </button>
                  ))}
                  {score1to10 != null && <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 28, marginLeft: 4 }}>{score1to10}/10</span>}
                </div>
              </div>
            )
          })}
        </div>
      ))}

      {summary.filled > 0 && (
        <div style={{ marginTop: '1rem', fontSize: 13, color: 'var(--text-2)', padding: '8px 0', borderTop: '0.5px solid var(--border)' }}>
          Completado: <strong>{summary.filled}/{summary.total}</strong> variables ·{' '}
          <span style={{ color: 'var(--ok)' }}>{summary.ok} OK</span> ·{' '}
          <span style={{ color: 'var(--warn)' }}>{summary.warn} a mejorar</span> ·{' '}
          <span style={{ color: 'var(--crit)' }}>{summary.crit} críticos</span>
        </div>
      )}
    </div>
  )
}
