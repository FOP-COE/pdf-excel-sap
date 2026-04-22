import { useEffect, useState } from 'react';
import { LivePollOption } from '@/types';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  options: LivePollOption[];
  question: string;
  isPaused: boolean;
}

export const LivePoll = ({ options, question, isPaused }: Props) => {
  const [pollOptions, setPollOptions] = useState(options);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPollOptions((prev) =>
        prev.map((option) => ({
          ...option,
          votes: option.votes + Math.floor(Math.random() * 2)
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const totalVotes = pollOptions.reduce((acc, option) => acc + option.votes, 0);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur-lg shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Live Poll · {question}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Escanea el código QR o abre amadeus.com/finops-poll para responder en tu móvil.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <QRCodeSVG
            value="https://amadeus.com/finops-poll"
            size={100}
            bgColor="transparent"
            fgColor="#2053a7"
          />
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Escanea aquí
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <AnimatePresence>
          {pollOptions.map((option) => {
            const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl border border-slate-100 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>{option.label}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800">
                  <motion.div
                    layout
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
