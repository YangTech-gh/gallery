---
name: gsap-modern-sites
description: Build and improve modern GSAP-driven websites, immersive landing pages, portfolios, editorial scrollytelling, interactive navigation, SVG choreography, responsive motion systems, and framework integrations. Use for vanilla JS, React, Vue, Nuxt, Svelte, Next.js, or Webflow tasks involving timelines, ScrollTrigger, ScrollSmoother, Flip, Draggable, Observer, SplitText, ScrambleText, TextPlugin, MotionPath, MorphSVG, SVG, physics, accessibility, performance, or reduced-motion behavior.
license: MIT
---

# GSAP Modern Sites

## Mission

Use GSAP as a **motion system**, not as a collection of unrelated entrance effects. Give each scene a clear job: reveal hierarchy, preserve spatial continuity, communicate state, guide attention, or make an interaction feel physical. Keep content, semantics, focus order, and non-animated fallbacks valid when motion is unavailable.

GSAP is an appropriate default when the request needs orchestrated timelines, interruptible interactions, scroll-linked progress, SVG choreography, responsive layout continuity, or framework-safe cleanup. Respect an existing library choice when the user has already selected one. Use the public `gsap` package and register only the plugins the route actually needs. [1] [2]

## Start with an experience contract

Before writing animation code, state the visual behavior in one sentence. Examples include “the archive folds into a navigable map as the reader scrolls,” “the product follows responsive waypoints through a feature story,” or “the headline changes from readable words to energetic characters when the user selects a mode.” Then choose a small vocabulary of timing, easing, distance, and interaction primitives and reuse it across the page.

Ask four questions for every surface: **What is entering? What is changing? What remains continuous? What is the user’s next action?** Prefer a short core tween for local feedback, a named timeline for choreography, `ScrollTrigger` for scroll position, `Flip` for layout continuity, `MotionPathPlugin` for measured routes, `MorphSVGPlugin` for vector geometry, and `SplitText` for deliberately art-directed text.

| Layer | Responsibility | Preferred GSAP tools |
| --- | --- | --- |
| Spatial system | Entrance, exit, hover, focus, and state changes | `gsap.to`, `from`, `fromTo`, `set`, transforms, `autoAlpha` |
| Choreography | Ordered sequences and reversible scenes | `gsap.timeline`, labels, position parameters |
| Narrative | Scroll progress, pinning, snapping, and galleries | `ScrollTrigger`, `containerAnimation`, `batch` |
| Continuity | Reorder, expansion, layout change, and route transitions | `Flip` |
| Input | Drag, throw, swipe, wheel, and pointer direction | `Draggable`, `InertiaPlugin`, `Observer` |
| Typography | Lines, words, characters, replacement, and scramble | `SplitText`, `TextPlugin`, `ScrambleTextPlugin` |
| Graphic language | Draw, morph, path-following, and custom curves | `DrawSVGPlugin`, `MorphSVGPlugin`, `MotionPathPlugin`, `CustomEase` |
| Runtime discipline | Responsive conditions, cleanup, math, and render cost | `matchMedia`, `gsap.context`, `gsap.utils`, `quickTo` |

## Installation and registration

**Required version: GSAP 3.15 or above.** All CDN references must use `gsap@3.15.0` or later. Do not use older versions.

### Free plugins available on public CDN (jsdelivr)

All of these are free and safe for production:

| Plugin | CDN path | Purpose |
| --- | --- | --- |
| `gsap` (core) | `gsap@3.15.0/index.js` | Core tweens, timelines, utilities |
| `ScrollTrigger` | `gsap@3.15.0/ScrollTrigger.js` | Scroll-linked animation, pin, scrub, snap, batch |
| `ScrollToPlugin` | `gsap@3.15.0/ScrollToPlugin.js` | Programmatic scroll navigation |
| `Flip` | `gsap@3.15.0/Flip.js` | Layout continuity, spatial identity |
| `Draggable` | `gsap@3.15.0/Draggable.js` | Direct manipulation, drag, throw |
| `Observer` | `gsap@3.15.0/Observer.js` | Wheel, swipe, pointer direction input |
| `SplitText` | `gsap@3.15.0/SplitText.js` | Line, word, character text animation |
| `TextPlugin` | `gsap@3.15.0/TextPlugin.js` | Short text replacement, counters |
| `MotionPathPlugin` | `gsap@3.15.0/MotionPathPlugin.js` | Path-following, orbit, waypoints |

### Premium plugins (Club GSAP — require license)

| Plugin | CDN path | Purpose |
| --- | --- | --- |
| `ScrollSmoother` | `gsap@3.15.0/ScrollSmoother.js` | Smooth scroll with parallax |
| `DrawSVGPlugin` | `gsap@3.15.0/DrawSVGPlugin.js` | SVG stroke animation |
| `MorphSVGPlugin` | `gsap@3.15.0/MorphSVGPlugin.js` | SVG path morphing |
| `ScrambleTextPlugin` | `gsap@3.15.0/ScrambleTextPlugin.js` | Text scramble effects |
| `CustomEase` | `gsap@3.15.0/CustomEase.js` | Custom easing curves |
| `Physics2DPlugin` | `gsap@3.15.0/Physics2DPlugin.js` | 2D physics simulation |

### CDN installation (static prototypes)

```html
<!-- ES Module approach (preferred) -->
<script type="module">
  import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/index.js";
  import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollTrigger.js";
  import { Flip } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/Flip.js";
  import { Observer } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/Observer.js";
  import { SplitText } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/SplitText.js";
  import { TextPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/TextPlugin.js";
  import { MotionPathPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/MotionPathPlugin.js";
  import { ScrollToPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/ScrollToPlugin.js";
  import { Draggable } from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/Draggable.js";

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip, Draggable, Observer, SplitText, TextPlugin, MotionPathPlugin);
</script>

<!-- Classic script approach (alternative) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollSmoother.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/Flip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/Observer.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/Draggable.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/SplitText.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/TextPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/MotionPathPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollToPlugin.min.js"></script>
```

For npm projects:

```bash
npm install gsap@^3.15.0
# React projects may also use:
npm install @gsap/react
```

Register plugins once at application scope, before first use and outside render paths. Keep development-only tools such as markers and `GSDevTools` out of production. [1] [2]

## Choose the pattern before the effect

Use the following decision map and read `references/codepen-use-cases.md` for the analyzed implementation and complete snippets.

| User need | Start with | Reference use case |
| --- | --- | --- |
| A mosaic should expand into a focused, full-screen arrangement | `Flip` + pinned `ScrollTrigger` | Scrubbed bento gallery |
| A visual object should visit responsive content landmarks | `MotionPathPlugin` | DOM-measured motion path waypoints |
| Finite full-screen chapters should keep cycling | Layered `ScrollTrigger` pins | Infinite-loop panels and sections |
| SVG primitives should become compatible morph targets | `MorphSVGPlugin.convertToPath()` | SVG primitive normalization and morphing |
| One headline needs character, word, and line animation modes | `SplitText` | Text animation controls |

### Use the scrubbed bento gallery for layout continuity

Build the gallery as a normal CSS Grid first. Temporarily apply the destination class, capture the item state with `Flip.getState()`, remove the class, and add the resulting `Flip` animation to a pinned, scrubbed timeline. Rebuild after responsive layout changes. Preserve image dimensions before measuring and provide a reduced-motion path that uses the final grid without the transition.

### Use DOM-measured waypoints for responsive routes

Place semantic markers in the layout and calculate each marker center relative to the animated object’s starting center. Pass the resulting relative points to `MotionPathPlugin`, use `ease: "none"` for direct scroll mapping, and rebuild after resize, font loading, image loading, or any layout change. Keep the sequence represented in headings, labels, or a list so the path is explanatory rather than the only source of information.

### Use infinite looping panels selectively

Clone the first panel to create a terminal visual state, pin each panel with `pinSpacing: false`, snap to section increments, and wrap the scroll position away from exact top and bottom boundaries. Provide an active-section indicator, direct navigation, and a clear exit. Treat the pattern as a specialized chapter or installation experience, not a default for ordinary documents. Test keyboard, touch, history, focus, and reduced motion carefully.

### Normalize SVG primitives before morphing

Call `MorphSVGPlugin.convertToPath("circle, rect, polygon")` before morphing compatible targets. Prepare path geometry, fill rules, winding direction, gradients, and transforms deliberately. Keep an accessible label or text equivalent for state changes and retain a static SVG fallback.

### Split text only when the content supports it

Create one `SplitText` instance with the smallest useful type set, such as `chars,words,lines`. Animate `split.chars`, `split.words`, or `split.lines` according to the message. Revert the prior animation before replaying a new mode, and revert/recreate the split after resize or font changes. Preserve a stable readable text node or accessible label; never make essential copy exist only inside animation spans.

## Core implementation rules

Use timelines and position parameters instead of delay chains. Set restrained defaults such as `0.18–0.28s` for feedback, `0.45–0.8s` for entrances, and `1–2.4s` for editorial scenes. Prefer `power2.out` or `power3.out` for everyday UI, `none` for scroll-position mappings, and custom eases only when they express a deliberate brand or physical behavior.

```js
gsap.defaults({ duration: 0.6, ease: "power2.out" });

const hero = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });
hero
  .from(".eyebrow", { y: 12, autoAlpha: 0 })
  .from(".title-line", { yPercent: 110, stagger: 0.07 }, "-=0.3")
  .from(".hero-media", { scale: 1.12, autoAlpha: 0 }, "-=0.4");
```

Build scroll scenes in document order. Put `ScrollTrigger` on a top-level timeline, use either scrub mapping or discrete `toggleActions`, and do not combine them. For fake horizontal scrolling, pin a wrapper, animate an inner track with `ease: "none"`, and use `containerAnimation` for nested triggers. Animate children of pinned elements rather than the pinned element itself. Call `ScrollTrigger.refresh()` after real layout changes, not on every input event. [3]

Use `quickTo()` for pointer followers and magnetic controls, `quickSetter()` for very hot paths, `Observer` for directional gestures, and `Draggable` for direct manipulation. Guard repeated input with one master timeline, `isActive`, `overwrite: "auto"`, or a finite state machine. Keep hit targets larger than the visual label and provide keyboard or button equivalents.

Animate transforms and opacity whenever possible. Avoid using `width`, `height`, `top`, `left`, `margin`, or `padding` as movement properties when transforms express the same result. Batch reads before writes, reserve image and font dimensions, use `stagger` for repeated work, and stop or virtualize expensive off-screen scenes.

## Framework integration and cleanup

Create animations only after the component DOM exists, scope selectors to a root ref, and revert on unmount or route change. In React, prefer `useGSAP()` with a `scope` ref and use `contextSafe` for event handlers created after the hook. In Vue, Nuxt, and Svelte, use the mounted lifecycle with `gsap.context()` and the framework teardown hook. In Next.js and other SSR environments, do not execute browser-only GSAP code during server render.

```jsx
const root = useRef(null);
const button = useRef(null);

const { contextSafe } = useGSAP(() => {
  gsap.from(".item", { y: 24, autoAlpha: 0, stagger: 0.08 });
}, { scope: root });

const onClick = contextSafe(() => {
  gsap.to(button.current, {
    rotation: "+=8_short",
    duration: 0.2,
    yoyo: true,
    repeat: 1
  });
});
```

For responsive scenes, use `gsap.matchMedia()` rather than manually accumulating breakpoint conditionals. Ensure the matching context reverts when conditions change, and do not nest a new `gsap.context()` inside an already scoped `matchMedia` block.

```js
const mm = gsap.matchMedia();
mm.add({
  desktop: "(min-width: 800px)",
  reduce: "(prefers-reduced-motion: reduce)"
}, ({ conditions }) => {
  gsap.to(".hero-art", {
    x: conditions.reduce ? 0 : conditions.desktop ? 80 : 24,
    duration: conditions.reduce ? 0 : 1.2
  });
});

// On route teardown:
// mm.revert();
```

## Accessibility and reduced motion

Motion must not be the only way to discover hierarchy, state, or content. Preserve semantic headings, visible focus, keyboard controls, predictable focus order, and non-animated fallback states. Respect `prefers-reduced-motion` by reducing distance, duration, parallax, and loop behavior before removing necessary feedback. Avoid continuous motion that creates vestibular discomfort, including large pinned backgrounds, infinite zooms, and aggressive cursor effects.

For `SplitText`, configure ARIA deliberately and keep a stable accessible label. For `autoAlpha`, remember that hidden elements become non-visible and non-interactive; do not hide required content. For canvas, Pixi, SVG, and morph scenes, keep a semantic DOM layer for headings, controls, focus, and reduced-motion alternatives.

## Production checklist

| Check | Pass condition |
| --- | --- |
| Intent | Every scene communicates hierarchy, state, or narrative; no animation exists merely because it can be added |
| Architecture | Each major section owns a timeline or trigger; avoid deep nested `ScrollTrigger` instances |
| Registration | Every plugin is registered once before use; development-only tools are excluded from production |
| Layout | Movement uses transforms; pinned elements animate children; dynamic layout changes call `refresh()` |
| Interruption | Hover, route, resize, and repeated input do not create runaway tweens or stale callbacks |
| Responsive | `matchMedia` or an equivalent handles breakpoints and reduced motion |
| Framework | Selectors are scoped; unmount and route changes call `revert()` or `kill()` |
| Accessibility | Focus, keyboard, semantic text, and non-motion fallbacks work without visual animation |
| QA | Touch, coarse pointer, slow device, fonts, images, late-loaded content, and narrow widths were tested |

## Do not

Do not build a site as a linear parade of opacity reveals. Do not place `ScrollTrigger` on child tweens inside a timeline. Do not combine `scrub` and `toggleActions`. Do not use a non-linear ease on the horizontal tween that drives `containerAnimation`. Do not animate layout properties when transforms are sufficient. Do not register plugins per render, run GSAP during SSR, leave global selectors unscoped, forget cleanup, ship markers, ship `GSDevTools`, or hide essential content from assistive technology.

## Bundled reference

Read [`references/codepen-use-cases.md`](references/codepen-use-cases.md) when adapting one of the five analyzed patterns. It includes source-derived HTML/CSS/JS snippets, practical use cases, extraction notes, accessibility fallbacks, and performance cautions for the scrubbed gallery, MotionPath waypoints, infinite loop panels, SVG conversion, and SplitText text animation.

## References

[1]: https://github.com/greensock/gsap-skills "Official GSAP skills repository"
[2]: https://gsap.com/docs/v3/GSAP/ "GSAP core documentation"
[3]: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ "ScrollTrigger documentation"
[4]: https://gsap.com/docs/v3/Plugins/Flip/ "Flip documentation"
[5]: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/ "MotionPathPlugin documentation"
[6]: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/ "MorphSVGPlugin documentation"
[7]: https://gsap.com/docs/v3/Plugins/SplitText/ "SplitText documentation"
[8]: https://gsap.com/resources/React/ "GSAP with React"
[9]: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/ "gsap.matchMedia documentation"
[10]: https://codepen.io/GreenSock/pen/vYMzKZx "Scrubbed Bento Gallery"
[11]: https://codepen.io/GreenSock/pen/raerLaK "MotionPath - plot through points"
[12]: https://codepen.io/GreenSock/pen/VwbywPd "Layered pinning with infinite looping"
[13]: https://codepen.io/GreenSock/pen/gagNeR "MorphSVG: convertToPath()"
[14]: https://codepen.io/GreenSock/pen/xxmaNYj "SplitText Demo"

[1] [2] [3] [4] [5] [6] [7] [8] [9] [10] [11] [12] [13] [14]
