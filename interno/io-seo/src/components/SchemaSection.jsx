import React, { useState } from 'react'
import { Badge, Btn } from './UI.jsx'

const RICH_RESULT_LABELS = {
  breadcrumbs: 'Breadcrumbs',
  faq: 'FAQ',
  howTo: 'HowTo',
  article: 'Artículo',
  product: 'Producto',
}

function SchemaCard({ schema }) {
  const [open, setOpen] = useState(false)
  const status = schema.valid ? 'ok' : schema.missingRequired.length > 0 ? 'warn' : 'ok'
  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', marginBottom: 6 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'transparent', border: 'none', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{schema.type}</span>
          <Badge type={status}>{status === 'ok' ? 'Válido' : 'Campos faltantes'}</Badge>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 12px 12px', fontSize: 11, color: 'var(--text-2)' }}>
          {schema.missingRequired.length > 0 && (
            <p style={{ color: 'var(--warn)', marginBottom: 4 }}>
              Faltan: {schema.missingRequired.join(', ')}
            </p>
          )}
          <p style={{ margin: 0 }}>Campos presentes: {schema.fields.join(', ')}</p>
        </div>
      )}
    </div>
  )
}

export function SchemaSection({ data, loading, onRun, url }) {
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-2)' }}>
        <div style={{ fontSize: 13 }}>Extrayendo y validando schemas JSON-LD...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12 }}>
          Valida schemas JSON-LD, detecta tipos faltantes e impacto en Rich Results
        </p>
        {url && <Btn onClick={() => onRun(url)} variant="primary">Validar Schema →</Btn>}
      </div>
    )
  }

  if (data.error) {
    return <div style={{ color: 'var(--crit)', padding: '1rem', fontSize: 13 }}>Error: {data.error}</div>
  }

  const { totalSchemas, typesFound = [], schemas = [], warnings = [], missingSeoRecommended = [], richResultsEligible = {}, parseErrors = [] } = data

  return (
    <div>
      {/* Resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: '1rem' }}>
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>Schemas encontrados</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: totalSchemas > 0 ? 'var(--ok)' : 'var(--crit)' }}>{totalSchemas}</div>
        </div>
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>Rich Results elegibles</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: 'var(--ok)' }}>
            {Object.values(richResultsEligible).filter(Boolean).length}/{Object.keys(richResultsEligible).length}
          </div>
        </div>
      </div>

      {/* Rich Results */}
      <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Rich Results</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1rem' }}>
        {Object.entries(richResultsEligible).map(([key, eligible]) => (
          <Badge key={key} type={eligible ? 'ok' : 'na'}>
            {eligible ? '✓' : '✗'} {RICH_RESULT_LABELS[key] || key}
          </Badge>
        ))}
      </div>

      {/* Schemas detalle */}
      {schemas.length > 0 && (
        <>
          <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Schemas detectados</p>
          {schemas.map((s, i) => <SchemaCard key={i} schema={s} />)}
        </>
      )}

      {/* Faltantes recomendados */}
      {missingSeoRecommended.length > 0 && (
        <div style={{ marginTop: '0.75rem', padding: '10px', background: 'var(--warn-bg, rgba(234,179,8,0.08))', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--warn)' }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--warn)', marginBottom: 4 }}>Schemas SEO recomendados faltantes</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {missingSeoRecommended.map(t => <Badge key={t} type="warn">{t}</Badge>)}
          </div>
        </div>
      )}

      {/* Errores de parseo */}
      {parseErrors.length > 0 && (
        <div style={{ marginTop: '0.75rem' }}>
          {parseErrors.map((e, i) => (
            <p key={i} style={{ fontSize: 11, color: 'var(--crit)', margin: '2px 0' }}>⚠ {e}</p>
          ))}
        </div>
      )}

      {totalSchemas === 0 && (
        <p style={{ fontSize: 13, color: 'var(--crit)', textAlign: 'center', padding: '1rem' }}>
          ❌ Sin schemas JSON-LD detectados — impacto negativo en Rich Results
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
