"use client";

import Image, { ImageProps } from "next/image";

/** next/image wrapper that auto-uses `unoptimized` for data: URLs and for
 *  external URLs, which may not be whitelisted in next.config remotePatterns.
 *  Our own Vercel Blob images are whitelisted, so they get resized and compressed.
 *  Use this whenever the src can be user-supplied through the CMS. */
export default function CmsImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isDataUrl = src.startsWith("data:");
  const isExternal = /^https?:\/\//i.test(src);
  const isOwnBlob = /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//i.test(src);
  return <Image {...props} unoptimized={isDataUrl || (isExternal && !isOwnBlob)} />;
}
