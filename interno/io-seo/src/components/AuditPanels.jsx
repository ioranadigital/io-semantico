import React from 'react'
import { ONPAGE_AUDITS, TECNICO_AUDITS, getAuditScore1to10, AUDIT_DESCRIPTIONS_ES } from '../utils/constants.js'
import { Badge } from './UI.jsx'

function AuditRow({ label, audit, auditKey }) {
  if (!audit) return null
  const ok = audit.score === 1
  const na = audit.score === null
  const type = na ? 'na' : ok ? 'ok' : audit.score >= 0.5 ? 'warn' : 'crit'
  const label2 = na ? 'N/A' : ok ? 'Correcto' : audit.score >= 0.5 ? 'Mejorar' : 'Error'
  const score1to10 = getAuditScore1to10(audit.score)
  const description = AUDIT_DESCRIPTIONS_ES[auditKey] || audit.description || ''
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)' }}>{description}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Badge type={type}>{label2}</Badge>
        {score1to10 != null && <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 28 }}>{score1to10}/10</span>}
      </div>
    </div>
  )
}

export function OnPagePanel({ data }) {
  console.log('📋 OnPagePanel recibió:', { hasData: !!data, hasMobile: !!data?.mobile, hasAudits: !!data?.mobile?.lighthouseResult?.audits })
  const audits = data?.mobile?.lighthouseResult?.audits
  if (!audits) return <div style={{ color: 'var(--text-2)', padding: '1rem' }}>Sin datos disponibles</div>
  return (
    <div>
      {ONPAGE_AUDITS.map(a => <AuditRow key={a.key} label={a.label} audit={audits[a.key]} auditKey={a.key} />)}
    </div>
  )
}

export function TecnicoPanel({ data }) {
  const mAudits = data?.mobile?.lighthouseResult?.audits
  if (!mAudits) return <div style={{ color: 'var(--text-2)', padding: '1rem' }}>Sin datos disponibles</div>
  return (
    <div>
      {TECNICO_AUDITS.map(a => {
        const audit = mAudits[a.key]
        if (!audit) return null
        const ok = audit.score === 1
        const na = audit.score === null
        const type = na ? 'na' : ok ? 'ok' : audit.score >= 0.5 ? 'warn' : 'crit'
        const lbl = na ? 'N/A' : ok ? 'OK' : audit.score >= 0.5 ? 'Mejorar' : 'Crítico'
        const score1to10 = getAuditScore1to10(audit.score)
        const description = AUDIT_DESCRIPTIONS_ES[a.key] || audit.displayValue || ''
        return (
          <div key={a.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
            <span style={{ flex: 1 }}>{a.label}</span>
            <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)' }}>{description}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Badge type={type}>{lbl}</Badge>
              {score1to10 != null && <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 28 }}>{score1to10}/10</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
