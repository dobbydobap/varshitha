"use client";

// A working paranormal terminal. Type commands; it answers. `investigate <case>`
// scrolls to that dossier, `summon cat` triggers the parade (reused event),
// plus whois / logs / help and a few secret commands. It's a real <input>, so
// it's keyboard-accessible by construction; the log is an aria-live region.

import { useEffect, useRef, useState } from "react";
import { caseFiles } from "@/content/casefiles";
import { profile } from "@/content/profile";

type Line = { id: number; text: string; tone?: "in" | "err" | "ok" | "ghost" };

const BOOT: Line[] = [
  { id: 0, text: "séance terminal v3.1.0 — connection to the other side: established", tone: "ghost" },
  { id: 1, text: "type 'help'. the cat is watching.", tone: "ghost" },
];

const HAUNTED_LOGS = [
  "[00:00:00] INFO  medium: warming up the planchette",
  "[00:03:12] WARN  cold spot detected in /var/log — 2.3°C",
  "[00:03:13] ERROR unhandled apparition at 0xDEADBEEF",
  "[00:03:13] INFO  retrying... (attempt 1/∞)",
  "[00:12:41] WARN  the door opened by itself (exit code 0)",
  "[00:12:42] DEBUG root cause: race condition (it's always a race condition)",
  "[00:13:00] INFO  QA lead reviewed the incident. verdict: 'no.'",
  "[03:00:00] FATAL she's behind you",
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState("");
  const idRef = useRef(BOOT.length);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = (text: string, tone?: Line["tone"]) =>
    setLines((prev) => [...prev, { id: idRef.current++, text, tone }]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    push(`visitor@séance:~$ ${raw}`, "in");
    if (!cmd) return;

    const [verb, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");

    switch (verb) {
      case "help":
        push("available rituals:", "ok");
        push("  investigate <case>   open a case file (rankforge, citadel, typeahead, cadenza, automationagent, speedtest)");
        push("  summon cat           call the QA lead");
        push("  whois varshitha      the dossier on the investigator");
        push("  logs                 tail the haunted server logs");
        push("  ls                   list the rooms of this site");
        push("  clear                wipe the séance");
        push("  (there are a few commands not on this list.)", "ghost");
        break;
      case "investigate": {
        const hit = caseFiles.find((c) => c.id === arg || c.title.toLowerCase() === arg);
        if (!hit) {
          push(`no case file named '${arg}'. try one of: ${caseFiles.map((c) => c.id).join(", ")}`, "err");
          break;
        }
        push(`opening case file: ${hit.title} — “${hit.logline}”`, "ok");
        document.getElementById(`case-${hit.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
      case "summon": {
        if (arg === "cat" || arg === "the cat" || arg === "qa lead") {
          push("summoning the QA lead. she was already here.", "ok");
          window.dispatchEvent(new Event("cats:parade"));
        } else push(`can't summon '${arg}'. try 'summon cat'.`, "err");
        break;
      }
      case "whois": {
        if (arg === "varshitha" || arg === "you") {
          push(profile.bio, "ok");
          push(`${profile.education}`, "ghost");
        } else push(`whois: '${arg}' not found in this plane.`, "err");
        break;
      }
      case "logs":
        HAUNTED_LOGS.forEach((l, i) => setTimeout(() => push(l, l.includes("FATAL") || l.includes("ERROR") ? "err" : "ghost"), i * 260));
        break;
      case "ls":
        push("top  investigation  case-files  evidence  seance  equipment  report", "ok");
        break;
      case "clear":
        setLines([]);
        idRef.current = 0;
        break;
      // --- secret commands ---
      case "sudo":
        push("visitor is not in the sudoers file. this incident has been reported (to the cat).", "err");
        break;
      case "exorcise":
      case "exorcism":
        push("scanning... no ghosts found. only race conditions. and one cat.", "ok");
        break;
      case "rm":
        push("the QA lead has never approved a deletion either. request denied.", "err");
        break;
      case "cat":
        push(" /\\_/\\", "ghost");
        push("( o.o )  reviews everything.", "ghost");
        push(" > ^ <   has never once approved a pull request.", "ghost");
        break;
      case "whoami":
        push("a visitor. possibly a recruiter. the cat is deciding.", "ok");
        break;
      case "hire":
        push(`excellent instinct. → ${profile.email}`, "ok");
        break;
      default:
        push(`command not found: ${verb}. type 'help'. (was it a race condition?)`, "err");
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-rose-deep/30 bg-black/70 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-blood/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-rose-soft/70" />
        <span className="ml-2 font-mono text-[11px] text-ash">séance — bash</span>
      </div>
      <div
        ref={scrollRef}
        aria-live="polite"
        className="min-h-64 flex-1 space-y-1 overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed sm:text-sm"
      >
        {lines.map((l) => (
          <p
            key={l.id}
            className={
              l.tone === "err"
                ? "text-blood"
                : l.tone === "ok"
                  ? "text-rose"
                  : l.tone === "in"
                    ? "text-bone"
                    : "text-ash"
            }
          >
            {l.text}
          </p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
          setValue("");
        }}
        className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
      >
        <span className="font-mono text-sm text-rose-deep">visitor@séance:~$</span>
        <label className="sr-only" htmlFor="seance-input">
          type a command for the séance terminal
        </label>
        <input
          id="seance-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="help"
          className="flex-1 bg-transparent font-mono text-sm text-bone caret-rose outline-none placeholder:text-ash/40"
        />
      </form>
    </div>
  );
}
