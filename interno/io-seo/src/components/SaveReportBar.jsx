import React, { useState, useEffect } from 'react'
import { Btn } from './UI.jsx'

export function SaveReportBar({ defaultName = '', onSave }) {
  const [name, setName] = useState(defaultName)
  const [saved, setSaved] = useState(false)

  // Si defaultName cambia (nuevo análisis), resetear
  useEffect(() => {
    setName(defaultName)
    setSaved(false)
  }, [defaultName])

  function handleSave() {
    if (!name.trim() || saved) return
    onSave(name.trim())
    setSaved(true)
  }

  return (
    <div style={{
      display: 'flex', gap: 8, alignItems: 'center',
      padding: '10px 12px',
      background: 'var(--bg-2)',
      border: saved ? '0.5px solid var(--ok)' : '0.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      marginTop: '1.25rem',
    }}>
      <span style={{ fontSize: 12, color: 'var(--text-2)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Nombre del cliente:
      </span>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSave()}
        placeholder="ej. Acme Corp"
        style={{ flex: 1 }}
        disabled={saved}
      />
      <Btn
        onClick={handleSave}
        disabled={!name.trim() || saved}
        variant="primary"
        style={{ whiteSpace: 'nowrap', flexShrink: 0, fontSize: 12 }}
      >
        {saved ? '✓ Guardado en Informes' : 'Guardar informe →'}
      </Btn>
    </div>
  )
}
