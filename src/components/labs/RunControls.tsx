"use client";

import type { ReactNode } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/language";

/** Start / pause / reset buttons shared by the simulations. Extra toggles go in `children`. */
export function RunControls({
  running,
  started,
  onToggle,
  onReset,
  children,
}: {
  running: boolean;
  /** True once the simulation has been run, so the button reads "Resume". */
  started: boolean;
  onToggle: () => void;
  onReset: () => void;
  children?: ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        {running ? <Pause className="size-4" fill="currentColor" aria-hidden /> : <Play className="size-4" fill="currentColor" aria-hidden />}
        {running ? t("lab.pause") : started ? t("lab.resume") : t("lab.run")}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-5 text-sm font-semibold hover:border-primary/50"
      >
        <RotateCcw className="size-4" aria-hidden />
        {t("lab.reset")}
      </button>
      {children}
    </div>
  );
}

/** Pill-shaped on/off switch for options such as "Compare" or "Fast forward". */
export function ToggleChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
        pressed ? "border-secondary bg-secondary-soft text-[#0b7a6e]" : "border-line bg-card text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
