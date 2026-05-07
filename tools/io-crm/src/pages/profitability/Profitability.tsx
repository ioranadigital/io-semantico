import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, Card, ProgressBar } from '@/components/shared'

export default function Profitability() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: projects } = await supabase.from('projects').select('*, tasks(hours_budget)')
      setData(projects || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Rentabilidad por proyecto" />
      <div className="space-y-4">
        {data.map(p => {
          const hours = (p.tasks || []).reduce((s: number, t: any) => s + (t.hours_budget || 0), 0)
          return (
            <Card key={p.id}>
              <p className="font-medium mb-2">{p.name}</p>
              <ProgressBar value={hours / 200} max={1} label={`${hours}h budgetadas`} />
            </Card>
          )
        })}
      </div>
    </div>
  )
}
