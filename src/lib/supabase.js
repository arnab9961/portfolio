import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const isBrowser = typeof window !== "undefined";

function isValidSupabaseUrl(value) {
  if (!value || value.includes("YOUR_PROJECT")) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = Boolean(
  isValidSupabaseUrl(supabaseUrl) && supabaseKey && !supabaseKey.includes("YOUR_PUBLIC_KEY"),
);
export const supabase =
  isBrowser && isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;
