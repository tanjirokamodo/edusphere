"use client";

import { AlertCircle, CheckCircle2, Download, Loader2 } from "lucide-react";
import { useDownloads } from "@/lib/downloads";
import { useLanguage } from "@/lib/language";
import type { OfflineItem } from "@/types";

/**
 * Download control shared by library cards, the details dialog and the Offline
 * page. It drives the SIMULATED download engine: no file is actually saved.
 */
export function DownloadButton({
  item,
  compact = false,
}: {
  item: OfflineItem;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const { stateFor, start, dismissError } = useDownloads();
  const state = stateFor(item.key);
  const size = compact ? "min-h-10 px-4 text-sm" : "min-h-11 px-5 text-sm";
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors ${size}`;

  if (state.status === "done") {
    return (
      <span className={`${base} bg-secondary-soft text-[#0b7a6e]`}>
        <CheckCircle2 className="size-4" aria-hidden />
        {t("lib.downloaded")}
      </span>
    );
  }

  if (state.status === "downloading") {
    const pct = Math.round(state.progress);
    return (
      <span
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${t("lib.downloading")} ${item.title.en}`}
        className={`${base} relative overflow-hidden bg-primary-soft text-primary`}
      >
        <span
          className="absolute inset-y-0 left-0 bg-primary/20 transition-[width] duration-100"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
        <Loader2 className="relative size-4 animate-spin" aria-hidden />
        <span className="relative">
          {t("lib.downloading")} {pct}%
        </span>
      </span>
    );
  }

  if (state.status === "error") {
    return (
      <span className="flex flex-col items-start gap-1">
        <button
          type="button"
          onClick={() => {
            dismissError(item.key);
            start(item);
          }}
          className={`${base} bg-coral-soft text-[#9c2f2f] hover:bg-coral-soft/70`}
        >
          <AlertCircle className="size-4" aria-hidden />
          {t("lib.retry")}
        </button>
        <span role="alert" className="max-w-56 text-xs text-[#9c2f2f]">
          {state.reason === "storage-full" ? t("lib.downloadFull") : t("lib.downloadBlocked")}
        </span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => start(item)}
      className={`${base} border border-line bg-card text-foreground hover:border-primary/50 hover:text-primary`}
    >
      <Download className="size-4" aria-hidden />
      {t("lib.download")}
    </button>
  );
}
