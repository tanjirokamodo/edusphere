import type { Localized, OfflineItem } from "@/types";
import { books } from "./books";
import { courses } from "./courses";
import { videoMinutes, videos } from "./videos";

/** Rough demo estimate: roughly 10 MB of lessons per course hour. */
const MB_PER_COURSE_HOUR = 10;

const bookItems: OfflineItem[] = books.map((b) => ({
  key: `book:${b.id}`,
  kind: "book",
  id: b.id,
  title: b.title,
  sizeMb: b.sizeMb,
  tone: b.tone,
  href: `/student/reader/${b.id}`,
  meta: { en: `${b.pages} pages`, te: `${b.pages} పేజీలు` },
  bands: b.bands,
}));

const videoItems: OfflineItem[] = videos.map((v) => ({
  key: `video:${v.id}`,
  kind: "video",
  id: v.id,
  title: v.title,
  sizeMb: v.sizeMb,
  tone: v.tone,
  href: `/student/videos/${v.id}`,
  meta: { en: `${videoMinutes(v)} min`, te: `${videoMinutes(v)} నిమి.` },
  bands: v.bands,
}));

const courseItems: OfflineItem[] = courses.map((c) => ({
  key: `course:${c.id}`,
  kind: "course",
  id: c.id,
  title: { en: c.title, te: c.title } satisfies Localized,
  sizeMb: c.hours * MB_PER_COURSE_HOUR,
  tone: c.tone,
  href: "/student/learning",
  meta: { en: `${c.lessons} lessons`, te: `${c.lessons} పాఠాలు` },
  bands: c.bands,
}));

export const allOfflineItems: OfflineItem[] = [...bookItems, ...videoItems, ...courseItems];

export function findOfflineItem(key: string): OfflineItem | undefined {
  return allOfflineItems.find((i) => i.key === key);
}

export function offlineItemForVideo(videoId: string): OfflineItem | undefined {
  return findOfflineItem(`video:${videoId}`);
}

export function offlineItemForBook(bookId: string): OfflineItem | undefined {
  return findOfflineItem(`book:${bookId}`);
}
