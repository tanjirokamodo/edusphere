"use client";

import { Award, CheckCircle2, Circle, PartyPopper } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LAB_XP, tasksForBand } from "@/data/labs";
import { useLanguage } from "@/lib/language";
import type { AgeBand, LabDef, LabProgress } from "@/types";

/** Completion status, best score and XP. XP is paid once, the first time a lab is completed. */
export function LabResults({ lab, band, progress }: { lab: LabDef; band: AgeBand; progress?: LabProgress }) {
  const { lang, t } = useLanguage();
  const missing = tasksForBand(lab, band).filter((x) => !progress?.tasks.includes(x.id));

  if (progress?.completed) {
    return (
      <Card title={t("lab.results")}>
        <div className="animate-pop flex flex-col items-center gap-2 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-foreground">
            <PartyPopper className="size-7" aria-hidden />
          </span>
          <h3 className="text-xl font-bold">{t("lab.completeTitle")}</h3>
          <p className="max-w-md text-sm text-muted">{t("lab.completeBody")}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-secondary-soft px-4 py-1.5 text-sm font-semibold text-[#0b7a6e]">
            <Award className="size-4" aria-hidden />+{progress.xpEarned || LAB_XP} {t("lab.xpEarned")}
          </p>
          <p className="text-xs text-muted">{t("lab.xpAlready")}</p>
          {progress.best && (
            <p className="text-sm">
              {t("lab.bestScore")}:{" "}
              <strong>
                {progress.best.correct}/{progress.best.total}
              </strong>
            </p>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card title={t("lab.results")}>
      <p className="text-sm font-semibold">{t("lab.todo")}</p>
      <ul className="mt-2 space-y-2 text-sm">
        {missing.map((m) => (
          <li key={m.id} className="flex items-start gap-2">
            <Circle className="mt-0.5 size-4 shrink-0 text-line" aria-hidden />
            {m.title[lang]}
          </li>
        ))}
        <li className="flex items-start gap-2">
          {progress?.quizPassed ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
          ) : (
            <Circle className="mt-0.5 size-4 shrink-0 text-line" aria-hidden />
          )}
          {t("lab.passQuiz")}
        </li>
      </ul>
      <p className="mt-3 text-xs text-muted">
        {t("lab.bestScore")}: {progress?.best ? `${progress.best.correct}/${progress.best.total}` : t("lab.notYetTaken")}
      </p>
    </Card>
  );
}
