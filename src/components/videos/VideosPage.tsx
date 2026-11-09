"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Info, PlayCircle, SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { videoCategoryLabels, videos } from "@/data/videos";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import { recentlyWatchedIds, useVideoProgress } from "@/lib/video-progress";
import type { VideoItem } from "@/types";
import { FeaturedVideo } from "./FeaturedVideo";
import { VideoCard } from "./VideoCard";
import { VideoCategoryCards } from "./VideoCategoryCards";
import {
  defaultVideoFilters,
  filterVideos,
  hasActiveFilters,
  VideoFilterBar,
  type VideoFilters,
} from "./VideoFilterBar";

const gridClass = "grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";
/** Shelves hold 4 cards; at 3 columns the 4th would sit alone, so it is hidden there. */
const shelfClass = `${gridClass} lg:max-[1535px]:[&>*:nth-child(4)]:hidden`;

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

function SkeletonGrid() {
  return (
    <div className={gridClass} role="status" aria-label="Loading">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-2xl border border-line bg-card" />
      ))}
    </div>
  );
}

const byPopularity = (a: VideoItem, b: VideoItem) => b.popularity - a.popularity;

export function VideosPage() {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { map: progress, loaded } = useVideoProgress(student.id);
  const [filters, setFilters] = useState<VideoFilters>(defaultVideoFilters);

  const filtering = hasActiveFilters(filters);
  const results = useMemo(() => filterVideos(videos, filters).sort(byPopularity), [filters]);

  const sections = useMemo(() => {
    const featured = videos.find((v) => v.featured);
    const recommended = videos
      .filter((v) => v.bands.includes(student.band))
      .sort(byPopularity)
      .slice(0, 4);
    const popular = [...videos].sort(byPopularity).slice(0, 4);
    const recent = [...videos].sort((a, b) => b.addedOn.localeCompare(a.addedOn)).slice(0, 4);
    const discovery = videos
      .filter((v) => ["science", "space", "nature"].includes(v.category))
      .sort(byPopularity)
      .slice(0, 4);
    const stories = videos.filter((v) => v.story || v.category === "stories").slice(0, 4);
    return { featured, recommended, popular, recent, discovery, stories };
  }, [student.band]);

  const continueList = recentlyWatchedIds(progress)
    .map((id) => videos.find((v) => v.id === id))
    .filter((v): v is VideoItem => !!v && !progress[v.id]?.completed)
    .slice(0, 4);

  const clearAll = () => setFilters(defaultVideoFilters);

  const renderGrid = (list: VideoItem[], shelf = false) => (
    <div className={shelf ? shelfClass : gridClass}>
      {list.map((v) => (
        <VideoCard key={v.id} video={v} progress={progress[v.id]} />
      ))}
    </div>
  );

  return (
    <>
      <PageHeader title={t("nav.videos")} subtitle={t("vid.subtitle")} />
      <p className="-mt-3 mb-6 flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-xs text-[#6b4700] sm:text-sm">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t("vid.demoNote")}
      </p>

      <VideoFilterBar filters={filters} onChange={setFilters} />

      <div className="mt-8 space-y-10">
        {!filtering && sections.featured && (
          <FeaturedVideo video={sections.featured} progress={progress[sections.featured.id]} />
        )}

        <Section
          title={t("vid.categories")}
          note={filters.category !== "all" ? videoCategoryLabels[filters.category][lang] : undefined}
        >
          <VideoCategoryCards
            active={filters.category}
            onSelect={(category) => setFilters({ ...filters, category })}
          />
        </Section>

        {!loaded ? (
          <SkeletonGrid />
        ) : filtering ? (
          <Section title={t("vid.all")} note={`${results.length} ${t("vid.found")}`}>
            {results.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title={t("vid.noResults")}
                description={t("vid.noResultsBody")}
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
                {renderGrid(results)}
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
            <Section title={t("vid.continue")}>
              {continueList.length === 0 ? (
                <EmptyState
                  compact
                  icon={PlayCircle}
                  title={t("vid.emptyContinue")}
                  description={t("vid.emptyContinueBody")}
                />
              ) : (
                renderGrid(continueList, true)
              )}
            </Section>
            <Section title={t("vid.recommended")}>{renderGrid(sections.recommended, true)}</Section>
            <Section title={t("vid.popular")}>{renderGrid(sections.popular, true)}</Section>
            <Section title={t("vid.recent")}>{renderGrid(sections.recent, true)}</Section>
            <Section title={t("vid.discovery")}>{renderGrid(sections.discovery, true)}</Section>
            <Section title={t("vid.stories")}>{renderGrid(sections.stories, true)}</Section>
            <Section title={t("vid.all")} note={`${videos.length} ${t("vid.count")}`}>
              {renderGrid([...videos].sort(byPopularity))}
            </Section>
          </>
        )}
      </div>
    </>
  );
}
