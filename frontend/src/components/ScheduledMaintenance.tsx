"use client";

import { MAINTENANCE_MESSAGE } from "@/lib/api";

export default function ScheduledMaintenance() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0e0d] px-6 py-16 text-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.07),transparent_43%)]" />
      <section className="maintenance-content relative w-full max-w-2xl">
        <div className="maintenance-icon mx-auto mb-10 grid h-[100px] w-[100px] place-items-center rounded-[21px] border border-brand-400/25 bg-brand-400/[0.09] text-brand-300" aria-hidden="true">
          <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24.3 7.3a8.2 8.2 0 0 0 8.4 10.8L19.2 31.6a3.3 3.3 0 0 1-4.7-4.7L28 13.4a8.2 8.2 0 0 0 2.1-9.1l-4.6 4.6-4.1-1.1-1.1-4.1 4-4" transform="translate(-2 3)" />
            <path d="m8.1 6.2 5.2 1.4 1.4 5.2-2.8 2.8-7-7a2 2 0 0 1 0-2.8l.4-.4a2 2 0 0 1 2.8 0Z" />
            <path d="m23.5 23.5 7.8 7.8a2.4 2.4 0 0 1-3.4 3.4l-7.8-7.8" />
          </svg>
        </div>
        <p className="maintenance-copy maintenance-copy-1 font-mono text-sm font-bold uppercase tracking-[0.34em] text-brand-300">Scheduled Maintenance</p>
        <h1 className="maintenance-copy maintenance-copy-2 mx-auto mt-7 max-w-xl text-4xl font-bold leading-[1.2] tracking-tight sm:text-[42px]">We&apos;re currently<br className="hidden sm:block" /> performing maintenance.</h1>
        <p className="maintenance-copy maintenance-copy-3 mx-auto mt-7 max-w-[610px] text-lg leading-8 text-slate-400">{MAINTENANCE_MESSAGE.replace("We're currently performing maintenance. ", "")}</p>
        <div className="maintenance-copy maintenance-copy-4 mx-auto mt-10 h-px w-[60px] bg-brand-400/50" />
        <div className="maintenance-copy maintenance-copy-4 mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => window.location.reload()} className="rounded-lg border border-brand-400/40 px-5 py-2.5 text-sm font-semibold text-brand-300 transition hover:bg-brand-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300">
            Try again
          </button>
          <a href="mailto:smitrajsinhmakvana@gmail.com" className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-brand-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300">
            Contact support
          </a>
        </div>
      </section>
    </main>
  );
}
