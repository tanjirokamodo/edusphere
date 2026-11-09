"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for demo state (session role, language,
 * downloads). It is NOT secure storage and not real offline sync.
 *
 * Server snapshot is `undefined`, meaning "not yet read on the client".
 * The client snapshot is the stored string, or `null` when nothing is stored.
 */
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Returns false when the browser blocked the write (private mode, quota). */
export function writeStored(key: string, value: string | null): boolean {
  let ok = true;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    ok = false; // demo continues without persistence
  }
  notify();
  return ok;
}

export function useStoredString(key: string): string | null | undefined {
  return useSyncExternalStore(
    subscribe,
    () => readStored(key),
    () => undefined,
  );
}

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * JSON-valued variant. `fallback` must be a stable (module-level) constant.
 * `loaded` is false until the client has read storage (server render / hydration).
 */
export function useStoredJson<T>(key: string, fallback: T): { value: T; loaded: boolean } {
  const raw = useStoredString(key);
  const value = useMemo(() => parseJson(raw, fallback), [raw, fallback]);
  return { value, loaded: raw !== undefined };
}

/** Read-modify-write so event handlers never act on a stale snapshot. */
export function updateStoredJson<T>(key: string, fallback: T, update: (current: T) => T): boolean {
  return writeStored(key, JSON.stringify(update(parseJson(readStored(key), fallback))));
}

export function readStoredJson<T>(key: string, fallback: T): T {
  return parseJson(readStored(key), fallback);
}

let storageProbe: boolean | undefined;

/** True when localStorage can actually be written in this browser. */
export function isStorageAvailable(): boolean {
  if (storageProbe === undefined) {
    try {
      const k = "edusphere.demo.probe";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      storageProbe = true;
    } catch {
      storageProbe = false;
    }
  }
  return storageProbe;
}
