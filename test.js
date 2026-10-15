// Self-check for the DeltaTouch plain-text -> markdown normalizer. Run: node test.js
const assert = require("assert");
const { textToMarkdown, joinReleaseNotes } = require("./normalize");

const out = textToMarkdown("2.53.0 2026-06-17\nFeature: add mentions\nBugfix: fix sync\n");
assert(out.includes("## 2.53.0 2026-06-17"), "version line should become an h2 heading");
assert(out.includes("- Feature: add mentions"), "body lines should become list items");
assert(!out.includes("## Feature"), "non-version lines must not become headings");

const joined = joinReleaseNotes([
  { ver: "0.1.0", text: "First\n" }, { ver: "0.1.10", text: "# Parla 0.1.10\nTen\n## Downloads\n" },
  { ver: "0.1.0-2", date: "2026-10-13", text: "Repair\n" }, { ver: "0.1.2", text: "Two\n" },
]);
assert.deepStrictEqual(joined.match(/^## .*/gm), ["## 0.1.10", "## 0.1.2", "## 0.1.0-2 — 2026-10-13", "## 0.1.0"],
  "releases newest first, numeric, repair build after its base, date when known");
assert(joined.includes("### Downloads") && !joined.includes("# Parla"), "file headings demoted, title dropped");

console.log("ok");
