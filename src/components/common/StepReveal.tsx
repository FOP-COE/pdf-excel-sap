import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepRevealProps {
  step: number;
  isVisible: boolean;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

const directionVariants = {
  up: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  },
  down: {
    initial: { opacity: 0, y: -30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  },
  left: {
    initial: { opacity: 0, x: 30, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.95 }
  },
  right: {
    initial: { opacity: 0, x: -30, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 20, scale: 0.95 }
  },
  fade: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 }
  }
};

export const StepReveal = ({ 
  step, 
  isVisible, 
  isActive = false, 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: StepRevealProps) => {
  const variants = directionVariants[direction];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`step-${step}`}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ 
            duration: 0.8, 
            delay,
            ease: [0.25, 0.1, 0.25, 1],
            opacity: { duration: 1.0 },
            scale: { duration: 0.6 }
          }}
          className={`${className} ${isActive ? 'ring-2 ring-brand-400 ring-opacity-50' : ''}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};