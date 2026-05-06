import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://neondb_owner:npg_QT2pUJRsDOH9@ep-bitter-darkness-a1ansdjq.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
);

// Maps existing (page_slug, section_key) to section type and display order.
const mapping = {
  home: [
    { key: "hero", type: "hero-home" },
    { key: "about", type: "flower-about" },
    { key: "featured_services", type: "training-showcase" },
    { key: "cta", type: "cta" },
  ],
  about: [
    { key: "hero", type: "hero-page-stats" },
    { key: "key_features", type: "feature-grid" },
    { key: "certifications", type: "tags-grid" },
  ],
  services: [
    { key: "hero", type: "hero-page" },
    { key: "main_services", type: "services-grid" },
    { key: "additional_services", type: "additional-services" },
    { key: "cta", type: "cta" },
  ],
  "services-cfo": [
    { key: "hero", type: "hero-page" },
    { key: "what_is", type: "text-block" },
    { key: "benefits", type: "feature-grid" },
    { key: "process", type: "process-steps" },
    { key: "reference", type: "reference-block" },
    { key: "cta", type: "cta" },
  ],
  "services-cfp": [
    { key: "hero", type: "hero-page" },
    { key: "what_is", type: "text-block" },
    { key: "lifecycle", type: "lifecycle-stages" },
    { key: "benefits", type: "feature-grid" },
    { key: "countries", type: "tags-grid" },
    { key: "reference", type: "reference-block" },
    { key: "cta", type: "cta" },
  ],
  "services-training": [
    { key: "hero", type: "hero-page" },
    { key: "about", type: "text-block" },
    { key: "features", type: "feature-grid" },
    { key: "topics", type: "topics-list" },
    { key: "formats", type: "format-cards" },
    { key: "cta", type: "cta" },
  ],
  "case-studies": [
    { key: "hero", type: "hero-page" },
    { key: "stats", type: "stats-grid" },
    { key: "studies", type: "case-studies" },
    { key: "industries", type: "industries-grid" },
    { key: "cta", type: "cta" },
  ],
  contact: [
    { key: "hero", type: "hero-page" },
    { key: "info", type: "contact-info" },
    { key: "cta", type: "cta-simple" },
  ],
  global: [
    { key: "footer", type: "footer" },
    { key: "header", type: "header" },
    { key: "site_status", type: "site-status" },
  ],
};

async function migrate() {
  console.log("Adding columns to content table…");
  await sql`ALTER TABLE content ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE content ADD COLUMN IF NOT EXISTS section_type TEXT NOT NULL DEFAULT ''`;

  console.log("Updating existing rows with type + order…");
  for (const [pageSlug, sections] of Object.entries(mapping)) {
    for (let i = 0; i < sections.length; i++) {
      const { key, type } = sections[i];
      await sql`
        UPDATE content
        SET section_type = ${type}, display_order = ${i}
        WHERE page_slug = ${pageSlug} AND section_key = ${key}
      `;
    }
  }

  console.log("Seeding global header (if missing)…");
  await sql`
    INSERT INTO content (page_slug, section_key, section_type, display_order, content)
    SELECT 'global', 'header', 'header', 1, ${JSON.stringify({
      logoSrc: "/images/logo.png",
      logoAlt: "Green Style",
      navigation: [
        { name: "หน้าหลัก", href: "/" },
        { name: "เกี่ยวกับเรา", href: "/about" },
        {
          name: "บริการ",
          href: "/services",
          dropdown: [
            { name: "หลักสูตรอบรม", href: "/services/training" },
            { name: "คาร์บอนฟุตพริ้นท์องค์กร (CFO)", href: "/services/cfo" },
            { name: "คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)", href: "/services/cfp" },
          ],
        },
        { name: "ผลงาน", href: "/case-studies" },
        { name: "ติดต่อเรา", href: "/contact" },
      ],
    })}
    WHERE NOT EXISTS (
      SELECT 1 FROM content WHERE page_slug = 'global' AND section_key = 'header'
    )
  `;

  console.log("Done.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
