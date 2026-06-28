// Self-check for the DeltaTouch plain-text -> markdown normalizer. Run: node test.js
const assert = require("assert");
const { textToMarkdown } = require("./normalize");

const out = textToMarkdown("2.53.0 2026-06-17\nFeature: add mentions\nBugfix: fix sync\n");
assert(out.includes("## 2.53.0 2026-06-17"), "version line should become an h2 heading");
assert(out.includes("- Feature: add mentions"), "body lines should become list items");
assert(!out.includes("## Feature"), "non-version lines must not become headings");

console.log("ok");
