"use client";

import { useLanguage } from "@/lib/language";
import type { Language } from "@/types";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "te", label: "తెలుగు" },
];

export function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t("header.language")}
      className="inline-flex rounded-full border border-line bg-card p-0.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={`min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            lang === o.value
              ? "bg-primary text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
