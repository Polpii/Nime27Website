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
