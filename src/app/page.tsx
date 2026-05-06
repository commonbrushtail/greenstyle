import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const sections = await getPageSections("home");
  return <SectionList pageSlug="home" initialSections={sections} />;
}
