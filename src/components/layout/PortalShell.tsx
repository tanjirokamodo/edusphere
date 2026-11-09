"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { dashboardPath } from "@/data/users";
import { useSession } from "@/lib/session";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import type { Role } from "@/types";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

/**
 * Wraps every portal route. Demo-only guard: it checks the role saved in
 * localStorage and redirects. This is NOT real access control.
 */
export function PortalShell({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const router = useRouter();
  const session = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (session.status === "signed-out") router.replace("/");
    else if (session.status === "signed-in" && session.role !== role)
      router.replace(dashboardPath[session.role]);
  }, [session, role, router]);

  if (session.status !== "signed-in" || session.role !== role) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <Sidebar role={role} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <Header user={session.user} onOpenMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
