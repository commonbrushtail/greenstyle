import { notFound } from "next/navigation";
import SectionList from "@/components/sections-builder/SectionList";
import { getPageSections } from "@/lib/content";
import { sectionKeyMapping } from "@/lib/page-mapping";

export const dynamic = "force-dynamic";

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
