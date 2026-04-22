import { ComponentType } from 'react';

export type SectionId = 'cover' | 'agenda' | 'reality' | 'momentum' | 'intro' | 'flowbuilder' | 'advanced';

export interface SectionProps {
  resetSignal: number;
  isPaused: boolean;
}

export interface SectionConfig {
  id: SectionId;
  title: string;
  subtitle?: string;
  durationMinutes: number;
  presenterNotes: string[];
  analyticsKey: string;
  component: ComponentType<SectionProps>;
}

export interface CustomDataSource {
  testimonials?: Testimonial[];
  successStories?: SuccessStory[];
  roiDefaults?: {
    approvalsPerWeek?: number;
    minutesPerApproval?: number;
    hourlyRate?: number;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface SuccessStory {
  company: string;
  metric: string;
  description: string;
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  lostMinutes: number;
}

export interface ConnectorCategory {
  id: string;
  name: string;
  description: string;
  connectors: string[];
}

export interface LivePollOption {
  id: string;
  label: string;
  votes: number;
}
