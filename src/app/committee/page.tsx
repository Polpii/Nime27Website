import type { Metadata } from "next";
import { committee, vacantRoles } from "@/content/committee";
import { conference } from "@/content/site";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Committee",
  description: `The people organising ${conference.name} in ${conference.city}.`,
};

/**
 * First word of a name, which is the given name for everyone on this page.
 *
 * The lists are sorted on this, descending. Any consistent order would do:
 * the point the general chairs made is that an inconsistent one reads as a
 * ranking by seniority or by who did the most work. Reverse was asked for so
 * that the end of the alphabet is not always last, and given name rather than
 * surname is the later of the two things they asked for.
 */
function sortKey(m: { name: string }) {
  return m.name.trim().split(/\s+/)[0];
}

export default function CommitteePage() {
  const total = committee.reduce((n, g) => n + g.members.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Organisation"
        title="Committee"
        intro={`${conference.name} is organised by a committee working with the international NIME steering committee. ${total} people are on the committee so far, and several roles are still open.`}
      />

      <Container className="py-16 lg:py-24">
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {committee.map((group) => (
            <section key={group.title}>
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-teal">
                  {group.title}
                </h2>
                {group.email && (
                  <a
                    href={`mailto:${group.email}`}
                    className="link-underline mt-1.5 inline-block text-[13px] text-brume hover:text-neon-teal"
                  >
                    {group.email}
                  </a>
                )}
              </div>
              <ul className="mt-5 space-y-4">
                {[...group.members]
                  .sort((a, b) => sortKey(b).localeCompare(sortKey(a), "en"))
                  .map((m) => (
                  <li key={m.name}>
                    <p className="font-display text-lg leading-tight text-craie">
                      {m.name}
                    </p>
                    {m.affiliation && (
                      <p className="mt-0.5 text-[14px] leading-snug text-brume">
                        {m.affiliation}
                      </p>
                    )}
                  </li>
                ))}
                {group.vacancies ? (
                  <li className="text-[14px] italic text-brume">
                    {group.vacancies} {group.vacancies === 1 ? "place" : "places"} still open
                  </li>
                ) : null}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 max-w-2xl space-y-6">
          <h2 className="font-display text-2xl text-craie">Roles still open</h2>
          <p className="text-[17px] leading-[1.75] text-brume">
            The following roles have nobody appointed yet. If you would like to help with
            one of them, write to the general chairs.
          </p>
          <ul className="ml-1 space-y-2 border-l border-white/10 pl-6">
            {vacantRoles.map((r) => (
              <li key={r} className="relative text-[16px] text-brume">
                <span
                  className="absolute -left-[25px] top-[10px] h-[5px] w-[5px] rotate-45 bg-neon-or"
                  aria-hidden="true"
                />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
