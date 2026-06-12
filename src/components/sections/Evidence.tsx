"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotionSafe } from "@/lib/hooks";
import { mergedPRs, openPRs, achievements } from "@/content/evidence";

export function Evidence() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="evidence" className="px-5 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="submitted for the record" title="evidence" />

        {/* merged PRs — the spotlight */}
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-rose-deep">
          exhibit A — merged into microsoft/vscode
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {mergedPRs.map((pr) => (
            <motion.a
              key={pr.num}
              href={pr.url}
              target="_blank"
              rel="noreferrer"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-lg border border-rose-deep/30 bg-ink-2 p-6 transition-colors hover:border-rose"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-rose">{pr.repo}</span>
                <span className="stamp text-[10px] text-rose-deep">merged</span>
              </div>
              <p className="mt-3 font-display text-2xl text-bone">{pr.num}</p>
              <p className="mt-1 font-body text-ash">{pr.detail}</p>
              <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-widest text-ash transition-colors group-hover:text-rose">
                view pull request ↗
              </span>
            </motion.a>
          ))}
        </div>

        {/* open PRs + achievements */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ash">
              exhibit B — open, under review
            </p>
            <ul className="space-y-2 font-mono text-sm">
              {openPRs.map((o) => (
                <li key={o.repo} className="flex justify-between gap-4 border-b border-white/10 py-2">
                  <span className="text-bone">{o.repo}</span>
                  <span className="text-ash">{o.nums}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ash">
              exhibit C — commendations
            </p>
            <ul className="space-y-4">
              {achievements.map((a) => (
                <li key={a.title} className="border-l-2 border-rose-deep pl-4">
                  <p className="font-display text-lg text-bone">{a.title}</p>
                  <p className="font-body text-sm text-ash">{a.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
