import { getDb } from "@/lib/db";

let ensured = false;

/** Adds the page-builder columns to the content table if they're absent.
 *  Idempotent. Runs once per cold-started serverless instance. */
export async function ensureSchema() {
  if (ensured) return;
  try {
    const sql = getDb();
    await sql`ALTER TABLE content ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0`;
    await sql`ALTER TABLE content ADD COLUMN IF NOT EXISTS section_type TEXT NOT NULL DEFAULT ''`;
    ensured = true;
  } catch (e) {
    // Don't cache failure — try again on next call.
    console.error("ensureSchema failed:", e);
  }
}
