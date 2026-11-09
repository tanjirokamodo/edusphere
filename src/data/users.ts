import type { DemoUser, Role, StudentProfile } from "@/types";
import { defaultStudent } from "./students";

export function studentToUser(s: StudentProfile): DemoUser {
  return {
    id: s.id,
    name: s.name,
    role: "student",
    email: `${s.name.split(" ")[0].toLowerCase()}@edusphere.demo`,
    title: `Grade ${s.grade} · Age ${s.age}`,
    initials: s.initials,
  };
}

export const demoUsers: Record<Role, DemoUser> = {
  student: studentToUser(defaultStudent),
  teacher: {
    id: "tch-207",
    name: "Dr. Suresh Varma",
    role: "teacher",
    email: "suresh.varma@edusphere.demo",
    title: "Senior Faculty, Science",
    initials: "SV",
  },
  admin: {
    id: "adm-001",
    name: "Lakshmi Prasad",
    role: "admin",
    email: "lakshmi.prasad@edusphere.demo",
    title: "Platform Administrator",
    initials: "LP",
  },
};

export const dashboardPath: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};
