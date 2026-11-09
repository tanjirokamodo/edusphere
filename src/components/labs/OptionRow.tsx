"use client";

export interface Option<T extends string | number> {
  value: T;
  label: string;
}

/** Touch-friendly single-choice row used inside lab control panels. */
export function OptionRow<T extends string | number>({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
}) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-1.5 text-xs font-semibold text-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              disabled={disabled}
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`min-h-10 flex-1 basis-auto rounded-xl border px-3 text-sm font-semibold leading-tight transition-colors ${
                active
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-card text-foreground hover:border-primary/50"
              } disabled:opacity-50`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
