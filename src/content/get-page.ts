import fs from "node:fs";
import path from "node:path";
import { parseMarkdown } from "./markdown";
import { pages, type PageContent } from "./pages";

/**
 * Where the chairs' own markdown files live. A file named after the page key
 * replaces that page's title, intro and body. See src/content/calls/README.md.
 */
const CALLS_DIR = path.join(process.cwd(), "src", "content", "calls");

/**
 * The content for one page: the chairs' markdown if they have sent it,
 * otherwise the entry in pages.ts.
 *
 * This runs at build time, so a new or edited markdown file needs a rebuild
 * to show up, which is what a deploy does anyway.
 */
export function getPage(key: string): PageContent {
  const base = pages[key];
  if (!base) {
    throw new Error(`No page content for "${key}". Add it to src/content/pages.ts.`);
  }

  const file = path.join(CALLS_DIR, `${key}.md`);
  if (!fs.existsSync(file)) return base;

  const parsed = parseMarkdown(fs.readFileSync(file, "utf8"));
  if (parsed.body.length === 0 && !parsed.title) return base;

  return {
    ...base,
    title: parsed.title ?? base.title,
    intro: parsed.intro ?? base.intro,
    body: parsed.body,
  };
}

/** Every page key that has a markdown file, for the content report. */
export function markdownBackedKeys(): string[] {
  if (!fs.existsSync(CALLS_DIR)) return [];
  return fs
    .readdirSync(CALLS_DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}
