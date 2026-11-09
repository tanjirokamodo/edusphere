"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, FlipVertical2, Flag, RotateCcw, Plus, Trophy } from "lucide-react";
import { checkedKingSquare, legalTargets, needsPromotion, replay } from "@/chess/engine";
import { recordFor, recordGame } from "@/chess/stats";
import type { ChessTransport } from "@/chess/transport";
import type { Color, MatchSnapshot, PromotionPiece } from "@/chess/types";
import { Card } from "@/components/ui/Card";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { ChessBoard } from "./ChessBoard";
import { MoveHistory } from "./MoveHistory";
import { Avatar, toneFor, usePlayerName } from "./players";
import { PromotionPicker } from "./PromotionPicker";

type Confirm = "resign" | "restart" | "new" | null;

function statusKey(snap: MatchSnapshot, turn: Color, inCheck: boolean): TranslationKey {
  const o = snap.outcome;
  if (o) {
    switch (o.reason) {
      case "checkmate":
        return o.winner === "w" ? "chess.winsWhite" : "chess.winsBlack";
      case "resignation":
        return o.winner === "w" ? "chess.resignedBlack" : "chess.resignedWhite";
      case "stalemate":
        return "chess.stalemate";
      case "insufficient":
        return "chess.draw.insufficient";
      case "threefold":
        return "chess.draw.threefold";
      case "fifty":
        return "chess.draw.fifty";
      default:
        return "chess.draw.other";
    }
  }
  if (inCheck) return turn === "w" ? "chess.checkWhite" : "chess.checkBlack";
  return turn === "w" ? "chess.whiteTurn" : "chess.blackTurn";
}

/**
 * One chess game. All moves go through the ChessTransport and the screen is
 * drawn from the snapshot it returns, so replacing the local demo transport
 * with a real server later does not change this screen.
 */
export function ChessGame({
  transport,
  initial,
  studentId,
  onBackToLobby,
  onRematch,
}: {
  transport: ChessTransport;
  initial: MatchSnapshot;
  studentId: string;
  onBackToLobby: () => void;
  /** Start another game with the same two players. `swap` swaps the colours. */
  onRematch: (swap: boolean) => void;
}) {
  const { t } = useLanguage();
  const nameOf = usePlayerName();
  const [snap, setSnap] = useState(initial);
  const [selected, setSelected] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [promotion, setPromotion] = useState<{ from: string; to: string } | null>(null);
  const [notice, setNotice] = useState<"illegal" | "saved" | null>(null);
  const [confirm, setConfirm] = useState<Confirm>(null);

  // an armed two-step button disarms itself after a few seconds
  useEffect(() => {
    if (!confirm) return;
    const id = setTimeout(() => setConfirm(null), 4000);
    return () => clearTimeout(id);
  }, [confirm]);

  const game = useMemo(() => replay(snap.moves), [snap.moves]);
  const turn = game.turn();
  const outcome = snap.outcome;
  const over = outcome !== null;
  const targets = useMemo(() => (selected && !over ? legalTargets(game, selected) : []), [game, selected, over]);
  const lastMove = snap.moves.length ? snap.moves[snap.moves.length - 1] : null;
  const inCheck = !over || outcome?.reason === "checkmate" ? game.isCheck() : false;
  const checkSquare = inCheck ? checkedKingSquare(game) : null;

  useEffect(() => {
    return transport.subscribe(snap.id, {
      onMove: (next) => {
        setSnap(next);
        setSelected(null);
        setNotice(null);
      },
      onEnd: (next) => {
        setSnap(next);
        setSelected(null);
        const record = recordFor(next, studentId);
        if (record && recordGame(studentId, record)) setNotice("saved");
      },
    });
  }, [transport, snap.id, studentId]);

  const send = (from: string, to: string, promo?: PromotionPiece) => {
    void transport.sendMove(snap.id, { from, to, promotion: promo, expectedPly: snap.moves.length }).then((r) => {
      if (!r.ok && r.reason === "illegal") setNotice("illegal");
    });
  };

  const tryMove = (from: string, to: string): boolean => {
    if (over || promotion) return false;
    if (!legalTargets(game, from).some((x) => x.to === to)) {
      setNotice("illegal");
      return false;
    }
    if (needsPromotion(game, from, to)) {
      setPromotion({ from, to });
      return false; // the pawn waits until a piece is chosen
    }
    send(from, to);
    return true;
  };

  const onSquareClick = (square: string, pieceType: string | null) => {
    if (over || promotion) return;
    if (selected && targets.some((x) => x.to === square)) {
      tryMove(selected, square);
      setSelected(null);
      return;
    }
    if (pieceType && pieceType[0] === turn) {
      setSelected(selected === square ? null : square);
      setNotice(null);
      return;
    }
    if (selected && square !== selected) setNotice("illegal");
    setSelected(null);
  };

  const players = snap.players;
  const started = snap.moves.length > 0;
  const askFirst = (kind: Exclude<Confirm, null>, action: () => void) => {
    if (kind !== "resign" && (over || !started)) return action();
    if (confirm === kind) {
      setConfirm(null);
      return action();
    }
    setConfirm(kind);
  };

  const side = (c: Color) => (
    <div
      className={`flex min-w-0 items-center gap-2.5 rounded-xl border-2 px-3 py-2 transition-colors ${
        !over && turn === c ? "border-primary bg-primary-soft" : "border-line bg-card"
      }`}
      aria-current={!over && turn === c ? "true" : undefined}
    >
      <Avatar initials={players[c].initials} tone={toneFor(players[c])} size="sm" />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{nameOf(players[c])}</span>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <span className={`inline-block size-3 rounded-full border border-line ${c === "w" ? "bg-white" : "bg-foreground"}`} aria-hidden />
          {t(c === "w" ? "chess.white" : "chess.black")}
        </span>
      </span>
    </div>
  );

  const message = t(statusKey(snap, turn, inCheck));
  const tone = over ? "bg-accent-soft text-[#6b4700]" : inCheck ? "bg-coral-soft text-[#9c2f2f]" : "bg-primary-soft text-primary";

  const controlClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold transition-colors hover:border-primary/50";
  const armed = "border-coral bg-coral text-white hover:bg-coral/90 hover:border-coral";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-4">
        <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-muted">
              {t("chess.match")} · {t(snap.mode === "practice" ? "chess.mode.practice" : "chess.mode.local")}
            </p>
            <h2 className="truncate text-lg font-bold">
              {nameOf(players.w)} {t("chess.vs")} {nameOf(players.b)}
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-3">
          {side("w")}
          {side("b")}
        </div>

        <ChessBoard
          fen={game.fen()}
          orientation={flipped ? "black" : "white"}
          turn={turn}
          interactive={!over && !promotion}
          selected={selected}
          targets={targets}
          lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
          checkSquare={checkSquare}
          label={`${t("chess.board")}. ${message}`}
          onSquareClick={onSquareClick}
          onDrop={tryMove}
        />

        {promotion && (
          <PromotionPicker
            side={turn}
            onCancel={() => setPromotion(null)}
            onPick={(piece) => {
              send(promotion.from, promotion.to, piece);
              setPromotion(null);
              setSelected(null);
            }}
          />
        )}

        <p className="text-center text-xs text-muted">{t("chess.hint")}</p>
      </div>

      <aside className="min-w-0 space-y-4 lg:self-start">
        <div className={`rounded-2xl px-4 py-3 ${tone}`} role="status" aria-live="polite">
          <p className="flex items-center gap-2 text-base font-bold">
            {over ? <Trophy className="size-5 shrink-0" aria-hidden /> : null}
            {message}
          </p>
          {over && outcome?.reason === "checkmate" && <p className="mt-0.5 text-sm font-medium">{t("chess.checkmate")}</p>}
          {notice === "illegal" && !over && (
            <p className="mt-1 flex items-start gap-1.5 text-sm font-medium text-[#9c2f2f]">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t("chess.illegal")}
            </p>
          )}
          {over && notice === "saved" && (
            <p className="mt-1 flex items-start gap-1.5 text-sm font-medium text-[#0b7a6e]">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t("chess.saved")}
            </p>
          )}
          {over && snap.mode === "practice" && <p className="mt-1 text-sm">{t("chess.practiceNote")}</p>}
        </div>

        <Card title={t("chess.tab.game")}>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setFlipped((f) => !f)} className={controlClass}>
              <FlipVertical2 className="size-4" aria-hidden />
              {t("chess.flip")}
            </button>
            <button
              type="button"
              disabled={over}
              onClick={() => askFirst("resign", () => void transport.resign(snap.id, turn))}
              className={`${controlClass} disabled:opacity-40 ${confirm === "resign" ? armed : ""}`}
            >
              <Flag className="size-4" aria-hidden />
              {confirm === "resign" ? t("chess.resignConfirm") : t("chess.resign")}
            </button>
            <button
              type="button"
              onClick={() => askFirst("restart", () => onRematch(false))}
              className={`${controlClass} ${confirm === "restart" ? armed : ""}`}
            >
              <RotateCcw className="size-4" aria-hidden />
              {confirm === "restart" ? t("chess.restartConfirm") : t("chess.restart")}
            </button>
            <button
              type="button"
              onClick={() => askFirst("new", () => onRematch(true))}
              className={`${controlClass} ${confirm === "new" ? armed : ""}`}
            >
              <Plus className="size-4" aria-hidden />
              {confirm === "new" ? t("chess.restartConfirm") : t("chess.new")}
            </button>
          </div>
          <button
            type="button"
            onClick={onBackToLobby}
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("chess.backToLobby")}
          </button>
        </Card>

        <Card>
          <MoveHistory moves={snap.moves} />
        </Card>
      </aside>
    </div>
  );
}
