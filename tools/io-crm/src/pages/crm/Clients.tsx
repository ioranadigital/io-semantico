import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { SectionHeader, MetricCard, SkeletonLoader, Card, Badge, ProgressBar } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'

export default function Clients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data: accounts } = await supabase.from('accounts').select('*').eq('status', 'Activo')
      const { data: tickets } = await supabase.from('tickets').select('account_id').neq('status', 'Resuelto')
      
      const openTicketsByAccount: Record<string, number> = {}
      if (tickets) {
        tickets.forEach((t: any) => {
          openTicketsByAccount[t.account_id] = (openTicketsByAccount[t.account_id] || 0) + 1
        })
      }

      const clientsWithMetrics = (accounts as any[] || []).map((a: any) => ({
        ...a,
        openTickets: openTicketsByAccount[a.id] || 0,
      }))

      setClients(clientsWithMetrics)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  const activeClients = clients.filter(c => c.status === 'Activo').length
  const openTickets = clients.reduce((s, c) => s + c.openTickets, 0)

  return (
    <div>
      <SectionHeader title="Clientes" subtitle="Gestión de cuentas" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Activos" value={activeClients} />
        <MetricCard label="Tickets abiertos" value={openTickets} alert={openTickets > 0} />
        <MetricCard label="Con portal activo" value={clients.filter(c => c.portal_active).length} />
      </div>

      <div className="space-y-3">
        {clients.map(c => (
          <Card key={c.id}>
            <button
              onClick={() => navigate(`/clients/${c.id}`)}
              className="w-full text-left hover:opacity-80 transition"
            >
              <div className="flex items-center gap-4">
                <Avatar name={c.name} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{c.name}</p>
                    <Badge label={c.status} bg={c.status === 'Activo' ? '#1D9E75' : '#BA7517'} color="#fff" />
                    {c.portal_active && <Badge label="Portal activo" bg="#378ADD" color="#fff" />}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Health: {c.health_score}%</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-medium">{c.health_score}%</p>
                  <ProgressBar value={c.health_score} max={100} />
                  {c.openTickets > 0 && (
                    <p className="text-xs text-red-600 mt-2">
                      {c.openTickets} tickets
                    </p>
                  )}
                </div>
              </div>
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
