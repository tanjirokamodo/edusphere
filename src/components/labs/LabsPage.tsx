"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Award, FlaskConical, Info, Search, SearchX } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Segmented } from "@/components/ui/Segmented";
import { labCategoryLabels, labs } from "@/data/labs";
import { useLanguage } from "@/lib/language";
import { completedLabCount, useLabProgress } from "@/lib/labs";
import { useStudent } from "@/lib/student";
import type { AgeBand, Language, LabCategory, LabDef } from "@/types";
import { LabCard } from "./LabCard";
import { LabCategoryCards } from "./LabCategoryCards";
import { LabIllustration } from "./LabIllustration";

const gridClass = "grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-3";

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {note && (
          <span className="text-sm text-muted" aria-live="polite">
            {note}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

export function LabsPage() {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { map, loaded } = useLabProgress(student.id);

  const [query, setQuery] = useState("");
  const [band, setBand] = useState<"all" | AgeBand>("all");
  const [language, setLanguage] = useState<"all" | Language>("all");
  const [category, setCategory] = useState<"all" | LabCategory>("all");

  const filtering = query.trim() !== "" || band !== "all" || language !== "all" || category !== "all";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return labs.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (band !== "all" && !l.bands.includes(band)) return false;
      if (language !== "all" && !l.languages.includes(language)) return false;
      if (q && !`${l.title.en} ${l.title.te}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, band, language, category]);

  const clearAll = () => {
    setQuery("");
    setBand("all");
    setLanguage("all");
    setCategory("all");
  };

  const forMe = labs.filter((l) => l.bands.includes(student.band));
  const featured: LabDef | undefined = forMe.find((l) => l.featured && !map[l.id]?.completed) ?? forMe.find((l) => !map[l.id]?.completed) ?? forMe[0];
  const recommended = forMe.filter((l) => !map[l.id]?.completed);
  const recent = labs
    .filter((l) => map[l.id])
    .sort((a, b) => map[b.id].lastAccessed.localeCompare(map[a.id].lastAccessed))
    .slice(0, 3);
  const done = labs.filter((l) => map[l.id]?.completed);
  const labXp = Object.values(map).reduce((n, p) => n + p.xpEarned, 0);

  const grid = (list: LabDef[]) => (
    <div className={gridClass}>
      {list.map((l) => (
        <LabCard key={l.id} lab={l} progress={map[l.id]} />
      ))}
    </div>
  );

  return (
    <>
      <PageHeader title={t("nav.labs")} subtitle={t("lab.subtitle")} />
      <p className="-mt-3 mb-6 flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-xs text-[#6b4700] sm:text-sm">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t("lab.demoNote")}
      </p>

      <section className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-3xl bg-primary px-5 py-5 text-white sm:px-7">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15">
          <FlaskConical className="size-7" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 basis-64">
          <h2 className="text-xl font-bold">
            {t("lab.welcomeTitle")}, {student.name.split(" ")[0]}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-white/85">{t("lab.welcomeBody")}</p>
        </div>
        <dl className="flex gap-6">
          <div>
            <dd className="text-2xl font-bold">
              {completedLabCount(map)}/{labs.length}
            </dd>
            <dt className="text-xs text-white/80">{t("lab.statDone")}</dt>
          </div>
          <div>
            <dd className="flex items-center gap-1 text-2xl font-bold">
              <Award className="size-5 text-accent" aria-hidden />
              {labXp}
            </dd>
            <dt className="text-xs text-white/80">{t("lab.statXp")}</dt>
          </div>
        </dl>
      </section>

      <div className="mt-6 space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("lab.search")}
            aria-label={t("lab.search")}
            className="min-h-12 w-full rounded-full border border-line bg-card pl-12 pr-4 text-sm shadow-card placeholder:text-muted"
          />
        </div>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <Segmented<"all" | AgeBand>
            label={t("lib.age")}
            value={band}
            onChange={setBand}
            options={[
              { value: "all", label: t("kind.all") },
              { value: "7-9", label: t("lib.age.7-9") },
              { value: "10-12", label: t("lib.age.10-12") },
            ]}
          />
          <Segmented<"all" | Language>
            label={t("lib.language")}
            value={language}
            onChange={setLanguage}
            options={[
              { value: "all", label: t("kind.all") },
              { value: "en", label: t("lang.en") },
              { value: "te", label: t("lang.te") },
            ]}
          />
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {!filtering && featured && (
          <section
            aria-label={t("lab.featured")}
            className="grid gap-5 rounded-3xl border border-line bg-card p-4 shadow-card sm:p-6 md:grid-cols-[1fr_1fr] md:items-center"
          >
            <LabIllustration lab={featured} className="max-h-72" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary">{t("lab.featured")}</p>
              <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{featured.title[lang]}</h2>
              <p className="mt-3 text-base text-muted">{featured.description[lang]}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="info">{labCategoryLabels[featured.category][lang]}</Badge>
                <Badge variant={featured.difficulty === "easy" ? "success" : "warning"}>
                  {t(featured.difficulty === "easy" ? "lab.difficulty.easy" : "lab.difficulty.medium")}
                </Badge>
                <Badge variant="neutral">
                  ~{featured.minutes} {t("lab.minutes")}
                </Badge>
              </div>
              <Link
                href={`/student/labs/${featured.id}`}
                className="mt-5 inline-flex min-h-12 items-center rounded-full bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-primary/90"
              >
                {map[featured.id]?.completed ? t("lab.again") : t("lab.start")}
              </Link>
            </div>
          </section>
        )}

        <Section
          title={t("lab.categories")}
          note={category !== "all" ? labCategoryLabels[category][lang] : undefined}
        >
          <LabCategoryCards active={category} onSelect={setCategory} />
        </Section>

        {!loaded ? (
          <div className={gridClass} role="status" aria-label="Loading">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl border border-line bg-card" />
            ))}
          </div>
        ) : filtering ? (
          <Section title={t("lab.all")} note={`${results.length} ${t("lab.found")}`}>
            {results.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title={t("lab.noResults")}
                description={t("lab.noResultsBody")}
                action={
                  <button
                    type="button"
                    onClick={clearAll}
                    className="min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
                  >
                    {t("lib.clear")}
                  </button>
                }
              />
            ) : (
              <>
                {grid(results)}
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 min-h-10 rounded-full border border-line bg-card px-5 text-sm font-semibold text-muted hover:text-foreground"
                >
                  {t("lib.clear")}
                </button>
              </>
            )}
          </Section>
        ) : (
          <>
            <Section title={t("lab.recommended")}>
              {recommended.length === 0 ? (
                <EmptyState compact icon={FlaskConical} title={t("lab.emptyRecommended")} description={t("lab.emptyRecommendedBody")} />
              ) : (
                grid(recommended)
              )}
            </Section>
            <Section title={t("lab.recent")}>
              {recent.length === 0 ? (
                <EmptyState compact icon={FlaskConical} title={t("lab.emptyRecent")} description={t("lab.emptyRecentBody")} />
              ) : (
                grid(recent)
              )}
            </Section>
            <Section title={t("lab.completed")}>
              {done.length === 0 ? (
                <EmptyState compact icon={Award} title={t("lab.emptyCompleted")} description={t("lab.emptyCompletedBody")} />
              ) : (
                grid(done)
              )}
            </Section>
            <Section title={t("lab.all")} note={`${labs.length} ${t("lab.count")}`}>
              {grid(labs)}
            </Section>
          </>
        )}
      </div>
    </>
  );
}
