import React from 'react'
import { LeadForm } from '../components/LeadForm.jsx'

export function LeadFormPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <LeadForm />
    </div>
  )
}
