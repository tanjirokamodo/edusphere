import type { ReactNode } from "react";

type Variant = "neutral" | "success" | "warning" | "info";

const variants: Record<Variant, string> = {
  neutral: "bg-background text-muted",
  success: "bg-secondary-soft text-[#0b7a6e]",
  warning: "bg-accent-soft text-[#8a5a00]",
  info: "bg-primary-soft text-primary",
};

export function Badge({
  children,
  variant = "neutral",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
