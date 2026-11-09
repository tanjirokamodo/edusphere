"use client";

import { Heart, Search } from "lucide-react";
import { Segmented } from "@/components/ui/Segmented";
import { librarySubjects, subjectLabels } from "@/data/books";
import { useLanguage } from "@/lib/language";
import type { AgeBand, Language, LibrarySubject } from "@/types";

export type SubjectFilter = "all" | LibrarySubject;
export type LanguageFilter = "all" | Language;
export type AgeFilter = "all" | AgeBand;

export interface LibraryFilters {
  query: string;
  subject: SubjectFilter;
  language: LanguageFilter;
  age: AgeFilter;
  favouritesOnly: boolean;
}

export const defaultFilters: LibraryFilters = {
  query: "",
  subject: "all",
  language: "all",
  age: "all",
  favouritesOnly: false,
};

interface FilterBarProps {
  filters: LibraryFilters;
  onChange: (next: LibraryFilters) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const { lang, t } = useLanguage();
  const set = <K extends keyof LibraryFilters>(key: K, value: LibraryFilters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          type="search"
          value={filters.query}
          onChange={(e) => set("query", e.target.value)}
          placeholder={t("lib.search")}
          aria-label={t("lib.search")}
          className="min-h-12 w-full rounded-full border border-line bg-card pl-12 pr-4 text-sm shadow-card placeholder:text-muted"
        />
      </div>

      <div
        role="group"
        aria-label={t("lib.subject")}
        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
      >
        {(["all", ...librarySubjects] as SubjectFilter[]).map((s) => {
          const active = filters.subject === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => set("subject", s)}
              aria-pressed={active}
              className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
                active ? "bg-primary text-white" : "border border-line bg-card text-muted hover:text-foreground"
              }`}
            >
              {s === "all" ? t("kind.all") : subjectLabels[s][lang]}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Segmented<LanguageFilter>
          label={t("lib.language")}
          value={filters.language}
          onChange={(v) => set("language", v)}
          options={[
            { value: "all", label: t("kind.all") },
            { value: "en", label: t("lang.en") },
            { value: "te", label: t("lang.te") },
          ]}
        />
        <Segmented<AgeFilter>
          label={t("lib.age")}
          value={filters.age}
          onChange={(v) => set("age", v)}
          options={[
            { value: "all", label: t("kind.all") },
            { value: "7-9", label: t("lib.age.7-9") },
            { value: "10-12", label: t("lib.age.10-12") },
          ]}
        />
        <button
          type="button"
          onClick={() => set("favouritesOnly", !filters.favouritesOnly)}
          aria-pressed={filters.favouritesOnly}
          className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
            filters.favouritesOnly
              ? "border-coral bg-coral-soft text-[#9c2f2f]"
              : "border-line bg-card text-muted hover:text-foreground"
          }`}
        >
          <Heart className={`size-4 ${filters.favouritesOnly ? "fill-coral text-coral" : ""}`} aria-hidden />
          {t("lib.favouritesOnly")}
        </button>
      </div>
    </div>
  );
}
