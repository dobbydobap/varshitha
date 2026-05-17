// Case files (projects) — §6 VERIFIED FACTS. Prose restyled, numbers/names/links verbatim.

export type CaseFile = {
  id: string; // terminal handle, e.g. "rankforge"
  title: string;
  flag?: string; // "flagship", hackathon note, etc.
  stamp: "SHIPPED" | "LIVE" | "VERIFIED" | "TOP 100";
  live?: string;
  code: string;
  tech: string[];
  logline: string; // one-line signature
  dossier: string; // full description
};

export const caseFiles: CaseFile[] = [
  {
    id: "rankforge",
    title: "RankForge",
    flag: "flagship",
    stamp: "LIVE",
    live: "https://rank-forge-web.vercel.app",
    code: "https://github.com/dobbydobap/RankForge",
    tech: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "WebSockets",
      "Turborepo",
    ],
    logline: "time travel, but auditable.",
    dossier:
      "competitive programming platform, built end to end: 95+ problems, an async code judge running untrusted submissions in 10 languages through a Redis + BullMQ worker queue (sandboxed, per-test-case verdicts), real-time verdicts and live leaderboards over WebSockets, Codeforces-style Elo ratings, trigram-Jaccard plagiarism detection. signature feature: a custom O(log n) segment-tree package that replays the leaderboard at any minute of any past contest — time travel, but auditable. deployed across Vercel/Render/Neon/Upstash with zero-downtime graceful shutdown.",
  },
  {
    id: "citadel",
    title: "Citadel",
    flag: "Meta PyTorch × Scaler OpenEnv Hackathon (Top 100)",
    stamp: "TOP 100",
    live: "https://huggingface.co/spaces/Astro-Dude/citadel",
    code: "https://github.com/Astro-Dude/citadel",
    tech: ["Python", "PyTorch", "GRPO reinforcement learning", "Qwen2.5-3B", "Docker"],
    logline: "two agents keeping each other honest.",
    dossier:
      "two LLM agents doing security incident response and keeping each other honest: a Commander proposes actions, an Oversight agent approves/revises/vetoes through a structured critique protocol under governance constraints. both agents trained with GRPO on Qwen2.5-3B, reward curves improved across 100 training steps.",
  },
  {
    id: "typeahead",
    title: "TypeAhead",
    stamp: "SHIPPED",
    code: "https://github.com/dobbydobap/TypeAheadHLD",
    tech: ["Python", "FastAPI", "Redis", "SQLite"],
    logline: "search-as-you-type, built to survive production.",
    dossier:
      "search-as-you-type built like it must survive production: Redis cache sharded across 3 nodes on a consistent-hash ring, in-memory trie for top-K suggestions, a batched async writer collapsing thousands of db writes into a handful. benchmarked at p50/p95/p99 with cache-hit-rate instrumentation.",
  },
  {
    id: "cadenza",
    title: "Cadenza",
    flag: "Google Antigravity Hackathon 2026",
    stamp: "SHIPPED",
    code: "https://github.com/dobbydobap/Cadenza",
    tech: [
      "Next.js",
      "Gemini 2.5",
      "Google Cloud Run",
      "Firestore",
      "9 Google Cloud services",
    ],
    logline: "a sales agent that haunts your google calendar, benevolently.",
    dossier:
      "a sales agent that haunts your google calendar, benevolently: 30 minutes before every meeting it researches the prospect on the live web and emails a source-cited brief. event-driven, zero manual invocation.",
  },
  {
    id: "automationagent",
    title: "AutomationAgent",
    stamp: "LIVE",
    live: "https://varshitha2007899-automationagent.hf.space",
    code: "https://github.com/dobbydobap/AutomationAgent",
    tech: ["Python", "Playwright", "FastAPI", "Docker"],
    logline: "a poltergeist you can hire.",
    dossier:
      "\"a poltergeist you can hire\": drives a real Chromium browser with coordinate-based mouse/keyboard events, finds form fields through the accessibility tree, streams every action and screenshot to a live dashboard. hybrid planner: deterministic heuristic + optional LLM loop.",
  },
  {
    id: "speedtest",
    title: "SPEED/TEST",
    stamp: "LIVE",
    live: "https://speedcheck-1mi.pages.dev",
    code: "https://github.com/dobbydobap/speed.com",
    tech: ["React", "Vite", "TypeScript", "Cloudflare Pages"],
    logline: "an internet speed test that doesn't try to sell you a VPN.",
    dossier:
      "an internet speed test that doesn't try to sell you a VPN: download, upload, ping, jitter, bufferbloat, measured against Cloudflare's edge with zero backend and a hand-rolled SVG speedometer.",
  },
];
