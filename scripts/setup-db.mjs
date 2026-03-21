import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_QT2pUJRsDOH9@ep-bitter-darkness-a1ansdjq.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function setup() {
  console.log('Creating content table...');
  await sql`
    CREATE TABLE IF NOT EXISTS content (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      page_slug TEXT NOT NULL,
      section_key TEXT NOT NULL,
      content JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(page_slug, section_key)
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_content_page_slug ON content(page_slug)`;

  await sql`
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `;

  await sql`DROP TRIGGER IF EXISTS content_updated_at ON content`;
  await sql`
    CREATE TRIGGER content_updated_at
      BEFORE UPDATE ON content
      FOR EACH ROW EXECUTE FUNCTION update_updated_at()
  `;

  console.log('Creating admin_users table...');
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  console.log('Database setup complete!');
}

setup().catch(console.error);
