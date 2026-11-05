import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

// Saving in the admin refreshes pages right away (revalidatePath in /api/content).
// This daily refresh is only a safety net.
export const revalidate = 86400;

export default async function Home() {
  const sections = await getPageSections("home");
  return <SectionList pageSlug="home" initialSections={sections} />;
}
