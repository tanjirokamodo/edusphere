"use client";

import { useState } from "react";
import { OptionRow } from "@/components/labs/OptionRow";
import type { Classmate } from "@/data/chess-roster";
import type { Color } from "@/chess/types";
import { useLanguage } from "@/lib/language";

/** Pick who is sitting next to you and which colour you play. Both play on this device. */
export function MatchSetup({
  classmates,
  initialOpponent,
  onStart,
  onCancel,
}: {
  classmates: Classmate[];
  initialOpponent: string;
  onStart: (opponentId: string, myColor: Color) => void;
  onCancel: () => void;
}) {
  const { t } = useLanguage();
  const [opponent, setOpponent] = useState(initialOpponent);
  const [colour, setColour] = useState<Color>("w");

  return (
    <section aria-label={t("chess.setup.title")} className="animate-fade rounded-2xl border border-line bg-card p-4 shadow-card sm:p-5">
      <h3 className="text-base font-bold">{t("chess.setup.title")}</h3>
      <div className="mt-4 space-y-4">
        <OptionRow<string>
          label={t("chess.setup.opponent")}
          value={opponent}
          onChange={setOpponent}
          options={classmates.map((c) => ({ value: c.id, label: c.name }))}
        />
        <OptionRow<Color>
          label={t("chess.setup.colour")}
          value={colour}
          onChange={setColour}
          options={[
            { value: "w", label: t("chess.white") },
            { value: "b", label: t("chess.black") },
          ]}
        />
      </div>
      <p className="mt-3 text-xs text-muted">{t("chess.setup.note")}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onStart(opponent, colour)}
          className="min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
        >
          {t("chess.start")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-full border border-line bg-card px-5 text-sm font-semibold hover:border-primary/50"
        >
          {t("chess.cancel")}
        </button>
      </div>
    </section>
  );
}
