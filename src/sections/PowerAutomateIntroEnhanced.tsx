import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Cloud, Shield, TrendingUp, Users, Workflow } from 'lucide-react';
import { SectionShell } from '@/components/common/SectionShell';
import { AnimatedHeroSection } from '@/components/interactive/AnimatedHeroSection';
import { FlipCard3D } from '@/components/interactive/FlipCard3D';
import { AnimatedFlowVisualization } from '@/components/interactive/AnimatedFlowVisualization';
import { GlassmorphismStatsCard } from '@/components/interactive/GlassmorphismStatsCard';
import { ParticleBackground } from '@/components/interactive/ParticleBackground';
import { BentoGrid, BentoGridItem } from '@/components/interactive/BentoGrid';
import { SectionProps } from '@/types';

export const PowerAutomateIntroEnhanced = ({ resetSignal, isPaused }: SectionProps) => {
  const [globalFlows, setGlobalFlows] = useState(3128450);
  const [timesSaved, setTimesSaved] = useState(892000);
  const [activeUsers, setActiveUsers] = useState(125000);

  useEffect(() => {
    setGlobalFlows(3128450);
    setTimesSaved(892000);
    setActiveUsers(125000);
  }, [resetSignal]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setGlobalFlows((prev) => prev + Math.floor(Math.random() * 120 + 80));
      setTimesSaved((prev) => prev + Math.floor(Math.random() * 50 + 30));
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 5 + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const flipCards = [
    {
      icon: Zap,
      title: 'Automatización Low-Code',
      description: 'Crea flujos sin programar',
      backContent: [
        'Interfaz drag-and-drop intuitiva',
        'Plantillas pre-construidas',
        'Sin necesidad de IT',
        'Implementación en minutos'
      ],
      gradient: 'from-brand-400 to-brand-600'
    },
    {
      icon: Cloud,
      title: '1000+ Conectores',
      description: 'Integra todo tu ecosistema',
      backContent: [
        'SAP, Excel, Teams integrados',
        'APIs personalizadas',
        'Conectores premium',
        'Sincronización en tiempo real'
      ],
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Seguridad Enterprise',
      description: 'Compliance y gobernanza',
      backContent: [
        'Encriptación end-to-end',
        'Auditoría completa',
        'Control de accesos granular',
        'Certificaciones ISO'
      ],
      gradient: 'from-emerald-400 to-emerald-600'
    }
  ];

  return (
    <>
      <ParticleBackground />
      <SectionShell
        title="Power Automate: El Futuro de las Finanzas"
        subtitle="Transformando ideas en automatizaciones que revolucionan la productividad"
        durationMinutes={20}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-purple-600 to-pink-600 p-1"
        >
          <div className="rounded-3xl bg-white/95 p-12 backdrop-blur-xl dark:bg-slate-900/95">
            <h2 className="mb-6 bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 bg-clip-text text-center text-5xl font-bold text-transparent">
              Power Automate cambia las reglas del juego
            </h2>
            <p className="mx-auto max-w-3xl text-center text-xl text-slate-600 dark:text-slate-300">
              La plataforma que está democratizando la automatización en finanzas, 
              permitiendo a profesionales como tú crear soluciones potentes sin escribir una línea de código
            </p>
          </div>
        </motion.div>

        {/* Stats Grid with Glassmorphism */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <GlassmorphismStatsCard
            icon={Workflow}
            value={new Intl.NumberFormat('es-ES').format(globalFlows)}
            label="Flujos ejecutándose ahora"
            trend={12}
            gradient="from-brand-400 to-brand-600"
          />
          <GlassmorphismStatsCard
            icon={TrendingUp}
            value={`${new Intl.NumberFormat('es-ES').format(timesSaved)}h`}
            label="Horas ahorradas este mes"
            trend={28}
            gradient="from-emerald-400 to-emerald-600"
          />
          <GlassmorphismStatsCard
            icon={Users}
            value={new Intl.NumberFormat('es-ES').format(activeUsers)}
            label="Usuarios activos en finanzas"
            trend={15}
            gradient="from-purple-400 to-purple-600"
          />
        </div>

        {/* 3D Flip Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {flipCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FlipCard3D {...card} />
            </motion.div>
          ))}
        </div>

        {/* Animated Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="mb-6 text-center text-2xl font-bold text-slate-800 dark:text-white">
            Visualización de Flujo en Tiempo Real
          </h3>
          <AnimatedFlowVisualization />
        </motion.div>

        {/* Bento Grid with Features */}
        <BentoGrid>
          <BentoGridItem
            title="AI Builder"
            description="Inteligencia artificial sin código"
            icon={<Zap className="h-6 w-6 text-brand-600" />}
            className="md:col-span-2"
            gradient="from-brand-100 to-brand-200 dark:from-brand-900/20 dark:to-brand-800/20"
          >
            <div className="mt-4 flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 opacity-20" />
              <div className="flex-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Procesamiento de documentos, análisis de sentimientos y más
                </p>
              </div>
            </div>
          </BentoGridItem>

          <BentoGridItem
            title="Process Mining"
            description="Descubre oportunidades"
            icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
            gradient="from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20"
          />

          <BentoGridItem
            title="RPA Desktop"
            description="Automatiza aplicaciones legacy"
            icon={<Shield className="h-6 w-6 text-purple-600" />}
            gradient="from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20"
          />

          <BentoGridItem
            title="Templates Financieros"
            description="Soluciones pre-construidas para finanzas"
            icon={<Cloud className="h-6 w-6 text-pink-600" />}
            className="md:col-span-2"
            gradient="from-pink-100 to-pink-200 dark:from-pink-900/20 dark:to-pink-800/20"
          >
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-white/50 p-2 dark:bg-slate-900/50">Conciliación bancaria</div>
              <div className="rounded-lg bg-white/50 p-2 dark:bg-slate-900/50">Aprobación de gastos</div>
              <div className="rounded-lg bg-white/50 p-2 dark:bg-slate-900/50">Reportes automáticos</div>
              <div className="rounded-lg bg-white/50 p-2 dark:bg-slate-900/50">Alertas compliance</div>
            </div>
          </BentoGridItem>

          <BentoGridItem
            title="Análisis Predictivo"
            description="Anticipa tendencias"
            icon={<Workflow className="h-6 w-6 text-amber-600" />}
            gradient="from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20"
          />
        </BentoGrid>
      </SectionShell>
    </>
  );
};