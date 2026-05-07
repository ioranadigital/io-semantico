import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, MetricCard, SkeletonLoader, Card, EmptyState } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const [accountsRes, ticketsRes, dealsRes, retainersRes, activityRes] = await Promise.all([
        supabase.from('accounts').select('id, name, health_score, status, avatar'),
        supabase.from('tickets').select('id, status'),
        supabase.from('deals').select('value, stage'),
        supabase.from('v_retainer_status').select('*'),
        supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(5),
      ])

      const accounts = (accountsRes.data as any[]) || []
      const tickets = (ticketsRes.data as any[]) || []
      const deals = (dealsRes.data as any[]) || []
      const retainers = (retainersRes.data as any[]) || []
      const activity = (activityRes.data as any[]) || []

      const activeClients = accounts.filter((a: any) => a.status === 'Activo').length
      const openTickets = tickets.filter((t: any) => t.status !== 'Resuelto').length
      const pipelineTotal = deals.reduce((sum: number, d: any) => sum + (d.value || 0), 0)
      const alertRetainers = retainers.filter((r: any) => (r.hours_used / r.hours_allocated) >= 0.8).length

      setData({
        accounts,
        activeClients,
        openTickets,
        pipelineTotal,
        alertRetainers,
        activity,
      })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  const alertsExist = data.alertRetainers > 0

  return (
    <div>
      <SectionHeader title="Dashboard" subtitle="Bienvenido de vuelta" />

      {alertsExist && (
        <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-900">
            ⚠ {data.alertRetainers} retainer{data.alertRetainers > 1 ? 's' : ''} con bolsa de horas por encima del 80%
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Pipeline activo" value={`€${(data.pipelineTotal / 1000).toFixed(1)}K`} />
        <MetricCard label="Clientes activos" value={data.activeClients} />
        <MetricCard label="Tickets abiertos" value={data.openTickets} alert={data.openTickets > 0} />
        <MetricCard label="Retainers en alerta" value={data.alertRetainers} alert={data.alertRetainers > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-medium mb-4">Salud de clientes</h3>
            <div className="space-y-4">
              {data.accounts.length === 0 ? (
                <EmptyState title="Sin clientes" />
              ) : (
                data.accounts.map((acc: any) => (
                  <div key={acc.id} className="flex items-center gap-3 pb-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <Avatar name={acc.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{acc.name}</p>
                      <ProgressBar value={acc.health_score} max={100} />
                    </div>
                    <p className="text-sm font-medium text-gray-900 flex-shrink-0">{acc.health_score}%</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="font-medium mb-4">Actividad reciente</h3>
            <div className="space-y-3">
              {data.activity.length === 0 ? (
                <EmptyState title="Sin actividad" />
              ) : (
                data.activity.map((log: any) => (
                  <div key={log.id} className="flex gap-3 pb-3 border-b border-gray-200 last:border-b-0">
                    <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      {log.entity_type?.[0].toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-700 truncate">{log.action}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: es })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
