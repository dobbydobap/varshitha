"use client";

// One case file, revealed like a dossier being opened: the "EVP capture"
// polaroid develops, a redaction bar slides off the brief, and the verdict
// stamp thunks down. Reduced motion: everything is simply already open.

import { motion } from "motion/react";
import type { CaseFile } from "@/content/casefiles";
import { useReducedMotionSafe } from "@/lib/hooks";

// a procedural "spectral waveform" so every capture is unique — no stock images.
function EvpWave({ seed }: { seed: number }) {
  const pts: string[] = [];
  const N = 40;
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * 300;
    const a = Math.sin(i * 0.7 + seed) + Math.sin(i * 0.29 + seed * 2.3);
    const spike = Math.abs(Math.sin(i * 1.9 + seed * 5)) > 0.86 ? (i % 2 ? 22 : -22) : 0;
    const y = 60 + a * 14 + spike;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#fb6f92"
        strokeWidth="1.5"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

export function Dossier({ file, index }: { file: CaseFile; index: number }) {
  const reduce = useReducedMotionSafe();
  const no = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      id={`case-${file.id}`}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24 border-t border-white/10 py-12 md:py-16"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] md:gap-12">
        {/* EVP capture polaroid */}
        <motion.div
          initial={reduce ? false : { filter: "blur(14px) brightness(0.25) saturate(0)", opacity: 0.3 }}
          whileInView={reduce ? undefined : { filter: "blur(0px) brightness(1) saturate(1)", opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="self-start rounded-sm bg-bone p-3 pb-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] [transform:rotate(-1.4deg)]"
        >
          <div className="relative h-40 overflow-hidden bg-ink">
            <div className="absolute inset-0 opacity-70">
              <EvpWave seed={index * 1.7 + 1} />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(251,111,146,0.28),transparent_60%)]" />
            <span className="absolute bottom-1 right-2 font-mono text-[9px] text-rose-soft/70">
              EVP · {file.id}
            </span>
          </div>
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-ink/70">
            exhibit {no} — {file.title}
          </p>
        </motion.div>

        {/* the file */}
        <div className="relative">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-xs text-ash">case file {no}</span>
            {file.flag && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-deep">
                {file.flag}
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-4">
            <h3 className="font-display text-3xl tracking-tight text-bone sm:text-5xl">
              {file.title}
            </h3>
            <motion.span
              initial={reduce ? false : { scale: 2.2, rotate: -24, opacity: 0 }}
              whileInView={reduce ? undefined : { scale: 1, rotate: -9, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 700, damping: 16, delay: 0.5 }}
              className="stamp text-[11px]"
            >
              {file.stamp}
            </motion.span>
          </div>

          <p className="mt-3 font-display text-lg italic text-rose">“{file.logline}”</p>

          {/* redaction bar that slides off the brief */}
          <div className="relative mt-4 max-w-2xl overflow-hidden">
            <p className="font-body text-[15px] leading-relaxed text-ash">
              {file.dossier}
            </p>
            {!reduce && (
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 origin-right bg-bone"
                aria-hidden
              />
            )}
          </div>

          {/* evidence chips */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {file.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-rose-deep/30 px-3 py-1 font-mono text-[11px] text-rose-soft/90"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest">
            {file.live && (
              <a
                href={file.live}
                target="_blank"
                rel="noreferrer"
                className="text-rose transition-colors hover:text-blood"
              >
                live exhibit ↗
              </a>
            )}
            <a
              href={file.code}
              target="_blank"
              rel="noreferrer"
              className="text-bone transition-colors hover:text-rose"
            >
              source ↗
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
