"use client";

import { demoUsers, studentToUser } from "@/data/users";
import { defaultStudent, findStudent } from "@/data/students";
import type { DemoUser, Role } from "@/types";
import { useStoredString, writeStored } from "./local-store";

const SESSION_KEY = "edusphere.demo.role";
const STUDENT_KEY = "edusphere.demo.student";

export type SessionState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "signed-in"; role: Role; user: DemoUser };

function isRole(value: string | null | undefined): value is Role {
  return value === "student" || value === "teacher" || value === "admin";
}

export function useSession(): SessionState {
  const stored = useStoredString(SESSION_KEY);
  const studentId = useStoredString(STUDENT_KEY);
  if (stored === undefined) return { status: "loading" };
  if (!isRole(stored)) return { status: "signed-out" };
  const user =
    stored === "student"
      ? studentToUser(findStudent(studentId) ?? defaultStudent)
      : demoUsers[stored];
  return { status: "signed-in", role: stored, user };
}

export function signIn(role: Role) {
  writeStored(SESSION_KEY, role);
}

export function signOut() {
  writeStored(SESSION_KEY, null);
}
