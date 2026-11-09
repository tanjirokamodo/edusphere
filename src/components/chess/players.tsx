"use client";

import { toneClasses } from "@/components/ui/tone";
import { findClassmate } from "@/data/chess-roster";
import { useLanguage } from "@/lib/language";
import type { PlayerRef } from "@/chess/types";
import type { ToneKey } from "@/types";

/** Round initials badge. Sample classmates have no photos: initials only. */
export function Avatar({ initials, tone, size = "md" }: { initials: string; tone: ToneKey; size?: "sm" | "md" | "lg" }) {
  const t = toneClasses[tone];
  const dims = size === "sm" ? "size-8 text-xs" : size === "lg" ? "size-14 text-lg" : "size-11 text-sm";
  return (
    <span className={`grid shrink-0 place-items-center rounded-full font-bold ${dims} ${t.bg} ${t.fg}`} aria-hidden>
      {initials}
    </span>
  );
}

/** Practice games use two placeholder players whose names follow the language. */
export function usePlayerName() {
  const { t } = useLanguage();
  return (p: PlayerRef) => {
    if (p.id === "practice-w") return t("chess.white");
    if (p.id === "practice-b") return t("chess.black");
    return p.name;
  };
}

export function toneFor(p: PlayerRef): ToneKey {
  return findClassmate(p.id)?.tone ?? "indigo";
}
