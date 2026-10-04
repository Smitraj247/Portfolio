import { ArrowUp, Mail } from "lucide-react";
import { memo } from "react";
import type { Portfolio } from "@/lib/types";
import { resumeDownloadUrl } from "@/lib/api";

type Props = { profile: Portfolio["profile"] };

const linkClass = "text-sm text-slate-400 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

function SiteFooter({ profile }: Props) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 pb-32 pt-12 text-slate-400 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-12">
          <div>
            <a href="#hero" aria-label={`${profile.name} portfolio home`} className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 font-mono text-sm font-bold text-cyan-300 transition group-hover:border-cyan-300/60">SM</span>
              <span>
                <span className="block text-base font-semibold text-slate-100 transition group-hover:text-cyan-300">{profile.name}</span>
                <span className="mt-0.5 block text-xs text-slate-400">Full-Stack Developer · Building for the web</span>
              </span>
            </a>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Open to full-time roles
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-slate-200">Navigate</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                ["About", "#about"],
                ["Skills", "#skills"],
                ["Projects", "#projects"],
                ["Experience", "#experience"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}><a href={href} className={linkClass}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Connect links">
            <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-slate-200">Connect</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              <li><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)" className={linkClass}>GitHub</a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className={linkClass}>LinkedIn</a></li>
              <li><a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`} className={`${linkClass} inline-flex items-center gap-1.5`}><Mail className="h-3.5 w-3.5" />Email</a></li>
              <li><a href={resumeDownloadUrl()} aria-label="View or download resume" className={linkClass}>Resume</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with Next.js, NestJS &amp; Tailwind</p>
          <a href="#hero" aria-label="Back to top" className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg px-3 text-slate-400 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:min-h-0 sm:pr-0">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default memo(SiteFooter);
