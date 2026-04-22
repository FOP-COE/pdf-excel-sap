import { motion } from 'framer-motion';
import { SuccessStory } from '@/types';
import { Trophy } from 'lucide-react';

interface Props {
  stories: SuccessStory[];
}

export const SuccessStories = ({ stories }: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      <Trophy size={16} /> Historias de éxito
    </div>
    <div className="mt-4 grid gap-4 md:grid-cols-3">
      {stories.map((story, index) => (
        <motion.div
          key={story.company}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
            {story.company}
          </div>
          <div className="mt-2 text-lg font-bold text-slate-800 dark:text-slate-100">{story.metric}</div>
          <p className="mt-2 text-sm">{story.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);
