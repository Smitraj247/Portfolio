"use client";

import { memo, useEffect, useState } from "react";
import { Copy } from "lucide-react";
import type { Portfolio, Project } from "@/lib/types";

type Props = {
  profile: Portfolio["profile"];
  projects: Project[];
  onCopy: (text: string, message: string) => void;
};

function createProfileLines(profile: Portfolio["profile"], projects: Project[]) {
  const shippedApps = profile.metrics.find((metric) => metric.label === "Shipped Product Apps")?.value ?? "2";
  const featured = projects.slice(0, 3);
  return [
    "{",
    `  "name": ${JSON.stringify(profile.name)},`,
    `  "role": ${JSON.stringify(profile.title)},`,
    '  "core_stack": {',
    `    "frontend": ${JSON.stringify(profile.coreStack.filter((item) => /react|next|tailwind|javascript|typescript/i.test(item)))},`,
    `    "backend": ${JSON.stringify(profile.coreStack.filter((item) => /node|nest|express|api/i.test(item)))},`,
    `    "database": ${JSON.stringify(profile.coreStack.filter((item) => /mongo|postgres|mysql|sql|redis/i.test(item)))}`,
    "  },",
    '  "featured_projects": [',
    ...featured.map((project, index) => `    ${JSON.stringify(project.title)}${index < featured.length - 1 ? "," : ""}`),
    "  ],",
    `  "shipped_apps": ${Number(shippedApps)},`,
    '  "open_to_full_time": true,',
    `  "location": ${JSON.stringify(profile.location.replace(/\u00e2\u20ac\u00a2/g, "·"))},`,
    '  "notice_period": "Open to discussion",',
    `  "contact": ${JSON.stringify(profile.email)}`,
    "}",
  ];
}

function renderJsonLine(line: string, link?: { href: string; label: string }) {
  const parts = line.split(/("(?:[^"\\]|\\.)*"(?=\s*:)|"(?:[^"\\]|\\.)*"|\btrue\b|\bfalse\b|\b\d+\b|[{}\[\],:])/g);
  return parts.map((part, index) => {
    let color = "text-slate-300";
    if (part.startsWith('"')) {
      const key = line.slice(line.indexOf(part) + part.length).trimStart().startsWith(":");
      color = key ? "text-sky-400" : "text-emerald-400";
    } else if (part === "true" || part === "false") {
      color = "text-violet-300";
    } else if (/^\d+$/.test(part)) {
      color = "text-amber-300";
    } else if (/^[{}\[\],:]$/.test(part)) {
      color = "text-slate-500";
    }

    if (link && part === JSON.stringify(link.label)) {
      return <a key={`${index}-${part}`} href={link.href} target="_blank" rel="noopener noreferrer" className={`${color} underline decoration-brand-500/40 underline-offset-2 transition hover:text-white hover:decoration-brand-300`}>{part}</a>;
    }
    return <span key={`${index}-${part}`} className={color}>{part}</span>;
  });
}

function ProfileJsonTerminal({ profile, projects, onCopy }: Props) {
  const [progress, setProgress] = useState(0);
  const lines = createProfileLines(profile, projects);
  const json = lines.join("\n");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(json.length);
      return;
    }

    setProgress(0);
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= json.length) window.clearInterval(timer);
    }, 14);
    return () => window.clearInterval(timer);
  }, [json]);

  let offset = 0;
  const visibleLines = lines.map((line) => {
    const start = offset;
    offset += line.length + 1;
    return {
      line,
      visibleLength: Math.max(0, Math.min(line.length, progress - start)),
      showCursor: progress >= start && progress <= start + line.length,
    };
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#080d16] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-3 py-3 sm:px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="font-mono text-xs text-slate-400">profile.json</span>
        <button type="button" onClick={() => onCopy(json, "profile.json copied to clipboard!")} className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-700 px-2 py-1 font-mono text-[10px] text-slate-300 transition hover:border-brand-400/60 hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400" aria-label="Copy profile JSON">
          <Copy className="h-3 w-3" /> Copy
        </button>
      </div>
      <pre aria-label={json} className="overflow-x-auto px-3 py-4 font-mono text-[10px] leading-6 sm:px-5 sm:py-5 sm:text-xs">
        {visibleLines.map(({ line, visibleLength, showCursor }, index) => {
          const project = projects.slice(0, 3).find((item) => line.trim().replace(/,$/, "") === JSON.stringify(item.title));
          const link = project
            ? { href: project.demoUrl, label: project.title }
            : line.trimStart().startsWith('"contact":')
              ? { href: `mailto:${profile.email}`, label: profile.email }
              : undefined;
          return (
            <span key={index} className="block min-h-6 whitespace-pre-wrap break-words">
              {renderJsonLine(line.slice(0, visibleLength), link)}
              {showCursor && <span aria-hidden="true" className="terminal-caret ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-brand-400" />}
            </span>
          );
        })}
      </pre>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-slate-800 bg-slate-900/80 px-3 py-2.5 font-mono text-[9px] uppercase tracking-wider text-slate-300 sm:px-5 sm:text-[10px]">
        <span className="inline-flex items-center gap-2 text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Open to full-time</span>
        <span>UTF-8 · JSON · {projects.length} projects</span>
      </div>
    </div>
  );
}

export default memo(ProfileJsonTerminal);
