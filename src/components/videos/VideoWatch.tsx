"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Info, VideoOff } from "lucide-react";
import { DownloadButton } from "@/components/library/DownloadButton";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { findVideo, formatClock, videoCategoryLabels } from "@/data/videos";
import { offlineItemForVideo } from "@/data/offline-items";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";
import { percentWatched, useVideoProgress } from "@/lib/video-progress";
import { RelatedVideos } from "./RelatedVideos";
import { TranscriptPanel } from "./TranscriptPanel";
import { VideoBadges } from "./VideoBadges";
import { VideoPlayer } from "./VideoPlayer";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium">{children}</dd>
    </div>
  );
}

/** Watch page: player, lesson details, goals, transcript, download and related videos. */
export function VideoWatch({ videoId }: { videoId: string }) {
  const { lang, t } = useLanguage();
  const student = useStudent();
  const { map: progress, loaded } = useVideoProgress(student.id);
  const video = findVideo(videoId);

  if (!video) {
    return (
      <EmptyState
        icon={VideoOff}
        title={t("vid.notFound")}
        description={t("vid.notFoundBody")}
        action={
          <Link
            href="/student/videos"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {t("vid.browse")}
          </Link>
        }
      />
    );
  }

  const mine = progress[video.id];
  const pct = percentWatched(mine);
  const offlineItem = offlineItemForVideo(video.id);
  const captionNames = video.media?.captions.map((c) => t(c.lang === "en" ? "lang.en" : "lang.te")).join(", ");

  return (
    <>
      <Link
        href="/student/videos"
        className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t("vid.back")}
      </Link>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="min-w-0 space-y-6">
          {loaded ? (
            <VideoPlayer key={video.id} video={video} studentId={student.id} saved={mine} />
          ) : (
            <div role="status" className="aspect-video animate-pulse rounded-2xl border border-line bg-card" />
          )}

          <header>
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{video.title[lang]}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <VideoBadges video={video} />
              {mine?.completed ? (
                <Badge variant="success">
                  <CheckCircle2 className="mr-1 size-3.5" aria-hidden />
                  {t("vid.completed")}
                </Badge>
              ) : (
                pct > 0 && (
                  <Badge variant="warning">
                    {pct}% {t("vid.watchedPct")}
                  </Badge>
                )
              )}
            </div>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">{video.description[lang]}</p>
          </header>

          <section className="rounded-2xl border border-line bg-card p-5 shadow-card">
            <h2 className="text-base font-semibold">{t("vid.aboutVideo")}</h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
              <Fact label={t("vid.teacher")}>{video.creator}</Fact>
              <Fact label={t("lib.subject")}>{videoCategoryLabels[video.category][lang]}</Fact>
              <Fact label={t("vid.duration")}>{formatClock(video.durationSec)}</Fact>
              <Fact label={t("vid.narration")}>
                {video.languages.map((l) => t(l === "en" ? "lang.en" : "lang.te")).join(", ")}
              </Fact>
              <Fact label={t("lib.age")}>
                {video.bands.map((b) => t(b === "7-9" ? "lib.age.7-9" : "lib.age.10-12")).join(", ")}
              </Fact>
              <Fact label={t("vid.captionsLabel")}>{captionNames || t("vid.captionsNone")}</Fact>
            </dl>
          </section>

          <section className="rounded-2xl border border-line bg-card p-5 shadow-card">
            <h2 className="text-base font-semibold">{t("vid.objectives")}</h2>
            <ul className="mt-3 space-y-2">
              {video.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-base">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-secondary" aria-hidden />
                  {o[lang]}
                </li>
              ))}
            </ul>
          </section>

          <TranscriptPanel video={video} />
        </div>

        <aside className="min-w-0 space-y-6 xl:self-start">
          {offlineItem && (
            <section className="rounded-2xl border border-line bg-card p-5 shadow-card">
              <h2 className="text-base font-semibold">{t("vid.downloadHeading")}</h2>
              <div className="mt-3">
                <DownloadButton item={offlineItem} />
              </div>
              <p className="mt-3 flex items-start gap-2 text-xs text-muted">
                <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                {t("vid.downloadNote")}
              </p>
              <Link href="/student/offline" className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline">
                {t("vid.manageOffline")}
              </Link>
            </section>
          )}
          <RelatedVideos video={video} progress={progress} />
        </aside>
      </div>
    </>
  );
}
