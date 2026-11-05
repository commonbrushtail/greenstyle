import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/auth";
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from "@/lib/image-upload";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "ไม่พบไฟล์" }, { status: 400 });
  }

  const ext = IMAGE_EXTENSIONS[file.type];
  if (!ext) {
    return NextResponse.json({ error: "ไฟล์นี้ไม่ใช่รูปภาพที่รองรับ" }, { status: 400 });
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "ไฟล์ใหญ่เกินไป สูงสุด 1 MB" }, { status: 413 });
  }

  try {
    const { url } = await put(`cms/${randomUUID()}.${ext}`, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
      // Each upload gets a new URL, so browsers can keep it for a long time.
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Image upload failed", e);
    return NextResponse.json({ error: "อัปโหลดรูปไม่สำเร็จ" }, { status: 500 });
  }
}
