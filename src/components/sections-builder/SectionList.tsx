"use client";

import { Suspense } from "react";
import { PreviewProvider, useSections } from "@/components/admin/PreviewProvider";
import { sectionRegistry } from "./registry";
import type { SectionInstance } from "@/lib/content";

function Renderer() {
  const sections = useSections();
  return (
    <>
      {sections.map((s) => {
        const def = sectionRegistry[s.type];
        if (!def) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`Unknown section type: ${s.type}`);
          }
          return null;
        }
        const Component = def.Component as React.ComponentType<{ content: unknown }>;
        return <Component key={s.id} content={s.content} />;
      })}
    </>
  );
}

export default function SectionList({
  pageSlug,
  initialSections,
}: {
  pageSlug: string;
  initialSections: SectionInstance[];
}) {
  return (
    <Suspense fallback={null}>
      <PreviewProvider pageSlug={pageSlug} initialSections={initialSections}>
        <Renderer />
      </PreviewProvider>
    </Suspense>
  );
}
