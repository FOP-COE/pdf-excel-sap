import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Database,
  Download,
  Expand,
  FileText,
  ListChecks,
  MoveRight,
  PlayCircle,
  Settings,
  Trash2,
  Workflow
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const useCaseScreenshot = (fileName: string, caption: string) => ({
  src: `/images/screenshots/use-case/${encodeURIComponent(fileName)}`,
  caption
});

const workshopSteps = [
  {
    id: 'step-1',
    title: 'Access Power Automate and Navigate to AI Hub',
    objective: 'Start from the personal environment and reach the invoice extraction model.',
    actions: [
      'Open make.powerautomate.com in your browser.',
      'Select your personal environment from the environment selector (top right).',
      'In the left sidebar, click AI Hub > AI Models.',
      'Locate and click Extract information from invoices.'
    ],
    criticalNote: null,
    screenshots: [
      useCaseScreenshot('1.1.png', 'Power Automate landing page and environment selector.'),
      useCaseScreenshot('1.2.png', 'AI Hub navigation from the left sidebar.'),
      useCaseScreenshot('1.3.png', 'Extract information from invoices model in AI Models.')
    ]
  },
  {
    id: 'step-2',
    title: 'Select Prebuilt Model and Use It in a Flow',
    objective: 'Bootstrap the flow from the prebuilt invoice model without training a custom one.',
    actions: [
      'Choose Use prebuilt model (not Create custom model).',
      'Click Use in a flow — a new tab opens with a pre-scaffolded template.',
      'Click Continue when prompted and connect your accounts.'
    ],
    criticalNote: 'Prebuilt model gets you to value fast. Custom model training comes later when accuracy needs tuning.',
    screenshots: [
      useCaseScreenshot('2.1.png', 'Use prebuilt model option selected.'),
      useCaseScreenshot('2.2.png', 'Use it in a flow button launching the template.'),
      useCaseScreenshot('2.3.png', 'Template scaffold after connecting accounts.')
    ]
  },
  {
    id: 'step-3',
    title: 'Remove Template Actions and Replace Trigger',
    objective: 'Clean the template down to the essential steps and set the OneDrive trigger.',
    actions: [
      'Delete the 3 template actions: Create HTML table, Get my profile (V2), Send an email (V2).',
      'Delete the existing trigger: Manually trigger a flow.',
      'Add new trigger: When a file is created (properties only) — OneDrive for Business.',
      'Set the Folder to: /Desktop/CFA AI Trainings/1_Invoices Input'
    ],
    criticalNote: null,
    screenshots: [
      useCaseScreenshot('3.1.png', 'Template with default actions still present.'),
      useCaseScreenshot('3.2.png', 'Deleting the unnecessary template actions.'),
      useCaseScreenshot('3.3.png', 'Manual trigger removed and OneDrive trigger added.'),
      useCaseScreenshot('3.4.png', 'OneDrive trigger configured with the input folder path.')
    ]
  },
  {
    id: 'step-4',
    title: 'Insert Action: Get File Content',
    objective: 'Ensure AI Builder receives the actual PDF binary — not just metadata from the trigger.',
    actions: [
      'Click the + between the trigger and AI Builder to insert a new action.',
      'Search for and select Get file content (OneDrive for Business).',
      'Map the File parameter using Dynamic content from the trigger — select Identifier (not the file name).'
    ],
    criticalNote: 'This step is mandatory. Without it, AI Builder throws InvalidPredictionInput because it receives object metadata instead of PDF binary content.',
    screenshots: [
      useCaseScreenshot('4.1.png', 'Get file content inserted with Identifier mapped from the trigger.')
    ]
  },
  {
    id: 'step-5',
    title: 'Prepare the Excel File and Map the Insert Row Action',
    objective: 'Configure the Excel workbook in macro-compatible format and map all invoice fields into the table.',
    actions: [
      'Open your InvoiceTracker Excel template and save it as .xlsb or .xlsm (required for SAP macro).',
      'Add action: Add a row into a table (Excel Online - Business).',
      'Select the OneDrive workbook and the InvoiceTracker table.',
      'Map all invoice columns from AI Builder dynamic content: InvoiceNumber, InvoiceDate, DueDate, Supplier, SupplierVAT, Customer, Currency, NetAmount, VATAmount, TotalAmount.',
      'Map FileName using the Name dynamic content from the trigger.',
      'Map ProcessingDate using the expression: utcNow()',
      'Leave PaymentTerm and CustomerName BLANK — the SAP ExtrData() macro fills these from the CustomerID.'
    ],
    criticalNote: 'XLSB or XLSM is required. The SAP ExtrData() VBA macro cannot run from a standard .xlsx file.',
    screenshots: [
      useCaseScreenshot('5.1.png', 'InvoiceTracker workbook with the structured table.'),
      useCaseScreenshot('5.2.png', 'Add a row into a table action added to the flow.'),
      useCaseScreenshot('5.3.png', 'Workbook and table selected in the Excel connector.'),
      useCaseScreenshot('5.4.png', 'Invoice fields being mapped from AI Builder dynamic content.'),
      useCaseScreenshot('5.5.png', 'FileName and ProcessingDate mapped, PaymentTerm and CustomerName left blank.'),
      useCaseScreenshot('5.6.png', 'Final state of the Add row action fully configured.')
    ]
  },
  {
    id: 'step-6',
    title: 'Insert Action: Move File to Processed Folder',
    objective: 'Archive each processed invoice so it is not reprocessed by the trigger on the next run.',
    actions: [
      'Add action: Move or rename a file (OneDrive for Business).',
      'Set the File field using Dynamic content — select Identifier from the trigger.',
      'Set Destination File Path to:',
      "/Desktop/CFA AI Trainings/3_Processed Invoices/@{triggerOutputs()?['headers/x-ms-file-name-encoded']}_@{formatDateTime(utcNow(), 'yyyyMMdd_HHmmss')}"
    ],
    criticalNote: 'The destination path must include the filename — folder-only causes a runtime error. The timestamp suffix prevents duplicate file conflicts.',
    screenshots: [
      useCaseScreenshot('6.1.png', 'Move or rename action configured with encoded filename and timestamp expression.')
    ]
  },
  {
    id: 'step-7',
    title: 'Test the Flow Manually',
    objective: 'Save the flow and trigger it manually by uploading invoices to the input folder.',
    actions: [
      'Save the flow — wait for the green confirmation with no errors.',
      'Click Test > Manually.',
      'Copy your invoice PDF files into the OneDrive input folder: /Desktop/CFA AI Trainings/1_Invoices Input.',
      'If local sync is slow, upload directly via OneDrive web (onedrive.live.com).',
      'Monitor the run history — each action should show a green tick as it completes.'
    ],
    criticalNote: null,
    screenshots: [
      useCaseScreenshot('7.1.png', 'Flow saved with no errors and ready to test.'),
      useCaseScreenshot('7.2.png', 'Test > Manually selected.'),
      useCaseScreenshot('7.3.png', 'Invoice PDFs uploaded to the OneDrive input folder.'),
      useCaseScreenshot('7.4.png', 'Flow run history with each action showing a green tick.'),
      useCaseScreenshot('7.5.png', 'All actions completed successfully.')
    ]
  },
  {
    id: 'step-8',
    title: 'See the Results',
    objective: 'Confirm the Excel rows are populated in real time as each invoice is processed.',
    actions: [
      'Open the InvoiceTracker Excel workbook while the flow is running.',
      'Each processed invoice appears as a new row with all extracted fields.',
      'Check the Processed Invoices folder in OneDrive to confirm files have been moved.'
    ],
    criticalNote: null,
    screenshots: [
      useCaseScreenshot('8.1.png', 'Excel workbook with invoice rows populated in real time.'),
      useCaseScreenshot('8.2.png', 'Processed Invoices folder showing moved files after the flow run.')
    ]
  }
];

const mappingRows = [
  ['InvoiceNumber', 'Invoice number'],
  ['InvoiceDate', 'Invoice date'],
  ['DueDate', 'Due date'],
  ['Supplier', 'Supplier name'],
  ['SupplierVAT', 'Supplier tax ID'],
  ['Customer', 'Customer name'],
  ['Currency', 'Invoice currency'],
  ['NetAmount', 'Sub total'],
  ['VATAmount', 'Total tax'],
  ['TotalAmount', 'Invoice total'],
  ['FileName', 'File name (trigger)'],
  ['ProcessingDate', 'utcNow()']
];

const knownIssues = [
  {
    title: 'InvalidPredictionInput or Unable to identify the mimetype input',
    cause: 'AI Builder receives object metadata from the trigger instead of real PDF binary content.',
    fix: 'Insert Get file content immediately after the trigger. Map the File parameter with the Identifier/Id from dynamic content. Then map File content (not properties) into the Extract information from invoices action.'
  },
  {
    title: 'Move or rename file fails with a duplicate or conflict error',
    cause: 'Destination path is folder-only (no filename), OR a file with the same name already exists in the destination folder.',
    fix: 'Use this expression as destination: /Desktop/CFA AI Trainings/3_Processed Invoices/@{triggerOutputs()[\'body/Name\']}_@{formatDateTime(utcNow(), \'yyyyMMdd_HHmmss\')} — the timestamp suffix prevents all duplicate conflicts.'
  },
  {
    title: 'Excel row is created but all values appear empty',
    cause: 'The table was selected but columns were not explicitly mapped in Add a row into a table.',
    fix: 'Map every required column using AI Builder dynamic content. ProcessingDate must use utcNow() as a manual expression, not a dynamic content field.'
  },
  {
    title: 'Flow does not trigger when files are dropped locally into OneDrive folder',
    cause: 'OneDrive desktop client sync delay means the cloud trigger does not fire in real time.',
    fix: 'Upload files directly via OneDrive web (onedrive.live.com). The trigger fires reliably from web uploads without waiting for local sync.'
  }
];

const finalFlow = [
  'When a file is created (properties only) — OneDrive for Business, folder: /1_Invoices Input',
  'Get file content — File: Identifier from trigger',
  'Extract information from invoices (AI Builder) — Invoice file: File content',
  'Add a row into a table (Excel Online XLSB) — all columns mapped, PaymentTerm + CustomerName left blank for SAP',
  'Move or rename a file — Destination: /3_Processed Invoices/@{body/Name}_@{formatDateTime(utcNow(),\'yyyyMMdd_HHmmss\')}'
];

export const UseCasePage = () => {
  const [activeScreenshots, setActiveScreenshots] = useState<Record<string, number>>({});
  const [lightboxStepId, setLightboxStepId] = useState<string | null>(null);
  const [activeStepId, setActiveStepId] = useState(workshopSteps[0]?.id ?? null);

  const getScreenshotIndex = (stepId: string, total: number) => {
    const index = activeScreenshots[stepId] ?? 0;
    return Math.min(index, Math.max(total - 1, 0));
  };

  const moveScreenshot = (stepId: string, total: number, direction: number) => {
    setActiveScreenshots((current) => {
      const currentIndex = current[stepId] ?? 0;
      const nextIndex = (currentIndex + direction + total) % total;

      return {
        ...current,
        [stepId]: nextIndex
      };
    });
  };

  const selectScreenshot = (stepId: string, index: number) => {
    setActiveScreenshots((current) => ({
      ...current,
      [stepId]: index
    }));
  };

  const activeLightboxStep = lightboxStepId ? workshopSteps.find((step) => step.id === lightboxStepId) : null;
  const activeLightboxIndex = activeLightboxStep ? getScreenshotIndex(activeLightboxStep.id, activeLightboxStep.screenshots.length) : 0;
  const activeLightboxShot = activeLightboxStep ? activeLightboxStep.screenshots[activeLightboxIndex] : null;
  const stepIds = useMemo(() => workshopSteps.map((step) => step.id), []);

  const exportStepsPdf = () => {
    const popup = window.open('', '_blank');
    if (!popup) {
      return;
    }

    const toAbsoluteImageUrl = (src: string) => {
      const normalized = src.startsWith('/') ? src.slice(1) : src;
      return new URL(`${import.meta.env.BASE_URL}${normalized}`, window.location.origin).toString();
    };

    const stepPages = workshopSteps
      .map((step, index) => {
        const mainShot = step.screenshots[0];
        const imageHtml = mainShot
          ? `<img class="shot" src="${toAbsoluteImageUrl(mainShot.src)}" alt="${mainShot.caption}" />
             <p class="caption">${mainShot.caption}</p>`
          : '';

        const actionsHtml = step.actions.map((action) => `<li>${action}</li>`).join('');

        return `
          <section class="pdf-step">
            <div class="badge">Step ${index + 1}</div>
            <h2>${step.title}</h2>
            <p class="objective"><strong>Objective:</strong> ${step.objective}</p>
            <ul>${actionsHtml}</ul>
            ${step.criticalNote ? `<p class="note"><strong>Important:</strong> ${step.criticalNote}</p>` : ''}
            ${imageHtml}
          </section>
        `;
      })
      .join('');

    popup.document.write(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>COE-5024 Workshop Steps PDF</title>
    <style>
      @page { size: A4 portrait; margin: 14mm; }
      * { box-sizing: border-box; }
      body { font-family: "Segoe UI", Arial, sans-serif; color: #0f172a; margin: 0; }
      .pdf-step { page-break-after: always; break-after: page; min-height: 255mm; }
      .pdf-step:last-child { page-break-after: auto; break-after: auto; }
      .badge { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #3730a3; margin-bottom: 8px; }
      h2 { font-size: 22px; line-height: 1.2; margin: 0 0 12px; color: #0b132b; }
      .objective { margin: 0 0 10px; font-size: 14px; line-height: 1.4; }
      ul { margin: 0 0 12px 18px; padding: 0; font-size: 13px; line-height: 1.45; }
      li { margin: 0 0 6px; }
      .note { margin: 8px 0 10px; padding: 8px 10px; border: 1px solid #fcd34d; background: #fffbeb; border-radius: 8px; font-size: 12px; line-height: 1.35; }
      .shot { width: 100%; max-height: 145mm; object-fit: contain; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; }
      .caption { margin: 6px 0 0; font-size: 11px; color: #475569; }
    </style>
  </head>
  <body>
    ${stepPages}
    <script>window.print();</script>
  </body>
</html>`);
    popup.document.close();
  };

  const scrollToStep = (stepId: string) => {
    const target = document.getElementById(stepId);
    if (!target) {
      return;
    }

    // Keep step cards aligned with the same visual top zone as the sticky sidebar.
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
    setActiveStepId(stepId);
    window.history.replaceState(null, '', `#${stepId}`);
  };

  useEffect(() => {
    if (!lightboxStepId) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxStepId(null);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [lightboxStepId]);

  useEffect(() => {
    if (!stepIds.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveStepId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-110px 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8]
      }
    );

    stepIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [stepIds]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
            <ArrowLeft size={16} /> Back to landing
          </Link>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Part 2 - Use Case</div>
        </div>
      </header>

      <section className="bg-[linear-gradient(135deg,#000835_0%,#1e1b4b_55%,#5b21b6_100%)] py-16 text-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h1 className="font-amadeus text-4xl font-bold md:text-5xl">Session Guide: PDF into Excel into SAP</h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Build a real Power Automate flow using the invoice prebuilt model: PDF upload, AI extraction, Excel persistence, and optional enterprise controls.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={exportStepsPdf}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <Download size={16} /> Export PDF (1 page per step)
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1"><Clock3 size={14} /> 40 min live build</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1"><Settings size={14} /> Intermediate level</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1"><Workflow size={14} /> Hands-on flow</span>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-indigo-100 p-2 text-indigo-700"><ListChecks size={18} /></div>
            <h2 className="font-semibold">Prerequisites</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Power Automate access</li>
              <li>AI Builder entitlement</li>
              <li>SharePoint/OneDrive folder prepared</li>
              <li>InvoiceTracker.xlsx template</li>
            </ul>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-indigo-100 p-2 text-indigo-700"><FileText size={18} /></div>
            <h2 className="font-semibold">Expected Inputs</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>3-5 synthetic invoice PDFs</li>
              <li>AI Hub prebuilt invoice model</li>
              <li>Excel table created in OneDrive/SharePoint</li>
              <li>Processed and Error folders prepared</li>
            </ul>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 inline-flex rounded-lg bg-indigo-100 p-2 text-indigo-700"><Database size={18} /></div>
            <h2 className="font-semibold">Expected Output</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>One validated row per invoice</li>
              <li>Auditable extraction values</li>
              <li>Optional exception branch</li>
              <li>SAP script handoff ready for demo</li>
            </ul>
          </article>
        </section>

        <section className="mt-10">
          <h2 className="font-amadeus text-3xl font-bold text-slate-900">Workshop Playbook (Sidebar + Multi-Screenshot)</h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-4 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Workshop Steps</p>
              <nav className="mt-3 grid gap-2">
                {workshopSteps.map((step, index) => (
                  <a
                    key={step.id}
                    href={`#${step.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToStep(step.id);
                    }}
                    aria-current={activeStepId === step.id ? 'step' : undefined}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      activeStepId === step.id
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-800'
                        : 'border-transparent bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700'
                    }`}
                  >
                    <span className={`font-semibold ${activeStepId === step.id ? 'text-indigo-800' : 'text-indigo-600'}`}>{index + 1}.</span> {step.title}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="grid gap-5">
              {workshopSteps.map((step, index) => (
                <article
                  id={step.id}
                  key={step.id}
                  className={`scroll-mt-28 rounded-xl border bg-white p-5 shadow-sm transition ${
                    activeStepId === step.id ? 'border-indigo-200' : 'border-slate-200'
                  }`}
                >
                  {(() => {
                    const activeIndex = getScreenshotIndex(step.id, step.screenshots.length);
                    const activeShot = step.screenshots[activeIndex];

                    return (
                      <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Step {index + 1}</p>
                  <h3 className="mt-1 font-amadeus text-2xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-700">Objective: {step.objective}</p>

                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {step.actions.map((action) => (
                      <li key={action} className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>

                  {step.criticalNote && (
                    <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
                      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-700" />
                      <p className="text-sm font-medium text-amber-900">{step.criticalNote}</p>
                    </div>
                  )}

                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3 md:p-4">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Screenshot {activeIndex + 1} of {step.screenshots.length}</p>
                      </div>
                      {step.screenshots.length > 1 ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => moveScreenshot(step.id, step.screenshots.length, -1)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                            aria-label={`Previous screenshot for ${step.title}`}
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveScreenshot(step.id, step.screenshots.length, 1)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                            aria-label={`Next screenshot for ${step.title}`}
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      ) : null}
                    </div>

                    <figure className="mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                      <img
                        src={activeShot.src}
                        alt={activeShot.caption}
                        className="max-h-[44rem] w-full rounded-lg border border-slate-200 bg-white object-contain"
                        loading="lazy"
                      />
                      <div className="mt-3 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => setLightboxStepId(step.id)}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                          aria-label={`Open screenshot ${activeIndex + 1} in large popup for ${step.title}`}
                        >
                          <Expand size={14} /> View large
                        </button>
                      </div>
                      <figcaption className="mt-3 text-sm text-slate-600">{activeShot.caption}</figcaption>
                    </figure>

                    {step.screenshots.length > 1 ? (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {step.screenshots.map((shot, shotIndex) => (
                          <button
                            key={shot.src}
                            type="button"
                            onClick={() => selectScreenshot(step.id, shotIndex)}
                            className={`inline-flex min-w-10 items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold transition ${
                              shotIndex === activeIndex
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-300 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700'
                            }`}
                            aria-label={`Go to screenshot ${shotIndex + 1} for ${step.title}`}
                          >
                            {shotIndex + 1}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                      </>
                    );
                  })()}
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-amadeus text-xl font-semibold text-slate-900">Excel Column Mapping</h3>
            <p className="mt-1 text-sm text-slate-500">Every column must be explicitly mapped — an unmapped field stays empty even if the flow succeeds.</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Column</th>
                    <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Dynamic Content / Expression</th>
                  </tr>
                </thead>
                <tbody>
                  {mappingRows.map(([column, value]) => (
                    <tr key={column} className="border-b border-slate-100">
                      <td className="py-2 pr-4 font-medium text-slate-800">{column}</td>
                      <td className="py-2 text-slate-500">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex flex-col gap-6">
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-amadeus text-xl font-semibold text-slate-900">Flow Actions (in order)</h3>
              <ol className="mt-4 space-y-3">
                {finalFlow.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="inline-flex items-center gap-2 font-amadeus text-xl font-semibold text-amber-900">
                <AlertTriangle size={18} /> Known Issues &amp; Fixes
              </h3>
              <div className="mt-4 space-y-3">
                {knownIssues.map((issue) => (
                  <div key={issue.title} className="rounded-lg border border-amber-100 bg-white p-3">
                    <p className="text-sm font-semibold text-slate-900">{issue.title}</p>
                    <p className="mt-1 text-xs text-slate-600"><span className="font-semibold">Cause:</span> {issue.cause}</p>
                    <p className="mt-0.5 text-xs text-slate-600"><span className="font-semibold">Fix:</span> {issue.fix}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="mt-10 rounded-xl bg-[linear-gradient(135deg,#000835_0%,#1e1b4b_55%,#5b21b6_100%)] p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">Workshop Outcome</p>
              <h3 className="mt-2 font-amadeus text-2xl font-bold">A working flow. Built live. Ready to evolve.</h3>
              <p className="mt-3 max-w-xl text-sm text-slate-300">
                You leave with a real, repeatable automation: PDF in, data out, file archived. No simulation — this ran on your actual OneDrive and Excel during this session. Next steps: model accuracy tuning, approval gates, and SAP write-back.
              </p>
            </div>
            <Link
              to="/introduction"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <PlayCircle size={16} /> Back to slides
            </Link>
          </div>
        </section>
      </main>

      {activeLightboxStep && activeLightboxShot ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          onClick={() => setLightboxStepId(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-7xl rounded-xl border border-slate-200 bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Large screenshot view for ${activeLightboxStep.title}`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{activeLightboxStep.title}</p>
                <p className="text-xs text-slate-500">Screenshot {activeLightboxIndex + 1} of {activeLightboxStep.screenshots.length}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxStepId(null)}
                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Close
              </button>
            </div>

            <div className="relative">
              <img
                src={activeLightboxShot.src}
                alt={activeLightboxShot.caption}
                className="max-h-[82vh] w-full rounded-lg border border-slate-200 bg-white object-contain"
              />

              {activeLightboxStep.screenshots.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => moveScreenshot(activeLightboxStep.id, activeLightboxStep.screenshots.length, -1)}
                    className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                    aria-label={`Previous screenshot for ${activeLightboxStep.title}`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveScreenshot(activeLightboxStep.id, activeLightboxStep.screenshots.length, 1)}
                    className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                    aria-label={`Next screenshot for ${activeLightboxStep.title}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              ) : null}
            </div>

            <p className="mt-3 text-sm text-slate-600">{activeLightboxShot.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
