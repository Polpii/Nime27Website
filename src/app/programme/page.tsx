import type { Metadata } from "next";
import Link from "next/link";
import { conference, conferenceWeek } from "@/content/site";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Programme",
  description: `The shape of the week and the key dates for ${conference.name}, ${conference.dates} in ${conference.city}.`,
};

export default function ProgrammePage() {
  return (
    <>
      <PageHero
        eyebrow="Conference"
        title="Programme"
        intro={`${conference.dates} in ${conference.city}. The detailed session programme is published after the decisions go out.`}
      />

      <Container className="py-16 lg:py-24">
        <section>
          <h2 className="font-display text-3xl text-craie">The week</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.75] text-brume">
            The published range covers the pre-conference activities. If you are booking
            travel, note that things start on the Monday, not on the Wednesday.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {conferenceWeek.map((day) => (
              <div
                key={day.date}
                className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brume">
                  {day.weekday}
                </p>
                <p className="mt-1 font-display text-xl text-neon-teal">
                  {day.date}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {day.items.map((i) => (
                    <li key={i} className="text-[14px] leading-snug text-brume">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-[16px] leading-relaxed text-brume">
            Every submission deadline is on{" "}
            <Link
              href="/call/key-dates"
              className="text-neon-teal underline underline-offset-4 hover:text-neon-or"
            >
              key dates
            </Link>
            .
          </p>
        </section>
      </Container>
    </>
  );
}
