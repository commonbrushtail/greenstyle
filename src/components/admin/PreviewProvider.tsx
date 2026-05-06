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

type PreviewContextValue = {
  pageSlug: string;
  isPreview: boolean;
  sections: SectionInstance[];
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

type PreviewMessage =
  | { type: "preview-update"; pageSlug: string; sections: SectionInstance[] }
  | { type: "preview-update-section"; pageSlug: string; sectionId: string; content: Record<string, unknown> };

export function PreviewProvider({
  children,
  pageSlug,
  initialSections,
}: {
  children: ReactNode;
  pageSlug: string;
  initialSections: SectionInstance[];
}) {
  const searchParams = useSearchParams();
  const isPreview = searchParams?.get("preview") === "1";

  const [sections, setSections] = useState<SectionInstance[]>(initialSections);

  useEffect(() => {
    if (!isPreview) {
      setSections(initialSections);
    }
  }, [initialSections, isPreview]);

  useEffect(() => {
    if (!isPreview) return;

    const onMessage = (event: MessageEvent) => {
      const data = event.data as PreviewMessage | undefined;
      if (!data || typeof data !== "object") return;
      if ("pageSlug" in data && data.pageSlug !== pageSlug) return;

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
      window.parent?.postMessage(
        { type: "preview-ready", pageSlug },
        "*"
      );
    } catch {
      // ignore (no parent / cross-origin)
    }

    return () => window.removeEventListener("message", onMessage);
  }, [isPreview, pageSlug]);

  const value = useMemo(
    () => ({ pageSlug, isPreview, sections }),
    [pageSlug, isPreview, sections]
  );

  return (
    <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
  );
}

/** Returns the ordered sections for the current page (preview-aware). */
export function useSections(): SectionInstance[] {
  const ctx = useContext(PreviewContext);
  return ctx?.sections ?? [];
}

export function usePreviewMeta() {
  const ctx = useContext(PreviewContext);
  return {
    isPreview: !!ctx?.isPreview,
    pageSlug: ctx?.pageSlug,
  };
}
