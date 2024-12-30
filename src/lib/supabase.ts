import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssomvfhmvkdutubfnncy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzb212ZmhtdmtkdXR1YmZubmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTA1NzksImV4cCI6MjA1MTEyNjU3OX0.xkzqVo6hyTstGiJMdkCAuaH6sRU6Ut_LE_4YVslLh9Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)