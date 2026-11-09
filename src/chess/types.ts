/** "w" = White, "b" = Black (the same letters chess.js uses). */
export type Color = "w" | "b";
export type PromotionPiece = "q" | "r" | "b" | "n";

/**
 * "local": two players share this device (counted in My chess activity).
 * "practice": one student moves both sides (never counted).
 */
export type MatchMode = "local" | "practice";

export type EndReason =
  | "checkmate"
  | "stalemate"
  | "insufficient"
  | "threefold"
  | "fifty"
  | "draw"
  | "resignation";

/** `winner` is null for every kind of draw. */
export interface Outcome {
  winner: Color | null;
  reason: EndReason;
}

export interface PlayerRef {
  id: string;
  name: string;
  initials: string;
}

export interface MoveRecord {
  from: string;
  to: string;
  promotion?: PromotionPiece;
  /** Standard algebraic notation, e.g. "Nf3" or "O-O". */
  san: string;
}

export interface MatchSnapshot {
  id: string;
  mode: MatchMode;
  /** Class the match belongs to. Only classmates may be in the same match. */
  classId: string;
  players: Record<Color, PlayerRef>;
  moves: MoveRecord[];
  startedAt: string;
  outcome: Outcome | null;
}

export interface MoveIntent {
  from: string;
  to: string;
  promotion?: PromotionPiece;
  /**
   * Number of moves the client has seen. If it does not equal the match's
   * current move count the move is rejected as "stale". This is what stops a
   * double-tap, a retry or a second tab from playing the same move twice.
   */
  expectedPly: number;
}
