"use client";

// Idle 10s → faint paw prints wander across the page until the cursor moves.
// useIdle already resets on any pointer/scroll/key activity, so "until the
// cursor moves" is free. Disabled under reduced motion.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useIdle } from "@/lib/hooks";

type Paw = { id: number; x: number; y: number; r: number };

export function PawPrintTrail() {
  const idle = useIdle(10000);
  const reduce = useReducedMotion();
  const [paws, setPaws] = useState<Paw[]>([]);

  useEffect(() => {
    if (!idle || reduce) {
      setPaws([]);
      return;
    }
    // a wandering diagonal path of prints
    let id = 0;
    let x = 8 + Math.random() * 20;
    let y = 12 + Math.random() * 20;
    let angle = Math.PI / 4 + (Math.random() - 0.5);
    const t = setInterval(() => {
      angle += (Math.random() - 0.5) * 0.6;
      x += Math.cos(angle) * 7;
      y += Math.sin(angle) * 7;
      if (x > 92 || y > 92 || x < 4 || y < 4) {
        x = 8 + Math.random() * 20;
        y = 12 + Math.random() * 20;
      }
      const paw = { id: id++, x, y, r: (angle * 180) / Math.PI + 90 };
      setPaws((prev) => [...prev.slice(-14), paw]);
    }, 420);
    return () => clearInterval(t);
  }, [idle, reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
      <AnimatePresence>
        {paws.map((p) => (
          <motion.svg
            key={p.id}
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute h-5 w-5"
            style={{ left: `${p.x}vw`, top: `${p.y}vh`, rotate: `${p.r}deg` }}
          >
            <g fill="#ffafcc">
              <ellipse cx="12" cy="15" rx="5" ry="4" />
              <circle cx="6" cy="9" r="2" />
              <circle cx="10.5" cy="6" r="2" />
              <circle cx="15.5" cy="6" r="2" />
              <circle cx="19" cy="9" r="2" />
            </g>
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  );
}
