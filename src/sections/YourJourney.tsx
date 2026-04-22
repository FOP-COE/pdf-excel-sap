import { SectionShell } from '@/components/common/SectionShell';
import { ApprovalFlowPreview } from '@/components/interactive/ApprovalFlowPreview';
import { ResourceHub } from '@/components/interactive/ResourceHub';
import { SectionProps } from '@/types';
import { motion } from 'framer-motion';

export const YourJourney = ({ resetSignal }: SectionProps) => (
  <SectionShell
    title="Your Journey Starts Now"
    subtitle="Anticipa el ejercicio práctico y las herramientas que tendrás al terminar la sesión."
    durationMinutes={5}
  >
    <ApprovalFlowPreview />
    <ResourceHub />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 text-center text-emerald-700 shadow-xl dark:border-emerald-500/40 dark:bg-emerald-900/40 dark:text-emerald-100"
    >
      <h3 className="text-2xl font-bold">En los próximos 60 minutos construirás esto</h3>
      <p className="mt-3 text-sm font-medium">
        Tendrás soporte del CoE, plantillas certificadas y un checklist de gobernanza listo para usar.
      </p>
    </motion.div>
  </SectionShell>
);
