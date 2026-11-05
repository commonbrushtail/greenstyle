"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_HINT_COOKIE } from "@/lib/admin-hint";

type AdminContextValue = {
  isAdmin: boolean;
  email: string | null;
  loading: boolean;
};

const signedOut: AdminContextValue = { isAdmin: false, email: null, loading: false };

const AdminContext = createContext<AdminContextValue>(signedOut);

/** Pages are cached and shared by all visitors, so login state is found in the
 *  browser. Only browsers with the hint cookie ask the server, which means
 *  ordinary visitors never trigger this request. */
export function AdminProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<AdminContextValue>(signedOut);

  useEffect(() => {
    const hasHint = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${ADMIN_HINT_COOKIE}=`));
    if (!hasHint) {
      setState(signedOut);
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { authenticated?: boolean; email?: string }) => {
        if (!cancelled) {
          setState({
            isAdmin: !!d.authenticated,
            email: d.email ?? null,
            loading: false,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setState(signedOut);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return <AdminContext.Provider value={state}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
