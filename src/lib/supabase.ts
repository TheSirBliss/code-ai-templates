
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // This error will be shown in the console if Supabase is not connected.
  console.error("Supabase URL or Anon Key is missing. Make sure to connect your Supabase project in Lovable.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
