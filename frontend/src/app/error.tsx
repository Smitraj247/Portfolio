"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
      <section className="max-w-lg">
        <p className="mb-3 font-mono text-sm text-brand-400">Something went wrong</p>
        <h1 className="text-3xl font-bold">We hit an unexpected error.</h1>
        <p className="mt-4 text-slate-400">Please try again. If the problem continues, get in touch for support.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="rounded-lg bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-600">Try again</button>
          <a href="mailto:smitrajsinhmakvana@gmail.com" className="rounded-lg border border-slate-700 px-5 py-3 font-semibold hover:border-brand-400">Contact support</a>
        </div>
      </section>
    </main>
  );
}
