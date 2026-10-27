/**
 * Turns a real markdown file into the tiny line dialect that SimplePage
 * renders.
 *
 * Why this exists: the chairs write the calls as markdown documents, all in
 * the same format, and send them over as files. Retyping each one into a
 * TypeScript array is slow and it is where wording gets quietly changed. So
 * their file is the source: drop it in `src/content/calls/<key>.md` and it
 * wins over the entry in `pages.ts`. A git diff then shows their words
 * changing, not mine.
 *
 * The dialect this emits, one array entry per line:
 *   "## Heading" / "### Heading"   headings
 *   "- item"                       bullet
 *   "1. item"                      ordered item (consecutive ones group)
 *   "> note"                       provisional callout
 *   "---"                          rule
 *   "|a|b|"                        table row, separator row kept as the header mark
 *   anything else                  paragraph
 *
 * Markdown soft-wraps paragraphs across several lines; those are folded back
 * into one entry, because the renderer treats one entry as one paragraph.
 */

export type ParsedMarkdown = {
  /** From the first level-one heading, if the file has one. */
  title?: string;
  /** The first paragraph after the title, lifted out to sit in the hero. */
  intro?: string;
  body: string[];
};

const BULLET = /^[-*+]\s+/;
const ORDERED = /^\d+[.)]\s+/;
const HEADING = /^(#{1,6})\s+(.*)$/;
const RULE = /^([-*_])\1{2,}$/;

/** Strips a leading YAML frontmatter block, which we do not use. */
function stripFrontmatter(raw: string): string {
  const match = raw.match(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length) : raw.replace(/^\uFEFF/, "");
}

export function parseMarkdown(raw: string): ParsedMarkdown {
  const lines = stripFrontmatter(raw).replace(/\r\n?/g, "\n").split("\n");

  const body: string[] = [];
  let title: string | undefined;
  let paragraph: string[] = [];
  /** Set while inside a fenced code block, where nothing is interpreted. */
  let fenced = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    body.push(paragraph.join(" ").trim());
    paragraph = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (/^(```|~~~)/.test(line)) {
      flushParagraph();
      fenced = !fenced;
      continue;
    }
    if (fenced) {
      body.push(rawLine);
      continue;
    }

    if (line === "") {
      flushParagraph();
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const text = heading[2].trim();
      // The first h1 is the page title, not body content. A second one would
      // be a section, so it is demoted rather than dropped.
      if (level === 1 && title === undefined) {
        title = text;
        continue;
      }
      body.push(`${"#".repeat(Math.min(Math.max(level, 2), 3))} ${text}`);
      continue;
    }

    if (RULE.test(line)) {
      flushParagraph();
      body.push("---");
      continue;
    }

    if (line.startsWith("|")) {
      flushParagraph();
      body.push(line);
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      body.push(`> ${line.replace(/^>\s?/, "").trim()}`);
      continue;
    }

    if (BULLET.test(line)) {
      flushParagraph();
      body.push(`- ${line.replace(BULLET, "")}`);
      continue;
    }

    if (ORDERED.test(line)) {
      flushParagraph();
      body.push(`1. ${line.replace(ORDERED, "")}`);
      continue;
    }

    // A line that continues the list item or paragraph above it. Markdown
    // folds it into whatever block it belongs to.
    const previous = body[body.length - 1];
    if (
      paragraph.length === 0 &&
      previous !== undefined &&
      (previous.startsWith("- ") || previous.startsWith("1. ")) &&
      /^\s/.test(rawLine)
    ) {
      body[body.length - 1] = `${previous} ${line}`;
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();

  // The opening paragraph belongs in the hero, where every other page puts
  // its standfirst. Only lift it when it really is the first thing after the
  // title, so a call that opens on a callout keeps that callout at the top.
  let intro: string | undefined;
  const first = body[0];
  if (
    first !== undefined &&
    !first.startsWith("#") &&
    !first.startsWith("- ") &&
    !first.startsWith("1. ") &&
    !first.startsWith("> ") &&
    !first.startsWith("|") &&
    first !== "---"
  ) {
    intro = first;
    body.shift();
  }

  return { title, intro, body };
}
