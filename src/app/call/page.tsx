import type { Metadata } from "next";
import { conference, deadlines, themeText, tracks } from "@/content/site";
import { Card, Container, PageHero, Provisional } from "@/components/ui";

export const metadata: Metadata = {
  title: "Call for Contributions",
  description:
    "All the ways to contribute to NIME 2027 in Paris, grouped around two deadlines: peer reviewed tracks close 31 January 2027, curated tracks close 4 April 2027.",
};

/**
 * The split between peer reviewed and curated is the thing a reader most needs
 * to get right, because it decides their deadline. It leads the page rather
 * than hiding inside each individual call.
 */
const groups = [
  {
    key: "peer-reviewed" as const,
    title: "Peer reviewed",
    deadline: deadlines.peerReviewed,
    note: "Reviewed by the track committees. Titles, abstracts and authors are due a week earlier, on Sunday 24 January 2027.",
  },
  {
    key: "curated" as const,
    title: "Curated",
    deadline: deadlines.curated,
    note: "Selected by the track chairs rather than through peer review.",
  },
];

export default function CallPage() {
  return (
    <>
      <PageHero
        eyebrow="NIME 2027"
        title="Call for Contributions"
        intro="Whether you are a researcher, musician, artist, instrument builder or simply exploring new ways to make music, we would love to see your contribution at the conference. There are many ways to get involved, grouped around two main deadlines."
      />

      <Container className="py-16 lg:py-24">
        <div className="space-y-20">
          {groups.map((group) => (
            <section key={group.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/10 pb-5">
                <h2 className="font-display text-3xl text-craie">{group.title}</h2>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-neon-or">
                  Due {group.deadline}
                  <span className="ml-2 text-brume">23:59 AoE</span>
                </p>
              </div>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-brume">
                {group.note}
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tracks
                  .filter((t) => t.group === group.key)
                  .map((t) => (
                    <Card key={t.href} href={t.href} title={t.title}>
                      {t.blurb}
                    </Card>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-20 border-t border-white/10 pt-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neon-teal">
            Theme
          </p>
          <h2 className="mt-3 font-display text-3xl text-craie sm:text-4xl">
            {conference.theme}
          </h2>
          <div className="mt-6 max-w-2xl space-y-5">
            {themeText.map((para) => (
              <p key={para.slice(0, 40)} className="text-[17px] leading-[1.75] text-brume">
                {para}
              </p>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[15px] text-brume">
            Engaging with the theme is welcome but optional. Work on any NIME topic is
            reviewed by the same criteria.
          </p>
        </section>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-craie">Before you submit</h2>
            <p className="text-[17px] leading-[1.75] text-brume">
              Peer reviewed submissions must be completely anonymised, including authors,
              references, and specific project names that can clearly identify the
              author(s). Work cannot already be under review elsewhere, or be submitted
              for a second review elsewhere while under review for NIME.
            </p>
            <p className="text-[17px] leading-[1.75] text-brume">
              Submissions are handled through CMT. The submission system opens in December
              2026 for the peer reviewed tracks, and in March 2027 for the curated ones.
            </p>
            <Provisional>
              The individual calls are still being finalised by the track chairs, and the
              CMT submission link does not exist yet. The deadlines and the track list on
              this page are confirmed.
            </Provisional>
          </div>

          <aside className="h-fit border border-white/10 bg-white/[0.03] p-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-teal">
              Both deadlines
            </h2>
            <dl className="mt-6 space-y-5">
              {groups.map((g) => (
                <div key={g.key} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brume">
                    {g.title}
                  </dt>
                  <dd className="mt-1 font-display text-lg text-craie">
                    {g.deadline}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-brume">
              All deadlines 23:59 AoE
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
