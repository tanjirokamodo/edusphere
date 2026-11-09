"use client";

import { useCallback, useSyncExternalStore, type RefObject } from "react";

const noop = () => () => {};

/** Fullscreen state and toggle for one element (reader, video player). */
export function useFullscreen(ref: RefObject<HTMLElement | null>) {
  const active = useSyncExternalStore(
    (cb) => {
      document.addEventListener("fullscreenchange", cb);
      return () => document.removeEventListener("fullscreenchange", cb);
    },
    () => document.fullscreenElement !== null && document.fullscreenElement === ref.current,
    () => false,
  );
  const supported = useSyncExternalStore(noop, () => document.fullscreenEnabled, () => false);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void ref.current?.requestFullscreen().catch(() => {});
  }, [ref]);

  return { active, supported, toggle };
}
