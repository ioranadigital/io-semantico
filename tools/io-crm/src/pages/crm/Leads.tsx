import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'
import { useRealtime } from '@/hooks/useRealtime'
import { SectionHeader, MetricCard, DataTable, Badge, SkeletonLoader, Card, ProgressBar } from '@/components/shared'
import { useNavigate } from 'react-router-dom'

function calcLeadScore(lead: any): number {
  let s = 0
  if (lead.budget_range?.includes('>10.000')) s += 40
  else if (lead.budget_range?.includes('5.000')) s += 30
  else if (lead.budget_range?.includes('2.000')) s += 20
  else s += 10
  if (lead.urgency === 'Alta') s += 30
  else if (lead.urgency === 'Media') s += 15
  else s += 5
  const fitSectors = ['Fintech', 'Logística', 'SaaS', 'eCommerce', 'Retail']
  if (fitSectors.includes(lead.sector || '')) s += 20
  else s += 10
  if (lead.audit_status === 'done' && lead.audit_speed) s += Math.round(lead.audit_speed / 10)
  return Math.min(s, 100)
}

function getScoreColor(score: number): string {
  if (score >= 75) return '#639922'
  if (score >= 50) return '#BA7517'
  return '#E24B4A'
}

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
      if (error) {
        showToast('Error al cargar leads', '#E24B4A')
        return
      }
      setLeads(data || [])
      setLoading(false)
    }
    load()
  }, [])

  useRealtime('leads', {}, (payload: any) => {
    if (payload.eventType === 'UPDATE') {
      setLeads(l => l.map(d => d.id === payload.new.id ? payload.new : d))
    }
  })

  if (loading) return <SkeletonLoader count={5} />

  const scored = leads.map(l => ({ ...l, score: calcLeadScore(l) }))
  const avgScore = scored.length ? Math.round(scored.reduce((s, l) => s + l.score, 0) / scored.length) : 0
  const qualified = scored.filter(l => l.status === 'Cualificado').length
  const pending = scored.filter(l => l.audit_status === 'pending').length

  const columns = [
    {
      header: 'Nombre',
      accessor: 'contact_name',
      render: (val: string, row: any) => (
        <button onClick={() => navigate(`/leads/${row.id}`)} className="text-blue-500 hover:underline font-medium">
          {val}
        </button>
      ),
    },
    { header: 'Empresa', accessor: 'company' },
    { header: 'Origen', accessor: 'origin', render: (val: string) => <Badge label={val} bg="#378ADD" /> },
    {
      header: 'Score',
      accessor: 'score',
      render: (score: number) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={score} max={100} />
          <span className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
            {score}
          </span>
        </div>
      ),
    },
    {
      header: 'Auditoría',
      accessor: 'audit_status',
      render: (status: string) => {
        const colors: Record<string, string> = { pending: '#888780', in_progress: '#BA7517', done: '#639922' }
        const labels: Record<string, string> = { pending: 'Pendiente', in_progress: 'Analizando', done: 'Auditado' }
        return <Badge label={labels[status] || status} bg={colors[status] || '#888780'} />
      },
    },
    {
      header: 'Estado',
      accessor: 'status',
      render: (status: string) => <Badge label={status} bg="#7F77DD" />,
    },
  ]

  return (
    <div>
      <SectionHeader title="Leads" subtitle="Gestión de oportunidades" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total" value={leads.length} />
        <MetricCard label="Cualificados" value={qualified} />
        <MetricCard label="Score promedio" value={avgScore} />
        <MetricCard label="Sin auditar" value={pending} alert={pending > 0} />
      </div>
      <Card className="mb-6">
        <p className="text-sm text-purple">
          ℹ️ n8n realiza auditoría automática al recibir cada lead
        </p>
      </Card>
      <DataTable columns={columns} data={scored} />
    </div>
  )
}
