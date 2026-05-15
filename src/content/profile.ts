// Identity & voice — facts verbatim from PORTFOLIO_BRIEF §2, §3, §7.

export const profile = {
  name: "Varshitha Sai Kolupuri",
  first: "Varshitha",
  role: "distributed systems · ai agents · full-stack engineering",
  location: "Bengaluru, India",
  education:
    "CS undergrad at Scaler School of Technology + BITS Pilani (concurrent degree) · Aug 2024 – 2028",
  email: "varshithakolupuri100@gmail.com",
  github: "https://github.com/dobbydobap",
  linkedin: "https://linkedin.com/in/varshitha-kolupuri",
  heroTagline: "distributed systems · ai agents · things that go bump in the runtime",
  // §3 governing metaphor
  investigation:
    "paranormal investigation is the same job as debugging — something impossible happened, nobody witnessed it, and the logs are useless. every haunting has a root cause. so far it has always been a race condition.",
  // §3 voice samples, free to reuse
  bio: "i build backend systems and ai agents — the kind of software where the hard part is invisible and the bugs only appear after midnight. conveniently, that's when i start working.",
} as const;

// §6 field work (leadership)
export const fieldWork = [
  {
    role: "UG Senpai (peer mentor)",
    org: "Scaler School of Technology",
    when: "Jul–Sep 2025",
    detail:
      "mentored 20+ incoming students; curated a DSA roadmap + project-starter pack reused across the batch",
  },
  {
    role: "Member, Leadership Development Committee",
    org: "",
    when: "May 2025 – Jan 2026",
    detail: "co-led initiatives reaching 200+ students",
  },
] as const;

// the QA lead — §3 recurring character
export const catCreed = {
  lines: [
    "the qa lead. reviews everything.",
    "has never once approved a pull request.",
  ],
  ascii: String.raw` /\_/\
( o.o )   the qa lead. reviews everything.
 > ^ <    has never once approved a pull request.`,
} as const;
