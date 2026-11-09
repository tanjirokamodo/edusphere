"use client";

import { useCallback, useState } from "react";

export type Feedback = "idle" | "correct" | "retry";

/**
 * Shared round-by-round state for simple tap-to-answer activities.
 * Children can retry as often as they like; a star is earned only when the
 * round is answered correctly on the first try. No penalties, no timers.
 */
export function useActivity(total: number, onFinish?: (stars: number) => void) {
  const [round, setRound] = useState(0);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [missed, setMissed] = useState(false);

  const submit = useCallback(
    (correct: boolean) => {
      if (correct) {
        setFeedback("correct");
        if (!missed) setStars((s) => s + 1);
      } else {
        setFeedback("retry");
        setMissed(true);
      }
    },
    [missed],
  );

  const next = useCallback(() => {
    if (round + 1 >= total) onFinish?.(stars);
    setRound((r) => r + 1);
    setFeedback("idle");
    setMissed(false);
  }, [round, total, stars, onFinish]);

  const restart = useCallback(() => {
    setRound(0);
    setStars(0);
    setFeedback("idle");
    setMissed(false);
  }, []);

  return { round, stars, feedback, finished: round >= total, submit, next, restart };
}
