import {
  Atom,
  Boxes,
  Brain,
  Bug,
  Cloud,
  Code2,
  Coffee,
  Database,
  GitBranch,
  Network,
  Palette,
  Server,
  Table2,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "code-2": Code2,
  atom: Atom,
  palette: Palette,
  server: Server,
  boxes: Boxes,
  network: Network,
  database: Database,
  "table-2": Table2,
  coffee: Coffee,
  brain: Brain,
  "git-branch": GitBranch,
  bug: Bug,
  cloud: Cloud,
  "check-circle-2": CheckCircle2,
};

export const SKILL_ICON_COLORS: Record<string, string> = {
  "code-2": "text-sky-400",
  atom: "text-cyan-400",
  palette: "text-teal-400",
  server: "text-emerald-400",
  boxes: "text-pink-400",
  network: "text-violet-400",
  "cloud-sun": "text-sky-400",
  database: "text-indigo-400",
  "table-2": "text-blue-400",
  coffee: "text-amber-400",
  brain: "text-yellow-400",
  "git-branch": "text-orange-400",
  bug: "text-rose-400",
};

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Code2;
  return <Icon className={className} />;
}
