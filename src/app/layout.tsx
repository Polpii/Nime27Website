import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { conference } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const description = `${conference.seriesName} ${conference.fullName}. ${conference.dates}, ${conference.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(conference.origin),
  alternates: { canonical: "/" },
  title: {
    default: `${conference.name} — ${conference.fullName} — ${conference.city}`,
    template: `%s — ${conference.name}`,
  },
  description,
  openGraph: {
    title: `${conference.name} — ${conference.city}`,
    description,
    url: conference.origin,
    siteName: conference.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000002",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variables must land on :root — the @theme tokens that reference
    // them are declared there, and a var() only resolves in its own scope.
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-neon-teal focus:px-4 focus:py-2 focus:text-nuit"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
