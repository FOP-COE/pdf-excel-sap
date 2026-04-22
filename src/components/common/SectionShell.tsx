import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  durationMinutes: number;
  children: ReactNode;
}

export const SectionShell = ({ title, subtitle, durationMinutes, children }: Props) => {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 h-full overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
            {subtitle && <p className="mt-1 max-w-2xl text-base text-slate-500 dark:text-slate-300">{subtitle}</p>}
          </div>
          <div className="rounded-full border border-brand-200 bg-brand-50/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:border-brand-500/40 dark:bg-brand-900/50 dark:text-brand-200">
            {durationMinutes} minutes · Interactive
          </div>
        </div>
      </motion.div>
      <div className="grid gap-4 flex-1 overflow-hidden">{children}</div>
    </section>
  );
};
