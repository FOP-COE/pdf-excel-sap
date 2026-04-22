import { motion } from 'framer-motion';
import { usePresentation } from '@/context/PresentationContext';
import { getAnalytics } from '@/utils/analytics';

interface Props {
  notes: string[];
}

export const PresenterNotesPanel = ({ notes }: Props) => {
  const { sections, currentSectionIndex } = usePresentation();
  const section = sections[currentSectionIndex];
  const analytics = getAnalytics();

  const visits = Object.entries(analytics.sectionVisits)
    .map(([key, value]) => ({
      title: sections.find((item) => item.analyticsKey === key)?.title ?? key,
      value
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 w-80 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
        Presenter notes · {section.title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
        {notes.map((note, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-400" aria-hidden />
            <span>{note}</span>
          </li>
        ))}
      </ul>
      {visits.length > 0 && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-3 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Live analytics
          </div>
          <ul className="mt-2 space-y-1">
            {visits.map((visit) => (
              <li key={visit.title} className="flex items-center justify-between">
                <span>{visit.title}</span>
                <span className="tabular-nums font-semibold text-brand-500 dark:text-brand-300">{visit.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.aside>
  );
};
