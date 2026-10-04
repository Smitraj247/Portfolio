"use client";

import "./globals.css";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
        <main className="max-w-lg">
          <p className="mb-3 font-mono text-sm text-sky-400">Application unavailable</p>
          <h1 className="text-3xl font-bold">We hit an unexpected error.</h1>
          <p className="mt-4 text-slate-400">Please try again or contact support if the problem continues.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="rounded-lg bg-sky-500 px-5 py-3 font-semibold text-white">Try again</button>
            <a href="mailto:smitrajsinhmakvana@gmail.com" className="rounded-lg border border-slate-700 px-5 py-3 font-semibold">Contact support</a>
          </div>
        </main>
      </body>
    </html>
  );
}
