import type { ToneKey } from "@/types";

/*
 * SAMPLE DATA for the demo. These classmates are made up (three share a name
 * with the demo student profiles so the class feels consistent). Their
 * availability is a fixed label, not a live status: nobody is actually online.
 * A real class roster and presence would come from the school's server.
 */

export type Availability = "available" | "inMatch" | "away";

export interface Classmate {
  id: string;
  name: string;
  initials: string;
  section: string;
  tone: ToneKey;
  availability: Availability;
}

export const CLASS_SECTION = "B";

export const roster: Classmate[] = [
  { id: "stu-ananya", name: "Ananya", initials: "AR", section: CLASS_SECTION, tone: "rose", availability: "available" },
  { id: "stu-arjun", name: "Arjun", initials: "AN", section: CLASS_SECTION, tone: "teal", availability: "available" },
  { id: "mock-rahul", name: "Rahul", initials: "RA", section: CLASS_SECTION, tone: "indigo", availability: "inMatch" },
  { id: "stu-sahasra", name: "Sahasra", initials: "SV", section: CLASS_SECTION, tone: "amber", availability: "inMatch" },
  { id: "mock-kiran", name: "Kiran", initials: "KI", section: CLASS_SECTION, tone: "sky", availability: "available" },
  { id: "mock-meera", name: "Meera", initials: "ME", section: CLASS_SECTION, tone: "rose", availability: "inMatch" },
  { id: "mock-rohan", name: "Rohan", initials: "RO", section: CLASS_SECTION, tone: "teal", availability: "inMatch" },
  { id: "mock-priya", name: "Priya", initials: "PR", section: CLASS_SECTION, tone: "amber", availability: "away" },
];

/** Sample "ongoing matches" shown in the lobby. They are not real and cannot be watched. */
export const sampleOngoing: { id: string; white: string; black: string; move: number }[] = [
  { id: "o1", white: "mock-rahul", black: "mock-meera", move: 14 },
  { id: "o2", white: "mock-rohan", black: "stu-sahasra", move: 7 },
];

export function classIdFor(grade: number): string {
  return `demo-class-${grade}${CLASS_SECTION}`;
}

/** The viewer's classmates: everyone in the sample class except the viewer. */
export function classmatesOf(studentId: string): Classmate[] {
  return roster.filter((c) => c.id !== studentId);
}

export function findClassmate(id: string): Classmate | undefined {
  return roster.find((c) => c.id === id);
}
