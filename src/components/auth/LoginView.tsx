"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Info,
  Presentation,
  ShieldCheck,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Logo } from "@/components/ui/Logo";
import { dashboardPath, demoUsers } from "@/data/users";
import { defaultStudent, findStudent } from "@/data/students";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/language";
import { signIn } from "@/lib/session";
import { selectStudent } from "@/lib/student";
import type { Role } from "@/types";
import { StudentProfileChooser } from "./StudentProfileChooser";

const roles: { role: Role; icon: LucideIcon; label: TranslationKey; desc: TranslationKey }[] = [
  { role: "student", icon: GraduationCap, label: "role.student", desc: "role.student.desc" },
  { role: "teacher", icon: Presentation, label: "role.teacher", desc: "role.teacher.desc" },
  { role: "admin", icon: ShieldCheck, label: "role.admin", desc: "role.admin.desc" },
];

const highlights: { icon: LucideIcon; textKey: TranslationKey }[] = [
  { icon: BookOpen, textKey: "login.hl1" },
  { icon: FlaskConical, textKey: "login.hl2" },
  { icon: WifiOff, textKey: "login.hl3" },
];

/** Demo entry: pick a role (and a student profile). No real authentication. */
export function LoginView() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Role>("student");
  const [studentId, setStudentId] = useState(defaultStudent.id);

  const displayName =
    selected === "student" ? (findStudent(studentId) ?? defaultStudent).name : demoUsers[selected].name;

  const handleContinue = () => {
    if (selected === "student") selectStudent(studentId);
    else signIn(selected);
    router.push(dashboardPath[selected]);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-white lg:flex">
        <span className="pointer-events-none absolute -right-16 top-20 size-64 rounded-full bg-secondary/35" aria-hidden />
        <span className="pointer-events-none absolute -bottom-20 left-10 size-56 rounded-full bg-accent/30" aria-hidden />
        <span className="pointer-events-none absolute bottom-40 right-16 size-20 rounded-full bg-coral/45" aria-hidden />
        <div className="relative">
          <Logo name={t("app.name")} light />
        </div>
        <div className="relative">
          <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight">{t("app.tagline")}</h1>
          <ul className="mt-8 space-y-4 text-sm text-white/90">
            {highlights.map(({ icon: Icon, textKey }) => (
              <li key={textKey} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-white/15">
                  <Icon className="size-4" aria-hidden />
                </span>
                {t(textKey)}
              </li>
            ))}
          </ul>
        </div>
        <span className="relative h-1 w-16 rounded-full bg-accent" />
      </aside>

      <main className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between lg:justify-end">
          <span className="lg:hidden">
            <Logo name={t("app.name")} />
          </span>
          <LanguageSwitch />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("login.heading")}</h2>
          <p className="mt-2 text-muted">{t("login.subheading")}</p>

          <div role="radiogroup" aria-label={t("login.subheading")} className="mt-8 space-y-3">
            {roles.map(({ role, icon: Icon, label, desc }) => {
              const active = selected === role;
              return (
                <div
                  key={role}
                  className={`rounded-2xl border p-4 transition-colors ${
                    active ? "border-primary bg-primary-soft" : "border-line bg-card hover:border-primary/40"
                  }`}
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSelected(role)}
                    className="flex w-full items-start gap-4 text-left"
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${active ? "bg-primary text-white" : "bg-background text-primary"}`}>
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold">{t(label)}</span>
                      <span className="mt-0.5 block text-sm text-muted">{t(desc)}</span>
                    </span>
                  </button>
                  {active && role === "student" && (
                    <StudentProfileChooser selectedId={studentId} onSelect={setStudentId} />
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-white transition-colors hover:bg-primary/90"
          >
            {t("login.continueAs")} {displayName}
            <ArrowRight className="size-4" aria-hidden />
          </button>

          <p className="mt-6 flex gap-2 rounded-xl bg-accent-soft p-3 text-xs text-[#6b4700]">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t("login.demoNotice")}
          </p>
        </div>
      </main>
    </div>
  );
}
