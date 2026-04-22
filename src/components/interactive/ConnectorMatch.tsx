import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Scenario {
  id: string;
  question: string;
  answers: { label: string; connector: string; correct: boolean }[];
}

interface Props {
  scenarios: Scenario[];
  resetSignal: number;
  isPaused: boolean;
}

export const ConnectorMatch = ({ scenarios, resetSignal, isPaused }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setSelected(null);
    setFeedbackVisible(false);
  }, [resetSignal]);

  useEffect(() => {
    if (isPaused || !feedbackVisible) return;
    const timeout = setTimeout(() => {
      setSelected(null);
      setFeedbackVisible(false);
      setCurrentIndex((prev) => (prev + 1) % scenarios.length);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [feedbackVisible, isPaused, scenarios.length]);

  const scenario = scenarios[currentIndex];
  const correct = scenario.answers.find((answer) => answer.correct)?.connector;

  const handleSelect = (answerId: string) => {
    if (feedbackVisible) return;
    setSelected(answerId);
    setFeedbackVisible(true);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-xl dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Connector Match
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Elige el conector ideal para cada escenario.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
          Escenario {currentIndex + 1}/{scenarios.length}
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
        {scenario.question}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {scenario.answers.map((answer) => {
          const isSelected = selected === answer.label;
          const isCorrect = feedbackVisible && answer.correct;
          const isWrong = feedbackVisible && isSelected && !answer.correct;
          return (
            <button
              key={answer.label}
              onClick={() => handleSelect(answer.label)}
              className={`rounded-2xl border p-4 text-left text-sm transition ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200'
                  : isWrong
                  ? 'border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-900/30 dark:text-rose-200'
                  : isSelected
                  ? 'border-brand-300 bg-brand-50/80 text-brand-600 dark:border-brand-400/50 dark:bg-brand-900/40 dark:text-brand-200'
                  : 'border-slate-200 bg-white hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <div className="text-sm font-semibold">{answer.label}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{answer.connector}</p>
            </button>
          );
        })}
      </div>
      {feedbackVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-brand-200 bg-brand-50/80 p-4 text-sm text-brand-700 dark:border-brand-500/40 dark:bg-brand-900/40 dark:text-brand-200"
        >
          <strong>Conector recomendado:</strong> {correct}
        </motion.div>
      )}
    </div>
  );
};
