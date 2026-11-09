"use client";

import { defaultStudent, findStudent } from "@/data/students";
import type { StudentProfile } from "@/types";
import { useStoredString, writeStored } from "./local-store";
import { signIn } from "./session";

export const STUDENT_KEY = "edusphere.demo.student";

/** The selected mock student profile (falls back to a default profile). */
export function useStudent(): StudentProfile {
  const stored = useStoredString(STUDENT_KEY);
  return findStudent(stored) ?? defaultStudent;
}

/** Demo only: choose a mock student profile and open the student session. */
export function selectStudent(id: string) {
  writeStored(STUDENT_KEY, id);
  signIn("student");
}
