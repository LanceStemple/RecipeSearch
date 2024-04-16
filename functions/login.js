const { createClient } = require("@supabase/supabase-js");

exports.handler = async () => {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
};
