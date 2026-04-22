import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PainPoint } from '@/types';

interface Props {
  steps: string[];
  painPoints: PainPoint[];
  resetSignal: number;
}

export const ManualProcessExplorer = ({ steps, painPoints, resetSignal }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
  }, [resetSignal]);

  const totalLostMinutes = useMemo(
    () => painPoints.reduce((acc, item) => acc + item.lostMinutes, 0),
    [painPoints]
  );

  const activePainPoint = painPoints[activeStep % painPoints.length];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          Current process (click each step)
        </h3>
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {totalLostMinutes} minutes lost/day
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          return (
            <button
              type="button"
              key={step}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'border-brand-400 bg-brand-50 text-brand-600 dark:border-brand-400/40 dark:bg-brand-900/40 dark:text-brand-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {step}
              {index < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
      <motion.div
        key={activePainPoint.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-700 dark:border-rose-500/40 dark:bg-rose-900/30 dark:text-rose-200"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
          <AlertTriangle className="h-4 w-4" /> Pain point: {activePainPoint.title}
        </div>
        <p className="mt-2 text-base font-medium">{activePainPoint.description}</p>
        <p className="mt-1 text-sm">Estimated time lost: {activePainPoint.lostMinutes} min.</p>
      </motion.div>
    </div>
  );
};
