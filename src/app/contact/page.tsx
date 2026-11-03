import type { Metadata } from "next";
import { conference } from "@/content/site";
import { contact } from "@/content/editable";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach the ${conference.name} organising committee.`,
};


export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        intro={contact.intro}
      />

      <Container className="py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl text-neon-purple">Who to write to</h2>
            <ul className="mt-8 border-t border-white/10">
              {contact.addresses.map((a) => (
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
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="font-display text-2xl text-neon-purple">Stay informed</h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-brume">
                {contact.stayNote}
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
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
