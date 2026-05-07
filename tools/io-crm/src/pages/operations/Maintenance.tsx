import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, Card } from '@/components/shared'
import { DonutChart } from '@/components/shared/DonutChart'

export default function Maintenance() {
  const [retainers, setRetainers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('v_retainer_status').select('*')
      setRetainers(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Mantenimiento" subtitle="Retainers mensuales" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {retainers.slice(0, 3).map(r => (
          <Card key={r.id}>
            <DonutChart used={r.hours_used} total={r.hours_allocated} label={r.month} color="#7F77DD" />
          </Card>
        ))}
      </div>
    </div>
  )
}
