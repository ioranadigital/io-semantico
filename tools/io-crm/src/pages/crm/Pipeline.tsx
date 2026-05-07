import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, Card } from '@/components/shared'

const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Negociación', 'Ganado', 'Perdido']
const STAGE_COLORS = {
  'Lead': '#BA7517',
  'Contactado': '#D85A30',
  'Propuesta': '#7F77DD',
  'Negociación': '#1D9E75',
  'Ganado': '#639922',
  'Perdido': '#888780',
}

export default function Pipeline() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('deals').select('*, accounts(name)').order('created_at')
      setDeals(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Pipeline" subtitle="Kanban de deals" />
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
          {STAGES.map(stage => {
            const stageDeal = deals.filter(d => d.stage === stage)
            const total = stageDeal.reduce((s, d) => s + (d.value || 0), 0)
            return (
              <div
                key={stage}
                className="flex-shrink-0 w-80 bg-gray-50 rounded-lg border border-gray-300 p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{stage}</h3>
                  <p className="text-xs text-gray-600">€{(total / 1000).toFixed(0)}K</p>
                </div>
                <div className="space-y-3">
                  {stageDeal.map(d => (
                    <Card key={d.id}>
                      <p className="font-medium text-sm">{d.title}</p>
                      <p className="text-xs text-gray-600">{d.accounts?.name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-medium text-sm">€{(d.value / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-gray-600">{d.probability}%</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
