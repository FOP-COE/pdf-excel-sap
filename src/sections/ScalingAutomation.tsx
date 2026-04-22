import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Clock,
  Target,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Calendar,
  FileText,
  Shield,
  DollarSign,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

export const ScalingAutomation = ({ resetSignal, isPaused }: SectionProps) => {
  const { stepMode, stepSignal, setIsFirstStep, setIsLastStep } = usePresentation();
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [animatingMultiplier, setAnimatingMultiplier] = useState(0);

  const stepController = useStepController({
    totalSteps: 4,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 8000,
    onFirstStepChange: setIsFirstStep,
    onLastStepChange: setIsLastStep
  });

  const automationOpportunities = [
    {
      title: "Month-End Processes",
      icon: Calendar,
      description: "AUTTP-like workflows",
      potential: "25+ processes",
      savings: "50h/month",
      complexity: "Medium",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Approval Workflows",
      icon: CheckCircle,
      description: "Multi-step approvals",
      potential: "15+ workflows",
      savings: "30h/month",
      complexity: "Low",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Data Consolidation",
      icon: BarChart3,
      description: "Multi-source reporting",
      potential: "20+ reports",
      savings: "40h/month",
      complexity: "High",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      title: "Compliance & Auditing",
      icon: Shield,
      description: "Automatic logging",
      potential: "10+ processes",
      savings: "20h/month",
      complexity: "Medium",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Vendor Management",
      icon: UserCheck,
      description: "Onboarding & tracking",
      potential: "12+ processes",
      savings: "25h/month",
      complexity: "Low",
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      title: "Budget Monitoring",
      icon: DollarSign,
      description: "Alerts & forecasting",
      potential: "8+ dashboards",
      savings: "15h/month",
      complexity: "Medium",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  const citizenPyramid = [
    { level: "Power Users", count: "5-10", description: "Advanced automations", icon: Target },
    { level: "Regular Users", count: "50+", description: "Standard workflows", icon: Users },
    { level: "End Users", count: "Everyone", description: "Beneficiaries", icon: Zap }
  ];

  const roadmapSteps = [
    { phase: "Days 1-30", title: "Identify Your AUTTP", description: "Find your personal pain point", status: "active" },
    { phase: "Days 31-60", title: "Build & Test", description: "Create your first automation", status: "upcoming" },
    { phase: "Days 61-90", title: "Share & Scale", description: "Expand across your team", status: "upcoming" }
  ];

  // Animate multiplier effect
  useEffect(() => {
    if (stepController.currentStep === 1 && !isPaused) {
      const interval = setInterval(() => {
        setAnimatingMultiplier(prev => (prev + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stepController.currentStep, isPaused]);

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid-scaling" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-white/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-scaling)" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Impact Multiplier */}
        {stepController.currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-8">
              From One Success to Organization-Wide Impact
            </h2>
            <p className="font-amadeus text-xl text-white/70 text-center mb-16 max-w-4xl">
              Scaling automation across FinOps • The multiplier effect
            </p>

            <div className="relative max-w-5xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">

                <motion.div
                  className="grid grid-cols-3 gap-8 items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* AUTTP Case */}
                  <div className="space-y-4">
                    <motion.div
                      animate={{ scale: animatingMultiplier === 0 ? 1.1 : 1 }}
                      className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6"
                    >
                      <FileText size={48} className="text-white mx-auto mb-4" />
                      <h3 className="font-amadeus text-xl font-bold text-white">AUTTP Case</h3>
                      <p className="font-amadeus text-white/90">1 automation</p>
                      <p className="font-amadeus text-white/70">2h saved/month</p>
                    </motion.div>
                  </div>

                  {/* Multiplier Symbol */}
                  <div className="flex flex-col items-center space-y-4">
                    <motion.div
                      animate={{ rotate: animatingMultiplier === 1 ? 360 : 0 }}
                      transition={{ duration: 1 }}
                      className="text-6xl text-white/60"
                    >
                      ×
                    </motion.div>
                    <p className="font-amadeus text-lg text-white/80">Organization Scale</p>
                  </div>

                  {/* Result */}
                  <div className="space-y-4">
                    <motion.div
                      animate={{ scale: animatingMultiplier === 2 ? 1.1 : 1 }}
                      className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6"
                    >
                      <TrendingUp size={48} className="text-white mx-auto mb-4" />
                      <h3 className="font-amadeus text-xl font-bold text-white">Potential Impact</h3>
                      <motion.p
                        className="font-amadeus text-white/90"
                        animate={{ opacity: animatingMultiplier >= 3 ? 1 : 0.5 }}
                      >
                        50+ similar processes
                      </motion.p>
                      <motion.p
                        className="font-amadeus text-white/70"
                        animate={{ opacity: animatingMultiplier >= 3 ? 1 : 0.5 }}
                      >
                        2,400h saved/year
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animatingMultiplier >= 3 ? 1 : 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-8 text-center"
                >
                  <p className="font-amadeus text-2xl text-white/90 font-bold">
                    = 30 full-time weeks recovered annually
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: FinOps Automation Opportunities */}
        {stepController.currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-8">
              FinOps Automation Opportunities
            </h2>
            <p className="font-amadeus text-xl text-white/70 text-center mb-12 max-w-4xl">
              Click to explore automation potential across different areas
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-6xl w-full">
              {automationOpportunities.map((opportunity, index) => {
                const IconComponent = opportunity.icon;
                const isSelected = selectedOpportunity === index;

                return (
                  <motion.div
                    key={opportunity.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedOpportunity(isSelected ? null : index)}
                    className={`relative group cursor-pointer transition-all duration-300 ${
                      isSelected ? 'scale-105' : ''
                    }`}
                  >
                    <div className={`bg-white/5 backdrop-blur-md rounded-3xl p-6 border transition-all duration-300 ${
                      isSelected
                        ? 'border-white/30 bg-white/10'
                        : 'border-white/10 group-hover:bg-white/10 group-hover:border-white/20'
                    }`}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${opportunity.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="font-amadeus text-lg font-bold text-white mb-2">
                        {opportunity.title}
                      </h3>
                      <p className="font-amadeus text-sm text-white/60 mb-3">
                        {opportunity.description}
                      </p>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 pt-3 border-t border-white/20"
                          >
                            <div className="flex justify-between">
                              <span className="font-amadeus text-xs text-white/70">Potential:</span>
                              <span className="font-amadeus text-xs text-white/90">{opportunity.potential}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-amadeus text-xs text-white/70">Savings:</span>
                              <span className="font-amadeus text-xs text-green-400">{opportunity.savings}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-amadeus text-xs text-white/70">Complexity:</span>
                              <span className={`font-amadeus text-xs ${
                                opportunity.complexity === 'Low' ? 'text-green-400' :
                                opportunity.complexity === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {opportunity.complexity}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Citizen Developer Pyramid */}
        {stepController.currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-8">
              Citizen Developer Pyramid
            </h2>
            <p className="font-amadeus text-xl text-white/70 text-center mb-16 max-w-4xl">
              Democratizing automation across skill levels
            </p>

            <div className="relative max-w-4xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl"></div>
              <div className="relative space-y-6">
                {citizenPyramid.map((level, index) => {
                  const IconComponent = level.icon;
                  const width = index === 0 ? 'w-80' : index === 1 ? 'w-96' : 'w-full';

                  return (
                    <motion.div
                      key={level.level}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3, duration: 0.8 }}
                      className={`${width} mx-auto bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-20 h-20 bg-gradient-to-br ${
                          index === 0 ? 'from-purple-500 to-violet-600' :
                          index === 1 ? 'from-blue-500 to-indigo-600' : 'from-green-500 to-emerald-600'
                        } rounded-2xl flex items-center justify-center`}>
                          <IconComponent size={40} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-amadeus text-2xl font-bold text-white">
                              {level.level}
                            </h3>
                            <span className="font-amadeus text-xl text-white/80 font-bold">
                              {level.count}
                            </span>
                          </div>
                          <p className="font-amadeus text-lg text-white/70">
                            {level.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Next 90 Days Roadmap */}
        {stepController.currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-8">
              Your Next 90 Days
            </h2>
            <p className="font-amadeus text-xl text-white/70 text-center mb-16 max-w-4xl">
              From idea to organizational impact
            </p>

            <div className="relative max-w-5xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 blur-3xl"></div>
              <div className="relative flex items-center justify-between">
                {roadmapSteps.map((step, index) => (
                  <div key={step.phase} className="flex items-center flex-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.4, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className={`w-32 h-32 rounded-3xl flex flex-col items-center justify-center mx-auto mb-6 ${
                        step.status === 'active'
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-500/50'
                          : 'bg-white/10 border border-white/20'
                      } transition-all duration-500`}>
                        <div className="font-amadeus text-sm font-bold text-white mb-1">
                          {step.phase}
                        </div>
                        <div className={`w-8 h-8 rounded-full ${
                          step.status === 'active' ? 'bg-white/30' : 'bg-white/10'
                        }`}></div>
                      </div>
                      <h3 className="font-amadeus text-xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="font-amadeus text-sm text-white/70">
                        {step.description}
                      </p>
                    </motion.div>

                    {index < roadmapSteps.length - 1 && (
                      <div className="flex-1 h-1 mx-8 relative">
                        <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: (index + 1) * 0.4, duration: 0.8 }}
                          style={{ transformOrigin: 'left' }}
                        ></motion.div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-12 text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <p className="font-amadeus text-lg text-white/90 mb-2">
                  Ready to start your automation journey?
                </p>
                <p className="font-amadeus text-sm text-white/70">
                  CoE support available every step of the way • coe-finops@amadeus.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};