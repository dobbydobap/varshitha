import type { Metadata } from "next";
import { Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";
import { EffectLayer } from "@/components/layout/EffectLayer";

// self-hosted at build by next/font (no runtime requests to Google)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE = "https://varshitha.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Varshitha Sai Kolupuri — distributed systems · ai agents",
  description:
    "portfolio of varshitha sai kolupuri. distributed systems, ai agents, full-stack. debugging is paranormal investigation — every haunting has a root cause, and so far it's always been a race condition.",
  keywords: [
    "Varshitha Sai Kolupuri",
    "distributed systems",
    "ai agents",
    "backend engineer",
    "RankForge",
  ],
  authors: [{ name: "Varshitha Sai Kolupuri" }],
  openGraph: {
    title: "Varshitha Sai Kolupuri — things that go bump in the runtime",
    description:
      "distributed systems · ai agents · a poltergeist you can hire. every haunting has a root cause.",
    url: SITE,
    siteName: "the case files of varshitha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varshitha Sai Kolupuri",
    description: "distributed systems · ai agents · things that go bump in the runtime",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceMono.variable} scanlines h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#case-files" className="skip-link">
          skip to the case files
        </a>
        <EffectLayer>{children}</EffectLayer>
      </body>
    </html>
  );
}
