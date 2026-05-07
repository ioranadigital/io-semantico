import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export function useGlobalSearch() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)

    const term = `%${query}%`
    const [{ data: accounts }, { data: contacts }, { data: leads }] = await Promise.all([
      supabase.from('accounts').select('*').ilike('name', term),
      supabase.from('contacts').select('*').ilike('name', term),
      supabase.from('leads').select('*').ilike('company', term),
    ])

    const results: any[] = [
      ...(accounts as any[] || []).map((a: any) => ({ type: 'account', ...a })),
      ...(contacts as any[] || []).map((c: any) => ({ type: 'contact', ...c })),
      ...(leads as any[] || []).map((l: any) => ({ type: 'lead', ...l })),
    ]

    setResults(results)
    setLoading(false)
  }, [])

  return { results, loading, search }
}
