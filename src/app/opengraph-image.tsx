import { ImageResponse } from "next/og";

export const alt = "Varshitha Sai Kolupuri — distributed systems · ai agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Themed OG card — "a victorian ghost hunter with a pink neon sign." Flexbox +
// inline styles only (next/og constraint); serif fallback keeps it in-theme
// without shipping font bytes.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background:
            "radial-gradient(900px 500px at 50% -10%, #1a1016, #0a0a0c)",
          color: "#f5f0f0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontFamily: "monospace", fontSize: 24, letterSpacing: 6, color: "#fb6f92" }}>
          CASE FILE · BENGALURU
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 900,
              lineHeight: 0.9,
              color: "#ffafcc",
              textShadow: "0 0 40px rgba(251,111,146,0.5)",
            }}
          >
            Varshitha
          </div>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 900, lineHeight: 0.9 }}>
            Kolupuri
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 30,
            color: "#9b9298",
          }}
        >
          distributed systems · ai agents · things that go bump in the runtime
        </div>
      </div>
    ),
    { ...size }
  );
}
