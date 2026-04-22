import { useMemo } from 'react';

interface Props {
  connectors: string[];
  highlighted?: string[];
}

const hexStyle =
  'relative flex h-28 w-28 items-center justify-center rounded-[16px] bg-gradient-to-br from-brand-500/90 to-brand-700/90 text-center text-sm font-semibold text-white shadow-xl transition hover:scale-105';

export const ConnectorHexMap = ({ connectors, highlighted = [] }: Props) => {
  const layout = useMemo(() => {
    const positions = [
      'ml-14',
      '-mt-10',
      'ml-28 -mt-10',
      'ml-14 -mt-20',
      'ml-0 -mt-10',
      'ml-28 -mt-10'
    ];
    return connectors.map((connector, index) => ({
      connector,
      className: positions[index] ?? ''
    }));
  }, [connectors]);

  return (
    <div className="relative mx-auto flex max-w-lg flex-wrap justify-center gap-6">
      {layout.map(({ connector, className }, index) => {
        const isHighlighted = highlighted.includes(connector);
        return (
          <div
            key={connector}
            className={`${hexStyle} ${className} ${
              isHighlighted ? 'from-accent/80 to-emerald-500 shadow-accent/40' : ''
            }`}
          >
            <span className="px-2 leading-tight">{connector}</span>
            <div className="absolute inset-0 -z-10 rounded-[16px] border border-white/40" />
            {index % 2 === 0 && (
              <span className="absolute -bottom-14 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Click para ver más
              </span>
            )}
          </div>
        );
      })}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[48px] bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-brand-500/0 blur-3xl" />
    </div>
  );
};
