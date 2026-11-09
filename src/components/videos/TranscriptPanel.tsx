"use client";

import { useLanguage } from "@/lib/language";
import type { VideoItem } from "@/types";

/** Written transcript in the chosen language, or the other one with a clear note. */
export function TranscriptPanel({ video }: { video: VideoItem }) {
  const { lang, t } = useLanguage();
  const other = lang === "en" ? "te" : "en";
  const shownLang = video.transcript?.[lang] ? lang : video.transcript?.[other] ? other : null;
  const paragraphs = shownLang ? video.transcript?.[shownLang] : undefined;

  return (
    <section className="rounded-2xl border border-line bg-card p-5 shadow-card">
      <h2 className="text-base font-semibold">{t("vid.transcript")}</h2>
      {!paragraphs ? (
        <p className="mt-2 text-sm text-muted">{t("vid.transcriptNone")}</p>
      ) : (
        <>
          {shownLang !== lang && (
            <p className="mt-1 text-xs text-muted">
              {t("vid.transcriptShownIn")} {t(shownLang === "en" ? "lang.en" : "lang.te")}
            </p>
          )}
          <div
            lang={shownLang ?? undefined}
            className={`mt-3 max-w-prose space-y-3 text-base ${shownLang === "te" ? "leading-[2]" : "leading-relaxed"}`}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
