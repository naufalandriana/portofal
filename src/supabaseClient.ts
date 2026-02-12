import { createClient } from '@supabase/supabase-js'

// Ambil dari .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Validasi dikit biar ga bingung kalau lupa set env
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key. Cek file .env lo bro!')
}

export const supabase = createClient(supabaseUrl, supabaseKey)