import { MousePointer2 } from 'lucide-react';

interface Props {
  message: string;
}

export const InteractionHint = ({ message }: Props) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-brand-300 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:border-brand-400/60 dark:bg-brand-900/40 dark:text-brand-200">
    <MousePointer2 size={14} /> {message}
  </div>
);
