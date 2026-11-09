"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Flame, Lightbulb, Snowflake } from "lucide-react";
import { RunControls, ToggleChip } from "@/components/labs/RunControls";
import { useLanguage } from "@/lib/language";
import type { LabComponentProps } from "../types";
import { arrangement, movement, processExplain, processNames, stateExplain, stateNames, ui } from "./content";
import {
  approach,
  DEFAULT_TEMP,
  energyLevel,
  MAX_TEMP,
  MIN_TEMP,
  processBetween,
  stateOf,
  type MatterProcess,
  type MatterState,
} from "./model";
import { ParticleBox } from "./ParticleBox";

interface State {
  target: number;
  temp: number;
  running: boolean;
  compare: boolean;
  visited: MatterState[];
  changes: MatterProcess[];
  /** Process being shown, and how many seconds are left to show it. */
  process: MatterProcess | null;
  processLeft: number;
}

const initial = (): State => ({
  target: DEFAULT_TEMP,
  temp: DEFAULT_TEMP,
  running: true,
  compare: false,
  visited: ["liquid"],
  changes: [],
  process: null,
  processLeft: 0,
});

const ALL_STATES: MatterState[] = ["solid", "liquid", "gas"];
const ALL_CHANGES: MatterProcess[] = ["melting", "freezing", "evaporation", "condensation"];
const COMPARE_TEMPS: { temp: number; seed: number }[] = [
  { temp: -10, seed: 11 },
  { temp: 50, seed: 22 },
  { temp: 120, seed: 33 },
];

const clampTemp = (n: number) => Math.min(MAX_TEMP, Math.max(MIN_TEMP, n));

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold">{children}</dd>
    </div>
  );
}

export function StatesOfMatterLab({ band, onTask }: LabComponentProps) {
  const { lang } = useLanguage();
  const [state, setState] = useState<State>(initial);
  const ref = useRef<State>(state);

  const update = useCallback((patch: Partial<State>) => {
    ref.current = { ...ref.current, ...patch };
    setState(ref.current);
  }, []);

  const tick = useCallback(() => {
    const s = ref.current;
    const dt = 0.05;
    const temp = approach(s.temp, s.target, dt);
    const before = stateOf(s.temp);
    const after = stateOf(temp);
    const patch: Partial<State> = { temp, processLeft: Math.max(0, s.processLeft - dt) };

    if (after !== before) {
      const process = processBetween(before, after);
      if (process) {
        patch.process = process;
        patch.processLeft = 4;
        if (!s.changes.includes(process)) {
          const changes = [...s.changes, process];
          patch.changes = changes;
          if (ALL_CHANGES.every((c) => changes.includes(c))) onTask("changes");
        }
      }
    }
    if (!s.visited.includes(after)) {
      const visited = [...s.visited, after];
      patch.visited = visited;
      if (ALL_STATES.every((x) => visited.includes(x))) onTask("states");
    }
    if (temp !== s.temp || s.processLeft > 0) update(patch);
  }, [onTask, update]);

  useEffect(() => {
    if (!state.running) return;
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, [state.running, tick]);

  const current = stateOf(state.temp);
  const energy = energyLevel(state.temp);
  const setTarget = (t: number) => update({ target: clampTemp(t) });

  return (
    <div className="space-y-4">
      <RunControls
        running={state.running}
        started
        onToggle={() => update({ running: !state.running })}
        onReset={() => update(initial())}
      >
        <ToggleChip
          pressed={state.compare}
          onClick={() => {
            update({ compare: !state.compare });
            if (!state.compare) onTask("compare");
          }}
        >
          {ui.compare[lang]}
        </ToggleChip>
      </RunControls>

      {state.compare ? (
        <div>
          <p className="mb-3 text-sm text-muted">{ui.compareNote[lang]}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {COMPARE_TEMPS.map(({ temp, seed }) => {
              const st = stateOf(temp);
              return (
                <figure key={st} className="rounded-2xl border border-line bg-background p-3">
                  <ParticleBox temp={temp} running={state.running} seed={seed} label={`${stateNames[st][lang]}. ${ui.boxLabel[lang]}`} />
                  <figcaption className="mt-3">
                    <p className="text-sm font-bold">
                      {stateNames[st][lang]} · {temp} {ui.degrees[lang]}
                    </p>
                    <dl className="mt-2 space-y-2">
                      <Fact label={ui.arrangement[lang]}>{arrangement[st][lang]}</Fact>
                      <Fact label={ui.movement[lang]}>{movement[st][lang]}</Fact>
                    </dl>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <ParticleBox temp={state.temp} running={state.running} seed={7} label={`${stateNames[current][lang]}. ${ui.boxLabel[lang]}`} />
            <p className="mt-2 text-center text-2xl font-bold tabular-nums">
              {Math.round(state.temp)} {ui.degrees[lang]}
            </p>
          </div>

          <div className="min-w-0 space-y-4">
            <div>
              <label htmlFor="som-temp" className="flex items-baseline justify-between text-sm font-semibold">
                <span>{ui.temperature[lang]}</span>
                <span className="tabular-nums text-muted">
                  {state.target} {ui.degrees[lang]}
                </span>
              </label>
              <input
                id="som-temp"
                type="range"
                min={MIN_TEMP}
                max={MAX_TEMP}
                step={1}
                value={state.target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="mt-1 h-8 w-full accent-primary"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTarget(state.target - 10)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold hover:border-primary/50"
                >
                  <Snowflake className="size-4 text-[#2A6FB3]" aria-hidden />
                  {ui.cool[lang]}
                </button>
                <button
                  type="button"
                  onClick={() => setTarget(state.target + 10)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold hover:border-primary/50"
                >
                  <Flame className="size-4 text-coral" aria-hidden />
                  {ui.heat[lang]}
                </button>
              </div>
              <div className="mt-3" role="group" aria-label={ui.presets[lang]}>
                <p className="mb-1.5 text-xs font-semibold text-muted">{ui.presets[lang]}</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: ui.presetSolid, t: -10 },
                    { label: ui.presetLiquid, t: 50 },
                    { label: ui.presetGas, t: 110 },
                  ].map((p) => (
                    <button
                      key={p.t}
                      type="button"
                      onClick={() => setTarget(p.t)}
                      className="min-h-10 rounded-xl border border-line bg-card px-3 text-sm font-semibold hover:border-primary/50"
                    >
                      {p.label[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-background p-4" aria-live="polite">
              <dl className="grid grid-cols-2 gap-3">
                <Fact label={ui.state[lang]}>{stateNames[current][lang]}</Fact>
                <Fact label={ui.energy[lang]}>
                  <span
                    role="progressbar"
                    aria-label={ui.energy[lang]}
                    aria-valuenow={Math.round(energy * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="block h-2 w-full overflow-hidden rounded-full bg-line"
                  >
                    <span className="block h-full rounded-full bg-coral transition-[width] duration-200" style={{ width: `${Math.max(4, energy * 100)}%` }} />
                  </span>
                </Fact>
                <Fact label={ui.arrangement[lang]}>{arrangement[current][lang]}</Fact>
                <Fact label={ui.movement[lang]}>{movement[current][lang]}</Fact>
              </dl>
              {state.process && state.processLeft > 0 && (
                <div className="mt-3 rounded-lg bg-secondary-soft p-3">
                  <p className="text-xs font-semibold text-[#0b7a6e]">{ui.nowDoing[lang]}</p>
                  <p className="text-sm font-bold">{processNames[state.process][lang]}</p>
                  <p className="mt-0.5 text-xs">{processExplain[state.process][lang]}</p>
                </div>
              )}
              <p className="mt-3 text-sm leading-relaxed">{stateExplain[current][band][lang]}</p>
              <p className="mt-2 text-xs font-medium text-primary">{band === "7-9" ? ui.rule[lang] : ui.rule1012[lang]}</p>
            </div>
          </div>
        </div>
      )}

      <p className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted">
        <span>
          {ui.seen[lang]}: {state.visited.map((s) => stateNames[s][lang].split(" ")[0]).join(", ")}
        </span>
        {band === "10-12" && (
          <span>
            {ui.seenChanges[lang]}: {state.changes.length ? state.changes.map((c) => processNames[c][lang]).join(", ") : "—"}
          </span>
        )}
      </p>

      <p className="flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-sm text-[#6b4700]">
        <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          <strong>{ui.tryThis[lang]}: </strong>
          {band === "7-9" ? ui.tryThis79[lang] : ui.tryThis1012[lang]}
        </span>
      </p>
    </div>
  );
}
