import Link from "next/link";
import type { ReactNode } from "react";
import { Ferronnerie, MetroArch } from "@/components/paris";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rouge">{children}</p>
  );
}

/** Section wrapper with an optional Métro-arch numeral in the left gutter. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  tone = "craie",
}: {
  id?: string;
  index?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  tone?: "craie" | "stone" | "ink";
}) {
  const tones = {
    craie: "bg-craie text-encre",
    stone: "bg-craie-2 text-encre",
    ink: "bg-encre text-craie",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-20 lg:py-28`}>
      <Container>
        {(eyebrow || title) && (
          <header className="mb-12 grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
            {index && (
              <div className="relative hidden w-16 shrink-0 lg:block">
                <MetroArch
                  className={`h-[68px] w-[60px] ${tone === "ink" ? "text-or/45" : "text-vert/30"}`}
                />
                <span
                  className={`absolute inset-x-0 top-[30px] text-center font-display text-lg font-bold ${
                    tone === "ink" ? "text-or" : "text-vert"
                  }`}
                >
                  {index}
                </span>
              </div>
            )}
            <div className="max-w-3xl">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title && (
                <h2
                  className={`mt-3 font-display text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem] ${
                    tone === "ink" ? "text-craie" : "text-encre"
                  }`}
                >
                  {title}
                </h2>
              )}
              {intro && (
                <p
                  className={`mt-5 text-[17px] leading-relaxed ${
                    tone === "ink" ? "text-craie/70" : "text-encre/70"
                  }`}
                >
                  {intro}
                </p>
              )}
            </div>
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

/** Hero band for interior pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="texture-pierre border-b border-pierre bg-craie-2">
      <Container className="py-16 lg:py-24">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-encre/70">{intro}</p>
        )}
        <Ferronnerie className="mt-10 max-w-xs opacity-70" />
      </Container>
    </div>
  );
}

/** Honest marker: this content is carried over from NIME 2026 and not yet confirmed. */
export function Provisional({ children }: { children?: ReactNode }) {
  return (
    <div className="flex gap-3 border-l-2 border-or bg-or/10 px-5 py-4 text-sm leading-relaxed text-encre/75">
      <span className="mt-[3px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-or">
        TBC
      </span>
      <p>
        {children ??
          "Placeholder text adapted from NIME 2026. The NIME 2027 committee will confirm the final wording, dates and venues."}
      </p>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-5 text-[17px] leading-[1.75] text-encre/80 [&_a]:text-plaque [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-encre [&_li]:pl-1 [&_strong]:text-encre [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
      {children}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-plaque text-craie hover:bg-plaque-2 hover:-translate-y-0.5"
      : "border border-encre/25 text-encre hover:border-encre hover:-translate-y-0.5";

  const inner = (
    <>
      {children}
      <svg viewBox="0 0 14 10" className="h-2.5 w-3.5" aria-hidden="true">
        <path d="M0 5h12M8.5 1L12.5 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {inner}
    </Link>
  );
}

/** Card styled like a Haussmann shopfront: cream panel, thin cornice, gold hairline. */
export function Card({
  href,
  title,
  children,
}: {
  href?: string;
  title: string;
  children: ReactNode;
}) {
  const body = (
    <>
      <span className="absolute inset-x-0 top-0 h-[3px] bg-or/70 transition-transform duration-300 group-hover:scale-y-[2] origin-top" />
      <h3 className="font-display text-xl font-bold text-encre">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-encre/70">{children}</p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-plaque">
          Read more
          <svg viewBox="0 0 14 10" className="h-2.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            <path d="M0 5h12M8.5 1L12.5 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      )}
    </>
  );

  const className =
    "group relative flex h-full flex-col border border-pierre bg-craie p-7 transition-all duration-300 hover:-translate-y-1 hover:border-encre/25 hover:shadow-[0_24px_50px_-32px_rgba(14,22,38,0.6)]";

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
