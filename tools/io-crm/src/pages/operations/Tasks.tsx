import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, DataTable } from '@/components/shared'

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('tasks').select('*, projects(name)').order('created_at')
      setTasks(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  const columns = [
    { header: 'Tarea', accessor: 'title' },
    { header: 'Proyecto', accessor: 'projects.name' },
    { header: 'Prioridad', accessor: 'priority' },
    { header: 'Estado', accessor: 'status' },
    { header: 'Horas', accessor: 'hours_budget' },
  ]

  return (
    <div>
      <SectionHeader title="Tareas" />
      <DataTable columns={columns} data={tasks} />
    </div>
  )
}
