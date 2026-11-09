"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { AlertCircle, Film, Play } from "lucide-react";
import { gradients } from "@/components/library/BookCover";
import { formatClock } from "@/data/videos";
import { useLanguage } from "@/lib/language";
import { useFullscreen } from "@/lib/use-fullscreen";
import {
  canResume,
  PLAYBACK_SPEEDS,
  saveVideoProgress,
  setVideoPrefs,
  useVideoPrefs,
} from "@/lib/video-progress";
import type { Language, VideoItem, VideoProgress } from "@/types";
import { PlayerControls } from "./PlayerControls";

const SAVE_EVERY_MS = 4000;
const COMPLETE_AT = 0.95;
const noopSubscribe = () => () => {};

function noControls() {
  /* intentionally empty: the placeholder's controls are inert */
}

/** Stand-in shown when a lesson has no media file. It never pretends to play. */
function Placeholder({ video }: { video: VideoItem }) {
  const { t } = useLanguage();
  const [from, to] = gradients[video.tone];
  return (
    <>
      <div
        className="relative grid aspect-video w-full place-items-center overflow-hidden text-center text-white"
        style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <span className="absolute -right-10 -top-12 size-48 rounded-full bg-white/10" aria-hidden />
        <span className="absolute -bottom-16 left-8 size-40 rounded-full bg-white/10" aria-hidden />
        <div className="relative px-4">
          <span className="mx-auto grid size-16 place-items-center rounded-full border-2 border-dashed border-white/80 bg-black/20 sm:size-20">
            <Film className="size-7 sm:size-9" aria-hidden />
          </span>
          <p className="mt-3 text-lg font-bold sm:text-2xl">{t("vid.placeholderTitle")}</p>
        </div>
      </div>
      <div className="space-y-1 bg-[#171b30] px-4 py-3 text-sm text-white/85" role="note">
        <p>{t("vid.placeholderBody")}</p>
        <p className="text-xs text-white/65">{t("vid.placeholderHint")}</p>
      </div>
    </>
  );
}

/**
 * Video player. Real playback only: progress is recorded from the media
 * element's own events, never invented. Without `video.media` it renders a
 * placeholder with inert controls.
 */
export function VideoPlayer({
  video,
  studentId,
  saved,
}: {
  video: VideoItem;
  studentId: string;
  /** Progress that existed when the page opened (for the Resume offer). */
  saved: VideoProgress | undefined;
}) {
  const { t } = useLanguage();
  const prefs = useVideoPrefs();
  const media = video.media;
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSave = useRef(0);
  const fullscreen = useFullscreen(frameRef);

  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSec);
  const [failed, setFailed] = useState(false);
  const [offerDismissed, setOfferDismissed] = useState(false);
  const [pipActive, setPipActive] = useState(false);

  const pipSupported = useSyncExternalStore(
    noopSubscribe,
    () => typeof document !== "undefined" && document.pictureInPictureEnabled === true,
    () => false,
  );

  const captionLangs: Language[] = media?.captions.map((c) => c.lang) ?? [];
  const activeCaptions: Language | "off" =
    prefs.captions !== "off" && captionLangs.includes(prefs.captions) ? prefs.captions : "off";

  /* ---------- persistence (real playback only) ---------- */
  const persist = useCallback(
    (completed = false) => {
      const el = videoRef.current;
      if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
      if (el.currentTime < 1 && !completed) return;
      saveVideoProgress(studentId, video.id, { position: el.currentTime, duration: el.duration, completed });
      lastSave.current = Date.now();
    },
    [studentId, video.id],
  );

  // Layout-effect cleanup runs while the element still exists, both when the page
  // unmounts and when Next keeps a hidden copy of the route alive (Activity). In
  // the hidden case the media element would otherwise keep playing out of sight.
  useLayoutEffect(() => {
    const el = videoRef.current;
    const onHide = () => persist();
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      persist();
      el?.pause();
    };
  }, [persist]);

  // React has no props for the picture-in-picture events, so listen directly.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const enter = () => setPipActive(true);
    const leave = () => setPipActive(false);
    el.addEventListener("enterpictureinpicture", enter);
    el.addEventListener("leavepictureinpicture", leave);
    return () => {
      el.removeEventListener("enterpictureinpicture", enter);
      el.removeEventListener("leavepictureinpicture", leave);
    };
  }, [media]);

  /* ---------- keep the element in sync with saved preferences ---------- */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = prefs.volume;
    el.muted = prefs.muted;
    el.playbackRate = prefs.speed;
  }, [prefs.volume, prefs.muted, prefs.speed, media]);

  const applyCaptions = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    for (const track of Array.from(el.textTracks)) {
      track.mode = track.language === activeCaptions ? "showing" : "disabled";
    }
  }, [activeCaptions]);

  useEffect(() => {
    applyCaptions();
  }, [applyCaptions]);

  /* ---------- actions ---------- */
  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setFailed(true));
    else el.pause();
  }, []);

  const seek = useCallback((seconds: number) => {
    const el = videoRef.current;
    if (el) el.currentTime = seconds;
    setTime(seconds);
  }, []);

  const resumeFromSaved = () => {
    if (saved) seek(saved.position);
    setOfferDismissed(true);
    togglePlay();
  };
  const startOver = () => {
    seek(0);
    setOfferDismissed(true);
    togglePlay();
  };

  const cycleSpeed = () => {
    const i = PLAYBACK_SPEEDS.findIndex((s) => s === prefs.speed);
    setVideoPrefs({ speed: PLAYBACK_SPEEDS[(i + 1) % PLAYBACK_SPEEDS.length] });
  };

  const cycleCaptions = () => {
    const order: (Language | "off")[] = ["off", ...captionLangs];
    const i = order.indexOf(activeCaptions);
    setVideoPrefs({ captions: order[(i + 1) % order.length] });
  };

  const togglePip = () => {
    const el = videoRef.current;
    if (!el) return;
    if (document.pictureInPictureElement) void document.exitPictureInPicture().catch(() => {});
    else void el.requestPictureInPicture().catch(() => {});
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLVideoElement>) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowRight") seek(Math.min(duration, time + 5));
    else if (e.key === "ArrowLeft") seek(Math.max(0, time - 5));
  };

  if (!media) {
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-black shadow-card">
        <Placeholder video={video} />
        <PlayerControls
          disabled
          playing={false}
          time={0}
          duration={video.durationSec}
          volume={prefs.volume}
          muted={prefs.muted}
          speed={prefs.speed}
          captions="off"
          captionLangs={[]}
          pip={{ supported: false, active: false }}
          fullscreen={{ supported: false, active: false }}
          onTogglePlay={noControls}
          onSeek={noControls}
          onVolume={noControls}
          onToggleMute={noControls}
          onCycleSpeed={noControls}
          onCycleCaptions={noControls}
          onTogglePip={noControls}
          onToggleFullscreen={noControls}
        />
      </div>
    );
  }

  const offerResume = canResume(saved) && !offerDismissed && !playing;

  return (
    <div
      ref={frameRef}
      className={`flex flex-col overflow-hidden bg-black ${
        fullscreen.active ? "h-full" : "rounded-2xl border border-line shadow-card"
      }`}
    >
      <div className={`relative bg-black ${fullscreen.active ? "min-h-0 flex-1" : "aspect-video"}`}>
        <video
          ref={videoRef}
          key={media.src}
          className="size-full bg-black object-contain"
          src={media.src}
          preload="metadata"
          playsInline
          tabIndex={0}
          aria-label={video.title.en}
          onClick={togglePlay}
          onKeyDown={onKeyDown}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setDuration(d);
            applyCaptions();
          }}
          onPlay={() => {
            setPlaying(true);
            setOfferDismissed(true);
            setFailed(false);
          }}
          onPause={() => {
            setPlaying(false);
            persist();
          }}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            setTime(el.currentTime);
            const reachedEnd =
              Number.isFinite(el.duration) &&
              el.duration > 0 &&
              el.currentTime / el.duration >= COMPLETE_AT &&
              !el.paused &&
              !el.seeking;
            if (reachedEnd) persist(true);
            else if (!el.paused && Date.now() - lastSave.current > SAVE_EVERY_MS) persist();
          }}
          onEnded={() => {
            setPlaying(false);
            persist(true);
          }}
          onError={() => setFailed(true)}
        >
          {media.captions.map((c) => (
            <track
              key={c.lang}
              kind="subtitles"
              src={c.src}
              srcLang={c.lang}
              label={c.lang === "en" ? "English" : "తెలుగు"}
            />
          ))}
        </video>

        {!playing && !failed && !offerResume && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={t("vid.ctl.play")}
            className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-primary shadow-lg transition-transform hover:scale-105"
          >
            <Play className="size-9" fill="currentColor" aria-hidden />
          </button>
        )}

        {offerResume && saved && (
          <div className="absolute inset-0 grid place-items-center bg-black/60 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-card p-5 text-center text-foreground">
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={resumeFromSaved}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  <Play className="size-4" fill="currentColor" aria-hidden />
                  {t("vid.resumeFrom")} {formatClock(saved.position)}
                </button>
                <button
                  type="button"
                  onClick={startOver}
                  className="min-h-11 rounded-full border border-line bg-card px-5 text-sm font-semibold hover:border-primary/50"
                >
                  {t("vid.startOver")}
                </button>
              </div>
            </div>
          </div>
        )}

        {failed && (
          <div role="alert" className="absolute inset-0 grid place-items-center bg-black/75 p-4 text-center text-white">
            <div>
              <AlertCircle className="mx-auto size-8 text-coral" aria-hidden />
              <p className="mt-2 text-sm font-semibold">{t("vid.loadError")}</p>
              <button
                type="button"
                onClick={() => {
                  setFailed(false);
                  videoRef.current?.load();
                }}
                className="mt-3 min-h-11 rounded-full bg-white px-5 text-sm font-semibold text-foreground"
              >
                {t("vid.retry")}
              </button>
            </div>
          </div>
        )}
      </div>

      <PlayerControls
        playing={playing}
        time={time}
        duration={duration}
        volume={prefs.volume}
        muted={prefs.muted}
        speed={prefs.speed}
        captions={activeCaptions}
        captionLangs={captionLangs}
        pip={{ supported: pipSupported, active: pipActive }}
        fullscreen={{ supported: fullscreen.supported, active: fullscreen.active }}
        onTogglePlay={togglePlay}
        onSeek={seek}
        onVolume={(v) => setVideoPrefs({ volume: v, muted: v === 0 })}
        onToggleMute={() => setVideoPrefs({ muted: !prefs.muted })}
        onCycleSpeed={cycleSpeed}
        onCycleCaptions={cycleCaptions}
        onTogglePip={togglePip}
        onToggleFullscreen={fullscreen.toggle}
      />
    </div>
  );
}
