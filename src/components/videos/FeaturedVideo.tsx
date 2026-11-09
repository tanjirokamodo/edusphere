"use client";

import Link from "next/link";
import { Clock, Play } from "lucide-react";
import { DownloadButton } from "@/components/library/DownloadButton";
import { videoCategoryLabels, formatClock } from "@/data/videos";
import { offlineItemForVideo } from "@/data/offline-items";
import { useLanguage } from "@/lib/language";
import { percentWatched } from "@/lib/video-progress";
import type { VideoItem, VideoProgress } from "@/types";
import { VideoBadges } from "./VideoBadges";
import { VideoThumbnail } from "./VideoThumbnail";

/** The one prominent teacher-picked video at the top of the page. */
export function FeaturedVideo({ video, progress }: { video: VideoItem; progress?: VideoProgress }) {
  const { lang, t } = useLanguage();
  const offlineItem = offlineItemForVideo(video.id);

  return (
    <section
      aria-label={t("vid.featured")}
      className="grid gap-5 rounded-3xl border border-line bg-card p-4 shadow-card sm:p-6 md:grid-cols-[1.15fr_1fr] md:items-center"
    >
      <Link href={`/student/videos/${video.id}`} aria-label={`${t("vid.play")}: ${video.title[lang]}`} className="rounded-2xl">
        <VideoThumbnail video={video} large percent={percentWatched(progress)} completed={progress?.completed} />
      </Link>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-primary">{t("vid.featured")}</p>
        <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{video.title[lang]}</h2>
        <p className="mt-3 text-base text-muted">{video.description[lang]}</p>

        <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <dt className="sr-only">{t("lib.subject")}</dt>
          <dd className="font-semibold">{videoCategoryLabels[video.category][lang]}</dd>
          <dt className="sr-only">{t("vid.duration")}</dt>
          <dd className="inline-flex items-center gap-1 text-muted">
            <Clock className="size-4" aria-hidden />
            {formatClock(video.durationSec)}
          </dd>
        </dl>
        <div className="mt-3">
          <VideoBadges video={video} />
        </div>

        <div className="mt-5 flex flex-wrap items-start gap-3">
          <Link
            href={`/student/videos/${video.id}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-primary/90"
          >
            <Play className="size-5" fill="currentColor" aria-hidden />
            {t("vid.play")}
          </Link>
          {offlineItem && <DownloadButton item={offlineItem} />}
        </div>
      </div>
    </section>
  );
}
