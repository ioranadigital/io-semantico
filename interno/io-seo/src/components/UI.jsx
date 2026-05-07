import React from 'react'

// ── Badge ────────────────────────────────────────────────────────────────
const BADGE_STYLES = {
  ok:   { background: 'var(--ok-bg)',   color: 'var(--ok)',   border: '0.5px solid var(--ok-border)' },
  warn: { background: 'var(--warn-bg)', color: 'var(--warn)', border: '0.5px solid var(--warn-border)' },
  crit: { background: 'var(--crit-bg)', color: 'var(--crit)', border: '0.5px solid var(--crit-border)' },
  info: { background: 'var(--info-bg)', color: 'var(--info)', border: '0.5px solid var(--info-border)' },
  na:   { background: 'var(--bg-2)',    color: 'var(--text-2)', border: '0.5px solid var(--border)' },
}

export function Badge({ type = 'info', children, style }) {
  return (
    <span style={{
      fontSize: 11, padding: '2px 8px', borderRadius: 4,
      whiteSpace: 'nowrap', display: 'inline-block',
      ...BADGE_STYLES[type], ...style
    }}>
      {children}
    </span>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────
export function Card({ children, style, highlight }) {
  return (
    <div style={{
      background: 'var(--bg)',
      border: highlight ? `2px solid var(--info)` : '0.5px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1.25rem',
      marginBottom: '1rem',
      ...style
    }}>
      {children}
    </div>
  )
}

// ── SectionTitle ─────────────────────────────────────────────────────────
export function SectionTitle({ children, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
      <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {children}
      </p>
      {tag && <Badge type={tag.type}>{tag.label}</Badge>}
    </div>
  )
}

// ── MetricCard ────────────────────────────────────────────────────────────
export function MetricCard({ label, value, status, suffix = '' }) {
  const color = status === 'ok' ? 'var(--ok)' : status === 'warn' ? 'var(--warn)' : status === 'crit' ? 'var(--crit)' : 'var(--text)'
  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', textAlign: 'center' }}>
      <div style={{ fontSize: 22, fontWeight: 500, color }}>{value}{suffix}</div>
      <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{label}</div>
      <div style={{ height: 4, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden', marginTop: 6 }}>
        <div style={{ height: '100%', width: `${Math.min(typeof value === 'number' ? value : 0, 100)}%`, background: color, borderRadius: 2, transition: 'width 0.4s' }} />
      </div>
    </div>
  )
}

// ── Tabs ─────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 5, marginBottom: '1rem', flexWrap: 'wrap' }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            fontSize: 12, padding: '5px 12px',
            border: active === t.id ? '0.5px solid var(--info-border)' : '0.5px solid var(--border-2)',
            borderRadius: 'var(--radius-sm)',
            background: active === t.id ? 'var(--info-bg)' : 'transparent',
            color: active === t.id ? 'var(--info)' : 'var(--text-2)',
            fontWeight: active === t.id ? 500 : 400,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ── VarRow ────────────────────────────────────────────────────────────────
export function VarRow({ name, value, displayValue, status, badge }) {
  const bType = status === 1 ? 'ok' : status === null ? 'na' : status >= 0.5 ? 'warn' : 'crit'
  const bLabel = status === 1 ? 'OK' : status === null ? 'N/A' : status >= 0.5 ? 'Mejorar' : 'Crítico'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
      <span style={{ flex: 1, lineHeight: 1.4 }}>{name}</span>
      <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{displayValue || ''}</span>
      <Badge type={badge?.type || bType}>{badge?.label || bLabel}</Badge>
    </div>
  )
}

// ── FormRow ───────────────────────────────────────────────────────────────
export function FormRow({ children, style }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: '0.85rem', ...style }}>
      {children}
    </div>
  )
}

export function FormCol({ children, flex = 1 }) {
  return <div style={{ flex, minWidth: 0 }}>{children}</div>
}

// ── Btn ───────────────────────────────────────────────────────────────────
export function Btn({ children, onClick, disabled, variant = 'default', style }) {
  const base = {
    padding: '8px 16px', fontSize: 13, fontWeight: 500,
    border: '0.5px solid var(--border-2)',
    borderRadius: 'var(--radius-sm)',
    background: variant === 'primary' ? 'var(--text)' : 'transparent',
    color: variant === 'primary' ? 'var(--bg)' : 'var(--text)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style
  }
  return <button style={base} onClick={onClick} disabled={disabled}>{children}</button>
}

// ── Divider ───────────────────────────────────────────────────────────────
export function Divider() {
  return <hr style={{ border: 'none', borderTop: '0.5px solid var(--border)', margin: '0.85rem 0' }} />
}
