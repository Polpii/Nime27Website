import type { Metadata } from "next";
import { conference, deadlines, pendingCallsDue, themeText, tracks } from "@/content/site";
import { Card, Container, PageHero } from "@/components/ui";
import { inline } from "@/components/simple-page";
import { call } from "@/content/editable";

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
    note: call.peerReviewedNote,
  },
  {
    key: "juried" as const,
    title: "Juried",
    deadline: deadlines.juried,
    note: call.juriedNote,
  },
];

export default function CallPage() {
  return (
    <>
      <PageHero
        eyebrow="NIME 2027"
        title="Call for Contributions"
        intro={call.intro}
      />

      <Container className="py-16 lg:py-24">
        {/* The theme sat below the tracks, where a reader met the deadlines
            before learning what the conference is about. Paul asked for it to
            come first. */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neon-teal">
            Theme
          </p>
          <h2 className="mt-3 font-display text-3xl text-neon-purple sm:text-4xl">
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
            {call.themeNote}
          </p>
        </section>

        <div className="mt-20 space-y-20 border-t border-white/10 pt-14">
          {groups.map((group) => (
            <section key={group.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/10 pb-5">
                <h2 className="font-display text-3xl text-neon-purple">{group.title}</h2>
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
                      {!t.published && (
                        <span className="mt-3 block text-[12px] font-semibold uppercase tracking-[0.14em] text-neon-or">
                          Full call {pendingCallsDue}
                        </span>
                      )}
                    </Card>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-[16px] leading-relaxed text-brume">
          {inline(call.elsewhere, "elsewhere")}
        </p>

        {/* Reviewing used to be reachable only from the navigation dropdown,
            which is the one place a prospective author is not looking. */}
        <section className="mt-20 border-t border-white/10 pt-14">
          <h2 className="font-display text-3xl text-neon-purple">{call.reviewHeading}</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-brume">
            {call.reviewBody}
          </p>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-brume">
            {inline(call.reviewSignUp, "signup")}
          </p>
        </section>
      </Container>
    </>
  );
}
