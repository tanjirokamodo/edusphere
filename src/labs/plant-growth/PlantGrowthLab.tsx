"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Lightbulb } from "lucide-react";
import { OptionRow } from "@/components/labs/OptionRow";
import { RunControls, ToggleChip } from "@/components/labs/RunControls";
import { useLanguage } from "@/lib/language";
import type { AgeBand, Language } from "@/types";
import type { LabComponentProps } from "../types";
import {
  allGood,
  healthNames,
  noLightWhy,
  noWaterWhy,
  plantFacts,
  plantNames,
  reasonText,
  soilNames,
  soilNotes,
  stageNames,
  sunLevels,
  ui,
  waterLevels,
} from "./content";
import {
  conditionsDiffer,
  defaultPot,
  factorStates,
  healthOf,
  isSettled,
  LEVELS,
  PLANTS,
  SOILS,
  stageOf,
  stepPot,
  winner,
  type Factor,
  type Health,
  type Level,
  type PlantKind,
  type Pot,
  type SoilKind,
  type Stage,
  type Winner,
} from "./model";
import { PlantSvg } from "./PlantSvg";

interface State {
  pots: [Pot, Pot];
  running: boolean;
  started: boolean;
  compare: boolean;
  fast: boolean;
  guess: Winner | null;
  outcome: Winner | null;
}

const initial = (): State => ({
  pots: [defaultPot(), { ...defaultPot(), sun: 1 }],
  running: false,
  started: false,
  compare: false,
  fast: false,
  guess: null,
  outcome: null,
});

const healthTone: Record<Health, string> = {
  thriving: "bg-secondary-soft text-[#0b7a6e]",
  good: "bg-secondary-soft text-[#0b7a6e]",
  slow: "bg-accent-soft text-[#8a5a00]",
  struggling: "bg-coral-soft text-[#9c2f2f]",
  noWater: "bg-coral-soft text-[#9c2f2f]",
  noLight: "bg-coral-soft text-[#9c2f2f]",
};

function reasons(pot: Pot, lang: Language): string[] {
  if (pot.water === 0) return [noWaterWhy[lang]];
  if (pot.sun === 0) return [noLightWhy[lang]];
  const s = factorStates(pot);
  const out = (Object.keys(s) as Factor[]).flatMap((f) => (s[f] === "ok" ? [] : [reasonText[f][s[f] as "low" | "high"][lang]]));
  return out.length ? out : [allGood[lang]];
}

function StageDots({ stage, lang }: { stage: Stage; lang: Language }) {
  return (
    <ol className="flex items-center gap-1" aria-label={ui.stage[lang]}>
      {([0, 1, 2, 3, 4] as Stage[]).map((s) => (
        <li
          key={s}
          title={stageNames[s][lang]}
          aria-current={s === stage ? "step" : undefined}
          className={`h-2 flex-1 rounded-full transition-colors ${s < stage ? "bg-secondary" : s === stage ? "bg-primary" : "bg-line"}`}
        />
      ))}
    </ol>
  );
}

function PotPanel({
  label,
  pot,
  wide,
  running,
  band,
  onChange,
}: {
  label: string;
  pot: Pot;
  wide: boolean;
  running: boolean;
  band: AgeBand;
  onChange: (patch: Partial<Pot>) => void;
}) {
  const { lang } = useLanguage();
  const stage = stageOf(pot.growth);
  const health = healthOf(pot);

  return (
    <section
      aria-label={label}
      className={`grid gap-4 rounded-2xl border border-line bg-background p-3 sm:p-4 ${wide ? "sm:grid-cols-[14rem_minmax(0,1fr)]" : ""}`}
    >
      <div>
        <h3 className="mb-2 text-sm font-bold">{label}</h3>
        <div className="mx-auto max-w-[16rem]">
          <PlantSvg pot={pot} running={running} />
        </div>
        <div className="mt-3 space-y-2">
          <p className="flex items-baseline justify-between gap-2 text-sm">
            <span className="text-xs text-muted">{ui.stage[lang]}</span>
            <strong>{stageNames[stage][lang]}</strong>
          </p>
          <StageDots stage={stage} lang={lang} />
          <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${healthTone[health]}`} aria-live="polite">
            {healthNames[health][lang]}
          </p>
        </div>
      </div>

      <div className="min-w-0 space-y-3">
        <OptionRow<PlantKind>
          label={ui.plant[lang]}
          value={pot.plant}
          onChange={(plant) => onChange({ plant })}
          options={PLANTS.map((p) => ({ value: p, label: plantNames[p][lang] }))}
        />
        <OptionRow<Level>
          label={ui.sun[lang]}
          value={pot.sun}
          onChange={(sun) => onChange({ sun })}
          options={LEVELS.map((l) => ({ value: l, label: sunLevels[l][lang] }))}
        />
        <OptionRow<Level>
          label={ui.water[lang]}
          value={pot.water}
          onChange={(water) => onChange({ water })}
          options={LEVELS.map((l) => ({ value: l, label: waterLevels[l][lang] }))}
        />
        <OptionRow<SoilKind>
          label={ui.soil[lang]}
          value={pot.soil}
          onChange={(soil) => onChange({ soil })}
          options={SOILS.map((s) => ({ value: s, label: soilNames[s][lang] }))}
        />
        <div className="rounded-xl bg-card p-3 text-sm" aria-live="polite">
          {reasons(pot, lang).map((r) => (
            <p key={r} className="font-medium">
              {r}
            </p>
          ))}
          <p className="mt-1 text-xs text-muted">{plantFacts[pot.plant][lang]}</p>
          {band === "10-12" && <p className="text-xs text-muted">{soilNotes[pot.soil][lang]}</p>}
        </div>
      </div>
    </section>
  );
}

export function PlantGrowthLab({ band, onTask }: LabComponentProps) {
  const { lang } = useLanguage();
  const [state, setState] = useState<State>(initial);
  const ref = useRef<State>(state);

  const update = useCallback((patch: Partial<State>) => {
    ref.current = { ...ref.current, ...patch };
    setState(ref.current);
  }, []);

  const tick = useCallback(() => {
    const s = ref.current;
    const dt = 0.1 * (s.fast ? 4 : 1);
    const active = s.compare ? [0, 1] : [0];
    const pots = s.pots.map((p, i) => (active.includes(i) ? stepPot(p, dt) : p)) as [Pot, Pot];

    if (active.some((i) => stageOf(pots[i].growth) === 4)) onTask("grow");
    const differ = conditionsDiffer(pots[0], pots[1]);
    if (s.compare && differ && pots[0].growth >= 20 && pots[1].growth >= 20) onTask("compare");

    let outcome = s.outcome;
    if (band === "10-12" && s.compare && s.guess && !outcome && differ) {
      const ready = pots.every((p) => p.growth >= 40 || isSettled(p));
      if (ready) {
        outcome = winner(pots[0], pots[1]);
        onTask("predict");
      }
    }
    const allGrown = active.every((i) => pots[i].growth >= 100);
    update({ pots, outcome, running: allGrown ? false : s.running });
  }, [band, onTask, update]);

  useEffect(() => {
    if (!state.running) return;
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [state.running, tick]);

  const toggle = () => {
    const s = ref.current;
    if (s.running) return update({ running: false });
    const active = s.compare ? [0, 1] : [0];
    // Pressing Start on a finished plant grows it again from a seed.
    const fresh = active.every((i) => s.pots[i].growth >= 100);
    const pots = fresh ? (s.pots.map((p) => ({ ...p, growth: 0 })) as [Pot, Pot]) : s.pots;
    update({ pots, running: true, started: true, outcome: fresh ? null : s.outcome });
  };

  const reset = () => update(initial());

  const change = (i: 0 | 1, patch: Partial<Pot>) => {
    const s = ref.current;
    const pots = [...s.pots] as [Pot, Pot];
    // A different plant starts over as a seed.
    pots[i] = { ...pots[i], ...patch, ...(patch.plant ? { growth: 0 } : {}) };
    if (!patch.plant && (s.running || s.pots[i].growth > 0)) onTask("change");
    update({ pots, outcome: patch.plant ? null : s.outcome });
  };

  const { pots, compare } = state;
  const lead = compare ? winner(pots[0], pots[1]) : null;
  const differ = conditionsDiffer(pots[0], pots[1]);

  return (
    <div className="space-y-4">
      <RunControls running={state.running} started={state.started} onToggle={toggle} onReset={reset}>
        <ToggleChip pressed={state.fast} onClick={() => update({ fast: !state.fast })}>
          {ui.fast[lang]}
        </ToggleChip>
        <ToggleChip pressed={compare} onClick={() => update({ compare: !compare, guess: null, outcome: null })}>
          {ui.compare[lang]}
        </ToggleChip>
      </RunControls>

      <div className={`grid gap-4 ${compare ? "lg:grid-cols-2" : ""}`}>
        <PotPanel label={ui.potA[lang]} pot={pots[0]} wide={!compare} running={state.running} band={band} onChange={(p) => change(0, p)} />
        {compare && (
          <PotPanel label={ui.potB[lang]} pot={pots[1]} wide={false} running={state.running} band={band} onChange={(p) => change(1, p)} />
        )}
      </div>

      {compare && (
        <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-medium text-primary" aria-live="polite">
          {ui.summary[lang]}:{" "}
          {lead === "same" || lead === null
            ? ui.similar[lang]
            : `${lead === "A" ? ui.potA[lang] : ui.potB[lang]} ${ui.ahead[lang]}`}
        </p>
      )}

      {band === "10-12" && compare && (
        <div className="rounded-2xl border border-line p-4">
          <p className="text-sm font-semibold">{ui.predictQ[lang]}</p>
          {!differ ? (
            <p className="mt-1 text-sm text-muted">{ui.predictNeedDiff[lang]}</p>
          ) : (
            <>
              <div className="mt-2">
                <OptionRow<Winner>
                  label={ui.predictQ[lang]}
                  value={state.guess ?? ("none" as Winner)}
                  disabled={state.outcome !== null}
                  onChange={(guess) => update({ guess })}
                  options={[
                    { value: "A", label: ui.potA[lang] },
                    { value: "B", label: ui.potB[lang] },
                    { value: "same", label: ui.predictSame[lang] },
                  ]}
                />
              </div>
              <p className="mt-2 text-sm" aria-live="polite">
                {state.outcome
                  ? state.guess === state.outcome
                    ? ui.predictRight[lang]
                    : ui.predictWrong[lang]
                  : state.guess
                    ? ui.predictWait[lang]
                    : ""}
              </p>
            </>
          )}
        </div>
      )}

      <p className="flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-sm text-[#6b4700]">
        <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          <strong>{ui.tryThis[lang]}: </strong>
          {band === "7-9" ? ui.hint79[lang] : ui.hint1012[lang]}
        </span>
      </p>
    </div>
  );
}
