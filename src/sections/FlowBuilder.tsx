import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { Bot, Brain, CheckCircle2, Clock3, Layers, Rocket, ShieldCheck, Workflow, Wrench } from 'lucide-react';

const powerAutomateBasics = [
  { label: 'Cloud workflow platform to automate business processes', icon: Workflow },
  { label: 'Connects apps (SharePoint, Outlook, Excel, SAP handoff)', icon: Layers },
  { label: 'Low-code actions and conditions, easy to maintain', icon: ShieldCheck },
  { label: 'Ideal for finance teams starting automation quickly', icon: Rocket }
];

const aiBuilderBasics = [
  'AI Builder is the AI module inside Power Automate',
  'It provides prebuilt document models, including invoices',
  'We call it as a normal flow action, no custom API required',
  'Output is structured data we can map to Excel columns'
];

const whyPrebuiltNow = [
  'Fastest path for this session: no model training cycle',
  'Good enough for standard invoice layouts',
  'Keeps demo feasible for a broad audience and time limit',
  'Our test run processed 5 PDFs in 23 seconds'
];

const customModelLater = [
  'Possible when invoice formats are highly specific',
  'Requires labeled dataset and training iterations',
  'Needs validation and governance before production rollout',
  'Out of scope for this session due to time'
];

export const FlowBuilder = ({ resetSignal }: SectionProps) => {
  const { stepSignal, setIsFirstStep, setIsLastStep } = usePresentation();

  const stepController = useStepController({
    totalSteps: 5,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 5000,
    onFirstStepChange: setIsFirstStep,
    onLastStepChange: setIsLastStep
  });

  const currentStep = stepController.currentStep;

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-10 text-white">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center">
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="mb-8 text-center">
            <h1 className="font-amadeus text-5xl font-bold">Power Automate + AI Builder</h1>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-slate-200">
              A hands-on journey: from low-code automation to AI-powered invoice processing with prebuilt models.
            </p>
          </div>
        </StepReveal>

        <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
          {currentStep === 1 && (
            <div className="mx-auto max-w-7xl rounded-2xl border border-slate-400/20 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                {/* Imagen columna 1 */}
                <div className="overflow-hidden rounded-xl border border-slate-300/25 bg-slate-900/40 p-3">
                  <img
                    src="/images/screenshots/power-automate-ai-builder-1.png"
                    alt="Power Automate ecosystem and AI Builder integration"
                    className="w-full h-auto rounded-lg object-contain bg-white"
                  />
                </div>

                {/* Texto columna 2 */}
                <div>
                  <h2 className="inline-flex items-center gap-3 font-amadeus text-3xl font-semibold text-slate-100">
                    <Workflow size={24} /> What Is Power Automate?
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 font-semibold">The Cloud Automation Engine</p>
                  <p className="mt-4 text-base text-slate-300 leading-relaxed">
                    The orchestration layer that coordinates every step from inbox trigger to structured output. It's the backbone connecting all systems.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {powerAutomateBasics.map(({ label, icon: Icon }) => (
                      <li key={label} className="inline-flex w-full items-start gap-3 rounded-lg bg-white/5 px-4 py-3 text-sm text-slate-200">
                        <Icon size={16} className="mt-0.5 shrink-0 text-slate-300" /> {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mx-auto max-w-7xl rounded-2xl border border-violet-400/30 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                {/* Imagen columna 1 */}
                <div className="overflow-hidden rounded-xl border border-violet-300/25 bg-slate-900/40 p-3">
                  <img
                    src="/images/screenshots/power-automate-and-ai-hub.png"
                    alt="AI Builder integration in Microsoft ecosystem"
                    className="w-full h-auto rounded-lg object-contain bg-white"
                  />
                </div>

                {/* Texto columna 2 */}
                <div>
                  <h2 className="inline-flex items-center gap-3 font-amadeus text-3xl font-semibold text-violet-200">
                    <Bot size={24} /> What Is AI Builder?
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 font-semibold">Your AI Copilot for Document Processing</p>
                  <p className="mt-4 text-base text-slate-300 leading-relaxed">
                    The built-in AI capability in Power Automate that reads invoices and returns structured fields automatically.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {aiBuilderBasics.map((item) => (
                      <li key={item} className="inline-flex w-full items-start gap-3 rounded-lg bg-white/5 px-4 py-3 text-sm text-slate-200">
                        <Brain size={16} className="mt-0.5 shrink-0 text-violet-300" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep >= 3 && currentStep < 4 && (
            <>
              <div className="mx-auto max-w-5xl rounded-2xl border border-indigo-400/30 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="inline-flex items-center gap-2 font-amadeus text-2xl font-semibold text-indigo-200">
                  <Wrench size={20} /> Model Choice For This Session
                </h2>
                <p className="mt-2 text-sm text-slate-300 font-semibold mb-4">Prebuilt vs. Custom: Speed Over Perfection</p>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  We use the prebuilt invoice model now for speed and clarity. Custom training is possible, but not part of this session.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <article className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                    <h3 className="inline-flex items-center gap-2 font-amadeus text-lg font-semibold text-emerald-200">
                      <CheckCircle2 size={16} /> Prebuilt Model Now
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {whyPrebuiltNow.map((item) => (
                        <li key={item} className="inline-flex w-full items-start gap-2 text-xs text-emerald-100">
                          <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-300" /> {item}
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
                    <h3 className="inline-flex items-center gap-2 font-amadeus text-lg font-semibold text-amber-200">
                      <Clock3 size={16} /> Custom Model Later
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {customModelLater.map((item) => (
                        <li key={item} className="inline-flex w-full items-start gap-2 text-xs text-amber-100">
                          <Clock3 size={12} className="mt-0.5 shrink-0 text-amber-300" /> {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <div className="mx-auto max-w-6xl flex flex-col items-center justify-center">
              <div className="rounded-2xl border border-purple-300/30 bg-white/5 p-6 max-w-5xl">
                <img
                  src="/images/screenshots/power-automate-and-ai-hub-3.png"
                  alt="How to select and configure the prebuilt invoice model in Power Platform"
                  className="w-full h-auto rounded-xl object-contain bg-white"
                />
              </div>
            </div>
          )}

        </StepReveal>
      </div>
    </div>
  );
};
