import { useEffect, useMemo, useState } from 'react';
import { connectorCategories } from '@/data';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface Props {
  resetSignal: number;
}

export const ConnectorCatalog = ({ resetSignal }: Props) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(connectorCategories[0].id);

  useEffect(() => {
    setQuery('');
    setActiveCategory(connectorCategories[0].id);
  }, [resetSignal]);

  const filteredConnectors = useMemo(
    () =>
      connectorCategories
        .find((category) => category.id === activeCategory)
        ?.connectors.filter((connector) => connector.toLowerCase().includes(query.toLowerCase())),
    [activeCategory, query]
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Categorías de conectores</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Explora el ecosistema sin salir de la herramienta.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar conector..."
            className="bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {connectorCategories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'border-brand-400 bg-brand-50 text-brand-600 dark:border-brand-400/40 dark:bg-brand-900/40 dark:text-brand-200'
                  : 'border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <motion.div
        key={activeCategory + query}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 grid gap-3 md:grid-cols-2"
      >
        {filteredConnectors?.map((connector) => (
          <div
            key={connector}
            className="rounded-2xl border border-slate-200 bg-white/70 p-3 text-sm font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            {connector}
          </div>
        )) ?? <p className="text-sm text-slate-500">Sin resultados</p>}
      </motion.div>
    </div>
  );
};
