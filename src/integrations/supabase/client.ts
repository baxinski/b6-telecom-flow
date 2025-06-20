
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://jzbobelaiqimzdjlzxvp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Ym9iZWxhaXFpbXpkamx6eHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5Nzk1ODQsImV4cCI6MjA2NDU1NTU4NH0.1GzBCScMmOsto2x5n7-Laip9tuvgzyNTRVypUIHWS-c'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
