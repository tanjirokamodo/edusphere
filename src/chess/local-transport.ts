import { isLegal, outcomeOf, replay, resignation } from "./engine";
import type { ChessTransport, CreateMatchRequest, MatchHandlers, MoveResult } from "./transport";
import type { Color, MatchSnapshot, MoveIntent, MoveRecord } from "./types";

/** Where the one active demo match is kept, so a refresh can resume it. */
export interface MatchStorage {
  load(): MatchSnapshot | null;
  save(snapshot: MatchSnapshot | null): void;
}

/**
 * LOCAL DEMO transport. Both seats are played on this device, so there is no
 * network, no remote opponent and no real-time anything. It does behave like a
 * small authoritative server in the ways that matter for the UI: it validates
 * every move with chess.js, rejects a move sent against an out-of-date move
 * count (duplicate protection) and keeps the match so it can be resumed.
 */
export function createLocalDemoTransport(storage: MatchStorage): ChessTransport {
  let current: MatchSnapshot | null = storage.load();
  const listeners = new Map<string, Set<MatchHandlers>>();

  const handlersFor = (id: string) => [...(listeners.get(id) ?? [])];
  const commit = (next: MatchSnapshot | null) => {
    current = next;
    storage.save(next);
  };

  const finish = (matchId: string, snapshot: MatchSnapshot) => {
    for (const h of handlersFor(matchId)) h.onEnd?.(snapshot);
  };

  return {
    kind: "local-demo",

    async createMatch(request: CreateMatchRequest) {
      const snapshot: MatchSnapshot = {
        id: `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        mode: request.mode,
        classId: request.classId,
        players: request.players,
        moves: [],
        startedAt: new Date().toISOString(),
        outcome: null,
      };
      commit(snapshot);
      return snapshot;
    },

    async joinMatch(matchId) {
      return current && current.id === matchId ? current : null;
    },

    async reconnect(matchId) {
      current = storage.load();
      return current && current.id === matchId ? current : null;
    },

    async sendMove(matchId: string, intent: MoveIntent): Promise<MoveResult> {
      const m = current;
      if (!m || m.id !== matchId) return { ok: false, reason: "no-match" };
      if (m.outcome) return { ok: false, reason: "finished" };
      if (intent.expectedPly !== m.moves.length) return { ok: false, reason: "stale" };

      let game;
      try {
        game = replay(m.moves);
      } catch {
        return { ok: false, reason: "illegal" };
      }
      if (!isLegal(game, intent)) return { ok: false, reason: "illegal" };

      const played = game.move({ from: intent.from, to: intent.to, promotion: intent.promotion });
      const record: MoveRecord = { from: intent.from, to: intent.to, promotion: intent.promotion, san: played.san };
      const next: MatchSnapshot = { ...m, moves: [...m.moves, record], outcome: outcomeOf(game) };
      commit(next);

      for (const h of handlersFor(matchId)) h.onMove?.(next, record);
      if (next.outcome) finish(matchId, next);
      return { ok: true, snapshot: next };
    },

    async resign(matchId: string, as?: Color): Promise<MoveResult> {
      const m = current;
      if (!m || m.id !== matchId) return { ok: false, reason: "no-match" };
      if (m.outcome) return { ok: false, reason: "finished" };
      const loser: Color = as ?? replay(m.moves).turn();
      const next: MatchSnapshot = { ...m, outcome: resignation(loser) };
      commit(next);
      finish(matchId, next);
      return { ok: true, snapshot: next };
    },

    subscribe(matchId, handlers) {
      const set = listeners.get(matchId) ?? new Set<MatchHandlers>();
      set.add(handlers);
      listeners.set(matchId, set);
      // Both seats are on this device, so both are always "connected".
      handlers.onPresence?.("w", "connected");
      handlers.onPresence?.("b", "connected");
      return () => {
        set.delete(handlers);
      };
    },

    async leaveMatch(matchId) {
      if (current && current.id === matchId) commit(null);
    },

    close() {
      listeners.clear();
    },
  };
}
