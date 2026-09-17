import Link from "next/link";
import type { ReactNode } from "react";
import type { PageContent } from "@/content/pages";
import { Container, PageHero, Provisional } from "@/components/ui";

/** Renders **bold** and [label](href) inside a single line of body text. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-encre">
          {match[1]}
        </strong>,
      );
    } else {
      const label = match[2];
      const href = match[3];
      const className = "text-plaque underline underline-offset-4 hover:text-rouge";
      nodes.push(
        href.startsWith("/") ? (
          <Link key={`${keyPrefix}-l${i}`} href={href} className={className}>
            {label}
          </Link>
        ) : (
          <a
            key={`${keyPrefix}-l${i}`}
            href={href}
            className={className}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {label}
          </a>
        ),
      );
    }

    last = match.index + match[0].length;
    i++;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Groups the flat `body` array into headings, paragraphs, lists and callouts. */
function render(body: string[]): ReactNode[] {
  const out: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    out.push(
      <ul key={`ul-${out.length}`} className="ml-1 space-y-3 border-l border-pierre pl-6">
        {items.map((item, i) => (
          <li key={i} className="relative text-[17px] leading-[1.7] text-encre/80">
            <span
              className="absolute -left-[25px] top-[11px] h-[5px] w-[5px] rotate-45 bg-or"
              aria-hidden="true"
            />
            {inline(item, `li-${out.length}-${i}`)}
          </li>
        ))}
      </ul>,
    );
  };

  body.forEach((line, index) => {
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
      return;
    }
    flushBullets();

    if (line.startsWith("## ")) {
      out.push(
        <h2
          key={index}
          className="pt-6 font-display text-2xl font-bold text-encre sm:text-[1.7rem]"
        >
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("> ")) {
      out.push(
        <Provisional key={index}>{inline(line.slice(2), `q-${index}`)}</Provisional>,
      );
    } else {
      out.push(
        <p key={index} className="text-[17px] leading-[1.75] text-encre/80">
          {inline(line, `p-${index}`)}
        </p>,
      );
    }
  });

  flushBullets();
  return out;
}

export function SimplePage({ page }: { page: PageContent }) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Container className="py-16 lg:py-24">
        <div className="max-w-2xl space-y-6">{render(page.body)}</div>
      </Container>
    </>
  );
}
