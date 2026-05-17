"use client";

import { useRef, useState } from "react";

const MAX_BYTES = 1024 * 1024; // 1 MB

export default function TextWithImageUpload({
  value,
  multiline,
  rows = 4,
  onChange,
}: {
  value: string;
  multiline?: boolean;
  rows?: number;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isImage = /^data:image\//.test(value) || /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(value);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("ไฟล์นี้ไม่ใช่รูปภาพ");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(`ไฟล์ใหญ่เกินไป (${(file.size / 1024 / 1024).toFixed(2)} MB) สูงสุด 1 MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.onerror = () => setError("อ่านไฟล์ไม่สำเร็จ");
    reader.readAsDataURL(file);
  };

  const InputEl = multiline ? "textarea" : "input";

  return (
    <div>
      <div className="relative">
        <InputEl
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={multiline ? rows : undefined}
          type={multiline ? undefined : "text"}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          title="อัปโหลดรูปภาพ"
          className="absolute top-1.5 right-1.5 p-1 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
      </div>

      {isImage && (
        <div className="mt-2 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="w-16 h-16 object-contain rounded border border-gray-200 bg-white"
            onError={() => setError("รูปโหลดไม่สำเร็จ")}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded"
          >
            ลบรูป
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
