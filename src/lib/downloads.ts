"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { DownloadRecord, OfflineItem } from "@/types";
import {
  isStorageAvailable,
  readStoredJson,
  updateStoredJson,
  useStoredJson,
} from "./local-store";
import { useStudent } from "./student";

/*
 * SIMULATED downloads.
 *
 * Nothing is fetched and no file is saved. A "download" is a timer that
 * animates a progress value and then records `{ kind, id, sizeMb, at }` in
 * localStorage. Sizes are estimates. The public surface (useDownloads,
 * startDownload, removeDownload) is deliberately small so a real backend
 * (fetch + IndexedDB / Cache Storage, plus a sync worker) can replace the
 * internals later without touching the UI.
 */

/** Demo device allowance, in MB of estimated content. */
export const STORAGE_ALLOWANCE_MB = 500;

export type DownloadMap = Record<string, DownloadRecord>;
export type DownloadError = "storage-full" | "storage-unavailable";

export type DownloadState =
  | { status: "idle" }
  | { status: "downloading"; progress: number }
  | { status: "done"; record: DownloadRecord }
  | { status: "error"; reason: DownloadError };

const mapKey = (studentId: string) => `edusphere.demo.downloads.${studentId}`;
const NO_DOWNLOADS: DownloadMap = {};

/* ---------- in-flight state (memory only; does not survive a refresh) ---------- */
interface Flight {
  progress: number;
  sizeMb: number;
}
type Flights = Record<string, Flight>;
type Errors = Record<string, DownloadError>;

const EMPTY_FLIGHTS: Flights = {};
const EMPTY_ERRORS: Errors = {};
let flights: Flights = EMPTY_FLIGHTS;
let errors: Errors = EMPTY_ERRORS;
const timers = new Map<string, ReturnType<typeof setInterval>>();
const listeners = new Set<() => void>();

const flightId = (studentId: string, key: string) => `${studentId}|${key}`;

function emit() {
  listeners.forEach((l) => l());
}
function setFlights(next: Flights) {
  flights = next;
  emit();
}
function setErrors(next: Errors) {
  errors = next;
  emit();
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function withoutKey<T extends Record<string, unknown>>(obj: T, key: string): T {
  const next = { ...obj };
  delete next[key];
  return next;
}

export function sumSizeMb(map: DownloadMap): number {
  return Object.values(map).reduce((total, r) => total + r.sizeMb, 0);
}

export function startDownload(studentId: string, item: OfflineItem) {
  const id = flightId(studentId, item.key);
  if (timers.has(id)) return;

  const map = readStoredJson<DownloadMap>(mapKey(studentId), NO_DOWNLOADS);
  if (map[item.key]) return;

  if (!isStorageAvailable()) {
    setErrors({ ...errors, [id]: "storage-unavailable" });
    return;
  }

  const reserved = Object.entries(flights)
    .filter(([k]) => k.startsWith(`${studentId}|`))
    .reduce((total, [, f]) => total + f.sizeMb, 0);
  if (sumSizeMb(map) + reserved + item.sizeMb > STORAGE_ALLOWANCE_MB) {
    setErrors({ ...errors, [id]: "storage-full" });
    return;
  }

  setErrors(withoutKey(errors, id));
  setFlights({ ...flights, [id]: { progress: 0, sizeMb: item.sizeMb } });

  const durationMs = Math.min(5000, Math.max(1600, item.sizeMb * 45));
  const tickMs = 100;
  const step = (100 * tickMs) / durationMs;

  const timer = setInterval(() => {
    const current = flights[id];
    if (!current) {
      clearInterval(timer);
      timers.delete(id);
      return;
    }
    const progress = Math.min(100, current.progress + step);
    if (progress < 100) {
      setFlights({ ...flights, [id]: { ...current, progress } });
      return;
    }
    clearInterval(timer);
    timers.delete(id);
    const saved = updateStoredJson<DownloadMap>(mapKey(studentId), NO_DOWNLOADS, (m) => ({
      ...m,
      [item.key]: { kind: item.kind, id: item.id, sizeMb: item.sizeMb, at: new Date().toISOString() },
    }));
    setFlights(withoutKey(flights, id));
    if (!saved) setErrors({ ...errors, [id]: "storage-unavailable" });
  }, tickMs);
  timers.set(id, timer);
}

export function cancelDownload(studentId: string, key: string) {
  const id = flightId(studentId, key);
  const timer = timers.get(id);
  if (timer) clearInterval(timer);
  timers.delete(id);
  setFlights(withoutKey(flights, id));
}

export function removeDownload(studentId: string, key: string) {
  updateStoredJson<DownloadMap>(mapKey(studentId), NO_DOWNLOADS, (m) => withoutKey(m, key));
}

export function dismissDownloadError(studentId: string, key: string) {
  setErrors(withoutKey(errors, flightId(studentId, key)));
}

/** Download state and actions for the signed-in demo student. */
export function useDownloads() {
  const student = useStudent();
  const { value: map, loaded } = useStoredJson<DownloadMap>(mapKey(student.id), NO_DOWNLOADS);
  const liveFlights = useSyncExternalStore(subscribe, () => flights, () => EMPTY_FLIGHTS);
  const liveErrors = useSyncExternalStore(subscribe, () => errors, () => EMPTY_ERRORS);
  const storageAvailable = useSyncExternalStore(() => () => {}, isStorageAvailable, () => true);

  const stateFor = useCallback(
    (key: string): DownloadState => {
      const id = flightId(student.id, key);
      const flight = liveFlights[id];
      if (flight) return { status: "downloading", progress: flight.progress };
      const error = liveErrors[id];
      if (error) return { status: "error", reason: error };
      const record = map[key];
      if (record) return { status: "done", record };
      return { status: "idle" };
    },
    [student.id, map, liveFlights, liveErrors],
  );

  const start = useCallback((item: OfflineItem) => startDownload(student.id, item), [student.id]);
  const cancel = useCallback((key: string) => cancelDownload(student.id, key), [student.id]);
  const remove = useCallback((key: string) => removeDownload(student.id, key), [student.id]);
  const dismissError = useCallback((key: string) => dismissDownloadError(student.id, key), [student.id]);

  const inFlightKeys = Object.keys(liveFlights)
    .filter((k) => k.startsWith(`${student.id}|`))
    .map((k) => k.slice(student.id.length + 1));

  return {
    loaded,
    map,
    usedMb: sumSizeMb(map),
    storageAvailable,
    inFlightKeys,
    stateFor,
    start,
    cancel,
    remove,
    dismissError,
  };
}
