"use client";

import { updateStoredJson, useStoredJson } from "@/lib/local-store";
import type { Color, EndReason, MatchSnapshot } from "./types";

/* My chess activity: kept in localStorage per student (demo only, not synced). */

export type GameResult = "win" | "loss" | "draw";

export interface ChessGameRecord {
  /** The match id. Used to make sure one game is only ever recorded once. */
  id: string;
  at: string;
  opponentId: string;
  opponentName: string;
  myColor: Color;
  result: GameResult;
  reason: EndReason;
  /** Number of moves played (one per side counts as two). */
  plies: number;
}

const statsKey = (studentId: string) => `edusphere.demo.chess.games.${studentId}`;
const NO_GAMES: ChessGameRecord[] = [];
const MAX_GAMES = 50;

export function useChessStats(studentId: string) {
  const { value, loaded } = useStoredJson<ChessGameRecord[]>(statsKey(studentId), NO_GAMES);
  return { games: value, loaded };
}

/**
 * Builds the record for a finished "local" match from this student's point of
 * view. Practice games, unfinished games and matches the student is not part of
 * give null, so they are never counted.
 */
export function recordFor(snapshot: MatchSnapshot, studentId: string): ChessGameRecord | null {
  if (snapshot.mode !== "local" || !snapshot.outcome) return null;
  const myColor: Color | null =
    snapshot.players.w.id === studentId ? "w" : snapshot.players.b.id === studentId ? "b" : null;
  if (!myColor) return null;
  const opponent = snapshot.players[myColor === "w" ? "b" : "w"];
  const { winner, reason } = snapshot.outcome;
  return {
    id: snapshot.id,
    at: new Date().toISOString(),
    opponentId: opponent.id,
    opponentName: opponent.name,
    myColor,
    result: winner === null ? "draw" : winner === myColor ? "win" : "loss",
    reason,
    plies: snapshot.moves.length,
  };
}

/** Saves a finished game. Returns false (and changes nothing) if that match is already saved. */
export function recordGame(studentId: string, record: ChessGameRecord): boolean {
  let added = false;
  updateStoredJson<ChessGameRecord[]>(statsKey(studentId), NO_GAMES, (games) => {
    if (games.some((g) => g.id === record.id)) return games;
    added = true;
    return [record, ...games].slice(0, MAX_GAMES);
  });
  return added;
}

export interface Opponent {
  id: string;
  name: string;
  games: number;
  lastAt: string;
}

export function summarise(games: ChessGameRecord[]) {
  const opponents = new Map<string, Opponent>();
  for (const g of games) {
    const prev = opponents.get(g.opponentId);
    opponents.set(g.opponentId, {
      id: g.opponentId,
      name: g.opponentName,
      games: (prev?.games ?? 0) + 1,
      lastAt: prev && prev.lastAt > g.at ? prev.lastAt : g.at,
    });
  }
  return {
    total: games.length,
    wins: games.filter((g) => g.result === "win").length,
    losses: games.filter((g) => g.result === "loss").length,
    draws: games.filter((g) => g.result === "draw").length,
    opponents: [...opponents.values()].sort((a, b) => b.lastAt.localeCompare(a.lastAt)),
  };
}
