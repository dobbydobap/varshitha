import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, fieldWork, catCreed } from "@/content/profile";

export function ReportAHaunting() {
  const contacts = [
    { label: "email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "github", value: "github.com/dobbydobap", href: profile.github },
    { label: "linkedin", value: "in/varshitha-kolupuri", href: profile.linkedin },
  ];
  return (
    <section id="report" className="px-5 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="found a bug in reality?" title="report a haunting" />

        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <ul className="space-y-4">
              {contacts.map((c) => (
                <li key={c.label} className="border-t border-white/10 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-rose-deep">
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="font-display text-xl text-bone transition-colors [overflow-wrap:anywhere] hover:text-rose sm:text-3xl"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>

            {/* field work */}
            <div className="mt-12">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ash">
                field work
              </p>
              <ul className="space-y-3">
                {fieldWork.map((f) => (
                  <li key={f.role} className="font-body text-sm text-ash">
                    <span className="text-bone">{f.role}</span>
                    {f.org && <span> · {f.org}</span>} <span className="text-ash/70">({f.when})</span>
                    <br />
                    <span className="text-ash/80">{f.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* the ASCII cat sign-off */}
          <div className="flex min-w-0 flex-col justify-end overflow-x-auto">
            <pre
              className="whitespace-pre font-mono text-[13px] leading-tight text-rose-soft sm:text-base"
              aria-label={`${catCreed.lines[0]} ${catCreed.lines[1]}`}
            >
              {catCreed.ascii}
            </pre>
          </div>
        </div>

        <footer className="mt-20 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-widest text-ash sm:flex-row">
          <span>{profile.name} · {profile.education}</span>
          <span>every haunting has a root cause.</span>
        </footer>
      </div>
    </section>
  );
}
