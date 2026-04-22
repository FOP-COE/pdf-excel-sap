import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';

interface TimelineNode {
  year: string;
  title: string;
  description: string;
}

interface Props {
  resetSignal: number;
}

const nodes: TimelineNode[] = [
  {
    year: '2016',
    title: 'Microsoft Flow',
    description: 'Automatiza tareas simples; foco en usuarios sin código.'
  },
  {
    year: '2019',
    title: 'Power Automate',
    description: 'Unificado con Power Platform; conectores empresariales.'
  },
  {
    year: '2021',
    title: 'RPA + AI Builder',
    description: 'Bots de escritorio + inteligencia artificial accesible.'
  },
  {
    year: '2023',
    title: 'Copilot & Automation Kit',
    description: 'Generación asistida, gobernanza y CoE Starter Kit.'
  }
];

export const EvolutionTimeline = (_props: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      <Calendar size={16} /> Evolución Power Automate
    </div>
    <div className="mt-4 space-y-6">
      {nodes.map((node, index) => (
        <motion.div
          key={node.year}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-8"
        >
          <div className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
            {index + 1}
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-100">
            <span>{node.year}</span>
            <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-brand-500 dark:text-brand-300">
              <TrendingUp size={14} /> {node.title}
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{node.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);
