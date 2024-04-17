exports.handler = async (event, context) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({ supabaseUrl, supabaseKey }),
  };
};
