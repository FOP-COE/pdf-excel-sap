import { motion } from 'framer-motion';
import { Blocks, Bolt, Database, Send } from 'lucide-react';

export const ArchitectureDiagram = () => {
  const columns = [
    {
      title: 'Triggers',
      icon: <Bolt className="h-5 w-5" />,
      items: ['Email entrante', 'Cambio en SharePoint', 'Botón manual']
    },
    {
      title: 'Actions',
      icon: <Blocks className="h-5 w-5" />,
      items: ['Validar datos', 'Actualizar Excel', 'Enviar Teams']
    },
    {
      title: 'Outputs',
      icon: <Send className="h-5 w-5" />,
      items: ['Reporte PDF', 'Registro en SAP', 'Alertas compliance']
    }
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <Database size={16} /> Arquitectura simplificada
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {columns.map((column, columnIndex) => (
          <motion.div
            key={column.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: columnIndex * 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <div className="flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300">
                {column.icon}
              </span>
              {column.title}
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {column.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
