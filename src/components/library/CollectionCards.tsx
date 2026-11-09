"use client";

import { Library } from "lucide-react";
import { toneClasses } from "@/components/ui/tone";
import { collections } from "@/data/books";
import { useLanguage } from "@/lib/language";

/** Featured collections. Choosing one filters the library to its books. */
export function CollectionCards({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const { lang, t } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
      {collections.map((c) => {
        const tone = toneClasses[c.tone];
        const active = activeId === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(active ? null : c.id)}
            aria-pressed={active}
            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
              active ? "border-primary bg-primary-soft" : "border-line bg-card hover:border-primary/40"
            }`}
          >
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone.bg} ${tone.fg}`}>
              <Library className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{c.title[lang]}</span>
              <span className="mt-0.5 line-clamp-2 block text-xs text-muted">{c.description[lang]}</span>
              <span className="mt-1 block text-xs font-semibold text-primary">
                {c.bookIds.length} {t("lib.books")}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
