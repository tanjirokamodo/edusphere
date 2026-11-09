import {
  Award,
  BarChart3,
  BookOpen,
  Crown,
  Download,
  FlaskConical,
  Gamepad2,
  Newspaper,
  PlayCircle,
  Target,
  User,
  BookText,
  BookCopy,
  ClipboardList,
  LayoutDashboard,
  Library,
  Presentation,
  Upload,
  UserCog,
  Users,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";
import type { TranslationKey } from "@/lib/i18n";
import type { Role } from "@/types";

export interface NavItem {
  labelKey: TranslationKey;
  href: string;
  icon: LucideIcon;
  /** Optional group heading shown above this item in the sidebar. */
  sectionKey?: TranslationKey;
}

export const navigation: Record<Role, NavItem[]> = {
  student: [
    { labelKey: "nav.dashboard", href: "/student", icon: LayoutDashboard },
    { labelKey: "nav.library", href: "/student/library", icon: Library, sectionKey: "nav.section.library" },
    { labelKey: "nav.reader", href: "/student/reader", icon: BookOpen },
    { labelKey: "nav.videos", href: "/student/videos", icon: PlayCircle },
    { labelKey: "nav.labs", href: "/student/labs", icon: FlaskConical },
    { labelKey: "nav.journals", href: "/student/journals", icon: Newspaper },
    { labelKey: "nav.activities", href: "/student/activities", icon: Gamepad2, sectionKey: "nav.section.activities" },
    { labelKey: "nav.chess", href: "/student/activities/chess", icon: Crown },
    { labelKey: "nav.challenges", href: "/student/challenges", icon: Target, sectionKey: "nav.section.me" },
    { labelKey: "nav.achievements", href: "/student/achievements", icon: Award },
    { labelKey: "nav.offline", href: "/student/offline", icon: Download },
    { labelKey: "nav.profile", href: "/student/profile", icon: User },
  ],
  teacher: [
    { labelKey: "nav.dashboard", href: "/teacher", icon: LayoutDashboard },
    { labelKey: "nav.courseManagement", href: "/teacher/courses", icon: Presentation },
    { labelKey: "nav.contentManagement", href: "/teacher/content", icon: BookCopy },
    { labelKey: "nav.uploadMaterials", href: "/teacher/upload", icon: Upload },
    { labelKey: "nav.assignments", href: "/teacher/assignments", icon: ClipboardList },
    { labelKey: "nav.performance", href: "/teacher/performance", icon: BarChart3 },
  ],
  admin: [
    { labelKey: "nav.dashboard", href: "/admin", icon: LayoutDashboard },
    { labelKey: "nav.students", href: "/admin/students", icon: Users },
    { labelKey: "nav.teachers", href: "/admin/teachers", icon: UserCog },
    { labelKey: "nav.courseManagement", href: "/admin/courses", icon: BookText },
    { labelKey: "nav.libraryManagement", href: "/admin/library", icon: Library },
    { labelKey: "nav.contentManagement", href: "/admin/content", icon: FolderKanban },
    { labelKey: "nav.analytics", href: "/admin/analytics", icon: BarChart3 },
  ],
};

/** Pages reachable from the dashboard that have no sidebar entry. */
const offMenuRoutes: Record<string, TranslationKey> = {
  "/student/learning": "nav.learning",
  "/student/languages": "nav.languages",
};

/** Title key for a route, whether or not it appears in the sidebar. */
export function findRouteLabel(role: Role, pathname: string): TranslationKey | undefined {
  return navigation[role].find((item) => item.href === pathname)?.labelKey ?? offMenuRoutes[pathname];
}
