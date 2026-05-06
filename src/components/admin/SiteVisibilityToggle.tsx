"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Status = {
  live: boolean;
  heading: string;
  message: string;
};

const fallback: Status = {
  live: true,
  heading: "เร็วๆ นี้",
  message: "เว็บไซต์ของเรากำลังจะเปิดใช้งาน\nกรุณากลับมาใหม่อีกครั้งเร็วๆ นี้",
};

export default function SiteVisibilityToggle() {
  const router = useRouter();
  const [status, setStatus] = useState<Status | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content?page=global")
      .then((r) => r.json())
      .then((rows) => {
        const row = (rows as { section_key: string; content: Status }[]).find(
          (r) => r.section_key === "site_status"
        );
        setStatus(row?.content ?? fallback);
      })
      .catch(() => setStatus(fallback));
  }, []);

  const toggle = async () => {
    if (!status || saving) return;
    setSaving(true);
    setError(null);
    const next = { ...status, live: !status.live };
    setStatus(next);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_slug: "global",
          section_key: "site_status",
          content: next,
        }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setStatus({ ...next, live: !next.live });
    } finally {
      setSaving(false);
    }
  };

  if (!status) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 animate-pulse h-24" />
    );
  }

  return (
    <div
      className={`rounded-xl border p-6 mb-6 transition-colors ${
        status.live
          ? "bg-white border-gray-200"
          : "bg-amber-50 border-amber-200"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                status.live ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            <h3 className="font-semibold text-gray-900">
              Site visibility:{" "}
              <span className={status.live ? "text-green-700" : "text-amber-700"}>
                {status.live ? "Live" : "Hidden"}
              </span>
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            {status.live
              ? "Visitors see the full site."
              : "Visitors see the coming-soon screen. You can still preview the site while logged in."}
          </p>
          {error && (
            <p className="text-xs text-red-600 mt-1">{error}</p>
          )}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={status.live}
          onClick={toggle}
          disabled={saving}
          className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
            status.live ? "bg-primary-600" : "bg-gray-300"
          } ${saving ? "opacity-60" : ""}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              status.live ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
