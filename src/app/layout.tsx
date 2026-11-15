import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, asset } from "@/lib/site";
import { REVEAL_BODY, REVEAL_HEAD } from "@/lib/reveal-script";

// Latin subsets of Geist and Inter (SIL OFL, see src/fonts/*-OFL.txt).
const geistSans = localFont({
  src: "../fonts/geist-sans-latin-var.woff2",
  weight: "100 900",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistPixel = localFont({
  src: "../fonts/geist-pixel-line-latin.woff2",
  weight: "500",
  variable: "--font-geist-pixel-line",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const inter = localFont({
  src: "../fonts/inter-latin-400-subset.woff2",
  weight: "400",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`),
  alternates: { canonical: "./" },
  title: {
    default: "Niemmo Labs — AI automation for small and midsize businesses",
    template: "%s — Niemmo Labs",
  },
  description:
    "We build and deploy AI automations around the way your business works. Less manual work. Smoother operations. More room to grow.",
  openGraph: {
    title: "Niemmo Labs",
    description:
      "We build and deploy AI automations around the way your business works.",
    type: "website",
    url: "./",
  },
  icons: { icon: asset("/icon.svg") },
};

export const viewport: Viewport = {
  themeColor: "#161616",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistPixel.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: REVEAL_HEAD,
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BODY }} />
      </body>
    </html>
  );
}
