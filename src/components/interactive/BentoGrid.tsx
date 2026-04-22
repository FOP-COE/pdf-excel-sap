import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoGridItemProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  gradient?: string;
}

export const BentoGridItem = ({ 
  title, 
  description, 
  icon, 
  className = '', 
  children,
  gradient = 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900'
}: BentoGridItemProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br ${gradient} p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl dark:border-slate-700 ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-400/20 to-purple-400/20" />
      </div>

      <div className="relative z-10">
        {icon && (
          <div className="mb-4 inline-flex rounded-2xl bg-white/50 p-3 shadow-sm dark:bg-slate-900/50">
            {icon}
          </div>
        )}
        
        <h3 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
          {title}
        </h3>
        
        {description && (
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
        
        {children}
      </div>

      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(53, 108, 196, 0.2) 50%, transparent 60%)',
          backgroundSize: '300% 300%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </motion.div>
  );
};

export const BentoGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid auto-rows-[20rem] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};