import Image from "next/image";
import { conference } from "@/content/site";
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
          src="/logoNime27.png"
          alt={`${conference.name} — ${conference.city}`}
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 640px) 92vw, 470px"
          className="mt-4 h-auto w-[92vw] max-w-[470px]"
        />

        <p className="-mt-2 text-balance text-[10px] font-medium uppercase tracking-[0.12em] text-brume min-[360px]:tracking-[0.18em] sm:text-[11px] sm:tracking-[0.28em]">
          {conference.seriesName}
        </p>

        <h1 className="mt-4 max-w-3xl font-display text-[1.5rem] leading-[1.15] font-bold min-[360px]:text-[1.9rem] sm:text-5xl lg:text-[3.4rem]">
          New Interfaces for
          <br />
          Musical Expression
        </h1>

        <p className="mt-11 font-display text-[1.75rem] leading-none font-bold text-neon-or glow-or min-[360px]:text-4xl sm:text-6xl lg:text-7xl">
          {conference.dates}
        </p>

        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.3em] text-neon-rose sm:text-sm">
          {conference.location}
        </p>

        <p className="mt-14 max-w-xl text-[15px] leading-[1.8] text-brume sm:text-base">
          NIME gathers researchers and musicians from all over the world to share their
          knowledge and late-breaking work on new musical interface design. The conference
          began as a workshop at the Conference on Human Factors in Computing Systems
          (CHI) in 2001, and has been held annually around the world ever since.
        </p>

        <p className="mt-10 max-w-md text-[13px] leading-relaxed text-brume/65">
          Further details, including the call for contributions, will be announced in due
          course.
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

      <footer className="relative z-20 bg-gradient-to-t from-nuit via-nuit/85 to-transparent pb-7 pt-14 text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-brume/70">
          {conference.domain}
          <span className="mx-3 text-brume/30">·</span>
          <a
            href="https://nime.org"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-neon-teal"
          >
            nime.org
          </a>
        </p>
      </footer>
    </main>
  );
}
