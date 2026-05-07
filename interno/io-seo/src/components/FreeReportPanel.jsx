import React, { useState, useEffect } from 'react'
import { Card, Btn, Badge, Divider } from './UI.jsx'
import { usePSI } from '../hooks/usePSI.js'
import { analyzeHomepage, calculateScoring, generateAutomaticRecommendations } from '../utils/leadAnalysis.js'
import { generateReportPDF } from '../utils/pdfGenerator.js'

const LEADS_STORAGE_KEY = 'seo_agent_leads'

export function FreeReportPanel() {
  const [section, setSection] = useState('solicitud') // 'solicitud' | 'historial'
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    url: '',
    sector: '',
    notasInternas: '',
    prioridad: 'Normal',
    enviarCliente: true,
    enviarConsultor: true,
  })
  const [leads, setLeads] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [status, setStatus] = useState(null) // null | 'analyzing' | 'success' | 'error'
  const [error, setError] = useState('')

  const { analyzeUrl } = usePSI()

  // Cargar historial
  useEffect(() => {
    const saved = localStorage.getItem(LEADS_STORAGE_KEY)
    if (saved) {
      try {
        setLeads(JSON.parse(saved))
      } catch (err) {
        console.warn('Error loading leads:', err)
      }
    }
  }, [])

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function validateUrl(url) {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  async function handleAnalyzeAndSend(sendToWebhook = true) {
    setError('')
    setStatus(null)

    // Validar
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido')
      return
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setError('Email inválido')
      return
    }
    if (!formData.url.trim() || !validateUrl(formData.url)) {
      setError('URL inválida')
      return
    }

    const normalizedUrl = formData.url.startsWith('http') ? formData.url : `https://${formData.url}`

    setStatus('analyzing')
    setAnalyzing(true)

    try {
      // 1. Analizar homepage
      const technicalVariables = await analyzeHomepage(normalizedUrl)

      // 2. Obtener PSI data
      const psiData = await analyzeUrl(normalizedUrl)
      if (!psiData) throw new Error('No se pudo obtener datos de PSI')

      // 3. Calcular score
      const score = calculateScoring(technicalVariables, psiData)

      // 4. Generar recomendaciones
      const recommendations = await generateAutomaticRecommendations(technicalVariables, psiData)

      // 5. Generar PDF
      const pdf = generateReportPDF({ url: normalizedUrl, name: formData.nombre }, technicalVariables, psiData, score, recommendations)

      // 6. Guardar en historial
      const leadRecord = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        nombre: formData.nombre,
        email: formData.email,
        url: normalizedUrl,
        sector: formData.sector,
        score,
        modo: 'manual',
        technicalVariables,
        psiData,
        recommendations,
        pdfData: pdf.output('datauristring'),
      }

      // Guardar PDF localmente
      if (!sendToWebhook) {
        pdf.save(`informe-seo-${formData.nombre.replace(/\s+/g, '-').toLowerCase()}.pdf`)
        setStatus('success')
        setTimeout(() => setStatus(null), 3000)
        return
      }

      // Enviar a webhook si está configurado
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL
      if (webhookUrl) {
        const payload = {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono || null,
          url: normalizedUrl,
          sector: formData.sector || 'No especificado',
          mensaje: null,
          modo: 'manual',
          notas_internas: formData.notasInternas || null,
          prioridad: formData.prioridad,
          enviar_cliente: formData.enviarCliente,
          enviar_consultor: formData.enviarConsultor,
          score,
          psi_data: psiData,
        }

        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) throw new Error('Error al enviar a n8n')
      }

      // Guardar en localStorage
      const updatedLeads = [leadRecord, ...leads].slice(0, 50)
      setLeads(updatedLeads)
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads))

      setStatus('success')
      setFormData({ nombre: '', email: '', telefono: '', url: '', sector: '', notasInternas: '', prioridad: 'Normal', enviarCliente: true, enviarConsultor: true })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Error al generar informe')
    } finally {
      setAnalyzing(false)
    }
  }

  function downloadLead(lead) {
    if (lead.pdfData) {
      const link = document.createElement('a')
      link.href = lead.pdfData
      link.download = `informe-seo-${lead.nombre.replace(/\s+/g, '-').toLowerCase()}.pdf`
      link.click()
    }
  }

  function deleteLead(id) {
    const updated = leads.filter(l => l.id !== id)
    setLeads(updated)
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <Card>
      {/* Selector de sección */}
      <div style={{ display: 'flex', gap: 10, marginBottom: '1.5rem' }}>
        <button
          onClick={() => setSection('solicitud')}
          style={{
            padding: '8px 16px',
            border: section === 'solicitud' ? '2px solid var(--ok)' : '1px solid var(--border)',
            borderRadius: 4,
            background: section === 'solicitud' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
            color: section === 'solicitud' ? 'var(--ok)' : 'var(--text-2)',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: section === 'solicitud' ? 500 : 400,
          }}
        >
          Solicitud Manual
        </button>
        <button
          onClick={() => setSection('historial')}
          style={{
            padding: '8px 16px',
            border: section === 'historial' ? '2px solid var(--ok)' : '1px solid var(--border)',
            borderRadius: 4,
            background: section === 'historial' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
            color: section === 'historial' ? 'var(--ok)' : 'var(--text-2)',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: section === 'historial' ? 500 : 400,
          }}
        >
          Historial ({leads.length})
        </button>
      </div>

      {/* SECCIÓN 1: SOLICITUD MANUAL */}
      {section === 'solicitud' && (
        <div>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>Nombre *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Nombre del prospecto"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contacto@email.com"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="(opcional)"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>URL *</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  placeholder="www.dominio.com"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>Sector</label>
                <select
                  value={formData.sector}
                  onChange={e => setFormData({ ...formData, sector: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="">Selecciona</option>
                  <option value="Ecommerce">Ecommerce</option>
                  <option value="Servicios">Servicios</option>
                  <option value="Salud">Salud</option>
                  <option value="Hostelería">Hostelería</option>
                  <option value="Inmobiliaria">Inmobiliaria</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>Notas Internas</label>
              <textarea
                value={formData.notasInternas}
                onChange={e => setFormData({ ...formData, notasInternas: e.target.value })}
                placeholder="Notas que no aparecerán en el PDF del cliente..."
                style={{ width: '100%', minHeight: 60, fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}>Prioridad</label>
                <select
                  value={formData.prioridad}
                  onChange={e => setFormData({ ...formData, prioridad: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  id="enviarCliente"
                  checked={formData.enviarCliente}
                  onChange={e => setFormData({ ...formData, enviarCliente: e.target.checked })}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="enviarCliente" style={{ fontSize: 12, cursor: 'pointer' }}>
                  Enviar PDF al cliente por email
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  id="enviarConsultor"
                  checked={formData.enviarConsultor}
                  onChange={e => setFormData({ ...formData, enviarConsultor: e.target.checked })}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="enviarConsultor" style={{ fontSize: 12, cursor: 'pointer' }}>
                  Enviarme copia a honatuya@gmail.com
                </label>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: 11, color: 'var(--crit)', background: 'rgba(220, 53, 69, 0.1)', padding: '8px 12px', borderRadius: 4 }}>
                {error}
              </p>
            )}

            {status === 'success' && (
              <p style={{ fontSize: 11, color: 'var(--ok)', background: 'rgba(76, 175, 80, 0.1)', padding: '8px 12px', borderRadius: 4 }}>
                ✓ Informe generado y guardado. Se procesará en breve.
              </p>
            )}

            {status === 'error' && (
              <p style={{ fontSize: 11, color: 'var(--crit)', background: 'rgba(220, 53, 69, 0.1)', padding: '8px 12px', borderRadius: 4 }}>
                ✗ Error: {error}
              </p>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <Btn
                onClick={() => handleAnalyzeAndSend(true)}
                disabled={analyzing}
                variant="primary"
                style={{ flex: 1, padding: '10px 20px' }}
              >
                {analyzing ? 'Analizando...' : 'Generar y enviar informe'}
              </Btn>
              <Btn
                onClick={() => handleAnalyzeAndSend(false)}
                disabled={analyzing}
                style={{ flex: 1, padding: '10px 20px', fontSize: 12, border: '0.5px solid var(--text-2)', color: 'var(--text-2)' }}
              >
                {analyzing ? 'Analizando...' : 'Solo generar PDF'}
              </Btn>
            </div>
          </form>
        </div>
      )}

      {/* SECCIÓN 2: HISTORIAL */}
      {section === 'historial' && (
        <div>
          {leads.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-2)', textAlign: 'center', padding: '2rem' }}>
              No hay registros aún
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Fecha</th>
                    <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Nombre</th>
                    <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>URL</th>
                    <th style={{ textAlign: 'center', padding: '8px 0', fontWeight: 500 }}>Score</th>
                    <th style={{ textAlign: 'center', padding: '8px 0', fontWeight: 500 }}>Modo</th>
                    <th style={{ textAlign: 'center', padding: '8px 0', fontWeight: 500 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id} style={{ borderBottom: '0.5px solid var(--border)' }}>
                      <td style={{ padding: '8px 0', color: 'var(--text-2)', fontSize: 11 }}>
                        {new Date(lead.fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: '2-digit' })}
                      </td>
                      <td style={{ padding: '8px 0' }}>{lead.nombre}</td>
                      <td style={{ padding: '8px 0', color: 'var(--text-2)', fontSize: 11, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lead.url.replace(/https?:\/\//, '')}
                      </td>
                      <td style={{ padding: '8px 0', textAlign: 'center', fontWeight: 500 }}>
                        <Badge type={lead.score >= 15 ? 'ok' : lead.score >= 10 ? 'warn' : 'crit'}>
                          {lead.score}/20
                        </Badge>
                      </td>
                      <td style={{ padding: '8px 0', textAlign: 'center', color: 'var(--text-2)', fontSize: 11 }}>
                        {lead.modo}
                      </td>
                      <td style={{ padding: '8px 0', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                          <button onClick={() => downloadLead(lead)} style={{ fontSize: 11, padding: '3px 8px', border: '0.5px solid var(--border)', borderRadius: 3, background: 'transparent', cursor: 'pointer', color: 'var(--text-2)' }}>
                            PDF
                          </button>
                          <button onClick={() => deleteLead(lead.id)} style={{ fontSize: 11, padding: '3px 8px', border: '0.5px solid var(--crit)', borderRadius: 3, background: 'rgba(220, 53, 69, 0.1)', cursor: 'pointer', color: 'var(--crit)' }}>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
