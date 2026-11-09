"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hammer, SearchX } from "lucide-react";
import { findRouteLabel } from "@/config/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/lib/language";
import type { Role } from "@/types";

/** Shown for nav destinations that are scheduled for a later build stage. */
export function PlannedPage({ role }: { role: Role }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const labelKey = findRouteLabel(role, pathname);
  const backClass =
    "inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90";

  if (!labelKey) {
    return (
      <EmptyState
        icon={SearchX}
        title={t("planned.notFound")}
        description=""
        action={
          <Link href={`/${role}`} className={backClass}>
            {t("common.back")}
          </Link>
        }
      />
    );
  }

  return (
    <>
      <PageHeader title={t(labelKey)} />
      <EmptyState
        icon={Hammer}
        title={t("planned.title")}
        description={t("planned.body")}
        action={
          <Link href={`/${role}`} className={backClass}>
            {t("common.back")}
          </Link>
        }
      />
    </>
  );
}
