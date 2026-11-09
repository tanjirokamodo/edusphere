"use client";

import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/language";
import type { VideoItem } from "@/types";

/** Narration language and age group badges, shared by cards and the player page. */
export function VideoBadges({ video }: { video: VideoItem }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap gap-1.5">
      {video.languages.map((l) => (
        <Badge key={l} variant="info">
          {t(l === "en" ? "lang.en" : "lang.te")}
        </Badge>
      ))}
      {video.bands.map((b) => (
        <Badge key={b} variant="neutral">
          {t(b === "7-9" ? "lib.age.7-9" : "lib.age.10-12")}
        </Badge>
      ))}
    </div>
  );
}
