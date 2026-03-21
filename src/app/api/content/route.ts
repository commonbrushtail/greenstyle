import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  try {
    const sql = getDb();
    const rows = page
      ? await sql`SELECT * FROM content WHERE page_slug = ${page} ORDER BY section_key`
      : await sql`SELECT * FROM content ORDER BY page_slug, section_key`;

    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const { page_slug, section_key, content } = await request.json();

    const rows = await sql`
      INSERT INTO content (page_slug, section_key, content)
      VALUES (${page_slug}, ${section_key}, ${JSON.stringify(content)})
      ON CONFLICT (page_slug, section_key)
      DO UPDATE SET content = ${JSON.stringify(content)}
      RETURNING *
    `;

    return NextResponse.json(rows[0]);
  } catch (e) {
    return NextResponse.json({ error: "Server error", details: String(e) }, { status: 500 });
  }
}
