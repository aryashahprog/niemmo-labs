import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistPixelLine } from "geist/font/pixel/line";
import "./globals.css";
import { SITE_URL, asset } from "@/lib/site";

const inter = localFont({
  src: "../fonts/inter-latin-400-normal.woff2",
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
      className={`${GeistSans.variable} ${GeistPixelLine.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
