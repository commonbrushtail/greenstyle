import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureSchema } from "@/lib/ensure-schema";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();

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
