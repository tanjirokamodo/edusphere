"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { ArrowLeft, CheckCircle2, FlaskConical, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { findLab, labCategoryLabels } from "@/data/labs";
import { labRegistry } from "@/labs/registry";
import { markLabTask, recordLabQuiz, touchLab, useLabProgress } from "@/lib/labs";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import { LabNotes } from "./LabNotes";
import { LabQuiz } from "./LabQuiz";
import { LabResults } from "./LabResults";
import { TaskList } from "./TaskList";

/**
 * Lab page shell shared by every experiment: introduction, objectives,
 * instructions, the simulation itself (from the registry), activities,
 * observations, knowledge questions and results.
 */
export function LabPage({ labId }: { labId: string }) {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { map, loaded } = useLabProgress(student.id);
  const lab = findLab(labId);
  const entry = lab ? labRegistry[lab.id] : undefined;
  const band = student.band;

  useEffect(() => {
    if (lab) touchLab(student.id, lab, band);
  }, [student.id, lab, band]);

  const onTask = useCallback(
    (taskId: string) => {
      if (lab) markLabTask(student.id, lab, band, taskId);
    },
    [student.id, lab, band],
  );

  if (!lab || !entry) {
    return (
      <EmptyState
        icon={FlaskConical}
        title={t("lab.notFound")}
        description={t("lab.notFoundBody")}
        action={
          <Link
            href="/student/labs"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {t("lab.browse")}
          </Link>
        }
      />
    );
  }

  const progress = map[lab.id];
  const Workspace = entry.Component;

  return (
    <>
      <Link
        href="/student/labs"
        className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t("lab.back")}
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{lab.title[lang]}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">{labCategoryLabels[lab.category][lang]}</Badge>
          <Badge variant={lab.difficulty === "easy" ? "success" : "warning"}>
            {t(lab.difficulty === "easy" ? "lab.difficulty.easy" : "lab.difficulty.medium")}
          </Badge>
          <Badge variant="neutral">{t(band === "7-9" ? "lab.version.7-9" : "lab.version.10-12")}</Badge>
          {progress?.completed && (
            <Badge variant="success">
              <CheckCircle2 className="mr-1 size-3.5" aria-hidden />
              {t("lab.statusCompleted")}
            </Badge>
          )}
        </div>
        <p className="mt-3 max-w-prose text-base text-muted">{lab.description[lang]}</p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="min-w-0 space-y-6">
          <Card title={t("lab.intro")}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">{t("lab.objectives")}</h3>
                <ul className="mt-2 space-y-1.5">
                  {lab.objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
                      {o[lang]}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">{t("lab.instructions")}</h3>
                <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm marker:font-semibold marker:text-primary">
                  {lab.instructions[band].map((s, i) => (
                    <li key={i}>{s[lang]}</li>
                  ))}
                </ol>
              </div>
            </div>
          </Card>

          <section aria-label={t("lab.workspace")} className="rounded-2xl border border-line bg-card p-3 shadow-card sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold">{t("lab.workspace")}</h2>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <Info className="size-3.5 shrink-0" aria-hidden />
                {t("lab.model")}
              </p>
            </div>
            <Workspace band={band} onTask={onTask} />
          </section>

          <Card title={t("lab.quiz")}>
            <p className="mb-4 text-sm text-muted">{t("lab.quizIntro")}</p>
            <LabQuiz
              key={`${band}-${lab.id}`}
              questions={entry.questions[band]}
              onFinish={(correct, total) => recordLabQuiz(student.id, lab, band, correct, total)}
            />
          </Card>
        </div>

        <aside className="min-w-0 space-y-6 xl:self-start">
          <TaskList lab={lab} band={band} progress={progress} />
          <LabResults lab={lab} band={band} progress={progress} />
          {loaded && <LabNotes key={lab.id} studentId={student.id} lab={lab} band={band} initial={progress?.notes ?? ""} />}
          <p className="text-xs text-muted">{t("lab.saveNote")}</p>
        </aside>
      </div>
    </>
  );
}
