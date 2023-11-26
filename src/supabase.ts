import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPA_BASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPA_BASE_API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)