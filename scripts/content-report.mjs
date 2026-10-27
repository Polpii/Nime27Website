/**
 * Prints where every page's words come from, so nobody has to guess whether
 * a page carries the chairs' text or something written to fill the gap.
 *
 *   npm run content
 *
 * It reads src/content/pages.ts as text rather than importing it, so it needs
 * no build step and no dependencies.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "src", "content", "pages.ts"), "utf8");
const callsDir = path.join(root, "src", "content", "calls");

const body = source.slice(source.indexOf("export const pages"));

// Each entry opens with `key: {` or `"key-with-dashes": {` at two spaces of
// indentation, with its slug on the next line. Taking the match offsets lets
// each entry's text run up to the start of the next one, which is the part
// the old version of this script got wrong.
const matches = [...body.matchAll(/^ {2}"?([A-Za-z][\w-]*)"?: \{\r?\n\s*slug: "([^"]+)"/gm)];

const markdown = fs.existsSync(callsDir)
  ? new Set(
      fs
        .readdirSync(callsDir)
        .filter((f) => f.endsWith(".md") && f !== "README.md")
        .map((f) => f.replace(/\.md$/, "")),
    )
  : new Set();

const entries = matches.map((m, i) => {
  const text = body.slice(m.index, matches[i + 1]?.index ?? body.length);
  const key = m[1];
  const slug = m[2];

  // `provisional,` is the shared constant holding "Placeholder text adapted
  // from NIME 2026", so an entry using it is text nobody on the committee
  // has written or approved.
  const isPlaceholder = /^\s*provisional,\s*$/m.test(text);
  const hasCallout = /^\s*"> /m.test(text) || isPlaceholder;

  let rank;
  if (markdown.has(key)) rank = 0;
  else if (isPlaceholder) rank = 2;
  else rank = 1;

  return { key, slug, rank, hasCallout };
});

const width = Math.max(...entries.map((e) => e.slug.length)) + 1;

const groups = [
  [0, "From the chairs' own markdown file"],
  [1, "Written in pages.ts from the chairs' documents or confirmed facts"],
  [2, "Placeholder adapted from NIME 2026, nobody has approved the wording"],
];

for (const [rank, heading] of groups) {
  const group = entries.filter((e) => e.rank === rank);
  if (group.length === 0) continue;
  console.log(`\n${heading}  (${group.length})`);
  for (const e of group) {
    const note = e.hasCallout ? "shows a TBC box" : "no caveat shown";
    console.log(`  /${e.slug.padEnd(width)} ${e.key.padEnd(width)} ${note}`);
  }
}

const orphans = [...markdown].filter((k) => !entries.some((e) => e.key === k));
if (orphans.length) {
  console.log(
    `\nMarkdown files with no page to land on: ${orphans.join(", ")}` +
      `\n  Add an entry with that key to src/content/pages.ts, or rename the file.`,
  );
}

console.log(
  `\n${entries.length} pages. ${markdown.size} from markdown, ` +
    `${entries.filter((e) => e.rank === 2).length} still placeholder.\n`,
);
