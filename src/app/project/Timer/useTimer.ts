import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

interface Callbacks {
  onTick: (intervalMs: number) => void;
  onCompletion: () => boolean;
}

const timers: Record<
  string,
  { durationMs: number; runningMs: number; updatedAt: number }
> = {};

export function useTimer(
  durationMs: number,
  { onTick, onCompletion }: Callbacks
) {
  const id = useRef(uuid());
  const [status, setStatus] = useState<"running" | "paused" | "stopped">(
    "stopped"
  );
  const [remainingMs, setRemainingMs] = useState(durationMs);

  // reset if duration changes but keep status
  useEffect(() => {
    reset();
    if (status === "running") start(); // Though we called reset, status is still "running" within this effect
  }, [durationMs]);

  useEffect(() => {
    if (status !== "running") return;

    const intervalId = setInterval(() => {
      const timer = timers[id.current];
      if (!timer) throw "Timer not found";

      const now = Date.now();
      const intervalMs = now - timer.updatedAt;
      timer.updatedAt = now;
      timer.runningMs += intervalMs;

      setRemainingMs(timer.durationMs - timer.runningMs);
      if (onTick) onTick(intervalMs);
      if (timer.runningMs >= timer.durationMs) {
        if (onCompletion) {
          const keepRunning = onCompletion();
          reset();
          if (keepRunning) start();
        } else {
          reset();
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, id, onCompletion, onTick]);

  const start = useCallback(() => {
    setStatus("running");
    if (!timers[id.current]) {
      timers[id.current] = { durationMs, runningMs: 0, updatedAt: Date.now() };
    } else {
      timers[id.current].updatedAt = Date.now();
    }
  }, [setStatus, durationMs]);

  const stop = useCallback(() => {
    setStatus("stopped");
  }, []);

  const reset = useCallback(() => {
    setStatus("stopped");
    setRemainingMs(durationMs);
    delete timers[id.current];
  }, [durationMs]);

  return { start, stop, status, remainingMs };
}
