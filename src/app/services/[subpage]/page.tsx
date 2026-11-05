import { notFound } from "next/navigation";
import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";
import { sectionKeyMapping } from "@/lib/page-mapping";

// Saving in the admin refreshes pages right away (revalidatePath in /api/content).
// This daily refresh is only a safety net.
export const revalidate = 86400;

export function generateStaticParams() {
  return Object.keys(sectionKeyMapping)
    .filter((slug) => slug.startsWith("services-"))
    .map((slug) => ({ subpage: slug.slice("services-".length) }));
}

export default async function ServiceSubPage({
  params,
}: {
  params: Promise<{ subpage: string }>;
}) {
  const { subpage } = await params;
  const pageSlug = `services-${subpage}`;
  if (!(pageSlug in sectionKeyMapping)) notFound();
  const sections = await getPageSections(pageSlug);
  return <SectionList pageSlug={pageSlug} initialSections={sections} />;
}
