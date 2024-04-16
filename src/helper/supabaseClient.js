const { createClient } = require("@supabase/supabase-js");

// Initialize the Supabase client
console.warn(process.env.SUPABASE_URL);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
