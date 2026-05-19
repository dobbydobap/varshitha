// Equipment (skills) — styled as an investigator's kit. §6 verbatim.

export const equipment: { label: string; items: string[] }[] = [
  {
    label: "languages",
    items: ["C++", "Java", "Python", "TypeScript/JavaScript", "SQL"],
  },
  {
    label: "systems",
    items: [
      "distributed caching",
      "consistent hashing",
      "sharding",
      "message queues (BullMQ)",
      "async workers",
      "WebSockets",
      "latency benchmarking (p50/p95/p99)",
    ],
  },
  {
    label: "backend",
    items: ["Node.js", "NestJS", "FastAPI", "Express", "REST APIs"],
  },
  {
    label: "frontend",
    items: ["React", "Next.js"],
  },
  {
    label: "data",
    items: ["PostgreSQL", "Redis", "MongoDB", "SQLite"],
  },
  {
    label: "ai",
    items: [
      "PyTorch",
      "GRPO reinforcement learning",
      "LLM integration (Gemini, Claude, OpenAI)",
    ],
  },
  {
    label: "platforms",
    items: ["Linux", "Docker", "Git", "GCP", "Cloudflare", "Vercel"],
  },
];
