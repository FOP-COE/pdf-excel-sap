import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionShell } from '@/components/common/SectionShell';
import { MetricCard } from '@/components/common/MetricCard';
import { InteractionHint } from '@/components/common/InteractionHint';
import { EvolutionTimeline } from '@/components/interactive/EvolutionTimeline';
import { ArchitectureDiagram } from '@/components/interactive/ArchitectureDiagram';
import { UseCaseGrid } from '@/components/interactive/UseCaseGrid';
import { DragDropFlowBuilder } from '@/components/interactive/DragDropFlowBuilder';
import { SectionProps } from '@/types';
import { Bolt } from 'lucide-react';

export const PowerAutomateIntro = ({ resetSignal, isPaused }: SectionProps) => {
  const [globalFlows, setGlobalFlows] = useState(3128450);

  useEffect(() => {
    setGlobalFlows(3128450);
  }, [resetSignal]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setGlobalFlows((prev) => prev + Math.floor(Math.random() * 120 + 80));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <SectionShell
      title="Power Automate Introduction"
      subtitle="De idea a automatización en minutos: descubre la plataforma que democratiza la innovación."
      durationMinutes={20}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            ¿Qué es Power Automate?
            <InteractionHint message="Hover para descubrir" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-lg font-medium text-slate-800 dark:text-slate-100"
          >
            Es la plataforma low-code de Microsoft para orquestar procesos entre Excel, SAP, Teams y más de 1000 conectores.
          </motion.p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Permite automatizar tareas repetitivas, aplicar reglas de negocio y coordinar equipos sin escribir código.
          </p>
        </div>
        <MetricCard
          label="Flujos ejecutándose ahora mismo"
          value={`${new Intl.NumberFormat('es-ES').format(globalFlows)}`}
          description="Microsoft reporta millones de ejecuciones diarias en organizaciones globales."
          icon={<Bolt size={16} />}
        />
        <MetricCard
          label="Tiempo medio de creación"
          value="< 30 min"
          description="Usuarios financieros construyen flujos productivos en menos de media hora."
        />
      </div>
      <EvolutionTimeline resetSignal={resetSignal} />
      <ArchitectureDiagram />
      <UseCaseGrid />
      <DragDropFlowBuilder resetSignal={resetSignal} isPaused={isPaused} />
    </SectionShell>
  );
};
