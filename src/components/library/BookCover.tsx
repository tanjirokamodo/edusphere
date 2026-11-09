"use client";

import { subjectLabels } from "@/data/books";
import { useLanguage } from "@/lib/language";
import type { Book, LibrarySubject, ToneKey } from "@/types";

/** Original gradient pairs (dark enough for white text). */
export const gradients: Record<ToneKey, [string, string]> = {
  indigo: ["#4338C4", "#6A5DEB"],
  teal: ["#0B7A6E", "#14A595"],
  amber: ["#A9680A", "#D98E14"],
  rose: ["#C24B4B", "#E86F6F"],
  sky: ["#2A6FB3", "#4C9BE0"],
};

/** Simple original geometric motif per subject, drawn on a 100×60 canvas. */
function Motif({ subject }: { subject: LibrarySubject }) {
  const common = { fill: "none", stroke: "white", strokeOpacity: 0.35, strokeWidth: 1.5 } as const;
  switch (subject) {
    case "mathematics":
      return (
        <g {...common}>
          <path d="M20 12v24M8 24h24" />
          <circle cx="68" cy="22" r="13" />
          <path d="M52 48l32 0" />
        </g>
      );
    case "science":
      return (
        <g {...common}>
          <circle cx="50" cy="30" r="6" fill="white" fillOpacity={0.35} />
          <ellipse cx="50" cy="30" rx="30" ry="11" />
          <ellipse cx="50" cy="30" rx="30" ry="11" transform="rotate(60 50 30)" />
        </g>
      );
    case "english":
      return (
        <g {...common}>
          <path d="M10 14h60M10 26h46M10 38h54M10 50h30" />
        </g>
      );
    case "telugu":
      return (
        <g {...common}>
          <circle cx="30" cy="30" r="14" />
          <circle cx="58" cy="30" r="14" />
          <circle cx="44" cy="30" r="4" fill="white" fillOpacity={0.35} />
        </g>
      );
    case "general-knowledge":
      return (
        <g {...common}>
          <circle cx="50" cy="30" r="22" />
          <ellipse cx="50" cy="30" rx="10" ry="22" />
          <path d="M28 30h44" />
        </g>
      );
    case "computer-science":
      return (
        <g {...common}>
          <path d="M26 14L12 30l14 16M64 14l14 16-14 16M54 12L36 48" />
        </g>
      );
    case "stories":
      return (
        <g {...common}>
          <circle cx="72" cy="18" r="9" fill="white" fillOpacity={0.3} />
          <path d="M0 52c14-16 28-16 42 0s28 16 42 0" />
          <path d="M0 42c14-14 28-14 42 0" />
        </g>
      );
  }
}

/** Placeholder cover artwork created for the demo; no third-party imagery. */
export function BookCover({
  book,
  className = "",
  compact = false,
}: {
  book: Book;
  className?: string;
  /** Small thumbnails: drop the subject line and shrink the title. */
  compact?: boolean;
}) {
  const { lang } = useLanguage();
  const [from, to] = gradients[book.tone];
  const title = book.title[lang];

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-xl text-white shadow-[0_6px_16px_rgb(32_40_68/0.22)] ${className}`}
      style={{ backgroundImage: `linear-gradient(145deg, ${from}, ${to})` }}
      role="img"
      aria-label={title}
    >
      {/* spine */}
      <span className="absolute inset-y-0 left-0 w-2 bg-black/20" aria-hidden />
      <svg viewBox="0 0 100 60" className="absolute inset-x-0 top-3 w-full" aria-hidden>
        <Motif subject={book.subject} />
      </svg>
      <div className={`absolute inset-x-0 bottom-0 ${compact ? "p-1.5 pl-3" : "p-3 pl-4"}`}>
        {!compact && (
          <p className="text-[0.65rem] font-semibold text-white/80">{subjectLabels[book.subject][lang]}</p>
        )}
        <p
          className={`font-bold leading-tight ${
            compact ? "line-clamp-4 text-[0.6rem]" : "mt-0.5 line-clamp-3 text-sm leading-snug"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
