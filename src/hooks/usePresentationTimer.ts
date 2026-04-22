import { useCallback, useEffect, useRef, useState } from 'react';

export interface TimerState {
  elapsedSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
}

interface TimerOptions {
  totalMinutes: number;
  onTick?: (seconds: number) => void;
}

export const usePresentationTimer = ({ totalMinutes, onTick }: TimerOptions) => {
  const [state, setState] = useState<TimerState>({
    elapsedSeconds: 0,
    totalSeconds: totalMinutes * 60,
    isRunning: true
  });

  const lastUpdateRef = useRef<number | null>(null);

  const tick = useCallback(
    (timestamp: number) => {
      setState((prev) => {
        if (!prev.isRunning) {
          lastUpdateRef.current = timestamp;
          return prev;
        }
        if (lastUpdateRef.current === null) {
          lastUpdateRef.current = timestamp;
          return prev;
        }

        const deltaSeconds = Math.min((timestamp - lastUpdateRef.current) / 1000, 1);
        lastUpdateRef.current = timestamp;

        const nextElapsed = Math.min(prev.elapsedSeconds + deltaSeconds, prev.totalSeconds);
        onTick?.(nextElapsed);
        return {
          ...prev,
          elapsedSeconds: nextElapsed
        };
      });
    },
    [onTick]
  );

  useEffect(() => {
    let raf: number;

    const loop = (time: number) => {
      tick(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tick]);

  const toggle = useCallback(() =>
    setState((prev) => ({
      ...prev,
      isRunning: !prev.isRunning
    })), []);

  const reset = useCallback(() => {
    setState({ elapsedSeconds: 0, totalSeconds: totalMinutes * 60, isRunning: true });
    lastUpdateRef.current = null;
  }, [totalMinutes]);

  const setElapsed = useCallback((seconds: number) =>
    setState((prev) => ({
      ...prev,
      elapsedSeconds: Math.min(seconds, prev.totalSeconds)
    })), []);

  return {
    ...state,
    remainingSeconds: Math.max(state.totalSeconds - state.elapsedSeconds, 0),
    toggle,
    reset,
    setElapsed
  };
};
