"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language";
import type { AgeBand } from "@/types";
import { stageClues, stageNames, ui } from "./content";
import { STAGE_ORDER, type WaterStage } from "./model";
import { WaterCycleScene, ZONES } from "./WaterCycleScene";

/**
 * Label the diagram. Drag a label onto a spot, or tap a label and then tap a
 * spot (the tap route works for touch screens, keyboards and screen readers).
 * Only correct placements stay; a wrong one bounces back with a gentle hint.
 */
export function LabelMatching({ band, onDone }: { band: AgeBand; onDone: () => void }) {
  const { lang } = useLanguage();
  const [placed, setPlaced] = useState<WaterStage[]>([]);
  const [picked, setPicked] = useState<WaterStage | null>(null);
  const [wrong, setWrong] = useState<WaterStage | null>(null);
  const [message, setMessage] = useState<"right" | "wrong" | "done" | null>(null);

  const drop = (zone: WaterStage, label: WaterStage) => {
    setPicked(null);
    if (placed.includes(label)) return;
    if (zone === label) {
      const next = [...placed, label];
      setPlaced(next);
      setWrong(null);
      setMessage(next.length === STAGE_ORDER.length ? "done" : "right");
      if (next.length === STAGE_ORDER.length) onDone();
    } else {
      setWrong(label);
      setMessage("wrong");
    }
  };

  const text = message === "done" ? ui.labelsDone : message === "right" ? ui.labelRight : message === "wrong" ? ui.labelWrong : null;

  return (
    <div>
      <h3 className="text-base font-semibold">{ui.labelTitle[lang]}</h3>
      <p className="mt-1 text-sm text-muted">{ui.labelHelp[lang]}</p>

      <div className="relative mt-3 max-w-2xl">
        <WaterCycleScene mode="diagram" />
        {STAGE_ORDER.map((zone, i) => {
          const filled = placed.includes(zone);
          const pos = ZONES[zone];
          return (
            <button
              key={zone}
              type="button"
              aria-label={filled ? stageNames[zone][lang] : `${ui.spot[lang]} ${i + 1}`}
              disabled={filled}
              onClick={() => picked && drop(zone, picked)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const label = e.dataTransfer.getData("text/plain") as WaterStage;
                if (STAGE_ORDER.includes(label)) drop(zone, label);
              }}
              style={{ left: `${(pos.x / 400) * 100}%`, top: `${(pos.y / 240) * 100}%` }}
              className={`absolute grid min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 place-items-center whitespace-nowrap rounded-full border-2 px-2 text-xs font-bold transition-colors ${
                filled
                  ? "border-secondary bg-secondary-soft text-[#0b7a6e]"
                  : picked
                    ? "animate-pulse border-primary bg-white text-primary"
                    : "border-dashed border-primary/60 bg-white/90 text-primary"
              }`}
            >
              {filled ? stageNames[zone][lang] : i + 1}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {STAGE_ORDER.map((label) => {
          const done = placed.includes(label);
          const isPicked = picked === label;
          return (
            <li key={label}>
              <button
                type="button"
                draggable={!done}
                disabled={done}
                aria-pressed={isPicked}
                onClick={() => {
                  setPicked(isPicked ? null : label);
                  setWrong(null);
                }}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", label);
                  setWrong(null);
                }}
                className={`flex min-h-12 w-full cursor-grab items-start gap-2 rounded-xl border-2 px-3 py-2 text-left transition-colors ${
                  done
                    ? "border-secondary bg-secondary-soft opacity-70"
                    : isPicked
                      ? "border-primary bg-primary-soft"
                      : "border-line bg-card hover:border-primary/50"
                } ${wrong === label ? "animate-shake border-coral" : ""}`}
              >
                {done && <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />}
                <span>
                  <span className="block text-sm font-semibold">{stageNames[label][lang]}</span>
                  {band === "7-9" && <span className="block text-xs text-muted">{stageClues[label][lang]}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className={`mt-3 min-h-5 text-sm font-medium ${message === "wrong" ? "text-[#9c2f2f]" : "text-[#0b7a6e]"}`}>
        {text?.[lang]}
      </p>
    </div>
  );
}
