import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, Card, EmptyState, SkeletonLoader } from '@/components/shared'
import { FileText } from 'lucide-react'

export default function Proposals() {
  const [loading, setLoading] = useState(true)
  const [proposals, setProposals] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading proposals:', error)
        setProposals([])
      } else {
        setProposals(data || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Propuestas" subtitle="Gestiona tus propuestas comerciales" />

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium">Listado de propuestas</h3>
          <button className="px-4 py-2 bg-purple text-white rounded-lg text-sm font-medium hover:opacity-90">
            Nueva propuesta
          </button>
        </div>

        {proposals.length === 0 ? (
          <EmptyState title="Sin propuestas" description="Crea tu primera propuesta para comenzar" />
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{proposal.title || 'Sin título'}</p>
                    <p className="text-xs text-gray-500">{proposal.client_name || 'Sin cliente'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">€{(proposal.amount || 0).toLocaleString('es-ES')}</p>
                  <p className="text-xs text-gray-500">{proposal.status || 'Pendiente'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
