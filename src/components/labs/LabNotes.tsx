"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { saveLabNotes } from "@/lib/labs";
import { useLanguage } from "@/lib/language";
import type { AgeBand, LabDef } from "@/types";

/** Free-text observations, saved on this device when the box loses focus. */
export function LabNotes({
  studentId,
  lab,
  band,
  initial,
}: {
  studentId: string;
  lab: LabDef;
  band: AgeBand;
  initial: string;
}) {
  const { t } = useLanguage();
  const [text, setText] = useState(initial);
  const [saved, setSaved] = useState(false);

  return (
    <Card title={t("lab.observations")}>
      <label className="block text-sm text-muted" htmlFor={`notes-${lab.id}`}>
        {band === "7-9" ? t("lab.notes7") : t("lab.notes10")}
      </label>
      <textarea
        id={`notes-${lab.id}`}
        value={text}
        maxLength={500}
        rows={4}
        onChange={(e) => {
          setText(e.target.value);
          setSaved(false);
        }}
        onBlur={() => {
          if (text !== initial) {
            saveLabNotes(studentId, lab, band, text);
            setSaved(true);
          }
        }}
        className="mt-2 w-full rounded-xl border border-line bg-background p-3 text-sm"
      />
      <p className="mt-1 min-h-4 text-xs text-muted" aria-live="polite">
        {saved ? t("lab.notesSaved") : ""}
      </p>
    </Card>
  );
}
