"use client";

import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { adminActivity, adminStats, contentMix, enrollmentTrend } from "@/data/dashboards";
import { useLanguage } from "@/lib/language";
import { ContentBarChart, EnrollmentAreaChart } from "./Charts";
import { SimpleList, SimpleListItem } from "./SimpleList";
import { StatGrid } from "./StatGrid";

export function AdminDashboard() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t("admin.greeting")} subtitle={t("admin.subtitle")} />
      <StatGrid stats={adminStats} />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title={t("admin.enrollment")}>
          <EnrollmentAreaChart data={enrollmentTrend} />
        </Card>
        <Card title={t("admin.contentMix")}>
          <ContentBarChart data={contentMix} />
        </Card>
      </div>

      <Card title={t("admin.activity")} className="mt-6">
        <SimpleList>
          {adminActivity.map((a) => (
            <SimpleListItem key={a.id} primary={a.text} secondary={a.time} />
          ))}
        </SimpleList>
      </Card>
    </>
  );
}
