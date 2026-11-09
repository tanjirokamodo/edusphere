import type { StudentProfile } from "@/types";

/** Mock student profiles for the demo. Not real accounts. */
export const studentProfiles: StudentProfile[] = [
  { id: "stu-ananya", name: "Ananya Reddy", age: 8, grade: 3, band: "7-9", initials: "AR", tone: "rose", streak: 5, baseXp: 140, seedBadges: ["bookworm"] },
  { id: "stu-arjun", name: "Arjun Naidu", age: 10, grade: 5, band: "10-12", initials: "AN", tone: "teal", streak: 9, baseXp: 360, seedBadges: ["bookworm", "number-ninja"] },
  { id: "stu-sahasra", name: "Sahasra Varma", age: 12, grade: 7, band: "10-12", initials: "SV", tone: "amber", streak: 3, baseXp: 780, seedBadges: ["bookworm", "number-ninja", "curious-scientist"] },
];

export const defaultStudent = studentProfiles[1];

export function findStudent(id: string | null | undefined): StudentProfile | undefined {
  return studentProfiles.find((s) => s.id === id);
}
