"use client";

import { toneClasses } from "@/components/ui/tone";
import { studentProfiles } from "@/data/students";
import { useLanguage } from "@/lib/language";

/** Mock student profiles. Demo only; there is no password or real account. */
export function StudentProfileChooser({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <div role="radiogroup" aria-label={t("login.chooseStudent")} className="mt-3 grid grid-cols-3 gap-2">
      {studentProfiles.map((s) => {
        const active = s.id === selectedId;
        const tone = toneClasses[s.tone];
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(s.id)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-colors ${
              active ? "border-primary bg-card" : "border-transparent bg-card/60 hover:bg-card"
            }`}
          >
            <span className={`grid size-10 place-items-center rounded-full text-sm font-bold ${tone.bg} ${tone.fg}`}>
              {s.initials}
            </span>
            <span className="text-xs font-semibold leading-tight">{s.name.split(" ")[0]}</span>
            <span className="text-xs text-muted">
              {t("profiles.grade")} {s.grade} · {s.age}
            </span>
          </button>
        );
      })}
    </div>
  );
}
