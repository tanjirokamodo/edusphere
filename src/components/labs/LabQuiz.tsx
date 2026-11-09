"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useActivity } from "@/lib/activity";
import { useLanguage } from "@/lib/language";
import { passMark } from "@/lib/labs";
import type { LabQuestion } from "@/types";

const letters = ["A", "B", "C", "D"];

/**
 * Knowledge questions after the experiment. Children can retry a question as
 * often as they like; the score counts first-try answers (shared useActivity).
 * Passing needs two thirds of the questions.
 */
export function LabQuiz({
  questions,
  onFinish,
}: {
  questions: LabQuestion[];
  onFinish: (correct: number, total: number) => void;
}) {
  const { lang, t } = useLanguage();
  const [wrong, setWrong] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const activity = useActivity(questions.length, (stars) => {
    setScore(stars);
    onFinish(stars, questions.length);
  });

  if (activity.finished) {
    const passed = (score ?? 0) >= passMark(questions.length);
    return (
      <div className="animate-pop rounded-2xl bg-background p-5 text-center" role="status">
        <p className="text-lg font-bold">
          {score} / {questions.length}
        </p>
        <p className={`mt-1 text-sm font-semibold ${passed ? "text-[#0b7a6e]" : "text-[#9c2f2f]"}`}>
          {passed ? t("lab.quizPassed") : t("lab.quizTryAgain")}
        </p>
        <button
          type="button"
          onClick={() => {
            setWrong([]);
            setScore(null);
            activity.restart();
          }}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-5 text-sm font-semibold hover:border-primary/50"
        >
          <RotateCcw className="size-4" aria-hidden />
          {t("quiz.again")}
        </button>
      </div>
    );
  }

  const q = questions[activity.round];
  const answered = activity.feedback === "correct";
  const isLast = activity.round + 1 >= questions.length;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm font-semibold text-muted">
        <span>
          {t("quiz.question")} {activity.round + 1} {t("quiz.of")} {questions.length}
        </span>
      </div>
      <div className="mt-2">
        <ProgressBar value={(activity.round / questions.length) * 100} label={t("quiz.question")} />
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug">{q.prompt[lang]}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {q.options.map((o, i) => {
          const right = answered && i === q.answer;
          const bad = wrong.includes(i);
          return (
            <button
              key={i}
              type="button"
              disabled={answered || bad}
              onClick={() => {
                if (i === q.answer) activity.submit(true);
                else {
                  setWrong((w) => [...w, i]);
                  activity.submit(false);
                }
              }}
              className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 px-4 py-2 text-left text-sm font-semibold transition-colors ${
                right
                  ? "border-secondary bg-secondary-soft"
                  : bad
                    ? "border-coral bg-coral-soft opacity-80"
                    : "border-line bg-card hover:border-primary/50"
              }`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-background text-xs">
                {right ? (
                  <CheckCircle2 className="size-5 text-secondary" aria-hidden />
                ) : bad ? (
                  <XCircle className="size-5 text-coral" aria-hidden />
                ) : (
                  letters[i]
                )}
              </span>
              {o[lang]}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4 min-h-6 text-sm">
        {activity.feedback === "retry" && <p className="font-medium text-[#9c2f2f]">{t("quiz.retry")}</p>}
        {answered && (
          <div>
            <p className="font-semibold text-[#0b7a6e]">{t("quiz.correct")}</p>
            <p className="mt-1 text-muted">{q.explanation[lang]}</p>
          </div>
        )}
      </div>

      {answered && (
        <button
          type="button"
          onClick={() => {
            setWrong([]);
            activity.next();
          }}
          className="mt-3 min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
        >
          {isLast ? t("quiz.finish") : t("quiz.next")}
        </button>
      )}
    </div>
  );
}
