import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'
import { SkeletonLoader, Card, Badge } from '@/components/shared'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('tickets')
        .select('*, accounts(name, sla_hours), contacts(name, email)')
        .eq('id', id)
        .single()
      setTicket(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <SkeletonLoader count={5} />
  if (!ticket) return <div>No encontrado</div>

  const handleResolve = async () => {
    try {
      await supabase.from('tickets').update({
        status: 'Resuelto',
        resolved_at: new Date().toISOString(),
      } as any).eq('id', ticket.id)
      showToast('Ticket resuelto', '#639922')
      navigate('/tickets')
    } catch {
      showToast('Error', '#E24B4A')
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/tickets')} className="mb-4 text-purple font-medium text-sm">
        ← Volver
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-mono text-gray-600">{ticket.reference}</p>
                <h1 className="text-2xl font-medium">{ticket.title}</h1>
              </div>
              <div className="flex gap-2">
                <Badge label={ticket.severity} bg="#E24B4A" color="#fff" />
                <Badge label={ticket.status} bg="#378ADD" color="#fff" />
              </div>
            </div>
            <p className="text-gray-700 mb-6">{ticket.description}</p>
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Respuesta</h3>
              <textarea className="w-full p-3 border border-gray-300 rounded focus:outline-none" rows={4} placeholder="Respuesta..." />
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 bg-purple text-white rounded hover:opacity-90">Enviar</button>
                {ticket.status !== 'Resuelto' && (
                  <button onClick={handleResolve} className="px-4 py-2 border border-teal text-teal rounded">
                    Marcar resuelto
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>
        <Card>
          <h3 className="font-medium mb-4">Detalles</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs text-gray-600">Cliente</p>
              <p className="font-medium">{ticket.accounts?.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Contacto</p>
              <p className="font-medium">{ticket.contacts?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">SLA</p>
              <p className="font-medium">{ticket.accounts?.sla_hours || 'N/A'}h</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
