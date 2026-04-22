interface Props {
  value: number;
}

export const ProgressBar = ({ value }: Props) => {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-accent transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
      />
    </div>
  );
};
