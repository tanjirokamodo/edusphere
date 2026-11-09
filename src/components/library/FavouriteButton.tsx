"use client";

import { Heart } from "lucide-react";
import { toggleFavourite, useFavourites } from "@/lib/library";
import { useLanguage } from "@/lib/language";
import { useStudent } from "@/lib/student";

export function FavouriteButton({ bookId, className = "" }: { bookId: string; className?: string }) {
  const { t } = useLanguage();
  const student = useStudent();
  const { ids } = useFavourites(student.id);
  const active = ids.includes(bookId);

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(student.id, bookId)}
      aria-pressed={active}
      aria-label={active ? t("lib.unfavourite") : t("lib.favourite")}
      title={active ? t("lib.unfavourite") : t("lib.favourite")}
      className={`grid size-10 place-items-center rounded-full bg-white/95 shadow-card transition-colors hover:bg-white ${className}`}
    >
      <Heart
        className={`size-5 transition-colors ${active ? "fill-coral text-coral" : "text-muted"}`}
        aria-hidden
      />
    </button>
  );
}
