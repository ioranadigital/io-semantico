import { useState, useCallback } from 'react'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zvehtloitnuglyjtxwye.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const EDGE_FN = `${SUPABASE_URL}/functions/v1/analyze-psi`

async function callEdge(body) {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), 35000)
  try {
    const res = await fetch(EDGE_FN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(tid)
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    return data
  } catch (e) {
    clearTimeout(tid)
    if (e.name === 'AbortError') throw new Error('Timeout: inténtalo de nuevo')
    throw e
  }
}

export function useMCPTools() {
  const [linksData, setLinksData]         = useState(null)
  const [schemaData, setSchemaData]       = useState(null)
  const [securityData, setSecurityData]   = useState(null)
  const [localSEOData, setLocalSEOData]   = useState(null)
  const [loadingLinks, setLoadingLinks]       = useState(false)
  const [loadingSchema, setLoadingSchema]     = useState(false)
  const [loadingSecurity, setLoadingSecurity] = useState(false)
  const [loadingLocalSEO, setLoadingLocalSEO] = useState(false)

  const checkLinks = useCallback(async (url) => {
    setLoadingLinks(true)
    try {
      const data = await callEdge({ url, checkLinks: true })
      setLinksData(data)
      return data
    } catch (e) {
      const err = { error: e.message }
      setLinksData(err)
      return null
    } finally { setLoadingLinks(false) }
  }, [])

  const validateSchema = useCallback(async (url) => {
    setLoadingSchema(true)
    try {
      const data = await callEdge({ url, validateSchema: true })
      setSchemaData(data)
      return data
    } catch (e) {
      const err = { error: e.message }
      setSchemaData(err)
      return null
    } finally { setLoadingSchema(false) }
  }, [])

  const checkSecurityHeaders = useCallback(async (url) => {
    setLoadingSecurity(true)
    try {
      const data = await callEdge({ url, checkSecurityHeaders: true })
      setSecurityData(data)
      return data
    } catch (e) {
      const err = { error: e.message }
      setSecurityData(err)
      return null
    } finally { setLoadingSecurity(false) }
  }, [])

  const runAll = useCallback(async (url) => {
    setLoadingLinks(true); setLoadingSchema(true); setLoadingSecurity(true)
    const [links, schema, security] = await Promise.allSettled([
      callEdge({ url, checkLinks: true }),
      callEdge({ url, validateSchema: true }),
      callEdge({ url, checkSecurityHeaders: true }),
    ])
    const ld = links.status === 'fulfilled'    ? links.value    : { error: links.reason?.message }
    const sd = schema.status === 'fulfilled'   ? schema.value   : { error: schema.reason?.message }
    const sec = security.status === 'fulfilled' ? security.value : { error: security.reason?.message }
    setLinksData(ld); setSchemaData(sd); setSecurityData(sec)
    setLoadingLinks(false); setLoadingSchema(false); setLoadingSecurity(false)
    return { links: ld, schema: sd, security: sec }
  }, [])

  const checkLocalSEO = useCallback(async ({ url, location = '', businessName = '', keyword = '' }) => {
    setLoadingLocalSEO(true)
    try {
      const data = await callEdge({ url, checkLocalSEO: true, location, businessName, keyword })
      setLocalSEOData(data)
      return data
    } catch (e) {
      const err = { error: e.message }
      setLocalSEOData(err)
      return null
    } finally { setLoadingLocalSEO(false) }
  }, [])

  const reset = useCallback(() => {
    setLinksData(null); setSchemaData(null); setSecurityData(null); setLocalSEOData(null)
  }, [])

  const resetLocalSEO = useCallback(() => setLocalSEOData(null), [])

  return {
    linksData, schemaData, securityData, localSEOData,
    loadingLinks, loadingSchema, loadingSecurity, loadingLocalSEO,
    checkLinks, validateSchema, checkSecurityHeaders, checkLocalSEO, runAll, reset, resetLocalSEO,
  }
}
