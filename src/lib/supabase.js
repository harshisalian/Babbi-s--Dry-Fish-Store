import { createClient } from '@supabase/supabase-js'

// These two values come from the .env file (see SUPABASE_SETUP.md).
// The anon key is meant to be public. NEVER put the secret / service_role key here.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when Supabase is not set up yet. The shop then shows the sample fish from data/products.js.
export const supabase = url && key ? createClient(url, key) : null
