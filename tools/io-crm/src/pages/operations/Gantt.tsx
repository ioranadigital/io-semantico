import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader } from '@/components/shared'

export default function Gantt() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('projects').select('*, tasks(*), accounts(name)').order('created_at')
      setProjects(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  return (
    <div>
      <SectionHeader title="Diagrama Gantt" />
      <div className="bg-white rounded-lg border border-gray-300 p-6">
        <p className="text-gray-600">Diagrama Gantt — 3 niveles jerárquicos</p>
        <p className="text-sm text-gray-500 mt-2">{projects.length} proyectos disponibles</p>
      </div>
    </div>
  )
}
