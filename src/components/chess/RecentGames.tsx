"use client";

import type { ChessGameRecord, GameResult } from "@/chess/stats";
import type { EndReason } from "@/chess/types";
import { formatWhen } from "@/components/offline/format";
import { Badge } from "@/components/ui/Badge";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";

const resultKey: Record<GameResult, TranslationKey> = {
  win: "chess.result.win",
  loss: "chess.result.loss",
  draw: "chess.result.draw",
};
const resultVariant = { win: "success", loss: "warning", draw: "neutral" } as const;

export function reasonKey(r: EndReason): TranslationKey {
  if (r === "checkmate") return "chess.reason.checkmate";
  if (r === "resignation") return "chess.reason.resignation";
  if (r === "stalemate") return "chess.reason.stalemate";
  return "chess.reason.draw";
}

/** Finished games from this device, newest first. */
export function RecentGames({ games, limit }: { games: ChessGameRecord[]; limit?: number }) {
  const { lang, t } = useLanguage();
  const list = limit ? games.slice(0, limit) : games;

  return (
    <ul className="divide-y divide-line">
      {list.map((g) => (
        <li key={g.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3 first:pt-0 last:pb-0">
          <Badge variant={resultVariant[g.result]}>{t(resultKey[g.result])}</Badge>
          <div className="min-w-0 flex-1 basis-40">
            <p className="truncate text-sm font-semibold">
              {t("chess.vs")} {g.opponentName}
            </p>
            <p className="text-xs text-muted">
              {t(g.myColor === "w" ? "chess.asWhite" : "chess.asBlack")} · {t(reasonKey(g.reason))} · {Math.ceil(g.plies / 2)} {t("chess.moves")}
            </p>
          </div>
          <span className="shrink-0 text-xs text-muted">{formatWhen(g.at, lang)}</span>
        </li>
      ))}
    </ul>
  );
}
