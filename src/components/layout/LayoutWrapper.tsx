"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { HeaderSection, FooterSection } from "@/components/sections-builder/globals";
import ComingSoon from "@/components/layout/ComingSoon";
import MaintenanceBanner from "@/components/layout/MaintenanceBanner";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { GlobalPreviewProvider } from "@/components/admin/GlobalPreviewProvider";
import EditModeBar from "@/components/admin/EditModeBar";
import type { SiteStatus } from "@/lib/site-status";
import type { SectionInstance } from "@/lib/content";

function LayoutWrapperInner({
  children,
  siteStatus,
  userIsAdmin,
  adminEmail,
  globalSections,
}: {
  children: React.ReactNode;
  siteStatus: SiteStatus;
  userIsAdmin: boolean;
  adminEmail: string | null;
  globalSections: SectionInstance[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdminRoute = pathname.startsWith("/admin");
  const isPreview = searchParams?.get("preview") === "1";

  // Admin routes are always accessible — no gating, no header/footer.
  if (isAdminRoute) {
    return (
      <AdminProvider initialIsAdmin={userIsAdmin} initialEmail={adminEmail}>
        {children}
      </AdminProvider>
    );
  }

  // Site is offline.
  if (!siteStatus.live) {
    if (!userIsAdmin) {
      return (
        <AdminProvider initialIsAdmin={false} initialEmail={null}>
          <ComingSoon status={siteStatus} />
        </AdminProvider>
      );
    }
    return (
      <AdminProvider initialIsAdmin={userIsAdmin} initialEmail={adminEmail}>
        <GlobalPreviewProvider initialSections={globalSections}>
          {!isPreview && <MaintenanceBanner />}
          <HeaderSection />
          <main className="min-h-screen">{children}</main>
          <FooterSection />
          <EditModeBar />
        </GlobalPreviewProvider>
      </AdminProvider>
    );
  }

  // Site is live — normal render.
  return (
    <AdminProvider initialIsAdmin={userIsAdmin} initialEmail={adminEmail}>
      <GlobalPreviewProvider initialSections={globalSections}>
        <HeaderSection />
        <main className="min-h-screen">{children}</main>
        <FooterSection />
        <EditModeBar />
      </GlobalPreviewProvider>
    </AdminProvider>
  );
}

export default function LayoutWrapper(props: {
  children: React.ReactNode;
  siteStatus: SiteStatus;
  userIsAdmin: boolean;
  adminEmail: string | null;
  globalSections: SectionInstance[];
}) {
  return (
    <Suspense fallback={null}>
      <LayoutWrapperInner {...props} />
    </Suspense>
  );
}
