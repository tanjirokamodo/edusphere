"use client";

import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Newspaper,
  PlayCircle,
  Puzzle,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { toneClasses } from "@/components/ui/tone";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import type { ContentItem, ContentKind } from "@/types";

const kindIcon: Record<ContentKind, LucideIcon> = {
  book: BookOpen,
  video: PlayCircle,
  lab: FlaskConical,
  activity: Puzzle,
  journal: Newspaper,
};

const kindLabel: Record<ContentKind, TranslationKey> = {
  book: "kindOne.book",
  video: "kindOne.video",
  lab: "kindOne.lab",
  activity: "kindOne.activity",
  journal: "kindOne.journal",
};

/** Reusable tile for any piece of learning content (book, video, lab, activity, journal). */
export function ContentCard({ item }: { item: ContentItem }) {
  const { lang, t } = useLanguage();
  const Icon = kindIcon[item.kind];
  const tone = toneClasses[item.tone];

  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className={`flex h-24 items-center justify-center ${tone.bg} ${tone.fg}`}>
        <Icon className="size-10 transition-transform duration-200 group-hover:scale-110" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold text-muted">
          {t(kindLabel[item.kind])} · {item.subject}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">{item.title[lang]}</h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-xs text-muted">{item.meta[lang]}</span>
          <Badge variant="info">{item.language}</Badge>
        </div>
      </div>
    </Link>
  );
}
