export type Role = "student" | "teacher" | "admin";
export type AgeBand = "7-9" | "10-12";
export type SubjectId = "mathematics" | "science";
export type Localized = Record<Language, string>;
export type Language = "en" | "te";
export type ContentLanguage = "English" | "Telugu" | "Bilingual";

export interface DemoUser {
  id: string;
  name: string;
  role: Role;
  email: string;
  title: string;
  initials: string;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  grade: string;
  instructor: string;
  lessons: number;
  completedLessons: number;
  hours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  tone: ToneKey;
  bands: AgeBand[];
}


export interface Assignment {
  id: string;
  title: string;
  course: string;
  due: string;
  status: "Pending" | "Submitted" | "Graded";
}

export interface Submission {
  id: string;
  student: string;
  assignment: string;
  submitted: string;
  status: "Needs review" | "Graded";
}

export interface ScheduledClass {
  id: string;
  title: string;
  time: string;
  room: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

export interface StatItem {
  key: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
}

export type ToneKey = "indigo" | "teal" | "amber" | "rose" | "sky";

export interface ChartPoint {
  label: string;
  [series: string]: string | number;
}

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  grade: number;
  band: AgeBand;
  initials: string;
  tone: ToneKey;
  /** Consecutive learning days (mock). */
  streak: number;
  /** XP already earned before this demo session (mock). */
  baseXp: number;
  /** Badge ids earned through activity not simulated in the demo. */
  seedBadges: string[];
}

export type ContentKind = "book" | "video" | "lab" | "activity" | "journal";

export interface ContentItem {
  id: string;
  kind: ContentKind;
  title: Localized;
  subject: string;
  bands: AgeBand[];
  language: ContentLanguage;
  meta: Localized;
  href: string;
  tone: ToneKey;
}

export interface QuizQuestion {
  id: string;
  prompt: Localized;
  options: Localized[];
  /** Index into `options`. */
  answer: number;
  explanation: Localized;
}

export interface Topic {
  title: Localized;
  lessons: number;
  completed: number;
}

export interface BadgeDef {
  id: string;
  title: Localized;
  description: Localized;
  minXp?: number;
  minStreak?: number;
  /** Virtual labs completed. */
  minLabs?: number;
}

/* ---------- Digital library ---------- */
export type LibrarySubject =
  | "mathematics"
  | "science"
  | "english"
  | "telugu"
  | "general-knowledge"
  | "computer-science"
  | "stories";

export interface Author {
  id: string;
  name: string;
  bio: Localized;
}

export interface Book {
  id: string;
  title: Localized;
  authorId: string;
  subject: LibrarySubject;
  /** Languages the book is available in. */
  languages: Language[];
  description: Localized;
  pages: number;
  /** Estimated size for the simulated download. */
  sizeMb: number;
  tone: ToneKey;
  bands: AgeBand[];
  /** Mock popularity score used to rank "Popular books". */
  popularity: number;
}

export interface Collection {
  id: string;
  title: Localized;
  description: Localized;
  bookIds: string[];
  tone: ToneKey;
}

/** One page of original demonstration reading content. */
export interface ReaderPage {
  heading?: string;
  paragraphs: string[];
}

/* ---------- Video learning ---------- */
export type VideoCategory =
  | "mathematics"
  | "science"
  | "english"
  | "telugu"
  | "general-knowledge"
  | "nature"
  | "history-geography"
  | "space"
  | "stories"
  | "computer-science";

/** A playable media file. Absent for lessons whose sample file is not included. */
export interface VideoMedia {
  src: string;
  type: string;
  /** Real subtitle tracks (WebVTT) that ship with the file. */
  captions: { lang: Language; src: string }[];
}

export interface VideoItem {
  id: string;
  title: Localized;
  description: Localized;
  /** Fictional teacher / content creator. */
  creator: string;
  category: VideoCategory;
  /** Lesson length in seconds (metadata, not playback progress). */
  durationSec: number;
  /** Narration language(s). */
  languages: Language[];
  bands: AgeBand[];
  tone: ToneKey;
  /** Estimated size for the simulated download. */
  sizeMb: number;
  objectives: Localized[];
  /** Written transcript paragraphs, where one is available. */
  transcript?: Partial<Record<Language, string[]>>;
  media?: VideoMedia;
  featured?: boolean;
  /** Mock popularity score. */
  popularity: number;
  /** ISO date the teacher added it. */
  addedOn: string;
  /** Part of the "Learn through stories" shelf. */
  story?: boolean;
}

export interface VideoProgress {
  position: number;
  duration: number;
  completed: boolean;
  at: string;
}

/* ---------- Offline downloads (simulated) ---------- */
export type OfflineKind = "book" | "video" | "course";

export interface OfflineItem {
  /** `${kind}:${id}` */
  key: string;
  kind: OfflineKind;
  id: string;
  title: Localized;
  sizeMb: number;
  tone: ToneKey;
  href: string;
  meta: Localized;
  bands: AgeBand[];
}

export interface DownloadRecord {
  kind: OfflineKind;
  id: string;
  sizeMb: number;
  /** ISO timestamp of the simulated download. */
  at: string;
}

export interface HistoryEntry {
  bookId: string;
  lastPage: number;
  totalPages: number;
  at: string;
}

export type SyncType = "progress" | "bookmark" | "favourite";

export interface SyncQueueEntry {
  id: string;
  type: SyncType;
  bookId: string;
  at: string;
}

/* ---------- Virtual labs ---------- */
export type LabCategory = "biology" | "physics" | "chemistry" | "earth" | "general";
export type LabDifficulty = "easy" | "medium";

/** One thing a student does in the workspace. The lab reports it when it happens. */
export interface LabTask {
  id: string;
  title: Localized;
  bands: AgeBand[];
}

export interface LabDef {
  id: string;
  title: Localized;
  description: Localized;
  category: LabCategory;
  difficulty: LabDifficulty;
  bands: AgeBand[];
  languages: Language[];
  minutes: number;
  tone: ToneKey;
  featured?: boolean;
  objectives: Localized[];
  /** Instructions per age group: simpler and guided for 7-9, more open for 10-12. */
  instructions: Record<AgeBand, Localized[]>;
  tasks: LabTask[];
}

export interface LabQuestion {
  prompt: Localized;
  options: Localized[];
  answer: number;
  explanation: Localized;
}

export interface LabProgress {
  lastAccessed: string;
  /** Task ids the student has done. */
  tasks: string[];
  quizPassed: boolean;
  best?: { correct: number; total: number };
  completed: boolean;
  completedAt?: string;
  /** XP given for completing this lab (awarded once). */
  xpEarned: number;
  notes?: string;
}
