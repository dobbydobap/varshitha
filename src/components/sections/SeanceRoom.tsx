"use client";

// The dedicated interactive playground. Terminal + Ouija are code-split and only
// hydrated here (ssr:false) to keep them off the initial bundle — the section's
// heading/prose render immediately; the toys stream in.

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";

const loading = (
  <div className="flex min-h-64 items-center justify-center rounded-lg border border-white/10 bg-black/40 font-mono text-xs text-ash">
    channeling…
  </div>
);

const Terminal = dynamic(() => import("./seance/Terminal").then((m) => m.Terminal), {
  ssr: false,
  loading: () => loading,
});
const Ouija = dynamic(() => import("./seance/Ouija").then((m) => m.Ouija), {
  ssr: false,
  loading: () => loading,
});

export function SeanceRoom() {
  return (
    <section id="seance" className="px-5 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="cross the threshold" title="the séance room" cat />
        <p className="-mt-6 mb-10 max-w-xl font-body text-ash">
          a playground, not a portfolio. talk to the terminal. ask the board who
          wrote the bug. the answer will not surprise you.
        </p>
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <Terminal />
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-rose-deep">
              the board · drag the planchette or ask below
            </p>
            <Ouija />
          </div>
        </div>
      </div>
    </section>
  );
}
