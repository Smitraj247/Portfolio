import { memo } from "react";
import { Boxes, Code2, Network } from "lucide-react";
import type { Experience, Portfolio } from "@/lib/types";

type Props = {
  profile: Portfolio["profile"];
  experience: Experience[];
};

const capabilities = [
  {
    title: "Frontend development",
    description:
      "I build responsive interfaces and dashboards with clear, accessible interactions.",
    technologies: ["React.js", "Next.js", "Tailwind CSS"],
    Icon: Code2,
    iconStyle: "bg-brand-500/10 text-brand-400",
  },
  {
    title: "Reliable backend",
    description:
      "I design REST APIs, authentication, and role-based access for data-backed products.",
    technologies: ["Node.js", "Nest.js", "REST APIs"],
    Icon: Network,
    iconStyle: "bg-accent-cyan/10 text-accent-cyan",
  },
  {
    title: "Full-Stack delivery",
    description:
      "I connect interfaces, APIs, and databases into cohesive features that work reliably.",
    technologies: ["MongoDB", "PostgreSQL"],
    Icon: Boxes,
    iconStyle: "bg-accent-emerald/10 text-accent-emerald",
  },
];

function AboutSection({ profile, experience }: Props) {
  const currentRole = experience[0];
  return (
    <section
      id="about"
      className="border-t border-slate-800/60 py-24 pb-40 light:border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col lg:sticky lg:top-24">
            <span className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-brand-400">
              {"// Professional Profile"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About me
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg light:text-slate-700">
              I&apos;m a {profile.title.toLowerCase()} who learns quickly, works
              across the stack, and turns complex requirements into reliable
              features. {currentRole
                ? `At ${currentRole.company}, I build React and Next.js apps, REST APIs, and role-based tools.`
                : "I build React and Next.js apps, REST APIs, and role-based tools."}
            </p>

            <div className="mt-8 rounded-2xl border border-brand-500/20 bg-brand-950/30 p-5 sm:p-6 light:bg-brand-50">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-400">
                How I work
              </div>
              <p className="text-sm leading-6 text-slate-300 light:text-slate-700">
                I take features from the first API contract through a polished,
                responsive interface, making sure the pieces work well together.
              </p>
              <a
                href="#projects"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
              >
                View projects
              </a>
            </div>
          </div>

          <div>
            <div className="grid gap-4">
              {capabilities.map(({ title, description, technologies, Icon, iconStyle }) => (
                <article
                  key={title}
                  className="flex h-full flex-col rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 light:border-slate-200 light:bg-white sm:p-6"
                >
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconStyle}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 light:text-slate-700">
                    {description}
                  </p>
                  <ul aria-label={`${title} technologies`} className="mt-4 flex flex-wrap gap-2">
                    {technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-md border border-brand-800/50 bg-brand-950/60 px-2.5 py-1 font-mono text-[11px] text-brand-300"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 text-center light:border-slate-200 light:bg-white">
                  <div className={`font-mono text-lg font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="mt-1 text-[10px] leading-4 text-slate-400 light:text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);
