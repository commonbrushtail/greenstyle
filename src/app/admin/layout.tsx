"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const pages = [
  { slug: "home", label: "หน้าหลัก" },
  { slug: "about", label: "เกี่ยวกับเรา" },
  { slug: "services", label: "บริการ" },
  { slug: "services-cfo", label: "บริการ - CFO" },
  { slug: "services-cfp", label: "บริการ - CFP" },
  { slug: "services-training", label: "บริการ - อบรม" },
  { slug: "case-studies", label: "ผลงาน" },
  { slug: "contact", label: "ติดต่อเรา" },
  { slug: "global", label: "ส่วนกลาง (Footer)" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Green Style</h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              href="/admin"
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/admin"
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase">
              Pages
            </div>
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/admin/${page.slug}`}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === `/admin/${page.slug}`
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {page.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
    </div>
  );
}
