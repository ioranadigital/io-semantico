import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, Card, Badge } from '@/components/shared'

export default function SopTemplates() {
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('sop_templates').select('*').order('name')
      setTemplates(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Plantillas SOP" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => (
          <Card key={t.id}>
            <Badge label={t.modules?.length || 0} bg="#7F77DD" color="#fff" />
            <p className="font-medium text-sm mt-2">{t.name}</p>
            <p className="text-xs text-gray-600 mt-1">{t.description}</p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-2 py-1 text-xs bg-purple text-white rounded hover:opacity-90">
                Aplicar
              </button>
              <button className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                Clonar
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
