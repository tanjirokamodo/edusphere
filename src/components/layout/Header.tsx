"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/language";
import { signOut } from "@/lib/session";
import type { DemoUser } from "@/types";

const notifications: Record<string, string[]> = {
  student: [
    "Ray diagrams assignment is due tomorrow at 5:00 PM.",
    "New video added to Physics: Reflection of Light.",
  ],
  teacher: [
    "9 submissions have been waiting more than 3 days.",
    "Virtual Lab session starts at 2:00 PM today.",
  ],
  admin: [
    "Python Foundations is waiting for course approval.",
    "Grade 9 batch import completed.",
  ],
};

interface HeaderProps {
  user: DemoUser;
  onOpenMenu: () => void;
}

export function Header({ user, onOpenMenu }: HeaderProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const items = notifications[user.role] ?? [];

  useEffect(() => {
    if (!bellOpen) return;
    const close = (e: MouseEvent) => {
      if (!bellRef.current?.contains(e.target as Node)) setBellOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setBellOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [bellOpen]);

  const handleSignOut = () => {
    signOut();
    router.replace("/");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-card/90 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label={t("header.openMenu")}
        className="rounded-lg p-2 text-muted hover:bg-background lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      <Badge variant="warning">{t("header.demoBadge")}</Badge>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <LanguageSwitch />

        <div className="relative" ref={bellRef}>
          <button
            type="button"
            onClick={() => setBellOpen((v) => !v)}
            aria-label={t("header.notifications")}
            aria-expanded={bellOpen}
            className="relative rounded-full p-2 text-muted hover:bg-background"
          >
            <Bell className="size-5" aria-hidden />
            {items.length > 0 && (
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
            )}
          </button>
          {bellOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-line bg-card p-3 shadow-card">
              <p className="px-2 pb-2 text-sm font-semibold">
                {t("header.notifications")}
              </p>
              {items.length === 0 ? (
                <p className="px-2 py-3 text-sm text-muted">
                  {t("header.noNotifications")}
                </p>
              ) : (
                <ul className="space-y-1">
                  {items.map((n) => (
                    <li key={n} className="rounded-lg px-2 py-2 text-sm hover:bg-background">
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="hidden items-center gap-2.5 border-l border-line pl-3 sm:flex">
          <span className="grid size-9 place-items-center rounded-full bg-secondary text-sm font-bold text-white">
            {user.initials}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted">{user.title}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          aria-label={t("header.signOut")}
          title={t("header.signOut")}
          className="rounded-full p-2 text-muted hover:bg-background hover:text-danger"
        >
          <LogOut className="size-5" aria-hidden />
        </button>
      </div>
    </header>
  );
}
