const EXTENSIONS = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

/** Decodes a string that is entirely a base64 image data URL. Returns null for
 *  anything else, including image types we can't give a file extension to. */
export function parseDataImage(value) {
  const match = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/i.exec(value);
  if (!match) return null;
  const contentType = match[1].toLowerCase();
  const ext = EXTENSIONS[contentType];
  if (!ext) return null;
  const bytes = Buffer.from(match[2], "base64");
  if (bytes.length === 0) return null;
  return { contentType, ext, bytes };
}

/** Returns a copy of `root` with each whole-string data image replaced by the
 *  URL `upload` returns. Data images it can't convert stay in place and are
 *  listed in `skipped`. Never mutates `root`; an upload failure rejects. */
export async function rewriteDataImages(root, upload) {
  let replaced = 0;
  const skipped = [];

  const walk = async (value, path) => {
    if (typeof value === "string") {
      if (!value.includes("data:image/")) return value;
      const parsed = parseDataImage(value);
      if (!parsed) {
        skipped.push(path);
        return value;
      }
      const url = await upload(parsed);
      replaced += 1;
      return url;
    }
    if (Array.isArray(value)) {
      const out = [];
      for (let i = 0; i < value.length; i += 1) {
        out.push(await walk(value[i], `${path}[${i}]`));
      }
      return out;
    }
    if (value && typeof value === "object") {
      const out = {};
      for (const key of Object.keys(value)) {
        out[key] = await walk(value[key], path ? `${path}.${key}` : key);
      }
      return out;
    }
    return value;
  };

  const value = await walk(root, "");
  return { value, replaced, skipped };
}
