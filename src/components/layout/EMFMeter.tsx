"use client";

// EMF reader. Fixed widget whose needle/bars climb as the visitor scrolls toward
// the evidence section, going full red-pink static right before it. Reads the
// #evidence element's distance from viewport center on scroll (rAF-throttled).

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const BARS = 10;

export function EMFMeter() {
  const reduce = useReducedMotion();
  const [level, setLevel] = useState(0); // 0..1

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const target = document.getElementById("evidence");
      if (!target) return;
      const r = target.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      // distance from viewport center, normalized; peaks (→1) as evidence centers.
      const dist = Math.abs(center - vh / 2);
      const l = Math.max(0, 1 - dist / (vh * 1.1));
      setLevel(l);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const lit = Math.round(level * BARS);
  const hot = level > 0.82;

  return (
    <aside
      aria-label={`EMF reader: ${Math.round(level * 100)}% — paranormal activity ${hot ? "critical" : "rising"}`}
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 select-none flex-col items-center gap-2 rounded-lg border border-white/10 bg-ink-2/80 px-2.5 py-3 backdrop-blur-sm sm:flex"
    >
      <span className="font-mono text-[9px] uppercase tracking-widest text-ash">EMF</span>
      <div className="flex flex-col-reverse gap-[3px]">
        {Array.from({ length: BARS }).map((_, i) => {
          const on = i < lit;
          const danger = i >= BARS - 3;
          return (
            <span
              key={i}
              className={`h-2 w-6 rounded-[2px] transition-colors duration-150 ${
                on
                  ? danger
                    ? "bg-blood shadow-[0_0_8px_#c1121f]"
                    : "bg-rose-deep shadow-[0_0_6px_#fb6f92]"
                  : "bg-white/8"
              } ${on && hot && !reduce ? "flicker" : ""}`}
            />
          );
        })}
      </div>
      <span
        className={`font-mono text-[9px] tabular-nums ${hot ? "text-blood" : "text-ash"}`}
      >
        {String(Math.round(level * 100)).padStart(3, "0")}
      </span>
    </aside>
  );
}
