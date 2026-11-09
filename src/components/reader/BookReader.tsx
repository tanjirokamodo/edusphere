"use client";

import Link from "next/link";
import { BookX } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { findBook } from "@/data/books";
import { useLanguage } from "@/lib/language";
import { ReaderView } from "./ReaderView";

/** Resolves a book id from the route and shows the reader, or a clear not-found state. */
export function BookReader({ bookId }: { bookId: string }) {
  const { t } = useLanguage();
  const book = findBook(bookId);

  if (!book) {
    return (
      <EmptyState
        icon={BookX}
        title={t("reader.notFound")}
        description={t("reader.notFoundBody")}
        action={
          <Link
            href="/student/library"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {t("reader.browse")}
          </Link>
        }
      />
    );
  }

  return <ReaderView book={book} />;
}
