import { SectionHeader, EmptyState } from '@/components/shared'
import { BarChart3 } from 'lucide-react'

export default function Analytics() {
  return (
    <div>
      <SectionHeader title="Analítica" />
      <EmptyState icon={BarChart3} title="Sin datos para mostrar" />
    </div>
  )
}
