"use client";

import { Atom, Calculator, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { toneClasses } from "@/components/ui/tone";
import { quizzes, subjectTopics } from "@/data/subjects";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import type { SubjectId, ToneKey } from "@/types";
import { QuizActivity } from "./QuizActivity";

const subjectMeta: Record<SubjectId, { titleKey: TranslationKey; subtitleKey: TranslationKey; icon: LucideIcon; tone: ToneKey }> = {
  mathematics: { titleKey: "nav.mathematics", subtitleKey: "subject.mathSubtitle", icon: Calculator, tone: "teal" },
  science: { titleKey: "nav.science", subtitleKey: "subject.scienceSubtitle", icon: Atom, tone: "rose" },
};

/** One page layout for any subject: topic progress plus a practice quiz for the student's age band. */
export function SubjectPage({ subject }: { subject: SubjectId }) {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const meta = subjectMeta[subject];
  const tone = toneClasses[meta.tone];
  const Icon = meta.icon;
  const topics = subjectTopics[subject][student.band];
  const questions = quizzes[subject][student.band];

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${tone.bg} ${tone.fg}`}>
          <Icon className="size-7" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <PageHeader title={t(meta.titleKey)} subtitle={t(meta.subtitleKey)} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title={t("subject.practice")} className="lg:col-span-2">
          {/* keyed by band so switching profile restarts the practice */}
          <QuizActivity key={`${subject}-${student.band}`} questions={questions} />
        </Card>

        <Card title={t("subject.topics")} className="self-start">
          <ul className="space-y-5">
            {topics.map((topic) => {
              const pct = Math.round((topic.completed / topic.lessons) * 100);
              return (
                <li key={topic.title.en}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold">{topic.title[lang]}</span>
                    <span className="shrink-0 text-xs font-semibold text-muted">{pct}%</span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={pct} label={topic.title[lang]} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    {topic.completed}/{topic.lessons} {t("common.lessons")}
                  </p>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </>
  );
}
