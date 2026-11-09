"use client";

import { toneClasses } from "@/components/ui/tone";
import { labCategories, labCategoryLabels, labs } from "@/data/labs";
import { useLanguage } from "@/lib/language";
import type { LabCategory } from "@/types";
import { labCategoryIcons, labCategoryTones } from "./category-icons";

/** The five science categories. Choosing one filters the list; a category with no experiment yet says so. */
export function LabCategoryCards({
  active,
  onSelect,
}: {
  active: "all" | LabCategory;
  onSelect: (c: "all" | LabCategory) => void;
}) {
  const { lang, t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 lg:grid-cols-5">
      {labCategories.map((c) => {
        const tone = toneClasses[labCategoryTones[c]];
        const Icon = labCategoryIcons[c];
        const count = labs.filter((l) => l.category === c).length;
        const isActive = active === c;
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
              <span className="block text-sm font-semibold leading-snug">{labCategoryLabels[c][lang]}</span>
              <span className="block text-xs text-muted">
                {count > 0 ? `${count} ${t(count === 1 ? "lab.countOne" : "lab.count")}` : t("lab.comingSoon")}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
