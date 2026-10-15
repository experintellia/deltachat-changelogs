// Normalizers: every source -> markdown with `## <version>` headings, so the page
// has one render path. Shared by index.html (browser) and test.js (node).

// DeltaTouch CHANGELOG is plain text: a version line like "2.53.0 2026-06-17",
// then body lines with no blank separators. Make version lines h2, body lines bullets.
function textToMarkdown(t) {
  return t.split("\n").map(line => {
    if (/^\d+\.\d+\.\d+/.test(line)) return "\n## " + line.trim() + "\n";
    if (line.trim() === "") return "";
    return "- " + line.trim();
  }).join("\n");
}

// Parla ships release notes in an AppStream metainfo XML, not a changelog file.
// Browser-only (needs DOMParser); not exercised by the node self-check.
function appdataToMarkdown(xml) {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  return [...doc.querySelectorAll("releases > release")].map(r => {
    const v = r.getAttribute("version"), d = r.getAttribute("date");
    const ps = [...r.querySelectorAll("description > p")].map(p => p.textContent.trim());
    const items = [...r.querySelectorAll("description li")].map(li => "- " + li.textContent.trim());
    return `## ${v}${d ? " — " + d : ""}\n\n${[...ps, ...items].join("\n")}`;
  }).join("\n\n");
}

// Parla for Haiku keeps one notes file per release (docs/releases/v0.1.5.md).
// notes: [{ver, date?, text}] -> newest first, each under "## <ver> — <date>". A file's own "# title"
// is dropped and its headings pushed down a level so they don't become versions.
function joinReleaseNotes(notes) {
  return [...notes]
    .sort((a, b) => b.ver.localeCompare(a.ver, undefined, { numeric: true }))
    .map(n => `## ${n.ver}${n.date ? " — " + n.date : ""}\n\n` + n.text.replace(/^# .*\n/, "").replace(/^(#+ )/gm, "#$1"))
    .join("\n\n");
}

function toMarkdown(type, text) {
  if (type === "text") return textToMarkdown(text);
  if (type === "appdata") return appdataToMarkdown(text);
  return text; // already markdown
}

if (typeof module !== "undefined") module.exports = { textToMarkdown, joinReleaseNotes, toMarkdown };
