# DeltaChat Changelogs (fan-made)

Unofficial changelog viewer for the DeltaChat ecosystem. A single static page that
pulls changelogs **live** from GitHub and Codeberg — tabs per client, sidebar TOC
with year groups, search, scroll-spy, and a relative-date toggle.

Clients: Desktop · Android · iOS · DeltaTouch · Core · Parla · Chatmail Relay (server) · Arcane Chat (fork).

## Run

No build, no dependencies. Serve the folder with any static server:

```sh
python3 -m http.server 3000
```

Then open <http://localhost:3000>.

## Test

One self-check on the changelog normalizer (no framework):

```sh
node test.js
```

## How it works

- `index.html` — UI + fetch/render logic.
- `normalize.js` — turns each source into markdown (`## <version>` headings) so the
  page has one render path. Markdown sources pass through; DeltaTouch's plain-text
  log gets headings via regex; Parla's AppStream `appdata.xml` is parsed to markdown.
- `marked.min.js` — vendored markdown renderer ([marked](https://github.com/markedjs/marked), MIT). No CDN.

DeltaTouch is fetched through Codeberg's API `media` endpoint (CORS-enabled, unlike raw).

Not affiliated with Delta Chat. Changelog content belongs to the respective projects.
