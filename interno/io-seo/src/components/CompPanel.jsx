import React, { useState } from 'react'
import { Badge, Divider, Btn, FormRow, FormCol } from './UI.jsx'
import { getScoreStatus } from '../utils/constants.js'

function CompCard({ url, data, isClient }) {
  if (!data?.lighthouseResult?.categories) return null
  const perf = Math.round(data.lighthouseResult.categories.performance?.score * 100) || 0
  const seo = Math.round(data.lighthouseResult.categories.seo?.score * 100) || 0
  const audits = data.lighthouseResult.audits || {}
  const lcp = audits['largest-contentful-paint']?.displayValue || 'N/D'
  const cls = audits['cumulative-layout-shift']?.displayValue || 'N/D'
  const domain = url.replace(/https?:\/\//, '').replace(/\/.*/, '')
  const st = getScoreStatus(perf)

  return (
    <div style={{
      border: isClient ? '2px solid var(--info)' : '0.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '0.85rem'
    }}>
      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, wordBreak: 'break-all' }}>
        {isClient && <span style={{ color: 'var(--info)' }}>★ </span>}
        {domain}{isClient && <span style={{ color: 'var(--text-2)', fontWeight: 400 }}> (cliente)</span>}
      </div>
      {[
        { label: 'Performance', val: <Badge type={st}>{perf}</Badge> },
        { label: 'SEO score', val: seo },
        { label: 'LCP', val: lcp },
        { label: 'CLS', val: cls },
      ].map(r => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, padding: '3px 0', borderBottom: '0.5px solid var(--border)' }}>
          <span style={{ color: 'var(--text-2)' }}>{r.label}</span>
          <span>{r.val}</span>
        </div>
      ))}
    </div>
  )
}

export function CompPanel({ clientUrl, clientData, compData, loading }) {
  const [manualComp, setManualComp] = useState({
    c1dr: '', c1bl: '', c1kw: '', c1tr: '',
    c2dr: '', c2bl: '', c2kw: '', c2tr: '',
    cldr: '', clbl: '', clkw: '', cltr: '',
  })
  const [showTable, setShowTable] = useState(false)

  const allUrls = [clientUrl, ...Object.keys(compData)]
  const allData = [[clientUrl, clientData, true], ...Object.entries(compData).map(([u, d]) => [u, d, false])]

  const clientPerf = clientData?.lighthouseResult?.categories?.performance?.score ? Math.round(clientData.lighthouseResult.categories.performance.score * 100) : null
  const compPerfs = Object.values(compData)
    .map(d => d?.lighthouseResult?.categories?.performance?.score ? Math.round(d.lighthouseResult.categories.performance.score * 100) : null)
    .filter(x => x !== null)
  const avgPerf = compPerfs.length ? Math.round(compPerfs.reduce((a, b) => a + b, 0) / compPerfs.length) : null

  return (
    <div>
      {loading && <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: '0.75rem' }}>Analizando competidores con PageSpeed...</p>}

      {allData.some(([, d]) => d) && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8, marginBottom: '0.75rem' }}>
            {allData.filter(([, d]) => d).map(([url, data, isClient]) => (
              <CompCard key={url} url={url} data={data} isClient={isClient} />
            ))}
          </div>

          {clientPerf && avgPerf && (
            <div style={{ fontSize: 13, color: 'var(--text-2)', padding: '8px 0' }}>
              <strong>Insight automático:</strong> Performance del cliente <strong>{clientPerf}</strong> vs media competidores <strong>{avgPerf}</strong>.{' '}
              {clientPerf >= avgPerf
                ? <span style={{ color: 'var(--ok)' }}>Ventaja de +{clientPerf - avgPerf} puntos.</span>
                : <span style={{ color: 'var(--crit)' }}>Brecha de -{avgPerf - clientPerf} puntos — prioridad de mejora.</span>
              }
            </div>
          )}
          <Divider />
        </>
      )}

      <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Datos de autoridad — introduce desde Ahrefs / SEMrush / Similarweb</p>
      {[
        { prefix: 'cl', label: 'Cliente' },
        { prefix: 'c1', label: 'Competidor 1' },
        { prefix: 'c2', label: 'Competidor 2' },
      ].map(({ prefix, label }) => (
        <div key={prefix} style={{ marginBottom: '0.5rem' }}>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{label}</p>
          <FormRow>
            {[
              { field: `${prefix}dr`, ph: 'DR/DA' },
              { field: `${prefix}bl`, ph: 'Backlinks' },
              { field: `${prefix}kw`, ph: 'Keywords' },
              { field: `${prefix}tr`, ph: 'Tráfico/mes' },
            ].map(({ field, ph }) => (
              <FormCol key={field}>
                <input type="number" placeholder={ph} value={manualComp[field]} onChange={e => setManualComp(p => ({ ...p, [field]: e.target.value }))} />
              </FormCol>
            ))}
          </FormRow>
        </div>
      ))}
      <Btn onClick={() => setShowTable(true)}>Generar tabla comparativa ↗</Btn>

      {showTable && (
        <div style={{ marginTop: '0.75rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Sitio', 'DR/DA', 'Backlinks', 'Keywords', 'Tráfico/mes', 'Gap kw'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '5px 8px', borderBottom: '0.5px solid var(--border-2)', color: 'var(--text-2)', fontSize: 11 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {[
                { label: clientUrl.replace(/https?:\/\//, '').split('/')[0], ...Object.fromEntries(['dr','bl','kw','tr'].map(k => [k, manualComp[`cl${k}`]])), isClient: true },
                { label: (Object.keys(compData)[0] || 'Comp. 1').replace(/https?:\/\//, '').split('/')[0], ...Object.fromEntries(['dr','bl','kw','tr'].map(k => [k, manualComp[`c1${k}`]])) },
                { label: (Object.keys(compData)[1] || 'Comp. 2').replace(/https?:\/\//, '').split('/')[0], ...Object.fromEntries(['dr','bl','kw','tr'].map(k => [k, manualComp[`c2${k}`]])) },
              ].map((row, i) => {
                const clKw = parseInt(manualComp.clkw) || 1
                const gap = row.isClient ? '—' : row.kw ? `${Math.round((parseInt(row.kw) - clKw) / clKw * 100)}%` : '—'
                return (
                  <tr key={i} style={{ fontWeight: row.isClient ? 500 : 400 }}>
                    <td style={{ padding: '5px 8px', borderBottom: '0.5px solid var(--border)' }}>{row.isClient ? '★ ' : ''}{row.label}</td>
                    {['dr','bl','kw','tr'].map(k => <td key={k} style={{ padding: '5px 8px', borderBottom: '0.5px solid var(--border)' }}>{row[k] ? parseInt(row[k]).toLocaleString() : '—'}</td>)}
                    <td style={{ padding: '5px 8px', borderBottom: '0.5px solid var(--border)' }}>{gap}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
