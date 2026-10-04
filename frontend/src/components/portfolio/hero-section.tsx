"use client";

import { memo } from "react";
import { Download } from "lucide-react";
import type { Portfolio, Project } from "@/lib/types";
import ProfileJsonTerminal from "./profile-json-terminal";
import { SocialIcon } from "./SocialIcon";

type Props = { profile: Portfolio["profile"]; projects: Project[]; typed: string; onResume: () => void; onCopy: (text: string, message: string) => void };

function HeroSection({ profile, projects, typed, onResume, onCopy }: Props) {
  return (
      <section
          id="hero"
          className="relative min-h-[90vh] pt-12 pb-20 flex items-center bg-grid-pattern overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-accent-violet/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 light:bg-emerald-50/90 border border-emerald-500/30 light:border-emerald-300 w-fit">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 light:text-emerald-700 tracking-wide uppercase">
                    {profile.status}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                  {profile.headlineLead} <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-cyan-400 via-brand-400 to-indigo-400 bg-clip-text text-transparent">
                    {profile.headlineAccent}
                  </span>{" "}
                  {profile.headlineTail}
                </h1>

                <div className="text-xl sm:text-2xl font-mono text-slate-300 light:text-slate-700 flex items-center gap-2 min-h-[36px]">
                  <span className="text-brand-400 font-bold">&gt;</span>
                  <span className="border-r-2 border-brand-400 pr-1 animate-pulse font-semibold">
                    {typed}
                  </span>
                </div>

                <p className="text-lg text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
                  {profile.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600 shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-all"
                  >
                    Explore Featured Projects
                  </a>
                  <button
                    type="button"
                    onClick={() => onResume()}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-200 light:text-slate-800 bg-slate-900/80 light:bg-white border border-slate-700/80 light:border-slate-300 hover:-translate-y-0.5 transition-all"
                  >
                    <Download className="w-5 h-5 text-brand-400" />
                    Download Resume
                  </button>
                </div>

                <div
                  className="flex items-center gap-3"
                  aria-label="Social links"
                >
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-800 light:border-slate-300 text-slate-400 hover:text-brand-400 hover:border-brand-500/50 transition-colors"
                  >
                    <SocialIcon network="github" />
                    <span className="text-xs font-medium">GitHub</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-800 light:border-slate-300 text-slate-400 hover:text-brand-400 hover:border-brand-500/50 transition-colors"
                  >
                    <SocialIcon network="linkedin" />
                    <span className="text-xs font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <ProfileJsonTerminal profile={profile} projects={projects} onCopy={onCopy} />
              </div>
            </div>
          </div>
      </section>
  );
}

export default memo(HeroSection);
