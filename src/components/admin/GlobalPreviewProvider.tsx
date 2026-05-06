"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import type { SectionInstance } from "@/lib/content";

type Ctx = {
  isPreview: boolean;
  sections: SectionInstance[];
};

const GlobalPreviewContext = createContext<Ctx | null>(null);

type Msg =
  | { type: "preview-update"; pageSlug: string; sections: SectionInstance[] }
  | { type: "preview-update-section"; pageSlug: string; sectionId: string; content: Record<string, unknown> };

export function GlobalPreviewProvider({
  children,
  initialSections,
}: {
  children: ReactNode;
  initialSections: SectionInstance[];
}) {
  const searchParams = useSearchParams();
  const isPreview = searchParams?.get("preview") === "1";
  const [sections, setSections] = useState<SectionInstance[]>(initialSections);

  useEffect(() => {
    if (!isPreview) setSections(initialSections);
  }, [initialSections, isPreview]);

  useEffect(() => {
    if (!isPreview) return;
    const onMessage = (event: MessageEvent) => {
      const data = event.data as Msg | undefined;
      if (!data || typeof data !== "object") return;
      if ("pageSlug" in data && data.pageSlug !== "global") return;

      if (data.type === "preview-update") {
        setSections(data.sections);
      } else if (data.type === "preview-update-section") {
        setSections((prev) =>
          prev.map((s) =>
            s.id === data.sectionId ? { ...s, content: data.content } : s
          )
        );
      }
    };
    window.addEventListener("message", onMessage);
    try {
      window.parent?.postMessage({ type: "preview-ready", pageSlug: "global" }, "*");
    } catch {
      // ignore
    }
    return () => window.removeEventListener("message", onMessage);
  }, [isPreview]);

  const value = useMemo(() => ({ isPreview, sections }), [isPreview, sections]);
  return (
    <GlobalPreviewContext.Provider value={value}>{children}</GlobalPreviewContext.Provider>
  );
}

export function useGlobalSection<T = Record<string, unknown>>(
  type: string
): T | undefined {
  const ctx = useContext(GlobalPreviewContext);
  if (!ctx) return undefined;
  const found = ctx.sections.find((s) => s.type === type);
  return (found?.content as T | undefined);
}
