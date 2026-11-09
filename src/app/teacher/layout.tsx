import { PortalShell } from "@/components/layout/PortalShell";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell role="teacher">{children}</PortalShell>;
}
