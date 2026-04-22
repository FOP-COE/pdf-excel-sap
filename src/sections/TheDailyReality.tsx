import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { AlertTriangle, ArrowRight, Clock3, FileWarning } from 'lucide-react';

const painPoints = [
  {
    title: 'Manual Extraction',
    value: 'High effort',
    detail: 'Finance teams still copy invoice fields manually from PDF to Excel.'
  },
  {
    title: 'Data Quality Risk',
    value: 'Error-prone',
    detail: 'Typos and inconsistent formats generate rework and approval delays.'
  },
  {
    title: 'Slow Handoff',
    value: 'Low velocity',
    detail: 'Without structured output, SAP preparation is slow and hard to scale.'
  }
];

export const TheDailyReality = ({ resetSignal }: SectionProps) => {
  const { stepSignal, setIsFirstStep, setIsLastStep, goToNext } = usePresentation();

  const stepController = useStepController({
    totalSteps: 3,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 5000,
    onFirstStepChange: setIsFirstStep,
    onLastStepChange: setIsLastStep
  });

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-100 to-slate-200 px-8 py-12 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center">
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="mb-10 text-center">
            <h1 className="font-amadeus text-5xl font-bold text-slate-900 dark:text-white">The Finance Reality</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
              Many invoice processes still start with unstructured PDFs and end with manual copy/paste. This is where time is lost and errors enter the process.
            </p>
          </div>
        </StepReveal>

        <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
          <div className="grid gap-5 md:grid-cols-3">
            {painPoints.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                  {index === 0 ? <FileWarning size={20} /> : index === 1 ? <AlertTriangle size={20} /> : <Clock3 size={20} />}
                </div>
                <h2 className="font-amadeus text-2xl font-semibold text-slate-900 dark:text-white">{item.title}</h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{item.value}</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </StepReveal>

        <StepReveal step={2} isVisible={stepController.isStepVisible(2)} direction="fade">
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-700 p-6 text-center text-white shadow-lg">
            <p className="font-amadeus text-xl">The goal is simple: extract once, structure once, reuse everywhere.</p>
            <button
              onClick={goToNext}
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold hover:bg-white/30"
            >
              Move to the solution approach <ArrowRight size={14} />
            </button>
          </div>
        </StepReveal>
      </div>
    </div>
  );
};