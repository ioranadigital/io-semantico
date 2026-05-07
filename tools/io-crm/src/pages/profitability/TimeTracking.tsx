import { SectionHeader, EmptyState } from '@/components/shared'
import { Clock } from 'lucide-react'

export default function TimeTracking() {
  return (
    <div>
      <SectionHeader title="Time Tracking" />
      <EmptyState icon={Clock} title="Sin registros de tiempo" />
    </div>
  )
}
