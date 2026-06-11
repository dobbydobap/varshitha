import { caseFiles } from "@/content/casefiles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Dossier } from "./Dossier";

export function CaseFiles() {
  return (
    <section id="case-files" className="px-5 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="exhibits 01–06" title="case files" cat />
        <p className="-mt-6 mb-4 max-w-xl font-body text-ash">
          six investigations. every haunting had a root cause. the root cause was
          shipped.
        </p>
        <div>
          {caseFiles.map((file, i) => (
            <Dossier key={file.id} file={file} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
