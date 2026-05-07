import { useState, useCallback } from 'react'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zvehtloitnuglyjtxwye.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const PSI_FUNCTION = `${SUPABASE_URL}/functions/v1/analyze-psi`
const FETCH_TIMEOUT_MS = 65000

async function fetchPSI(url, strategy) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(PSI_FUNCTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ url, strategy }),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error || `Error ${res.status}`)
    }
    return res.json()
  } catch (e) {
    clearTimeout(timeoutId)
    if (e.name === 'AbortError') throw new Error('Timeout: el análisis tardó demasiado, inténtalo de nuevo')
    throw e
  }
}

export function usePSI() {
  const [data, setData] = useState({ mobile: null, desktop: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = useCallback(async (url) => {
    setLoading(true)
    setError(null)
    try {
      const [mobileRes, desktopRes] = await Promise.allSettled([
        fetchPSI(url, 'mobile'),
        fetchPSI(url, 'desktop'),
      ])

      const mobile  = mobileRes.status  === 'fulfilled' ? mobileRes.value  : null
      const desktop = desktopRes.status === 'fulfilled' ? desktopRes.value : null

      if (!mobile && !desktop) {
        const err = mobileRes.status === 'rejected' ? mobileRes.reason : desktopRes.reason
        const raw = err?.message || ''
        let msg
        if (raw.includes('GOOGLE_PSI_KEY') || raw.includes('Server misconfigured')) {
          msg = 'GOOGLE_PSI_KEY no configurada → Supabase Dashboard → Settings → Secrets'
        } else if (raw.toLowerCase().includes('timeout')) {
          msg = 'PSI no respondió en 45s. La URL puede ser muy lenta o el sitio está caído. Verifica la URL e inténtalo de nuevo.'
        } else {
          msg = raw || 'Error desconocido al llamar PSI'
        }
        console.error('❌ PSI Error (ambos fallaron):', msg)
        setError(msg)
        return null
      }

      if (!desktop) {
        console.warn('⚠ PSI desktop timeout — mostrando solo datos móvil')
        setError('⚠ Análisis de escritorio no disponible (timeout) — mostrando solo datos móvil')
      }
      setData({ mobile, desktop })
      return { mobile, desktop }
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const analyzeUrl = useCallback(async (url) => {
    try {
      return await fetchPSI(url, 'mobile')
    } catch {
      return null
    }
  }, [])

  const testKey = useCallback(async () => {
    try {
      const res = await fetchPSI('https://www.google.com', 'mobile')
      return !!res
    } catch {
      return false
    }
  }, [])

  const checkPSIHealth = useCallback(async () => {
    try {
      const ctrl = new AbortController()
      setTimeout(() => ctrl.abort(), 15000)
      const res = await fetch(PSI_FUNCTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ checkPSIHealth: true }),
        signal: ctrl.signal,
      })
      return await res.json()
    } catch {
      return { ok: false, reason: 'Edge Function no accesible' }
    }
  }, [])

  const reset = useCallback(() => {
    setData({ mobile: null, desktop: null })
    setError(null)
  }, [])

  return { data, loading, error, analyze, analyzeUrl, testKey, checkPSIHealth, reset }
}
