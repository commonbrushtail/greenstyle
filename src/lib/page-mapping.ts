/**
 * Maps existing (page_slug, section_key) → section_type + display_order.
 * Used as a fallback when the DB rows don't yet have section_type populated
 * (i.e. before the migrate-page-builder script has been run).
 *
 * The same mapping lives in scripts/migrate-page-builder.mjs — keep them in sync.
 */
export const sectionKeyMapping: Record<string, { key: string; type: string }[]> = {
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
    { key: "header", type: "header" },
    { key: "footer", type: "footer" },
    { key: "site_status", type: "site-status" },
  ],
};

export function inferSectionType(
  pageSlug: string,
  sectionKey: string
): { type: string; order: number } | null {
  const list = sectionKeyMapping[pageSlug];
  if (!list) return null;
  const idx = list.findIndex((s) => s.key === sectionKey);
  if (idx === -1) return null;
  return { type: list[idx].type, order: idx };
}
