import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://neondb_owner:npg_QT2pUJRsDOH9@ep-bitter-darkness-a1ansdjq.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
);

// (page_slug, section_key) -> { type, order }
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
  "services-4": placeholderServiceSections(),
  "services-5": placeholderServiceSections(),
  "services-6": placeholderServiceSections(),
  "services-7": placeholderServiceSections(),
  "services-8": placeholderServiceSections(),
  news: [
    { key: "hero", type: "hero-page" },
    { key: "intro", type: "text-block" },
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
    { key: "page_labels", type: "page-labels" },
    { key: "site_status", type: "site-status" },
  ],
};

function placeholderServiceSections() {
  return [
    { key: "hero", type: "hero-page" },
    { key: "about", type: "text-block" },
    { key: "features", type: "feature-grid" },
    { key: "cta", type: "cta" },
  ];
}

const headerDefault = {
  logoSrc: "/images/logo.png",
  logoAlt: "Green Style",
  navigation: [
    { name: "หน้าหลัก", href: "/" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    {
      name: "บริการของเรา",
      href: "/services",
      dropdown: [
        { name: "หลักสูตรอบรม", href: "/services/training" },
        { name: "คาร์บอนฟุตพริ้นท์องค์กร (CFO)", href: "/services/cfo" },
        { name: "คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)", href: "/services/cfp" },
        { name: "บริการที่ 4", href: "/services/4" },
        { name: "บริการที่ 5", href: "/services/5" },
        { name: "บริการที่ 6", href: "/services/6" },
        { name: "บริการที่ 7", href: "/services/7" },
        { name: "บริการที่ 8", href: "/services/8" },
      ],
    },
    { name: "ข่าวสาร", href: "/news" },
    { name: "ติดต่อเรา", href: "/contact" },
  ],
};

const pageLabelsDefault = {
  pages: [
    { slug: "home", label: "หน้าหลัก" },
    { slug: "about", label: "เกี่ยวกับเรา" },
    { slug: "services", label: "บริการของเรา" },
    { slug: "services-cfo", label: "บริการ - CFO" },
    { slug: "services-cfp", label: "บริการ - CFP" },
    { slug: "services-training", label: "บริการ - อบรม" },
    { slug: "services-4", label: "บริการที่ 4" },
    { slug: "services-5", label: "บริการที่ 5" },
    { slug: "services-6", label: "บริการที่ 6" },
    { slug: "services-7", label: "บริการที่ 7" },
    { slug: "services-8", label: "บริการที่ 8" },
    { slug: "news", label: "ข่าวสาร" },
    { slug: "contact", label: "ติดต่อเรา" },
    { slug: "global", label: "ส่วนกลาง" },
  ],
};

function defaultContentFor(pageSlug, sectionKey) {
  // Reasonable defaults for the new pages so seed rows aren't blank.
  if (pageSlug === "news") {
    if (sectionKey === "hero") {
      return {
        heading: "ข่าวสารและบทความ",
        description:
          "ติดตามข่าวสาร อัปเดต และบทความเกี่ยวกับสิ่งแวดล้อมและความยั่งยืน",
      };
    }
    if (sectionKey === "intro") {
      return {
        heading: "ข่าวสารล่าสุด",
        paragraphs: ["ยังไม่มีบทความในขณะนี้ กลับมาเยี่ยมชมเร็วๆ นี้"],
      };
    }
    if (sectionKey === "cta") {
      return {
        heading: "ติดตามเราได้ในช่องทางอื่น",
        description: "ติดตามข่าวสารและกิจกรรมของเราได้ที่ Facebook",
        primaryCta: { text: "ติดต่อเรา", href: "/contact" },
      };
    }
  }
  if (/^services-[4-8]$/.test(pageSlug)) {
    const n = pageSlug.split("-")[1];
    if (sectionKey === "hero") {
      return {
        heading: `บริการที่ ${n}`,
        description: "คำอธิบายบริการนี้ — ปรับเปลี่ยนได้ในระบบจัดการ",
      };
    }
    if (sectionKey === "about") {
      return {
        heading: "เกี่ยวกับบริการนี้",
        paragraphs: ["ย่อหน้าแนะนำบริการ — ปรับเปลี่ยนได้ในระบบจัดการ"],
      };
    }
    if (sectionKey === "features") {
      return {
        heading: "จุดเด่นของบริการ",
        description: "คำอธิบายภาพรวมของจุดเด่น",
        items: [
          { iconName: "Award", title: "จุดเด่นที่ 1", description: "รายละเอียด" },
          { iconName: "Target", title: "จุดเด่นที่ 2", description: "รายละเอียด" },
          { iconName: "Lightbulb", title: "จุดเด่นที่ 3", description: "รายละเอียด" },
        ],
      };
    }
    if (sectionKey === "cta") {
      return {
        heading: "สนใจบริการนี้?",
        description: "ติดต่อทีมงานเพื่อปรึกษาฟรี",
        primaryCta: { text: "ติดต่อเรา", href: "/contact" },
        secondaryCta: { text: "ดูบริการอื่น", href: "/services" },
      };
    }
  }
  return {};
}

async function migrate() {
  console.log("Adding columns to content table…");
  await sql`ALTER TABLE content ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE content ADD COLUMN IF NOT EXISTS section_type TEXT NOT NULL DEFAULT ''`;

  console.log("Removing case-studies content…");
  await sql`DELETE FROM content WHERE page_slug = 'case-studies'`;

  console.log("Setting type + order for known sections + inserting missing rows…");
  for (const [pageSlug, sections] of Object.entries(mapping)) {
    for (let i = 0; i < sections.length; i++) {
      const { key, type } = sections[i];
      const exists = await sql`
        SELECT 1 FROM content WHERE page_slug = ${pageSlug} AND section_key = ${key} LIMIT 1
      `;
      if (exists.length > 0) {
        await sql`
          UPDATE content
          SET section_type = ${type}, display_order = ${i}
          WHERE page_slug = ${pageSlug} AND section_key = ${key}
        `;
      } else {
        await sql`
          INSERT INTO content (page_slug, section_key, section_type, display_order, content)
          VALUES (${pageSlug}, ${key}, ${type}, ${i}, ${JSON.stringify(defaultContentFor(pageSlug, key))})
          ON CONFLICT (page_slug, section_key) DO NOTHING
        `;
      }
    }
  }

  console.log("Updating header default to drop ผลงาน + add ข่าวสาร + expand dropdown…");
  await sql`
    UPDATE content
    SET content = ${JSON.stringify(headerDefault)}
    WHERE page_slug = 'global' AND section_key = 'header'
  `;
  // Insert if header row didn't exist yet.
  await sql`
    INSERT INTO content (page_slug, section_key, section_type, display_order, content)
    SELECT 'global', 'header', 'header', 1, ${JSON.stringify(headerDefault)}
    WHERE NOT EXISTS (
      SELECT 1 FROM content WHERE page_slug = 'global' AND section_key = 'header'
    )
  `;

  console.log("Seeding page_labels row…");
  await sql`
    INSERT INTO content (page_slug, section_key, section_type, display_order, content)
    SELECT 'global', 'page_labels', 'page-labels', 2, ${JSON.stringify(pageLabelsDefault)}
    WHERE NOT EXISTS (
      SELECT 1 FROM content WHERE page_slug = 'global' AND section_key = 'page_labels'
    )
  `;

  console.log("Done.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
