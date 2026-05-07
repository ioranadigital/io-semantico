import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/useToast'
import { SectionHeader, SkeletonLoader, Card } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'

export default function PortalConfig() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('accounts').select('*')
      setClients((data as any[]) || [])
      setLoading(false)
    }
    load()
  }, [])

  const togglePortal = async (id: string, current: boolean) => {
    await supabase.from('accounts').update({ portal_active: !current } as any).eq('id', id)
    setClients(c => c.map(x => x.id === id ? { ...x, portal_active: !current } : x))
    showToast(current ? 'Portal desactivado' : 'Portal activado', '#639922')
  }

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Configuración del portal cliente" />
      <Card>
        <h3 className="font-medium mb-4">Acceso al portal</h3>
        <div className="space-y-3">
          {clients.map(c => (
            <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <Avatar name={c.name} size="sm" />
                <p className="font-medium text-sm">{c.name}</p>
              </div>
              <button
                onClick={() => togglePortal(c.id, c.portal_active)}
                className={`px-3 py-1 rounded text-sm font-medium ${c.portal_active ? 'bg-teal text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                {c.portal_active ? 'Activo' : 'Inactivo'}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
