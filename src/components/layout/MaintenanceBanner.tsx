import Link from "next/link";

export default function MaintenanceBanner() {
  return (
    <div className="sticky top-0 z-[60] bg-amber-500 text-white text-sm font-medium py-2 px-4 text-center shadow">
      Site is hidden from visitors.{" "}
      <Link href="/admin" className="underline underline-offset-2 ml-1">
        Toggle in admin
      </Link>
    </div>
  );
}
