import { badgeDefs } from "@/data/subjects";
import type { BadgeDef, StudentProfile } from "@/types";

/** A badge is earned through seeded history, an XP threshold or a streak. */
export function isBadgeEarned(badge: BadgeDef, student: StudentProfile, earnedXp: number, labsDone = 0): boolean {
  if (student.seedBadges.includes(badge.id)) return true;
  if (badge.minXp !== undefined && earnedXp >= badge.minXp) return true;
  if (badge.minStreak !== undefined && student.streak >= badge.minStreak) return true;
  if (badge.minLabs !== undefined && labsDone >= badge.minLabs) return true;
  return false;
}

export function earnedBadges(student: StudentProfile, earnedXp: number, labsDone = 0): BadgeDef[] {
  return badgeDefs.filter((b) => isBadgeEarned(b, student, earnedXp, labsDone));
}
