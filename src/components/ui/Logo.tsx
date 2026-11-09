import { Orbit } from "lucide-react";

export function Logo({ name, light = false }: { name: string; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-white">
        <Orbit className="size-5" aria-hidden />
      </span>
      <span
        className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-primary"}`}
      >
        {name}
      </span>
    </span>
  );
}
