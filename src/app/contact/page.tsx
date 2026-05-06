import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const sections = await getPageSections("contact");
  return <SectionList pageSlug="contact" initialSections={sections} />;
}
