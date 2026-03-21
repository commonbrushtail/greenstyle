"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ContentRow {
  id: string;
  page_slug: string;
  section_key: string;
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

export default function AdminDashboard() {
  const [content, setContent] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const grouped = content.reduce(
    (acc, row) => {
      if (!acc[row.page_slug]) acc[row.page_slug] = [];
      acc[row.page_slug].push(row);
      return acc;
    },
    {} as Record<string, ContentRow[]>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : content.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            ยังไม่มีข้อมูลในระบบ
          </h2>
          <p className="text-yellow-700">
            กรุณารัน seed script เพื่อเพิ่มข้อมูลเริ่มต้น:{" "}
            <code className="bg-yellow-100 px-2 py-1 rounded">
              npm run seed
            </code>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(grouped).map(([slug, rows]) => (
            <Link
              key={slug}
              href={`/admin/${slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                {pageLabels[slug] || slug}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {rows.length} sections
              </p>
              <p className="text-xs text-gray-400">
                Last updated:{" "}
                {new Date(
                  Math.max(...rows.map((r) => new Date(r.updated_at).getTime()))
                ).toLocaleDateString("th-TH")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
