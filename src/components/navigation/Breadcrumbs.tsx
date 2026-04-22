import { usePresentation } from '@/context/PresentationContext';

export const Breadcrumbs = () => {
  const { sections, currentSectionIndex, setCurrentSection } = usePresentation();

  return (
    <nav className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {sections.map((section, index) => {
        const isActive = index === currentSectionIndex;
        return (
          <button
            key={section.id}
            onClick={() => setCurrentSection(index)}
            className={`flex items-center gap-2 transition-colors ${
              isActive ? 'text-brand-600 dark:text-brand-300' : 'hover:text-brand-500'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold ${
                isActive
                  ? 'border-brand-500 bg-brand-50 text-brand-600 dark:border-brand-300 dark:bg-brand-900/30 dark:text-brand-200'
                  : 'border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              {index + 1}
            </span>
            <span>{section.title}</span>
          </button>
        );
      })}
    </nav>
  );
};
