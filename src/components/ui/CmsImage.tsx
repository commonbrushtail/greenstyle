"use client";

import Image, { ImageProps } from "next/image";

/** next/image wrapper that auto-uses `unoptimized` for data: URLs
 *  (and for any URL not whitelisted in next.config remotePatterns).
 *  Use this whenever the src can be user-supplied through the CMS. */
export default function CmsImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isDataUrl = src.startsWith("data:");
  const isExternal = /^https?:\/\//i.test(src);
  return <Image {...props} unoptimized={isDataUrl || isExternal} />;
}
