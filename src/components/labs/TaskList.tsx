"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { tasksForBand } from "@/data/labs";
import { useLanguage } from "@/lib/language";
import type { AgeBand, LabDef, LabProgress } from "@/types";

/** Activities the lab counts. They tick themselves when the student does them. */
export function TaskList({ lab, band, progress }: { lab: LabDef; band: AgeBand; progress?: LabProgress }) {
  const { lang, t } = useLanguage();
  const tasks = tasksForBand(lab, band);
  const done = tasks.filter((x) => progress?.tasks.includes(x.id)).length;

  return (
    <Card title={t("lab.tasks")}>
      <div className="mb-3 flex items-center gap-3">
        <ProgressBar value={(done / tasks.length) * 100} label={t("lab.tasks")} />
        <span className="shrink-0 text-xs font-semibold">
          {done}/{tasks.length} {t("lab.tasksDone")}
        </span>
      </div>
      <ul className="space-y-2.5">
        {tasks.map((task) => {
          const ok = progress?.tasks.includes(task.id);
          return (
            <li key={task.id} className="flex items-start gap-2.5 text-sm">
              {ok ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden />
              ) : (
                <Circle className="mt-0.5 size-5 shrink-0 text-line" aria-hidden />
              )}
              <span className={ok ? "text-muted line-through decoration-muted/40" : "font-medium"}>
                <span className="sr-only">{ok ? "✓ " : ""}</span>
                {task.title[lang]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
