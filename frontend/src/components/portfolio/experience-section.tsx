import { memo } from "react";
import type { Experience } from "@/lib/types";

type Props = { experience: Experience[] };

function ExperienceSection({ experience }: Props) {
  return (
      <section
          id="experience"
          className="py-24 border-t border-slate-800/60 light:border-slate-200 bg-slate-950/50 light:bg-slate-100"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-400 mb-2">
                {"// Career Journey"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Professional Work Experience
              </h2>
              <p className="text-slate-400 light:text-slate-600 mt-2">
                Krishang Technolab â€” internship through full-time developer
                role.
              </p>
            </div>
            <div className="relative border-l-2 border-slate-800 light:border-slate-300 ml-4 sm:ml-32 space-y-12">
              {experience.map((job, i) => (
                <div
                  key={job.role + job.period}
                  className="relative pl-6 sm:pl-8 group"
                >
                  <div
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ${i === 0 ? "bg-brand-500" : "bg-indigo-500"} ring-4 ring-slate-950 light:ring-white group-hover:scale-125 transition-transform`}
                  />
                  <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono font-semibold text-brand-400 uppercase mb-2 sm:mb-0 sm:w-28 sm:text-right">
                    {job.period}
                  </div>
                  <div className="glass-card rounded-2xl p-6 border border-slate-800/80 light:border-slate-200 hover:border-brand-500/30">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold">{job.role}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-950 text-brand-300 border border-brand-800/50">
                        {job.company}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mb-4">
                      {job.meta}
                    </div>
                    <ul className="space-y-2.5 text-sm text-slate-300 light:text-slate-700 list-disc list-inside">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/60 light:border-slate-200">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 light:bg-slate-200 text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>
  );
}

export default memo(ExperienceSection);
