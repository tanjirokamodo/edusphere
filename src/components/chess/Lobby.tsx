"use client";

import { useState } from "react";
import { Crown, Dices, GraduationCap, Info, Play, ShieldCheck, Swords, Users } from "lucide-react";
import type { ChessGameRecord } from "@/chess/stats";
import type { Color, MatchSnapshot } from "@/chess/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CLASS_SECTION, classmatesOf, findClassmate, sampleOngoing, type Classmate } from "@/data/chess-roster";
import { useLanguage } from "@/lib/language";
import type { StudentProfile } from "@/types";
import { ChallengePreview } from "./ChallengePreview";
import { MatchSetup } from "./MatchSetup";
import { Avatar } from "./players";
import { RecentGames } from "./RecentGames";
import { RosterCard } from "./RosterCard";

type Panel = { kind: "none" } | { kind: "setup"; opponent: string } | { kind: "preview"; classmate: Classmate };

function ActionCard({
  icon: Icon,
  title,
  body,
  onClick,
}: {
  icon: typeof Crown;
  title: string;
  body: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-28 flex-col items-start gap-2 rounded-2xl border border-line bg-card p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-xs text-muted">{body}</span>
    </button>
  );
}

/** The class lobby: sample classmates, ways to start a game, and recent games. */
export function Lobby({
  student,
  active,
  games,
  onStartLocal,
  onPractice,
  onResume,
}: {
  student: StudentProfile;
  active: MatchSnapshot | null;
  games: ChessGameRecord[];
  onStartLocal: (opponentId: string, myColor: Color) => void;
  onPractice: () => void;
  onResume: () => void;
}) {
  const { t } = useLanguage();
  const [panel, setPanel] = useState<Panel>({ kind: "none" });
  const classmates = classmatesOf(student.id);
  const available = classmates.filter((c) => c.availability === "available");
  const resumable = active && !active.outcome;

  const quickMatch = () => {
    if (available.length === 0) return;
    setPanel({ kind: "preview", classmate: available[Math.floor(Math.random() * available.length)] });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-xs text-[#6b4700] sm:text-sm">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t("chess.demoBanner")}
        </p>
        <p className="flex items-start gap-2 rounded-xl bg-secondary-soft px-4 py-3 text-xs text-[#0b7a6e] sm:text-sm">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t("chess.safe")}
        </p>
      </div>

      <section className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-3xl bg-primary px-5 py-5 text-white sm:px-7">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15">
          <Crown className="size-7" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 basis-56">
          <h2 className="text-xl font-bold">
            {t("chess.welcome")}, {student.name.split(" ")[0]}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
            <GraduationCap className="size-4" aria-hidden />
            {t("chess.class")} {student.grade}-{CLASS_SECTION}
          </p>
        </div>
        <dl className="flex flex-wrap gap-x-6 gap-y-2">
          <div>
            <dd className="text-2xl font-bold tabular-nums">{classmates.length}</dd>
            <dt className="text-xs text-white/80">{t("chess.classmates")}</dt>
          </div>
          <div>
            <dd className="text-2xl font-bold tabular-nums">{available.length}</dd>
            <dt className="text-xs text-white/80">{t("chess.available")}</dt>
          </div>
          <div>
            <dd className="text-2xl font-bold tabular-nums">{sampleOngoing.length}</dd>
            <dt className="text-xs text-white/80">{t("chess.ongoing")}</dt>
          </div>
        </dl>
        <p className="basis-full text-xs text-white/75">{t("chess.sample")}</p>
      </section>

      {resumable && (
        <section className="flex flex-wrap items-center gap-4 rounded-2xl border-2 border-secondary bg-secondary-soft p-4">
          <div className="min-w-0 flex-1 basis-56">
            <h3 className="text-base font-bold">{t("chess.resume")}</h3>
            <p className="text-sm text-muted">{t("chess.resumeBody")}</p>
          </div>
          <button
            type="button"
            onClick={onResume}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
          >
            <Play className="size-4" fill="currentColor" aria-hidden />
            {t("chess.continue")}
          </button>
        </section>
      )}

      <section className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-3">
        <ActionCard
          icon={Users}
          title={t("chess.playClassmate")}
          body={t("chess.playClassmateBody")}
          onClick={() => setPanel({ kind: "setup", opponent: classmates[0].id })}
        />
        <ActionCard icon={Dices} title={t("chess.quick")} body={t("chess.quickBody")} onClick={quickMatch} />
        <ActionCard icon={Swords} title={t("chess.practice")} body={t("chess.practiceBody")} onClick={onPractice} />
      </section>

      {panel.kind === "setup" && (
        <MatchSetup
          key={panel.opponent}
          classmates={classmates}
          initialOpponent={panel.opponent}
          onStart={onStartLocal}
          onCancel={() => setPanel({ kind: "none" })}
        />
      )}
      {panel.kind === "preview" && (
        <ChallengePreview
          classmate={panel.classmate}
          onClose={() => setPanel({ kind: "none" })}
          onPlayHere={() => setPanel({ kind: "setup", opponent: panel.classmate.id })}
        />
      )}

      <section>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4">
          <h2 className="text-lg font-bold">{t("chess.roster")}</h2>
          <Badge variant="warning">{t("chess.sample")}</Badge>
        </div>
        <p className="mb-3 text-sm text-muted">{t("chess.rosterNote")}</p>
        <ul className="grid gap-3 min-[560px]:grid-cols-2 xl:grid-cols-3">
          {classmates.map((c) => (
            <RosterCard key={c.id} classmate={c} grade={student.grade} onChallenge={(x) => setPanel({ kind: "preview", classmate: x })} />
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          title={t("chess.ongoing")}
          action={<Badge variant="warning">{t("chess.sample")}</Badge>}
        >
          <p className="mb-3 text-xs text-muted">{t("chess.ongoingNote")}</p>
          <ul className="space-y-2">
            {sampleOngoing.map((m) => {
              const w = findClassmate(m.white);
              const b = findClassmate(m.black);
              return (
                <li key={m.id} className="flex items-center gap-3 rounded-xl bg-background px-3 py-2">
                  {w && <Avatar initials={w.initials} tone={w.tone} size="sm" />}
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                    {w?.name} {t("chess.vs")} {b?.name}
                  </span>
                  <span className="shrink-0 text-xs text-muted">
                    {t("chess.moves")}: {m.move}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card title={t("chess.recentMatches")}>
          {games.length === 0 ? (
            <EmptyState compact icon={Crown} title={t("chess.stats.empty")} description={t("chess.noRecent")} />
          ) : (
            <RecentGames games={games} limit={4} />
          )}
        </Card>
      </div>

      <p className="text-xs text-muted">{t("chess.future")}</p>
    </div>
  );
}
