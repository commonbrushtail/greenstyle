import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function TrainingPage() {
  const sections = await getPageSections("services-training");
  return <SectionList pageSlug="services-training" initialSections={sections} />;
}
