import { SectionHeader, EmptyState } from '@/components/shared'
import { Briefcase } from 'lucide-react'

export default function Projects() {
  return (
    <div>
      <SectionHeader title="Proyectos" />
      <EmptyState icon={Briefcase} title="Sin proyectos" />
    </div>
  )
}
