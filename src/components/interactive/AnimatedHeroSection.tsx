import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const AnimatedHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-purple-600/20 to-pink-600/20" />
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.circle
            cx="10%"
            cy="20%"
            r="300"
            fill="url(#gradient1)"
            filter="url(#glow)"
            animate={{
              cx: ['10%', '90%', '10%'],
              cy: ['20%', '80%', '20%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.circle
            cx="90%"
            cy="80%"
            r="250"
            fill="url(#gradient2)"
            filter="url(#glow)"
            animate={{
              cx: ['90%', '10%', '90%'],
              cy: ['80%', '20%', '80%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <defs>
            <radialGradient id="gradient1">
              <stop offset="0%" stopColor="#356cc4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#356cc4" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gradient2">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="mb-6 bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent md:text-8xl">
            Power Automate
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-300 md:text-2xl">
            Transformando la forma en que las finanzas trabajan con automatización inteligente
          </p>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-brand-400/20 to-purple-400/20 backdrop-blur-xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};