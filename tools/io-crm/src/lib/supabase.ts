import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || 'https://zvehtloitnuglyjtxwye.supabase.co') as string
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzY4MjQsImV4cCI6MjA5MDY1MjgyNH0.GX6YTzPVsUpigT-DDC2FVA4D4o70qILUUt5pqjZ6pWI') as string

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key loaded:', !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
