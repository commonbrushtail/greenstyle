"use client";

import { useRef, useState } from "react";

const MAX_BYTES = 1024 * 1024; // 1 MB

export default function ImageField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("ไฟล์นี้ไม่ใช่รูปภาพ");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(
        `ไฟล์ใหญ่เกินไป (${(file.size / 1024 / 1024).toFixed(2)} MB). สูงสุด 1 MB. ถ้ารูปใหญ่ ให้วาง URL แทน.`
      );
      return;
    }
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
      setBusy(false);
    };
    reader.onerror = () => {
      setError("อ่านไฟล์ไม่สำเร็จ");
      setBusy(false);
    };
    reader.readAsDataURL(file);
  };

  const hasValue = Boolean(value);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
          {label}
        </label>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
        {/* Preview */}
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 flex-shrink-0 rounded-md border border-gray-300 bg-white overflow-hidden flex items-center justify-center text-gray-300 text-xs text-center">
            {hasValue ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt=""
                className="w-full h-full object-contain"
                onError={() => setError("รูปโหลดไม่สำเร็จ — ตรวจสอบ URL อีกครั้ง")}
              />
            ) : (
              <span>ไม่มีรูป</span>
            )}
          </div>

          <div className="flex-1 space-y-2 min-w-0">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setError(null);
                onChange(e.target.value);
              }}
              placeholder="วาง URL รูปภาพ หรืออัปโหลดด้านขวา"
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none font-mono"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={busy}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                {busy ? "กำลังอัปโหลด…" : "เลือกรูปจากเครื่อง"}
              </button>
              {hasValue && (
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setError(null);
                  }}
                  className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded"
                >
                  ลบรูป
                </button>
              )}
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <p className="text-[10px] text-gray-400">
              อัปโหลดได้สูงสุด 1 MB. รูปใหญ่กว่านั้นแนะนำให้วาง URL จากภายนอก.
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = ""; // allow re-selecting same file
          }}
        />
      </div>
    </div>
  );
}
