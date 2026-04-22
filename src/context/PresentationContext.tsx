import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CustomDataSource, SectionConfig } from '@/types';
import { loadFromStorage, saveToStorage } from '@/utils/storage';

interface PersistedState {
  currentSectionIndex: number;
  presenterMode: boolean;
  customData?: CustomDataSource;
}

const STORAGE_KEY = 'coe-workshop-state';

interface PresentationContextValue {
  sections: SectionConfig[];
  currentSectionIndex: number;
  setCurrentSection: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  presenterMode: boolean;
  togglePresenterMode: () => void;
  customData: CustomDataSource | null;
  loadCustomData: (data: CustomDataSource) => void;
  clearCustomData: () => void;
  resetSignal: number;
  triggerReset: () => void;
  stepMode: boolean;
  toggleStepMode: () => void;
  stepSignal: number;
  nextStep: () => void;
  previousStep: () => void;
  isFirstStep: boolean;
  setIsFirstStep: (isFirst: boolean) => void;
  isLastStep: boolean;
  setIsLastStep: (isLast: boolean) => void;
  requestJumpToLast: () => void;
  consumeJumpToLast: () => boolean;
}

export const PresentationContext = createContext<PresentationContextValue | undefined>(undefined);

interface Props {
  sections: SectionConfig[];
  children: React.ReactNode;
}

export const PresentationProvider = ({ sections, children }: Props) => {
  const persisted = useMemo<PersistedState>(() => loadFromStorage(STORAGE_KEY, {
    currentSectionIndex: 0,
    presenterMode: false
  }), []);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(
    Math.min(persisted.currentSectionIndex ?? 0, sections.length - 1)
  );
  const [presenterMode, setPresenterMode] = useState<boolean>(persisted.presenterMode ?? false);
  const [customData, setCustomData] = useState<CustomDataSource | null>(persisted.customData ?? null);
  const [resetSignal, setResetSignal] = useState(0);
  const [stepMode, setStepMode] = useState(false);
  const [stepSignal, setStepSignal] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const _pendingJumpToLast = useRef(false);
  const requestJumpToLast = () => { _pendingJumpToLast.current = true; };
  const consumeJumpToLast = () => {
    const v = _pendingJumpToLast.current;
    _pendingJumpToLast.current = false;
    return v;
  };

  useEffect(() => {
    const state: PersistedState = {
      currentSectionIndex,
      presenterMode,
      customData: customData ?? undefined
    };
    saveToStorage(STORAGE_KEY, state);
  }, [currentSectionIndex, presenterMode, customData]);

  const setCurrentSection = (index: number) => {
    setCurrentSectionIndex((prev) => {
      if (index < 0 || index >= sections.length) return prev;
      return index;
    });
  };

  const goToNext = () => setCurrentSection(currentSectionIndex + 1);
  const goToPrevious = () => setCurrentSection(currentSectionIndex - 1);
  const togglePresenterMode = () => setPresenterMode((prev) => !prev);
  const loadCustomData = (data: CustomDataSource) => setCustomData(data);
  const clearCustomData = () => setCustomData(null);
  const triggerReset = () => setResetSignal((prev) => prev + 1);
  const toggleStepMode = () => setStepMode((prev) => !prev);
  const nextStep = () => setStepSignal((prev) => prev + 1);
  const previousStep = () => setStepSignal((prev) => prev - 1);

  const value: PresentationContextValue = {
    sections,
    currentSectionIndex,
    setCurrentSection,
    goToNext,
    goToPrevious,
    presenterMode,
    togglePresenterMode,
    customData,
    loadCustomData,
    clearCustomData,
    resetSignal,
    triggerReset,
    stepMode,
    toggleStepMode,
    stepSignal,
    nextStep,
    previousStep,
    isFirstStep,
    setIsFirstStep,
    isLastStep,
    setIsLastStep,
    requestJumpToLast,
    consumeJumpToLast
  };

  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>;
};

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (!context) throw new Error('usePresentation debe usarse dentro de PresentationProvider');
  return context;
};
