import { ConnectorCategory, LivePollOption, PainPoint, SuccessStory, Testimonial } from '@/types';

export const defaultTestimonials: Testimonial[] = [
  {
    name: 'Isabel Martín',
    role: 'Finance Controller, Amadeus',
    quote:
      'Power Automate nos liberó horas críticas para análisis financiero. Pasamos de copiar datos a impulsar decisiones.'
  },
  {
    name: 'Carlos Sousa',
    role: 'Process Lead, Amadeus',
    quote: 'La automatización eliminó el 90% de nuestros errores de reconciliación en menos de un mes.'
  },
  {
    name: 'María González',
    role: 'Head of Shared Services, Amadeus',
    quote:
      'Logramos escalar un flujo global en dos semanas, sin apoyo de TI central. El CoE nos acompañó en cada paso.'
  }
];

export const painPoints: PainPoint[] = [
  {
    id: 'excel-copy',
    title: 'Excel → Copiar & Pegar',
    description:
      'Consolidar tabs y hojas consume hasta 45 minutos por proceso, con riesgo alto de errores manuales.',
    lostMinutes: 45
  },
  {
    id: 'email-wait',
    title: 'Correos de ida y vuelta',
    description: 'Seguimiento manual de aprobaciones con tiempos de espera promedio de 2,3 horas.',
    lostMinutes: 138
  },
  {
    id: 'sap-update',
    title: 'Actualización en SAP',
    description: 'Entrada manual en SAP con validaciones duplicadas y 1 de cada 8 registros rechazados.',
    lostMinutes: 60
  }
];

export const successStories: SuccessStory[] = [
  {
    company: 'Empresa X',
    metric: '70% menos tiempo por aprobación',
    description: 'Automatización de aprobaciones financieras multi-país con Power Automate y Teams.'
  },
  {
    company: 'Empresa Y',
    metric: '0 errores en 10.000 transacciones',
    description: 'Integración Excel + SharePoint con validaciones automáticas de datos críticos.'
  },
  {
    company: 'Empresa Z',
    metric: 'ROI 248% en el primer año',
    description: 'Automatización end-to-end de reporting con Power BI y Power Automate.'
  }
];

export const connectorCategories: ConnectorCategory[] = [
  {
    id: 'communication',
    name: 'Comunicación',
    description: 'Mantén a Finance conectado con las áreas clave.',
    connectors: ['Outlook', 'Teams', 'Adaptive Cards', 'Notifications', 'Slack']
  },
  {
    id: 'data',
    name: 'Datos',
    description: 'Sincroniza fuentes críticas sin copiar y pegar.',
    connectors: ['Excel', 'SharePoint', 'SQL Server', 'Dataverse', 'OneDrive']
  },
  {
    id: 'process',
    name: 'Procesos',
    description: 'Integra con sistemas core y aprueba más rápido.',
    connectors: ['SAP', 'Dynamics 365', 'Workday', 'ServiceNow', 'Salesforce']
  },
  {
    id: 'ai',
    name: 'AI & Insights',
    description: 'Agrega inteligencia sin complejidad.',
    connectors: ['AI Builder', 'Cognitive Services', 'Azure OpenAI', 'Power BI', 'Form Recognizer']
  }
];

export const livePollOptions: LivePollOption[] = [
  { id: 'approvals', label: 'Ciclos de aprobación lentos', votes: 32 },
  { id: 'data-sync', label: 'Sincronización de datos manual', votes: 27 },
  { id: 'reporting', label: 'Reportes recurrentes', votes: 21 },
  { id: 'compliance', label: 'Controles y compliance', votes: 18 }
];
