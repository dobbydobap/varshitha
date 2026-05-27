"use client";

// The investigator's light. The PointerProvider already writes --flash-x/y to
// :root on every move, so the scrim + glow + spectral mask are pure CSS driven
// by those vars — this component only renders the layers and the marginalia.
// On coarse pointers the scrim hides (revealed via .touch-reveal on hold).

import { usePointer } from "@/lib/pointer";

const NOTES: { top: string; left?: string; right?: string; text: string }[] = [
  { top: "18%", left: "3%", text: "// evidence tag #001: the cursor is a torch. move it." },
  { top: "44%", right: "3%", text: "root cause, so far, has always been a race condition." },
  { top: "68%", left: "4%", text: "she left claw marks on this margin." },
  { top: "84%", right: "4%", text: "the logs are useless. that's why you're here." },
  { top: "31%", right: "6%", text: "paw print recovered from the scene →  ᜎ" },
];

export function FlashlightCursor() {
  const { isTouch } = usePointer();
  return (
    <>
      {!isTouch && <div className="flashlight-scrim" aria-hidden />}
      <div className="flashlight-glow" aria-hidden />
      <div className="spectral-layer" aria-hidden>
        {NOTES.map((n, i) => (
          <p
            key={i}
            className="spectral-note"
            style={{ top: n.top, left: n.left, right: n.right }}
          >
            {n.text}
          </p>
        ))}
      </div>
    </>
  );
}
