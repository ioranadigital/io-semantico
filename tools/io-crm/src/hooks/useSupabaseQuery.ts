import { useState, useEffect } from 'react'
import { useToast } from './useToast'

export function useSupabaseQuery<T>(
  query: () => Promise<{ data: T | null; error: any }>
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const { showToast } = useToast()

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const result = await query()
      if (result.error) {
        setError(result.error)
        showToast('Error al cargar datos', '#E24B4A')
      } else {
        setData(result.data)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  return { data, loading, error }
}
