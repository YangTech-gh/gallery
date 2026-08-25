# GSAP UI/UX Comprehensive Audit — Portfolio Sites

> **Date:** 2026-08-23
> **Files Audited:** `index.html`, `sanare.html`, `gisele.html`, `lobo-mayer.html`, `maissorriso.html`, `tea.html`

---

## 1. Repository & GitHub Pages Issues

### 1.1 `.nojekyll` File
- **Status:** ✅ Already present at repo root
- **Note:** Previously missing; now correctly blocks Jekyll from ignoring files/dirs starting with `_`

### 1.2 GLB Path Issue in `sanare.html`
- **File:** `sanare.html:1046`
- **Issue:** `BABYLON.SceneLoader.ImportMeshAsync('', './', 'eye.glb', scene)` — the `./` root path resolves relative to the HTML file, but GitHub Pages may serve from a subdirectory or different base. A root-relative path `/eye.glb` or a `base` tag would be more reliable if the site is ever deployed under a subpath.
- **Current state:** Works because all files are at the repo root. No subpath deployment detected.

### 1.3 `.gitignore`
- **Status:** ❌ No `.gitignore` found
- **Impact:** Backup files (`sanare.html.bak`, `backups/`, `backups-pre-fix/`) are tracked in the repo. These are development artifacts that should be excluded.

### 1.4 `package.json` / Build System
- **Status:** ❌ None
- **Impact:** No automated minification, linting, or deployment pipeline. Each HTML file is self-contained with inline `<style>` and `<script>` blocks — no build step needed, but no quality gates either.

### 1.5 Vendor File Management
- **Observation:** All GSAP plugins and Babylon.js are vendored locally under `vendor/`. No CDN fallback or `onerror` handlers except on `lobo-mayer.html` (which has `onerror="this.remove()"` on each plugin `<script>`). Other files silently fail if a vendor file 404s.

---

## 2. UI/UX Cross-Device Issues Found & Fixed

### 2.1 `index.html` (Yang Tech Showcase)

| Issue | Status | Details |
|---|---|---|
| Viewport meta | ✅ OK | `width=device-width, initial-scale=1` — missing `viewport-fit=cover` for notch devices |
| Safe-area-inset handling | ⚠️ Partial | `#stickyMobileCTA` uses `env(safe-area-inset-bottom)` but no `viewport-fit=cover` on `<meta viewport>` — insets won't apply on notch devices |
| Touch targets | ⚠️ | `.toplinks a` has no min-height — links may be <44px on mobile. `.lang-btn` is 9×12px, far below WCAG 2.5.5 |
| Hero overflow on small screens | ⚠️ | `.hero-right{display:none}` at ≤600px — content disappears instead of adapting |
| Typography scaling | ✅ OK | Uses `clamp()` throughout |
| Mobile menu focus trap | ✅ Implemented | `trapFocus()` cycles through `a,button,[tabindex]` and respects Shift+Tab |
| Sticky CTA/footer overlap | ⚠️ | `footer{padding-bottom:90px}` when CTA is visible — but footer content can still be obscured by the fixed CTA bar |
| Reduced motion | ✅ CSS + JS | `@media(prefers-reduced-motion:reduce)` disables animations; JS checks `reduce` flag |
| Nav mobile menu focus trap | ✅ Implemented | Escape key closes; Tab is trapped |
| Reduced motion (Babylon) | ✅ | `#babylonBg{display:none!important}` in reduced motion CSS |
| Missing `touch-action` | ⚠️ | No `touch-action:manipulation` on interactive elements (buttons, links) — double-tap zoom may fire on mobile |

### 2.2 `sanare.html` (Clínica Sanare)

| Issue | Status | Details |
|---|---|---|
| Viewport meta | ✅ OK | `width=device-width, initial-scale=1.0` — missing `viewport-fit=cover` |
| Safe-area-inset | ⚠️ Partial | `#sticky-cta` uses `env(safe-area-inset-bottom)` but no `viewport-fit=cover` meta |
| Touch targets | ✅ OK | `.nav-toggle` is 2.65rem (≈42px), `.theme-toggle` is 2.4rem (≈38px) — slightly below 44px WCAG target |
| Hero overflow | ✅ OK | `h1` has `max-width:16ch`, `overflow:hidden` on `.line` |
| Typography scaling | ✅ OK | `clamp()` used throughout |
| Mobile menu focus trap | ⚠️ Missing | No focus trap in mobile nav — focus can escape to background content when menu is open |
| Sticky CTA/footer overlap | ⚠️ | `footer{padding-bottom:calc(28px + 56px)}` at ≤900px — but no bottom padding on the last section before footer |
| Custom cursor during reduced motion | ✅ | CSS hides `.cursor-ring,.cursor-dot{display:none!important}` in reduced motion |
| Babylon canvas hidden | ✅ | `#bg-canvas{display:none}` in reduced motion CSS |
| ScrollSmoother disabled on mobile/touch | ✅ | `smoothTouch:0.1` on desktop only; JS disables smoother on touch/narrow |

### 2.3 `gisele.html` (Dra. Gisela)

| Issue | Status | Details |
|---|---|---|
| Viewport meta | ✅ OK | Missing `viewport-fit=cover` |
| Safe-area-inset | ⚠️ Partial | `#sticky-cta` uses `env(safe-area-inset-bottom)` but no `viewport-fit=cover` |
| Touch targets | ⚠️ | `.menu-toggle` is 44×44px ✅ but `.faq-q` has no min-height — FAQ buttons rely on padding only |
| Hero overflow | ✅ OK | `min-height:100svh` with `overflow:hidden` |
| Typography scaling | ✅ OK | `clamp()` used throughout |
| Mobile menu focus trap | ⚠️ Missing | No focus trap — menu opens as a side panel but focus isn't trapped |
| Sticky CTA/footer overlap | ⚠️ | `footer{padding-bottom:calc(28px + 56px)}` at ≤860px |
| `touch-action:manipulation` | ✅ | Applied to `a, button` via media query `@media(hover:none) and (pointer:coarse)` |
| Reduced motion | ✅ | CSS + JS: `REDUCED_MOTION` flag checked; animations skipped |

### 2.4 `lobo-mayer.html` (Clínica Lobo Mayer)

| Issue | Status | Details |
|---|---|---|
| Viewport meta | ✅ OK | Has `viewport-fit=cover` ✅ |
| Safe-area-inset | ✅ | `#stickyCall` uses `env(safe-area-inset-bottom)` AND `viewport-fit=cover` |
| Touch targets | ✅ OK | `.nav-toggle` is 44×44px; `.esp-arrow` is 38×38px (slightly below 44px) |
| Hero overflow | ✅ OK | `min-height:100svh` with `overflow:hidden` |
| Typography scaling | ✅ OK | `clamp()` used |
| Mobile menu focus trap | ⚠️ Missing | No focus trap — menu opens as fullscreen overlay but focus isn't trapped |
| Sticky CTA/footer overlap | ⚠️ | `footer{padding-bottom:6.5rem}` accounts for sticky CTA |
| Custom cursor hidden on touch | ✅ | `@media(hover:none),(pointer:coarse){.cursor-dot,.cursor-ring{display:none}}` |
| Babylon canvas hidden | ✅ | `#bg-canvas{display:none!important}` in reduced motion |
| `touch-action:manipulation` | ✅ | Applied to `button,a` globally |

### 2.5 `maissorriso.html` (Mais Sorriso)

| Issue | Status | Details |
|---|---|---|
| Viewport meta | ✅ OK | Missing `viewport-fit=cover` |
| Safe-area-inset | ⚠️ Partial | `#sticky-cta` uses `env(safe-area-inset-bottom)` but no `viewport-fit=cover` |
| Touch targets | ⚠️ | `.menu-toggle` spans are small; `.card` has no min-height on mobile |
| Hero overflow | ✅ OK | `min-height:100svh` with `overflow:hidden` |
| Typography scaling | ✅ OK | `clamp()` used |
| Mobile menu focus trap | ⚠️ Missing | Mobile drawer opens but no focus trap implemented |
| Sticky CTA/footer overlap | ⚠️ | `footer{padding-bottom:calc(28px + 56px)}` at ≤900px |
| `touch-action:manipulation` | ✅ | Applied to `a, button` |
| Custom cursor hidden on touch | ✅ | `@media not all and (hover:hover) and (pointer:fine)` hides cursor |
| Reduced motion | ✅ | CSS + early JS bail-out |

### 2.6 `tea.html` (Clínica TEA)

| Issue | Status | Details |
|---|---|---|
| Viewport meta | ✅ OK | Has `viewport-fit=cover` ✅ |
| Safe-area-inset | ✅ | Uses `env(safe-area-inset-bottom)` in footer |
| Touch targets | ⚠️ | `.dot-btn` is 14×14px — far below 44px WCAG minimum |
| Hero overflow | ✅ OK | `body{overflow:hidden}` + `height:calc(var(--vh, 1vh) * 100)` |
| Typography scaling | ✅ OK | Uses `vw`/`vh`/`clamp()` |
| Mobile menu focus trap | N/A | No hamburger menu — panel-based navigation with arrow keys |
| Custom cursor | N/A | No custom cursor |
| Reduced motion | ⚠️ Partial | CSS disables `.fdot` animation; JS checks `reduceMotionMQ` but the panel transitions still play (at reduced duration of 0.16s) |
| `touch-action:manipulation` | ✅ | Applied to `a, button` |
| Motion toggle button | ✅ | User can manually disable motion — excellent UX for sensory sensitivities |

---

## 3. Reduced Motion Issues Found & Fixed

### 3.1 Per-File Analysis

#### `index.html`
| Animation | Handled? | Details |
|---|---|---|
| Hero title lines | ✅ | `if(reduce) heroIn.set(".hero-title .line > span", { y: 0 })` — skipped, set to final state |
| Hero sub/meta fade | ⚠️ | `heroIn.from(".hero-sub", ...)` still fires even when `reduce` is true — the timeline runs but with reduced durations |
| Scroll-triggered reveals | ✅ | `duration: reduce ? .01 : .7` — near-instant |
| Babylon.js canvas | ✅ | `#babylonBg{display:none!important}` in CSS reduced-motion query |
| ScrollSmoother | ✅ | Not initialized when `reduce` is true (Smoother not in the code path) |
| Custom cursor | ✅ | `#cursorPreview{display:none}` in CSS; cursor listeners only on `finePointer` |
| MotionPath (zigzag dot) | ✅ | `if (!reduce)` guard |
| Physics2D burst | ✅ | `duration: reduce ? .01 : 1.4` |
| Scroll-triggered parallax | ✅ | `if (reduce) gsap.set(...)` sets static values |

#### `sanare.html`
| Animation | Handled? | Details |
|---|---|---|
| Loader animation | ✅ | `if (REDUCED_MOTION) { finishLoader(); return; }` — skipped entirely |
| Hero SplitText reveal | ✅ | `if(!HAS_SPLIT || REDUCED_MOTION){ onDone(); return; }` |
| Babylon.js canvas | ✅ | `if (!HAS_BABYLON || REDUCED_MOTION) { canvasEl.style.display = 'none'; boot(); return; }` |
| ScrollSmoother | ✅ | `if (HAS_SMOOTHER && !REDUCED_MOTION)` |
| Scroll reveals (batch) | ✅ | `if(!HAS_ST || REDUCED_MOTION){ revealStatic(); return; }` |
| Horizontal scroll gallery | ✅ | Only pinned on `min-width:641px` AND not `REDUCED_MOTION` |
| Loop care panels | ✅ | `arrange(index, true)` sets final state immediately when reduced |
| Care accordion | ⚠️ | `openItem(item, true)` / `closeItem(item, true)` use `gsap.set()` — no animation, but the `gsap.to()` calls in the click handler still fire (with `overwrite:'auto'`) |
| Custom cursor | ✅ | Hidden via CSS `display:none!important` in reduced-motion query |
| Magnetic buttons | ✅ | `if (canHover && !REDUCED_MOTION)` — skipped |
| Ambient fiber rotation | ⚠️ | `gsap.to(fiberRoot.rotation, ...)` runs regardless of reduced motion — infinite rotation still plays |
| Ambient speck rotation | ⚠️ | Same as above — `gsap.to(speckRoot.rotation, ...)` runs unconditionally |

#### `gisele.html`
| Animation | Handled? | Details |
|---|---|---|
| Loader | ✅ | `loader.classList.add('hidden')` — no animation in reduced motion |
| Hero SplitText | ✅ | `if(!HAS_SPLIT || REDUCED_MOTION)` — skipped |
| Scroll reveals | ✅ | `if(!HAS_ST || REDUCED_MOTION){ revealStatic(); return; }` |
| ScrollSmoother | ✅ | `disableSmoothing = REDUCED_MOTION` |
| Scroll petal | ✅ | `if(!HAS_GSAP || !HAS_ST || REDUCED_MOTION) return` |
| Service card hover | ✅ | `gsap.matchMedia` — only wired on fine pointer devices; hover tweens still play on desktop even with reduced motion ⚠️ |
| Blob animations | ✅ | CSS `animation:none !important` in reduced-motion query |
| FAQ accordion | ✅ | `setStatic` function used when `REDUCED_MOTION` |
| FAQ icon rotation | ✅ | CSS `transition:none !important` in reduced-motion query |

#### `lobo-mayer.html`
| Animation | Handled? | Details |
|---|---|---|
| Loader | ✅ | `if (!HAS_GSAP || REDUCED_MOTION) { loader.hidden = true; ... boot(); return; }` |
| Hero SplitText | ✅ | `if (!HAS_GSAP || REDUCED_MOTION)` — shows elements immediately |
| Hero orbit MotionPath | ✅ | `if (!path || !dot || !HAS_GSAP || REDUCED_MOTION || !has('MotionPathPlugin')) return` |
| Ambient field (canvas) | ✅ | `if (!canvas || !HAS_GSAP || REDUCED_MOTION) { canvas.remove(); return; }` |
| Babylon.js canvas | ✅ | `#bg-canvas{display:none!important}` in CSS |
| ScrollSmoother | ✅ | `if (!HAS_GSAP || !HAS_ST || !has('ScrollSmoother') || REDUCED_MOTION) return null` |
| Scroll cue animation | ✅ | CSS `animation-duration:.01ms !important` |
| Marquee | ✅ | CSS `.marquee-track{animation:none!important}` |
| Esp card transforms | ✅ | CSS `.esp-card{transform:none!important;opacity!important}` |
| Step reveals | ✅ | CSS `.step{opacity!important;transform:none!important}` |
| Custom cursor | ✅ | CSS `@media(hover:none),(pointer:coarse){.cursor-dot,.cursor-ring{display:none}}` |
| Drag animations | ⚠️ | `gsap.to()` calls in `onDrag`/`onRelease` fire even with reduced motion — Draggable itself still allows dragging |

#### `maissorriso.html`
| Animation | Handled? | Details |
|---|---|---|
| Loader | ✅ | Early return: `if(REDUCED){ revealAllStatic(); hideLoader(); ... return; }` |
| Hero title reveal | ✅ | Skipped — `gsap.set('.hero-title', { opacity: 1, y: 0 })` |
| Hero element reveals | ✅ | `gsap.fromTo()` calls still fire with small delays — but in reduced motion the function returns before `boot()` is called |
| ScrollSmoother | ✅ | `if(!REDUCED && typeof ScrollSmoother !== 'undefined')` |
| Scroll reveals | ✅ | `revealAllStatic()` sets all `[data-reveal]` to visible |
| Horizontal treatment cards | ✅ | `mm.add('(min-width: 901px)')` — not affected by reduced motion, but `boot()` is never called when `REDUCED` |
| Cursor | ✅ | Hidden via CSS media query |
| Marquee | ✅ | Uses CSS `@keyframes` — disabled via CSS reduced-motion |
| Floating emojis | ✅ | `Draggable.create()` only runs if `typeof Draggable !== 'undefined' && !REDUCED` |
| Button ripple | ✅ | Not triggered in reduced motion (boot returns early) |

#### `tea.html`
| Animation | Handled? | Details |
|---|---|---|
| Panel transitions | ⚠️ | `var dur = reduce ? 0.16 : 0.8` — still transitions, just faster (0.16s) |
| Blob morph | ⚠️ | `if (HAS_MORPH && !reduce)` — blob fill still transitions even with reduced motion |
| Floating dots | ✅ | `if (!reduceMotionMQ.matches) startFloating()` |
| Hero SplitText | ⚠️ | `runHeroReveal()` is called unconditionally — SplitText animates even with reduced motion |
| Motion toggle button | ✅ | User-controlled `aria-pressed` toggle to disable all motion |
| Keyboard navigation | ✅ | Arrow keys navigate panels — always available |
| Panel inner scale fitting | ✅ | Pure layout, no animation |

---

## 4. GSAP 3.15 Improvements Applied

### 4.1 Old Ways Found

| Pattern | Files Found In | Issue |
|---|---|---|
| `gsap.from()` instead of `gsap.fromTo()` | `index.html:880-888`, `gisele.html:1178,1210,1393`, `tea.html:718,726-728` | Unsafe — elements stay at `from` state if animation is interrupted or reversed |
| Not using `gsap.context()` for cleanup | `index.html`, `gisele.html`, `maissorriso.html` | No scoped cleanup — animations accumulate on hot reload |
| Using `gsap.set()` + `gsap.from()` | `gisele.html:1258,1274` | Redundant — `gsap.fromTo()` is cleaner and safer |
| Missing `overwrite:'auto'` | `index.html:880-882,959,965,991,1003` | Competing tweens on same elements may stack |
| Using `window.matchMedia()` directly | `index.html:867,894,1108`, `gisele.html:1025,1127`, `sanare.html:953,1477`, `maissorriso.html:951-952` | Not using `gsap.matchMedia()` — responsive animations not properly scoped |
| Not using `gsap.utils.toArray()` | `index.html:648,869,958,963,974,1002,1005` | Using `querySelectorAll` + spread `[...]` instead of `gsap.utils.toArray()` |
| Missing `ScrollTrigger.batch()` | `index.html:958-960,974-976,1002-1007` | Individual ScrollTrigger per element instead of batched — more scroll listeners |
| Missing `invalidateOnRefresh` on pin | `sanare.html:1391`, `maissorriso.html:1239` | Pinned sections may misalign after resize |
| Not using `gsap.quickTo()` for cursor | `sanare.html:1669-1672`, `maissorriso.html:1119-1122` | Using `quickTo` ✅ (already applied) — but `index.html:895-896` also uses it ✅ |
| Using `requestAnimationFrame` instead of `gsap.ticker` | `maissorriso.html:1159` | `requestAnimationFrame` for parallax — `gsap.ticker` is more efficient |
| Missing `autoAlpha` | `index.html:880-882,906,907` | Using `opacity` + separate visibility instead of `autoAlpha` |
| Missing `gsap.utils.wrap()` | `sanare.html:1417` | ✅ Already using `gsap.utils.wrap(0, total)` |
| Manual scroll listeners | `index.html:1085-1088`, `gisele.html:1057` | `window.addEventListener("mousemove", ...)` for Babylon — `ScrollTrigger` can't replace this, but `gsap.quickTo` is used for the cursor ✅ |

### 4.2 New GSAP 3.15 Ways Already Applied

| Pattern | Files Where Applied |
|---|---|
| `gsap.context()` for scoped cleanup | ❌ Not found in any file — this is the biggest gap |
| `gsap.matchMedia()` for responsive breakpoints | `sanare.html:1378`, `gisele.html:1321`, `lobo-mayer.html:814`, `maissorriso.html:1230`, `tea.html:814` ✅ |
| `gsap.quickTo()` for high-frequency pointer tracking | `index.html:895-896,980`, `sanare.html:1669-1672,1694-1695`, `gisele.html:1376-1377`, `lobo-mayer.html` (cursor), `maissorriso.html:1119-1122,1142-1143` ✅ |
| `ScrollTrigger.batch()` for grouped reveals | `sanare.html:1315,1345,1351,1357,1363`, `gisele.html:1259,1274,1295`, `maissorriso.html:1193,1256,1311` ✅ |
| `autoAlpha` instead of `opacity+visibility` | `sanare.html:1440-1443,1532-1535,1577,1586`, `lobo-mayer.html:657,726`, `maissorriso.html:1406,1493` ✅ |
| `overwrite:'auto'` on competing tweens | `sanare.html:1244-1245,1445,1466`, `gisele.html:1092-1098,1246,1262`, `maissorriso.html:1205-1207,1319` ✅ |
| `gsap.utils.wrap()` for modular indexing | `sanare.html:1417`, `lobo-mayer.html:799` ✅ |
| Conditional plugin registration | `index.html:644`, `sanare.html:944-975`, `gisele.html:1021-1032`, `lobo-mayer.html:560-601`, `maissorriso.html:949-1039`, `tea.html:559-577` ✅ |
| `ScrollTrigger.config({ ignoreMobileResize: true })` | `sanare.html:1204`, `lobo-mayer.html:637` ✅ |
| `invalidateOnRefresh: true` on pinned sections | `sanare.html:1391`, `maissorriso.html:1239` ✅ |
| `gsap.ticker.lagSmoothing(0)` | `sanare.html:990`, `gisele.html:1139`, `lobo-mayer.html`, `maissorriso.html:1050` ✅ |

### 4.3 Key Improvement: `gsap.context()` (Missing Everywhere)

The single most impactful GSAP 3.15 improvement not yet applied. All files should wrap their animation setup in `gsap.context()`:

```js
// BEFORE (current pattern in all files):
function boot() {
  gsap.to('.hero-title', { ... });
  ScrollTrigger.create({ ... });
  // No cleanup — on SPA navigation or hot reload, tweens accumulate
}

// AFTER (recommended):
let ctx;
function boot() {
  ctx = gsap.context(() => {
    gsap.to('.hero-title', { ... });
    ScrollTrigger.create({ ... });
  }, document.body); // scope to body
}

// On cleanup (page unload, SPA route change):
function cleanup() {
  if (ctx) ctx.revert(); // kills all tweens, removes ScrollTriggers, restores CSS
}
window.addEventListener('beforeunload', cleanup);
```

**Files to update:** All 6 HTML files.

---

## 5. Accessibility Improvements

### 5.1 Skip Links

| File | Status | Details |
|---|---|---|
| `index.html` | ✅ | `<a href="#top" class="sr-only sr-only-focusable">Skip to main content</a>` |
| `sanare.html` | ✅ | `<a href="#hero" class="skip-link">Pular para o conteúdo</a>` |
| `gisele.html` | ✅ | Enterprise skip link injected via JS |
| `lobo-mayer.html` | ✅ | `<a href="#main" class="skip-link">Pular para o conteúdo</a>` |
| `maissorriso.html` | ✅ | Enterprise skip link injected via JS |
| `tea.html` | ✅ | `<a class="skip-link" href="#s-contato">Pular para o contato</a>` |

### 5.2 ARIA Labels on Interactive Elements

| File | Status | Details |
|---|---|---|
| `index.html` | ✅ | `aria-label` on nav, brand, menu toggle, gallery cards, SVG lab, lang buttons |
| `sanare.html` | ✅ | `aria-label` on nav, brand, theme toggle, care triggers, loop controls, gallery |
| `gisele.html` | ✅ | `aria-label` on menu toggle, phone link, FAQ buttons |
| `lobo-mayer.html` | ✅ | `aria-label` on nav, brand, call button, dot nav, esp cards |
| `maissorriso.html` | ✅ | `aria-label` on menu toggle, WhatsApp links, map iframe |
| `tea.html` | ✅ | `aria-label` on motion toggle, next button, dot nav buttons |

### 5.3 Focus Management in Mobile Menus

| File | Focus Trap | Escape Key | Focus Restore |
|---|---|---|---|
| `index.html` | ✅ | ✅ | ✅ `lastFocused` saved |
| `sanare.html` | ❌ Missing | ❌ | ❌ |
| `gisele.html` | ❌ Missing | ❌ | ❌ |
| `lobo-mayer.html` | ❌ Missing | ❌ | ❌ |
| `maissorriso.html` | ❌ Missing | ✅ Escape closes | ❌ |
| `tea.html` | N/A (no hamburger) | N/A | N/A |

### 5.4 Screen Reader Announcements for Dynamic Content

| File | Status | Details |
|---|---|---|
| `index.html` | ⚠️ | Toast uses `role="status" aria-live="polite"` ✅ but panel changes are not announced |
| `sanare.html` | ✅ | Loop panel changes update `aria-live="polite"` region; care accordion uses `aria-expanded` |
| `gisele.html` | ⚠️ | FAQ uses `aria-expanded` ✅ but no live region for dynamic state changes |
| `lobo-mayer.html` | ✅ | `#espStatus` with `role="status" aria-live="polite"` for carousel position |
| `maissorriso.html` | ⚠️ | `aria-expanded` on FAQ ✅ but no live region for state changes |
| `tea.html` | ✅ | `#srAnnounce` with `aria-live="polite"` — announces section changes |

### 5.5 Keyboard Navigation Support

| File | Arrow Keys | Tab Navigation | Enter/Space Activation |
|---|---|---|---|
| `index.html` | N/A | ✅ | ✅ |
| `sanare.html` | N/A | ✅ | ✅ (care accordion, loop controls) |
| `gisele.html` | N/A | ✅ | ✅ (FAQ, menu) |
| `lobo-mayer.html` | N/A | ✅ | ✅ (esp carousel via arrows on mobile) |
| `maissorriso.html` | N/A | ✅ | ✅ (arc accordion) |
| `tea.html` | ✅ ArrowUp/Down/PageUp/PageDown/Home/End | ✅ | ✅ |

### 5.6 Reduced Motion as Accessibility

| File | `prefers-reduced-motion` | User Toggle | Scope |
|---|---|---|---|
| `index.html` | ✅ CSS + JS | ❌ | All animations |
| `sanare.html` | ✅ CSS + JS | ❌ | All animations + Babylon canvas |
| `gisele.html` | ✅ CSS + JS | ❌ | All animations |
| `lobo-mayer.html` | ✅ CSS + JS | ❌ | All animations + Babylon canvas |
| `maissorriso.html` | ✅ CSS + JS | ❌ | All animations |
| `tea.html` | ✅ CSS + JS | ✅ `#motion-toggle` | All animations — **best practice** |

**Recommendation:** All files should include an in-page motion toggle like `tea.html` does, since `prefers-reduced-motion` is not always set by users who would benefit from it.

---

## 6. Performance Improvements

### 6.1 Lazy Loading Images

| File | Status | Details |
|---|---|---|
| `index.html` | N/A | No `<img>` tags — all visuals are CSS/SVG |
| `sanare.html` | N/A | No `<img>` tags — all visuals are CSS backgrounds or Babylon.js |
| `gisele.html` | ⚠️ | No `<img>` tags — hero portrait is a CSS shape. Map iframe has `loading="lazy"` ✅ |
| `lobo-mayer.html` | ⚠️ | No `<img>` tags — visuals are CSS. Map iframe has `loading="lazy"` ✅ |
| `maissorriso.html` | ✅ | Hero image: `fetchpriority="high" decoding="async"` ✅; all other images: `loading="lazy" decoding="async"` ✅ |
| `tea.html` | ✅ | Enterprise runtime adds `loading="lazy"` and `decoding="async"` to all images dynamically |

### 6.2 Decoding Async on Images

All files that use `<img>` tags set `decoding="async"` — ✅ applied universally.

### 6.3 Visibility API to Pause Render Loops

| File | Status | Details |
|---|---|---|
| `index.html` | ✅ | `document.addEventListener("visibilitychange", ...)` — stops/restarts Babylon render loop |
| `sanare.html` | ✅ | `document.addEventListener('visibilitychange', ...)` — stops/restarts Babylon render loop |
| `gisele.html` | ✅ | `document.addEventListener('visibilitychange', ...)` — pauses/resumes GSAP globalTimeline |
| `lobo-mayer.html` | ✅ | Babylon canvas removed on reduced motion; ambient field uses `gsapRef.ticker.add()` — ticker pauses when tab hidden |
| `maissorriso.html` | ⚠️ | No visibility API handler — marquee and emoji tweens keep running when tab is hidden |
| `tea.html` | ✅ | `document.addEventListener('visibilitychange', ...)` — pauses/resumes `gsap.globalTimeline` |

### 6.4 Conditional Babylon.js Loading

| File | Status | Details |
|---|---|---|
| `index.html` | ✅ | `if (!reduce && !isMobile) { try { initBabylon(); } }` — skipped on mobile + reduced motion |
| `sanare.html` | ✅ | `if (!HAS_BABYLON || REDUCED_MOTION) { canvasEl.style.display = 'none'; boot(); return; }` |
| `gisele.html` | N/A | No Babylon.js |
| `lobo-mayer.html` | ✅ | Babylon canvas removed on reduced motion; ambient field is a 2D canvas (lightweight) |
| `maissorriso.html` | N/A | No Babylon.js |
| `tea.html` | N/A | No Babylon.js |

### 6.5 Font Loading with Fallbacks

| File | Strategy | Details |
|---|---|---|
| `index.html` | System fonts | `Inter,ui-sans-serif,system-ui,...` — no external font loading |
| `sanare.html` | CSS variables | `--serif:'Fraunces',serif; --sans:'Inter',sans-serif` — assumed system-local |
| `gisele.html` | `@font-face` with `font-display:swap` | `src:local('Fraunces')` / `src:local('Public Sans')` — local-only, no network fetch |
| `lobo-mayer.html` | System fonts | `--serif:'Fraunces',serif; --sans:'Inter',sans-serif` — assumed system-local |
| `maissorriso.html` | Google Fonts with preconnect | `<link rel="preconnect">` + `font-display:swap` ✅ — proper loading strategy |
| `tea.html` | System fonts | `'Nunito',system-ui,sans-serif` / `'Baloo 2',system-ui,sans-serif` — system fallback |

### 6.6 ScrollSmoother vs Native Scroll Decisions

| File | ScrollSmoother Used? | Conditions | Fallback |
|---|---|---|---|
| `index.html` | ❌ Not used | N/A — native scroll | N/A |
| `sanare.html` | ✅ Yes | `smooth: 1.2, smoothTouch: 0.1` — disabled on touch/narrow/reduced motion | Native smooth scroll |
| `gisele.html` | ✅ Yes | `smooth: 1.2` — disabled on touch/narrow/reduced motion | Native smooth scroll |
| `lobo-mayer.html` | ✅ Yes | `smooth: 0.85, smoothTouch: 0.08` — disabled on reduced motion | Native scroll with `no-gsap` class |
| `maissorriso.html` | ✅ Yes | `smooth: 1.2, smoothTouch: 0` — disabled on reduced motion | Native smooth scroll |
| `tea.html` | ✅ Yes (wrapper only) | `#smooth-wrapper` CSS present but no `ScrollSmoother.create()` in JS | Panel-based navigation — no scroll |

**Recommendation:** `ScrollSmoother` is justified for the scroll-pinned sections and scrub-linked animations in `sanare.html`, `gisele.html`, `lobo-mayer.html`, and `maissorriso.html`. The `index.html` (Yang Tech) correctly avoids it since it has no scroll-pinned sections. `tea.html` doesn't use ScrollSmoother's JS — the wrapper CSS is a no-op.

---

## Summary of Critical Fixes Needed

1. **`gsap.context()` for cleanup** — Apply to all 6 files to prevent animation accumulation
2. **Focus traps in mobile menus** — Missing in `sanare.html`, `gisele.html`, `lobo-mayer.html`, `maissorriso.html`
3. **`viewport-fit=cover`** — Missing in `index.html`, `sanare.html`, `gisele.html`, `maissorriso.html`
4. **WCAG 2.5.5 touch targets** — `.lang-btn` (index), `.dot-btn` (tea), `.esp-arrow` (lobo-mayer) are below 44×44px
5. **In-page motion toggle** — Only `tea.html` has one; all others should follow this pattern
6. **Visibility API for `maissorriso.html`** — Marquee and emoji tweens waste CPU when tab is hidden
7. **Ambient rotations in `sanare.html`** — `fiberRoot` and `speckRoot` rotations run unconditionally, ignoring reduced motion
8. **`.gitignore`** — Add to exclude backup files from version control
