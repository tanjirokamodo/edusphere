"use client";

import { Award, Crown, Lock } from "lucide-react";
import { chessBadges } from "@/chess/achievements";
import { summarise, useChessStats } from "@/chess/stats";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import { RecentGames } from "./RecentGames";

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 shadow-card">
      <p className={`text-3xl font-bold tabular-nums ${tone}`}>{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

/** Personal results and friendly achievements. Saved on this device only: no ranking, no sharing. */
export function MyChessActivity() {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { games, loaded } = useChessStats(student.id);
  const s = summarise(games);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={t("chess.stats.total")} value={s.total} tone="text-foreground" />
        <Stat label={t("chess.stats.wins")} value={s.wins} tone="text-[#0b7a6e]" />
        <Stat label={t("chess.stats.losses")} value={s.losses} tone="text-[#9c2f2f]" />
        <Stat label={t("chess.stats.draws")} value={s.draws} tone="text-primary" />
      </div>
      <p className="text-xs text-muted">{t("chess.stats.local")}</p>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card title={t("chess.stats.recent")}>
          {!loaded ? (
            <div role="status" className="h-24 animate-pulse rounded-xl bg-background" />
          ) : games.length === 0 ? (
            <EmptyState compact icon={Crown} title={t("chess.stats.empty")} description={t("chess.stats.emptyBody")} />
          ) : (
            <RecentGames games={games} limit={10} />
          )}
        </Card>

        <Card title={t("chess.stats.opponents")}>
          {s.opponents.length === 0 ? (
            <p className="text-sm text-muted">{t("chess.noRecent")}</p>
          ) : (
            <ul className="space-y-2">
              {s.opponents.slice(0, 6).map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 rounded-xl bg-background px-3 py-2 text-sm">
                  <span className="min-w-0 truncate font-semibold">{o.name}</span>
                  <span className="shrink-0 text-xs text-muted">
                    {o.games} {t("chess.stats.gamesWith")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card title={t("chess.stats.badges")}>
        <ul className="grid gap-3 min-[520px]:grid-cols-2 lg:grid-cols-3">
          {chessBadges.map((b) => {
            const earned = b.earned(games);
            return (
              <li
                key={b.id}
                className={`flex items-start gap-3 rounded-2xl border p-3 ${earned ? "border-accent bg-accent-soft" : "border-line bg-background opacity-75"}`}
              >
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${earned ? "bg-accent text-foreground" : "bg-line text-muted"}`}>
                  {earned ? <Award className="size-5" aria-hidden /> : <Lock className="size-4" aria-hidden />}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{b.title[lang]}</span>
                  <span className="block text-xs text-muted">{b.description[lang]}</span>
                  <span className={`mt-1 block text-xs font-semibold ${earned ? "text-[#8a5a00]" : "text-muted"}`}>
                    {earned ? t("chess.stats.earned") : t("chess.stats.locked")}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
