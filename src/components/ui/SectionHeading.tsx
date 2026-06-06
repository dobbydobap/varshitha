"use client";

import { motion } from "motion/react";
import { CatSvg } from "@/components/cat/CatSvg";
import { useReducedMotionSafe } from "@/lib/hooks";

// A section heading: a mono "case file" kicker + a huge display title. Optional
// perched cat sits on the corner of the heading (§7: "sits on section headings").
export function SectionHeading({
  kicker,
  title,
  cat = false,
}: {
  kicker: string;
  title: string;
  cat?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  return (
    <div className="relative mb-10 md:mb-14">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-rose-deep">
        {kicker}
      </p>
      <div className="relative inline-block">
        {cat && (
          <span className="absolute -top-9 right-0 w-12 sm:-top-11 sm:w-14" aria-hidden>
            <CatSvg className="w-full" />
          </span>
        )}
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl leading-[0.95] tracking-tight text-bone sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
