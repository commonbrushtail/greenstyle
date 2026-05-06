import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const sections = await getPageSections("case-studies");
  return <SectionList pageSlug="case-studies" initialSections={sections} />;
}
