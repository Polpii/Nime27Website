import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio",
  // Not a page of the conference site. Keep it out of search results even
  // though nothing links to it.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The studio reads the session cookie on every request, so none of it can be
 * prerendered or cached.
 */
export const dynamic = "force-dynamic";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-nuit">{children}</div>;
}
