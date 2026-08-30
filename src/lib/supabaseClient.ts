import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rkangobqefhoiaslxrqc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYW5nb2JxZWZob2lhc2x4cnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMTg3ODEsImV4cCI6MjEwMzY5NDc4MX0.wSxnhxJvCyeXTWP32qQCOSkDv9VWHgc6l0dfwcuTRiI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
