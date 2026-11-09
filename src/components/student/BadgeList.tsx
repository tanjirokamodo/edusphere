"use client";

import { Award, BookOpen, Calculator, Flame, FlaskConical, Footprints, Mountain, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/language";
import type { BadgeDef } from "@/types";

const icons: Record<string, LucideIcon> = {
  "first-steps": Footprints,
  "quiz-climber": Mountain,
  bookworm: BookOpen,
  "number-ninja": Calculator,
  "curious-scientist": FlaskConical,
  "week-streak": Flame,
  "lab-explorer": FlaskConical,
  "junior-scientist": FlaskConical,
};

export function BadgeList({ badges }: { badges: BadgeDef[] }) {
  const { lang, t } = useLanguage();

  if (badges.length === 0) {
    return <p className="text-sm text-muted">{t("student.noBadges")}</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-1">
      {badges.map((b) => {
        const Icon = icons[b.id] ?? Award;
        return (
          <li key={b.id} className="flex items-center gap-3 rounded-xl bg-background p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-foreground">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{b.title[lang]}</span>
              <span className="block truncate text-xs text-muted">{b.description[lang]}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
