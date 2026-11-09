"use client";

import type { StudentProfile } from "@/types";
import { readStored, useStoredString, writeStored } from "./local-store";

/** XP earned during this demo lives only in this browser's localStorage. */
const xpKey = (studentId: string) => `edusphere.demo.xp.${studentId}`;

export const XP_PER_LEVEL = 200;

function parse(raw: string | null | undefined): number {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/** XP earned in the demo (excludes the profile's mock starting XP). */
export function useEarnedXp(studentId: string): number {
  return parse(useStoredString(xpKey(studentId)));
}

export function addXp(studentId: string, amount: number) {
  if (amount <= 0) return;
  writeStored(xpKey(studentId), String(parse(readStored(xpKey(studentId))) + amount));
}

export function levelFor(totalXp: number) {
  return {
    level: Math.floor(totalXp / XP_PER_LEVEL) + 1,
    intoLevel: totalXp % XP_PER_LEVEL,
  };
}

/** Total XP, level and progress for a student, including mock starting XP. */
export function useXpSummary(student: StudentProfile) {
  const earned = useEarnedXp(student.id);
  const totalXp = student.baseXp + earned;
  return { earned, totalXp, ...levelFor(totalXp) };
}
