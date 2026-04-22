import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { ArrowRight, Bot, Database, Workflow } from 'lucide-react';

const momentumBlocks = [
  {
    title: 'Low-Code Adoption',
    subtitle: 'Teams are ready to automate',
    detail: 'Power Platform is already known by operations teams, making this use case immediately actionable.'
  },
  {
    title: 'AI Builder Maturity',
    subtitle: 'Document extraction at scale',
    detail: 'Invoice field extraction can now be modeled and reused across multiple layouts with confidence scoring.'
  },
  {
    title: 'Operational Fit',
    subtitle: 'Excel and SAP handoff patterns exist',
    detail: 'Structured table outputs align with how finance teams validate and hand over data today.'
  }
];

export const AutomationMomentum = ({ resetSignal }: SectionProps) => {
  const { stepSignal, setIsFirstStep, setIsLastStep } = usePresentation();

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
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-8 py-12 text-white">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center">
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="mb-10 text-center">
            <h1 className="font-amadeus text-5xl font-bold">Why This Is the Right Moment</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-200">
              We are not starting from zero. The stack is available, teams are familiar with the tools, and this use case has immediate business value.
            </p>
          </div>
        </StepReveal>

        <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
          <div className="grid gap-5 md:grid-cols-3">
            {momentumBlocks.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 inline-flex rounded-xl bg-white/10 p-3 text-indigo-300">
                  {index === 0 ? <Workflow size={20} /> : index === 1 ? <Bot size={20} /> : <Database size={20} />}
                </div>
                <h2 className="font-amadeus text-2xl font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-indigo-300">{item.subtitle}</p>
                <p className="mt-3 text-sm text-slate-200">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-indigo-200">
            Next: we turn this momentum into a concrete architecture and live build.
            <ArrowRight className="ml-2 inline" size={14} />
          </div>
        </StepReveal>
      </div>
    </div>
  );
};
