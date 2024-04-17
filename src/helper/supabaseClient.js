import { createClient } from "@supabase/supabase-js";

export async function getSupabaseConfig() {
  const response = await fetch("/.netlify/functions/login");
  const { supabaseUrl, supabaseKey } = await response.json();
  return { supabaseUrl, supabaseKey };
}

export async function initializeSupabase() {
  const { supabaseUrl, supabaseKey } = await getSupabaseConfig();
  return createClient(supabaseUrl, supabaseKey);
}

// Export supabase client as a constant
export const supabase = await initializeSupabase();
