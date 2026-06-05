"use client";

// All the client-side "wow" layer, wrapped in the single PointerProvider so the
// flashlight, cat eyes, paw trail and ouija share one listener. Content is
// passed through untouched — the effects are additive and never wrap the DOM
// that carries the reading experience.

import type { ReactNode } from "react";
import { PointerProvider } from "@/lib/pointer";
import { GrainFog } from "./GrainFog";
import { FlashlightCursor } from "./FlashlightCursor";
import { PawPrintTrail } from "./PawPrintTrail";
import { EMFMeter } from "./EMFMeter";
import { QALeadCat } from "./QALeadCat";
import { KonamiCats } from "./KonamiCats";

export function EffectLayer({ children }: { children: ReactNode }) {
  return (
    <PointerProvider>
      <GrainFog />
      <FlashlightCursor />
      <PawPrintTrail />
      <EMFMeter />
      {children}
      <QALeadCat />
      <KonamiCats />
    </PointerProvider>
  );
}
