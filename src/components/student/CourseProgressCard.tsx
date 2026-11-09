"use client";

import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { toneClasses } from "@/components/ui/tone";
import { useLanguage } from "@/lib/language";
import type { Course } from "@/types";

export function CourseProgressCard({ course }: { course: Course }) {
  const { t } = useLanguage();
  const pct = Math.round((course.completedLessons / course.lessons) * 100);
  const tone = toneClasses[course.tone];

  return (
    <article className="flex gap-4 rounded-2xl border border-line bg-card p-4 shadow-card">
      <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${tone.bg} ${tone.fg}`}>
        <BookOpenCheck className="size-6" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted">
          {course.subject} · {course.grade}
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">{course.title}</h3>
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={pct} label={course.title} />
          <span className="shrink-0 text-xs font-semibold">{pct}%</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>
            {course.completedLessons}/{course.lessons} {t("common.lessons")}
          </span>
          <Link href="/student/learning" className="font-semibold text-primary hover:underline">
            {t("common.continue")}
          </Link>
        </div>
      </div>
    </article>
  );
}
