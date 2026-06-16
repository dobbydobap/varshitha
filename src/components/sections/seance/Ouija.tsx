"use client";

// The ouija board. Drag the planchette for free play, or type a question and it
// spells the answer by gliding letter to letter (keyboard-accessible path — the
// board itself needs no pointer). Answers are canned and witty.

import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Spot = { ch: string; x: number; y: number };

function buildSpots(): { spots: Spot[]; map: Record<string, Spot> } {
  const spots: Spot[] = [];
  const rows = ["ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"];
  rows.forEach((row, r) => {
    const n = row.length;
    const baseY = r === 0 ? 30 : 46;
    [...row].forEach((ch, i) => {
      const t = i / (n - 1);
      spots.push({ ch, x: 8 + t * 84, y: baseY - Math.sin(t * Math.PI) * 6 });
    });
  });
  [..."1234567890"].forEach((ch, i) => {
    spots.push({ ch, x: 15 + (i / 9) * 70, y: 63 });
  });
  const map: Record<string, Spot> = {};
  spots.forEach((s) => (map[s.ch] = s));
  return { spots, map };
}

function answerFor(q: string): string {
  const s = q.toLowerCase();
  if (/bug|who wrote|whose fault|broke/.test(s)) return "YOU";
  if (/hire|job|intern|recruit|work/.test(s)) return "YES";
  if (/\bcat\b|qa lead|planchette/.test(s)) return "MEOW";
  if (/ghost|haunt|wrong|root cause|why/.test(s)) return "RACE CONDITION";
  if (/love|marry|date/.test(s)) return "ASK THE CAT";
  if (/approve|pull request|\bpr\b|merge/.test(s)) return "NEVER";
  const pool = ["YES", "NO", "SOON", "IT WAS DNS", "MAYBE", "ASK AGAIN"];
  return pool[s.length % pool.length];
}

const PRESETS = ["who wrote this bug?", "will she get the job?", "is the cat happy?"];

export function Ouija() {
  const reduce = useReducedMotion();
  const { spots, map } = useMemo(buildSpots, []);
  const boardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 80 });
  const [active, setActive] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [answering, setAnswering] = useState(false);
  const [q, setQ] = useState("");

  async function ask(question: string) {
    if (answering || !question.trim()) return;
    const word = answerFor(question);
    setAnswer("");
    setAnswering(true);

    if (reduce) {
      // calm path: no gliding, just reveal
      setAnswer(word);
      const last = [...word].reverse().find((c) => map[c]);
      if (last) setPos(map[last]);
      setAnswering(false);
      return;
    }

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    for (const ch of word) {
      const spot = map[ch];
      if (!spot) {
        setActive(null);
        await wait(280); // space
        continue;
      }
      setPos({ x: spot.x, y: spot.y });
      setActive(ch);
      await wait(360);
      setAnswer((a) => a + ch);
      await wait(360);
    }
    setActive(null);
    setAnswering(false);
  }

  return (
    <div>
      <div
        ref={boardRef}
        className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-rose-deep/40 bg-[radial-gradient(120%_120%_at_50%_0%,#16121a,#0a0a0c)]"
      >
        {/* corners: sun & moon */}
        <span className="absolute left-3 top-2 font-display text-2xl text-rose-soft/60">☾ yes</span>
        <span className="absolute right-3 top-2 font-display text-2xl text-rose-soft/60">no ☀</span>

        {/* letters + numbers */}
        {spots.map((s) => (
          <span
            key={s.ch}
            className={`absolute -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(0.7rem,2.4vw,1.4rem)] transition-colors duration-150 ${
              active === s.ch ? "text-blood" : "text-bone/75"
            }`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            aria-hidden
          >
            {s.ch}
          </span>
        ))}
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.3em] text-ash">
          goodbye
        </span>

        {/* planchette */}
        <motion.div
          drag={!answering}
          dragConstraints={boardRef}
          dragElastic={0.12}
          animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
          className="absolute z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          aria-hidden
        >
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-rose-deep bg-rose-deep/15 backdrop-blur-[1px] shadow-[0_0_20px_rgba(251,111,146,0.4)]">
            <div className="h-3 w-3 rounded-full border border-rose-soft/80 bg-transparent" />
          </div>
        </motion.div>
      </div>

      {/* keyboard-accessible ask path */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(q);
        }}
        className="mt-4 flex flex-col gap-3"
      >
        <div className="flex gap-2">
          <label htmlFor="ouija-q" className="sr-only">
            ask the board a question
          </label>
          <input
            id="ouija-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ask the board a question…"
            className="flex-1 rounded border border-white/15 bg-black/40 px-3 py-2 font-mono text-sm text-bone outline-none placeholder:text-ash/40 focus:border-rose"
          />
          <button
            type="submit"
            disabled={answering}
            className="rounded border border-rose-deep bg-rose-deep/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-rose-soft transition-colors hover:bg-rose-deep/40 disabled:opacity-50"
          >
            {answering ? "…channeling" : "ask"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setQ(p);
                ask(p);
              }}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ash transition-colors hover:border-rose hover:text-rose"
            >
              {p}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="min-h-7 font-display text-2xl text-rose">
          {answer && <>the board spells: <span className="text-blood">{answer}</span></>}
        </p>
      </form>
    </div>
  );
}
