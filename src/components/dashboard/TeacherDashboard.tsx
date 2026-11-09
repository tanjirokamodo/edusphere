"use client";

import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { classPerformance, recentSubmissions, teacherStats, todaysClasses } from "@/data/dashboards";
import { useLanguage } from "@/lib/language";
import { useSession } from "@/lib/session";
import { PerformanceLineChart } from "./Charts";
import { SimpleList, SimpleListItem } from "./SimpleList";
import { StatGrid } from "./StatGrid";

export function TeacherDashboard() {
  const { t } = useLanguage();
  const session = useSession();
  const name = session.status === "signed-in" ? session.user.name : "";

  return (
    <>
      <PageHeader title={`${t("teacher.greeting")}, ${name}`} subtitle={t("teacher.subtitle")} />
      <StatGrid stats={teacherStats} />

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card title={t("teacher.performance")}>
            <PerformanceLineChart data={classPerformance} />
          </Card>
          <Card title={t("teacher.submissions")}>
            <SimpleList>
              {recentSubmissions.map((s) => (
                <SimpleListItem
                  key={s.id}
                  primary={s.student}
                  secondary={`${s.assignment} · ${s.submitted}`}
                  trailing={<Badge variant={s.status === "Graded" ? "success" : "warning"}>{s.status}</Badge>}
                />
              ))}
            </SimpleList>
          </Card>
        </div>

        <Card title={t("teacher.today")} className="self-start">
          <ul className="space-y-4">
            {todaysClasses.map((c) => (
              <li key={c.id} className="rounded-xl bg-background p-4">
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="mt-2 flex items-center gap-2 text-xs text-muted">
                  <Clock className="size-3.5" aria-hidden /> {c.time}
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <MapPin className="size-3.5" aria-hidden /> {c.room}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
