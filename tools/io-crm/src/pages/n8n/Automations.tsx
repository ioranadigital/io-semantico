import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, Card } from '@/components/shared'

export default function Automations() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('n8n_logs').select('*').order('created_at', { ascending: false }).limit(50)
      const grouped = data?.reduce((acc: any, log: any) => {
        if (!acc[log.workflow_name]) acc[log.workflow_name] = []
        acc[log.workflow_name].push(log)
        return acc
      }, {}) || {}
      setLogs(Object.entries(grouped).map(([name, logs]: [string, any]) => ({ name, logs, last: logs[0] })))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Automatizaciones n8n" />
      <div className="space-y-3">
        {logs.map((l: any, i: number) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{l.name}</p>
                <p className="text-xs text-gray-600">{l.logs.length} ejecuciones</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${l.last.status === 'success' ? 'bg-green-500' : l.last.status === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                <span className="text-sm text-gray-600">{l.last.status}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
