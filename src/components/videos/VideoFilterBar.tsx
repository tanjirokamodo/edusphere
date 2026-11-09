"use client";

import { Search } from "lucide-react";
import { Segmented } from "@/components/ui/Segmented";
import { useLanguage } from "@/lib/language";
import type { AgeBand, Language, VideoCategory, VideoItem } from "@/types";

export type DurationFilter = "all" | "short" | "medium" | "long";

export interface VideoFilters {
  query: string;
  language: "all" | Language;
  age: "all" | AgeBand;
  duration: DurationFilter;
  category: "all" | VideoCategory;
}

export const defaultVideoFilters: VideoFilters = {
  query: "",
  language: "all",
  age: "all",
  duration: "all",
  category: "all",
};

export function hasActiveFilters(f: VideoFilters): boolean {
  return (
    f.query.trim() !== "" || f.language !== "all" || f.age !== "all" || f.duration !== "all" || f.category !== "all"
  );
}

/** Under 5 min, 5–10 min (inclusive), over 10 min. */
export function matchesDuration(durationSec: number, filter: DurationFilter): boolean {
  if (filter === "short") return durationSec < 300;
  if (filter === "medium") return durationSec >= 300 && durationSec <= 600;
  if (filter === "long") return durationSec > 600;
  return true;
}

export function filterVideos(list: VideoItem[], f: VideoFilters): VideoItem[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((v) => {
    if (f.category !== "all" && v.category !== f.category) return false;
    if (f.language !== "all" && !v.languages.includes(f.language)) return false;
    if (f.age !== "all" && !v.bands.includes(f.age)) return false;
    if (!matchesDuration(v.durationSec, f.duration)) return false;
    if (q && !`${v.title.en} ${v.title.te}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function VideoFilterBar({
  filters,
  onChange,
}: {
  filters: VideoFilters;
  onChange: (next: VideoFilters) => void;
}) {
  const { t } = useLanguage();
  const set = <K extends keyof VideoFilters>(key: K, value: VideoFilters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          type="search"
          value={filters.query}
          onChange={(e) => set("query", e.target.value)}
          placeholder={t("vid.search")}
          aria-label={t("vid.search")}
          className="min-h-12 w-full rounded-full border border-line bg-card pl-12 pr-4 text-sm shadow-card placeholder:text-muted"
        />
      </div>

      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Segmented<"all" | Language>
          label={t("lib.language")}
          value={filters.language}
          onChange={(v) => set("language", v)}
          options={[
            { value: "all", label: t("kind.all") },
            { value: "en", label: t("lang.en") },
            { value: "te", label: t("lang.te") },
          ]}
        />
        <Segmented<"all" | AgeBand>
          label={t("lib.age")}
          value={filters.age}
          onChange={(v) => set("age", v)}
          options={[
            { value: "all", label: t("kind.all") },
            { value: "7-9", label: t("lib.age.7-9") },
            { value: "10-12", label: t("lib.age.10-12") },
          ]}
        />
        <Segmented<DurationFilter>
          label={t("vid.duration")}
          value={filters.duration}
          onChange={(v) => set("duration", v)}
          options={[
            { value: "all", label: t("kind.all") },
            { value: "short", label: t("vid.dur.short") },
            { value: "medium", label: t("vid.dur.medium") },
            { value: "long", label: t("vid.dur.long") },
          ]}
        />
      </div>
    </div>
  );
}
