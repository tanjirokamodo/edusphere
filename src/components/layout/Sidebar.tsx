"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { navigation } from "@/config/navigation";
import { useLanguage } from "@/lib/language";
import { Logo } from "@/components/ui/Logo";
import type { Role } from "@/types";

interface SidebarProps {
  role: Role;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ role, open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const items = navigation[role];

  const within = (path: string, href: string) => path === href || path.startsWith(href + "/");
  // The most specific menu entry wins, so /student/activities/chess does not also light up /student/activities.
  const isActive = (href: string) =>
    href === items[0].href
      ? pathname === href
      : within(pathname, href) && !items.some((o) => o.href.length > href.length && within(pathname, o.href));

  return (
    <>
      {/* Mobile / tablet backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-card transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Primary"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo name={t("app.name")} />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("header.closeMenu")}
            className="rounded-lg p-2 text-muted hover:bg-background lg:hidden"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2 [scrollbar-width:thin]">
          {items.map(({ href, icon: Icon, labelKey, sectionKey }) => {
            const active = isActive(href);
            return (
              <div key={href}>
                {sectionKey && (
                  <p className="px-3 pb-1 pt-4 text-xs font-semibold text-muted">
                    {t(sectionKey)}
                  </p>
                )}
              <Link
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                {t(labelKey)}
              </Link>
              </div>
            );
          })}
        </nav>
        <p className="px-5 py-4 text-xs text-muted">{t("app.tagline")}</p>
      </aside>
    </>
  );
}
