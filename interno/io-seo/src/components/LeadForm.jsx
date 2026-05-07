import React, { useState } from 'react'
import { Card, Btn, Badge } from './UI.jsx'

export function LeadForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    url: '',
    sector: '',
    mensaje: '',
    acepta: false,
  })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null) // null | 'success' | 'error'
  const [error, setError] = useState('')

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

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setStatus(null)

    if (!formData.nombre.trim()) {
      setError('El nombre es requerido')
      return
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setError('Email inválido')
      return
    }
    if (!formData.url.trim() || !validateUrl(formData.url)) {
      setError('URL del sitio web inválida')
      return
    }
    if (!formData.acepta) {
      setError('Debes aceptar recibir el informe SEO')
      return
    }

    setSending(true)
    const payload = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono || null,
      url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
      sector: formData.sector || 'No especificado',
      mensaje: formData.mensaje || null,
      modo: 'auto',
    }

    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL
      if (!webhookUrl) throw new Error('Webhook no configurado')

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al enviar')

      setStatus('success')
      setFormData({ nombre: '', email: '', telefono: '', url: '', sector: '', mensaje: '', acepta: false })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Error al enviar el formulario')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '2rem 1rem' }}>
      <Card>
        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: '1.5rem', color: 'var(--text)' }}>
          Informe SEO Gratuito
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
              Nombre completo *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={e => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Tu nombre"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={e => setFormData({ ...formData, telefono: e.target.value })}
              placeholder="(opcional)"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
              URL del sitio web *
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
              placeholder="www.tudominio.com"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
              Sector
            </label>
            <select
              value={formData.sector}
              onChange={e => setFormData({ ...formData, sector: e.target.value })}
              style={{ width: '100%' }}
            >
              <option value="">Selecciona un sector</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Servicios profesionales">Servicios profesionales</option>
              <option value="Salud">Salud</option>
              <option value="Hostelería">Hostelería</option>
              <option value="Inmobiliaria">Inmobiliaria</option>
              <option value="Educación">Educación</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
              ¿Qué es lo que más te preocupa de tu web?
            </label>
            <textarea
              value={formData.mensaje}
              onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
              placeholder="(opcional) Comparte tus dudas principales..."
              style={{ width: '100%', minHeight: 80, fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <input
              type="checkbox"
              id="acepta"
              checked={formData.acepta}
              onChange={e => setFormData({ ...formData, acepta: e.target.checked })}
              style={{ marginTop: 3, width: 18, height: 18, cursor: 'pointer' }}
            />
            <label htmlFor="acepta" style={{ fontSize: 13, cursor: 'pointer', flex: 1 }}>
              Acepto recibir el informe SEO gratuito por email
            </label>
          </div>

          {error && (
            <p style={{ fontSize: 12, color: 'var(--crit)', background: 'rgba(220, 53, 69, 0.1)', padding: '8px 12px', borderRadius: 4 }}>
              {error}
            </p>
          )}

          {status === 'success' && (
            <p style={{ fontSize: 12, color: 'var(--ok)', background: 'rgba(76, 175, 80, 0.1)', padding: '8px 12px', borderRadius: 4 }}>
              ✓ Solicitud recibida. Recibirás tu informe por email en breve.
            </p>
          )}

          {status === 'error' && (
            <p style={{ fontSize: 12, color: 'var(--crit)', background: 'rgba(220, 53, 69, 0.1)', padding: '8px 12px', borderRadius: 4 }}>
              ✗ Error al procesar la solicitud. Intenta de nuevo.
            </p>
          )}

          <Btn
            type="submit"
            disabled={sending}
            variant="primary"
            style={{ width: '100%', padding: '12px', fontSize: 14 }}
          >
            {sending ? 'Enviando...' : 'Solicitar informe gratuito'}
          </Btn>
        </form>

        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: '1rem', textAlign: 'center' }}>
          Tu información es privada y no será compartida.
        </p>
      </Card>
    </div>
  )
}
