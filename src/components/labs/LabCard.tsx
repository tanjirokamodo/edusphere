"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { labCategoryLabels } from "@/data/labs";
import { useLanguage } from "@/lib/language";
import type { LabDef, LabProgress } from "@/types";
import { LabIllustration } from "./LabIllustration";

/** Experiment tile: illustration, name, subject, difficulty, age, time and Start. */
export function LabCard({ lab, progress }: { lab: LabDef; progress?: LabProgress }) {
  const { lang, t } = useLanguage();
  const started = !!progress && progress.tasks.length > 0 && !progress.completed;
  const cta = progress?.completed ? t("lab.again") : started ? t("lab.continue") : t("lab.start");

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-card p-3 shadow-card transition-shadow duration-200 hover:shadow-[0_8px_24px_rgb(32_40_68/0.12)]">
      <div className="relative">
        <LabIllustration lab={lab} />
        {progress?.completed && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-semibold text-[#0b7a6e]">
            <CheckCircle2 className="size-3.5" aria-hidden />
            {t("lab.statusCompleted")}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col px-1">
        <h3 className="text-base font-semibold leading-snug">{lab.title[lang]}</h3>
        <p className="mt-0.5 text-sm text-muted">{labCategoryLabels[lab.category][lang]}</p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge variant={lab.difficulty === "easy" ? "success" : "warning"}>
            {t(lab.difficulty === "easy" ? "lab.difficulty.easy" : "lab.difficulty.medium")}
          </Badge>
          {lab.bands.map((b) => (
            <Badge key={b} variant="neutral">
              {t(b === "7-9" ? "lib.age.7-9" : "lib.age.10-12")}
            </Badge>
          ))}
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <Clock className="size-3.5" aria-hidden />~{lab.minutes} {t("lab.minutes")}
          </span>
        </div>

        <p className="mt-3 line-clamp-3 text-sm text-muted">{lab.description[lang]}</p>

        <div className="mt-auto pt-4">
          <Link
            href={`/student/labs/${lab.id}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
