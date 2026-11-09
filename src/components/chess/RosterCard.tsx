"use client";

import type { Availability, Classmate } from "@/data/chess-roster";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { Avatar } from "./players";

const statusKey: Record<Availability, TranslationKey> = {
  available: "chess.status.available",
  inMatch: "chess.status.inMatch",
  away: "chess.status.away",
};

const dot: Record<Availability, string> = {
  available: "bg-secondary",
  inMatch: "bg-accent",
  away: "bg-line",
};

/** One sample classmate. The status is a fixed label, not a live "online" signal. */
export function RosterCard({
  classmate,
  grade,
  onChallenge,
}: {
  classmate: Classmate;
  grade: number;
  onChallenge: (c: Classmate) => void;
}) {
  const { t } = useLanguage();
  const canChallenge = classmate.availability === "available";

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3">
      <Avatar initials={classmate.initials} tone={classmate.tone} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{classmate.name}</p>
        <p className="text-xs text-muted">
          {t("chess.class")} {grade}-{classmate.section}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium">
          <span className={`size-2.5 rounded-full ${dot[classmate.availability]}`} aria-hidden />
          {t(statusKey[classmate.availability])}
        </p>
      </div>
      <button
        type="button"
        disabled={!canChallenge}
        onClick={() => onChallenge(classmate)}
        aria-label={`${t("chess.challenge")}: ${classmate.name}`}
        className="min-h-11 shrink-0 rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:bg-line disabled:text-muted"
      >
        {t("chess.challenge")}
      </button>
    </li>
  );
}
