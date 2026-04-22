import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface FlowBlock {
  id: string;
  label: string;
  description: string;
  kind: 'trigger' | 'action' | 'condition' | 'output';
}

interface Props {
  resetSignal: number;
  isPaused: boolean;
}

const ALL_BLOCKS: FlowBlock[] = [
  {
    id: 'trigger-new-email',
    label: 'Trigger: New email',
    description: 'When an approval request arrives to finance',
    kind: 'trigger'
  },
  {
    id: 'condition-amount',
    label: 'Condition: Amount > 5k€',
    description: 'Routes flows depending on the amount',
    kind: 'condition'
  },
  {
    id: 'action-post-teams',
    label: 'Action: Notify in Teams',
    description: 'Posts to the Finance channel in Teams',
    kind: 'action'
  },
  {
    id: 'output-update-sharepoint',
    label: 'Output: Update SharePoint',
    description: 'Syncs the record with the official list',
    kind: 'output'
  }
];

const getColorByKind = (kind: FlowBlock['kind']) => {
  switch (kind) {
    case 'trigger':
      return 'from-brand-400 to-brand-600';
    case 'action':
      return 'from-emerald-400 to-emerald-600';
    case 'condition':
      return 'from-amber-400 to-orange-500';
    case 'output':
      return 'from-purple-400 to-purple-600';
    default:
      return 'from-slate-400 to-slate-600';
  }
};

export const DragDropFlowBuilder = ({ resetSignal, isPaused }: Props) => {
  const [canvas, setCanvas] = useState<FlowBlock[]>([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setCanvas([]);
    setTimer(30);
  }, [resetSignal]);

  useEffect(() => {
    if (isPaused || timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, timer]);

  const availableBlocks = useMemo(
    () => ALL_BLOCKS.filter((block) => !canvas.find((item) => item.id === block.id)),
    [canvas]
  );

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const block = ALL_BLOCKS.find((item) => item.id === id);
    if (!block) return;
    setCanvas((prev) => [...prev, block]);
  };

  const onDragStart = (event: React.DragEvent<HTMLButtonElement>, id: string) => {
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.effectAllowed = 'move';
  };

  const isComplete = canvas.length === ALL_BLOCKS.length;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Build your first flow</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Drag and drop components to the canvas. Goal: complete the flow in less than 30s.
          </p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900`}>
          <span className="text-xl font-bold">{timer}</span>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Available blocks
          </h4>
          <div className="space-y-3">
            {availableBlocks.map((block) => (
              <button
                key={block.id}
                draggable
                onDragStart={(event) => onDragStart(event, block.id)}
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${getColorByKind(block.kind)} px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white`}> 
                  {block.kind}
                </span>
                <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{block.label}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{block.description}</p>
                <p className="mt-2 text-[11px] text-brand-600 dark:text-brand-300">Drag to canvas</p>
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Flow canvas
          </h4>
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
            className="mt-3 flex min-h-[240px] flex-col gap-3 rounded-3xl border border-dashed border-brand-200 bg-white/60 p-6 text-sm text-slate-600 transition dark:border-brand-800 dark:bg-slate-900/60"
          >
            {canvas.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-slate-500 dark:text-slate-400">
                <Zap className="h-8 w-8 text-brand-500" />
                <p>Drag a block to start. Tip: trigger the flow with a trigger.</p>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {canvas.map((block, index) => (
                <motion.div
                  key={block.id}
                  layout
                  className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/80 p-3 shadow-sm dark:border-brand-700/50 dark:bg-slate-900/70"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{block.label}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{block.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200"
              >
                Ready! In the second part of the workshop you'll build this flow live.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
