"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, CloudOff, GraduationCap, Info, PlayCircle, TriangleAlert, type LucideIcon } from "lucide-react";
import { DownloadButton } from "@/components/library/DownloadButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { allOfflineItems, findOfflineItem } from "@/data/offline-items";
import { useDownloads } from "@/lib/downloads";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import type { DownloadRecord, OfflineItem, OfflineKind } from "@/types";
import { formatWhen } from "./format";
import { OfflineRow, OpenLink, RemoveButton } from "./OfflineRow";
import { PendingSyncCard } from "./PendingSyncCard";
import { StorageCard } from "./StorageCard";

interface Downloaded {
  item: OfflineItem;
  record: DownloadRecord;
}

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {note && <span className="text-sm text-muted">{note}</span>}
      </div>
      {children}
    </section>
  );
}

const sections: {
  kind: OfflineKind;
  titleKey: TranslationKey;
  emptyKey: TranslationKey;
  emptyBodyKey: TranslationKey;
  icon: LucideIcon;
}[] = [
  { kind: "book", titleKey: "offline.books", emptyKey: "offline.empty.books", emptyBodyKey: "offline.empty.booksBody", icon: BookOpen },
  { kind: "video", titleKey: "offline.videos", emptyKey: "offline.empty.videos", emptyBodyKey: "offline.empty.videosBody", icon: PlayCircle },
  { kind: "course", titleKey: "offline.courses", emptyKey: "offline.empty.courses", emptyBodyKey: "offline.empty.coursesBody", icon: GraduationCap },
];

export function OfflinePage() {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { loaded, map, usedMb, storageAvailable, inFlightKeys, remove, cancel } = useDownloads();

  const downloaded: Downloaded[] = Object.entries(map).flatMap(([key, record]) => {
    const item = findOfflineItem(key);
    return item ? [{ item, record }] : [];
  });
  const recent = [...downloaded].sort((a, b) => b.record.at.localeCompare(a.record.at)).slice(0, 5);

  const inFlight = inFlightKeys.flatMap((k) => {
    const item = findOfflineItem(k);
    return item ? [item] : [];
  });

  // Offer videos and courses for the student's age group that are not saved yet.
  const available = allOfflineItems.filter(
    (i) =>
      i.kind !== "book" &&
      i.bands.includes(student.band) &&
      !map[i.key] &&
      !inFlightKeys.includes(i.key),
  );

  return (
    <>
      <PageHeader title={t("nav.offline")} subtitle={t("offline.subtitle")} />

      <div className="-mt-3 mb-6 space-y-2">
        <p className="flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-xs text-[#6b4700] sm:text-sm">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t("offline.demoNotice")}
        </p>
        {!storageAvailable && (
          <p role="alert" className="flex items-start gap-2 rounded-xl bg-coral-soft px-4 py-3 text-xs text-[#9c2f2f] sm:text-sm">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t("offline.noStorage")}
          </p>
        )}
      </div>

      {!loaded ? (
        <div role="status" aria-label={t("offline.loading")} className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl border border-line bg-card" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-3">
          <div className="min-w-0 space-y-8 xl:col-span-2">
            {inFlight.length > 0 && (
              <Section title={t("offline.inProgress")}>
                <ul className="space-y-3">
                  {inFlight.map((item) => (
                    <OfflineRow key={item.key} item={item}>
                      <DownloadButton item={item} compact />
                      <button
                        type="button"
                        onClick={() => cancel(item.key)}
                        className="min-h-10 rounded-full border border-line bg-card px-4 text-sm font-semibold text-muted hover:text-foreground"
                      >
                        {t("offline.cancel")}
                      </button>
                    </OfflineRow>
                  ))}
                </ul>
              </Section>
            )}

            {sections.map(({ kind, titleKey, emptyKey, emptyBodyKey, icon }) => {
              const rows = downloaded.filter((d) => d.item.kind === kind);
              return (
                <Section key={kind} title={t(titleKey)} note={rows.length > 0 ? String(rows.length) : undefined}>
                  {rows.length === 0 ? (
                    <EmptyState
                      compact
                      icon={icon}
                      title={t(emptyKey)}
                      description={t(emptyBodyKey)}
                      action={
                        kind === "book" ? (
                          <Link
                            href="/student/library"
                            className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
                          >
                            {t("offline.getMoreBooks")}
                          </Link>
                        ) : undefined
                      }
                    />
                  ) : (
                    <ul className="space-y-3">
                      {rows.map(({ item, record }) => (
                        <OfflineRow key={item.key} item={item} detail={formatWhen(record.at, lang)}>
                          <OpenLink href={item.href} />
                          <RemoveButton onConfirm={() => remove(item.key)} />
                        </OfflineRow>
                      ))}
                    </ul>
                  )}
                </Section>
              );
            })}

            <Section title={t("offline.available")} note={t("offline.availableNote")}>
              {available.length === 0 ? (
                <EmptyState compact icon={CloudOff} title={t("offline.allDownloaded")} description="" />
              ) : (
                <ul className="space-y-3">
                  {available.map((item) => (
                    <OfflineRow key={item.key} item={item}>
                      <DownloadButton item={item} compact />
                    </OfflineRow>
                  ))}
                </ul>
              )}
            </Section>
          </div>

          <div className="min-w-0 space-y-6 self-start">
            <StorageCard map={map} usedMb={usedMb} />
            <PendingSyncCard />
            <section className="rounded-2xl border border-line bg-card p-5 shadow-card">
              <h2 className="mb-4 text-base font-semibold">{t("offline.recent")}</h2>
              {recent.length === 0 ? (
                <p className="text-sm text-muted">{t("offline.empty.recent")}</p>
              ) : (
                <ul className="divide-y divide-line">
                  {recent.map(({ item, record }) => (
                    <li key={item.key} className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                      <span className="min-w-0 truncate text-sm font-medium">{item.title[lang]}</span>
                      <span className="shrink-0 text-xs text-muted">{formatWhen(record.at, lang)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}
