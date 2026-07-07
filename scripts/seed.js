/**
 * Simple seed runner. Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
 * Usage: npm run seed
 */
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

async function main() {
  console.log("Seeding is done via SQL. Please run supabase/seed-data.sql in the Supabase SQL Editor:");
  console.log("  1. Open your Supabase project > SQL Editor");
  console.log("  2. Paste the contents of supabase/schema.sql and run it");
  console.log("  3. Paste the contents of supabase/seed-data.sql and run it");
  console.log(path.resolve(__dirname, "../supabase/seed-data.sql"));
}

main();
