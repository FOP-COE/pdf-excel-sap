import { saveToStorage, loadFromStorage } from './storage';

export interface AnalyticsSnapshot {
  sectionVisits: Record<string, number>;
  totalTimeSeconds: number;
  lastUpdated: number;
}

const STORAGE_KEY = 'coe-workshop-analytics';

const defaultSnapshot: AnalyticsSnapshot = {
  sectionVisits: {},
  totalTimeSeconds: 0,
  lastUpdated: Date.now()
};

export function trackSectionVisit(sectionId: string): AnalyticsSnapshot {
  const snapshot = loadFromStorage(STORAGE_KEY, defaultSnapshot);
  snapshot.sectionVisits[sectionId] = (snapshot.sectionVisits[sectionId] ?? 0) + 1;
  snapshot.lastUpdated = Date.now();
  saveToStorage(STORAGE_KEY, snapshot);
  return snapshot;
}

export function trackTimeSpent(seconds: number): AnalyticsSnapshot {
  const snapshot = loadFromStorage(STORAGE_KEY, defaultSnapshot);
  snapshot.totalTimeSeconds += seconds;
  snapshot.lastUpdated = Date.now();
  saveToStorage(STORAGE_KEY, snapshot);
  return snapshot;
}

export function getAnalytics(): AnalyticsSnapshot {
  return loadFromStorage(STORAGE_KEY, defaultSnapshot);
}
