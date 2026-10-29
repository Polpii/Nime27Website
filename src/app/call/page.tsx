import type { Metadata } from "next";
import Link from "next/link";
import { conference, deadlines, themeText, tracks } from "@/content/site";
import { Card, Container, PageHero } from "@/components/ui";

const inlineLink = "text-neon-teal underline underline-offset-4 hover:text-neon-or";

export const metadata: Metadata = {
  title: "Call for Contributions",
  description:
    "All the ways to contribute to NIME 2027 in Paris, grouped around two deadlines: peer reviewed tracks close 31 January 2027, juried tracks close 4 April 2027.",
};

/**
 * The split between peer reviewed and juried is the thing a reader most needs
 * to get right, because it decides their deadline. It leads the page rather
 * than hiding inside each individual call.
 */
const groups = [
  {
    key: "peer-reviewed" as const,
    title: "Peer reviewed",
    deadline: deadlines.peerReviewed,
    note: "Every submission receives double-blind peer review by at least three reviewers, and a meta-reviewer leads the discussion, writes a summary review and recommends a decision. Metadata are due one week earlier, on Sunday 24 January 2027.",
  },
  {
    key: "juried" as const,
    title: "Juried",
    deadline: deadlines.juried,
    note: "Juried tracks are selected by a jury rather than through peer review. Jurors give brief assessments and the track chairs make the final decision, so authors may expect lighter feedback than a peer reviewed track provides.",
  },
];

export default function CallPage() {
  return (
    <>
      <PageHero
        eyebrow="NIME 2027"
        title="Call for Contributions"
        intro="Whether you’re a researcher, musician, artist, instrument builder, or simply exploring new ways to make music, we’d love to see your contribution at the conference. There are many ways to get involved, grouped around two main deadlines."
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

        <p className="mt-10 max-w-2xl text-[16px] leading-relaxed text-brume">
          The steps that are the same whichever track you choose are on{" "}
          <Link href="/call/submission-instructions" className={inlineLink}>
            submission instructions
          </Link>
          . Every deadline is on <Link href="/call/key-dates" className={inlineLink}>key dates</Link>.
        </p>

        {/* Reviewing used to be reachable only from the navigation dropdown,
            which is the one place a prospective author is not looking. */}
        <section className="mt-20 border-t border-white/10 pt-14">
          <h2 className="font-display text-3xl text-craie">Review for NIME 2027</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-brume">
            Every peer reviewed submission gets three reviews from peer experts and a meta
            review from an experienced member of the community. That only works if enough
            people volunteer, so we ask everyone who submits to review as well. Reviewing
            runs through February 2027.
          </p>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-brume">
            Sign up on the{" "}
            <Link href="/call/reviewing" className={inlineLink}>
              reviewing page
            </Link>
            .
          </p>
        </section>
      </Container>
    </>
  );
}
