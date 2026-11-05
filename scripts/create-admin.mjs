import { sql } from './lib/db.mjs';
import bcrypt from 'bcryptjs';

// Creates an admin, or changes the password if the email already exists.
const [email, password] = process.argv.slice(2);

if (!email || !password || password.length < 12) {
  console.error(
    'Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password of 12+ characters>'
  );
  process.exit(1);
}

async function createAdmin() {
  const hash = await bcrypt.hash(password, 10);
  await sql`
    INSERT INTO admin_users (email, password_hash)
    VALUES (${email}, ${hash})
    ON CONFLICT (email) DO UPDATE SET password_hash = ${hash}
  `;
  console.log(`Admin user created: ${email}`);
}

createAdmin().catch(console.error);
