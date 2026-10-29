import Link from "next/link";
import type { ReactNode } from "react";
import type { PageContent } from "@/content/pages";
import { Container, PageHero, Provisional } from "@/components/ui";

/**
 * Renders the inline marks inside a single line of body text: **bold**,
 * *italic*, `code` and [label](href). The order of the alternatives matters,
 * because ** has to be tried before a single *.
 */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Built fresh on every call because it is stateful and this function
  // recurses: bold and italic run their own contents back through it, so a
  // shared lastIndex would have the inner pass corrupt the outer one.
  const pattern =
    /`([^`]+)`|\*\*(.+?)\*\*|__(.+?)__|\*([^*\n]+)\*|(?<![A-Za-z0-9_])_([^_\n]+)_(?![A-Za-z0-9_])|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i}`;

    if (match[1] !== undefined) {
      nodes.push(
        <code key={key} className="bg-white/[0.07] px-1.5 py-0.5 text-[0.9em] text-craie">
          {match[1]}
        </code>,
      );
    } else if (match[2] !== undefined || match[3] !== undefined) {
      // A bold run can hold a link, as **[label](href)** does throughout the
      // chairs' calls, so its contents go back through this function.
      nodes.push(
        <strong key={key} className="font-semibold text-craie">
          {inline(match[2] ?? match[3], `${key}-b`)}
        </strong>,
      );
    } else if (match[4] !== undefined || match[5] !== undefined) {
      nodes.push(
        <em key={key} className="italic text-craie/90">
          {inline(match[4] ?? match[5], `${key}-i`)}
        </em>,
      );
    } else {
      const label = match[6];
      const href = match[7];
      const className = "text-neon-teal underline underline-offset-4 hover:text-neon-or";
      nodes.push(
        href.startsWith("/") ? (
          <Link key={key} href={href} className={className}>
            {label}
          </Link>
        ) : (
          <a
            key={key}
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

const ORDERED = /^\d+\.\s/;
/** A table's separator row, which marks the row above it as the header. */
const TABLE_RULE = /^\|(\s*:?-+:?\s*\|)+$/;

function splitRow(line: string): string[] {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

/** Groups the flat `body` lines into headings, paragraphs, lists and tables. */
function render(body: string[]): ReactNode[] {
  const out: ReactNode[] = [];
  let bullets: string[] = [];
  let ordered: string[] = [];
  let table: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    out.push(
      <ul key={`ul-${out.length}`} className="ml-1 space-y-3 border-l border-white/10 pl-6">
        {items.map((item, i) => (
          <li key={i} className="relative text-[17px] leading-[1.7] text-brume">
            <span
              className="absolute -left-[25px] top-[11px] h-[5px] w-[5px] rotate-45 bg-neon-or"
              aria-hidden="true"
            />
            {inline(item, `li-${out.length}-${i}`)}
          </li>
        ))}
      </ul>,
    );
  };

  const flushOrdered = () => {
    if (ordered.length === 0) return;
    const items = ordered;
    ordered = [];
    out.push(
      <ol key={`ol-${out.length}`} className="ml-1 space-y-3 border-l border-white/10 pl-6">
        {items.map((item, i) => (
          <li key={i} className="relative text-[17px] leading-[1.7] text-brume">
            <span
              className="absolute -left-[31px] top-0 text-[13px] font-semibold tabular-nums text-neon-purple"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            {inline(item, `oli-${out.length}-${i}`)}
          </li>
        ))}
      </ol>,
    );
  };

  const flushTable = () => {
    if (table.length === 0) return;
    const rows = table;
    table = [];
    const hasHeader = rows.length > 1 && TABLE_RULE.test(rows[1]);
    const head = hasHeader ? splitRow(rows[0]) : null;
    const bodyRows = (hasHeader ? rows.slice(2) : rows)
      .filter((r) => !TABLE_RULE.test(r))
      .map(splitRow);

    out.push(
      // Narrow screens scroll the table sideways rather than squeezing the
      // columns into unreadable slivers.
      <div key={`table-${out.length}`} className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
        <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
          {head && (
            <thead>
              <tr>
                {head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="border-b border-white/15 pb-3 pr-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-neon-teal last:pr-0"
                  >
                    {inline(cell, `th-${out.length}-${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {bodyRows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className="border-b border-white/[0.07] py-3 pr-6 align-top leading-relaxed text-brume last:pr-0"
                  >
                    {inline(cell, `td-${out.length}-${r}-${c}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
  };

  const flushAll = () => {
    flushBullets();
    flushOrdered();
    flushTable();
  };

  body.forEach((line, index) => {
    if (line.startsWith("- ")) {
      flushOrdered();
      flushTable();
      bullets.push(line.slice(2));
      return;
    }
    if (ORDERED.test(line)) {
      flushBullets();
      flushTable();
      ordered.push(line.replace(ORDERED, ""));
      return;
    }
    if (line.startsWith("|")) {
      flushBullets();
      flushOrdered();
      table.push(line);
      return;
    }
    flushAll();

    if (line === "---") {
      out.push(<hr key={index} className="border-white/10" />);
    } else if (line.startsWith("### ")) {
      out.push(
        <h3
          key={index}
          className="pt-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-neon-purple"
        >
          {line.slice(4)}
        </h3>,
      );
    } else if (line.startsWith("## ")) {
      out.push(
        <h2 key={index} className="pt-6 font-display text-2xl text-craie sm:text-[1.7rem]">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("> ")) {
      out.push(<Provisional key={index}>{inline(line.slice(2), `q-${index}`)}</Provisional>);
    } else {
      out.push(
        <p key={index} className="text-[17px] leading-[1.75] text-brume">
          {inline(line, `p-${index}`)}
        </p>,
      );
    }
  });

  flushAll();
  return out;
}

export function SimplePage({
  page,
  cta,
  children,
}: {
  page: PageContent;
  /** Rendered above the body, for a page whose point is an action. */
  cta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Container className="py-16 lg:py-24">
        {cta && <div className="mb-12">{cta}</div>}
        <div className="max-w-2xl space-y-6">{render(page.body)}</div>
        {children}
      </Container>
    </>
  );
}
