"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { findAuthor, subjectLabels } from "@/data/books";
import { offlineItemForBook } from "@/data/offline-items";
import { useLanguage } from "@/lib/language";
import type { Book } from "@/types";
import { BookCover } from "./BookCover";
import { DownloadButton } from "./DownloadButton";
import { FavouriteButton } from "./FavouriteButton";

/** Native <dialog>: focus trapping, Escape to close and a backdrop come for free. */
export function BookDetailsDialog({ book, onClose }: { book: Book | null; onClose: () => void }) {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (book && !dialog.open) dialog.showModal();
    if (!book && dialog.open) dialog.close();
  }, [book]);

  const author = book ? findAuthor(book.authorId) : undefined;
  const offlineItem = book ? offlineItemForBook(book.id) : undefined;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // click on the backdrop
      }}
      aria-label={book?.title[lang]}
      className="m-auto max-h-[90vh] w-[min(92vw,42rem)] overflow-y-auto rounded-3xl bg-card p-0 text-foreground shadow-[0_24px_60px_rgb(32_40_68/0.35)] backdrop:bg-foreground/50"
    >
      {book && (
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold leading-snug sm:text-2xl">{book.title[lang]}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("lib.close")}
              className="grid size-10 shrink-0 place-items-center rounded-full text-muted hover:bg-background"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-[10rem_1fr]">
            <div className="relative mx-auto w-40">
              <BookCover book={book} />
              <FavouriteButton bookId={book.id} className="absolute right-2 top-2" />
            </div>

            <div>
              <p className="text-sm text-muted">
                {t("lib.by")} <span className="font-semibold text-foreground">{author?.name}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">{book.description[lang]}</p>

              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted">{t("lib.subject")}</dt>
                <dd className="font-medium">{subjectLabels[book.subject][lang]}</dd>
                <dt className="text-muted">{t("lib.availableIn")}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {book.languages.map((l) => (
                    <Badge key={l} variant="info">
                      {t(l === "en" ? "lang.en" : "lang.te")}
                    </Badge>
                  ))}
                </dd>
                <dt className="text-muted">{t("lib.suitableFor")}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {book.bands.map((b) => (
                    <Badge key={b} variant="neutral">
                      {t(b === "7-9" ? "lib.age.7-9" : "lib.age.10-12")}
                    </Badge>
                  ))}
                </dd>
                <dt className="text-muted">{t("lib.pages")}</dt>
                <dd className="font-medium">{book.pages}</dd>
                <dt className="text-muted">{t("lib.size")}</dt>
                <dd className="font-medium">
                  {book.sizeMb} {t("offline.mb")}
                </dd>
              </dl>
            </div>
          </div>

          {author && (
            <div className="mt-6 rounded-2xl bg-background p-4">
              <h3 className="text-sm font-semibold">{t("lib.aboutAuthor")}</h3>
              <p className="mt-1 text-sm text-muted">
                <span className="font-medium text-foreground">{author.name}. </span>
                {author.bio[lang]}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-start gap-3">
            <Link
              href={`/student/reader/${book.id}`}
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {t("lib.read")}
            </Link>
            {offlineItem && <DownloadButton item={offlineItem} />}
          </div>
        </div>
      )}
    </dialog>
  );
}
