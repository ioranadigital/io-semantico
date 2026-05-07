import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { SectionHeader, MetricCard, SkeletonLoader, Card } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'

export default function ClientPortal() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    async function load() {
      if (!user) return
      const { data: portalUser } = await supabase
        .from('portal_users')
        .select('account_id, accounts(*)')
        .eq('user_id', user.id)
        .single()

      if (!portalUser) {
        showToast('No tienes acceso al portal', '#E24B4A')
        return
      }

      const accountId = (portalUser as any).account_id

      const [{ data: projects }, { data: tickets }, { data: proposals }] = await Promise.all([
        supabase.from('projects').select('*').eq('account_id', accountId).limit(1).single(),
        supabase.from('tickets').select('*').eq('account_id', accountId).neq('status', 'Resuelto'),
        supabase.from('proposals').select('*').eq('account_id', accountId).eq('status', 'Pendiente'),
      ])

      setData({
        account: (portalUser as any).accounts,
        projects,
        tickets: (tickets as any[]) || [],
        proposals: (proposals as any[]) || [],
      })
      setLoading(false)
    }
    load()
  }, [user])

  if (loading) return <SkeletonLoader count={5} />
  if (!data) return <div>Acceso denegado</div>

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-300 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={data.account.name} size="md" />
          <div>
            <h1 className="font-medium">{data.account.name}</h1>
            <p className="text-sm text-gray-600">Portal del cliente</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <SectionHeader title="Mi portal" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard label="Proyecto activo" value="50%" sub="En progreso" />
          <MetricCard label="Tickets abiertos" value={data.tickets.length} />
          <MetricCard label="Propuestas pendientes" value={data.proposals.length} />
        </div>

        {data.tickets.length > 0 && (
          <Card className="mb-6">
            <h3 className="font-medium mb-4">Mis tickets</h3>
            <div className="space-y-3">
              {data.tickets.map((t: any) => (
                <div key={t.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="font-medium text-sm">{t.title}</p>
                  <p className="text-xs text-gray-600">{t.reference}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {data.proposals.length > 0 && (
          <Card>
            <h3 className="font-medium mb-4">Propuestas</h3>
            <div className="space-y-3">
              {data.proposals.map((p: any) => (
                <div key={p.id} className="p-3 bg-gray-50 rounded border border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{p.title}</p>
                    <p className="text-xs text-gray-600">€{p.value}</p>
                  </div>
                  <button className="px-3 py-1 text-xs bg-purple text-white rounded hover:opacity-90">
                    Aceptar
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
