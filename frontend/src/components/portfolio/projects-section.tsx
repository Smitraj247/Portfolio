import type { Dispatch, SetStateAction } from "react";
import { memo } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";

type Props = { projects: Project[]; projectCat: string; setProjectCat: Dispatch<SetStateAction<string>>; onSelectProject: (project: Project) => void };

function ProjectsSection({ projects, projectCat, setProjectCat, onSelectProject }: Props) {
  return (
      <section
          id="projects"
          className="py-24 border-t border-slate-800/60 light:border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-400 mb-2">
                  {"// Featured Portfolio Works"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Production Case Studies
                </h2>
                <p className="text-slate-400 light:text-slate-600 mt-2 max-w-xl">
                  Projects from the resume plus admin/dashboard work from
                  Krishang Technolab.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-slate-900/80 light:bg-slate-200 border border-slate-800 light:border-slate-300">
                {[
                  ["all", "All"],
                  ["fullstack", "Full-Stack"],
                  ["frontend", "Frontend"],
                  ["backend", "Backend/APIs"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setProjectCat(id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      projectCat === id
                        ? "bg-brand-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card rounded-2xl overflow-hidden border border-slate-800/80 light:border-slate-200 hover:border-brand-500/40 transition-all hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  <div>
                    <div
                      className={`h-44 bg-gradient-to-br ${project.imageBg} p-5 flex flex-col justify-between relative overflow-hidden`}
                    >
                      <div className="flex justify-between items-center relative z-10">
                        <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-slate-950/80 text-brand-300 border border-brand-800/40">
                          {project.highlight}
                        </span>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="p-2 rounded-lg bg-slate-950/70 text-slate-300 hover:text-white"
                        >
                          {/* <Github className="w-4 h-4" /> */}
                        </a>
                      </div>
                      <h3 className="text-xl font-bold text-white relative z-10 group-hover:text-brand-300">
                        {project.title}
                      </h3>
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl" />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900/80 light:bg-slate-200 text-slate-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-brand-400 hover:text-white bg-brand-950/40 hover:bg-brand-600 border border-brand-800/50 flex items-center justify-center gap-2"
                    >
                      View Detailed Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-slate-400 col-span-full text-sm">
                  No projects in this category yet.
                </p>
              )}
            </div>
          </div>
      </section>
  );
}

export default memo(ProjectsSection);
