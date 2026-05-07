import { create } from 'zustand'

interface Toast {
  id: string
  message: string
  color: string
}

interface AppState {
  toasts: Toast[]
  sidebarCollapsed: boolean
  showToast: (message: string, color?: string) => void
  removeToast: (id: string) => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>((set) => ({
  toasts: [],
  sidebarCollapsed: false,

  showToast: (message, color = '#7F77DD') => {
    const id = Date.now().toString()
    set((state) => ({
      toasts: [...state.toasts, { id, message, color }],
    }))
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }))
    }, 3000)
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },

  toggleSidebar: () => {
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    }))
  },
}))
