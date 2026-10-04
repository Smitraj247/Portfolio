import { memo } from "react";
import { FileText, Mail, Menu, Moon, Sun } from "lucide-react";
import type { Portfolio } from "@/lib/types";

const NAV_IDS = ["about", "skills", "projects", "experience", "terminal", "contact"];

type Props = {
  profile: Portfolio["profile"];
  activeSection: string;
  theme: "dark" | "light";
  mobileOpen: boolean;
  onToggleTheme: () => void;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onResume: () => void;
};

function SiteHeader({ profile, activeSection, theme, mobileOpen, onToggleTheme, onMenuToggle, onMenuClose, onResume }: Props) {
  return (
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-800/80 light:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-accent-cyan to-indigo-600 flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              {profile.monogram}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight group-hover:text-brand-400 transition-colors">
                {profile.name}
              </span>
              <span className="text-xs text-slate-400 font-mono -mt-1">
                &lt;Dev / Full-Stack&gt;
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                className={`capitalize transition-colors ${activeSection === id ? "text-brand-400" : "text-slate-300 light:text-slate-700 hover:text-brand-400"}`}
              >
                {id === "terminal" ? "Code Architecture" : id}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 text-slate-300 light:text-slate-700 hover:text-brand-400 transition-all hover:scale-105"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-brand-600 to-indigo-600 shadow-md shadow-brand-500/20 hover:-translate-y-0.5 transition-all"
            >
              <Mail className="w-4 h-4" />
              Hire Me
            </a>
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300"
              onClick={() => onMenuToggle()}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-b border-slate-800 light:border-slate-200 bg-slate-950/95 light:bg-white/95 px-4 pt-2 pb-6 flex flex-col gap-4">
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => onMenuClose()}
                aria-current={activeSection === id ? "location" : undefined}
                className={`py-2 border-b border-slate-800/50 light:border-slate-200 font-medium capitalize ${activeSection === id ? "text-brand-400" : "text-slate-300 light:text-slate-700"}`}
              >
                {id === "terminal" ? "Code Architecture" : id}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                onMenuClose();
                onResume();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-brand-600 to-indigo-600"
            >
              <FileText className="w-4 h-4" />
              View Full Resume
            </button>
          </div>
        )}
      </header>
  );
}

export default memo(SiteHeader);
