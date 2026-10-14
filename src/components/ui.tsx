import Link from "next/link";
import type { ReactNode } from "react";
import { Ferronnerie } from "@/components/paris";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-5 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-teal glow-teal">
      {children}
    </p>
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
    <div className="relative border-b border-white/10 bg-nuit-3">
      <Container className="py-16 lg:py-24">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-4xl font-display text-[2rem] leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brume">{intro}</p>}
        <Ferronnerie className="mt-10 max-w-[260px] opacity-60" />
      </Container>
    </div>
  );
}

/** Honest marker: this content is not confirmed. */
export function Provisional({ children }: { children?: ReactNode }) {
  return (
    <div className="flex gap-3 border-l-2 border-neon-or bg-neon-or/[0.07] px-5 py-4 text-sm leading-relaxed text-brume">
      <span className="mt-[3px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-neon-or">
        TBC
      </span>
      <p>
        {children ??
          "Placeholder text adapted from NIME 2026. The NIME 2027 committee will confirm the final wording, dates and venues."}
      </p>
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
      ? "bg-neon-teal text-nuit hover:-translate-y-0.5"
      : "border border-white/20 text-craie hover:border-neon-teal hover:text-neon-teal hover:-translate-y-0.5";

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

/** Raised panel with a lit top edge. */
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
      <span className="absolute inset-x-0 top-0 h-px origin-top bg-neon-or/60 transition-transform duration-300 group-hover:scale-y-[3]" />
      <h2 className="font-display text-xl font-bold text-craie">{title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-brume">{children}</p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neon-teal">
          Read more
          <svg
            viewBox="0 0 14 10"
            className="h-2.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M0 5h12M8.5 1L12.5 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      )}
    </>
  );

  const className =
    "group relative flex h-full flex-col border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05]";

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
