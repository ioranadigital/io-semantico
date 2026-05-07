import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, DataTable } from '@/components/shared'

export default function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('expenses').select('*, projects(name)').order('created_at', { ascending: false })
      setExpenses(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  const columns = [
    { header: 'Descripción', accessor: 'description' },
    { header: 'Proyecto', accessor: 'projects.name' },
    { header: 'Categoría', accessor: 'category' },
    { header: 'Monto', accessor: 'amount', render: (v: number) => `€${v}` },
    { header: 'Fecha', accessor: 'created_at', render: (v: string) => new Date(v).toLocaleDateString() },
  ]

  return (
    <div>
      <SectionHeader title="Gastos" />
      <DataTable columns={columns} data={expenses} />
    </div>
  )
}
