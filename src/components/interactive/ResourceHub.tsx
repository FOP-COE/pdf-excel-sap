import { QRCodeSVG } from 'qrcode.react';
import { Book, ExternalLink, Video } from 'lucide-react';

export const ResourceHub = () => {
  const resources = [
    { label: 'Guía Express Power Automate', icon: Book, href: 'https://amadeus.com/coe-guides' },
    { label: 'Plantillas FinOps', icon: Video, href: 'https://amadeus.com/coe-playbooks' },
    { label: 'Contacta al CoE', icon: ExternalLink, href: 'mailto:coe-finops@amadeus.com' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Resource Hub</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Accede a manuales, plantillas y soporte del CoE. Escanea el QR o abre los links rápidos.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {resources.map((resource) => (
            <a
              key={resource.label}
              href={resource.href}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
            >
              <resource.icon size={16} /> {resource.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <QRCodeSVG value="https://amadeus.com/finops-hub" size={120} bgColor="transparent" fgColor="#2053a7" />
        <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Materiales & QR
        </span>
      </div>
    </div>
  );
};
