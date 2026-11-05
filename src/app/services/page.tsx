import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

// Saving in the admin refreshes pages right away (revalidatePath in /api/content).
// This daily refresh is only a safety net.
export const revalidate = 86400;

export default async function ServicesPage() {
  const sections = await getPageSections("services");
  return <SectionList pageSlug="services" initialSections={sections} />;
}
