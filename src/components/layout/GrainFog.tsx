"use client";

// The single canvas layer: animated film grain. Fog is CSS (.fog). Both are
// killed under reduced motion. Grain redraws at ~12fps (cheap, transform/paint
// free) from a small tiled noise buffer scaled up.

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function GrainFog() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // small noise tile, scaled up by CSS — cheap.
    const S = 128;
    canvas.width = S;
    canvas.height = S;
    let raf = 0;
    let last = 0;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 83) return; // ~12fps
      last = t;
      const img = ctx.createImageData(S, S);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <>
      <div className="fog" aria-hidden />
      <canvas
        ref={ref}
        aria-hidden
        className="grain-canvas"
        style={{ imageRendering: "pixelated" }}
      />
    </>
  );
}
