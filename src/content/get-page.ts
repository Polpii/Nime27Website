import fs from "node:fs";
import path from "node:path";
import { parseMarkdown } from "./markdown";
import { pages, type PageContent } from "./pages";
import { deadlines, pendingCallsDue, tracks } from "./site";

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

/**
 * A call page, or a short notice in its place while that track's call is not
 * published. The full text stays in its markdown file, where the chairs can
 * keep editing it in the studio, so publishing the call is switching
 * `published` on for the track in site.ts.
 */
export function getCallPage(key: string): PageContent {
  const page = getPage(key);
  const track = tracks.find((t) => t.href === `/call/${key}`);
  if (!track || track.published) return page;

  const due = track.group === "juried" ? deadlines.juried : deadlines.peerReviewed;
  return {
    ...page,
    intro: track.blurb,
    body: [
      `**The full call will be published ${pendingCallsDue}.**`,
      "## Deadline",
      `Submissions are due ${due}, 23:59 AoE. Every date for every track is on [key dates](/call/key-dates).`,
      "## Contact",
      `For questions in the meantime, contact the track chairs at [${track.email}](mailto:${track.email}).`,
      "NIME depends on volunteers. Whatever you submit, please also [sign up to review](/call/reviewing).",
    ],
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
