"use client";

import type { HistoryEntry } from "@/types";
import { updateStoredJson, useStoredJson } from "./local-store";
import { queueSync } from "./sync-queue";

/* ---------- Favourite books ---------- */
const favKey = (studentId: string) => `edusphere.demo.favourites.${studentId}`;
const NO_IDS: string[] = [];

export function useFavourites(studentId: string) {
  const { value, loaded } = useStoredJson<string[]>(favKey(studentId), NO_IDS);
  return { ids: value, loaded };
}

export function toggleFavourite(studentId: string, bookId: string) {
  updateStoredJson<string[]>(favKey(studentId), NO_IDS, (ids) =>
    ids.includes(bookId) ? ids.filter((i) => i !== bookId) : [bookId, ...ids],
  );
  queueSync(studentId, "favourite", bookId);
}

/* ---------- Page bookmarks (per book) ---------- */
type BookmarkMap = Record<string, number[]>;
const bmKey = (studentId: string) => `edusphere.demo.bookmarks.${studentId}`;
const NO_BOOKMARKS: BookmarkMap = {};

export function useBookmarks(studentId: string, bookId: string) {
  const { value } = useStoredJson<BookmarkMap>(bmKey(studentId), NO_BOOKMARKS);
  return value[bookId] ?? [];
}

export function toggleBookmark(studentId: string, bookId: string, page: number) {
  updateStoredJson<BookmarkMap>(bmKey(studentId), NO_BOOKMARKS, (map) => {
    const current = map[bookId] ?? [];
    const next = current.includes(page)
      ? current.filter((p) => p !== page)
      : [...current, page].sort((a, b) => a - b);
    return { ...map, [bookId]: next };
  });
  queueSync(studentId, "bookmark", bookId);
}

/* ---------- Reading history ---------- */
const historyKey = (studentId: string) => `edusphere.demo.history.${studentId}`;
const NO_HISTORY: HistoryEntry[] = [];
const MAX_HISTORY = 12;

export function useReadingHistory(studentId: string) {
  const { value, loaded } = useStoredJson<HistoryEntry[]>(historyKey(studentId), NO_HISTORY);
  return { entries: value, loaded };
}

/** Records that a book was opened: moves it to the front, keeps its saved page. */
export function touchHistory(studentId: string, bookId: string, totalPages: number) {
  updateStoredJson<HistoryEntry[]>(historyKey(studentId), NO_HISTORY, (entries) => {
    const existing = entries.find((e) => e.bookId === bookId);
    const entry: HistoryEntry = {
      bookId,
      lastPage: existing?.lastPage ?? 1,
      totalPages,
      at: new Date().toISOString(),
    };
    return [entry, ...entries.filter((e) => e.bookId !== bookId)].slice(0, MAX_HISTORY);
  });
}

export function saveReadingPage(studentId: string, bookId: string, page: number, totalPages: number) {
  updateStoredJson<HistoryEntry[]>(historyKey(studentId), NO_HISTORY, (entries) => {
    const entry: HistoryEntry = { bookId, lastPage: page, totalPages, at: new Date().toISOString() };
    return [entry, ...entries.filter((e) => e.bookId !== bookId)].slice(0, MAX_HISTORY);
  });
  queueSync(studentId, "progress", bookId);
}
