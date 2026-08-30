import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rkangobqefhoiaslxrqc.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYW5nb2JxZWZob2lhc2x4cnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODExODc4MSwiZXhwIjoyMTAzNjk0NzgxfQ.jD1hvO690ngE9dzzRlNkBxhW2F__LyALpccJBhePYrA';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
