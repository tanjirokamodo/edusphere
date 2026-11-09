"use client";

import { toneClasses } from "@/components/ui/tone";
import { videoCategories, videoCategoryLabels, videos } from "@/data/videos";
import { useLanguage } from "@/lib/language";
import type { VideoCategory } from "@/types";
import { videoCategoryIcons, videoCategoryTones } from "./category-icons";

/** Ten topic cards. Choosing one filters the catalogue; choosing it again clears it. */
export function VideoCategoryCards({
  active,
  onSelect,
}: {
  active: "all" | VideoCategory;
  onSelect: (category: "all" | VideoCategory) => void;
}) {
  const { lang, t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 lg:grid-cols-5">
      {videoCategories.map((c) => {
        const tone = toneClasses[videoCategoryTones[c]];
        const Icon = videoCategoryIcons[c];
        const isActive = active === c;
        const count = videos.filter((v) => v.category === c).length;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(isActive ? "all" : c)}
            aria-pressed={isActive}
            className={`flex min-h-[4.5rem] items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 ${
              isActive ? "border-primary bg-primary-soft" : "border-line bg-card hover:border-primary/40"
            }`}
          >
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone.bg} ${tone.fg}`}>
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-snug">{videoCategoryLabels[c][lang]}</span>
              <span className="block text-xs text-muted">
                {count} {t("vid.count")}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
