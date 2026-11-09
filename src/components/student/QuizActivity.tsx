"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Trophy, Volume2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useActivity } from "@/lib/activity";
import { useLanguage } from "@/lib/language";
import { addXp } from "@/lib/progress";
import { useSpeech } from "@/lib/speech";
import { useStudent } from "@/lib/student";
import type { QuizQuestion } from "@/types";

const XP_PER_CORRECT = 10;
const letters = ["A", "B", "C", "D"];

/**
 * Multiple-choice practice. Students can retry a question as often as they
 * like; XP is earned only for a first-try correct answer. The Listen button
 * reads the question aloud for audio-assisted reading.
 */
export function QuizActivity({ questions }: { questions: QuizQuestion[] }) {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { speak, supported } = useSpeech();
  const [chosen, setChosen] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number[]>([]);

  const activity = useActivity(questions.length, (correct) => addXp(student.id, correct * XP_PER_CORRECT));

  if (activity.finished) {
    return (
      <div className="animate-pop flex flex-col items-center gap-3 py-6 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-accent text-foreground">
          <Trophy className="size-8" aria-hidden />
        </span>
        <h2 className="text-2xl font-bold">{t("quiz.done")}</h2>
        <p className="text-muted">
          {activity.stars} / {questions.length} {t("quiz.score")}
        </p>
        <p className="rounded-full bg-secondary-soft px-4 py-1.5 text-sm font-semibold text-[#0b7a6e]">
          +{activity.stars * XP_PER_CORRECT} {t("quiz.xpEarned")}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setChosen(null);
              setWrong([]);
              activity.restart();
            }}
            className="min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {t("quiz.again")}
          </button>
          <Link
            href="/student"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-6 text-sm font-semibold hover:bg-background"
          >
            {t("common.back")}
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[activity.round];
  const answered = activity.feedback === "correct";
  const isLast = activity.round + 1 >= questions.length;
  const readAloud = `${q.prompt[lang]}. ${q.options.map((o, i) => `${letters[i]}. ${o[lang]}`).join(". ")}`;

  const handlePick = (i: number) => {
    if (answered || wrong.includes(i)) return;
    setChosen(i);
    const correct = i === q.answer;
    if (!correct) setWrong((w) => [...w, i]);
    activity.submit(correct);
  };

  const handleNext = () => {
    setChosen(null);
    setWrong([]);
    activity.next();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-muted">
        <span>
          {t("quiz.question")} {activity.round + 1} {t("quiz.of")} {questions.length}
        </span>
        <button
          type="button"
          onClick={() => speak(readAloud)}
          disabled={!supported}
          title={supported ? undefined : t("quiz.noAudio")}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary-soft px-4 text-primary hover:bg-primary-soft/70 disabled:opacity-50"
        >
          <Volume2 className="size-4" aria-hidden />
          {t("quiz.listen")}
        </button>
      </div>
      <div className="mt-3">
        <ProgressBar value={(activity.round / questions.length) * 100} label={t("quiz.question")} />
      </div>

      <h3 className="mt-6 text-xl font-bold leading-snug sm:text-2xl">{q.prompt[lang]}</h3>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {q.options.map((o, i) => {
          const isRight = answered && i === q.answer;
          const isWrong = wrong.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => handlePick(i)}
              disabled={isWrong}
              aria-pressed={chosen === i}
              className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 px-4 text-left text-base font-semibold transition-colors ${
                isRight
                  ? "border-secondary bg-secondary-soft"
                  : isWrong
                    ? "border-coral/60 bg-coral-soft opacity-70"
                    : "border-line bg-card hover:border-primary/50"
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  isRight ? "bg-secondary text-white" : "bg-primary-soft text-primary"
                }`}
              >
                {letters[i]}
              </span>
              {o[lang]}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-5 min-h-16">
        {activity.feedback === "retry" && (
          <p className="animate-pop rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-[#9c2f2f]">
            {t("quiz.retry")}
          </p>
        )}
        {answered && (
          <div className="animate-pop rounded-xl bg-secondary-soft px-4 py-3">
            <p className="flex items-center gap-2 font-bold text-[#0b7a6e]">
              <CheckCircle2 className="size-5" aria-hidden />
              {t("quiz.correct")}
            </p>
            <p className="mt-1 text-sm text-foreground/80">{q.explanation[lang]}</p>
            <button
              type="button"
              onClick={handleNext}
              className="mt-3 min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {isLast ? t("quiz.finish") : t("quiz.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
