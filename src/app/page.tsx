import { Hero } from "@/components/sections/Hero";
import { Investigation } from "@/components/sections/Investigation";
import { CaseFiles } from "@/components/sections/CaseFiles";
import { Evidence } from "@/components/sections/Evidence";
import { SeanceRoom } from "@/components/sections/SeanceRoom";
import { Equipment } from "@/components/sections/Equipment";
import { ReportAHaunting } from "@/components/sections/ReportAHaunting";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Investigation />
      <CaseFiles />
      <Evidence />
      <SeanceRoom />
      <Equipment />
      <ReportAHaunting />
    </main>
  );
}
