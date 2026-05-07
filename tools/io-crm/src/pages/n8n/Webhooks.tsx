import { SectionHeader, Card, EmptyState } from '@/components/shared'
import { Webhook } from 'lucide-react'

export default function Webhooks() {
  return (
    <div>
      <SectionHeader title="Webhooks" />
      <Card>
        <EmptyState icon={Webhook} title="Sin webhooks registrados" />
      </Card>
    </div>
  )
}
