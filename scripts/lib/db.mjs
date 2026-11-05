import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run with: node --env-file=.env.local scripts/<script>.mjs"
  );
}

export const sql = neon(process.env.DATABASE_URL);
