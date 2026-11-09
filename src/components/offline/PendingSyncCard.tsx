"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CheckCircle2, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { findBook } from "@/data/books";
import { useLanguage } from "@/lib/language";
import { completeSimulatedSync, useSyncQueue } from "@/lib/sync-queue";
import { useStudent } from "@/lib/student";
import { formatWhen } from "./format";

function subscribeOnline(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

/**
 * Changes made on this device (progress, bookmarks, favourites) wait here.
 * "Run simulated sync" only clears the list; nothing is ever uploaded.
 */
export function PendingSyncCard() {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { entries, lastSync } = useSyncQueue(student.id);
  const online = useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);
  const [syncing, setSyncing] = useState(false);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const runSync = () => {
    setSyncing(true);
    setFinished(false);
    timer.current = setTimeout(() => {
      completeSimulatedSync(student.id);
      setSyncing(false);
      setFinished(true);
    }, 1500);
  };

  return (
    <Card title={t("offline.pendingSync")}>
      <p
        className={`flex items-center gap-2 text-sm font-medium ${online ? "text-[#0b7a6e]" : "text-[#9c2f2f]"}`}
      >
        {online ? <Wifi className="size-4" aria-hidden /> : <WifiOff className="size-4" aria-hidden />}
        {online ? t("offline.statusOnline") : t("offline.statusOffline")}
      </p>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-muted">{t("offline.pendingEmpty")}</p>
      ) : (
        <>
          <p className="mt-4 text-xs text-muted">{t("offline.pendingBody")}</p>
          <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto">
            {entries.map((e) => (
              <li key={e.id} className="rounded-xl bg-background px-3 py-2 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{t(`offline.q.${e.type}`)}</span>
                  <span className="shrink-0 text-xs text-muted">{formatWhen(e.at, lang)}</span>
                </div>
                <p className="truncate text-xs text-muted">{findBook(e.bookId)?.title[lang]}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        type="button"
        onClick={runSync}
        disabled={syncing || entries.length === 0 || !online}
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
      >
        <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} aria-hidden />
        {syncing ? t("offline.syncing") : t("offline.syncNow")}
      </button>

      <div aria-live="polite" className="mt-3 min-h-5 text-xs">
        {finished && (
          <p className="flex items-center gap-1.5 font-medium text-[#0b7a6e]">
            <CheckCircle2 className="size-4" aria-hidden />
            {t("offline.syncDone")}
          </p>
        )}
      </div>
      <p className="text-xs text-muted">
        {t("offline.lastSync")}: {lastSync ? formatWhen(lastSync, lang) : t("offline.never")}
      </p>
    </Card>
  );
}
