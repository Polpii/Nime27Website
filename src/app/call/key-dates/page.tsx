import type { Metadata } from "next";
import { conference, importantDates } from "@/content/site";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Key dates",
  description: `Every deadline for ${conference.name}, from the call opening to the conference itself.`,
};

const kindStyle = {
  deadline: "text-neon-or",
  event: "text-neon-rose",
  info: "text-neon-purple",
} as const;

/**
 * These dates used to sit at the bottom of the programme page, where Paul
 * found them out of place: someone opening "Programme" wants the shape of the
 * week, and someone hunting a deadline is reading the calls. They live under
 * Call now.
 */
export default function KeyDatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Call"
        title="Key dates"
        intro="Every date for every track, from the call opening to the conference itself. All submission deadlines are 23:59 Anywhere on Earth."
      />

      <Container className="py-16 lg:py-24">
        <div className="border-t border-white/10">
          {importantDates.map((d) => (
            <div
              key={`${d.date}-${d.label}`}
              className="grid grid-cols-1 gap-1 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[260px_1fr] sm:gap-8"
            >
              <p className={`font-display text-lg ${kindStyle[d.kind]}`}>{d.date}</p>
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

        <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-brume">
          Each call carries its own dates as well. Where a call and this page differ, the
          call is the one to follow.
        </p>
      </Container>
    </>
  );
}
