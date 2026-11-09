"use client";

import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language";

export function LoadingScreen() {
  const { t } = useLanguage();
  return (
    <div
      role="status"
      className="grid min-h-screen place-items-center bg-background text-muted"
    >
      <div className="flex items-center gap-3 text-sm">
        <Loader2 className="size-5 animate-spin text-primary" aria-hidden />
        {t("common.loading")}
      </div>
    </div>
  );
}
