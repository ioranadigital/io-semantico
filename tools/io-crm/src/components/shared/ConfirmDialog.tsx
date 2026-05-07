import { Modal } from './Modal'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-50"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-purple text-white hover:opacity-90"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
