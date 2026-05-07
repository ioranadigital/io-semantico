import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'
import { SectionHeader, Card, SkeletonLoader, ProgressBar, Badge } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>()
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      if (!id) return
      const { data } = await supabase.from('leads').select('*').eq('id', id).single()
      if (!data) {
        showToast('Lead no encontrado', '#E24B4A')
        return
      }
      setLead(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <SkeletonLoader count={5} />
  if (!lead) return <div>Lead no encontrado</div>

  const calcScore = () => {
    let s = 0
    if (lead.budget_range?.includes('>10.000')) s += 40
    else if (lead.budget_range?.includes('5.000')) s += 30
    else if (lead.budget_range?.includes('2.000')) s += 20
    else s += 10
    if (lead.urgency === 'Alta') s += 30
    else if (lead.urgency === 'Media') s += 15
    else s += 5
    const fit = ['Fintech','Logística','SaaS','eCommerce','Retail'].includes(lead.sector || '') ? 20 : 10
    s += fit
    if (lead.audit_status === 'done' && lead.audit_speed) s += Math.round(lead.audit_speed / 10)
    return Math.min(s, 100)
  }

  const total = calcScore()
  const color = total >= 75 ? '#639922' : total >= 50 ? '#BA7517' : '#E24B4A'

  const handleConvert = async () => {
    try {
      const { data: account } = await supabase.from('accounts').insert([{
        name: lead.company,
        sector: lead.sector,
        status: 'Activo',
        health_score: 100,
      }] as any).select().single()

      if (account) {
        await Promise.all([
          supabase.from('contacts').insert([{
            account_id: account.id,
            name: lead.contact_name,
            email: lead.email,
            phone: lead.phone,
            origin: lead.origin || 'Web',
          }] as any),
          supabase.from('leads').update({ status: 'Cualificado' } as any).eq('id', lead.id),
          supabase.from('activity_log').insert([{
            account_id: account.id,
            entity_type: 'account',
            entity_id: account.id,
            action: 'Cliente creado desde lead',
          }] as any),
        ])
        showToast('Cliente creado', '#639922')
        navigate(`/clients/${account.id}`)
      }
    } catch {
      showToast('Error al convertir', '#E24B4A')
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/leads')} className="mb-4 text-purple font-medium text-sm">
        ← Volver
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex gap-4 mb-6">
              <Avatar name={lead.contact_name} size="lg" />
              <div className="flex-1">
                <h2 className="text-2xl font-medium">{lead.contact_name}</h2>
                <p className="text-gray-600">{lead.company}</p>
                <p className="text-sm text-gray-500">{lead.email}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-medium" style={{ color }}>
                  {total}
                </p>
                <p className="text-xs text-gray-500">Score</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded">
              <div>
                <p className="text-xs text-gray-600 mb-1">Presupuesto</p>
                <p className="text-sm font-medium">{lead.budget_range || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Sector</p>
                <p className="text-sm font-medium">{lead.sector || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Urgencia</p>
                <Badge label={lead.urgency || 'Baja'} bg="#BA7517" />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card className="mb-6">
            <h3 className="font-medium mb-4">Scoring</h3>
            <div className="space-y-3">
              <div>
                <ProgressBar value={total} max={100} />
              </div>
              <div className="text-center pt-2 border-t">
                <p style={{ color }} className="text-2xl font-medium">
                  {total}/100
                </p>
              </div>
            </div>
          </Card>
          <button
            onClick={handleConvert}
            className="w-full px-4 py-3 bg-purple text-white rounded hover:opacity-90 font-medium"
          >
            Convertir a cliente
          </button>
        </div>
      </div>
    </div>
  )
}
