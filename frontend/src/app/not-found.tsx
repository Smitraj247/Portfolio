import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
      <section className="max-w-lg">
        <p className="mb-3 font-mono text-sm text-brand-400">404 · Page not found</p>
        <h1 className="text-3xl font-bold">This page doesn’t exist.</h1>
        <p className="mt-4 text-slate-400">The link may be outdated, or the page may have moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-lg bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-600">Back to portfolio</Link>
      </section>
    </main>
  );
}
