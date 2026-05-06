"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AdminContextValue = {
  isAdmin: boolean;
  email: string | null;
  loading: boolean;
};

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  email: null,
  loading: false,
});

export function AdminProvider({
  children,
  initialIsAdmin = false,
  initialEmail = null,
}: {
  children: ReactNode;
  initialIsAdmin?: boolean;
  initialEmail?: string | null;
}) {
  const [state] = useState<AdminContextValue>({
    isAdmin: initialIsAdmin,
    email: initialEmail,
    loading: false,
  });

  return <AdminContext.Provider value={state}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
