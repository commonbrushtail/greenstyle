"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ContentEditor from "@/components/admin/ContentEditor";

interface ContentRow {
  id: string;
  page_slug: string;
  section_key: string;
  content: Record<string, unknown>;
  updated_at: string;
}

const pageLabels: Record<string, string> = {
  home: "หน้าหลัก",
  about: "เกี่ยวกับเรา",
  services: "บริการ",
  "services-cfo": "บริการ - CFO",
  "services-cfp": "บริการ - CFP",
  "services-training": "บริการ - อบรม",
  "case-studies": "ผลงาน",
  contact: "ติดต่อเรา",
  global: "ส่วนกลาง (Footer)",
};

export default function PageEditor() {
  const params = useParams();
  const pageSlug = params.pageSlug as string;
  const [sections, setSections] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/content?page=${pageSlug}`)
      .then((r) => r.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
        if (data.length > 0) setOpenSection(data[0].section_key);
      })
      .catch(() => setLoading(false));
  }, [pageSlug]);

  const handleSave = async (sectionKey: string, content: Record<string, unknown>) => {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_slug: pageSlug,
        section_key: sectionKey,
        content,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setSections((prev) =>
        prev.map((s) =>
          s.section_key === sectionKey ? { ...s, content: updated.content, updated_at: updated.updated_at } : s
        )
      );
      return true;
    }
    return false;
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {pageLabels[pageSlug] || pageSlug}
      </h1>

      {sections.length === 0 ? (
        <p className="text-gray-500">No content found for this page. Run the seed script first.</p>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.section_key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() =>
                  setOpenSection(
                    openSection === section.section_key ? null : section.section_key
                  )
                }
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">
                    {section.section_key}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Updated: {new Date(section.updated_at).toLocaleString("th-TH")}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openSection === section.section_key ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openSection === section.section_key && (
                <div className="border-t border-gray-200 p-4">
                  <ContentEditor
                    content={section.content}
                    onSave={(content) => handleSave(section.section_key, content)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
