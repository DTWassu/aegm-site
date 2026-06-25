import { createClient } from "@supabase/supabase-js";

// Retrieve values from environment variables with hardcoded fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://gquiuzgacsiohndyrege.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_h2UUx9KticaqK46da8nQdQ_3avq7bjh";

// Create and export the Supabase client using the 'shared' schema
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: "shared",
  },
});
