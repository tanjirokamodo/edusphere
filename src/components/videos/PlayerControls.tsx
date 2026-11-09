"use client";

import type { ReactNode } from "react";
import {
  Captions,
  CaptionsOff,
  Maximize2,
  Minimize2,
  Pause,
  PictureInPicture2,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { formatClock } from "@/data/videos";
import { useLanguage } from "@/lib/language";
import type { Language } from "@/types";

export interface PlayerControlsProps {
  /** True when there is no playable file: everything is shown but inert. */
  disabled?: boolean;
  playing: boolean;
  time: number;
  duration: number;
  volume: number;
  muted: boolean;
  speed: number;
  captions: Language | "off";
  captionLangs: Language[];
  pip: { supported: boolean; active: boolean };
  fullscreen: { supported: boolean; active: boolean };
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onVolume: (value: number) => void;
  onToggleMute: () => void;
  onCycleSpeed: () => void;
  onCycleCaptions: () => void;
  onTogglePip: () => void;
  onToggleFullscreen: () => void;
}

function ControlButton({
  label,
  onClick,
  disabled,
  pressed,
  className = "",
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={`grid min-h-11 min-w-11 place-items-center rounded-full px-2 text-sm font-semibold transition-colors hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-transparent ${
        pressed ? "bg-white/20" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

/** Touch-friendly control bar. Purely presentational: VideoPlayer owns the state. */
export function PlayerControls(p: PlayerControlsProps) {
  const { t } = useLanguage();
  const inert = p.disabled === true;
  const max = p.duration > 0 ? p.duration : 1;
  const captionsUnavailable = p.captionLangs.length === 0;

  const captionLabel = captionsUnavailable
    ? t("vid.ctl.captionsUnavailable")
    : p.captions === "off"
      ? t("vid.ctl.captionsOff")
      : `${t("vid.ctl.captions")}: ${t(p.captions === "en" ? "lang.en" : "lang.te")}`;

  return (
    <div className="bg-[#171b30] px-3 pb-2 pt-3 text-white sm:px-4" role="group" aria-label="Video controls">
      <div className="flex items-center gap-3">
        <span className="w-11 shrink-0 text-right text-xs tabular-nums text-white/80">{formatClock(p.time)}</span>
        <input
          type="range"
          min={0}
          max={max}
          step={0.1}
          value={Math.min(p.time, max)}
          disabled={inert}
          onChange={(e) => p.onSeek(Number(e.target.value))}
          aria-label={t("vid.ctl.seek")}
          aria-valuetext={`${formatClock(p.time)} / ${formatClock(p.duration)}`}
          className="h-6 min-w-0 flex-1 cursor-pointer accent-[#14B8A6] disabled:cursor-not-allowed disabled:opacity-40"
        />
        <span className="w-11 shrink-0 text-xs tabular-nums text-white/80">{formatClock(p.duration)}</span>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-1">
        <ControlButton
          label={p.playing ? t("vid.ctl.pause") : t("vid.ctl.play")}
          onClick={p.onTogglePlay}
          disabled={inert}
          className="size-12 bg-primary hover:bg-primary/90"
        >
          {p.playing ? (
            <Pause className="size-6" fill="currentColor" aria-hidden />
          ) : (
            <Play className="size-6" fill="currentColor" aria-hidden />
          )}
        </ControlButton>

        <ControlButton
          label={p.muted || p.volume === 0 ? t("vid.ctl.unmute") : t("vid.ctl.mute")}
          onClick={p.onToggleMute}
          disabled={inert}
        >
          {p.muted || p.volume === 0 ? (
            <VolumeX className="size-5" aria-hidden />
          ) : (
            <Volume2 className="size-5" aria-hidden />
          )}
        </ControlButton>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={p.muted ? 0 : p.volume}
          disabled={inert}
          onChange={(e) => p.onVolume(Number(e.target.value))}
          aria-label={t("vid.ctl.volume")}
          className="hidden h-6 w-24 cursor-pointer accent-[#14B8A6] disabled:opacity-40 sm:block"
        />

        <div className="ml-auto flex items-center gap-1">
          <ControlButton
            label={`${t("vid.ctl.speed")}: ${p.speed}×`}
            onClick={p.onCycleSpeed}
            disabled={inert}
            className="min-w-14 tabular-nums"
          >
            {p.speed}×
          </ControlButton>
          <ControlButton
            label={captionLabel}
            onClick={p.onCycleCaptions}
            disabled={inert || captionsUnavailable}
            pressed={p.captions !== "off" && !captionsUnavailable}
          >
            {p.captions !== "off" && !captionsUnavailable ? (
              <span className="inline-flex items-center gap-1">
                <Captions className="size-5" aria-hidden />
                <span className="text-xs uppercase">{p.captions}</span>
              </span>
            ) : (
              <CaptionsOff className="size-5" aria-hidden />
            )}
          </ControlButton>
          <ControlButton
            label={t("vid.ctl.pip")}
            onClick={p.onTogglePip}
            disabled={inert || !p.pip.supported}
            pressed={p.pip.active}
            className="max-[420px]:hidden"
          >
            <PictureInPicture2 className="size-5" aria-hidden />
          </ControlButton>
          <ControlButton
            label={p.fullscreen.active ? t("vid.ctl.exitFullscreen") : t("vid.ctl.fullscreen")}
            onClick={p.onToggleFullscreen}
            disabled={inert || !p.fullscreen.supported}
          >
            {p.fullscreen.active ? (
              <Minimize2 className="size-5" aria-hidden />
            ) : (
              <Maximize2 className="size-5" aria-hidden />
            )}
          </ControlButton>
        </div>
      </div>
    </div>
  );
}
