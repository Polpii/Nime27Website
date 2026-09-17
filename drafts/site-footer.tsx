import Link from "next/link";
import { conference, nav } from "@/content/site";
import { ParisSkyline } from "@/components/paris";

const externalLinks = [
  { label: "NIME.org", href: "https://nime.org" },
  { label: "Proceedings archive", href: "https://nime.org/papers/" },
  { label: "NIME Forum", href: "https://forum.nime.org" },
  { label: "Previous edition — NIME 2026", href: "https://nime2026.org" },
];

export function SiteFooter() {
  const columns = nav.filter((n) => n.href !== "/");

  return (
    <footer className="relative mt-24 overflow-hidden bg-encre text-craie">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 text-craie/[0.05]">
        <ParisSkyline className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-3xl font-bold leading-none">
              NIME <span className="italic text-rouge">2027</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-craie/65">
              {conference.number} {conference.fullName}.
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-craie/50">
              {conference.dates}
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-craie/50">
              {conference.location}
            </p>
            <a
              href={`mailto:${conference.email}`}
              className="link-underline mt-6 inline-block text-sm text-or"
            >
              {conference.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-craie/45">
                Conference
              </h2>
              <ul className="mt-4 space-y-2.5">
                {columns.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline text-sm text-craie/80">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-craie/45">
                Submit
              </h2>
              <ul className="mt-4 space-y-2.5">
                {(nav.find((n) => n.label === "Submissions")?.children ?? []).map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="link-underline text-sm text-craie/80">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-craie/45">
                Community
              </h2>
              <ul className="mt-4 space-y-2.5">
                {externalLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline text-sm text-craie/80"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-craie/15 pt-6 text-[11px] text-craie/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026–2027 {conference.edition}. All content on this site is provisional.</p>
          <p className="uppercase tracking-[0.18em]">{conference.domain}</p>
        </div>
      </div>
    </footer>
  );
}
