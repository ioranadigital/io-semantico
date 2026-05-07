import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { SkeletonLoader, MetricCard, Card, Badge, ProgressBar } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'
import { DonutChart } from '@/components/shared/DonutChart'

export default function ClientDetail() {
  const { id } = useParams()
  const [account, setAccount] = useState<any>(null)
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('accounts').select('*').eq('id', id).single()
      setAccount(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <SkeletonLoader count={5} />
  if (!account) return <div>Cliente no encontrado</div>

  return (
    <div>
      <button onClick={() => navigate('/clients')} className="mb-4 text-purple font-medium text-sm">
        ← Volver
      </button>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={account.name} size="lg" />
          <div>
            <h1 className="text-2xl font-medium">{account.name}</h1>
            <p className="text-sm text-gray-600">{account.sector || 'Sin sector'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge label={account.status} bg={account.status === 'Activo' ? '#1D9E75' : '#BA7517'} color="#fff" />
          {account.portal_active && <Badge label="Portal activo" bg="#378ADD" color="#fff" />}
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-300">
        {[
          { label: 'Resumen', value: 0 },
          { label: 'Actividad', value: 1 },
          { label: 'Finanzas', value: 2 },
        ].map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              tab === t.value ? 'border-purple text-purple' : 'border-transparent text-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Health score" value={`${account.health_score}%`} />
            <MetricCard label="Tickets abiertos" value="2" />
            <MetricCard label="Retainer horas" value="80/120" />
            <MetricCard label="Porcentaje usado" value="67%" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <h3 className="font-medium mb-4">Proyecto activo</h3>
              <p className="text-sm text-gray-600">Proyecto SEO</p>
              <ProgressBar value={65} max={100} />
            </Card>
            <Card>
              <h3 className="font-medium mb-4">Retainer</h3>
              <DonutChart used={80} total={120} label="120h" color="#7F77DD" />
            </Card>
          </div>
        </div>
      )}
      {tab === 1 && <Card><p className="text-gray-600">Sin actividad</p></Card>}
      {tab === 2 && <Card><p className="text-gray-600">Sin facturas</p></Card>}
    </div>
  )
}
