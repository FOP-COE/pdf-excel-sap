import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  resetSignal: number;
  defaults?: {
    approvalsPerWeek?: number;
    minutesPerApproval?: number;
    hourlyRate?: number;
  };
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    value
  );

export const RoiCalculator = ({ resetSignal, defaults }: Props) => {
  const [approvalsPerWeek, setApprovalsPerWeek] = useState(defaults?.approvalsPerWeek ?? 24);
  const [minutesPerApproval, setMinutesPerApproval] = useState(defaults?.minutesPerApproval ?? 18);
  const [hourlyRate, setHourlyRate] = useState(defaults?.hourlyRate ?? 45);

  useEffect(() => {
    setApprovalsPerWeek(defaults?.approvalsPerWeek ?? 24);
    setMinutesPerApproval(defaults?.minutesPerApproval ?? 18);
    setHourlyRate(defaults?.hourlyRate ?? 45);
  }, [resetSignal, defaults]);

  const results = useMemo(() => {
    const hoursSaved = ((approvalsPerWeek * minutesPerApproval) / 60) * 52 * 0.7; // 70% automation
    const euroValue = hoursSaved * hourlyRate;
    return { hoursSaved, euroValue };
  }, [approvalsPerWeek, minutesPerApproval, hourlyRate]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">ROI Calculator</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Adjust the sliders with your real data to see the impact in hours and euros.
          </p>
        </div>
        <div className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Assumption: 70% automatable
        </div>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Approvals per week
          </label>
          <input
            type="range"
            min={5}
            max={80}
            value={approvalsPerWeek}
            onChange={(event) => setApprovalsPerWeek(Number(event.target.value))}
            className="mt-2 w-full"
          />
          <div className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
            {approvalsPerWeek} processes
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Minutes per approval
          </label>
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={minutesPerApproval}
            onChange={(event) => setMinutesPerApproval(Number(event.target.value))}
            className="mt-2 w-full"
          />
          <div className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
            {minutesPerApproval} minutes
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Hourly cost (€/h)
          </label>
          <input
            type="range"
            min={20}
            max={120}
            step={5}
            value={hourlyRate}
            onChange={(event) => setHourlyRate(Number(event.target.value))}
            className="mt-2 w-full"
          />
          <div className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">{hourlyRate} €/h</div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/40 dark:text-emerald-200"
        >
          <div className="text-sm uppercase tracking-wide">Hours saved/year</div>
          <div className="mt-2 text-3xl font-bold">{Math.round(results.hoursSaved)} h</div>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-200/80">
            Equivalent to {Math.round(results.hoursSaved / 40)} work weeks.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-brand-200 bg-brand-50/80 p-4 text-brand-700 dark:border-brand-500/40 dark:bg-brand-900/40 dark:text-brand-200"
        >
          <div className="text-sm uppercase tracking-wide">Estimated annual value</div>
          <div className="mt-2 text-3xl font-bold">{formatCurrency(results.euroValue)}</div>
          <p className="mt-1 text-sm text-brand-600 dark:text-brand-200/80">
            Investment recovered in ~{Math.max(1, Math.round(120000 / results.euroValue))} months.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
