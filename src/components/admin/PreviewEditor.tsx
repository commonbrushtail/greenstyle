"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ContentEditor from "./ContentEditor";
import { sectionRegistry, pickableSectionTypes } from "@/components/sections-builder/registry";
import { sectionKeyMapping } from "@/lib/page-mapping";
import type { SectionInstance } from "@/lib/content";

interface ContentRow {
  page_slug: string;
  section_key: string;
  section_type: string | null;
  display_order: number | null;
  content: Record<string, unknown>;
  updated_at: string;
}

const slugToPath: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  "services-cfo": "/services/cfo",
  "services-cfp": "/services/cfp",
  "services-training": "/services/training",
  "services-4": "/services/4",
  "services-5": "/services/5",
  "services-6": "/services/6",
  "services-7": "/services/7",
  "services-8": "/services/8",
  news: "/news",
  contact: "/contact",
  global: "/",
};

const sizeOptions = {
  desktop: { label: "Desktop", width: "100%" },
  tablet: { label: "Tablet", width: "768px" },
  mobile: { label: "Mobile", width: "390px" },
} as const;

type SizeKey = keyof typeof sizeOptions;

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function inferType(pageSlug: string, sectionKey: string): string {
  const list = sectionKeyMapping[pageSlug] ?? [];
  return list.find((s) => s.key === sectionKey)?.type ?? "";
}

export default function PreviewEditor({ pageSlug }: { pageSlug: string }) {
  const isGlobal = pageSlug === "global";
  const [sections, setSections] = useState<SectionInstance[]>([]);
  const [serverSections, setServerSections] = useState<SectionInstance[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState<string | null>(null);
  const [size, setSize] = useState<SizeKey>("desktop");
  const [iframeReady, setIframeReady] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const iframeSrc = useMemo(() => {
    const base = slugToPath[pageSlug] ?? "/";
    return `${base}?preview=1`;
  }, [pageSlug]);

  // Load page rows. Sections in sectionKeyMapping but missing from the DB
  // are injected with default content from the registry so the admin can
  // edit + save them (saving creates the DB row).
  useEffect(() => {
    fetch(`/api/content?page=${pageSlug}`)
      .then((r) => r.json())
      .then((rows: ContentRow[]) => {
        const dbList: SectionInstance[] = (Array.isArray(rows) ? rows : [])
          .map((r, i) => {
            const type = r.section_type || inferType(pageSlug, r.section_key);
            if (!type) return null;
            return {
              id: r.section_key,
              type,
              content: r.content ?? {},
              order: r.display_order ?? i,
            } as SectionInstance;
          })
          .filter((x): x is SectionInstance => x !== null);

        const existingKeys = new Set(dbList.map((s) => s.id));
        const expected = sectionKeyMapping[pageSlug] ?? [];
        const missing: SectionInstance[] = expected
          .map((m, idx) => {
            if (existingKeys.has(m.key)) return null;
            const def = sectionRegistry[m.type];
            if (!def) return null;
            return {
              id: m.key,
              type: m.type,
              content: JSON.parse(JSON.stringify(def.defaultContent ?? {})),
              order: idx,
            } as SectionInstance;
          })
          .filter((x): x is SectionInstance => x !== null);

        const list = [...dbList, ...missing].sort((a, b) => a.order - b.order);
        setSections(list);
        // serverSections only includes DB rows — missing ones show as dirty
        // until saved, which is correct.
        setServerSections(JSON.parse(JSON.stringify(dbList)));
        if (list.length > 0) setOpenId(list[0].id);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [pageSlug]);

  // Listen for iframe ready.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; pageSlug?: string } | undefined;
      if (data?.type === "preview-ready" && data.pageSlug === pageSlug) {
        setIframeReady(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [pageSlug]);

  // Push full sections array to iframe (debounced).
  const pushSections = useMemo(
    () =>
      debounce((list: SectionInstance[]) => {
        const win = iframeRef.current?.contentWindow;
        if (!win) return;
        win.postMessage({ type: "preview-update", pageSlug, sections: list }, "*");
      }, 150),
    [pageSlug]
  );

  useEffect(() => {
    if (!iframeReady) return;
    pushSections(sections);
  }, [iframeReady, sections, pushSections]);

  // ---- helpers ----
  const findIndex = (id: string) => sections.findIndex((s) => s.id === id);
  const isDirty = (id: string) => {
    const a = sections.find((s) => s.id === id);
    const b = serverSections.find((s) => s.id === id);
    if (!a) return false;
    if (!b) return true; // newly added
    return JSON.stringify(a.content) !== JSON.stringify(b.content);
  };
  const orderChanged =
    sections.length !== serverSections.length ||
    sections.some((s, i) => serverSections[i]?.id !== s.id);

  const updateSectionContent = (id: string, content: Record<string, unknown>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, content } : s))
    );
  };

  const saveSection = async (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section) return;
    setSavingId(id);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_slug: pageSlug,
          section_key: id,
          section_type: section.type,
          display_order: section.order,
          content: section.content,
        }),
      });
      if (!res.ok) {
        let detail = `Save failed (${res.status})`;
        try {
          const body = await res.json();
          if (body && typeof body === "object") {
            const err = (body as { error?: string }).error;
            const det = (body as { details?: string }).details;
            detail = `Save failed (${res.status}): ${err ?? ""}${
              det ? ` — ${det}` : ""
            }`;
          }
        } catch {
          // ignore — keep generic detail
        }
        throw new Error(detail);
      }
      setServerSections((prev) => {
        const idx = prev.findIndex((s) => s.id === id);
        const fresh = JSON.parse(JSON.stringify(section));
        if (idx === -1) return [...prev, fresh].sort((a, b) => a.order - b.order);
        const next = [...prev];
        next[idx] = fresh;
        return next;
      });
      setSavedFlash(id);
      setTimeout(() => setSavedFlash((f) => (f === id ? null : f)), 1500);
    } catch (e) {
      console.error("Save section failed", e);
      alert(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSavingId(null);
    }
  };

  const resetSection = (id: string) => {
    const original = serverSections.find((s) => s.id === id);
    if (!original) {
      // never saved — drop it
      setSections((prev) => prev.filter((s) => s.id !== id));
      return;
    }
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, content: original.content } : s))
    );
  };

  const deleteSection = async (id: string) => {
    if (!confirm("Delete this section? This cannot be undone.")) return;
    const onServer = serverSections.find((s) => s.id === id);
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (onServer) {
      try {
        await fetch(
          `/api/content?page_slug=${encodeURIComponent(
            pageSlug
          )}&section_key=${encodeURIComponent(id)}`,
          { method: "DELETE" }
        );
        setServerSections((prev) => prev.filter((s) => s.id !== id));
      } catch (e) {
        alert(e instanceof Error ? e.message : "Delete failed");
      }
    }
  };

  const addSection = (type: string) => {
    const def = sectionRegistry[type];
    if (!def) return;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? `${type}-${crypto.randomUUID().slice(0, 8)}`
        : `${type}-${Date.now()}`;
    const newSection: SectionInstance = {
      id,
      type,
      content: JSON.parse(JSON.stringify(def.defaultContent)),
      order: sections.length,
    };
    setSections((prev) => [...prev, newSection]);
    setOpenId(id);
    setShowPicker(false);
  };

  const moveSection = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const fromIdx = findIndex(fromId);
    const toIdx = findIndex(toId);
    if (fromIdx < 0 || toIdx < 0) return;
    const next = [...sections];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    next.forEach((s, i) => (s.order = i));
    setSections(next);
  };

  const saveOrder = async () => {
    setReordering(true);
    try {
      const res = await fetch("/api/content/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_slug: pageSlug,
          order: sections.map((s, i) => ({
            section_key: s.id,
            display_order: i,
          })),
        }),
      });
      if (!res.ok) {
        let detail = `Reorder failed (${res.status})`;
        try {
          const body = await res.json();
          if (body && typeof body === "object") {
            const err = (body as { error?: string }).error;
            const det = (body as { details?: string }).details;
            detail = `Reorder failed (${res.status}): ${err ?? ""}${
              det ? ` — ${det}` : ""
            }`;
          }
        } catch {
          // keep generic detail
        }
        throw new Error(detail);
      }
      setServerSections(JSON.parse(JSON.stringify(sections)));
    } catch (e) {
      console.error("Reorder failed", e);
      alert(e instanceof Error ? e.message : "Reorder failed");
    } finally {
      setReordering(false);
    }
  };

  if (!loaded) {
    return <p className="text-gray-500">Loading…</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-4 h-[calc(100vh-8rem)]">
      {/* LEFT — sections list + form */}
      <div className="flex flex-col min-h-0 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-white rounded-t-xl">
          <div className="text-sm text-gray-700 font-medium">
            {sections.length} section{sections.length === 1 ? "" : "s"}
          </div>
          <div className="flex items-center gap-2">
            {orderChanged && (
              <button
                onClick={saveOrder}
                disabled={reordering}
                className="px-3 py-1 text-xs bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50"
              >
                {reordering ? "Saving order…" : "Save order"}
              </button>
            )}
            {!isGlobal && (
              <button
                onClick={() => setShowPicker(true)}
                className="px-3 py-1 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                + Add section
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {sections.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-6">
              No sections yet. Click &quot;Add section&quot; to start.
            </p>
          )}
          {sections.map((section) => {
            const def = sectionRegistry[section.type];
            const dirty = isDirty(section.id);
            const saving = savingId === section.id;
            const saved = savedFlash === section.id;
            const isOpen = openId === section.id;
            return (
              <div
                key={section.id}
                draggable
                onDragStart={() => setDragId(section.id)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragId && dragId !== section.id) {
                    moveSection(dragId, section.id);
                  }
                }}
                onDragEnd={() => setDragId(null)}
                className={`bg-white rounded-lg border overflow-hidden transition-all ${
                  dirty
                    ? "border-amber-300 shadow-sm"
                    : "border-gray-200"
                } ${dragId === section.id ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-2 p-2 hover:bg-gray-50">
                  <span
                    className="cursor-grab active:cursor-grabbing text-gray-400 px-1 select-none"
                    title="Drag to reorder"
                  >
                    ⋮⋮
                  </span>
                  <button
                    onClick={() => setOpenId(isOpen ? null : section.id)}
                    className="flex-1 text-left flex items-center gap-2 min-w-0"
                  >
                    <span className="font-medium text-sm text-gray-900 truncate">
                      {def?.label ?? section.type}
                    </span>
                    {dirty && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"
                        title="Unsaved changes"
                      />
                    )}
                  </button>
                  {!isGlobal && (
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="text-xs text-red-500 hover:text-red-700 px-1"
                      title="Delete section"
                    >
                      ✕
                    </button>
                  )}
                  <svg
                    onClick={() => setOpenId(isOpen ? null : section.id)}
                    className={`w-4 h-4 text-gray-400 cursor-pointer transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isOpen && (
                  <div className="border-t border-gray-200 p-3 bg-gray-50/50">
                    <ContentEditor
                      content={section.content}
                      onChange={(c) => updateSectionContent(section.id, c)}
                      hideButtons
                    />
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => saveSection(section.id)}
                        disabled={saving || !dirty}
                        className="px-4 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                      >
                        {saving ? "Saving…" : saved ? "Saved!" : "Save"}
                      </button>
                      <button
                        onClick={() => resetSection(section.id)}
                        disabled={!dirty}
                        className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT — preview */}
      <div className="flex flex-col bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-200">
          <div className="text-xs text-gray-500 truncate">
            <code className="text-gray-700">{iframeSrc}</code>
          </div>
          <div className="flex items-center gap-1">
            {(Object.keys(sizeOptions) as SizeKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSize(key)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  size === key
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {sizeOptions[key].label}
              </button>
            ))}
            <button
              onClick={() => {
                setIframeReady(false);
                if (iframeRef.current) iframeRef.current.src = iframeSrc;
              }}
              className="ml-1 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md"
              title="Reload preview"
            >
              ↻
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto flex justify-center bg-gray-200">
          <div
            className="bg-white shadow-sm transition-all duration-200 h-full"
            style={{ width: sizeOptions[size].width, maxWidth: "100%" }}
          >
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              className="w-full h-full border-0"
              title="Live preview"
            />
          </div>
        </div>
      </div>

      {/* Section picker modal */}
      {showPicker && (
        <div
          className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPicker(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Add a section</h2>
              <button
                onClick={() => setShowPicker(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pickableSectionTypes.map((def) => (
                <button
                  key={def.type}
                  onClick={() => addSection(def.type)}
                  className="text-left p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50/40 transition-colors"
                >
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    {def.label}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    {def.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
