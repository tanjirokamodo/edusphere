"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Droplets, Lightbulb } from "lucide-react";
import { OptionRow } from "@/components/labs/OptionRow";
import { RunControls, ToggleChip } from "@/components/labs/RunControls";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/lib/language";
import type { LabComponentProps } from "../types";
import { stageExplain, stageNames, sunNames, ui } from "./content";
import { LabelMatching } from "./LabelMatching";
import {
  currentStage,
  initialWater,
  STAGE_ORDER,
  stepWater,
  SUN_LEVELS,
  tapCloud,
  type SunLevel,
  type WaterStage,
  type WaterState,
} from "./model";
import { StageOrdering } from "./StageOrdering";
import { WaterCycleScene } from "./WaterCycleScene";

interface State {
  water: WaterState;
  sun: SunLevel;
  running: boolean;
  started: boolean;
  fast: boolean;
  seen: WaterStage[];
  selected: WaterStage | null;
}

const initial = (): State => ({
  water: initialWater(),
  sun: 2,
  running: false,
  started: false,
  fast: false,
  seen: [],
  selected: null,
});

export function WaterCycleLab({ band, onTask }: LabComponentProps) {
  const { lang } = useLanguage();
  const [state, setState] = useState<State>(initial);
  const ref = useRef<State>(state);

  const update = useCallback((patch: Partial<State>) => {
    ref.current = { ...ref.current, ...patch };
    setState(ref.current);
  }, []);

  const tick = useCallback(() => {
    const s = ref.current;
    const water = stepWater(s.water, s.sun, 0.1 * (s.fast ? 3 : 1));
    const stage = currentStage(water, s.sun);
    let seen = s.seen;
    if (stage && !seen.includes(stage)) {
      seen = [...seen, stage];
      if (seen.length === STAGE_ORDER.length) onTask("stages");
    }
    update({ water, seen });
  }, [onTask, update]);

  useEffect(() => {
    if (!state.running) return;
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [state.running, tick]);

  const live = currentStage(state.water, state.sun);
  const shown = state.selected ?? live;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <RunControls
          running={state.running}
          started={state.started}
          onToggle={() => update({ running: !state.running, started: true })}
          onReset={() => update(initial())}
        >
          <ToggleChip pressed={state.fast} onClick={() => update({ fast: !state.fast })}>
            {ui.fast[lang]}
          </ToggleChip>
        </RunControls>

        <OptionRow<SunLevel>
          label={ui.sun[lang]}
          value={state.sun}
          onChange={(sun) => {
            update({ sun });
            if (state.running) onTask("sun");
          }}
          options={SUN_LEVELS.map((l) => ({ value: l, label: sunNames[l][lang] }))}
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <div className="relative">
              <WaterCycleScene mode="live" state={state.water} sun={state.sun} running={state.running} highlight={shown} />
              <button
                type="button"
                aria-label={ui.cloudLabel[lang]}
                title={ui.cloudLabel[lang]}
                onClick={() => update({ water: tapCloud(state.water) })}
                className="absolute rounded-3xl outline-offset-2 hover:bg-white/20"
                style={{ left: "40%", top: "6%", width: "38%", height: "32%" }}
              />
            </div>
            <p className="mt-2 flex items-start gap-2 text-xs text-muted">
              <Droplets className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {ui.cloudTap[lang]}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="w-32 shrink-0 text-xs font-semibold text-muted">{ui.lake[lang]}</span>
              <ProgressBar value={state.water.lake} label={ui.lake[lang]} />
            </div>
            {state.sun === 0 && <p className="mt-2 text-xs font-medium text-[#8a5a00]">{ui.noSunNote[lang]}</p>}
          </div>

          <div className="min-w-0 space-y-3">
            <div role="group" aria-label={ui.stages[lang]} className="grid grid-cols-2 gap-2">
              {STAGE_ORDER.map((stage) => {
                const active = state.selected === stage;
                const happening = live === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update({ selected: active ? null : stage })}
                    className={`min-h-11 rounded-xl border-2 px-2 text-sm font-semibold leading-tight transition-colors ${
                      active
                        ? "border-primary bg-primary text-white"
                        : happening
                          ? "border-secondary bg-secondary-soft"
                          : "border-line bg-card hover:border-primary/50"
                    }`}
                  >
                    {stageNames[stage][lang]}
                  </button>
                );
              })}
            </div>
            <div className="rounded-xl bg-background p-4" aria-live="polite">
              {shown ? (
                <>
                  <p className="text-xs font-semibold text-primary">
                    {state.selected ? ui.stages[lang] : ui.nowHappening[lang]}
                  </p>
                  <h3 className="mt-0.5 text-base font-bold">{stageNames[shown][lang]}</h3>
                  <p className="mt-1 text-sm leading-relaxed">{stageExplain[shown][band][lang]}</p>
                </>
              ) : (
                <p className="text-sm text-muted">{ui.nothing[lang]}</p>
              )}
            </div>
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-sm text-[#6b4700]">
          <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <strong>{ui.tryThis[lang]}: </strong>
            {band === "7-9" ? ui.tryThis79[lang] : ui.tryThis1012[lang]}
          </span>
        </p>
      </div>

      <div className="rounded-2xl border border-line p-4 sm:p-5">
        <LabelMatching band={band} onDone={() => onTask("labels")} />
      </div>
      <div className="rounded-2xl border border-line p-4 sm:p-5">
        <StageOrdering band={band} onDone={() => onTask("order")} />
      </div>
    </div>
  );
}
