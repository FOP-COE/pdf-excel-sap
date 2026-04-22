import { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FlipCard3DProps {
  icon: LucideIcon;
  title: string;
  description: string;
  backContent: string[];
  gradient: string;
}

export const FlipCard3D = ({ icon: Icon, title, description, backContent, gradient }: FlipCard3DProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 h-64 w-full">
      <motion.div
        className="relative h-full w-full cursor-pointer preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className={`backface-hidden absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} p-8 text-white shadow-2xl`}>
          <div className="flex h-full flex-col justify-between">
            <div>
              <Icon className="mb-4 h-10 w-10" />
              <h3 className="mb-2 text-2xl font-bold">{title}</h3>
              <p className="text-sm opacity-90">{description}</p>
            </div>
            <div className="text-xs opacity-75">Click para más detalles →</div>
          </div>
        </div>

        {/* Back */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white shadow-2xl">
          <div className="flex h-full flex-col">
            <h3 className="mb-4 text-xl font-bold">Beneficios clave</h3>
            <ul className="space-y-2 text-sm">
              {backContent.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="mr-2 mt-1 block h-1.5 w-1.5 rounded-full bg-brand-400" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Add necessary CSS classes
export const flipCardStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;