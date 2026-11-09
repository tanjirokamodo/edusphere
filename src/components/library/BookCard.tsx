"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { findAuthor } from "@/data/books";
import { offlineItemForBook } from "@/data/offline-items";
import { useLanguage } from "@/lib/language";
import type { Book } from "@/types";
import { BookCover } from "./BookCover";
import { DownloadButton } from "./DownloadButton";
import { FavouriteButton } from "./FavouriteButton";

interface BookCardProps {
  book: Book;
  onDetails: (book: Book) => void;
}

/** Library tile: cover, title, author, badges, short description and actions. */
export function BookCard({ book, onDetails }: BookCardProps) {
  const { lang, t } = useLanguage();
  const author = findAuthor(book.authorId);
  const offlineItem = offlineItemForBook(book.id);

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-card p-4 shadow-card transition-shadow duration-200 hover:shadow-[0_8px_24px_rgb(32_40_68/0.12)]">
      <div className="relative mx-auto w-full max-w-[11rem]">
        <BookCover book={book} />
        <FavouriteButton bookId={book.id} className="absolute right-2 top-2" />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug">{book.title[lang]}</h3>
        <p className="mt-0.5 text-sm text-muted">
          {t("lib.by")} {author?.name}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {book.languages.map((l) => (
            <Badge key={l} variant="info">
              {t(l === "en" ? "lang.en" : "lang.te")}
            </Badge>
          ))}
          {book.bands.map((b) => (
            <Badge key={b} variant="neutral">
              {t(b === "7-9" ? "lib.age.7-9" : "lib.age.10-12")}
            </Badge>
          ))}
        </div>

        <p className="mt-3 line-clamp-3 text-sm text-muted">{book.description[lang]}</p>

        <button
          type="button"
          onClick={() => onDetails(book)}
          className="mt-2 self-start text-sm font-semibold text-primary hover:underline"
        >
          {t("lib.details")}
        </button>

        <div className="mt-auto flex flex-wrap items-start gap-2 pt-4">
          <Link
            href={`/student/reader/${book.id}`}
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            {t("lib.read")}
          </Link>
          {offlineItem && <DownloadButton item={offlineItem} compact />}
        </div>
      </div>
    </article>
  );
}
