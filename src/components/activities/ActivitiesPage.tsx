"use client";

import Link from "next/link";
import { Brain, Calculator, Crown, Globe2, Puzzle, ShieldCheck, Type, type LucideIcon } from "lucide-react";
import { gradients } from "@/components/library/BookCover";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import type { ToneKey } from "@/types";

interface Activity {
  id: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  icon: LucideIcon;
  tone: ToneKey;
  /** Only live activities have a route. */
  href?: string;
}

const activities: Activity[] = [
  { id: "chess", nameKey: "nav.chess", descKey: "act.chess.desc", icon: Crown, tone: "indigo", href: "/student/activities/chess" },
  { id: "puzzles", nameKey: "act.puzzles", descKey: "act.puzzles.desc", icon: Puzzle, tone: "teal" },
  { id: "math", nameKey: "act.math", descKey: "act.math.desc", icon: Calculator, tone: "amber" },
  { id: "memory", nameKey: "act.memory", descKey: "act.memory.desc", icon: Brain, tone: "rose" },
  { id: "word", nameKey: "act.word", descKey: "act.word.desc", icon: Type, tone: "sky" },
  { id: "gk", nameKey: "act.gk", descKey: "act.gk.desc", icon: Globe2, tone: "teal" },
];

export function ActivitiesPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader title={t("nav.activities")} subtitle={t("act.subtitle")} />
      <p className="-mt-3 mb-6 flex items-start gap-2 rounded-xl bg-secondary-soft px-4 py-3 text-xs text-[#0b7a6e] sm:text-sm">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t("act.safe")}
      </p>

      <ul className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 xl:grid-cols-3">
        {activities.map((a) => {
          const [from, to] = gradients[a.tone];
          const Icon = a.icon;
          const live = !!a.href;
          const body = (
            <>
              <div
                className={`grid h-28 place-items-center rounded-xl text-white ${live ? "" : "opacity-60 saturate-50"}`}
                style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
                aria-hidden
              >
                <Icon className="size-12" strokeWidth={1.5} />
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-semibold leading-snug">{t(a.nameKey)}</h2>
                  {!live && <Badge variant="warning">{t("act.soon")}</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted">{live ? t(a.descKey) : `${t(a.descKey)} ${t("act.soonBody")}`}</p>
                {live && (
                  <span className="mt-4 inline-flex min-h-11 items-center self-start rounded-full bg-primary px-6 text-sm font-semibold text-white">
                    {t("act.play")}
                  </span>
                )}
              </div>
            </>
          );
          return (
            <li key={a.id} className="flex">
              {live ? (
                <Link
                  href={a.href!}
                  className="flex w-full flex-col rounded-2xl border border-line bg-card p-3 shadow-card transition-shadow duration-200 hover:shadow-[0_8px_24px_rgb(32_40_68/0.12)]"
                >
                  {body}
                </Link>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex w-full flex-col rounded-2xl border border-dashed border-line bg-card p-3"
                >
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
