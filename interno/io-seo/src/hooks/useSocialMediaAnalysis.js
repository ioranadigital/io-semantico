const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zvehtloitnuglyjtxwye.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const PSI_FUNCTION = `${SUPABASE_URL}/functions/v1/analyze-psi`

export function useSocialMediaAnalysis() {
  async function analyze(url) {
    try {
      const res = await fetch(PSI_FUNCTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ url, fetchSocial: true }),
      })
      if (!res.ok) return {}
      const data = await res.json()
      return data.social || {}
    } catch {
      return {}
    }
  }

  return { analyze }
}
