import { createClient } from '@supabase/supabase-js';
// Only public browser credentials belong here. Never use a service-role key.
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = url && publishableKey ? createClient(url, publishableKey) : null;
// No database queries until the team's schema and RLS policies are supplied.
