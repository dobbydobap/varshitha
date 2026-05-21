"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// idle after `ms` of no pointer/scroll/key activity. resets on any of them.
// ponytail: plain listeners; the paw trail is the only consumer.
export function useIdle(ms: number): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), ms);
    };
    const evs = ["pointermove", "pointerdown", "scroll", "keydown"] as const;
    evs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(t);
      evs.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [ms]);
  return idle;
}

// mounted flag — for gating client-only effects (avoids SSR/hydration mismatch).
export function useMounted(): boolean {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

// Reduced-motion, but SSR-safe: false on the server AND the first client render
// (so hydration matches), then the real preference after mount. Using the raw
// motion/react hook directly causes hydration mismatches for anyone who has
// reduced motion enabled, because the server always assumes false.
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  return mounted ? !!reduce : false;
}
