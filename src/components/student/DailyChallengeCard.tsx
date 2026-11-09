"use client";

import Link from "next/link";
import { Target } from "lucide-react";
import { useLanguage } from "@/lib/language";

export function DailyChallengeCard() {
  const { t } = useLanguage();
  return (
    <section className="rounded-2xl bg-accent-soft p-5 shadow-card">
      <span className="grid size-11 place-items-center rounded-xl bg-accent text-foreground">
        <Target className="size-6" aria-hidden />
      </span>
      <h2 className="mt-3 text-base font-semibold">{t("student.todayChallenge")}</h2>
      <p className="mt-1 text-sm text-muted">{t("student.challengeBody")}</p>
      <Link
        href="/student/mathematics"
        className="mt-4 inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-white hover:bg-foreground/90"
      >
        {t("student.startChallenge")}
      </Link>
    </section>
  );
}
