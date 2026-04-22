import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
}

export const MetricCard = ({ label, value, description, icon }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
  >
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {icon}
      {label}
    </div>
    <div className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{value}</div>
    {description && <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{description}</p>}
  </motion.div>
);
