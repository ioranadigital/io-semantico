import { SectionHeader, Card, EmptyState } from '@/components/shared'

export default function PortalPreview() {
  return (
    <div>
      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded">
        <p className="text-sm text-amber-900">⚠️ PREVIEW — Vista del cliente</p>
      </div>
      <SectionHeader title="Portal del cliente" />
      <Card>
        <EmptyState title="Vista previa del portal" description="Acceso a proyectos y tickets del cliente" />
      </Card>
    </div>
  )
}
