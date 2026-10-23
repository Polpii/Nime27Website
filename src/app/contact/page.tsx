import type { Metadata } from "next";
import { conference } from "@/content/site";
import { Container, PageHero, Provisional } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach the ${conference.name} organising committee.`,
};

/**
 * Only addresses that actually exist on the domain. Every track address
 * forwards to that track's confirmed chairs. Roles with no chair appointed
 * yet (registration, proceedings, student volunteers, CMT) deliberately have
 * no address: one that bounces is worse than none, so that mail goes to the
 * general chairs instead.
 */
const addresses = [
  { role: "General enquiries", email: "general-chairs@nime2027.org" },
  { role: "Papers", email: "papers@nime2027.org" },
  { role: "Music / Performance", email: "music@nime2027.org" },
  { role: "Art / Installations", email: "installations@nime2027.org" },
  { role: "alt.nime", email: "alt.nime@nime2027.org" },
  { role: "Artifacts & Ideas", email: "artifacts@nime2027.org" },
  { role: "Workshops", email: "workshops@nime2027.org" },
  { role: "Doctoral Consortium", email: "student-consortium@nime2027.org" },
  { role: "Accessibility", email: "access@nime2027.org" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        intro="Questions about a track go to that track's chairs. They will get you a faster answer than the general address."
      />

      <Container className="py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl text-craie">Who to write to</h2>
            <ul className="mt-8 border-t border-white/10">
              {addresses.map((a) => (
                <li
                  key={a.email}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/10 py-4"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brume">
                    {a.role}
                  </span>
                  <a
                    href={`mailto:${a.email}`}
                    className="link-underline text-[15px] text-neon-teal"
                  >
                    {a.email}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Provisional>
                Registration, proceedings, student volunteers and CMT have no chair
                appointed yet, so they have no address. Write to the general chairs and
                your message will reach the right person.
              </Provisional>
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="font-display text-2xl text-craie">Stay informed</h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-brume">
                Announcements are posted on the NIME forum and circulated on the NIME
                mailing list.
              </p>
              <ul className="mt-6 space-y-2.5">
                <li>
                  <a
                    href="https://forum.nime.org"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-[15px] text-neon-teal"
                  >
                    forum.nime.org
                  </a>
                </li>
                <li>
                  <a
                    href="https://nime.org"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-[15px] text-neon-teal"
                  >
                    nime.org
                  </a>
                </li>
              </ul>
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-teal">
                Conference
              </h3>
              <p className="mt-4 font-display text-2xl leading-snug text-craie">
                {conference.name}
                <br />
                <span className="italic text-neon-or">{conference.city}</span>
              </p>
              <p className="mt-4 text-sm text-brume">{conference.dates}</p>
              <p className="text-sm text-brume">
                {conference.venue}, {conference.host}
              </p>
              <p className="mt-1 text-sm text-brume">{conference.venueAddress}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-neon-or">
                Address to be confirmed
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
