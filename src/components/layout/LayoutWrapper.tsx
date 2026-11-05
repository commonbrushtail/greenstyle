"use client";

import { usePathname } from "next/navigation";
import { HeaderSection, FooterSection } from "@/components/sections-builder/globals";
import ComingSoon from "@/components/layout/ComingSoon";
import MaintenanceBanner from "@/components/layout/MaintenanceBanner";
import { AdminProvider, useAdmin } from "@/components/admin/AdminProvider";
import { GlobalPreviewProvider } from "@/components/admin/GlobalPreviewProvider";
import EditModeBar from "@/components/admin/EditModeBar";
import { useIsPreview } from "@/lib/use-is-preview";
import type { SiteStatus } from "@/lib/site-status";
import type { SectionInstance } from "@/lib/content";

function LayoutWrapperInner({
  children,
  siteStatus,
  globalSections,
}: {
  children: React.ReactNode;
  siteStatus: SiteStatus;
  globalSections: SectionInstance[];
}) {
  const pathname = usePathname();
  const isPreview = useIsPreview();
  const { isAdmin } = useAdmin();

  // Admin routes are always accessible — no gating, no header/footer.
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // Site is offline: only logged-in admins get past this.
  if (!siteStatus.live && !isAdmin) {
    return <ComingSoon status={siteStatus} />;
  }

  return (
    <GlobalPreviewProvider initialSections={globalSections}>
      {!siteStatus.live && !isPreview && <MaintenanceBanner />}
      <HeaderSection />
      <main className="min-h-screen">{children}</main>
      <FooterSection />
      <EditModeBar />
    </GlobalPreviewProvider>
  );
}

export default function LayoutWrapper(props: {
  children: React.ReactNode;
  siteStatus: SiteStatus;
  globalSections: SectionInstance[];
}) {
  return (
    <AdminProvider>
      <LayoutWrapperInner {...props} />
    </AdminProvider>
  );
}
