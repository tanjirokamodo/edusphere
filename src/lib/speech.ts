"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useLanguage } from "./language";

const noopSubscribe = () => () => {};

/**
 * Audio instructions via the browser's built-in speech synthesis.
 * Telugu depends on the device having a Telugu voice; `supported` only tells
 * us the API exists, so the UI always keeps the text visible as well.
 */
export function useSpeech() {
  const { lang } = useLanguage();
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => "speechSynthesis" in window,
    () => false,
  );

  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "te" ? "te-IN" : "en-US";
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    },
    [lang],
  );

  const stop = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  return { speak, stop, supported };
}
