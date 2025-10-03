
const axios = require('axios');
require('dotenv').config(); 

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.");
}

// Supabase URL is the base URL for ALL requests
// The Anon Key is used for the `apikey` header (and optionally the Authorization header)
const supabaseAPI = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`, // /rest/v1 is the standard PostgREST endpoint
    headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        // For security, you should also include the Bearer token if using RLS
        // 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 
    },
});

module.exports = supabaseAPI;
