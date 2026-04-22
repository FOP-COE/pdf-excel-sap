import { Mail, Share2 } from 'lucide-react';
import { logos } from '@/utils/assets';

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 min-h-0">
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-1 text-xs text-slate-500 dark:text-slate-300">
      <div className="flex items-center gap-2">
        <img
          src={logos.amadeusBlue}
          alt="Amadeus"
          className="h-3 w-auto dark:hidden"
        />
        <img
          src={logos.amadeusWhite}
          alt="Amadeus"
          className="h-3 w-auto hidden dark:block"
        />
        <span className="font-semibold text-brand-600 dark:text-brand-300">COE-5024</span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="mailto:training@example.com"
          className="flex items-center gap-1 hover:text-brand-500"
        >
          <Mail size={10} /> training@example.com
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-brand-500">
          <Share2 size={10} /> Resource Hub
        </a>
      </div>
    </div>
  </footer>
);
