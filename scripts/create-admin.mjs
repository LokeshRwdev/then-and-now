import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const args = process.argv.slice(2);
const email = args[0]?.trim();
const password = args[1]?.trim();

if (!email || !password) {
  console.log(`
Usage:
  node scripts/create-admin.mjs <email> <password>

Example:
  node scripts/create-admin.mjs aman@boat.com MyPassword123!
`);
  process.exit(1);
}

async function main() {
  console.log(`Connecting to Supabase at: ${supabaseUrl}`);
  console.log(`Checking user: ${email}...`);

  // Check if user already exists
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Failed to query users:', listError.message);
    process.exit(1);
  }

  const existing = listData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (existing) {
    console.log(`User ${email} already exists (ID: ${existing.id}). Updating password and confirming email...`);
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });

    if (updateError) {
      console.error('Failed to update user:', updateError.message);
      process.exit(1);
    }

    console.log(`Success! Password updated for ${email}. You can now log in at /login.`);
  } else {
    console.log(`Creating new confirmed admin user: ${email}...`);
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      console.error('Failed to create user:', createError.message);
      process.exit(1);
    }

    console.log(`Success! User ${email} created successfully (ID: ${createData.user.id}).`);
    console.log(`You can now log in at /login with:`);
    console.log(`  Email: ${email}`);
    console.log(`  Password: (as provided)`);
  }
}

main();

