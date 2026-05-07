import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useRealtime } from '@/hooks/useRealtime'
import { SectionHeader, MetricCard, DataTable, Badge, SkeletonLoader, Card } from '@/components/shared'

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadTickets = async () => {
    const { data } = await supabase.from('tickets').select('*, accounts(name)').order('created_at', { ascending: false })
    setTickets(data || [])
  }

  useEffect(() => {
    loadTickets()
    setLoading(false)
  }, [])

  useRealtime('tickets', {}, () => {
    loadTickets()
  })

  if (loading) return <SkeletonLoader count={5} />

  const open = tickets.filter(t => t.status !== 'Resuelto').length
  const critical = tickets.filter(t => t.severity === 'Crítico').length

  const columns = [
    {
      header: 'Ref',
      accessor: 'reference',
      render: (val: string, row: any) => (
        <button onClick={() => navigate(`/tickets/${row.id}`)} className="text-blue-500 font-mono text-sm hover:underline">
          {val}
        </button>
      ),
    },
    { header: 'Título', accessor: 'title', render: (val: string) => <span className="truncate">{val}</span> },
    { header: 'Cliente', accessor: 'accounts.name', render: (val: string) => <span className="text-sm text-gray-600">{val || 'N/A'}</span> },
    {
      header: 'Severidad',
      accessor: 'severity',
      render: (val: string) => {
        const colors: Record<string, string> = { 'Crítico': '#E24B4A', 'Alto': '#D85A30', 'Medio': '#BA7517', 'Bajo': '#639922' }
        return <Badge label={val} bg={colors[val] || '#888780'} />
      },
    },
    {
      header: 'Estado',
      accessor: 'status',
      render: (val: string) => <Badge label={val} bg="#378ADD" />,
    },
  ]

  return (
    <div>
      <SectionHeader title="Tickets" subtitle="Soporte técnico" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Abiertos" value={open} alert={open > 0} />
        <MetricCard label="Críticos" value={critical} alert={critical > 0} />
        <MetricCard label="Total" value={tickets.length} />
      </div>
      <Card className="mb-6">
        <p className="text-sm text-blue-600">ℹ️ n8n detecta tickets críticos y alerta en Slack</p>
      </Card>
      <DataTable columns={columns} data={tickets} />
    </div>
  )
}
