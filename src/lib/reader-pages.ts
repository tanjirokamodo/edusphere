import { findAuthor } from "@/data/books";
import { sampleContent } from "@/data/reader-content";
import type { Book, Language, ReaderPage } from "@/types";

/** Language the reader displays: the UI language if the book has it, otherwise the book's own. */
export function readingLanguage(book: Book, uiLang: Language): Language {
  return book.languages.includes(uiLang) ? uiLang : book.languages[0];
}

/**
 * Pages for the demo reader. Books with bespoke sample text use it; every other
 * book gets an honest two-page sample (description plus a "sample edition" note).
 */
export function getReaderPages(
  book: Book,
  lang: Language,
  fallback: { aboutHeading: string; noteHeading: string; noteBody: string },
): { pages: ReaderPage[]; isBespoke: boolean } {
  const bespoke = sampleContent[book.id]?.[lang];
  if (bespoke) return { pages: bespoke, isBespoke: true };

  const author = findAuthor(book.authorId)?.name ?? "";
  return {
    isBespoke: false,
    pages: [
      { heading: fallback.aboutHeading, paragraphs: [book.description[lang], author] },
      { heading: fallback.noteHeading, paragraphs: [fallback.noteBody] },
    ],
  };
}
