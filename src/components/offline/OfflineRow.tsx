"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, GraduationCap, PlayCircle, Trash2, type LucideIcon } from "lucide-react";
import { toneClasses } from "@/components/ui/tone";
import { useLanguage } from "@/lib/language";
import type { OfflineItem, OfflineKind } from "@/types";

const kindIcon: Record<OfflineKind, LucideIcon> = {
  book: BookOpen,
  video: PlayCircle,
  course: GraduationCap,
};

/** One offline item with an icon, title, size and a slot for actions. */
export function OfflineRow({
  item,
  detail,
  children,
}: {
  item: OfflineItem;
  detail?: string;
  children?: ReactNode;
}) {
  const { lang, t } = useLanguage();
  const tone = toneClasses[item.tone];
  const Icon = kindIcon[item.kind];

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card p-3 sm:p-4">
      <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${tone.bg} ${tone.fg}`}>
        <Icon className="size-6" aria-hidden />
      </span>
      <div className="min-w-0 flex-1 basis-40">
        <p className="line-clamp-2 text-sm font-semibold leading-snug">{item.title[lang]}</p>
        <p className="mt-0.5 text-xs text-muted">
          {item.meta[lang]} · {item.sizeMb} {t("offline.mb")}
          {detail ? ` · ${detail}` : ""}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </li>
  );
}

/** Two-step remove: the first tap arms the button, the second confirms. */
export function RemoveButton({ onConfirm }: { onConfirm: () => void }) {
  const { t } = useLanguage();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), 3500);
    return () => clearTimeout(timer);
  }, [armed]);

  return (
    <button
      type="button"
      onClick={() => (armed ? onConfirm() : setArmed(true))}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
        armed
          ? "bg-coral text-white hover:bg-coral/90"
          : "border border-line bg-card text-muted hover:border-coral hover:text-[#9c2f2f]"
      }`}
    >
      <Trash2 className="size-4" aria-hidden />
      {armed ? t("offline.confirmRemove") : t("offline.remove")}
    </button>
  );
}

export function OpenLink({ href }: { href: string }) {
  const { t } = useLanguage();
  return (
    <Link
      href={href}
      className="inline-flex min-h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90"
    >
      {t("offline.open")}
    </Link>
  );
}
