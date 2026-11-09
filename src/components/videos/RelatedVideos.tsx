"use client";

import Link from "next/link";
import { videoCategoryLabels, relatedVideos } from "@/data/videos";
import { useLanguage } from "@/lib/language";
import { percentWatched } from "@/lib/video-progress";
import type { VideoItem, VideoProgress } from "@/types";
import { VideoThumbnail } from "./VideoThumbnail";

/** Teacher-curated suggestions from this catalogue only; nothing external. */
export function RelatedVideos({
  video,
  progress,
}: {
  video: VideoItem;
  progress: Record<string, VideoProgress>;
}) {
  const { lang, t } = useLanguage();
  const list = relatedVideos(video, 4);

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="mb-3 text-base font-semibold">
        {t("vid.related")}
      </h2>
      <ul className="space-y-3">
        {list.map((v) => (
          <li key={v.id}>
            <Link
              href={`/student/videos/${v.id}`}
              className="flex gap-3 rounded-2xl border border-line bg-card p-2.5 transition-colors hover:border-primary/40"
            >
              <span className="w-32 shrink-0">
                <VideoThumbnail video={v} percent={percentWatched(progress[v.id])} completed={progress[v.id]?.completed} />
              </span>
              <span className="min-w-0 py-0.5">
                <span className="line-clamp-2 text-sm font-semibold leading-snug">{v.title[lang]}</span>
                <span className="mt-1 block text-xs text-muted">{videoCategoryLabels[v.category][lang]}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
