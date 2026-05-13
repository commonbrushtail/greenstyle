import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getDb();
    const { page_slug, order } = (await request.json()) as {
      page_slug: string;
      order: { section_key: string; display_order: number }[];
    };

    if (!page_slug || !Array.isArray(order)) {
      return NextResponse.json(
        { error: "page_slug and order[] are required" },
        { status: 400 }
      );
    }

    // Ensure the display_order column exists before issuing updates;
    // gives a clearer error than a per-row failure if the migration
    // hasn't been applied.
    try {
      await sql`SELECT display_order FROM content LIMIT 1`;
    } catch {
      return NextResponse.json(
        {
          error:
            "display_order column is missing. Run scripts/migrate-page-builder.mjs first.",
        },
        { status: 500 }
      );
    }

    for (const item of order) {
      await sql`
        UPDATE content
        SET display_order = ${item.display_order}
        WHERE page_slug = ${page_slug} AND section_key = ${item.section_key}
      `;
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error", details: String(e) },
      { status: 500 }
    );
  }
}
