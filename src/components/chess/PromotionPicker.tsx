"use client";

import type { PromotionPiece } from "@/chess/types";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";

const choices: { piece: PromotionPiece; glyph: { w: string; b: string }; key: TranslationKey }[] = [
  { piece: "q", glyph: { w: "♕", b: "♛" }, key: "chess.queen" },
  { piece: "r", glyph: { w: "♖", b: "♜" }, key: "chess.rook" },
  { piece: "b", glyph: { w: "♗", b: "♝" }, key: "chess.bishop" },
  { piece: "n", glyph: { w: "♘", b: "♞" }, key: "chess.knight" },
];

/** Shown when a pawn reaches the last row: the student picks the new piece. */
export function PromotionPicker({
  side,
  onPick,
  onCancel,
}: {
  side: "w" | "b";
  onPick: (piece: PromotionPiece) => void;
  onCancel: () => void;
}) {
  const { t } = useLanguage();
  return (
    <div
      role="dialog"
      aria-label={t("chess.promote")}
      className="animate-pop rounded-2xl border-2 border-primary bg-card p-4 shadow-card"
    >
      <p className="text-sm font-semibold">{t("chess.promote")}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {choices.map((c) => (
          <button
            key={c.piece}
            type="button"
            onClick={() => onPick(c.piece)}
            className="flex min-h-16 flex-col items-center justify-center rounded-xl border-2 border-line bg-background px-2 py-1 hover:border-primary"
          >
            <span className="text-3xl leading-none" aria-hidden>
              {c.glyph[side]}
            </span>
            <span className="mt-1 text-xs font-semibold">{t(c.key)}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="mt-3 min-h-10 rounded-full px-4 text-sm font-semibold text-muted hover:text-foreground"
      >
        {t("chess.cancel")}
      </button>
    </div>
  );
}
