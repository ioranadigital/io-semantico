import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, Card, EmptyState } from '@/components/shared'
import { FileText } from 'lucide-react'

export default function Docs() {
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('documents').select('*, projects(name)').order('created_at', { ascending: false })
      setDocs(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Documentos" />
      {docs.length === 0 ? (
        <EmptyState icon={FileText} title="Sin documentos" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map(d => (
            <Card key={d.id}>
              <FileText className="w-8 h-8 text-gray-400 mb-2" />
              <p className="font-medium text-sm">{d.title}</p>
              <p className="text-xs text-gray-600">{d.projects?.name}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
