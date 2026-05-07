import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: any
  session: any
  role: 'interno' | 'cliente' | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  init: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  role: null,
  loading: true,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error('Auth error:', error.message)
      throw error
    }
    console.log('Login exitoso:', data.user?.email)

    const { data: portalUser } = await supabase
      .from('portal_users')
      .select('role')
      .eq('user_id', data.user?.id)
      .maybeSingle()

    set({
      user: data.user,
      session: data.session,
      role: (portalUser?.role as any) || 'interno',
    })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null, role: null })
  },

  init: async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session?.user) {
      const { data: portalUser } = await supabase
        .from('portal_users')
        .select('role')
        .eq('user_id', data.session.user.id)
        .maybeSingle()
      set({
        user: data.session.user,
        session: data.session,
        role: (portalUser?.role as any) || 'interno',
        loading: false,
      })
    } else {
      set({ loading: false })
    }
  },
}))
