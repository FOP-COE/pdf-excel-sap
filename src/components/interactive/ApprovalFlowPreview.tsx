import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Share, Users } from 'lucide-react';

export const ApprovalFlowPreview = () => {
  const nodes = [
    { id: 1, title: 'Excel', description: 'Datos de solicitud', icon: <Share /> },
    { id: 2, title: 'Power Automate', description: 'Validación & reglas', icon: <Users /> },
    { id: 3, title: 'Teams', description: 'Aprobación & feedback', icon: <Mail /> },
    { id: 4, title: 'SharePoint', description: 'Registro automático', icon: <CheckCircle2 /> }
  ];

  return (
    <div className="rounded-3xl border border-brand-200 bg-brand-50/80 p-6 text-brand-700 shadow-xl dark:border-brand-500/40 dark:bg-brand-900/40 dark:text-brand-100">
      <h3 className="text-lg font-semibold">Vista previa del flujo</h3>
      <p className="mt-2 text-sm text-brand-600/80 dark:text-brand-100/80">
        Este es el flujo que construirás durante la sesión práctica.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/30 p-4 text-sm font-semibold"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-brand-600">
              {node.icon}
            </div>
            <div className="text-base font-bold">{node.title}</div>
            <p className="mt-1 text-sm font-medium text-brand-600/80">{node.description}</p>
            {index < nodes.length - 1 && (
              <div className="absolute right-0 top-1/2 h-px w-8 translate-x-1/2 bg-gradient-to-r from-brand-400/0 via-brand-400 to-brand-400/0" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
