"use client";

// One pointer listener for the whole site. Flashlight, cat eyes, paw trail and
// the ouija all read from here instead of each attaching their own listener.
// Writes CSS vars (--flash-x/--flash-y) directly for the flashlight (no React
// re-render), and exposes a subscribe() for consumers that need JS coordinates.

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Pt = { x: number; y: number };
type Listener = (p: Pt) => void;

type PointerCtx = {
  /** subscribe to pointer moves; returns an unsubscribe. rAF-throttled. */
  subscribe: (fn: Listener) => () => void;
  /** latest pointer position (ref, not reactive). */
  posRef: React.RefObject<Pt>;
  /** true once a real (non-touch) pointer is driving the flashlight. */
  hasPointer: boolean;
  /** true on coarse/touch pointers — used to switch to tap-and-hold reveal. */
  isTouch: boolean;
};

const Ctx = createContext<PointerCtx | null>(null);

export function PointerProvider({ children }: { children: ReactNode }) {
  const posRef = useRef<Pt>({ x: 0, y: 0 });
  const listeners = useRef<Set<Listener>>(new Set());
  const [hasPointer, setHasPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(coarse);

    let frame = 0;
    const flush = () => {
      frame = 0;
      const p = posRef.current;
      document.documentElement.style.setProperty("--flash-x", `${p.x}px`);
      document.documentElement.style.setProperty("--flash-y", `${p.y}px`);
      listeners.current.forEach((fn) => fn(p));
    };

    const onMove = (e: PointerEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!hasPointer && e.pointerType !== "touch") setHasPointer(true);
      if (!frame) frame = requestAnimationFrame(flush);
    };

    // touch: tap-and-hold reveals; drag while held keeps updating.
    const onTouch = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      posRef.current = { x: e.clientX, y: e.clientY };
      document.documentElement.classList.add("touch-reveal");
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onTouchEnd = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      document.documentElement.classList.remove("touch-reveal");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onTouch, { passive: true });
    window.addEventListener("pointerup", onTouchEnd, { passive: true });
    window.addEventListener("pointercancel", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onTouch);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [hasPointer]);

  const value: PointerCtx = {
    posRef,
    hasPointer,
    isTouch,
    subscribe: (fn) => {
      listeners.current.add(fn);
      return () => listeners.current.delete(fn);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePointer(): PointerCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePointer must be used within PointerProvider");
  return ctx;
}
