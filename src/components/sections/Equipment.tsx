import { SectionHeading } from "@/components/ui/SectionHeading";
import { equipment } from "@/content/equipment";

export function Equipment() {
  return (
    <section id="equipment" className="px-5 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="the investigator's kit" title="equipment" />
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((group) => (
            <div key={group.label} className="border-t border-white/10 pt-4">
              <dt className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-rose-deep">
                {group.label}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-white/10 bg-ink-2 px-2.5 py-1 font-mono text-[12px] text-bone/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
