import { StepReveal } from '@/components/common/StepReveal';
import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { Play, Camera, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { logos } from '@/utils/assets';

export const CoverPage = ({ resetSignal }: SectionProps) => {
  const { stepMode, stepSignal, setIsFirstStep, setIsLastStep } = usePresentation();
  
  const stepController = useStepController({
    totalSteps: 4,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 3000,
    onFirstStepChange: setIsFirstStep,
    onLastStepChange: setIsLastStep
  });

  const currentStep = stepController.currentStep;

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-pink-600/20"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid-cover" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-white/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cover)" />
        </svg>
      </div>

      {/* Step Progress Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: currentStep === index ? 40 : 8,
                backgroundColor: currentStep >= index ? '#8b5cf6' : '#ffffff30'
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Step 1: Branding and Confidential - Fixed positions */}
      <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="fade">
        <div className="absolute left-6 top-6 z-10">
          <img
            src={logos.coeWhite}
            alt="Center of Excellence"
            className="h-16 w-auto"
          />
        </div>
        <div className="absolute right-6 top-6 flex items-center gap-2 z-10">
          <span className="text-sm font-medium uppercase tracking-wide text-orange-400">CONFIDENTIAL</span>
          <div className="h-6 w-6 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-white/40"></div>
          </div>
        </div>
      </StepReveal>

      {/* Step 2: Recording notification - Fixed position top third */}
      <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6 text-center">
          {/* Recording frame corners */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-white/60"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-white/60"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-white/60"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-white/60"></div>
          </div>

          {/* Recording indicator */}
          <div className="flex items-center justify-center gap-3 mb-6 p-4">
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              REC
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur text-white px-3 py-1 rounded text-xs">
              HD <span className="bg-purple-600 px-1 rounded">4K</span> 50FPS
              <div className="flex items-center gap-1">
                <div className="w-3 h-1 bg-green-400 rounded"></div>
                <div className="w-3 h-1 bg-green-400 rounded"></div>
                <div className="w-3 h-1 bg-green-300 rounded"></div>
                <span className="text-xs">99%</span>
              </div>
            </div>
          </div>

          <h1 className="font-amadeus text-4xl md:text-6xl font-bold text-white mb-6">
            This session will be recorded...
          </h1>

          <div className="font-amadeus text-xl md:text-2xl text-white/90 font-light">
            ...but don't let that stop you! The more you engage in, 
            <br />
            the less this feels like a solo podcast.
          </div>
        </div>
      </StepReveal>

      {/* Step 3: Course title - Fixed position between recording and footer */}
      <StepReveal step={2} isVisible={stepController.isStepVisible(2)} direction="up">
        <div className="absolute top-96 left-1/2 transform -translate-x-1/2 w-full max-w-4xl text-center px-6">
          <h2 className="font-amadeus text-5xl md:text-6xl font-bold text-white mb-4">
            AI Finance Training Series
          </h2>
          <p className="font-amadeus text-xl md:text-2xl text-purple-200 font-medium">
            PDF into Excel into SAP
          </p>
        </div>
      </StepReveal>

      {/* Step 4: Footer info - Fixed bottom position */}
      <StepReveal step={3} isVisible={stepController.isStepVisible(3)} direction="fade" delay={0.1}>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl text-center px-6">
          <div className="font-amadeus text-lg md:text-xl text-purple-100 space-y-3 mb-8">
            <div className="font-medium">
              Center of Excellence (CFA-FOP-COE)
            </div>
            <div className="text-purple-200">
              April 2026
            </div>
          </div>

          {/* Interactive elements hint */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-purple-200 text-sm">
              <Play size={14} />
              <span>Interactive session</span>
            </div>
            <div className="flex items-center gap-2 text-purple-200 text-sm">
              <Users size={14} />
              <span>Hands-on workshop</span>
            </div>
            <div className="flex items-center gap-2 text-purple-200 text-sm">
              <Camera size={14} />
              <span>Live demo</span>
            </div>
          </div>
        </div>
      </StepReveal>
    </div>
  );
};