"use client";

import Link from "next/link";
import { toneClasses } from "@/components/ui/tone";
import { learningCategories } from "@/config/learning-categories";
import { useLanguage } from "@/lib/language";
import type { AgeBand } from "@/types";

/** Subject and content categories, filtered and worded for the student's age band. */
export function CategoryGrid({ band }: { band: AgeBand }) {
  const { lang, t } = useLanguage();
  const categories = learningCategories.filter((c) => c.bands.includes(band));

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {categories.map(({ id, href, icon: Icon, tone, titleKey, description }) => {
        const c = toneClasses[tone];
        return (
          <Link
            key={id}
            href={href}
            className="group flex flex-col rounded-2xl border border-line bg-card p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span className={`grid size-11 place-items-center rounded-xl ${c.bg} ${c.fg}`}>
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="mt-3 text-sm font-semibold sm:text-base">{t(titleKey)}</h3>
            <p className="mt-1 text-xs text-muted sm:text-sm">{description[band][lang]}</p>
          </Link>
        );
      })}
    </div>
  );
}
