import type { AgeBand, ContentItem, Localized } from "@/types";
import { books, languageBadge, subjectLabels } from "./books";
import { labCategoryLabels, labs } from "./labs";
import { videoCategoryLabels, videoMinutes, videos } from "./videos";

const mins = (n: number): Localized => ({ en: `${n} min`, te: `${n} నిమి.` });
const read = (n: number): Localized => ({ en: `${n} min read`, te: `${n} నిమి. పఠనం` });
const interactive: Localized = { en: "Interactive", te: "ఇంటరాక్టివ్" };
const both: AgeBand[] = ["7-9", "10-12"];

const bookItems: ContentItem[] = books.map((b) => ({
  id: b.id,
  kind: "book",
  title: b.title,
  subject: subjectLabels[b.subject].en,
  bands: b.bands,
  language: languageBadge(b.languages),
  meta: { en: `${b.pages} pages`, te: `${b.pages} పేజీలు` },
  href: "/student/library",
  tone: b.tone,
}));

const videoItems: ContentItem[] = videos.map((v) => ({
  id: v.id,
  kind: "video",
  title: v.title,
  subject: videoCategoryLabels[v.category].en,
  bands: v.bands,
  language: languageBadge(v.languages),
  meta: mins(videoMinutes(v)),
  href: `/student/videos/${v.id}`,
  tone: v.tone,
}));

const labItems: ContentItem[] = labs.map((l) => ({
  id: l.id,
  kind: "lab",
  title: l.title,
  subject: labCategoryLabels[l.category].en,
  bands: l.bands,
  language: "Bilingual",
  meta: mins(l.minutes),
  href: `/student/labs/${l.id}`,
  tone: l.tone,
}));

const otherItems: ContentItem[] = [
  { id: "a-math", kind: "activity", title: { en: "Maths Practice", te: "గణిత సాధన" }, subject: "Mathematics", bands: both, language: "Bilingual", meta: interactive, href: "/student/mathematics", tone: "teal" },
  { id: "a-science", kind: "activity", title: { en: "Science Practice", te: "సైన్స్ సాధన" }, subject: "Science", bands: both, language: "Bilingual", meta: interactive, href: "/student/science", tone: "rose" },
  { id: "j-sky", kind: "journal", title: { en: "Young Scientists Journal: Why Is the Sky Blue?", te: "యంగ్ సైంటిస్ట్స్ జర్నల్: ఆకాశం ఎందుకు నీలంగా ఉంటుంది?" }, subject: "Science", bands: ["10-12"], language: "Bilingual", meta: read(6), href: "/student/journals", tone: "sky" },
  { id: "j-birds", kind: "journal", title: { en: "Nature Notes: Monsoon Birds", te: "ప్రకృతి గమనికలు: వర్షాకాలపు పక్షులు" }, subject: "Science", bands: both, language: "Bilingual", meta: read(4), href: "/student/journals", tone: "amber" },
];

export const contentItems: ContentItem[] = [...videoItems, ...labItems, ...otherItems, ...bookItems];
