"use client";

import Link from "next/link";
import { DownloadButton } from "@/components/library/DownloadButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { videoCategoryLabels } from "@/data/videos";
import { offlineItemForVideo } from "@/data/offline-items";
import { useLanguage } from "@/lib/language";
import { percentWatched } from "@/lib/video-progress";
import type { VideoItem, VideoProgress } from "@/types";
import { VideoBadges } from "./VideoBadges";
import { VideoThumbnail } from "./VideoThumbnail";

/** Catalogue tile: thumbnail, title, topic, badges, real progress (if any) and Download. */
export function VideoCard({ video, progress }: { video: VideoItem; progress?: VideoProgress }) {
  const { lang, t } = useLanguage();
  const offlineItem = offlineItemForVideo(video.id);
  const pct = percentWatched(progress);

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-card p-3 shadow-card transition-shadow duration-200 hover:shadow-[0_8px_24px_rgb(32_40_68/0.12)]">
      <Link
        href={`/student/videos/${video.id}`}
        aria-label={`${t("vid.play")}: ${video.title[lang]}`}
        className="rounded-xl"
      >
        <VideoThumbnail video={video} percent={pct} completed={progress?.completed} />
      </Link>

      <div className="mt-3 flex flex-1 flex-col px-1">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug">
          <Link href={`/student/videos/${video.id}`} className="hover:text-primary">
            {video.title[lang]}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-muted">{videoCategoryLabels[video.category][lang]}</p>
        <div className="mt-2">
          <VideoBadges video={video} />
        </div>

        {pct > 0 && !progress?.completed && (
          <div className="mt-3 flex items-center gap-2">
            <ProgressBar value={pct} label={`${t("vid.watchedPct")}: ${video.title.en}`} />
            <span className="shrink-0 text-xs font-semibold">
              {pct}% {t("vid.watchedPct")}
            </span>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-start gap-2 pt-4">
          {offlineItem && <DownloadButton item={offlineItem} compact />}
        </div>
      </div>
    </article>
  );
}
