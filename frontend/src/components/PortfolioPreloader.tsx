"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sm-portfolio-booted";

export default function PortfolioPreloader() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("preloader-active")) return;

    setActive(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // The visual loader still works if browser storage is unavailable.
    }

    const fadeTimer = window.setTimeout(() => setLeaving(true), 1500);
    const finishTimer = window.setTimeout(() => {
      root.classList.remove("preloader-active");
      setActive(false);
    }, 1900);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(finishTimer);
      root.classList.remove("preloader-active");
    };
  }, []);

  return (
    <div
      className={`portfolio-preloader${active ? " is-active" : ""}${leaving ? " is-leaving" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader-terminal">
        <div className="preloader-brand">SM</div>
        <div className="preloader-lines">
          <p className="preloader-line preloader-line-1"><span className="preloader-prompt">&gt;</span> initializing portfolio...</p>
          <p className="preloader-line preloader-line-2"><span className="preloader-prompt">&gt;</span> loading modules <span className="preloader-check">✓</span></p>
          <p className="preloader-line preloader-line-3"><span className="preloader-prompt">&gt;</span> welcome<span className="preloader-cursor">_</span></p>
        </div>
        <div className="preloader-track"><span /></div>
      </div>
    </div>
  );
}
