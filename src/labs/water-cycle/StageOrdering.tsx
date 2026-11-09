"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/lib/language";
import type { AgeBand } from "@/types";
import { stageClues, stageNames, ui } from "./content";
import { orderScore, STAGE_ORDER, type WaterStage } from "./model";

/** Deliberately not the right order, so the student has to think. */
const POOL_START: WaterStage[] = ["precipitation", "evaporation", "collection", "condensation"];

/**
 * Arrange the four stages in order. Tap a stage to put it in the next free slot,
 * tap a filled slot to take it back. Feedback shows how many are in the right place.
 */
export function StageOrdering({ band, onDone }: { band: AgeBand; onDone: () => void }) {
  const { lang } = useLanguage();
  const [slots, setSlots] = useState<(WaterStage | null)[]>([null, null, null, null]);
  const [result, setResult] = useState<{ score: number } | null>(null);

  const pool = POOL_START.filter((s) => !slots.includes(s));
  const full = slots.every((s) => s !== null);

  const add = (stage: WaterStage) => {
    const i = slots.indexOf(null);
    if (i === -1) return;
    setSlots(slots.map((s, idx) => (idx === i ? stage : s)));
    setResult(null);
  };
  const remove = (i: number) => {
    setSlots(slots.map((s, idx) => (idx === i ? null : s)));
    setResult(null);
  };
  const check = () => {
    const score = orderScore(slots);
    setResult({ score });
    if (score === STAGE_ORDER.length) onDone();
  };

  return (
    <div>
      <h3 className="text-base font-semibold">{ui.orderTitle[lang]}</h3>
      <p className="mt-1 text-sm text-muted">{ui.orderHelp[lang]}</p>

      <ol className="mt-3 grid gap-2 sm:grid-cols-2">
        {slots.map((stage, i) => {
          const right = result && stage === STAGE_ORDER[i];
          const bad = result && stage && stage !== STAGE_ORDER[i];
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => stage && remove(i)}
                aria-label={`${ui.slot[lang]} ${i + 1}: ${stage ? stageNames[stage][lang] : ui.empty[lang]}`}
                className={`flex min-h-12 w-full items-center gap-3 rounded-xl border-2 px-3 py-2 text-left transition-colors ${
                  right
                    ? "border-secondary bg-secondary-soft"
                    : bad
                      ? "border-coral bg-coral-soft"
                      : stage
                        ? "border-primary bg-primary-soft"
                        : "border-dashed border-line bg-background"
                }`}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-sm font-bold">{i + 1}</span>
                <span className="min-w-0 flex-1 text-sm font-semibold">{stage ? stageNames[stage][lang] : ""}</span>
                {right && <CheckCircle2 className="size-5 shrink-0 text-secondary" aria-hidden />}
                {bad && <XCircle className="size-5 shrink-0 text-coral" aria-hidden />}
              </button>
            </li>
          );
        })}
      </ol>

      <ul className="mt-3 grid gap-2 sm:grid-cols-2" aria-label={ui.stages[lang]}>
        {pool.map((stage) => (
          <li key={stage}>
            <button
              type="button"
              onClick={() => add(stage)}
              className="min-h-12 w-full rounded-xl border-2 border-line bg-card px-3 py-2 text-left hover:border-primary/50"
            >
              <span className="block text-sm font-semibold">{stageNames[stage][lang]}</span>
              {band === "7-9" && <span className="block text-xs text-muted">{stageClues[stage][lang]}</span>}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={check}
          disabled={!full}
          className="min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {ui.check[lang]}
        </button>
        <button
          type="button"
          onClick={() => {
            setSlots([null, null, null, null]);
            setResult(null);
          }}
          className="min-h-11 rounded-full border border-line bg-card px-5 text-sm font-semibold hover:border-primary/50"
        >
          {ui.clearOrder[lang]}
        </button>
      </div>

      <p aria-live="polite" className="mt-3 min-h-5 text-sm font-medium">
        {!full && !result && slots.some(Boolean) ? <span className="text-muted">{ui.orderFill[lang]}</span> : null}
        {result &&
          (result.score === STAGE_ORDER.length ? (
            <span className="text-[#0b7a6e]">{ui.orderRight[lang]}</span>
          ) : (
            <span className="text-[#9c2f2f]">
              {result.score}/4 {ui.orderPartial[lang]}
            </span>
          ))}
      </p>
    </div>
  );
}
