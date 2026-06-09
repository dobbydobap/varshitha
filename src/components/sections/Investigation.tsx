"use client";

import { motion } from "motion/react";
import { profile } from "@/content/profile";
import { useReducedMotionSafe } from "@/lib/hooks";

export function Investigation() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="investigation" className="px-5 py-24 sm:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-rose-deep">
          the investigation
        </p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl leading-snug text-bone sm:text-4xl md:text-[2.7rem] md:leading-[1.15]"
        >
          {profile.investigation}
        </motion.p>
        <p className="mt-8 max-w-2xl font-body text-base text-ash sm:text-lg">
          {profile.bio}
        </p>
      </div>
    </section>
  );
}
