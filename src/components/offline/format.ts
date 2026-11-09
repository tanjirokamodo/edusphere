import type { Language } from "@/types";

/** Short, locale-aware date and time, e.g. "5 Nov, 4:52 pm". */
export function formatWhen(iso: string, lang: Language): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
