import { lazy } from 'react';
import { SectionConfig } from '@/types';

const CoverSection = lazy(() => import('./CoverPage').then((module) => ({ default: module.CoverPage })));
const AgendaSection = lazy(() => import('./Agenda').then((module) => ({ default: module.Agenda })));
const RealitySection = lazy(() => import('./TheDailyReality').then((module) => ({ default: module.TheDailyReality })));
const MomentumSection = lazy(() => import('./AutomationMomentum').then((module) => ({ default: module.AutomationMomentum })));
const IntroSection = lazy(() => import('./PowerAutomateIntroNew').then((module) => ({ default: module.PowerAutomateIntroNew })));
const FlowBuilderSection = lazy(() => import('./FlowBuilder').then((module) => ({ default: module.FlowBuilder })));
const AdvancedSection = lazy(() => import('./AdvancedPowerAutomate').then((module) => ({ default: module.AdvancedPowerAutomate })));

export const sections: SectionConfig[] = [
  {
    id: 'cover',
    title: 'AI Finance Training Series',
    subtitle: 'COE-5024 - PDF into Excel into SAP',
    durationMinutes: 0,
    presenterNotes: [
      'Welcome attendees and set expectations for a practical finance session.',
      'Frame the session around one concrete scenario: invoice PDFs to structured data.',
      'Highlight the 10/40/10 format and what attendees will walk away with.'
    ],
    analyticsKey: 'section_cover',
    component: CoverSection
  },
  {
    id: 'agenda',
    title: 'Session Agenda',
    subtitle: '10 min context, 40 min live build, 10 min Q&A',
    durationMinutes: 2,
    presenterNotes: [
      'Present the one-hour structure and expected outcomes.',
      'Set audience expectation: build-first and reusable pattern.',
      'Mention fallback plan and dry-run SAP handoff scope.'
    ],
    analyticsKey: 'section_agenda',
    component: AgendaSection
  },
  {
    id: 'reality',
    title: 'Finance Automation Is Not Optional Anymore',
    subtitle: 'PDF-to-Excel handoffs and manual SAP bottlenecks.',
    durationMinutes: 8,
    presenterNotes: [
      'Frame the flow as PDF to Excel to SAP, independent of one specific document origin.',
      'Focus on manual work in the middle: extraction, validation, and handoff formatting.',
      'Quantify impact in cycle time, rework, and data quality.',
      'Position automation as structure-first, including script-based SAP follow-up tasks.'
    ],
    analyticsKey: 'section_reality',
    component: RealitySection
  },
  {
    id: 'momentum',
    title: 'Automation Momentum',
    subtitle: 'Why now: AI Builder + Power Automate in finance.',
    durationMinutes: 6,
    presenterNotes: [
      'Connect this session to previous CoE automation outcomes.',
      'Explain why document intelligence is the next logical step.',
      'Emphasize scalability with low-code governance.'
    ],
    analyticsKey: 'section_momentum',
    component: MomentumSection
  },
  {
    id: 'intro',
    title: 'Solution Blueprint',
    subtitle: 'PDF -> AI Builder -> Flow -> Excel -> SAP VBA enrichment',
    durationMinutes: 14,
    presenterNotes: [
      'Explain the architecture end-to-end with one invoice example.',
      'Clarify mandatory fields and target schema in Excel before SAP enrichment.',
      'Explain why we enrich from SAP instead of uploading invoices back to SAP.',
      'Set up the live build sequence before entering the tool demo.'
    ],
    analyticsKey: 'section_intro',
    component: IntroSection
  },
  {
    id: 'flowbuilder',
    title: 'Power Automate + AI Builder',
    subtitle: 'Why prebuilt invoice model now, and custom model later',
    durationMinutes: 20,
    presenterNotes: [
      'Explain what Power Automate is in plain business language.',
      'Explain AI Hub (AI Builder) as the built-in AI module for invoice extraction.',
      'Justify using the prebuilt model due to time and audience profile, while acknowledging custom training as a next phase.'
    ],
    analyticsKey: 'section_flowbuilder',
    component: FlowBuilderSection
  },
  {
    id: 'advanced',
    title: 'Setting Up for the Live Build',
    subtitle: 'SAP enrichment pattern, controls, and transition to walkthrough',
    durationMinutes: 10,
    presenterNotes: [
      'Explain the SAP VBA enrichment layer as read-only preparation, not production posting.',
      'Define safety boundaries, validation checks, and expected outputs before live build.',
      'Transition clearly to the use-case walkthrough and reserve final Q&A for closing.'
    ],
    analyticsKey: 'section_advanced',
    component: AdvancedSection
  }
];
