/**
 * Writes every page in pages.ts that has no markdown file yet out as one.
 *
 * Why: getPage() already prefers src/content/calls/<key>.md over the entry in
 * pages.ts, but only five pages have a file, so the rest of the site's text
 * lives in TypeScript where the chairs cannot safely touch it. Exporting the
 * rest means every SimplePage page is a plain markdown file, which is what
 * the studio editor hands them.
 *
 * The export is only trusted if it round-trips: the file is parsed straight
 * back with the real parser and must yield the same title, intro and body
 * that pages.ts held. Any page that does not match is left alone and
 * reported, rather than written out wrong.
 *
 * Run: node scripts/export-pages-to-markdown.mjs [--write]
 * Without --write it only reports what would change.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CALLS = path.join(root, "src", "content", "calls");
const write = process.argv.includes("--write");

/**
 * pages.ts and markdown.ts are TypeScript. They are compiled with the
 * project's own TypeScript rather than by stripping annotations by hand,
 * because a hand-rolled strip is exactly the kind of thing that silently
 * mangles the content this script is supposed to copy faithfully.
 */
const ts = (await import("typescript")).default;

async function loadTs(file) {
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  });
  const url =
    "data:text/javascript;base64," + Buffer.from(outputText, "utf8").toString("base64");
  return import(url);
}

const { pages } = await loadTs(path.join(root, "src", "content", "pages.ts"));
const { parseMarkdown } = await loadTs(path.join(root, "src", "content", "markdown.ts"));

/** A body line that markdown would read as something other than a paragraph. */
const STRUCTURAL = /^(#{1,6}\s|[-*+]\s|\d+[.)]\s|>|\||```|~~~|---$|___$|\*\*\*$)/;

/** True for a body entry the parser emits as its own block, not a paragraph. */
function isBlock(line) {
  return (
    line.startsWith("## ") ||
    line.startsWith("### ") ||
    line.startsWith("- ") ||
    line.startsWith("1. ") ||
    line.startsWith("> ") ||
    line.startsWith("|") ||
    line === "---"
  );
}

/** Renders one page's title, intro and body back into a markdown document. */
function toMarkdown(page) {
  const out = [];
  if (page.title) out.push(`# ${page.title}`, "");
  if (page.intro) out.push(page.intro, "");

  let previous = null;
  for (const line of page.body) {
    const runOn =
      previous !== null &&
      ((previous.startsWith("- ") && line.startsWith("- ")) ||
        (previous.startsWith("1. ") && line.startsWith("1. ")) ||
        (previous.startsWith("|") && line.startsWith("|")));
    if (!runOn && out.length > 0 && out[out.length - 1] !== "") out.push("");
    out.push(line);
    previous = line;
  }

  while (out.length > 0 && out[out.length - 1] === "") out.pop();
  return out.join("\n") + "\n";
}

/** Everything that would make the round-trip lie, listed rather than guessed. */
function unsafe(page) {
  const reasons = [];
  if (page.intro && STRUCTURAL.test(page.intro)) {
    reasons.push("the standfirst starts with markdown punctuation");
  }
  for (const line of page.body) {
    if (!isBlock(line) && STRUCTURAL.test(line)) {
      reasons.push(`a paragraph starts with markdown punctuation: ${line.slice(0, 48)}`);
    }
  }
  return reasons;
}

const existing = new Set(
  fs
    .readdirSync(CALLS)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => f.replace(/\.md$/, "")),
);

const written = [];
const skipped = [];
const failed = [];

for (const [key, page] of Object.entries(pages)) {
  if (existing.has(key)) {
    skipped.push(`${key} (already has a file)`);
    continue;
  }

  const reasons = unsafe(page);
  if (reasons.length > 0) {
    failed.push(`${key}: ${reasons.join("; ")}`);
    continue;
  }

  const md = toMarkdown(page);
  const back = parseMarkdown(md);

  const same =
    (back.title ?? null) === (page.title ?? null) &&
    (back.intro ?? null) === (page.intro ?? null) &&
    back.body.length === page.body.length &&
    back.body.every((line, i) => line === page.body[i]);

  if (!same) {
    const where = back.body.findIndex((line, i) => line !== page.body[i]);
    failed.push(
      `${key}: the file does not parse back to the same page` +
        (back.title !== page.title ? ` (title: ${back.title} vs ${page.title})` : "") +
        (back.intro !== page.intro ? " (standfirst differs)" : "") +
        (where >= 0 ? ` (first difference at body line ${where})` : "") +
        (back.body.length !== page.body.length
          ? ` (${back.body.length} lines out, ${page.body.length} in)`
          : ""),
    );
    continue;
  }

  if (write) fs.writeFileSync(path.join(CALLS, `${key}.md`), md, "utf8");
  written.push(key);
}

console.log(write ? "Exported:" : "Would export:");
for (const key of written) console.log(`  ${key}`);
console.log(`\nLeft alone (${skipped.length}):`);
for (const key of skipped) console.log(`  ${key}`);
if (failed.length > 0) {
  console.log(`\nNOT exported, round-trip failed (${failed.length}):`);
  for (const line of failed) console.log(`  ${line}`);
}
console.log(
  `\n${written.length} exported, ${skipped.length} left alone, ${failed.length} failed.`,
);
process.exit(failed.length > 0 ? 1 : 0);
