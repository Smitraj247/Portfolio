import type { Dispatch, SetStateAction } from "react";
import { memo } from "react";
import type { Skill } from "@/lib/types";
import { SkillIcon, SKILL_ICON_COLORS } from "./skill-icons";

type Props = { skills: Skill[]; skillCat: string; setSkillCat: Dispatch<SetStateAction<string>> };

function SkillsSection({ skills, skillCat, setSkillCat }: Props) {
  return (
      <section
          id="skills"
          className="py-24 border-t border-slate-800/60 light:border-slate-200 bg-slate-950/50 light:bg-slate-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-400 mb-2">
                {"// Technical Capabilities"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Skills & Technology Stack
              </h2>
              <p className="text-slate-400 light:text-slate-600 mt-3 text-base">
                Tools from the resume that I use to ship full-stack web
                applications.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-300">
                {[
                  ["all", "All Technologies"],
                  ["frontend", "Frontend"],
                  ["backend", "Backend & APIs"],
                  ["cloud", "Database"],
                  ["tools", "Dev Tools"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSkillCat(id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      skillCat === id
                        ? "bg-brand-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="tech-marquee-viewport"
              role="region"
              aria-label="Technology stack. Hover to pause."
            >
              <div className="tech-marquee-track">
                {[0, 1, 2, 3].map((copy) => (
                  <div
                    className="tech-marquee-group"
                    key={copy}
                    aria-hidden={copy > 0}
                  >
                    {skills.map((skill) => (
                      <article
                        key={skill.name}
                        className="tech-marquee-card glass-card group rounded-xl p-5 border border-slate-800/80 light:border-slate-200 hover:border-brand-500/50 transition-all"
                      >
                        <div className="mb-3 flex items-center gap-2.5">
                          <SkillIcon
                            name={skill.icon}
                            className={`h-5 w-5 shrink-0 ${SKILL_ICON_COLORS[skill.icon] ?? "text-brand-400"}`}
                          />
                          <h3 className="min-w-0 truncate text-base font-bold transition-colors group-hover:text-brand-400">
                            {skill.name}
                          </h3>
                        </div>

                        <p className="text-xs leading-snug text-slate-400 light:text-slate-600">
                          {skill.desc}
                        </p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>
  );
}

export default memo(SkillsSection);
