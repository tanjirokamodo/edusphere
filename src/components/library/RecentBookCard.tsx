"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { findAuthor, findBook } from "@/data/books";
import { useLanguage } from "@/lib/language";
import type { HistoryEntry } from "@/types";
import { BookCover } from "./BookCover";

/** Compact "continue reading" card driven by a reading-history entry. */
export function RecentBookCard({ entry }: { entry: HistoryEntry }) {
  const { lang, t } = useLanguage();
  const book = findBook(entry.bookId);
  if (!book) return null;

  const pct = Math.round((entry.lastPage / entry.totalPages) * 100);

  return (
    <article className="flex gap-4 rounded-2xl border border-line bg-card p-4 shadow-card">
      <div className="w-20 shrink-0">
        <BookCover book={book} compact />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{book.title[lang]}</h3>
        <p className="mt-0.5 truncate text-xs text-muted">{findAuthor(book.authorId)?.name}</p>
        <div className="mt-3 flex items-center gap-2">
          <ProgressBar value={pct} label={`${t("reader.progress")}: ${book.title.en}`} />
          <span className="shrink-0 text-xs font-semibold">{pct}%</span>
        </div>
        <p className="mt-1 text-xs text-muted">
          {t("reader.page")} {entry.lastPage} {t("quiz.of")} {entry.totalPages}
        </p>
        <Link
          href={`/student/reader/${book.id}`}
          className="mt-auto inline-flex min-h-10 items-center self-start text-sm font-semibold text-primary hover:underline"
        >
          {t("lib.continue")}
        </Link>
      </div>
    </article>
  );
}
