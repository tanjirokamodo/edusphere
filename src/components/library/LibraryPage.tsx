"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Info, SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { books, collections, findAuthor } from "@/data/books";
import { useFavourites, useReadingHistory } from "@/lib/library";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import type { Book } from "@/types";
import { BookCard } from "./BookCard";
import { BookDetailsDialog } from "./BookDetailsDialog";
import { CollectionCards } from "./CollectionCards";
import { defaultFilters, FilterBar, type LibraryFilters } from "./FilterBar";
import { RecentBookCard } from "./RecentBookCard";

const gridClass = "grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 min-[1360px]:grid-cols-4";

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {note && <span className="text-sm text-muted" aria-live="polite">{note}</span>}
      </div>
      {children}
    </section>
  );
}

function SkeletonGrid() {
  return (
    <div className={gridClass} role="status" aria-label="Loading">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="h-96 animate-pulse rounded-2xl border border-line bg-card" />
      ))}
    </div>
  );
}

export function LibraryPage() {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { ids: favouriteIds, loaded } = useFavourites(student.id);
  const { entries: history } = useReadingHistory(student.id);

  const [filters, setFilters] = useState<LibraryFilters>(defaultFilters);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [detailsBook, setDetailsBook] = useState<Book | null>(null);

  const hasFilters =
    filters.query.trim() !== "" ||
    filters.subject !== "all" ||
    filters.language !== "all" ||
    filters.age !== "all" ||
    filters.favouritesOnly ||
    collectionId !== null;

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const inCollection = collections.find((c) => c.id === collectionId)?.bookIds;
    return books
      .filter((b) => {
        if (filters.subject !== "all" && b.subject !== filters.subject) return false;
        if (filters.language !== "all" && !b.languages.includes(filters.language)) return false;
        if (filters.age !== "all" && !b.bands.includes(filters.age)) return false;
        if (filters.favouritesOnly && !favouriteIds.includes(b.id)) return false;
        if (inCollection && !inCollection.includes(b.id)) return false;
        if (q) {
          const author = findAuthor(b.authorId)?.name ?? "";
          const haystack = `${b.title.en} ${b.title.te} ${author}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.popularity - a.popularity);
  }, [filters, collectionId, favouriteIds]);

  const popular = useMemo(() => [...books].sort((a, b) => b.popularity - a.popularity).slice(0, 4), []);
  const recent = history.filter((h) => books.some((b) => b.id === h.bookId)).slice(0, 3);

  const clearAll = () => {
    setFilters(defaultFilters);
    setCollectionId(null);
  };

  return (
    <>
      <PageHeader title={t("nav.library")} subtitle={t("lib.subtitle")} />
      <p className="-mt-3 mb-6 flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-xs text-[#6b4700] sm:text-sm">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t("lib.demoNote")}
      </p>

      <FilterBar filters={filters} onChange={setFilters} />

      <div className="mt-8 space-y-10">
        <Section title={t("lib.collections")}>
          <CollectionCards activeId={collectionId} onSelect={setCollectionId} />
        </Section>

        {!hasFilters && recent.length > 0 && (
          <Section title={t("lib.recent")}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recent.map((h) => (
                <RecentBookCard key={h.bookId} entry={h} />
              ))}
            </div>
          </Section>
        )}

        {!hasFilters && (
          <Section title={t("lib.popular")}>
            {loaded ? (
              /* the 4th card only fits the 4-column layout; hide it at 3 columns so no card is orphaned */
              <div className={`${gridClass} lg:max-[1359px]:[&>*:nth-child(4)]:hidden`}>
                {popular.map((b) => (
                  <BookCard key={b.id} book={b} onDetails={setDetailsBook} />
                ))}
              </div>
            ) : (
              <SkeletonGrid />
            )}
          </Section>
        )}

        <Section
          title={t("lib.allBooks")}
          note={`${results.length} ${hasFilters ? t("lib.booksFound") : t("lib.books")}`}
        >
          {hasFilters && collectionId && (
            <p className="mb-4 text-sm text-muted">
              {collections.find((c) => c.id === collectionId)?.title[lang]}
            </p>
          )}
          {!loaded ? (
            <SkeletonGrid />
          ) : results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={t("lib.noResults")}
              description={t("lib.noResultsBody")}
              action={
                <button
                  type="button"
                  onClick={clearAll}
                  className="min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  {t("lib.clear")}
                </button>
              }
            />
          ) : (
            <div className={gridClass}>
              {results.map((b) => (
                <BookCard key={b.id} book={b} onDetails={setDetailsBook} />
              ))}
            </div>
          )}
          {hasFilters && results.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 min-h-10 rounded-full border border-line bg-card px-5 text-sm font-semibold text-muted hover:text-foreground"
            >
              {t("lib.clear")}
            </button>
          )}
        </Section>
      </div>

      <BookDetailsDialog book={detailsBook} onClose={() => setDetailsBook(null)} />
    </>
  );
}
