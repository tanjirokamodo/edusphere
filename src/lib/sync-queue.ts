"use client";

import type { SyncQueueEntry, SyncType } from "@/types";
import { updateStoredJson, useStoredJson, useStoredString, writeStored } from "./local-store";

/*
 * Simulated "pending synchronisation". Changes made on this device (reading
 * progress, bookmarks, favourites) are queued here. A real app would upload
 * them when online; the demo only lets you clear the queue.
 */
const queueKey = (studentId: string) => `edusphere.demo.syncqueue.${studentId}`;
const lastSyncKey = (studentId: string) => `edusphere.demo.lastsync.${studentId}`;
const EMPTY: SyncQueueEntry[] = [];

export function queueSync(studentId: string, type: SyncType, bookId: string) {
  const id = `${type}:${bookId}`;
  updateStoredJson<SyncQueueEntry[]>(queueKey(studentId), EMPTY, (q) => [
    { id, type, bookId, at: new Date().toISOString() },
    ...q.filter((e) => e.id !== id),
  ]);
}

export function completeSimulatedSync(studentId: string) {
  writeStored(queueKey(studentId), JSON.stringify([]));
  writeStored(lastSyncKey(studentId), new Date().toISOString());
}

export function useSyncQueue(studentId: string) {
  const { value, loaded } = useStoredJson<SyncQueueEntry[]>(queueKey(studentId), EMPTY);
  const lastSync = useStoredString(lastSyncKey(studentId));
  return { entries: value, loaded, lastSync: lastSync ?? null };
}
