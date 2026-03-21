import { getDb } from "@/lib/db";
import { defaultContent } from "@/lib/default-content";

export async function getContent<T = Record<string, unknown>>(
  pageSlug: string,
  sectionKey: string
): Promise<T> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT content FROM content
      WHERE page_slug = ${pageSlug} AND section_key = ${sectionKey}
      LIMIT 1
    `;
    if (rows.length > 0) return rows[0].content as T;
    return getDefault<T>(pageSlug, sectionKey);
  } catch {
    return getDefault<T>(pageSlug, sectionKey);
  }
}

export async function getPageContent(
  pageSlug: string
): Promise<Record<string, unknown>> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT section_key, content FROM content
      WHERE page_slug = ${pageSlug}
    `;
    if (rows.length === 0) return defaultContent[pageSlug] || {};
    const result: Record<string, unknown> = {};
    for (const row of rows) {
      result[row.section_key as string] = row.content;
    }
    return result;
  } catch {
    return defaultContent[pageSlug] || {};
  }
}

function getDefault<T>(pageSlug: string, sectionKey: string): T {
  return (defaultContent[pageSlug]?.[sectionKey] || {}) as T;
}
