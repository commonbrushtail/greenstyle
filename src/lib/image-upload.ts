export const MAX_IMAGE_BYTES = 1024 * 1024; // 1 MB

/** Allowed upload types. Every upload gets one of these extensions, because
 *  MaybeImage and the admin fields recognise image URLs by their extension. */
export const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

/** Uploads an image from the admin UI and returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
  if (!res.ok || !data?.url) {
    throw new Error(data?.error ?? "อัปโหลดรูปไม่สำเร็จ");
  }
  return data.url;
}
