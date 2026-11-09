"use client";

import { useEffect, useRef } from "react";
import type { MoveRecord } from "@/chess/types";
import { useLanguage } from "@/lib/language";

/** Moves in standard notation, two per row (White then Black). Scrolls to the newest move. */
export function MoveHistory({ moves }: { moves: MoveRecord[] }) {
  const { t } = useLanguage();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [moves.length]);

  const rows = Array.from({ length: Math.ceil(moves.length / 2) }, (_, i) => ({
    n: i + 1,
    white: moves[i * 2]?.san,
    black: moves[i * 2 + 1]?.san,
  }));

  return (
    <div>
      <h3 className="text-sm font-semibold">{t("chess.history")}</h3>
      <div ref={box} className="mt-2 max-h-56 overflow-y-auto rounded-xl bg-background p-2 [scrollbar-width:thin]">
        {rows.length === 0 ? (
          <p className="p-2 text-sm text-muted">{t("chess.noMoves")}</p>
        ) : (
          <ol aria-label={t("chess.history")} className="space-y-0.5 text-sm tabular-nums">
            {rows.map((r) => (
              <li key={r.n} className="grid grid-cols-[2rem_1fr_1fr] gap-2 rounded-lg px-2 py-1 odd:bg-card">
                <span className="text-muted">{r.n}.</span>
                <span className="font-semibold">{r.white}</span>
                <span className="font-semibold">{r.black ?? ""}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <p className="mt-1 text-xs text-muted">{t("chess.notation")}</p>
    </div>
  );
}
