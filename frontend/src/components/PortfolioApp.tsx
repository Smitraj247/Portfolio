"use client";

import { fetchPortfolio, sendContact } from "@/lib/api";
import ScheduledMaintenance from "@/components/ScheduledMaintenance";
import Chatbot from "@/components/Chatbot";
import HeroSection from "@/components/portfolio/hero-section";
import AboutSection from "@/components/portfolio/about-section";
import SkillsSection from "@/components/portfolio/skills-section";
import ProjectsSection from "@/components/portfolio/projects-section";
import ExperienceSection from "@/components/portfolio/experience-section";
import InteractiveTerminalSection from "@/components/portfolio/terminal-section";
import ContactSection from "@/components/portfolio/contact-section";
import SiteHeader from "@/components/portfolio/site-header";
import SiteFooter from "@/components/portfolio/site-footer";
import PortfolioModals from "@/components/portfolio/portfolio-modals";
import type { Portfolio, Project, Skill } from "@/lib/types";
import {
  ArrowUp,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


// "https://www.github.com/user/" -> "github.com/user"
function displayUrl(url: string) {
  return url
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
}

export default function PortfolioApp() {
  const [data, setData] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [skillCat, setSkillCat] = useState("all");
  const [projectCat, setProjectCat] = useState("all");
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [typed, setTyped] = useState("");
  const [snippetKey, setSnippetKey] = useState("auth-guard");
  const [termOut, setTermOut] = useState("Ready to execute...");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const toastId = useRef(0);

  const showToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  useEffect(() => {
    fetchPortfolio()
      .then(setData)
      .catch((cause: unknown) =>
        setError(
          cause instanceof Error
            ? cause.message
            : "The site is temporarily unavailable.",
        ),
      );
  }, []);

  useEffect(() => {
    if (!data) return;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (motionPreference.matches || !("IntersectionObserver" in window)) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );
    sections.forEach((section) => section.setAttribute("data-reveal", "true"));
    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
      sections.forEach((section) => {
        section.removeAttribute("data-reveal");
        section.classList.remove("is-visible");
      });
    };
  }, [data]);

  useEffect(() => {
    if (!data) return;
    let frame = 0;
    const updateScrollState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(
          maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0,
        );
        setShowBackToTop(window.scrollY > 500);

        const sections = Array.from(
          document.querySelectorAll<HTMLElement>("main section[id]"),
        );
        const current = sections
          .filter((section) => section.getBoundingClientRect().top <= 150)
          .at(-1);
        setActiveSection(current?.id ?? "hero");
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [data]);


  // Theme: applied only on <html>
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(saved);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!data) return;
    const titles = data.profile.typingTitles;
    if (!titles || titles.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(titles[0].replace(/\u00c2\u00b7/g, "·").replace(/[·|,]\s*$/, ""));
      return;
    }

    let titleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = titles[titleIdx];
      charIdx += deleting ? -1 : 1;
      setTyped(current.slice(0, charIdx).replace(/\u00c2\u00b7/g, "·").replace(/[·|,]\s*$/, ""));

      let speed = deleting ? 40 : 80;
      if (!deleting && charIdx === current.length) {
        speed = 2000;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        speed = 400;
      }
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [data]);

  // Modals: Escape to close + lock body scroll
  const anyModalOpen = Boolean(caseStudy) || resumeOpen;
  useEffect(() => {
    if (!anyModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCaseStudy(null);
        setResumeOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [anyModalOpen]);

  const copyText = useCallback(async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    showToast(msg);
  }, [showToast]);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    showToast(`Switched to ${next === "dark" ? "Dark" : "Light"} theme mode`);
  }, [theme, showToast]);

  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  const closeCaseStudy = useCallback(() => setCaseStudy(null), []);
  const toggleMobileMenu = useCallback(() => setMobileOpen((open) => !open), []);
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  const skills = useMemo(() => {
    if (!data) return [] as Skill[];
    return skillCat === "all"
      ? data.skills
      : data.skills.filter((s) => s.category === skillCat);
  }, [data, skillCat]);

  const projects = useMemo(() => {
    if (!data) return [] as Project[];
    return projectCat === "all"
      ? data.projects
      : data.projects.filter((project) => project.category === projectCat);
  }, [data, projectCat]);

  const onContact = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setContactError(null);
    setSending(true);
    try {
      const res = await sendContact({
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        inquiryType: String(fd.get("inquiryType") || ""),
        subject: String(fd.get("inquiryType") || "General Connect"),
        message: String(fd.get("message") || ""),
        website: String(fd.get("website") || ""),
      });
      setSent(true);
      form.reset();
      showToast(res.message);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send. Please try again.";
      setContactError(message);
      showToast(message);
    } finally {
      setSending(false);
    }
  }, [showToast]);

  const runSnippet = useCallback(() => {
    setTermOut("Compiling & executing unit tests (simulated)...");
    setTimeout(() => {
      setTermOut("âœ“ Simulated run: 3/3 tests passed - 14ms");
      showToast("Terminal snippet executed (simulation)");
    }, 900);
  }, [showToast]);

  if (error) {
    return <ScheduledMaintenance />;
  }

  if (!data) {
    return (
      <div className="relative isolate min-h-screen flex items-center justify-center">
        <Chatbot />
        <Loader2 className="w-8 h-8 animate-spin text-brand-400" />
      </div>
    );
  }

  const p = data.profile;
  const light = theme === "light";
  const githubLabel = displayUrl(p.github);
  const linkedinLabel = displayUrl(p.linkedin);

  return (
    <div
      className={`relative isolate ${light ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"}`}
    >
      <div
        className="scroll-progress-track"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="scroll-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <Chatbot />
      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="glass-card px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-brand-500/40 pointer-events-auto"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <SiteHeader profile={p} activeSection={activeSection} theme={theme} mobileOpen={mobileOpen} onToggleTheme={toggleTheme} onMenuToggle={toggleMobileMenu} onMenuClose={closeMobileMenu} onResume={openResume} />

      <main>
        <HeroSection profile={p} projects={data.projects} typed={typed} onResume={openResume} onCopy={copyText} />
        <AboutSection profile={p} experience={data.experience} />
        <SkillsSection skills={skills} skillCat={skillCat} setSkillCat={setSkillCat} />
        <ProjectsSection projects={projects} projectCat={projectCat} setProjectCat={setProjectCat} onSelectProject={setCaseStudy} />
        <ExperienceSection experience={data.experience} />
        <InteractiveTerminalSection snippets={data.snippets} snippetKey={snippetKey} setSnippetKey={setSnippetKey} termOut={termOut} runSnippet={runSnippet} onCopy={copyText} />
        <ContactSection profile={p} onCopy={copyText} onContact={onContact} sending={sending} sent={sent} error={contactError} />
      </main>

      <PortfolioModals data={data} profile={p} caseStudy={caseStudy} resumeOpen={resumeOpen} githubLabel={githubLabel} linkedinLabel={linkedinLabel} onCloseCaseStudy={closeCaseStudy} onCloseResume={closeResume} />
      <SiteFooter profile={p} />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          })
        }
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
