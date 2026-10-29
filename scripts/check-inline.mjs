/**
 * Guards the inline markup regex in simple-page.tsx.
 *
 *   npm run check:inline
 *
 * A link in body text once rendered as italic because an escaped backslash
 * was lost from a character class, which silently shifted every capture
 * group by one. Nothing failed: the pages built, the text was all there, and
 * the links were simply no longer links. This asserts the group positions
 * the renderer relies on, so that cannot happen quietly again.
 */
import fs from "node:fs";

const source = fs.readFileSync("src/components/simple-page.tsx", "utf8");
const literal = source.match(/const pattern =\s*(\/.+\/g);/s);
if (!literal) {
  console.error("Could not find the inline pattern in simple-page.tsx.");
  process.exit(1);
}

const pattern = eval(literal[1]);

/** [input, group index that must capture, expected value] */
const cases = [
  ["a `code` span", 1, "code"],
  ["a **bold** span", 2, "bold"],
  ["a __bold__ span", 3, "bold"],
  ["a *italic* span", 4, "italic"],
  ["a _italic_ span", 5, "italic"],
  ["see [key dates](/programme) there", 6, "key dates"],
  ["see [key dates](/programme) there", 7, "/programme"],
  ["mail [us](mailto:a@b.org) now", 7, "mailto:a@b.org"],
  ["read [nime](https://nime.org/papers/) now", 7, "https://nime.org/papers/"],
  // A bare address becomes a mailto link, because three of the chairs' calls
  // write theirs as plain text while the other four mark it up.
  ["write to music@nime2027.org now", 8, "music@nime2027.org"],
  ["write to alt.nime@nime2027.org now", 8, "alt.nime@nime2027.org"],
  // An address already inside a link must stay the link's business: the link
  // group starts further left, so it wins and group 8 never fires.
  ["mail [us](mailto:a@b.org) now", 8, undefined],
  [
    "[installations@nime2027.org](mailto:installations@nime2027.org)",
    6,
    "installations@nime2027.org",
  ],
  ["[installations@nime2027.org](mailto:installations@nime2027.org)", 8, undefined],
];

let failed = 0;
for (const [input, group, expected] of cases) {
  pattern.lastIndex = 0;
  const m = pattern.exec(input);
  const got = m?.[group];
  if (got !== expected) {
    console.error(
      `FAIL  ${JSON.stringify(input)}\n      group ${group}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(got)}`,
    );
    failed++;
  }
}

// snake_case must not be mistaken for italics.
pattern.lastIndex = 0;
const snake = pattern.exec("the some_file_name value");
if (snake !== null) {
  console.error(`FAIL  snake_case matched as markup: ${JSON.stringify(snake[0])}`);
  failed++;
}

if (failed) {
  console.error(`\n${failed} inline markup check(s) failed.`);
  process.exit(1);
}
console.log(`inline markup: ${cases.length + 1} checks passed`);

// A bold run holding a link, which every call uses for the ethics statement.
{
  const src2 = fs.readFileSync("src/components/simple-page.tsx", "utf8");
  const recurses = /inline\(match\[2\] \?\? match\[3\]/.test(src2);
  if (!recurses) {
    console.error("FAIL  bold no longer parses its own contents, so **[a](b)** loses the link");
    process.exit(1);
  }
  console.log("inline markup: bold and italic parse their contents");
}
