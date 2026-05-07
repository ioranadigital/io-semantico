import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SectionHeader, SkeletonLoader, DataTable } from '@/components/shared'

export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('portal_users').select('*, accounts(name)')
      setUsers(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <SkeletonLoader count={5} />

  const columns = [
    { header: 'Email', accessor: 'email' },
    { header: 'Rol', accessor: 'role' },
    { header: 'Cliente', accessor: 'accounts.name' },
  ]

  return (
    <div>
      <SectionHeader title="Usuarios" />
      <DataTable columns={columns} data={users} />
    </div>
  )
}
