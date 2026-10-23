import Link from "next/link";
import { conference, nav } from "@/content/site";

const externalLinks = [
  { label: "NIME.org", href: "https://nime.org" },
  { label: "Proceedings archive", href: "https://nime.org/papers/" },
  { label: "NIME Forum", href: "https://forum.nime.org" },
  { label: "Previous edition — NIME 2026", href: "https://nime2026.org" },
];

export function SiteFooter() {
  const columns = nav.filter((n) => n.href !== "/");
  const callChildren = nav.find((n) => n.label === "Call")?.children ?? [];

  return (
    <footer className="mt-24 border-t border-white/10 bg-nuit">
      <div className="mx-auto max-w-5xl px-5 pb-12 pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-3xl leading-none text-craie">
              NIME <span className="italic text-neon-or">2027</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brume">
              {conference.seriesName} {conference.fullName}.
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-brume">
              {conference.dates}
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brume">
              {conference.location}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brume">
                Conference
              </h2>
              <ul className="mt-4 space-y-2.5">
                {columns.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-brume transition-colors hover:text-neon-teal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brume">
                Call
              </h2>
              <ul className="mt-4 space-y-2.5">
                {callChildren.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="text-sm text-brume transition-colors hover:text-neon-teal"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brume">
                Community
              </h2>
              <ul className="mt-4 space-y-2.5">
                {externalLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-brume transition-colors hover:text-neon-teal"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-brume sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026–2027 {conference.name}. All content on this site is provisional.</p>
          <p className="uppercase tracking-[0.18em]">{conference.domain}</p>
        </div>
      </div>
    </footer>
  );
}
