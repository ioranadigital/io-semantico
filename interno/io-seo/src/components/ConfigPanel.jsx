import React, { useState, useEffect } from 'react'
import { Card, SectionTitle, FormRow, FormCol, Btn, Badge, Divider } from './UI.jsx'
import {
  extractSheetId,
  importFromSheets,
  downloadCSV,
  SHEETS_STORAGE,
  savePreference,
  loadPreference,
} from '../utils/sheetsUtils.js'

export function ConfigPanel({ config, onChange, onAnalyze, loading, onTestKey }) {
  const [keyStatus, setKeyStatus] = useState(null) // null | 'testing' | 'ok' | 'error'
  const [gscMode, setGscMode] = useState('manual') // 'manual' | 'sheets'
  const [sheetUrl, setSheetUrl] = useState('')
  const [importLoading, setImportLoading] = useState(false)
  const [importStatus, setImportStatus] = useState(null) // null | 'loading' | 'ok' | 'error'
  const [importMsg, setImportMsg] = useState('')

  // Restaurar preferencias al montar
  useEffect(() => {
    const savedMode = loadPreference(SHEETS_STORAGE.mode, 'manual')
    const savedUrl = loadPreference(SHEETS_STORAGE.lastUrl, '')
    setGscMode(savedMode)
    setSheetUrl(savedUrl)
  }, [])

  async function handleTestKey() {
    setKeyStatus('testing')
    const ok = await onTestKey()
    setKeyStatus(ok ? 'ok' : 'error')
  }

  async function handleImportFromSheets() {
    if (!sheetUrl.trim()) {
      setImportStatus('error')
      setImportMsg('Pega la URL del spreadsheet')
      return
    }

    const sheetId = extractSheetId(sheetUrl)
    if (!sheetId) {
      setImportStatus('error')
      setImportMsg('URL no válida. Ejemplo: https://docs.google.com/spreadsheets/d/1ABC-xyz.../edit')
      return
    }

    if (!config.apiKey) {
      setImportStatus('error')
      setImportMsg('Configura primero la Google API Key')
      return
    }

    setImportLoading(true)
    setImportStatus('loading')
    setImportMsg('Importando...')

    try {
      // Importar KPIs
      const kpiResult = await importFromSheets(sheetId, config.apiKey, 'KPIs')
      if (kpiResult.error) {
        setImportStatus('error')
        setImportMsg(kpiResult.error)
        setImportLoading(false)
        return
      }

      // Actualizar config con datos importados
      const kpis = kpiResult.kpis || {}
      const keywords = kpiResult.keywords || []

      Object.entries(kpis).forEach(([field, value]) => {
        if (value !== undefined && value !== '') {
          onChange(field, String(value))
        }
      })

      if (keywords.length > 0) {
        onChange('gscKeywords', keywords.join('\n'))
      }

      // Guardar preferences
      savePreference(SHEETS_STORAGE.lastUrl, sheetUrl)
      savePreference(SHEETS_STORAGE.mode, 'sheets')

      setImportStatus('ok')
      setImportMsg(`✓ ${Object.keys(kpis).length} KPIs + ${keywords.length} keywords importados`)
    } catch (err) {
      setImportStatus('error')
      setImportMsg(`Error: ${err.message}`)
    } finally {
      setImportLoading(false)
    }
  }

  function handleModeChange(newMode) {
    setGscMode(newMode)
    savePreference(SHEETS_STORAGE.mode, newMode)
    setImportStatus(null)
    setImportMsg('')
  }

  return (
    <Card>
      <SectionTitle>Datos del proyecto</SectionTitle>
      <FormRow>
        <FormCol flex={2}>
          <label>URL del cliente <Badge type="info">requerido</Badge></label>
          <input
            type="text"
            placeholder="https://www.ejemplo.com"
            value={config.url}
            onChange={e => onChange('url', e.target.value)}
            style={{ marginTop: 4 }}
          />
        </FormCol>
        <FormCol>
          <label>Nombre del cliente</label>
          <input type="text" placeholder="Cliente S.L." value={config.clientName} onChange={e => onChange('clientName', e.target.value)} style={{ marginTop: 4 }} />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <label>Sector</label>
          <input type="text" placeholder="Clínica dental, Abogados..." value={config.sector} onChange={e => onChange('sector', e.target.value)} style={{ marginTop: 4 }} />
        </FormCol>
        <FormCol>
          <label>Negocio local</label>
          <select value={config.isLocal} onChange={e => onChange('isLocal', e.target.value)} style={{ marginTop: 4 }}>
            <option value="si">Sí — tiene local físico</option>
            <option value="no">No — solo online</option>
          </select>
        </FormCol>
        <FormCol>
          <label>Mercado</label>
          <input type="text" placeholder="España" value={config.market} onChange={e => onChange('market', e.target.value)} style={{ marginTop: 4 }} />
        </FormCol>
      </FormRow>

      <Divider />
      <SectionTitle>API Keys <Badge type="info">requerido</Badge></SectionTitle>
      <FormRow style={{ alignItems: 'flex-end' }}>
        <FormCol flex={2}>
          <label>PageSpeed Insights API Key</label>
          <input
            type="password"
            placeholder="AIzaSy..."
            value={config.apiKey}
            onChange={e => { onChange('apiKey', e.target.value); setKeyStatus(null) }}
            style={{ marginTop: 4 }}
          />
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
            console.cloud.google.com → APIs → PageSpeed Insights API → Credenciales
          </p>
        </FormCol>
        <FormCol style={{ maxWidth: 120 }}>
          <Btn onClick={handleTestKey} disabled={!config.apiKey || keyStatus === 'testing'}>
            {keyStatus === 'testing' ? 'Verificando...' : 'Verificar key'}
          </Btn>
          {keyStatus === 'ok' && <p style={{ fontSize: 11, color: 'var(--ok)', marginTop: 4 }}>Key válida ✓</p>}
          {keyStatus === 'error' && <p style={{ fontSize: 11, color: 'var(--crit)', marginTop: 4 }}>Key inválida</p>}
        </FormCol>
      </FormRow>

      <Divider />
      <SectionTitle>Competidores <Badge type="warn">opcional</Badge></SectionTitle>
      <FormRow>
        {[1, 2, 3].map(n => (
          <FormCol key={n}>
            <label>Competidor {n}</label>
            <input type="text" placeholder={`https://comp${n}.com`} value={config[`comp${n}`]} onChange={e => onChange(`comp${n}`, e.target.value)} style={{ marginTop: 4 }} />
          </FormCol>
        ))}
      </FormRow>

      <Divider />
      <SectionTitle>Google Search Console <Badge type="warn">opcional</Badge></SectionTitle>

      {/* Selector modo Manual / Google Sheets */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: 10, alignItems: 'center' }}>
        <label style={{ fontWeight: 500, fontSize: 13 }}>Modo:</label>
        <button
          onClick={() => handleModeChange('manual')}
          style={{
            padding: '6px 12px',
            border: gscMode === 'manual' ? '2px solid var(--ok)' : '1px solid var(--border)',
            borderRadius: 4,
            background: gscMode === 'manual' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
            color: gscMode === 'manual' ? 'var(--ok)' : 'var(--text-2)',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: gscMode === 'manual' ? 500 : 400,
          }}
        >
          Manual
        </button>
        <button
          onClick={() => handleModeChange('sheets')}
          style={{
            padding: '6px 12px',
            border: gscMode === 'sheets' ? '2px solid var(--ok)' : '1px solid var(--border)',
            borderRadius: 4,
            background: gscMode === 'sheets' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
            color: gscMode === 'sheets' ? 'var(--ok)' : 'var(--text-2)',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: gscMode === 'sheets' ? 500 : 400,
          }}
        >
          Google Sheets
        </button>
      </div>

      {/* Modo Google Sheets */}
      {gscMode === 'sheets' && (
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'rgba(76, 175, 80, 0.05)', borderRadius: 4, border: '1px solid var(--border)' }}>
          <FormRow>
            <FormCol flex={2}>
              <label>URL del spreadsheet</label>
              <input
                type="text"
                placeholder="https://docs.google.com/spreadsheets/d/1ABC-xyz.../edit#gid=0"
                value={sheetUrl}
                onChange={e => setSheetUrl(e.target.value)}
                style={{ marginTop: 4 }}
              />
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
                Copia la URL de tu Google Sheet. Debe ser compartido con "Cualquiera con el enlace"
              </p>
            </FormCol>
            <FormCol style={{ maxWidth: 140 }}>
              <Btn
                onClick={handleImportFromSheets}
                disabled={!sheetUrl.trim() || importLoading}
                style={{ marginTop: 28 }}
              >
                {importLoading ? 'Importando...' : 'Importar datos'}
              </Btn>
            </FormCol>
          </FormRow>

          {importStatus && (
            <p
              style={{
                fontSize: 11,
                color: importStatus === 'ok' ? 'var(--ok)' : importStatus === 'error' ? 'var(--crit)' : 'var(--text-3)',
                marginTop: 8,
              }}
            >
              {importMsg}
            </p>
          )}

          <Btn
            onClick={() => downloadCSV()}
            style={{ marginTop: 10, fontSize: 12, border: '0.5px solid var(--text-2)', color: 'var(--text-2)' }}
          >
            Descargar plantilla Excel (2 hojas) ↓
          </Btn>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
            Descarga el Excel con dos hojas (KPIs + Keywords), rellénalo y sube a Google Sheets
          </p>
        </div>
      )}

      {/* Modo Manual */}
      {gscMode === 'manual' && (
        <>
          <FormRow>
            {[
              { field: 'gscClicks', label: 'Clicks (28 días)', ph: '1250' },
              { field: 'gscImpr',   label: 'Impresiones',      ph: '42000' },
              { field: 'gscCtr',    label: 'CTR medio (%)',     ph: '3.2' },
              { field: 'gscPos',    label: 'Posición media',    ph: '18.4' },
            ].map(f => (
              <FormCol key={f.field}>
                <label>{f.label}</label>
                <input type="number" placeholder={f.ph} value={config[f.field]} onChange={e => onChange(f.field, e.target.value)} style={{ marginTop: 4 }} step="0.1" />
              </FormCol>
            ))}
          </FormRow>
          <FormRow>
            {[
              { field: 'gscTop3',   label: 'Keywords Top 3',    ph: '12' },
              { field: 'gscTop10',  label: 'Keywords Top 10',   ph: '47' },
              { field: 'gscTop100', label: 'Keywords Top 100',  ph: '320' },
              { field: 'gscPrev',   label: 'Clicks período ant.', ph: '980' },
            ].map(f => (
              <FormCol key={f.field}>
                <label>{f.label}</label>
                <input type="number" placeholder={f.ph} value={config[f.field]} onChange={e => onChange(f.field, e.target.value)} style={{ marginTop: 4 }} />
              </FormCol>
            ))}
          </FormRow>
          <div>
            <label>Top keywords — una por línea: keyword,clicks,posición</label>
            <textarea
              placeholder={'seguros de coche,245,4.2\nseguro hogar barato,180,6.8'}
              value={config.gscKeywords}
              onChange={e => onChange('gscKeywords', e.target.value)}
              style={{ marginTop: 4, fontFamily: 'monospace' }}
            />
          </div>
        </>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', gap: 10 }}>
        <Btn
          onClick={onAnalyze}
          disabled={!config.url || !config.apiKey || loading}
          variant="primary"
          style={{ flex: 1, padding: '10px 20px', fontSize: 14 }}
        >
          {loading ? 'Analizando sitio web...' : 'Analizar sitio web ↗'}
        </Btn>
      </div>
    </Card>
  )
}
