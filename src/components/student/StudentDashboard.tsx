"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { HoursBarChart } from "@/components/dashboard/Charts";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { courses } from "@/data/courses";
import { studyHoursByDay } from "@/data/dashboards";
import { earnedBadges } from "@/lib/achievements";
import { completedLabCount, useLabProgress } from "@/lib/labs";
import { useLanguage } from "@/lib/language";
import { useXpSummary } from "@/lib/progress";
import { useStudent } from "@/lib/student";
import type { StatItem } from "@/types";
import { BadgeList } from "./BadgeList";
import { CategoryGrid } from "./CategoryGrid";
import { CourseProgressCard } from "./CourseProgressCard";
import { DailyChallengeCard } from "./DailyChallengeCard";
import { DiscoverSection } from "./DiscoverSection";
import { WelcomeHero } from "./WelcomeHero";

function Section({
  title,
  note,
  action,
  children,
}: {
  title: string;
  note?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-lg font-bold">{title}</h2>
        {note && <span className="text-sm text-muted">{note}</span>}
        {action}
      </div>
      {children}
    </section>
  );
}

export function StudentDashboard() {
  const { t } = useLanguage();
  const student = useStudent();
  const xp = useXpSummary(student);
  const labsDone = completedLabCount(useLabProgress(student.id).map);
  const badges = earnedBadges(student, xp.earned, labsDone);

  const inProgress = courses.filter(
    (c) => c.bands.includes(student.band) && c.completedLessons > 0 && c.completedLessons < c.lessons,
  );

  const stats: StatItem[] = [
    { key: "stat.coursesInProgress", value: String(inProgress.length) },
    { key: "stat.streak", value: String(student.streak), delta: "+1 today", trend: "up" },
    { key: "stat.xp", value: xp.totalXp.toLocaleString("en-IN"), delta: xp.earned > 0 ? `+${xp.earned} XP` : undefined, trend: "up" },
    { key: "stat.badgesEarned", value: String(badges.length) },
  ];

  const bandLabel = `${t("band.ages")} ${student.band.replace("-", "–")}`;

  return (
    <div className="space-y-8">
      <WelcomeHero student={student} level={xp.level} intoLevel={xp.intoLevel} course={inProgress[0]} />
      <StatGrid stats={stats} />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="min-w-0 space-y-8 xl:col-span-2">
          <Section title={t("student.explore")}>
            <CategoryGrid band={student.band} />
          </Section>

          <Section
            title={t("student.continueLearning")}
            action={
              <Link href="/student/learning" className="text-sm font-semibold text-primary hover:underline">
                {t("common.viewAll")}
              </Link>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              {inProgress.slice(0, 4).map((c) => (
                <CourseProgressCard key={c.id} course={c} />
              ))}
            </div>
          </Section>

          <Section title={t("student.discover")} note={`${t("student.discoverFor")} ${bandLabel}`}>
            <DiscoverSection key={student.band} band={student.band} />
          </Section>
        </div>

        <div className="min-w-0 space-y-6 self-start">
          <DailyChallengeCard />
          <Card title={t("student.studyTime")}>
            <HoursBarChart data={studyHoursByDay} />
          </Card>
          <Card title={t("student.badges")}>
            <BadgeList badges={badges.slice(0, 4)} />
          </Card>
        </div>
      </div>
    </div>
  );
}
