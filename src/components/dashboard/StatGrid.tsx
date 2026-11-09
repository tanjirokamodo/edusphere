"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/language";
import type { TranslationKey } from "@/lib/i18n";
import type { StatItem } from "@/types";

const trendColor = {
  up: "text-[#0b7a6e]",
  down: "text-[#a8304a]",
  none: "text-muted",
} as const;

export function StatGrid({ stats }: { stats: StatItem[] }) {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.key}
          className="rounded-2xl border border-line bg-card p-5 shadow-card"
        >
          <p className="text-sm text-muted">{t(s.key as TranslationKey)}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
          {s.delta && (
            <p
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${trendColor[s.trend ?? "none"]}`}
            >
              {s.trend === "up" && <TrendingUp className="size-3.5" aria-hidden />}
              {s.trend === "down" && <TrendingDown className="size-3.5" aria-hidden />}
              {s.delta}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
