import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRealtime } from '@/hooks/useRealtime'
import { SectionHeader, SkeletonLoader, Card } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Activity() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadLogs = async () => {
    const { data } = await supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(50)
    setLogs(data as any[] || [])
  }

  useEffect(() => {
    loadLogs()
    setLoading(false)
  }, [])

  useRealtime('activity_log', {}, () => {
    loadLogs()
  })

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Bitácora de actividad" />
      <div className="space-y-3">
        {logs.map(l => (
          <Card key={l.id}>
            <div className="flex gap-3">
              <Avatar name={l.entity_type || '?'} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{l.action}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(l.created_at), { addSuffix: true, locale: es })}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
