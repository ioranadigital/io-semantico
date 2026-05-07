import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRealtime } from '@/hooks/useRealtime'
import { SectionHeader, SkeletonLoader, Card, MetricCard } from '@/components/shared'

export default function N8nLogs() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase.from('n8n_logs').select('*').order('created_at', { ascending: false }).limit(100)
    setLogs(data || [])
  }

  useEffect(() => {
    load()
    setLoading(false)
  }, [])

  useRealtime('n8n_logs', {}, () => {
    load()
  })

  if (loading) return <SkeletonLoader count={5} />

  const success = logs.filter(l => l.status === 'success').length
  const errors = logs.filter(l => l.status === 'error').length

  return (
    <div>
      <SectionHeader title="Logs n8n" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Exitosos" value={success} />
        <MetricCard label="Errores" value={errors} alert={errors > 0} />
        <MetricCard label="Total" value={logs.length} />
      </div>
      <div className="space-y-2">
        {logs.map(l => (
          <Card key={l.id}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={l.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {l.status === 'success' ? '✓' : '✕'}
                </span>
                <p className="font-medium">{l.workflow_name}</p>
              </div>
              <p className="text-xs text-gray-600">{new Date(l.created_at).toLocaleString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
