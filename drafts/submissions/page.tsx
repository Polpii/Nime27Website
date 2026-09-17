import type { Metadata } from "next";
import { importantDates, tracks } from "@/content/site";
import { Card, Container, PageHero, Provisional } from "@/components/ui";

export const metadata: Metadata = {
  title: "Submissions",
  description:
    "All the ways to contribute to NIME 2027 in Paris: papers, music, workshops, alt.nime and the Student Consortium.",
};

export default function SubmissionsPage() {
  const deadlines = importantDates.filter((d) => d.kind !== "event");

  return (
    <>
      <PageHero
        eyebrow="Call for contributions"
        title="Submissions"
        intro="NIME 2027 invites contributions across research, music and community formats. Each track has its own call, its own reviewers and its own deadline."
      />

      <Container className="py-16 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <Card key={t.href} href={t.href} title={t.title}>
              {t.blurb}
            </Card>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold">Before you submit</h2>
            <p className="text-[17px] leading-[1.75] text-encre/80">
              Paper and music submissions must be completely anonymised, including
              authors, references, and specific project names that can clearly identify
              the author(s). Work cannot already be under review elsewhere, or be
              submitted for a second review elsewhere while under review for NIME.
            </p>
            <p className="text-[17px] leading-[1.75] text-encre/80">
              All contributions go through peer review. Papers receive at least three
              reviews and a meta-review; music and workshop proposals are assessed by
              their respective committees. Reviewing is double-blind.
            </p>
            <Provisional />
          </div>

          <aside className="h-fit border border-pierre bg-craie-2 p-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
              Deadlines
            </h2>
            <ul className="mt-6 space-y-4">
              {deadlines.map((d) => (
                <li key={d.label} className="border-b border-pierre pb-4 last:border-0 last:pb-0">
                  <p className="font-display text-lg font-bold text-encre">{d.date}</p>
                  <p className="mt-1 text-sm leading-relaxed text-encre/70">{d.label}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-zinc-toit">
              All deadlines 23:59 AoE
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
