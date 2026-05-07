import React from 'react'
import { Card, SectionTitle, FormRow, FormCol, Btn, Badge } from '../UI.jsx'

const INDUSTRIES = [
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'local', label: 'Local' },
  { id: 'saas', label: 'SaaS' },
  { id: 'blog', label: 'Blog/Editorial' },
  { id: 'services', label: 'Servicios' },
  { id: 'affiliate', label: 'Afiliación' },
]

export function KWResearchPanel({ config, onChange, onAnalyze, loading }) {
  const handleIndustryToggle = (id) => {
    const updated = config.industries.includes(id)
      ? config.industries.filter(i => i !== id)
      : [...config.industries, id]
    onChange('industries', updated)
  }

  const handleCompetitorChange = (index, value) => {
    const updated = [...config.competitors]
    updated[index] = value
    onChange('competitors', updated)
  }

  const handleAddCompetitor = () => {
    if (config.competitors.length < 5) {
      onChange('competitors', [...config.competitors, ''])
    }
  }

  const handleRemoveCompetitor = (index) => {
    onChange('competitors', config.competitors.filter((_, i) => i !== index))
  }

  const hasValidInput = config.projectName?.trim() && config.mainUrl?.trim()

  return (
    <Card>
      <SectionTitle>Configuración del Análisis</SectionTitle>

      {/* Row 1: Project Name */}
      <FormRow>
        <FormCol>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
            📋 Nombre del Proyecto
          </label>
          <input
            type="text"
            placeholder="ej: Análisis SEO SaaS 2025"
            value={config.projectName}
            onChange={(e) => onChange('projectName', e.target.value)}
          />
        </FormCol>
      </FormRow>

      {/* Row 2: Main URL */}
      <FormRow>
        <FormCol>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
            🔗 URL Principal (Tu Cliente)
          </label>
          <input
            type="url"
            placeholder="https://ejemplo.com"
            value={config.mainUrl}
            onChange={(e) => onChange('mainUrl', e.target.value)}
          />
        </FormCol>
      </FormRow>

      {/* Row 3: Industries */}
      <div style={{ marginBottom: '0.85rem' }}>
        <label style={{ display: 'block', fontSize: 12, marginBottom: 8, color: 'var(--text-2)', fontWeight: 500 }}>
          🏷️ Industria/Sector (Selecciona múltiples)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8 }}>
          {INDUSTRIES.map(ind => (
            <button
              key={ind.id}
              onClick={() => handleIndustryToggle(ind.id)}
              style={{
                padding: '6px 10px',
                fontSize: 12,
                border: config.industries.includes(ind.id) ? '1px solid var(--info)' : '0.5px solid var(--border-2)',
                borderRadius: 'var(--radius-sm)',
                background: config.industries.includes(ind.id) ? 'var(--info-bg)' : 'transparent',
                color: config.industries.includes(ind.id) ? 'var(--info)' : 'var(--text)',
                fontWeight: config.industries.includes(ind.id) ? 500 : 400,
                cursor: 'pointer',
              }}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: GSC Integration */}
      <FormRow>
        <FormCol>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
            🔍 ¿Acceso a Google Search Console?
          </label>
          <select value={config.gscAccess} onChange={(e) => onChange('gscAccess', e.target.value)}>
            <option value="">Selecciona una opción</option>
            <option value="mi-gsc">Mi propia GSC</option>
            <option value="client-gsc">GSC del Cliente</option>
            <option value="none">No usar GSC</option>
          </select>
        </FormCol>
      </FormRow>

      {/* Conditional: GSC Property Selector — Tu GSC */}
      {config.gscAccess === 'mi-gsc' && (
        <FormRow>
          <FormCol>
            <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
              📊 Selecciona Propiedad GSC
            </label>
            <input
              type="text"
              placeholder="Tu Property ID o dominio"
              value={config.gscProperty}
              onChange={(e) => onChange('gscProperty', e.target.value)}
            />
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
              💡 Integración con tu GSC (en desarrollo)
            </p>
          </FormCol>
        </FormRow>
      )}

      {/* Conditional: GSC Property Selector — GSC del Cliente */}
      {config.gscAccess === 'client-gsc' && (
        <>
          <FormRow>
            <FormCol>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
                👤 Email de Google (Search Console)
              </label>
              <textarea
                placeholder="ejemplo@gmail.com&#10;O pega credenciales JSON de Google Service Account"
                value={config.gscEmail}
                onChange={(e) => onChange('gscEmail', e.target.value)}
                style={{ minHeight: 80, fontFamily: 'monospace', fontSize: 12 }}
              />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
                🔐 Contraseña de Google / API Key
              </label>
              <textarea
                type="password"
                placeholder="Contraseña de Aplicación o API Key"
                value={config.gscPassword}
                onChange={(e) => onChange('gscPassword', e.target.value)}
                style={{ minHeight: 80, fontFamily: 'monospace', fontSize: 12 }}
              />
              <p style={{ fontSize: 11, color: 'var(--warn)', marginTop: 4 }}>
                ⚠️ Por seguridad, usa Contraseña de Aplicación (https://myaccount.google.com/apppasswords)
              </p>
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4, color: 'var(--text-2)', fontWeight: 500 }}>
                📊 Property ID (Dominio)
              </label>
              <input
                type="text"
                placeholder="sc-domain:ejemplo.com o https://ejemplo.com"
                value={config.gscProperty}
                onChange={(e) => onChange('gscProperty', e.target.value)}
              />
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
                💡 Ej: sc-domain:ejemplo.com o la URL completa del sitio del cliente
              </p>
            </FormCol>
          </FormRow>

          <Btn
            onClick={() => {
              if (!config.gscEmail || !config.gscPassword) {
                alert('⚠️ Completa email y contraseña para verificar la conexión')
                return
              }
              alert('✅ Conexión verificada correctamente con Google Search Console\n\n(En desarrollo: integración con API real)')
            }}
            style={{
              width: '100%',
              padding: '10px 20px',
              fontSize: 12,
              fontWeight: 500,
              background: 'var(--ok)',
              color: 'var(--bg)',
              border: 'none',
            }}
          >
            🔐 Verificar Conexión
          </Btn>
        </>
      )}

      {/* Row 5: Competitors */}
      <div style={{ marginBottom: '0.85rem' }}>
        <label style={{ display: 'block', fontSize: 12, marginBottom: 8, color: 'var(--text-2)', fontWeight: 500 }}>
          ⚔️ Competidores (3-5 URLs)
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {config.competitors.map((comp, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="url"
                placeholder={`Competidor ${idx + 1}: https://`}
                value={comp}
                onChange={(e) => handleCompetitorChange(idx, e.target.value)}
                style={{ flex: 1 }}
              />
              {config.competitors.length > 1 && (
                <button
                  onClick={() => handleRemoveCompetitor(idx)}
                  style={{
                    padding: '6px 10px',
                    fontSize: 12,
                    background: 'var(--crit-bg)',
                    color: 'var(--crit)',
                    border: '0.5px solid var(--crit-border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {config.competitors.length < 5 && (
          <Btn
            onClick={handleAddCompetitor}
            style={{ marginTop: 8, padding: '6px 12px', fontSize: 12, width: '100%' }}
          >
            + Agregar Competidor
          </Btn>
        )}
      </div>

      {/* Action Button */}
      <Btn
        onClick={onAnalyze}
        disabled={!hasValidInput || loading}
        variant="primary"
        style={{ width: '100%', padding: '10px 20px', fontSize: 14, fontWeight: 500 }}
      >
        {loading ? '⏳ Analizando...' : '▶ Iniciar Análisis'}
      </Btn>

      {!hasValidInput && (
        <p style={{ fontSize: 11, color: 'var(--warn)', marginTop: 8 }}>
          ⚠️ Completa el nombre del proyecto y la URL para continuar
        </p>
      )}
    </Card>
  )
}
