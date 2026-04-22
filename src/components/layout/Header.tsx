import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { usePresentation } from '@/context/PresentationContext';

export const Header = () => {
  const { sections } = usePresentation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/50 bg-white/95 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-950/95 shadow-lg">
      <div className="mx-auto w-full max-w-full px-4 py-2">
        <div className="flex items-center justify-center gap-4 text-xs">
          {/* Breadcrumbs */}
          <div className="flex-shrink-0">
            <Breadcrumbs />
          </div>

          {/* Separator */}
          <span className="text-slate-400">|</span>

          {/* Sections count and Quick Keys - all in one line */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 whitespace-nowrap">
            <span className="font-medium">{sections.length} sections</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-brand-600 dark:text-brand-300">Keys:</span>
            <span>←→ navigate</span>
            <span className="text-slate-400">•</span>
            <span>1-{sections.length} jump</span>
            <span className="text-slate-400">•</span>
            <span>H hide</span>
          </div>
        </div>
      </div>
    </div>
  );
};
