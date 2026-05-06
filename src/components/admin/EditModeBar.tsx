"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAdmin } from "./AdminProvider";

export default function EditModeBar() {
  const { isAdmin, email, loading } = useAdmin();
  const searchParams = useSearchParams();
  const isPreview = searchParams?.get("preview") === "1";

  if (loading || !isAdmin || isPreview) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      <span>Logged in</span>
      {email && <span className="opacity-80 hidden sm:inline">· {email}</span>}
      <Link
        href="/admin"
        className="ml-2 underline-offset-2 hover:underline"
      >
        Admin
      </Link>
    </div>
  );
}
