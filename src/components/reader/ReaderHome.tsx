"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { RecentBookCard } from "@/components/library/RecentBookCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { findBook } from "@/data/books";
import { useLanguage } from "@/lib/language";
import { useReadingHistory } from "@/lib/library";
import { useStudent } from "@/lib/student";

/** /student/reader: pick up where you left off, from the saved reading history. */
export function ReaderHome() {
  const { t } = useLanguage();
  const student = useStudent();
  const { entries, loaded } = useReadingHistory(student.id);
  const history = entries.filter((e) => findBook(e.bookId));

  return (
    <>
      <PageHeader title={t("nav.reader")} subtitle={t("reader.history")} />

      {!loaded ? (
        <div role="status" aria-label={t("reader.loading")} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-line bg-card" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={t("reader.historyEmptyTitle")}
          description={t("reader.historyEmpty")}
          action={
            <Link
              href="/student/library"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {t("reader.browse")}
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {history.map((h) => (
            <RecentBookCard key={h.bookId} entry={h} />
          ))}
        </div>
      )}
    </>
  );
}
