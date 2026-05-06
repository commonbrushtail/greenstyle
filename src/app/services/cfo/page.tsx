import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CFOPage() {
  const sections = await getPageSections("services-cfo");
  return <SectionList pageSlug="services-cfo" initialSections={sections} />;
}
