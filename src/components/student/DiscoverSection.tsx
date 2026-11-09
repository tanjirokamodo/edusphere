"use client";

import { useMemo, useState } from "react";
import { SearchX, Search } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { contentItems } from "@/data/content";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import type { AgeBand, ContentKind } from "@/types";
import { ContentCard } from "./ContentCard";

type Filter = "all" | ContentKind;

const filters: { value: Filter; labelKey: TranslationKey }[] = [
  { value: "all", labelKey: "kind.all" },
  { value: "book", labelKey: "kind.book" },
  { value: "video", labelKey: "kind.video" },
  { value: "lab", labelKey: "kind.lab" },
  { value: "activity", labelKey: "kind.activity" },
  { value: "journal", labelKey: "kind.journal" },
];

/** Content discovery: search plus type chips, limited to the student's age band. */
export function DiscoverSection({ band }: { band: AgeBand }) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const forBand = useMemo(() => contentItems.filter((i) => i.bands.includes(band)), [band]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forBand.filter((i) => {
      if (filter !== "all" && i.kind !== filter) return false;
      if (!q) return true;
      return (
        i.title[lang].toLowerCase().includes(q) ||
        i.title.en.toLowerCase().includes(q) ||
        i.subject.toLowerCase().includes(q)
      );
    });
  }, [forBand, query, filter, lang]);

  const countFor = (f: Filter) =>
    f === "all" ? forBand.length : forBand.filter((i) => i.kind === f).length;

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("student.search")}
          aria-label={t("student.search")}
          className="min-h-12 w-full rounded-full border border-line bg-card pl-12 pr-4 text-sm shadow-card placeholder:text-muted"
        />
      </div>

      <div role="group" aria-label={t("student.discover")} className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {filters
          .filter((f) => countFor(f.value) > 0)
          .map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "border border-line bg-card text-muted hover:text-foreground"
                }`}
              >
                {t(f.labelKey)} <span className="opacity-70">{countFor(f.value)}</span>
              </button>
            );
          })}
      </div>

      <div className="mt-5" aria-live="polite">
        {results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title={t("student.noResults")}
            description={t("student.noResultsBody")}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
            {results.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
