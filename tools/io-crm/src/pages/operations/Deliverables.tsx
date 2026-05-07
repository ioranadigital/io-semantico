import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, DataTable } from '@/components/shared'

export default function Deliverables() {
  const [deliverables, setDeliverables] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('deliverables').select('*, projects(name), accounts(name)').order('created_at')
      setDeliverables(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  const columns = [
    { header: 'Entregable', accessor: 'title' },
    { header: 'Proyecto', accessor: 'projects.name' },
    { header: 'Cliente', accessor: 'accounts.name' },
    { header: 'Tipo', accessor: 'type' },
    { header: 'Estado', accessor: 'status' },
  ]

  return (
    <div>
      <SectionHeader title="Entregables" />
      <DataTable columns={columns} data={deliverables} />
    </div>
  )
}
