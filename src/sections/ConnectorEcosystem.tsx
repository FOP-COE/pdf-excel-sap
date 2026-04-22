import { SectionShell } from '@/components/common/SectionShell';
import { InteractionHint } from '@/components/common/InteractionHint';
import { ConnectorHexMap } from '@/components/interactive/ConnectorHexMap';
import { ConnectorCatalog } from '@/components/interactive/ConnectorCatalog';
import { ConnectorMatch } from '@/components/interactive/ConnectorMatch';
import { SectionProps } from '@/types';
import { motion } from 'framer-motion';

const primaryConnectors = ['Outlook', 'Excel', 'SharePoint', 'Teams', 'SAP', 'Power BI'];

const scenarios = [
  {
    id: 'approvals',
    question: 'Necesitas que las aprobaciones aparezcan en el canal de Finanzas y se almacenen junto al expediente.',
    answers: [
      { label: 'Teams + SharePoint', connector: 'Teams Connector + SharePoint Lists', correct: true },
      { label: 'Outlook + Twitter', connector: 'Outlook Connector + Twitter', correct: false }
    ]
  },
  {
    id: 'sap',
    question: 'Quieres registrar en SAP una orden aprobada directamente desde Excel.',
    answers: [
      { label: 'SAP + Excel', connector: 'SAP ERP Connector + Excel Online', correct: true },
      { label: 'Power BI', connector: 'Power BI Connector', correct: false }
    ]
  },
  {
    id: 'ai',
    question: '¿Cómo harías un análisis de sentimiento para feedback de proveedores?',
    answers: [
      { label: 'AI Builder', connector: 'AI Builder Text Analytics', correct: true },
      { label: 'Dynamics 365', connector: 'Dynamics Connector', correct: false }
    ]
  }
];

export const ConnectorEcosystem = ({ resetSignal, isPaused }: SectionProps) => (
  <SectionShell
    title="The Connector Ecosystem"
    subtitle="Explora el alcance de integraciones listas para Finanzas y cómo elegir la combinación ideal."
    durationMinutes={15}
  >
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Mapa interactivo de conectores</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            1000+ conectores en constante expansión. Comencemos con los más usados por Finance Ops.
          </p>
        </div>
        <InteractionHint message="Click en cada conector" />
      </div>
      <ConnectorHexMap connectors={primaryConnectors} highlighted={['Excel', 'SharePoint', 'Teams']} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-brand-200 bg-brand-50/60 p-6 text-sm text-brand-700 shadow-inner dark:border-brand-500/40 dark:bg-brand-900/30 dark:text-brand-100"
      >
        Integración destacada: Excel + SharePoint + Teams. Mantén el dato maestro, gestiona la aprobación en Teams y registra el resultado sin abrir SAP.
      </motion.div>
    </div>
    <ConnectorCatalog resetSignal={resetSignal} />
    <ConnectorMatch scenarios={scenarios} resetSignal={resetSignal} isPaused={isPaused} />
  </SectionShell>
);
