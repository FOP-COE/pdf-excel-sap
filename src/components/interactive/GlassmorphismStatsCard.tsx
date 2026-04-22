import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GlassmorphismStatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: number;
  gradient: string;
}

export const GlassmorphismStatsCard = ({ 
  icon: Icon, 
  value, 
  label, 
  trend, 
  gradient 
}: GlassmorphismStatsCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.16}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileTap={{ cursor: 'grabbing' }}
      className="relative cursor-grab"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl backdrop-filter dark:border-white/10 dark:bg-slate-900/20"
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
        
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-10 rounded-full bg-white/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <div className={`rounded-2xl bg-gradient-to-r ${gradient} p-3 text-white shadow-lg`}>
              <Icon className="h-6 w-6" />
            </div>
            {trend && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center text-sm font-semibold ${
                  trend > 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </motion.div>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-1 text-3xl font-bold text-slate-800 dark:text-white">
              {value}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
          </motion.div>
        </div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ translateX: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'linear',
          }}
        />
      </motion.div>
    </motion.div>
  );
};