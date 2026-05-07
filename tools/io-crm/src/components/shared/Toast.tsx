import { useAppStore } from '@/store/appStore'

export function Toast() {
  const toasts = useAppStore((s) => s.toasts)
  const removeToast = useAppStore((s) => s.removeToast)

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="px-4 py-3 rounded-lg text-white text-sm font-medium shadow-lg flex items-center gap-3"
          style={{ backgroundColor: toast.color }}
        >
          {toast.message}
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
