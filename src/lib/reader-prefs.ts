"use client";

import { updateStoredJson, useStoredJson } from "./local-store";

export type ReaderTheme = "light" | "dark";

export interface ReaderPrefs {
  /** Index into the reader's font-size scale. */
  fontStep: number;
  theme: ReaderTheme;
}

export const FONT_STEPS = 5;
const KEY = "edusphere.demo.reader.prefs";
const DEFAULTS: ReaderPrefs = { fontStep: 1, theme: "light" };

export function useReaderPrefs(): ReaderPrefs {
  return useStoredJson<ReaderPrefs>(KEY, DEFAULTS).value;
}

export function setFontStep(step: number) {
  const next = Math.max(0, Math.min(FONT_STEPS - 1, step));
  updateStoredJson<ReaderPrefs>(KEY, DEFAULTS, (p) => ({ ...DEFAULTS, ...p, fontStep: next }));
}

export function setReaderTheme(theme: ReaderTheme) {
  updateStoredJson<ReaderPrefs>(KEY, DEFAULTS, (p) => ({ ...DEFAULTS, ...p, theme }));
}
