"use client";

import { Info } from "lucide-react";
import { Avatar } from "./players";
import type { Classmate } from "@/data/chess-roster";
import { useLanguage } from "@/lib/language";

/**
 * DEMO ONLY. Shows what inviting a classmate would look like. It sends
 * nothing and starts no live match: that needs a school server and a
 * real-time connection (see src/chess/transport.ts).
 */
export function ChallengePreview({
  classmate,
  onPlayHere,
  onClose,
}: {
  classmate: Classmate;
  onPlayHere: () => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const steps = ["chess.preview.step1", "chess.preview.step2", "chess.preview.step3", "chess.preview.step4"] as const;

  return (
    <section
      aria-label={t("chess.preview.title")}
      className="animate-fade rounded-2xl border-2 border-dashed border-primary bg-primary-soft p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Avatar initials={classmate.initials} tone={classmate.tone} />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold">
            {t("chess.preview.title")}: {classmate.name}
          </h3>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-foreground">{t("chess.preview.demo")}</span>
      </div>

      <ol className="mt-4 space-y-2">
        {steps.map((key, i) => (
          <li key={key} className="flex items-start gap-3 text-sm">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-primary">{i + 1}</span>
            <span className={i === 0 ? "font-semibold" : "text-muted"}>{t(key)}</span>
          </li>
        ))}
      </ol>

      <p className="mt-4 flex items-start gap-2 rounded-xl bg-white/70 p-3 text-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        {t("chess.preview.notSent")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onPlayHere}
          className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90"
        >
          {t("chess.preview.playHere")}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-full border border-line bg-card px-5 text-sm font-semibold hover:border-primary/50"
        >
          {t("chess.preview.close")}
        </button>
      </div>
    </section>
  );
}
