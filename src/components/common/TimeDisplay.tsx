interface Props {
  elapsedSeconds: number;
  remainingSeconds: number;
}

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

export const TimeDisplay = ({ elapsedSeconds, remainingSeconds }: Props) => (
  <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
    <span className="font-semibold text-slate-900 dark:text-white">{formatTime(elapsedSeconds)}</span>
    <span>transcurridos</span>
    <span className="text-xs text-slate-400">/</span>
    <span className="font-semibold text-brand-600 dark:text-brand-300">
      -{formatTime(remainingSeconds)}
    </span>
    <span>restantes</span>
  </div>
);
