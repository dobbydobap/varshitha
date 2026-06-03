"use client";

// Konami code anywhere → a parade of cats crosses the screen. Also fires on a
// `cats:parade` window event so the séance terminal's `summon cat` can reuse it.
// Reduced motion: cats appear in a calm row and fade, no marching.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CatSvg } from "@/components/cat/CatSvg";

const CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function KonamiCats() {
  const reduce = useReducedMotion();
  const [parade, setParade] = useState(0); // bump to retrigger

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = k === CODE[idx] ? idx + 1 : k === CODE[0] ? 1 : 0;
      if (idx === CODE.length) {
        idx = 0;
        setParade((n) => n + 1);
      }
    };
    const onEvent = () => setParade((n) => n + 1);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cats:parade", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cats:parade", onEvent);
    };
  }, []);

  useEffect(() => {
    if (!parade) return;
    const t = setTimeout(() => setParade(0), reduce ? 2500 : 7000);
    return () => clearTimeout(t);
  }, [parade, reduce]);

  const cats = Array.from({ length: 8 });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50" aria-hidden>
      <AnimatePresence>
        {parade > 0 &&
          cats.map((_, i) =>
            reduce ? (
              <motion.div
                key={`${parade}-${i}`}
                className="inline-block w-12 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <CatSvg className="w-12" />
              </motion.div>
            ) : (
              <motion.div
                key={`${parade}-${i}`}
                className="absolute bottom-0 w-12"
                initial={{ x: "-15vw" }}
                animate={{ x: "115vw", y: [0, -8, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  x: { duration: 4.5, ease: "linear", delay: i * 0.35 },
                  y: { duration: 0.45, repeat: Infinity },
                }}
              >
                <CatSvg className="w-12 -scale-x-100" pupil={{ x: 1.5, y: 0 }} />
              </motion.div>
            )
          )}
      </AnimatePresence>
    </div>
  );
}
