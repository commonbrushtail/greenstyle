import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const sections = await getPageSections("services");
  return <SectionList pageSlug="services" initialSections={sections} />;
}
