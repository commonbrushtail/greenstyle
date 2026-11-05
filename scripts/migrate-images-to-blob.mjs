// Moves base64 images out of the `content` table into Vercel Blob.
//
//   Preview (writes nothing):  node --env-file=.env.local scripts/migrate-images-to-blob.mjs
//   Run it for real:           node --env-file=.env.local scripts/migrate-images-to-blob.mjs --apply
//
// Needs DATABASE_URL, and BLOB_READ_WRITE_TOKEN for --apply. Safe to re-run:
// converted rows no longer match, and blob names come from the image's hash.
// --apply first saves the affected rows to backups/ (gitignored), and a row is
// only updated if it hasn't changed since it was read.

import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { rewriteDataImages } from "./lib/rewrite-data-images.mjs";

const apply = process.argv.includes("--apply");

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
if (apply && !process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error("BLOB_READ_WRITE_TOKEN is not set");
}

const previewUpload = async ({ bytes, ext }) => `https://preview.invalid/${bytes.length}.${ext}`;

const blobUpload = async ({ bytes, ext, contentType }) => {
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 32);
  const { url } = await put(`cms/${hash}.${ext}`, bytes, {
    access: "public",
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });
  const check = await fetch(url, { method: "HEAD" });
  const size = Number(check.headers.get("content-length"));
  if (!check.ok || size !== bytes.length) {
    throw new Error(`Uploaded blob failed its check: ${url} (status ${check.status}, ${size} bytes)`);
  }
  return url;
};

const sql = neon(process.env.DATABASE_URL);
const rows = await sql`
  SELECT id, page_slug, section_key, content, content::text AS original
  FROM content
  WHERE content::text LIKE '%data:image/%'
  ORDER BY page_slug, section_key
`;

console.log(`${rows.length} row(s) contain base64 images. Mode: ${apply ? "APPLY" : "preview, nothing is written"}`);

if (apply && rows.length > 0) {
  mkdirSync("backups", { recursive: true });
  const file = join("backups", `content-before-blob-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(
    file,
    JSON.stringify(rows.map(({ id, page_slug, section_key, content }) => ({ id, page_slug, section_key, content })))
  );
  console.log(`Backup written to ${file}`);
}

let images = 0;
let updated = 0;
let bytesBefore = 0;
let bytesAfter = 0;
const allSkipped = [];
const conflicts = [];

for (const row of rows) {
  const label = `${row.page_slug}/${row.section_key}`;
  const { value, replaced, skipped } = await rewriteDataImages(row.content, apply ? blobUpload : previewUpload);
  const next = JSON.stringify(value);
  images += replaced;
  bytesBefore += row.original.length;
  bytesAfter += next.length;
  allSkipped.push(...skipped.map((path) => `${label}: ${path}`));
  console.log(`  ${label}: ${replaced} image(s), ${row.original.length} -> ${next.length} chars`);

  if (apply && replaced > 0) {
    const result = await sql`
      UPDATE content SET content = ${next}::jsonb
      WHERE id = ${row.id} AND content = ${row.original}::jsonb
      RETURNING id
    `;
    if (result.length === 1) updated += 1;
    else conflicts.push(label);
  }
}

console.log(`\nImages: ${images}. Content size: ${bytesBefore} -> ${bytesAfter} chars.`);
if (apply) console.log(`Rows updated: ${updated}.`);
if (allSkipped.length > 0) console.log(`NOT converted, needs a look:\n  ${allSkipped.join("\n  ")}`);
if (conflicts.length > 0) {
  console.log(`Changed during the run, so left alone (re-run to convert):\n  ${conflicts.join("\n  ")}`);
  process.exitCode = 1;
}
