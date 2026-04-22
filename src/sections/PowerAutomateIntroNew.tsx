import { useState } from 'react';
import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { SourceModal } from '@/components/common/SourceModal';
import { ArrowRight, Bot, Database, FileText, Table, Workflow } from 'lucide-react';

const architecture = [
  {
    title: 'Input',
    detail: 'Invoice PDF uploaded to monitored folder',
    icon: FileText,
    slot: 1,
    previewTitle: 'Invoice Input'
  },
  {
    title: 'Extraction',
    detail: 'AI Builder prebuilt invoice model extracts structured fields',
    icon: Bot,
    slot: 2,
    previewTitle: 'AI Builder Extraction'
  },
  {
    title: 'Orchestration',
    detail: 'Power Automate validates and routes data to controlled output',
    icon: Workflow,
    slot: 3,
    previewTitle: 'Power Automate Flow'
  },
  {
    title: 'Storage',
    detail: 'Excel table stores normalized records as source of truth',
    icon: Table,
    slot: 4,
    previewTitle: 'Excel Structured Table'
  },
  {
    title: 'Enrichment',
    detail: 'Local SAP VBA script enriches Payment Term and Customer Name',
    icon: Database,
    slot: 5,
    previewTitle: 'SAP VBA Enrichment'
  }
];

const blueprintSlots = {
  1: '/images/screenshots/blueprint-1.png',
  2: '/images/screenshots/blueprint-2.jpeg',
  3: '/images/screenshots/blueprint-3.png',
  4: '/images/screenshots/blueprint-4.png',
  5: '/images/screenshots/blueprint-5.png'
} as const;

export const PowerAutomateIntroNew = ({ resetSignal }: SectionProps) => {
  const { stepSignal, setIsFirstStep, setIsLastStep } = usePresentation();
  const [activeSlot, setActiveSlot] = useState<1 | 2 | 3 | 4 | 5 | null>(null);

  const stepController = useStepController({
    totalSteps: 2,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 5000,
    onFirstStepChange: setIsFirstStep,
    onLastStepChange: setIsLastStep
  });

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950 px-8 py-12 text-white">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center">
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="mb-10 text-center">
            <h1 className="font-amadeus text-5xl font-bold">Solution Blueprint</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-200">
              One concrete pattern: transform unstructured PDFs into controlled, reusable, and SAP-ready structured data.
            </p>
          </div>
        </StepReveal>

        <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
          <div className="grid gap-4 md:grid-cols-5">
            {architecture.map((item, index) => {
              const Icon = item.icon;
              const isInteractiveCard = true;
              return (
                <div key={item.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveSlot(item.slot as 1 | 2 | 3 | 4 | 5)}
                    className={`relative h-full w-full rounded-xl border p-4 text-center backdrop-blur-sm transition ${
                      isInteractiveCard
                        ? 'border-violet-300/40 bg-white/10 shadow-[0_0_0_1px_rgba(196,181,253,0.2)] hover:-translate-y-1 hover:border-violet-200 hover:bg-white/15'
                        : 'border-white/15 bg-white/5'
                    }`}
                    aria-label={`Preview screenshot for ${item.title}`}
                  >
                    <div className="mx-auto mb-3 inline-flex rounded-lg bg-white/10 p-2 text-violet-300">
                      <Icon size={18} />
                    </div>
                    <h2 className="font-amadeus text-xl font-semibold">{item.title}</h2>
                    <p className="mt-2 text-xs text-slate-200">{item.detail}</p>
                  </button>
                  {index < architecture.length - 1 && (
                    <ArrowRight size={14} className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-violet-300 md:block" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl bg-white/10 p-4 text-center text-sm text-slate-100">
            Flow logic for demo: PDF {'->'} AI extraction {'->'} Excel table {'->'} local SAP VBA enrichment for Payment Term and Customer Name.
          </div>
        </StepReveal>
      </div>

      <SourceModal
        isOpen={activeSlot !== null}
        onClose={() => setActiveSlot(null)}
        title={activeSlot ? architecture[activeSlot - 1].previewTitle : 'Blueprint Preview'}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          {activeSlot ? (
            <img
              src={blueprintSlots[activeSlot]}
              alt={architecture[activeSlot - 1].previewTitle}
              className="max-h-[65vh] w-full object-contain bg-white"
            />
          ) : null}
        </div>
      </SourceModal>
    </div>
  );
};
