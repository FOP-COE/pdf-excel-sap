import { Suspense, useEffect, useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PresenterNotesPanel } from '@/components/layout/PresenterNotesPanel';
import { PresentationProvider, usePresentation } from '@/context/PresentationContext';
import { sections } from '@/sections';
import { LandingPage } from '@/pages/LandingPage';
import { UseCasePage } from '@/pages/UseCasePage';
import { useTheme } from '@/hooks/useTheme';
import { usePresentationTimer } from '@/hooks/usePresentationTimer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { SectionConfig } from '@/types';
import { trackSectionVisit, trackTimeSpent } from '@/utils/analytics';
import { loadFromStorage, saveToStorage } from '@/utils/storage';

const TIMER_STORAGE_KEY = 'coe-workshop-timer-state';

interface TimerPersistedState {
  elapsedSeconds: number;
}

const totalMinutes = sections.reduce((acc, section) => acc + section.durationMinutes, 0);

const PresentationContainer = () => {
  const [theme, toggleTheme] = useTheme();
  const [showHeader, setShowHeader] = useState(true);
  const {
    sections: configuredSections,
    currentSectionIndex,
    goToNext,
    goToPrevious,
    setCurrentSection,
    presenterMode,
    togglePresenterMode,
    customData,
    loadCustomData,
    clearCustomData,
    resetSignal,
    triggerReset,
    stepMode,
    toggleStepMode,
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    requestJumpToLast
  } = usePresentation();

  const [lastPersistedSecond, setLastPersistedSecond] = useState(0);

  const persistedTimer = useMemo<TimerPersistedState>(
    () => loadFromStorage(TIMER_STORAGE_KEY, { elapsedSeconds: 0 }),
    []
  );

  const { elapsedSeconds, remainingSeconds, isRunning, toggle, reset, setElapsed } = usePresentationTimer({
    totalMinutes,
    onTick: (totalElapsed) => {
      if (Math.floor(totalElapsed) !== lastPersistedSecond) {
        const secondsDelta = Math.max(0, Math.floor(totalElapsed) - lastPersistedSecond);
        if (secondsDelta > 0) {
          trackTimeSpent(secondsDelta);
          setLastPersistedSecond(Math.floor(totalElapsed));
          saveToStorage(TIMER_STORAGE_KEY, { elapsedSeconds: totalElapsed });
        }
      }
    }
  });

  useEffect(() => {
    setElapsed(persistedTimer.elapsedSeconds ?? 0);
    setLastPersistedSecond(Math.floor(persistedTimer.elapsedSeconds ?? 0));
  }, [persistedTimer, setElapsed]);

  useEffect(() => {
    trackSectionVisit(configuredSections[currentSectionIndex].analyticsKey);
  }, [configuredSections, currentSectionIndex]);

  const currentSection: SectionConfig = configuredSections[currentSectionIndex];
  const SectionComponent = currentSection.component;

  const progress = elapsedSeconds / (totalMinutes * 60);

  const handleRightArrow = useCallback(() => {
    // Siempre avanza paso a paso (step by step)
    if (isLastStep) {
      goToNext(); // Si estamos en el último step, avanza a la siguiente sección
    } else {
      nextStep(); // Si no, avanza al siguiente step
    }
  }, [isLastStep, nextStep, goToNext]);

  const handleLeftArrow = useCallback(() => {
    if (isFirstStep && currentSectionIndex > 0) {
      // Solicita que la sección previa monte directamente en su último paso
      requestJumpToLast();
      goToPrevious();
      return;
    }
    if (!isFirstStep) {
      previousStep();
    }
  }, [isFirstStep, currentSectionIndex, requestJumpToLast, goToPrevious, previousStep]);

  const shortcuts = useMemo(
    () => [
      { keys: ['arrowright'], handler: handleRightArrow },
      { keys: ['arrowleft'], handler: handleLeftArrow },
      { keys: ['p'], handler: togglePresenterMode },
      { keys: [' '], handler: toggle },
      {
        keys: ['r'],
        handler: () => {
          triggerReset();
        }
      },
      { keys: ['1'], handler: () => setCurrentSection(0) },
      { keys: ['2'], handler: () => setCurrentSection(1) },
      { keys: ['3'], handler: () => setCurrentSection(2) },
      { keys: ['4'], handler: () => setCurrentSection(3) },
      { keys: ['5'], handler: () => setCurrentSection(4) },
      { keys: ['6'], handler: () => setCurrentSection(5) },
      { keys: ['7'], handler: () => setCurrentSection(6) },
      { keys: ['h'], handler: () => setShowHeader(prev => !prev) }
    ],
    [handleRightArrow, handleLeftArrow, togglePresenterMode, toggle, triggerReset, setCurrentSection]
  );

  useKeyboardShortcuts(shortcuts);

  const handleExportResources = () => {
    const popup = window.open('', '_blank');
    if (!popup) return;
    popup.document.write(`<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>FinOps Resources</title>`);
    popup.document.write(
      '<style>body{font-family:Segoe UI, sans-serif; padding:32px; max-width:720px; margin:auto;} h1{color:#2053a7;} ul{line-height:1.6;}</style>'
    );
    popup.document.write('<h1>Resources • COE-5024 AI Finance Training</h1>');
    popup.document.write('<h2>Sections</h2><ol>');
    configuredSections.forEach((section, index) => {
      popup.document.write(`<li><strong>${index + 1}. ${section.title}</strong> — ${section.subtitle ?? ''}</li>`);
    });
    popup.document.write('</ol>');
    popup.document.write(
      '<h2>Materials</h2><ul><li>Project README: projects/1_Active/COE-5024_AI_Finance_Training_Series_PDF_Excel_SAP/README.md</li><li>Session Script: projects/1_Active/COE-5024_AI_Finance_Training_Series_PDF_Excel_SAP/PRESENTER_SCRIPT_SESSION1.md</li><li>Final Checklist: projects/1_Active/COE-5024_AI_Finance_Training_Series_PDF_Excel_SAP/SESSION1_FINAL_CHECKLIST.md</li><li>Guardrails: projects/1_Active/COE-5024_AI_Finance_Training_Series_PDF_Excel_SAP/PUBLICATION_GUARDRAILS.md</li></ul>'
    );
    popup.document.write('<script>window.print();</script></body></html>');
    popup.document.close();
  };

  const handleLoadData = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      loadCustomData(parsed);
    } catch (error) {
      console.error(error);
      window.alert('Could not read the file. Make sure it is valid JSON.');
    }
  };

  const handleClearData = () => clearCustomData();

  return (
    <div className="presentation-container flex h-screen flex-col bg-slate-50 text-slate-900 transition dark:bg-slate-950 dark:text-slate-100 overflow-hidden">
      <AnimatePresence>
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Header />
          </motion.div>
        )}
      </AnimatePresence>
      <main className="relative flex h-full justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Suspense
              fallback={
                <div className="mx-auto flex h-[60vh] w-full max-w-3xl items-center justify-center rounded-3xl border border-dashed border-brand-300 bg-white/30 text-sm text-brand-500 dark:border-brand-400/40 dark:bg-slate-900/30">
                  Loading the experience...
                </div>
              }
            >
              <SectionComponent resetSignal={resetSignal} isPaused={!isRunning} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
      <AnimatePresence>
        {presenterMode && <PresenterNotesPanel key="notes" notes={currentSection.presenterNotes} />}
      </AnimatePresence>
    </div>
  );
};

const IntroductionPage = () => (
  <PresentationProvider sections={sections}>
    <PresentationContainer />
  </PresentationProvider>
);

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/introduction" element={<IntroductionPage />} />
      <Route path="/use-case" element={<UseCasePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
