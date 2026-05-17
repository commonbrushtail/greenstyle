import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureSchema } from "@/lib/ensure-schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  const sql = getDb();
  // Try the new columns first; fall back to the old shape if the
  // migrate-page-builder script hasn't run yet.
  try {
    const rows = page
      ? await sql`
          SELECT id, page_slug, section_key, section_type, display_order, content, updated_at
          FROM content
          WHERE page_slug = ${page}
          ORDER BY display_order, section_key
        `
      : await sql`
          SELECT id, page_slug, section_key, section_type, display_order, content, updated_at
          FROM content
          ORDER BY page_slug, display_order, section_key
        `;
    return NextResponse.json(rows);
  } catch {
    try {
      const rows = page
        ? await sql`
            SELECT id, page_slug, section_key, content, updated_at
            FROM content
            WHERE page_slug = ${page}
            ORDER BY section_key
          `
        : await sql`
            SELECT id, page_slug, section_key, content, updated_at
            FROM content
            ORDER BY page_slug, section_key
          `;
      // Pad missing columns so consumers can still rely on the shape.
      const padded = rows.map((r) => ({
        ...r,
        section_type: null,
        display_order: null,
      }));
      return NextResponse.json(padded);
    } catch (e) {
      return NextResponse.json(
        { error: "Server error", details: String(e) },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();

  let body: {
    page_slug: string;
    section_key: string;
    content: Record<string, unknown>;
    section_type?: string;
    display_order?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { page_slug, section_key, content, section_type, display_order } = body;
  if (!page_slug || !section_key) {
    return NextResponse.json(
      { error: "page_slug and section_key are required" },
      { status: 400 }
    );
  }

  const sql = getDb();
  const json = JSON.stringify(content ?? {});

  // Try the new schema (with section_type + display_order). On error
  // (most likely the columns don't exist yet), fall back to the legacy
  // INSERT that only knows about content.
  try {
    const rows = await sql`
      INSERT INTO content (page_slug, section_key, section_type, display_order, content)
      VALUES (
        ${page_slug},
        ${section_key},
        ${section_type ?? ""},
        ${display_order ?? 0},
        ${json}
      )
      ON CONFLICT (page_slug, section_key)
      DO UPDATE SET
        content = EXCLUDED.content,
        section_type = CASE
          WHEN EXCLUDED.section_type = '' THEN content.section_type
          ELSE EXCLUDED.section_type
        END,
        display_order = EXCLUDED.display_order
      RETURNING *
    `;
    revalidatePath("/", "layout");
    return NextResponse.json(rows[0]);
  } catch (newSchemaErr) {
    try {
      const rows = await sql`
        INSERT INTO content (page_slug, section_key, content)
        VALUES (${page_slug}, ${section_key}, ${json})
        ON CONFLICT (page_slug, section_key)
        DO UPDATE SET content = EXCLUDED.content
        RETURNING *
      `;
      revalidatePath("/", "layout");
      return NextResponse.json(rows[0]);
    } catch (legacyErr) {
      return NextResponse.json(
        {
          error: "Server error",
          details: String(legacyErr),
          newSchemaDetails: String(newSchemaErr),
        },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const page_slug = searchParams.get("page_slug");
    const section_key = searchParams.get("section_key");

    if (!page_slug || !section_key) {
      return NextResponse.json(
        { error: "page_slug and section_key are required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM content WHERE page_slug = ${page_slug} AND section_key = ${section_key}
    `;
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error", details: String(e) },
      { status: 500 }
    );
  }
}
