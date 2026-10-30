import Image from "next/image";
import { conference, themeText } from "@/content/site";
import { ParisSkyline } from "@/components/paris";

export default function Home() {
  return (
    // The hero stays exactly the logo's own black (#000002). The logo PNG is
    // opaque with no alpha, so any glow or tint behind it would cut its square
    // out of the page as a visible tile.
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-nuit">
      <div className="relative z-20 flex flex-1 flex-col items-center px-5 pb-28 pt-12 text-center sm:pt-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-neon-teal glow-teal">
          Save the date
        </p>

        <Image
          src="/nime2027-logo.png"
          alt={`${conference.name} — ${conference.city}`}
          width={1600}
          height={1028}
          priority
          sizes="(max-width: 640px) 92vw, 560px"
          className="mt-6 h-auto w-[92vw] max-w-[560px]"
        />

        <p className="mt-9 text-balance text-[10px] font-medium uppercase tracking-[0.12em] text-brume min-[360px]:tracking-[0.18em] sm:text-[11px] sm:tracking-[0.28em]">
          {conference.seriesName}
        </p>

        <h1 className="mt-4 max-w-3xl font-display text-[1.5rem] leading-[1.15] min-[360px]:text-[1.9rem] sm:text-5xl lg:text-[3.4rem]">
          New Interfaces for
          <br />
          Musical Expression
        </h1>

        <p className="mt-11 font-display text-[1.75rem] leading-none text-neon-or glow-or min-[360px]:text-4xl sm:text-6xl lg:text-7xl">
          {conference.dates}
        </p>

        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.3em] text-neon-rose sm:text-sm">
          {conference.location}
        </p>

        {/*
         * The theme used to be a 12px label with the name inline, and its
         * paragraph was set exactly like the general blurb below it, so Paul
         * read the whole thing as a caption and asked twice for the theme to
         * be on the home page. It is given its own display-size line here,
         * one step under the dates, and the general blurb is dimmed so it
         * stops competing.
         */}
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-brume">
          Theme
        </p>

        <p className="mt-3 font-display text-[1.4rem] leading-tight text-neon-teal glow-teal min-[360px]:text-[1.7rem] sm:text-3xl lg:text-4xl">
          {conference.theme}
        </p>

        <p className="mt-6 max-w-2xl text-[16px] leading-[1.75] text-craie sm:text-[17px]">
          {themeText[0]}
        </p>

        {/*
         * Dimmed so it stops competing with the theme above, but only to 85%.
         * At 75% this paragraph measured 4.24:1 on the page background, under
         * the 4.5:1 that WCAG AA asks of text this size. 85% holds 5.24:1.
         */}
        <p className="mt-14 max-w-xl text-[15px] leading-[1.8] text-brume/85 sm:text-base">
          NIME gathers researchers and musicians from all over the world to share their
          knowledge and late-breaking work on new musical interface design. The conference
          began as a workshop at the Conference on Human Factors in Computing Systems
          (CHI) in 2001, and has been held annually around the world ever since.
        </p>

        <p className="mt-10 max-w-md text-[13px] leading-relaxed text-brume">
          The call for papers and participation will be published in{" "}
          <span className="font-semibold text-neon-teal">{conference.callOpens}</span>.
        </p>
      </div>

      {/* Paris rooftops, kept to a silhouette so they frame the page rather than
          compete with it. Tuned here rather than in the component so the skyline
          stays reusable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 text-[#0a1220] lg:h-56"
        style={{ ["--window-glow" as string]: "#6d4a14" }}
      >
        <ParisSkyline className="h-full w-full" />
      </div>

    </main>
  );
}
