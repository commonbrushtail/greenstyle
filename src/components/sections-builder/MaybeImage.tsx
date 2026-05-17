"use client";

import { ReactNode } from "react";

export function isImageValue(v: unknown): v is string {
  if (typeof v !== "string" || v.length === 0) return false;
  if (/^data:image\//i.test(v)) return true;
  if (/\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(v)) return true;
  return false;
}

/** Wraps any CMS string value. If the string looks like an image URL or data
 *  URL, renders an <img> instead of plain text. Use this in place of bare
 *  `{value}` interpolations in section components so admins who upload an
 *  image into a text field still see the image in the rendered page. */
export default function MaybeImage({
  value,
  alt = "",
  imgClassName = "max-w-full h-auto inline-block rounded-md",
  fallback,
}: {
  value: string | undefined | null;
  alt?: string;
  imgClassName?: string;
  fallback?: ReactNode;
}) {
  const v = value ?? "";
  if (isImageValue(v)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={v} alt={alt} className={imgClassName} />;
  }
  return <>{fallback ?? v}</>;
}
