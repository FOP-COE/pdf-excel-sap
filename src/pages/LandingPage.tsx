import { ArrowRight, CheckCircle2, Rocket, Table, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="font-amadeus text-lg font-bold text-slate-900">AI Finance Training Series</div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#sessions" className="hover:text-slate-900">Sessions</a>
            <a href="#resources" className="hover:text-slate-900">Resources</a>
          </nav>
        </div>
      </header>

      <section className="bg-[linear-gradient(135deg,#000835_0%,#1e1b4b_50%,#5b21b6_100%)] py-20 text-white md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <p className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            AI for CFA Training
          </p>
          <h1 className="font-amadeus text-4xl font-bold md:text-6xl">PDF into Excel into SAP</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-100/90">
            Hands-on training to transform unstructured invoice PDFs into structured finance data ready for controlled SAP handoff.
          </p>
          <p className="mx-auto mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100/90">
            Learn. Practice. Automate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/introduction" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100">
              Start Introduction
            </Link>
            <Link to="/use-case" className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Open Use Case
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-center font-amadeus text-3xl font-bold text-slate-900">AI for CFA: Why This Hub</h2>
          <p className="mx-auto mt-4 max-w-4xl text-center text-slate-600">
            Join our AI Finance Training Series to build AI knowledge, explore practical use cases, and stay up to date with the latest developments across Finance.
          </p>
          <p className="mx-auto mt-2 max-w-4xl text-center text-sm font-semibold text-indigo-700">
            Training series window: 13 to 23 April
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Rocket className="mb-3 text-indigo-600" size={22} />
              <h3 className="font-semibold">Practical Focus</h3>
              <p className="mt-2 text-sm text-slate-600">Real finance scenario with realistic document flow and outputs.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Workflow className="mb-3 text-indigo-600" size={22} />
              <h3 className="font-semibold">Hands-On Build</h3>
              <p className="mt-2 text-sm text-slate-600">Live creation of the automation path from upload to structured table.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <CheckCircle2 className="mb-3 text-indigo-600" size={22} />
              <h3 className="font-semibold">Production Mindset</h3>
              <p className="mt-2 text-sm text-slate-600">Validation, exception handling, and quality gates included.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Table className="mb-3 text-indigo-600" size={22} />
              <h3 className="font-semibold">Data Readiness</h3>
              <p className="mt-2 text-sm text-slate-600">Output schema prepared for downstream reporting and SAP handoff.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="sessions" className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-center font-amadeus text-3xl font-bold text-slate-900">Course Structure</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">Two parts with clear separation between framing and implementation.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Part 01</p>
              <h3 className="mt-2 font-amadeus text-2xl font-bold">Introduction</h3>
              <p className="mt-2 text-sm text-slate-600">Business context, architecture, value proposition, and guided narrative.</p>
              <Link to="/introduction" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
                Open presentation <ArrowRight size={15} />
              </Link>
            </article>
            <article className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Part 02</p>
              <h3 className="mt-2 font-amadeus text-2xl font-bold">Use Case Workshop</h3>
              <p className="mt-2 text-sm text-slate-600">Step-by-step instructions for PDF extraction and Excel integration flow.</p>
              <Link to="/use-case" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                Start use case <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section id="resources" className="bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-center font-amadeus text-3xl font-bold text-slate-900">Resources</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">AI for CFA and Amadeus AI Ecosystem</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://amadeusworkplace.sharepoint.com/sites/CFA_official/SitePages/AIforCFA.aspx" target="_blank" rel="noreferrer">🏠 AI for CFA</a></li>
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://amadeusworkplace.sharepoint.com/sites/CFA_official/SitePages/AI-for-CFA-Hackathon.aspx?csf=1&web=1&e=1I9gbS&CID=798d5b40-ec6e-418c-8ad1-17e013619b52" target="_blank" rel="noreferrer">🚀 AI for CFA Hackathon</a></li>
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://amadeusworkplace.sharepoint.com/sites/AIHub_official" target="_blank" rel="noreferrer">🤖 Amadeus' AI Hub</a></li>
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://amadeusworkplace.sharepoint.com/sites/DWS_GenAI_official" target="_blank" rel="noreferrer">🧠 Copilot Smart Station</a></li>
              </ul>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">Learning and Enablement</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://adoption.microsoft.com/en-us/scenario-library/finance/" target="_blank" rel="noreferrer">💼 Using Copilot in Finance</a></li>
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://amadeusworkplace.sharepoint.com/sites/DWS_GenAI_official/SitePages/CopilotforMicrosoft365.aspx" target="_blank" rel="noreferrer">🔑 Request a Copilot license</a></li>
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://amadeusworkplace.sharepoint.com/sites/DigitalWorkplaceUserCenter_official/SitePages/Digital-Workplace-Academy.aspx" target="_blank" rel="noreferrer">🎓 Digital Workplace Academy 2025</a></li>
                <li><a className="text-indigo-700 hover:text-indigo-900 hover:underline" href="https://learning.cloud.microsoft/home/providers" target="_blank" rel="noreferrer">📚 Viva Learning</a></li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
