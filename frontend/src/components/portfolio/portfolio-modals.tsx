import { memo } from "react";
import { resumeDownloadUrl } from "@/lib/api";
import type { Portfolio, Project } from "@/lib/types";
import { AlertCircle, Cpu, Download, FileBadge, Printer, TrendingUp, X } from "lucide-react";

const SKILL_GROUPS: [string, string][] = [
  ["frontend", "Frontend"],
  ["backend", "Backend"],
  ["cloud", "Databases"],
  ["tools", "Tools"],
];

type Props = {
  data: Portfolio;
  profile: Portfolio["profile"];
  caseStudy: Project | null;
  resumeOpen: boolean;
  githubLabel: string;
  linkedinLabel: string;
  onCloseCaseStudy: () => void;
  onCloseResume: () => void;
};

function PortfolioModals({ data, profile, caseStudy, resumeOpen, githubLabel, linkedinLabel, onCloseCaseStudy, onCloseResume }: Props) {
  return (
    <>
      {caseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${caseStudy.title} case study`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/80"
          onClick={() => onCloseCaseStudy()}
        >
          <div
            className="glass-card relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-700/80 p-6 sm:p-8 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close case study"
              onClick={() => onCloseCaseStudy()}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-6 pr-8">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-brand-950 text-brand-300 border border-brand-800/50 mb-2 inline-block">
                  {caseStudy.highlight}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  {caseStudy.title}
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  {caseStudy.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                {caseStudy.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> The Problem / Challenge
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {caseStudy.caseStudy.problem}
                </p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Architectural Approach
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {caseStudy.caseStudy.architecture}
                </p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Quantified Achievements
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  {caseStudy.caseStudy.metrics.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                <strong className="font-bold block mb-1">Key Takeaway:</strong>
                {caseStudy.caseStudy.lessons}
              </div>
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 items-center gap-2"
              >
                {/* <Github className="w-4 h-4" /> View Source Code */}
              </a>
            </div>
          </div>
        </div>
      )}

      {resumeOpen && (
        <div
          id="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/85"
          onClick={() => onCloseResume()}
        >
          <div
            className="glass-card relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-700 p-6 sm:p-8 bg-slate-900 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="no-print flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <FileBadge className="w-5 h-5 text-brand-400" />
                <span className="font-bold text-lg">{data.resumeFileName}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={resumeDownloadUrl()}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Download PDF
                </a>
                <button
                  type="button"
                  aria-label="Close resume"
                  onClick={() => onCloseResume()}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-6 text-sm text-slate-300">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <p className="text-brand-400 font-semibold mt-0.5">{profile.title}</p>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  {profile.phone} â€¢ {profile.email} â€¢{" "}
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-400"
                  >
                    {githubLabel}
                  </a>{" "}
                  â€¢{" "}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-400"
                  >
                    {linkedinLabel}
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Professional Summary
                </h2>
                <p className="text-xs leading-relaxed">{profile.summary}</p>
              </div>
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Technical Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {SKILL_GROUPS.map(([cat, label]) => {
                    const names = data.skills
                      .filter((s) => s.category === cat)
                      .map((s) => s.name);
                    if (names.length === 0) return null;
                    return (
                      <div key={cat}>
                        <strong className="text-slate-200">{label}:</strong>{" "}
                        {names.join(", ")}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Work Experience
                </h2>
                {data.experience.map((job) => (
                  <div key={job.role + job.period} className="mb-4">
                    <div className="flex justify-between items-baseline font-semibold text-slate-200 text-xs">
                      <span>
                        {job.role} â€” {job.company}
                      </span>
                      <span className="font-mono text-slate-400">
                        {job.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-xs mt-1.5 space-y-1">
                      {job.bullets.slice(0, 2).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Education
                </h2>
                {data.about.education.map((ed) => (
                  <div
                    key={ed.title}
                    className="flex justify-between text-xs font-semibold text-slate-200"
                  >
                    <span>
                      {ed.title} â€” {ed.place}
                    </span>
                    <span className="font-mono text-slate-400">
                      {ed.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="no-print mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <a
                href={resumeDownloadUrl()}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-500 inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Official PDF
              </a>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default memo(PortfolioModals);
