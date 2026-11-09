"use client";

import { CheckCircle2, Play } from "lucide-react";
import { gradients } from "@/components/library/BookCover";
import { formatClock } from "@/data/videos";
import { useLanguage } from "@/lib/language";
import type { VideoItem } from "@/types";
import { videoCategoryIcons } from "./category-icons";

/**
 * Original placeholder thumbnail (gradient + topic icon). Real poster frames
 * would replace this once licensed video files exist. The play badge is only
 * decoration; the surrounding link is what opens the video.
 */
export function VideoThumbnail({
  video,
  percent = 0,
  completed = false,
  large = false,
}: {
  video: VideoItem;
  /** Real watch progress, 0–100. Omitted or 0 shows no bar. */
  percent?: number;
  completed?: boolean;
  large?: boolean;
}) {
  const { t } = useLanguage();
  const [from, to] = gradients[video.tone];
  const Icon = videoCategoryIcons[video.category];

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl text-white"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span className="absolute -right-8 -top-10 size-36 rounded-full bg-white/10" aria-hidden />
      <span className="absolute -bottom-12 left-6 size-32 rounded-full bg-white/10" aria-hidden />
      <Icon
        className={`absolute left-4 top-4 text-white/35 ${large ? "size-16 sm:size-24" : "size-12"}`}
        strokeWidth={1.5}
        aria-hidden
      />
      <span
        className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-primary shadow-lg ${
          large ? "size-16 sm:size-20" : "size-12"
        }`}
        aria-hidden
      >
        <Play className={large ? "size-7 sm:size-9" : "size-5"} fill="currentColor" />
      </span>

      <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold tabular-nums">
        {formatClock(video.durationSec)}
      </span>
      {completed && (
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-semibold text-[#0b7a6e]">
          <CheckCircle2 className="size-3.5" aria-hidden />
          {t("vid.completed")}
        </span>
      )}
      {percent > 0 && !completed && (
        <span className="absolute inset-x-0 bottom-0 h-1.5 bg-black/30" aria-hidden>
          <span className="block h-full bg-accent" style={{ width: `${percent}%` }} />
        </span>
      )}
    </div>
  );
}
