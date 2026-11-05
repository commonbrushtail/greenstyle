import { getDb } from "@/lib/db";

export interface SiteStatus {
  live: boolean;
  heading: string;
  message: string;
}

export const defaultSiteStatus: SiteStatus = {
  live: true,
  heading: "เร็วๆ นี้",
  message:
    "เว็บไซต์ของเรากำลังจะเปิดใช้งาน\nกรุณากลับมาใหม่อีกครั้งเร็วๆ นี้",
};

/** Database errors are deliberately not caught. Pages are cached, so a fallback
 *  here would be served until the next refresh. When a refresh throws, Next.js
 *  keeps serving the last good page instead. */
export async function getSiteStatus(): Promise<SiteStatus> {
  const sql = getDb();
  const rows = await sql`
    SELECT content FROM content
    WHERE page_slug = 'global' AND section_key = 'site_status'
    LIMIT 1
  `;
  if (rows.length === 0) return defaultSiteStatus;
  return {
    ...defaultSiteStatus,
    ...((rows[0].content as Partial<SiteStatus>) ?? {}),
  };
}
