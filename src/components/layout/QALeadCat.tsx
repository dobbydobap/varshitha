"use client";

// The QA lead. Sits at the corner of the viewport, tracks the cursor with her
// eyes, walks across occasionally, and — on the third click — knocks the hero
// title crooked forever (persisted). Reduced motion: no walking, no batting.

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePointer } from "@/lib/pointer";
import { CatSvg } from "@/components/cat/CatSvg";

export function QALeadCat() {
  const { subscribe } = usePointer();
  const reduce = useReducedMotion();
  const catRef = useRef<HTMLButtonElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [walking, setWalking] = useState(false);
  const [clicks, setClicks] = useState(0);

  // eyes follow the cursor
  useEffect(() => {
    return subscribe((p) => {
      const el = catRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.38;
      const a = Math.atan2(p.y - cy, p.x - cx);
      const d = Math.min(2.6, Math.hypot(p.x - cx, p.y - cy) / 60);
      setPupil({ x: Math.cos(a) * d, y: Math.sin(a) * d });
    });
  }, [subscribe]);

  // occasional blink + occasional walk-across
  useEffect(() => {
    const blinkT = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 4200 + Math.random() * 3000);
    let walkT: ReturnType<typeof setTimeout>;
    const scheduleWalk = () => {
      walkT = setTimeout(() => {
        if (!reduce) {
          setWalking(true);
          setTimeout(() => setWalking(false), 6000);
        }
        scheduleWalk();
      }, 18000 + Math.random() * 20000);
    };
    scheduleWalk();
    return () => {
      clearInterval(blinkT);
      clearTimeout(walkT);
    };
  }, [reduce]);

  function onClick() {
    const n = clicks + 1;
    setClicks(n);
    if (n === 3) {
      // knock the hero title crooked, forever
      document.documentElement.style.setProperty("--title-tilt", "-3.2deg");
      try {
        localStorage.setItem("she-did-that", "1");
      } catch {}
      window.dispatchEvent(new CustomEvent("cat:knock"));
    }
  }

  return (
    <>
      {/* the walk-across pass */}
      {walking && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed bottom-4 z-40 w-16"
          initial={{ x: "-10vw" }}
          animate={{ x: "110vw" }}
          transition={{ duration: 6, ease: "linear" }}
          style={{ left: 0 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <CatSvg className="w-16 -scale-x-100" pupil={{ x: 1.5, y: 0 }} />
          </motion.div>
        </motion.div>
      )}

      {/* the resident cat, perched bottom-right */}
      <button
        ref={catRef}
        onClick={onClick}
        aria-label="the QA lead — click her (she has opinions)"
        className="fixed bottom-3 right-3 z-40 w-16 sm:w-20 opacity-90 transition-transform hover:scale-105 active:scale-95"
      >
        <CatSvg className="w-full" pupil={pupil} blink={blink} />
      </button>
    </>
  );
}
