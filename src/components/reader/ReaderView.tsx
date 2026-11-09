"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";
import {
  ArrowLeft,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  Minus,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { BookCover } from "@/components/library/BookCover";
import { Badge } from "@/components/ui/Badge";
import { findAuthor } from "@/data/books";
import { useLanguage } from "@/lib/language";
import {
  saveReadingPage,
  toggleBookmark,
  touchHistory,
  useBookmarks,
  useReadingHistory,
} from "@/lib/library";
import { FONT_STEPS, setFontStep, setReaderTheme, useReaderPrefs, type ReaderTheme } from "@/lib/reader-prefs";
import { getReaderPages, readingLanguage } from "@/lib/reader-pages";
import { useStudent } from "@/lib/student";
import { useFullscreen } from "@/lib/use-fullscreen";
import type { Book } from "@/types";

const bodySize = ["text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];
const headingSize = ["text-xl", "text-2xl", "text-2xl", "text-3xl", "text-4xl"];

const themes: Record<ReaderTheme, { shell: string; muted: string; track: string; chip: string; panel: string; line: string }> = {
  light: {
    shell: "bg-white text-foreground border-line",
    muted: "text-muted",
    track: "bg-line",
    chip: "bg-background text-foreground hover:bg-primary-soft",
    panel: "bg-background",
    line: "border-line",
  },
  dark: {
    shell: "bg-[#171b30] text-[#e9ebf7] border-white/10",
    muted: "text-[#a7adc9]",
    track: "bg-white/15",
    chip: "bg-white/10 text-[#e9ebf7] hover:bg-white/20",
    panel: "bg-white/5",
    line: "border-white/10",
  },
};

function IconButton({
  label,
  onClick,
  pressed,
  disabled,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      disabled={disabled}
      className={`grid size-11 place-items-center rounded-full transition-colors disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Demo e-book reader. It renders ORIGINAL sample pages from local data; no PDF
 * or e-book file is loaded. Progress, bookmarks and history are saved in
 * localStorage per student.
 */
export function ReaderView({ book }: { book: Book }) {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const prefs = useReaderPrefs();
  const th = themes[prefs.theme];
  const bookmarks = useBookmarks(student.id, book.id);
  const { entries } = useReadingHistory(student.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreen = useFullscreen(containerRef);

  const readLang = readingLanguage(book, lang);
  const aboutHeading = t("reader.aboutHeading");
  const noteHeading = t("reader.noteHeading");
  const noteBody = t("reader.noteBody");
  const { pages } = useMemo(
    () => getReaderPages(book, readLang, { aboutHeading, noteHeading, noteBody }),
    [book, readLang, aboutHeading, noteHeading, noteBody],
  );
  const total = pages.length;
  const author = findAuthor(book.authorId);

  // Single source of truth for the current page is the saved reading history.
  const saved = entries.find((e) => e.bookId === book.id);
  const page = Math.min(Math.max(saved?.lastPage ?? 1, 1), total);
  const current = pages[page - 1];
  const pct = Math.round((page / total) * 100);
  const bookmarked = bookmarks.includes(page);

  useEffect(() => {
    touchHistory(student.id, book.id, total);
  }, [student.id, book.id, total]);

  const go = useCallback(
    (next: number) => saveReadingPage(student.id, book.id, Math.min(Math.max(next, 1), total), total),
    [student.id, book.id, total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page]);

  const about = (
    <div className="space-y-4">
      <div className="mx-auto w-32 lg:w-40">
        <BookCover book={book} />
      </div>
      <div className="flex flex-wrap gap-1.5">
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
      <p className={`text-sm leading-relaxed ${th.muted}`}>{book.description[lang]}</p>
      {readLang !== lang && (
        <p className={`text-xs ${th.muted}`}>
          {t("reader.shownIn")} {t(readLang === "en" ? "lang.en" : "lang.te")}
        </p>
      )}
      <div>
        <h2 className="text-sm font-semibold">{t("reader.bookmarks")}</h2>
        {bookmarks.length === 0 ? (
          <p className={`mt-1 text-xs ${th.muted}`}>{t("reader.noBookmarks")}</p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-2">
            {bookmarks.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => go(p)}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold ${th.chip}`}
                >
                  <Bookmark className="size-4 fill-accent text-accent" aria-hidden />
                  {t("reader.page")} {p}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col border shadow-card ${th.shell} ${
        fullscreen.active ? "h-full overflow-y-auto" : "rounded-3xl"
      }`}
    >
      {/* toolbar */}
      <header className={`flex flex-wrap items-center gap-2 border-b p-3 sm:p-4 ${th.line}`}>
        <Link
          href="/student/library"
          aria-label={t("reader.backToLibrary")}
          title={t("reader.backToLibrary")}
          className={`grid size-11 place-items-center rounded-full ${th.chip}`}
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <div className="min-w-0 flex-1 basis-40">
          <h1 className="truncate text-base font-bold sm:text-lg">{book.title[lang]}</h1>
          <p className={`truncate text-xs ${th.muted}`}>
            {t("lib.by")} {author?.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={t("reader.settings")}>
          <IconButton
            label={bookmarked ? t("reader.removeBookmark") : t("reader.bookmarkPage")}
            pressed={bookmarked}
            onClick={() => toggleBookmark(student.id, book.id, page)}
            className={th.chip}
          >
            <Bookmark className={`size-5 ${bookmarked ? "fill-accent text-accent" : ""}`} aria-hidden />
          </IconButton>
          <IconButton
            label={t("reader.fontSmaller")}
            onClick={() => setFontStep(prefs.fontStep - 1)}
            disabled={prefs.fontStep <= 0}
            className={th.chip}
          >
            <Minus className="size-5" aria-hidden />
          </IconButton>
          <IconButton
            label={t("reader.fontLarger")}
            onClick={() => setFontStep(prefs.fontStep + 1)}
            disabled={prefs.fontStep >= FONT_STEPS - 1}
            className={th.chip}
          >
            <Plus className="size-5" aria-hidden />
          </IconButton>
          <IconButton
            label={prefs.theme === "light" ? t("reader.darkMode") : t("reader.lightMode")}
            onClick={() => setReaderTheme(prefs.theme === "light" ? "dark" : "light")}
            className={th.chip}
          >
            {prefs.theme === "light" ? <Moon className="size-5" aria-hidden /> : <Sun className="size-5" aria-hidden />}
          </IconButton>
          <IconButton
            label={fullscreen.active ? t("reader.exitFullscreen") : t("reader.fullscreen")}
            onClick={fullscreen.toggle}
            disabled={!fullscreen.supported}
            className={th.chip}
          >
            {fullscreen.active ? <Minimize2 className="size-5" aria-hidden /> : <Maximize2 className="size-5" aria-hidden />}
          </IconButton>
        </div>
      </header>

      <p className={`flex items-start gap-2 px-4 py-2 text-xs ${th.panel} ${th.muted}`}>
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        {t("reader.sampleNotice")}
      </p>

      <div className="grid flex-1 lg:grid-cols-[17rem_1fr]">
        {/* about: always visible on large screens, collapsible below */}
        <aside className={`hidden border-r p-5 lg:block ${th.line}`}>{about}</aside>
        <details className={`border-b p-4 lg:hidden ${th.line}`}>
          <summary className="min-h-10 cursor-pointer text-sm font-semibold">{t("reader.about")}</summary>
          <div className="pt-4">{about}</div>
        </details>

        <section className="flex min-w-0 flex-col">
          <article
            key={`${page}-${readLang}`}
            className="animate-fade mx-auto w-full max-w-2xl flex-1 px-5 py-8 sm:px-10 sm:py-12"
            lang={readLang}
          >
            <p className={`text-sm font-semibold ${th.muted}`}>
              {t("reader.page")} {page} {t("quiz.of")} {total}
            </p>
            {current.heading && (
              <h2 className={`mt-2 font-bold leading-snug ${headingSize[prefs.fontStep]}`}>{current.heading}</h2>
            )}
            <div className={`mt-5 space-y-5 ${bodySize[prefs.fontStep]} ${readLang === "te" ? "leading-[2]" : "leading-relaxed"}`}>
              {current.paragraphs.filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>

          {/* progress and page navigation */}
          <footer className={`border-t p-4 sm:p-5 ${th.line}`}>
            <div className="flex items-center gap-3">
              <div
                role="progressbar"
                aria-label={t("reader.progress")}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                className={`h-2 flex-1 overflow-hidden rounded-full ${th.track}`}
              >
                <div className="h-full rounded-full bg-secondary transition-[width] duration-300" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-10 text-right text-sm font-semibold">{pct}%</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(page - 1)}
                disabled={page <= 1}
                aria-label={t("reader.prev")}
                className={`inline-flex min-h-12 items-center gap-1 rounded-full px-4 text-sm font-semibold disabled:opacity-40 ${th.chip}`}
              >
                <ChevronLeft className="size-5" aria-hidden />
                <span className="hidden sm:inline">{t("reader.prev")}</span>
              </button>

              <label className="flex flex-1 flex-col items-center gap-1 text-xs">
                <span className={th.muted}>
                  {t("reader.jumpToPage")}: {page} / {total}
                </span>
                <input
                  type="range"
                  min={1}
                  max={total}
                  value={page}
                  onChange={(e) => go(Number(e.target.value))}
                  className="h-6 w-full accent-primary"
                />
              </label>

              <button
                type="button"
                onClick={() => go(page + 1)}
                disabled={page >= total}
                aria-label={t("reader.next")}
                className="inline-flex min-h-12 items-center gap-1 rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-40"
              >
                <span className="hidden sm:inline">{t("reader.next")}</span>
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
