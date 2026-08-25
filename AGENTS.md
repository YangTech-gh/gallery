# AGENTS.md — hautlys-files

Static portfolio of motion-rich, GSAP-driven single-page websites served as-is from this repository (intended for GitHub Pages). No build system, no test runner, no linter. Each top-level HTML file is fully self-contained: inline `<style>` and `<script>` blocks plus assets in sibling folders and `vendor/`.

---

## Repository shape

```
.
├── index.html              Yang Tech — enterprise motion showcase, 2898 lines
├── sanare.html             Clínica Sanare landing page, 1742 lines (Babylon bg + eye.glb)
├── gisele.html             Dra. Gisela, 1591 lines
├── lobo-mayer.html         Clínica Lobo Mayer, 1913 lines (Babylon polyhedral bg)
├── maissorriso.html        Mais Sorriso, 1633 lines
├── tea.html                Clínica TEA — full paged UI (no scroll-smoother)
├── gsap-modern-sites/
│   ├── SKILL.md            Reference skill for GSAP patterns
│   ├── gsap-showcase.html  Living reference page linking the patterns in the skill
│   └── references/codepen-use-cases.md   5 analyzed CodePen patterns
├── vendor/
│   ├── babylon.js
│   ├── babylonjs.loaders.min.js
│   └── gsap/               19 GSAP 3.x plugins including all premium (.min.js, locally vendored)
├── lobomayer-assets/       favicons, doctor photo, video
├── maissorriso-assets/     8 unsorted jpegs named "0 (n).jpeg"
├── backups/                Pre-edit snapshots, .bak files (ignored by .gitignore)
├── GSAP-UI-UX-AUDIT.md     Cross-site accessibility/UX audit (issues + status)
├── push.sh                 File whose entire contents is one literal command (see "Gotchas")
├── .nojekyll               Disables Jekyll processing on GH Pages
└── .gitignore              Excludes backups, backup directories, editor files
```

There is no `package.json`, no npm project, no `src/`, no `tests/`, no CI workflow.

---

## How to run / deploy

There is nothing to install and nothing to build. To preview locally:

```bash
cd /mnt/d/hautlys-files
python3 -m http.server 8000    # or any static server
# then open http://localhost:8000/index.html
```

Files use relative paths (`vendor/`, `lobomayer-assets/`, `maissorriso-assets/`) so the repo MUST be served from its real root. Opening an HTML file via `file://` will break vendored scripts and image references. Babylon GLB loading in `sanare.html` (`BABYLON.SceneLoader.ImportMeshAsync('', './', 'eye.glb', scene)`) only works when the file is co-located with `eye.glb` at the served root.

Deployment is git push to GitHub Pages (`.nojekyll` is present, so files/folders starting with `_` will not be stripped). Recent commits are all literally `update` — no conventional history. See "Gotchas" about `push.sh`.

---

## Authoring conventions (observed across all six HTML files)

These are not stated in any config but emerge consistently from the source:

### Inline everything
- One `<style>` block in `<head>`, one `<script>` block (or a few) at the end of `<body>`. No external CSS or JS files except the vendored libraries.
- Vendor plugins loaded via `<script defer src="vendor/gsap/<name>.min.js">` (plural) or `<script defer src="vendor/babylon.js">` (singular). All sites that need Babylon use both `vendor/babylon.js` and sometimes `vendor/babylonjs.loaders.min.js`.
- External images come from `images.unsplash.com` with `?w=…&q=…&auto=format` query strings.

### Defensive plugin registration
Every site wraps registration so a missing vendor file doesn't blow up:

```js
if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
if (typeof ScrollSmoother !== 'undefined') gsap.registerPlugin(ScrollSmoother);
if (typeof SplitText    !== 'undefined') gsap.registerPlugin(SplitText);
```

Only `lobo-mayer.html` adds `onerror="this.remove()"` on plugin scripts. The others silently fail if a vendor file 404s.

### Reduced motion is a first-class concern
Every site defines a JS `reduce` flag (from `matchMedia('(prefers-reduced-motion: reduce)')`) AND a CSS `@media (prefers-reduced-motion: reduce)` rule that disables transitions, sets `.reveal-el { opacity:1 !important; transform:none !important }`, and hides Babylon canvases. `index.html` also gates Babylon on UA + width (`window.innerWidth < 768`).

### ScrollSmoother gated by device
When used, ScrollSmoother is only enabled on desktop with a fine pointer:

```js
gsap.matchMedia({ desktop: '(min-width: 800px)' ... })
// or
if (!REDUCED && FINE_POINTER && window.innerWidth > 900 && typeof ScrollSmoother !== 'undefined') { … }
```

`tea.html` deliberately does NOT use ScrollSmoother — its UI is a panel-by-panel switcher driven by `.panel` elements with `data-color` attributes.

### Mobile menu focus trap
`index.html` is the only file with a complete pattern (open/close, `lastFocused` save-and-restore, Esc to close, focus moves to first link on open, restores focus on close). Most other HTML files document this as a missing feature in `GSAP-UI-UX-AUDIT.md`.

### Sticky CTA / safe-area
Sites with `#stickyCall` / `#sticky-cta` / `#stickyMobileCTA` always use `padding-bottom: env(safe-area-inset-bottom)`. Only `lobo-mayer.html` and `tea.html` set `viewport-fit=cover` on the viewport meta — `GSAP-UI-UX-AUDIT.md` flags this as missing on `index.html`, `sanare.html`, `gisele.html`, `maissorriso.html`.

### Color tokens
All sites use CSS custom properties on `:root` (e.g. `--bg`, `--paper`, `--acid`, `--line`, `--pad`). Three language conventions co-exist:
- English tokens (`--acid`, `--paper`, `--muted`, `--ink`) — most sites
- Brazilian Portuguese tokens (`--cream`, `--ink`, `--pink`, `--orange`) — `tea.html`, `lobo-mayer.html`
- RGB-triplet tokens (`--rgb-hero`, `--rgb-gold`) that compose `--bg-hero: rgb(var(--rgb-hero))` — only `lobo-mayer.html`

When porting a section between files, copy the token convention already present in that file, do not unify.

### Brand identity per site
Each site is one specific client and uses Portuguese copy, contact numbers, and address data baked in. Treat contact info, doctor names, and addresses as content, not as test fixtures — do not generate fake substitutes.

---

## Naming and style conventions observed in source

- CSS class names: kebab-case, often BEM-ish but flat (`.hero-title`, `.panel`, `.dot-btn`, `.kicker`, `.ghost-btn`).
- JS variables: mostly `camelCase`, with a few all-caps constants (`HAS_ST`, `HAS_SPLIT`, `REDUCED`, `FINE_POINTER`, `PALETTE`).
- Major motion sections are commented with `// ─── SECTION NAME ───` separators.
- The German "ß" or Portuguese "ç" disappears in many files because accents are intentionally stripped from titles (`Yang Tech / Solucoes Digitais`) and the `<html lang="pt-BR">` is present even when content is ASCII-only — preserve that pattern when matching existing copy.

---

## Testing approach

There are no automated tests. Validation is by manual viewing on desktop + mobile (Chrome DevTools device emulation). Useful smoke checks:

| File | What to look for when validating a change |
|---|---|
| `index.html` | Loader bar fulls, hero characters slide up, Babylon spheres rotate, mobile menu traps focus, language switcher toggles PT/EN/ES strings. |
| `sanare.html` | Eye.glb model loads, smooth scroll on desktop only, FAQ accordion works. |
| `gisele.html` | FAQ + accordion, mesh gradient hero, custom cursor hidden on touch. |
| `lobo-mayer.html` | Background polyhedrons render (Babylon), specialty cards stagger in, video plays on hover/click. |
| `maissorriso.html` | Service cards swipe, sticky phone CTA shows after scroll. |
| `tea.html` | Panel-by-panel navigation via right-side dots, arrow keys, swipe; page never internal-scrolls inside a panel. |

After **any** non-trivial edit:
1. Reload in a browser.
2. Toggle `prefers-reduced-motion` (DevTools Rendering tab) and confirm CSS + JS bail-out paths still work.
3. Toggle device emulation to a narrow width and check the mobile menu / sticky CTA overlap with footer content.
4. `Ctrl+F5` to bypass cache (vendored plugins are `defer`-loaded and easy to lock in cache).

---

## Gotchas and non-obvious knowledge

| Gotcha | Detail |
|---|---|
| **`push.sh` is a trap** | The file's contents are literally the string `git add -A && git commit -m 'update' && git push -f`. There is no shebang, no `chmod`, no executable purpose. Do not run it. Do not assume it is a script. The repo's `update` commits in `git log` look like automation but are not. |
| **`backups/` and `*.bak`** | Captured before larger edits and explicitly `.gitignore`d, but the audit notes some older versions were committed before `.gitignore` existed. Treat backup files as read-only history, not as source to migrate from. |
| **`maissorriso-assets/` filenames** | Eight files named `0 (n).jpeg` with literal parentheses and spaces in the filename. Do not rename — many HTML attributes reference `(1)` style names. |
| **GLB in `sanare.html`** | The audit flags the `./` root path as fragile if the site is ever moved to a subdirectory on GH Pages. If deploying elsewhere, switch to absolute `/eye.glb` and/or add a `<base href="/">`. |
| **No fallbacks for missing vendor files** | Five of six pages do not put `onerror` handlers on `<script>` tags. A 404 on a premium plugin silently disables its animations. `lobo-mayer.html` is the only one that adds `onerror="this.remove()"`. |
| **`gsap-modern-sites/SKILL.md`** | This is a reference skill, not project documentation. The instructions there (`vendor/gsap/...` CDN paths and patterns) are how to *build* GSAP motion sites in general, not how THIS repo is organized. The repo uses local vendor copies, not the jsdelivr URLs in the skill. |
| **`GSAP-UI-UX-AUDIT.md`** | Live audit doc dated 2026-08-23. Reading it before editing a file surfaces known touch-target, focus-trap, and `viewport-fit` issues per page. |
| **`index.html` calls itself "Yang Tech"** | Even though `git log` shows `update`-only commits, the live site is Yang Tech's portfolio; the medical clinics live on the same repo as sibling HTML files. Do not move the clinics into a subdirectory without checking the OG/marketing assumptions in `lobo-mayer.html` and others that link between themselves. |
| **`<script defer>` order matters** | Plugin scripts must come *before* the consuming `<script>`. In `index.html`, `vendor/babylon.js` is at line 9 (head) but GSAP plugins are around line 1394 — the consumer calls `gsap` inside `DOMContentLoaded` and falls back to `setTimeout(bootYang, 600)` if `gsap` is undefined. Don't add a new `<script>` block after the consumer block expecting synchronous access. |
| **`viewport-fit=cover` not universal** | Only `lobo-mayer.html` and `tea.html` set it. If you add `env(safe-area-inset-*)` to a new section, also add `viewport-fit=cover` to the file's `<meta name="viewport">` line — otherwise the inset values silently compute to zero on notched devices. |

---

## Pointers into the code

- Reference skill on how to use GSAP effectively: `gsap-modern-sites/SKILL.md:1-242`
- Live audit of accessibility / cross-device issues per file: `GSAP-UI-UX-AUDIT.md:1-120`
- Babylon webgl background init pattern (shapes, fogDensity, scroll-driven camera): `index.html:2801-2862`
- Example of full defensive plugin loading + ScrollSmoother gate: `maissorriso.html:1086-1102`
- Pattern for unload/pause global timeline on tab visibility: `tea.html:672-675`
- Token system building RGBA from RGB triplets: `lobo-mayer.html:28-56`
- Anti-overflow panel-content scaling for a no-internal-scroll paged UI: `tea.html:684-690`

---

## Workflow rules (agent-specific)

- **Read first.** Files are 1000–2900 lines. Never edit assuming structure — `view` with offset/limit first, then make a targeted edit with `edit` (exact text) or `lsp_replace_symbol` for whole functions.
- **No `apply_patch` / `apply_diff`.** Only `edit`, `multiedit`, `write`, `lsp_replace_symbol`, `lsp_rename` are real tools here.
- **Preserve the inline-everything pattern.** Don't extract CSS/JS to new files unless the user asks. Don't introduce a build step.
- **Match the existing per-site color tokens and language.** Don't unify token names across `index.html`, `tea.html`, and `lobo-mayer.html` — they intentionally differ per client brand.
- **Test locally with a static server** before declaring done. The vendored plugin sanity-check (`typeof ScrollTrigger !== 'undefined'`) only works on `http://`, not `file://`.
- **Don't run `push.sh`** — it would force-push `update` commits over current history.
- **Don't commit unless asked.** `NEVER COMMIT` rule. Recent history is `update`-only; preserve it that way unless asked otherwise.
