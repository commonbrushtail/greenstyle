import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const sections = await getPageSections("about");
  return <SectionList pageSlug="about" initialSections={sections} />;
}
