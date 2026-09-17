import type { Metadata } from "next";
import { conference } from "@/content/site";
import { Container, PageHero, Provisional } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach the ${conference.edition} organising committee.`,
};

const addresses = [
  { role: "General enquiries", email: "contact@nime2027.org" },
  { role: "Papers", email: "papers@nime2027.org" },
  { role: "Music", email: "music@nime2027.org" },
  { role: "Workshops", email: "workshops@nime2027.org" },
  { role: "alt.nime", email: "altnime@nime2027.org" },
  { role: "Student Consortium", email: "consortium@nime2027.org" },
  { role: "Student Volunteers", email: "volunteers@nime2027.org" },
  { role: "Registration", email: "registration@nime2027.org" },
  { role: "Accessibility", email: "access@nime2027.org" },
  { role: "Press", email: "press@nime2027.org" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        intro="Questions about a track go to that track's chairs — they will get a faster answer than the general address."
      />

      <Container className="py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold">Who to write to</h2>
            <ul className="mt-8 border-t border-pierre">
              {addresses.map((a) => (
                <li
                  key={a.email}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-pierre py-4"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-toit">
                    {a.role}
                  </span>
                  <a
                    href={`mailto:${a.email}`}
                    className="link-underline text-[15px] text-plaque"
                  >
                    {a.email}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Provisional>
                These addresses are planned but not all of them are live yet. Until they
                are, use{" "}
                <a href={`mailto:${conference.email}`} className="underline">
                  {conference.email}
                </a>
                .
              </Provisional>
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold">Stay informed</h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-encre/80">
                Announcements — the call for contributions, registration opening, the
                programme — are posted on the NIME forum and circulated on the NIME
                mailing list.
              </p>
              <ul className="mt-6 space-y-2.5">
                <li>
                  <a
                    href="https://forum.nime.org"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-[15px] text-plaque"
                  >
                    forum.nime.org
                  </a>
                </li>
                <li>
                  <a
                    href="https://nime.org"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-[15px] text-plaque"
                  >
                    nime.org
                  </a>
                </li>
              </ul>
            </div>

            <div className="border border-pierre bg-craie-2 p-7">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
                Conference
              </h3>
              <p className="mt-4 font-display text-2xl font-bold leading-snug">
                {conference.edition}
                <br />
                <span className="italic text-plaque">{conference.city}</span>
              </p>
              <p className="mt-4 text-sm text-encre/70">{conference.dates}</p>
              <p className="text-sm text-encre/70">{conference.location}</p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
