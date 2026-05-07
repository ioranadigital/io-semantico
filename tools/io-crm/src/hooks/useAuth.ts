import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const auth = useAuthStore()

  useEffect(() => {
    auth.init()
  }, [])

  return {
    user: auth.user,
    session: auth.session,
    role: auth.role,
    loading: auth.loading,
    signIn: auth.signIn,
    signOut: auth.signOut,
  }
}
