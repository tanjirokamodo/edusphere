"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { XP_PER_LEVEL } from "@/lib/progress";
import { useLanguage } from "@/lib/language";
import type { Course, StudentProfile } from "@/types";

interface WelcomeHeroProps {
  student: StudentProfile;
  level: number;
  intoLevel: number;
  course?: Course;
}

export function WelcomeHero({ student, level, intoLevel, course }: WelcomeHeroProps) {
  const { t } = useLanguage();
  const firstName = student.name.split(" ")[0];
  const toNext = XP_PER_LEVEL - intoLevel;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-card sm:p-8">
      {/* decorative shapes */}
      <span className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-secondary/40" aria-hidden />
      <span className="pointer-events-none absolute -bottom-16 right-24 size-40 rounded-full bg-accent/40" aria-hidden />
      <span className="pointer-events-none absolute right-10 top-24 size-16 rounded-full bg-coral/50" aria-hidden />

      <div className="relative max-w-xl">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
          <Flame className="size-4 text-accent" aria-hidden />
          {student.streak} {t("stat.streak")}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("student.greeting")}, {firstName}
        </h1>
        <p className="mt-2 text-base text-white/85">{t("student.subtitle")}</p>

        <div className="mt-5 max-w-sm">
          <div className="flex items-baseline justify-between text-sm font-semibold">
            <span>
              {t("student.level")} {level}
            </span>
            <span className="text-white/80">
              {toNext} {t("student.xpToNext")}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={intoLevel}
            aria-valuemin={0}
            aria-valuemax={XP_PER_LEVEL}
            aria-label={t("student.level")}
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/25"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${(intoLevel / XP_PER_LEVEL) * 100}%` }}
            />
          </div>
        </div>

        {course && (
          <Link
            href="/student/learning"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            {t("student.continueCourse")}: {course.title}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </section>
  );
}
