import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CFPPage() {
  const sections = await getPageSections("services-cfp");
  return <SectionList pageSlug="services-cfp" initialSections={sections} />;
}
