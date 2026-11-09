import type { ReactNode } from "react";

export function SimpleList({ children }: { children: ReactNode }) {
  return <ul className="divide-y divide-line">{children}</ul>;
}

export function SimpleListItem({
  primary,
  secondary,
  trailing,
}: {
  primary: string;
  secondary: string;
  trailing?: ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium" title={primary}>
          {primary}
        </p>
        <p className="truncate text-xs text-muted">{secondary}</p>
      </div>
      {trailing}
    </li>
  );
}
