"use client";

import { useParams } from "next/navigation";
import PreviewEditor from "@/components/admin/PreviewEditor";

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

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {pageLabels[pageSlug] || pageSlug}
      </h1>
      <PreviewEditor pageSlug={pageSlug} />
    </div>
  );
}
