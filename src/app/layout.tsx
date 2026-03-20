import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";

/* ──────────────────────────────────────────────
   § Fonts — loaded via next/font for zero CLS
   Syne: Bold geometric display sans for headings
   DM Sans: Clean contemporary sans for body
   JetBrains Mono: For code/data elements
   ────────────────────────────────────────────── */

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

/* ──────────────────────────────────────────────
   § Metadata
   ────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: "AdFlux UX — Award-Winning Digital Experiences",
    template: "%s | AdFlux UX",
  },
  description:
    "AdFlux UX crafts high-performance, conversion-focused digital experiences that merge cutting-edge technology with elite design principles.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://adflux-ux.pages.dev"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AdFlux UX",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CustomCursor } from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="noise-overlay" />
        <CustomCursor />
        {/* Skip link for keyboard accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Global JSON-LD structured data */}
        <OrganizationSchema
          name="AdFlux UX"
          url="https://adflux-ux.pages.dev"
          description="Award-winning digital experience design and development studio."
          sameAs={["https://github.com/felipetdk7"]}
        />
        <WebSiteSchema
          name="AdFlux UX"
          url="https://adflux-ux.pages.dev"
          description="High-performance digital experiences with cutting-edge technology."
        />

        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
