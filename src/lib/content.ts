import { getDb } from "@/lib/db";
import { defaultContent } from "@/lib/default-content";
import { inferSectionType, sectionKeyMapping } from "@/lib/page-mapping";

export interface SectionInstance {
  id: string; // section_key in DB
  type: string; // section_type in DB
  content: Record<string, unknown>;
  order: number;
}

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

/** Returns the ordered list of section instances on a page.
 *  Falls back to the static page-mapping when section_type is missing,
 *  so pages render even before the migrate-page-builder script has run. */
export async function getPageSections(
  pageSlug: string
): Promise<SectionInstance[]> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT section_key, section_type, display_order, content
      FROM content
      WHERE page_slug = ${pageSlug}
      ORDER BY display_order, section_key
    `;

    const result = rows
      .map((r) => {
        const key = r.section_key as string;
        const dbType = (r.section_type as string) || "";
        const inferred = inferSectionType(pageSlug, key);
        const type = dbType || inferred?.type || "";
        if (!type) return null;
        return {
          id: key,
          type,
          content: (r.content as Record<string, unknown>) ?? {},
          order: (r.display_order as number) ?? inferred?.order ?? 0,
        } as SectionInstance;
      })
      .filter((x): x is SectionInstance => x !== null)
      .sort((a, b) => a.order - b.order);

    if (result.length > 0) return result;

    // Nothing in DB — fall back to default-content if available.
    return buildDefaultSections(pageSlug);
  } catch {
    return buildDefaultSections(pageSlug);
  }
}

function buildDefaultSections(pageSlug: string): SectionInstance[] {
  const mapping = sectionKeyMapping[pageSlug];
  if (!mapping) return [];
  const pageDefaults = defaultContent[pageSlug] ?? {};
  return mapping.map((m, i) => ({
    id: m.key,
    type: m.type,
    content: (pageDefaults[m.key] as Record<string, unknown>) ?? {},
    order: i,
  }));
}

export async function getGlobalSections(): Promise<SectionInstance[]> {
  return getPageSections("global");
}

function getDefault<T>(pageSlug: string, sectionKey: string): T {
  return (defaultContent[pageSlug]?.[sectionKey] || {}) as T;
}
