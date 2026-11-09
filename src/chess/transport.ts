import type { Color, MatchMode, MatchSnapshot, MoveIntent, MoveRecord, PlayerRef } from "./types";

/*
 * ChessTransport: everything the chess screens need from "the other side".
 *
 * The UI never plays a move on its own. It sends a MoveIntent through the
 * transport and re-renders from the snapshot the transport hands back, whether
 * that is this device (today's local demo) or a server (later).
 *
 * FUTURE MULTIPLAYER (not built yet). A NestJS WebSocket gateway using
 * Socket.IO can implement this interface without touching any chess screen:
 *
 *   createMatch  -> emit "match:create"     joinMatch  -> emit "match:join"
 *   sendMove     -> emit "match:move"       resign     -> emit "match:resign"
 *   reconnect    -> emit "match:resume"     subscribe  -> "match:move",
 *                   "match:presence", "match:end" events
 *
 * The production server must be authoritative:
 *   - authenticated users only, and class membership checked on the server;
 *   - the server validates every move with its own chess.js (never trusts the
 *     client), and checks it is that user's turn;
 *   - `expectedPly` is compared with the stored move count so a repeated or
 *     late move is rejected (duplicate move protection);
 *   - matches and results are persisted in PostgreSQL, so a dropped connection
 *     can resume with `reconnect`, and results come from the server, not a client.
 *
 * Today's `local-transport.ts` is a same-device stand-in. It is not networked,
 * it simulates no remote player, and it is not Socket.IO.
 */

export interface CreateMatchRequest {
  mode: MatchMode;
  /** The class the match belongs to. A server would reject players outside it. */
  classId: string;
  players: Record<Color, PlayerRef>;
}

export type MoveRejection = "illegal" | "stale" | "finished" | "not-your-turn" | "no-match";

export type MoveResult = { ok: true; snapshot: MatchSnapshot } | { ok: false; reason: MoveRejection };

export type PresenceStatus = "connected" | "reconnecting" | "disconnected";

export interface MatchHandlers {
  /** A move was played (by either side, or confirmed for this device). */
  onMove?: (snapshot: MatchSnapshot, move: MoveRecord) => void;
  /** The connection state of a player changed. */
  onPresence?: (color: Color, status: PresenceStatus) => void;
  /** The game finished (mate, draw, resignation, or a player timing out/abandoning). */
  onEnd?: (snapshot: MatchSnapshot) => void;
}

export interface ChessTransport {
  /** "local-demo" plays on this device only. "websocket" is reserved for the real server. */
  readonly kind: "local-demo" | "websocket";

  createMatch(request: CreateMatchRequest): Promise<MatchSnapshot>;
  /** Join an existing match. Resolves to null if it does not exist or is not yours. */
  joinMatch(matchId: string): Promise<MatchSnapshot | null>;
  /** Resume after a refresh or a dropped connection. */
  reconnect(matchId: string): Promise<MatchSnapshot | null>;
  sendMove(matchId: string, intent: MoveIntent): Promise<MoveResult>;
  /**
   * `as` is only used by the local demo, where one device owns both seats.
   * A server ignores it and resigns the authenticated user.
   */
  resign(matchId: string, as?: Color): Promise<MoveResult>;
  /** Listen for opponent moves, connection changes and the end of the game. Returns an unsubscribe function. */
  subscribe(matchId: string, handlers: MatchHandlers): () => void;
  /** Stop tracking a finished or abandoned match on this client. */
  leaveMatch(matchId: string): Promise<void>;
  close(): void;
}
