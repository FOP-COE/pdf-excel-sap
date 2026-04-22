import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '@/types';

interface Props {
  testimonials: Testimonial[];
  isPaused: boolean;
  resetSignal: number;
}

export const TestimonialCarousel = ({ testimonials, isPaused, resetSignal }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [resetSignal]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const testimonial = testimonials[index];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
        <Quote size={16} /> Voces FinOps
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <p className="mt-4 text-lg font-medium text-slate-800 dark:text-slate-100">“{testimonial.quote}”</p>
          <div className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
            {testimonial.name}
          </div>
          <div className="text-xs text-slate-400">{testimonial.role}</div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 right-4 flex gap-2">
        {testimonials.map((item, dotIndex) => (
          <span
            key={item.name}
            className={`h-2 w-2 rounded-full transition ${
              dotIndex === index ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
