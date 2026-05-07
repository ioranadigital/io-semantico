import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, EmptyState } from '@/components/shared'
import { Avatar } from '@/components/shared/Avatar'
import { Badge } from '@/components/shared/Badge'
import { Users } from 'lucide-react'

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('contacts').select('*, accounts(name)').order('name')
      setContacts(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={6} />

  return (
    <div>
      <SectionHeader title="Contactos" />
      {contacts.length === 0 ? (
        <EmptyState icon={Users} title="Sin contactos" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map(c => (
            <div key={c.id} className="bg-white rounded-lg border border-gray-300 p-4 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <Avatar name={c.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-600 truncate">{c.accounts?.name || 'Sin cuenta'}</p>
                  <p className="text-xs text-gray-500 truncate">{c.email}</p>
                  {c.position && <p className="text-xs text-gray-600">{c.position}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
