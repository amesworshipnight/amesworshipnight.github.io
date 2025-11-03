import { createClient } from '@supabase/supabase-js'
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
export const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// We still create a client to avoid import-time crashes; downstream UI will gate on envGuard.
export const supabase = createClient(SUPABASE_URL || 'https://example.supabase.co', SUPABASE_ANON || 'public-anon-key')
