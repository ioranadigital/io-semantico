let supabaseInstance: any = null;

export function getSupabase() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseInstance) {
    const { createClient } = require('@supabase/supabase-js');
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('Supabase credentials missing');
      return null;
    }

    supabaseInstance = createClient(url, key);
  }

  return supabaseInstance;
}

export const supabase = typeof window !== 'undefined' ? getSupabase() : null;
