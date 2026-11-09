import type { ToneKey } from "@/types";

/** Background/foreground pairs used for subject covers and badges. */
export const toneClasses: Record<ToneKey, { bg: string; fg: string }> = {
  indigo: { bg: "bg-primary-soft", fg: "text-primary" },
  teal: { bg: "bg-secondary-soft", fg: "text-[#0b7a6e]" },
  amber: { bg: "bg-accent-soft", fg: "text-[#8a5a00]" },
  rose: { bg: "bg-coral-soft", fg: "text-[#b13a3a]" },
  sky: { bg: "bg-[#e0f0fb]", fg: "text-[#1d5f8f]" },
};

/** Chart colours, kept in one place so charts match the palette. */
export const chartColors = {
  primary: "#5146D8",
  secondary: "#14B8A6",
  accent: "#FFC857",
  grid: "#E4E7F2",
  axis: "#5D6783",
} as const;
