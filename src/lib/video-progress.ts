"use client";

import type { Language, VideoProgress } from "@/types";
import { updateStoredJson, useStoredJson } from "./local-store";

/*
 * Watch progress is only ever written from REAL playback events of a loaded
 * media file (see VideoPlayer). Opening a video, or viewing a placeholder,
 * never creates progress and never marks anything complete.
 */

type ProgressMap = Record<string, VideoProgress>;
const progressKey = (studentId: string) => `edusphere.demo.videoprogress.${studentId}`;
const NO_PROGRESS: ProgressMap = {};

export function useVideoProgress(studentId: string) {
  const { value, loaded } = useStoredJson<ProgressMap>(progressKey(studentId), NO_PROGRESS);
  return { map: value, loaded };
}

export function saveVideoProgress(
  studentId: string,
  videoId: string,
  next: { position: number; duration: number; completed: boolean },
) {
  if (!Number.isFinite(next.duration) || next.duration <= 0) return;
  updateStoredJson<ProgressMap>(progressKey(studentId), NO_PROGRESS, (map) => ({
    ...map,
    [videoId]: {
      position: next.completed ? 0 : Math.min(next.position, next.duration),
      duration: next.duration,
      // once finished a video stays finished, even if it is watched again
      completed: map[videoId]?.completed || next.completed,
      at: new Date().toISOString(),
    },
  }));
}

/** 0–100. A completed video reads as 100 even while it is replayed. */
export function percentWatched(p: VideoProgress | undefined): number {
  if (!p) return 0;
  if (p.completed) return 100;
  return p.duration > 0 ? Math.min(100, Math.round((p.position / p.duration) * 100)) : 0;
}

/** True when there is a position worth offering to resume from. */
export function canResume(p: VideoProgress | undefined): p is VideoProgress {
  return !!p && !p.completed && p.position >= 5;
}

/** Videos with real watch progress, most recently watched first. */
export function recentlyWatchedIds(map: ProgressMap): string[] {
  return Object.entries(map)
    .sort(([, a], [, b]) => b.at.localeCompare(a.at))
    .map(([id]) => id);
}

/* ---------- player preferences (shared by every video, not per student) ---------- */
export interface VideoPrefs {
  volume: number;
  muted: boolean;
  speed: number;
  captions: Language | "off";
}

export const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5] as const;

const prefsKey = "edusphere.demo.video.prefs";
const DEFAULT_PREFS: VideoPrefs = { volume: 1, muted: false, speed: 1, captions: "off" };

export function useVideoPrefs(): VideoPrefs {
  const { value } = useStoredJson<Partial<VideoPrefs>>(prefsKey, DEFAULT_PREFS);
  return { ...DEFAULT_PREFS, ...value };
}

export function setVideoPrefs(patch: Partial<VideoPrefs>) {
  updateStoredJson<Partial<VideoPrefs>>(prefsKey, DEFAULT_PREFS, (cur) => ({ ...cur, ...patch }));
}
