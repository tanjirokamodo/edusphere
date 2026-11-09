"use client";

import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/lib/language";
import { STORAGE_ALLOWANCE_MB, type DownloadMap } from "@/lib/downloads";
import type { OfflineKind } from "@/types";

const segments: { kind: OfflineKind; color: string; labelKey: "kindOne.book" | "kindOne.video" | "kindOne.course" }[] = [
  { kind: "book", color: "bg-primary", labelKey: "kindOne.book" },
  { kind: "video", color: "bg-secondary", labelKey: "kindOne.video" },
  { kind: "course", color: "bg-accent", labelKey: "kindOne.course" },
];

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Estimated storage use against a demo allowance. Sizes are mock estimates. */
export function StorageCard({ map, usedMb }: { map: DownloadMap; usedMb: number }) {
  const { t } = useLanguage();
  const freeMb = Math.max(0, STORAGE_ALLOWANCE_MB - usedMb);
  const usedPct = Math.min(100, (usedMb / STORAGE_ALLOWANCE_MB) * 100);

  const byKind = (kind: OfflineKind) =>
    Object.values(map)
      .filter((r) => r.kind === kind)
      .reduce((total, r) => total + r.sizeMb, 0);

  return (
    <Card title={t("offline.storage")}>
      <p className="text-3xl font-bold tracking-tight">
        {round1(usedMb)}{" "}
        <span className="text-base font-semibold text-muted">
          {t("offline.mb")}
          {" "}
          {t("offline.used")}
        </span>
      </p>
      <p className="mt-1 text-sm text-muted">
        {round1(freeMb)} {t("offline.mb")} {t("offline.free")} · {t("offline.of")} {STORAGE_ALLOWANCE_MB} {t("offline.mb")}
      </p>

      <div
        role="progressbar"
        aria-label={t("offline.storage")}
        aria-valuenow={Math.round(usedPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-4 flex h-3 overflow-hidden rounded-full bg-line"
      >
        {segments.map((s) => (
          <div
            key={s.kind}
            className={`${s.color} transition-[width] duration-300`}
            style={{ width: `${(byKind(s.kind) / STORAGE_ALLOWANCE_MB) * 100}%` }}
          />
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2 text-xs">
        {segments.map((s) => (
          <li key={s.kind} className="flex items-center gap-2">
            <span className={`size-2.5 shrink-0 rounded-full ${s.color}`} aria-hidden />
            <span className="min-w-0">
              <span className="block truncate text-muted">{t(s.labelKey)}</span>
              <span className="font-semibold">
                {round1(byKind(s.kind))} {t("offline.mb")}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">{t("offline.storageNote")}</p>
    </Card>
  );
}
