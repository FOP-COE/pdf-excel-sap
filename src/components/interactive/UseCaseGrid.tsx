import { motion } from 'framer-motion';
import { LucideIcon, Bell, CheckSquare, Database, FileBarChart2 } from 'lucide-react';

interface UseCase {
  title: string;
  description: string;
  icon: LucideIcon;
}

const useCases: UseCase[] = [
  {
    title: 'Aprobaciones inteligentes',
    description: 'Configura aprobaciones multinivel con alertas y recordatorios en Teams.',
    icon: CheckSquare
  },
  {
    title: 'Notificaciones proactivas',
    description: 'Alertas financieras en tiempo real cuando se superan umbrales.',
    icon: Bell
  },
  {
    title: 'Sincronización de datos',
    description: 'Mantén Excel, SharePoint y SAP alineados automáticamente.',
    icon: Database
  },
  {
    title: 'Reporting automático',
    description: 'Genera y distribuye reportes a stakeholders sin tocar un botón.',
    icon: FileBarChart2
  }
];

export const UseCaseGrid = () => (
  <div className="grid gap-4 md:grid-cols-2">
    {useCases.map((useCase, index) => (
      <motion.div
        key={useCase.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-lg transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 transition group-hover:bg-brand-500/20 group-hover:text-brand-700 dark:text-brand-300">
          <useCase.icon size={20} />
        </div>
        <h4 className="mt-3 text-lg font-semibold text-slate-800 dark:text-white">{useCase.title}</h4>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{useCase.description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
          Hover para más detalles
        </p>
      </motion.div>
    ))}
  </div>
);
