import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const isBrowser = typeof window !== "undefined";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const supabase =
  isBrowser && isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;
