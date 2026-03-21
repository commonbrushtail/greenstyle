import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon('postgresql://neondb_owner:npg_QT2pUJRsDOH9@ep-bitter-darkness-a1ansdjq.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const email = process.argv[2] || 'admin@greenstyle.co.th';
const password = process.argv[3] || 'admin123';

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
