import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function healthCheck() {
  try {
    const { data, error } = await supabase.from("clientes").select("count");
    return !error;
  } catch (err) {
    console.error("Health check failed:", err);
    return false;
  }
}
