import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { CheckCircle2, Database, Clock, Zap } from 'lucide-react';

const scriptSteps = [
  { label: 'Read Customer/Vendor ID from Excel (column H)' },
  { label: 'Open SAP Business Partner (BP) transaction via COM' },
  { label: 'Query BP record and extract Customer Name (NAME_ORG1-4)' },
  { label: 'Navigate to Payment Terms tab and read ZTERM field' },
  { label: 'Write Name to column I and ZTERM to column C in Excel' }
];


export const AdvancedPowerAutomate = ({ resetSignal }: SectionProps) => {
  const { stepSignal, setIsFirstStep, setIsLastStep } = usePresentation();

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
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-10 text-white">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center">
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="mb-8 text-center">
            <h1 className="font-amadeus text-5xl font-bold">Setting Up for the Live Build</h1>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-slate-200">
              SAP enrichment layer: how the final data completeness happens via prebuilt VBA automation.
            </p>
          </div>
        </StepReveal>

        <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
          {stepController.currentStep === 1 && (
            <div className="mx-auto max-w-7xl rounded-2xl border border-emerald-400/25 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                {/* Imagen columna 1 */}
                <div className="overflow-hidden rounded-xl border border-emerald-300/25 bg-slate-900/40 p-3">
                  <img
                    src="/images/screenshots/sap-script-vba-1.png"
                    alt="SAP VBA Script for Excel enrichment"
                    className="w-full h-auto rounded-lg object-contain bg-white"
                  />
                </div>

                {/* Texto columna 2 */}
                <div>
                  <h2 className="inline-flex items-center gap-3 font-amadeus text-3xl font-semibold text-emerald-200">
                    <Database size={24} /> SAP VBA Enrichment Script
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 font-semibold">Read-Only Integration Pattern</p>
                  <p className="mt-4 text-base text-slate-300 leading-relaxed">
                    This Excel VBA macro reads Customer/Vendor IDs from your extracted data and automatically queries SAP Business Partner records to enrich the Excel sheet with customer names and payment terms — all via COM scripting, no manual step required.
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-200 mb-3">Automated Steps:</p>
                    <ol className="space-y-2">
                      {scriptSteps.map(({ label }, i) => (
                        <li key={label} className="flex items-start gap-3 rounded-lg bg-white/5 px-3 py-2 text-xs">
                          <span className="shrink-0 font-mono font-bold text-emerald-300">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-slate-200">{label}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepController.currentStep === 2 && (
            <div className="mx-auto max-w-5xl flex flex-col items-center justify-center text-center">
              <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-12 backdrop-blur-sm">
                <h2 className="inline-flex items-center gap-3 font-amadeus text-4xl font-bold text-cyan-200 justify-center mb-6">
                  <Zap size={32} /> Ready for the Live Build
                </h2>
                
                <div className="space-y-4 mt-8">
                  <p className="text-lg text-slate-200 leading-relaxed">
                    Now we'll create the Power Automate flow together — building step by step, from invoice intake to SAP enrichment.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div className="rounded-lg border border-cyan-400/25 bg-cyan-500/5 p-4">
                      <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 justify-center">
                        <Clock size={16} /> Estimated time: ~10 minutes
                      </p>
                    </div>
                    <div className="rounded-lg border border-cyan-400/25 bg-cyan-500/5 p-4">
                      <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 justify-center">
                        <CheckCircle2 size={16} /> Interactive walkthrough
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-base text-slate-300 italic">
                  Any questions before we start building?
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => window.location.assign('http://localhost:3000/use-case')}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-500/20 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-500/30"
                  >
                    <Zap size={18} /> Go To Live Build
                  </button>
                </div>
              </div>
            </div>
          )}
        </StepReveal>
      </div>
    </div>
  );
};
