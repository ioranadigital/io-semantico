import React, { useState } from 'react'
import { Badge, Btn } from './UI.jsx'

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL      || 'https://zvehtloitnuglyjtxwye.supabase.co'
const SUPABASE_ANON_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const EDGE_FN = `${SUPABASE_URL}/functions/v1/analyze-psi`

async function callEdgeDirect(body) {
  const ctrl = new AbortController()
  const tid  = setTimeout(() => ctrl.abort(), 35000)
  try {
    const res = await fetch(EDGE_FN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    })
    clearTimeout(tid)
    return await res.json()
  } catch (e) { clearTimeout(tid); throw e }
}

// ─── sub-components ───────────────────────────────────────────────────────────

function ScoreBox({ label, value, color }) {
  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 500, color }}>{value}</div>
    </div>
  )
}

function scoreColor(v) {
  if (typeof v !== 'number') return 'var(--text-2)'
  return v >= 80 ? 'var(--ok)' : v >= 50 ? 'var(--warn)' : 'var(--crit)'
}

function CheckRow({ item }) {
  const [open, setOpen] = useState(false)
  const { status, label, note } = item
  const clr  = status === 'ok' ? 'var(--ok)' : status === 'warn' ? 'var(--warn)' : 'var(--crit)'
  const icon = status === 'ok' ? '✓' : status === 'warn' ? '⚠' : '✗'
  return (
    <div style={{ borderBottom: '0.5px solid var(--border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'transparent', border: 'none', padding: '8px 2px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: clr, minWidth: 14, flexShrink: 0 }}>{icon}</span>
        <span style={{ flex: 1, fontSize: 12, color: 'var(--text)' }}>{label}</span>
        <Badge type={status === 'ok' ? 'ok' : status === 'warn' ? 'warn' : 'crit'}>
          {status === 'ok' ? 'OK' : status === 'warn' ? 'Mejorar' : 'Crítico'}
        </Badge>
        <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding: '4px 26px 10px', fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
          {note}
        </div>
      )}
    </div>
  )
}

function NAPCard({ napConsistency, businessInfo }) {
  if (!napConsistency) return null
  const { nameFound, addressFound, phoneFound, websiteFound, score } = napConsistency
  const items = [
    { label: 'Nombre',    found: nameFound,    value: businessInfo?.name },
    { label: 'Dirección', found: addressFound,  value: businessInfo?.address },
    { label: 'Teléfono',  found: phoneFound,    value: businessInfo?.phone },
    { label: 'Website',   found: websiteFound,  value: businessInfo?.website },
  ]
  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <p style={{ fontSize: 12, fontWeight: 600 }}>📍 NAP · Nombre · Dirección · Teléfono</p>
        <span style={{ fontSize: 13, fontWeight: 600, color: scoreColor(score) }}>{score}%</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {items.map(({ label, found, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11 }}>
            <span style={{ color: found ? 'var(--ok)' : 'var(--crit)', marginTop: 1, flexShrink: 0 }}>{found ? '✓' : '✗'}</span>
            <div style={{ minWidth: 0 }}>
              <span style={{ color: 'var(--text-2)' }}>{label}: </span>
              <span style={{ color: found ? 'var(--text)' : 'var(--crit)', wordBreak: 'break-all' }}>
                {value || (found ? '—' : 'No encontrado')}
              </span>
            </div>
          </div>
        ))}
      </div>
      {businessInfo?.category && (
        <div style={{ marginTop: 8, fontSize: 11 }}>
          <span style={{ color: 'var(--text-2)' }}>Schema: </span>
          <Badge type="info">{businessInfo.category}</Badge>
        </div>
      )}
      {businessInfo?.rating != null && (
        <div style={{ marginTop: 6, fontSize: 11 }}>
          <span style={{ color: 'var(--text-2)' }}>Rating schema: </span>
          <span style={{ color: 'var(--warn)', fontWeight: 600 }}>★ {businessInfo.rating}</span>
          {businessInfo.reviewCount > 0 && (
            <span style={{ color: 'var(--text-3)' }}> ({businessInfo.reviewCount.toLocaleString('es-ES')} reseñas)</span>
          )}
        </div>
      )}
    </div>
  )
}

function MapPackTable({ mapPack }) {
  if (!mapPack?.available) return null
  const { results = [], position, isInTopThree, query } = mapPack

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p style={{ fontSize: 12, fontWeight: 600 }}>🗺 Local Pack · Map Pack</p>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {query && <span style={{ fontSize: 10, color: 'var(--text-3)' }}>"{query}"</span>}
          {position != null
            ? <Badge type={isInTopThree ? 'ok' : 'warn'}>Posición #{position}</Badge>
            : <Badge type="crit">No encontrado</Badge>}
        </div>
      </div>
      <div style={{ border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 72px 72px', gap: 8, padding: '6px 10px', background: 'var(--bg-3)', fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <span>#</span><span>Negocio</span>
          <span style={{ textAlign: 'right' }}>Rating</span>
          <span style={{ textAlign: 'right' }}>Reviews</span>
        </div>
        {results.map(r => (
          <div
            key={r.position}
            style={{
              display: 'grid', gridTemplateColumns: '28px 1fr 72px 72px', gap: 8,
              padding: '8px 10px', borderTop: '0.5px solid var(--border)',
              background: r.isTarget ? 'var(--info-bg)' : 'transparent',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: r.position <= 3 ? 'var(--ok)' : 'var(--text-3)', alignSelf: 'center' }}>
              {r.position}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: r.isTarget ? 600 : 400, color: r.isTarget ? 'var(--info)' : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {r.isTarget && <span style={{ marginRight: 4 }}>★</span>}{r.title}
              </div>
              {r.address && (
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.address}</div>
              )}
              {r.category && <Badge type="na" style={{ fontSize: 9, padding: '1px 5px', marginTop: 3 }}>{r.category}</Badge>}
            </div>
            <span style={{ fontSize: 12, textAlign: 'right', color: r.rating ? 'var(--warn)' : 'var(--text-3)', alignSelf: 'center', fontWeight: r.rating ? 500 : 400 }}>
              {r.rating ? `★ ${r.rating}` : '—'}
            </span>
            <span style={{ fontSize: 11, textAlign: 'right', color: 'var(--text-2)', alignSelf: 'center' }}>
              {r.reviews > 0 ? r.reviews.toLocaleString('es-ES') : '—'}
            </span>
          </div>
        ))}
      </div>
      {position != null && !isInTopThree && (
        <p style={{ fontSize: 11, color: 'var(--warn)', marginTop: 6 }}>
          ⚠ Fuera del Top 3 — completa perfil GBP, responde reseñas y refuerza citas NAP
        </p>
      )}
      {position == null && (
        <p style={{ fontSize: 11, color: 'var(--crit)', marginTop: 6 }}>
          ✗ Negocio no encontrado en los resultados locales para esta búsqueda
        </p>
      )}
    </div>
  )
}

function Recommendations({ items }) {
  if (!items?.length) return null
  return (
    <div style={{ padding: '10px 12px', background: 'var(--warn-bg)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--warn)', marginBottom: '1rem' }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--warn)', marginBottom: 6 }}>🎯 Plan de acción SEO Local</p>
      {items.map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-2)', margin: '5px 0', lineHeight: 1.4 }}>
          <span style={{ color: 'var(--warn)', flexShrink: 0, fontWeight: 600 }}>{i + 1}.</span>
          <span>{r}</span>
        </div>
      ))}
    </div>
  )
}

// ─── ConfigForm: muestra inputs y dispara el análisis ─────────────────────────
// Soporta 2 modos:
//   onRun(params) → controlado, el padre gestiona estado via hook
//   !onRun        → auto-contenido, llama a la Edge Function directamente

function ConfigForm({ url, onRun, onDirectResult, externalLoading }) {
  const [location,     setLocation]     = useState('')
  const [businessName, setBusinessName] = useState('')
  const [keyword,      setKeyword]      = useState('')
  const [localLoading, setLocalLoading] = useState(false)
  const [error,        setError]        = useState('')

  const loading = externalLoading || localLoading

  async function handleRun() {
    if (!url) { setError('URL no configurada — analiza el sitio primero.'); return }
    setError('')
    if (onRun) {
      // Modo controlado — el padre lanza el análisis y actualiza su estado
      onRun({ location, businessName, keyword })
    } else {
      // Modo auto-contenido — llamamos a la edge function directamente
      setLocalLoading(true)
      try {
        const data = await callEdgeDirect({ url, checkLocalSEO: true, location, businessName, keyword })
        onDirectResult(data)
      } catch (e) { onDirectResult({ error: e.message }) }
      finally { setLocalLoading(false) }
    }
  }

  return (
    <div style={{ padding: '1.25rem', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)' }}>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: '1rem' }}>
        Audita Google Business Profile, consistencia NAP y posición en el Map Pack local
      </p>

      <div style={{ display: 'grid', gap: 10, marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
            📍 Localización <span style={{ color: 'var(--warn)', fontWeight: 400 }}>(requerida para Map Pack)</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRun()}
            placeholder="ej: Madrid, España  ·  Barcelona, Spain"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
              🏪 Nombre del negocio <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(opcional)</span>
            </label>
            <input
              type="text"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              placeholder="ej: Fontanería García"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
              🔑 Keyword Map Pack <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(opcional)</span>
            </label>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="ej: fontanero Madrid"
            />
          </div>
        </div>
      </div>

      {error && <p style={{ fontSize: 11, color: 'var(--crit)', marginBottom: 8 }}>⚠ {error}</p>}

      <Btn onClick={handleRun} disabled={loading} variant="primary" style={{ width: '100%' }}>
        {loading ? '⏳ Analizando SEO Local...' : '📍 Analizar SEO Local →'}
      </Btn>

      <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 8, lineHeight: 1.5 }}>
        Sin <code>SERPAPI_KEY</code>: análisis basado en schema JSON-LD, HTML y señales de la página.&nbsp;
        Con SerpAPI (secreto en Supabase): posición real en el Map Pack y comparativa de competidores.
      </p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
// Soporta dos modos:
//   Controlado (Tab 1 · Analizar Sitio Web): data/loading vienen del hook useMCPTools
//     onRun(params)   → lanza checkLocalSEO en el hook
//     onReset()       → limpia localSEOData en el hook
//   Auto-contenido (ProspectingPanel): gestiona estado interno
//     No requiere onRun ni onReset

export function LocalSEOSection({ url, data: extData, loading: extLoading, onRun, onReset }) {
  const [selfData,    setSelfData]    = useState(null)
  const [selfLoading, setSelfLoading] = useState(false)

  const controlled = !!onRun
  const data    = controlled ? (extData    ?? null) : selfData
  const loading = controlled ? (extLoading ?? false) : selfLoading

  function handleReset() {
    if (controlled) onReset?.()
    else setSelfData(null)
  }

  // ── loading ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-2)' }}>
        <div style={{ fontSize: 13 }}>Auditando SEO Local y perfil GBP...</div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
          Extrayendo schema LocalBusiness, NAP y consultando Map Pack
        </div>
      </div>
    )
  }

  // ── config form (empty state) ──────────────────────────────────────────
  if (!data) {
    return (
      <ConfigForm
        url={url}
        onRun={controlled ? onRun : null}
        onDirectResult={setSelfData}
        externalLoading={false}
      />
    )
  }

  // ── error ──────────────────────────────────────────────────────────────
  if (data.error) {
    return (
      <div style={{ padding: '1rem' }}>
        <p style={{ fontSize: 13, color: 'var(--crit)', marginBottom: 12 }}>⚠ {data.error}</p>
        <Btn onClick={handleReset}>↺ Reintentar</Btn>
      </div>
    )
  }

  const {
    score, napConsistency, businessInfo, mapPack,
    schema, checklist = [], recommendations = [],
    mode, serpApiEnabled,
  } = data

  const modeLabel = mode === 'serpapi'
    ? '✓ SerpAPI · datos reales del Map Pack'
    : '🔍 Análisis HTML + Schema (sin SerpAPI)'

  return (
    <div>
      {/* Scores overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: '1rem' }}>
        <ScoreBox label="Score Local SEO" value={`${score}/100`}       color={scoreColor(score)} />
        <ScoreBox label="NAP"             value={`${napConsistency?.score ?? 0}%`} color={scoreColor(napConsistency?.score)} />
        <ScoreBox
          label="Schema"
          value={schema?.hasLocalBusiness ? '✓' : '✗'}
          color={schema?.hasLocalBusiness ? 'var(--ok)' : 'var(--crit)'}
        />
        <ScoreBox
          label="Map Pack"
          value={
            mapPack?.available
              ? (mapPack.position != null ? `#${mapPack.position}` : '—')
              : '—'
          }
          color={
            mapPack?.available && mapPack.position != null
              ? (mapPack.isInTopThree ? 'var(--ok)' : 'var(--warn)')
              : 'var(--text-3)'
          }
        />
      </div>

      {/* Mode / SerpAPI status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{modeLabel}</span>
        {!serpApiEnabled && <Badge type="warn">Sin SerpAPI — configura SERPAPI_KEY en Supabase</Badge>}
        {serpApiEnabled && !mapPack?.available && <Badge type="info">Añade localización para ver Map Pack</Badge>}
        {serpApiEnabled && mapPack?.available && <Badge type="ok">Map Pack activo</Badge>}
      </div>

      {/* NAP */}
      <NAPCard napConsistency={napConsistency} businessInfo={businessInfo} />

      {/* Map Pack */}
      <MapPackTable mapPack={mapPack} />

      {/* Schema badges */}
      {schema && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Badge type={schema.hasLocalBusiness ? 'ok' : 'crit'}>
            {schema.hasLocalBusiness ? `✓ ${schema.type || 'LocalBusiness'}` : '✗ Sin LocalBusiness'}
          </Badge>
          {schema.hasGeo     ? <Badge type="ok">✓ Geo</Badge>     : <Badge type="warn">⚠ Sin geo</Badge>}
          {schema.hasHours   ? <Badge type="ok">✓ Horarios</Badge> : <Badge type="warn">⚠ Sin horarios</Badge>}
          {schema.hasRating  ? <Badge type="ok">✓ Rating</Badge>   : <Badge type="warn">⚠ Sin AggregateRating</Badge>}
        </div>
      )}

      {/* Checklist */}
      <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Checklist GBP · SEO Local</p>
      <div style={{ border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', overflow: 'hidden' }}>
        {checklist.map(item => <CheckRow key={item.id} item={item} />)}
      </div>

      {/* Recommendations */}
      <Recommendations items={recommendations} />

      {/* Re-run */}
      <Btn onClick={handleReset} style={{ fontSize: 12 }}>↺ Nueva consulta</Btn>
    </div>
  )
}
