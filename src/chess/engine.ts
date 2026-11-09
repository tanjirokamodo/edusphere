import { Chess } from "chess.js";
import type { Color, EndReason, Outcome, PromotionPiece } from "./types";

/*
 * Thin helpers around chess.js. Every rule (legal moves, check, checkmate,
 * stalemate, castling, en passant, promotion, draws) comes from chess.js; nothing
 * about chess is re-implemented here. This file is deliberately free of React
 * and of any "@/" imports so the rules can be checked on their own.
 */

export interface PlayedMove {
  from: string;
  to: string;
  promotion?: PromotionPiece;
}

/** Builds the game by playing the moves in order. Throws if one is illegal. */
export function replay(moves: PlayedMove[], fen?: string): Chess {
  const game = fen ? new Chess(fen) : new Chess();
  for (const m of moves) game.move({ from: m.from, to: m.to, promotion: m.promotion });
  return game;
}

export interface Target {
  to: string;
  capture: boolean;
}

/** Squares the piece on `from` may legally move to (empty when it is not that side's piece). */
export function legalTargets(game: Chess, from: string): Target[] {
  const seen = new Map<string, Target>();
  for (const m of game.moves({ square: from as never, verbose: true })) {
    seen.set(m.to, { to: m.to, capture: m.isCapture() || m.isEnPassant() });
  }
  return [...seen.values()];
}

/** True when moving `from` to `to` is a pawn promotion (the student must pick a piece). */
export function needsPromotion(game: Chess, from: string, to: string): boolean {
  return game
    .moves({ square: from as never, verbose: true })
    .some((m) => m.to === to && m.isPromotion());
}

export function isLegal(game: Chess, move: PlayedMove): boolean {
  return game
    .moves({ square: move.from as never, verbose: true })
    .some((m) => m.to === move.to && (m.promotion ?? undefined) === move.promotion);
}

const opposite = (c: Color): Color => (c === "w" ? "b" : "w");

/** Why the game ended, or null while it is still going. Resignation is handled by the match, not the board. */
export function outcomeOf(game: Chess): Outcome | null {
  if (game.isCheckmate()) return { winner: opposite(game.turn()), reason: "checkmate" };
  if (game.isStalemate()) return { winner: null, reason: "stalemate" };
  if (game.isInsufficientMaterial()) return { winner: null, reason: "insufficient" };
  if (game.isThreefoldRepetition()) return { winner: null, reason: "threefold" };
  if (game.isDrawByFiftyMoves()) return { winner: null, reason: "fifty" };
  if (game.isDraw()) return { winner: null, reason: "draw" };
  return null;
}

export function resignation(loser: Color): Outcome {
  return { winner: opposite(loser), reason: "resignation" };
}

/** Square of the king that is in check, or null. */
export function checkedKingSquare(game: Chess): string | null {
  if (!game.isCheck()) return null;
  const turn = game.turn();
  for (const row of game.board()) {
    for (const sq of row) {
      if (sq && sq.type === "k" && sq.color === turn) return sq.square;
    }
  }
  return null;
}

export function isReason(r: string): r is EndReason {
  return ["checkmate", "stalemate", "insufficient", "threefold", "fifty", "draw", "resignation"].includes(r);
}
