"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () =>
  new URLSearchParams(window.location.search).get("preview") === "1";
const getServerSnapshot = () => false;

/** True inside the admin editor's preview iframe (`?preview=1`). Reads the URL
 *  in the browser instead of using useSearchParams, which would make cached
 *  pages send empty HTML and render entirely on the client. */
export function useIsPreview(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
