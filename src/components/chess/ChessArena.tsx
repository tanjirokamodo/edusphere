"use client";

import { useEffect, useMemo, useState } from "react";
import { createStudentTransport, useActiveMatch } from "@/chess/demo-session";
import { useChessStats } from "@/chess/stats";
import type { Color, MatchMode, MatchSnapshot, PlayerRef } from "@/chess/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { classIdFor, findClassmate } from "@/data/chess-roster";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import { ChessGame } from "./ChessGame";
import { Lobby } from "./Lobby";
import { MyChessActivity } from "./MyChessActivity";

type View = "lobby" | "game" | "activity";

const PRACTICE_PLAYERS: Record<Color, PlayerRef> = {
  w: { id: "practice-w", name: "White", initials: "W" },
  b: { id: "practice-b", name: "Black", initials: "B" },
};

/**
 * Chess Arena: lobby, game and personal activity. Every match is created and
 * played through a ChessTransport; today that is the same-device demo transport.
 */
export function ChessArena() {
  const { t } = useLanguage();
  const student = useStudent();
  const transport = useMemo(() => createStudentTransport(student.id), [student.id]);
  useEffect(() => () => transport.close(), [transport]);

  const { value: active } = useActiveMatch(student.id);
  const { games } = useChessStats(student.id);
  const [view, setView] = useState<View>("lobby");
  const [match, setMatch] = useState<MatchSnapshot | null>(null);

  const me: PlayerRef = { id: student.id, name: student.name.split(" ")[0], initials: student.initials };
  const classId = classIdFor(student.grade);

  const begin = async (mode: MatchMode, players: Record<Color, PlayerRef>) => {
    const snapshot = await transport.createMatch({ mode, classId, players });
    setMatch(snapshot);
    setView("game");
  };

  const startLocal = (opponentId: string, myColor: Color) => {
    const c = findClassmate(opponentId);
    if (!c) return;
    const opponent: PlayerRef = { id: c.id, name: c.name, initials: c.initials };
    return begin("local", myColor === "w" ? { w: me, b: opponent } : { w: opponent, b: me });
  };

  const resume = async () => {
    if (!active) return;
    const snapshot = await transport.reconnect(active.id);
    if (snapshot) {
      setMatch(snapshot);
      setView("game");
    }
  };

  const rematch = (swap: boolean) => {
    if (!match) return;
    const p = match.players;
    return begin(match.mode, swap ? { w: p.b, b: p.w } : p);
  };

  const tabs: { id: View; label: string; disabled?: boolean }[] = [
    { id: "lobby", label: t("chess.tab.lobby") },
    { id: "game", label: t("chess.tab.game"), disabled: !match },
    { id: "activity", label: t("chess.tab.activity") },
  ];

  return (
    <>
      <PageHeader title={t("nav.chess")} subtitle={t("chess.subtitle")} />

      <div role="tablist" aria-label={t("nav.chess")} className="mb-6 flex gap-1 overflow-x-auto rounded-full border border-line bg-card p-1 [scrollbar-width:none] sm:inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`chess-tab-${tab.id}`}
            aria-selected={view === tab.id}
            aria-controls="chess-panel"
            disabled={tab.disabled}
            onClick={() => setView(tab.id)}
            className={`min-h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors disabled:opacity-40 ${
              view === tab.id ? "bg-primary text-white" : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div id="chess-panel" role="tabpanel" aria-labelledby={`chess-tab-${view}`}>
        {view === "lobby" && (
          <Lobby
            student={student}
            active={active}
            games={games}
            onStartLocal={startLocal}
            onPractice={() => begin("practice", PRACTICE_PLAYERS)}
            onResume={resume}
          />
        )}
        {view === "game" && match && (
          <ChessGame
            key={match.id}
            transport={transport}
            initial={match}
            studentId={student.id}
            onBackToLobby={() => setView("lobby")}
            onRematch={rematch}
          />
        )}
        {view === "activity" && <MyChessActivity />}
      </div>
    </>
  );
}
