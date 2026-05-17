import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const sections = await getPageSections("news");
  return <SectionList pageSlug="news" initialSections={sections} />;
}
