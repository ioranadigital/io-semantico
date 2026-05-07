import { useAppStore } from '@/store/appStore'

export function useToast() {
  return {
    showToast: useAppStore((s) => s.showToast),
    removeToast: useAppStore((s) => s.removeToast),
  }
}
