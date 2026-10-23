import type { Metadata } from "next";
import { conference, conferenceWeek, importantDates } from "@/content/site";
import { Container, PageHero, Provisional } from "@/components/ui";

export const metadata: Metadata = {
  title: "Programme",
  description: `The shape of the week and the key dates for ${conference.name}, ${conference.dates} in ${conference.city}.`,
};

const kindStyle = {
  deadline: "text-neon-or",
  event: "text-neon-rose",
  info: "text-craie",
} as const;

export default function ProgrammePage() {
  return (
    <>
      <PageHero
        eyebrow="Conference"
        title="Programme"
        intro={`${conference.dates} in ${conference.city}. The detailed session programme is published after the decisions go out, but the shape of the week and the dates that matter are settled.`}
      />

      <Container className="py-16 lg:py-24">
        <section>
          <h2 className="font-display text-3xl font-bold text-craie">The week</h2>
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
                <p className="mt-1 font-display text-xl font-bold text-neon-teal">
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
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-bold text-craie">Key dates</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.75] text-brume">
            All submission deadlines are 23:59 Anywhere on Earth.
          </p>

          <div className="mt-10 border-t border-white/10">
            {importantDates.map((d) => (
              <div
                key={`${d.date}-${d.label}`}
                className="grid grid-cols-1 gap-1 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[260px_1fr] sm:gap-8"
              >
                <p className={`font-display text-lg font-bold ${kindStyle[d.kind]}`}>
                  {d.date}
                </p>
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="text-[16px] text-brume">{d.label}</p>
                  {d.kind === "deadline" && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brume">
                      23:59 AoE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-2xl">
            <Provisional>
              Keynotes, the session programme and the venue for each day are not settled
              yet. The dates and the shape of the week on this page are confirmed.
            </Provisional>
          </div>
        </section>
      </Container>
    </>
  );
}
