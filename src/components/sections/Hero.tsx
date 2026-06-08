"use client";

// The hero: her name, huge and possessed. Letters flicker/float/invert on
// unpredictable timers. Three clicks on the QA lead knock the title crooked and
// it stays that way (persisted); a "she did that" caption appears.

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/content/profile";
import { useMounted, useReducedMotionSafe } from "@/lib/hooks";

function PossessedName({ text }: { text: string }) {
  const reduce = useReducedMotionSafe();
  const mounted = useMounted();
  const chars = [...text];

  return (
    <span aria-label={text} className="inline-block">
      {chars.map((ch, i) => {
        if (ch === " ")
          return (
            <span key={i} aria-hidden className="inline-block w-[0.28em]" />
          );
        // deterministic-ish per-letter randomness, only after mount
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        const rnd = seed - Math.floor(seed);
        const effect = i % 5 === 0 ? "float" : i % 3 === 0 ? "invert" : "flicker";
        const delay = 3 + rnd * 9;
        const anim =
          !mounted || reduce
            ? {}
            : effect === "float"
              ? { y: [0, -10, 0] }
              : effect === "invert"
                ? { color: ["#f5f0f0", "#fb6f92", "#f5f0f0"] }
                : { opacity: [1, 0.25, 1, 0.6, 1] };
        return (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block will-change-transform"
            animate={anim}
            transition={
              mounted && !reduce
                ? {
                    duration: effect === "flicker" ? 0.35 : 1.1,
                    repeat: Infinity,
                    repeatDelay: delay,
                    ease: "easeInOut",
                  }
                : undefined
            }
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotionSafe();
  const [knocked, setKnocked] = useState(false);

  useEffect(() => {
    // restore the crooked title if the cat has done that before
    try {
      if (localStorage.getItem("she-did-that")) {
        document.documentElement.style.setProperty("--title-tilt", "-3.2deg");
        setKnocked(true);
      }
    } catch {}
    const onKnock = () => setKnocked(true);
    window.addEventListener("cat:knock", onKnock);
    return () => window.removeEventListener("cat:knock", onKnock);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-24 pt-28 sm:px-10"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-ash sm:text-sm">
        case file · varshitha sai kolupuri · {profile.location.toLowerCase()}
      </p>

      <h1
        className="font-display font-black leading-[0.82] tracking-[-0.02em] text-bone"
        style={{
          fontSize: "clamp(3.2rem, 15vw, 12rem)",
          transform: "rotate(var(--title-tilt, 0deg))",
          transition: "transform 0.6s cubic-bezier(.2,1.4,.3,1)",
        }}
      >
        <span className="neon block text-rose-soft">
          <PossessedName text="Varshitha" />
        </span>
        <span className="block">
          <PossessedName text="Kolupuri" />
        </span>
      </h1>

      {knocked && (
        <p className="mt-3 font-mono text-[11px] italic text-rose-deep">
          ↳ she did that.
        </p>
      )}

      <p className="mt-8 max-w-2xl font-body text-lg text-ash sm:text-2xl">
        {profile.heroTagline}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-ash">
        <a href="#case-files" className="transition-colors hover:text-rose">
          → open the case files
        </a>
        <a href="#seance" className="transition-colors hover:text-rose">
          → enter the séance room
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-rose">
          github ↗
        </a>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-8 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ash sm:left-10"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          scroll · the light follows your cursor
        </motion.div>
      )}
    </section>
  );
}
