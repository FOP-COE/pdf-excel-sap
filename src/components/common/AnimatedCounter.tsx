import { useEffect, useRef, useState } from 'react';

interface Props {
  isPaused: boolean;
  target: number;
  speed?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter = ({ isPaused, target, speed = 50, prefix = '', suffix = '' }: Props) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const animate = () => {
      setValue((prev) => {
        if (prev >= target) return prev;
        return Math.min(target, prev + target / speed);
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, target, speed]);

  useEffect(() => {
    setValue(0);
  }, [target]);

  return (
    <span className="tabular-nums">
      {prefix}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
};
