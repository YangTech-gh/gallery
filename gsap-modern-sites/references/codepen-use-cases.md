# GSAP CodePen Use Cases

Use this reference when a modern-site request resembles one of the five proven interaction patterns below. The snippets are intentionally small, but each pattern includes the architectural decision, the best-fit use case, and the production caveats that matter when adapting it to a real site.

## 1. Scrubbed bento gallery: `Flip` plus `ScrollTrigger`

**Source:** [Scrubbed Bento Gallery](https://codepen.io/GreenSock/pen/vYMzKZx)

### What the demo does

The gallery starts as a compact CSS Grid composition and becomes a full-viewport arrangement while the user scrolls. The implementation temporarily applies a final-state class, captures the layout with `Flip.getState()`, removes the class, and then drives `Flip.to()` from a pinned `ScrollTrigger` timeline. A resize rebuilds the measured state.

### Use it for

Use this for a portfolio index that turns one mosaic into a project browser, a product family that expands from overview to individual panels, an editorial image wall, or a case-study opener that shifts from art direction into readable content. The key product decision is that the layout change must preserve spatial continuity: the user should understand that the same tiles changed position rather than seeing a new gallery fade in.

### Reference implementation

```html
<div class="gallery-wrap">
  <div class="gallery gallery--bento" id="gallery-8">
    <div class="gallery__item"><img src="/images/one.jpg" alt="Project one"></div>
    <div class="gallery__item"><img src="/images/two.jpg" alt="Project two"></div>
    <div class="gallery__item"><img src="/images/three.jpg" alt="Project three"></div>
    <div class="gallery__item"><img src="/images/four.jpg" alt="Project four"></div>
    <div class="gallery__item"><img src="/images/five.jpg" alt="Project five"></div>
    <div class="gallery__item"><img src="/images/six.jpg" alt="Project six"></div>
    <div class="gallery__item"><img src="/images/seven.jpg" alt="Project seven"></div>
    <div class="gallery__item"><img src="/images/eight.jpg" alt="Project eight"></div>
  </div>
</div>
```

```css
.gallery-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.gallery {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1vh;
  grid-template-columns: repeat(3, 32.5vw);
  grid-template-rows: repeat(4, 23vh);
  justify-content: center;
  align-content: center;
}

.gallery--final {
  grid-template-columns: repeat(3, 100vw);
  grid-template-rows: repeat(4, 49.5vh);
}

.gallery__item:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
.gallery__item:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
.gallery__item:nth-child(3) { grid-area: 2 / 2 / 4 / 3; }
.gallery__item:nth-child(4) { grid-area: 1 / 3 / 3 / 3; }
.gallery__item:nth-child(5) { grid-area: 3 / 1 / 3 / 2; }
.gallery__item:nth-child(6) { grid-area: 3 / 3 / 5 / 4; }
.gallery__item:nth-child(7) { grid-area: 4 / 1 / 5 / 2; }
.gallery__item:nth-child(8) { grid-area: 4 / 2 / 5 / 3; }

.gallery__item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

```js
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

let flipContext;

function createGalleryScene() {
  const gallery = document.querySelector("#gallery-8");
  if (!gallery) return;
  const items = gallery.querySelectorAll(".gallery__item");

  flipContext?.revert();
  gallery.classList.remove("gallery--final");

  flipContext = gsap.context(() => {
    gallery.classList.add("gallery--final");
    const state = Flip.getState(items);
    gallery.classList.remove("gallery--final");

    const flip = Flip.to(state, {
      simple: true,
      ease: "expoScale(1, 5)"
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: gallery,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: gallery.parentNode
      }
    });

    timeline.add(flip);
    return () => gsap.set(items, { clearProps: "all" });
  });
}

createGalleryScene();
window.addEventListener("resize", createGalleryScene);
```

**Production adaptation.** Preload or reserve image dimensions before measuring. Prefer `gsap.matchMedia()` for a different mobile composition rather than forcing desktop grid coordinates onto a narrow viewport. In a component, scope the selector to a root ref and remove the resize listener during teardown. Provide a reduced-motion branch that uses the final layout without the pinned transition.

## 2. Responsive path through DOM waypoints: `MotionPathPlugin`

**Source:** [MotionPath - plot through points](https://codepen.io/GreenSock/pen/raerLaK)

### What the demo does

The demo defines waypoints in the DOM rather than hard-coding viewport coordinates. It measures each `.marker`, subtracts the starting center of the animated `.box`, and passes the resulting relative `{x, y}` objects to `MotionPathPlugin`. Scroll progress controls a scrubbed path, and the whole timeline is rebuilt after resize so the route follows the new layout.

### Use it for

Use this for a product feature tour, a map-like service journey, a supply-chain or logistics story, an onboarding route, or a scrollytelling diagram in which the path should follow responsive content blocks. This pattern is especially useful when designers move waypoints in CSS and engineers should not have to recalculate coordinates manually.

### Reference implementation

```html
<div class="route">
  <div class="route__start"><div class="box"></div></div>
  <div class="route__stop"><div class="marker"></div></div>
  <div class="route__stop"><div class="marker"></div></div>
  <div class="route__stop"><div class="marker"></div></div>
  <div class="route__stop"><div class="marker"></div></div>
</div>
```

```js
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

let context;

function createRoute() {
  context?.revert();

  context = gsap.context(() => {
    const box = document.querySelector(".box");
    const start = box.getBoundingClientRect();
    const stops = gsap.utils.toArray(".route__stop");

    const points = stops.map((stop) => {
      const marker = stop.querySelector(".marker") || stop;
      const rect = marker.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - (start.left + start.width / 2),
        y: rect.top + rect.height / 2 - (start.top + start.height / 2)
      };
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".route__start",
        start: "clamp(top center)",
        endTrigger: ".route__stop:last-child",
        end: "clamp(top center)",
        scrub: 1
      }
    }).to(box, {
      duration: 1,
      ease: "none",
      motionPath: {
        path: points,
        curviness: 1.5
      }
    });
  });
}

createRoute();
window.addEventListener("resize", createRoute);
```

**Production adaptation.** Measure only after fonts, images, and responsive layout have settled. Use `autoRotate: true` only if orientation communicates direction. For complex routes, make the semantic explanation available in the DOM and treat the animated object as a visual aid, not the only representation of the sequence. Use a CSS/static path for reduced motion.

## 3. Infinite full-screen sections: layered pinning and bounded wrapping

**Source:** [Layered pinning with infinite looping](https://codepen.io/GreenSock/pen/VwbywPd)

### What the demo does

The demo clones the first panel to create a seamless terminal state, pins every panel with `pinSpacing: false`, snaps the page to section increments, and wraps the scroll position when the user reaches either boundary. The custom snap function keeps the scroll a small distance away from exact `0` and the maximum so the browser does not immediately unwrap the loop.

### Use it for

Use this for full-screen chapter experiences, product launch sections, event installations, kiosk interfaces, and “always-on” visual narratives in which the user should be able to keep moving through a finite set of panels. Treat the loop as a deliberate information architecture choice, not a default for ordinary content pages; users need a clear current-section indicator and a way to exit or jump directly to a chapter.

### Reference implementation

```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".panel");
panels[0].parentNode.appendChild(panels[0].cloneNode(true));

panels.forEach((panel) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    pin: true,
    pinSpacing: false
  });
});

let maxScroll;
const pageScroll = ScrollTrigger.create({
  snap(value) {
    const snapped = gsap.utils.snap(1 / panels.length, value);
    if (snapped <= 0) return 1.05 / maxScroll;
    if (snapped >= 1) return maxScroll / (maxScroll + 1.05);
    return snapped;
  }
});

function updateMaxScroll() {
  maxScroll = ScrollTrigger.maxScroll(window) - 1;
}

updateMaxScroll();
window.addEventListener("resize", updateMaxScroll);
window.addEventListener("scroll", (event) => {
  const scroll = pageScroll.scroll();
  if (scroll > maxScroll) {
    pageScroll.scroll(1);
    event.preventDefault();
  } else if (scroll < 1) {
    pageScroll.scroll(maxScroll - 1);
    event.preventDefault();
  }
}, { passive: false });
```

**Production adaptation.** Announce the active panel with semantic headings and a visible navigation control. Test keyboard scrolling, focus retention, touch momentum, browser history, and screen magnification. Keep the loop disabled or replaced with ordinary linear navigation for reduced motion when the wrap would be disorienting. Recalculate after dynamic content and do not assume that a browser’s native scroll boundary behaves identically on every device.

## 4. Normalize SVG primitives before morphing: `convertToPath()` and `MorphSVGPlugin`

**Source:** [MorphSVG: convertToPath()](https://codepen.io/GreenSock/pen/gagNeR)

### What the demo does

The demo converts SVG `circle`, `rect`, and `polygon` elements into path data, then morphs compatible shapes through a timeline. Converting primitives first gives the morphing plugin a consistent path representation while preserving the existing IDs used as sources and targets.

### Use it for

Use this for logo marks, menu icons, map pins, product diagrams, status icons, and branded transitions between simple vector states. It is more reliable than trying to morph arbitrary primitive types directly, and it keeps the source SVG editable for designers.

### Reference implementation

```js
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

MorphSVGPlugin.convertToPath("circle, rect, polygon");

gsap.timeline({
  repeat: 20,
  repeatDelay: 0.5,
  delay: 0.5,
  yoyo: true,
  defaults: { ease: "power2.inOut" }
})
  .to("#triangle", { morphSVG: "#a" })
  .to("#square", { morphSVG: "#b" })
  .to("#circle", { morphSVG: "#c" });
```

**Production adaptation.** Prepare compatible paths and test fill rules, winding direction, gradients, and transforms. Use a non-animated SVG state as the fallback. Keep `convertToPath()` and plugin registration at module scope, not inside a render function. If the morph communicates a state change, also update the accessible label or text state.

## 5. Text modes with `SplitText`: characters, words, and lines

**Source:** [SplitText Demo](https://codepen.io/GreenSock/pen/xxmaNYj)

### What the demo does

The demo creates one `SplitText` instance with `type: "chars,words,lines"`, then applies different animation recipes to the generated arrays. Before a new recipe runs it reverts the previous animation. On resize it reverts the split and recreates it so line wrapping remains accurate.

### Use it for

Use this for editorial headlines, hero copy, kinetic captions, product launch messaging, and an art-directed headline that offers several visual modes. Use characters for energetic short phrases, words for readable staggered copy, and lines for strong block-level entrances. Do not split long paragraphs or make the visual animation the only accessible copy.

### Reference implementation

```js
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

let split;
let animation;

function setupText() {
  split?.revert();
  animation?.revert();
  split = SplitText.create(".text", {
    type: "chars,words,lines"
  });
}

function play(targets, vars) {
  animation?.revert();
  animation = gsap.from(targets, vars);
}

document.querySelector("#chars")?.addEventListener("click", () => {
  play(split.chars, {
    x: 150, opacity: 0, duration: 0.7,
    ease: "power4", stagger: 0.04
  });
});

document.querySelector("#words")?.addEventListener("click", () => {
  play(split.words, {
    y: -100, opacity: 0,
    rotation: "random(-80, 80)", duration: 0.7,
    ease: "back", stagger: 0.15
  });
});

document.querySelector("#lines")?.addEventListener("click", () => {
  play(split.lines, {
    rotationX: -100,
    transformOrigin: "50% 50% -160px",
    opacity: 0, duration: 0.8,
    ease: "power3", stagger: 0.25
  });
});

setupText();
window.addEventListener("resize", setupText);
```

**Production adaptation.** Keep a stable semantic text node or accessible label. Re-split after font loading and width changes. Use `autoSplit` and `onSplit` when the supported SplitText version and project structure justify it. Avoid large rotations, long delays, and forced clipping in essential navigation or body copy.

## Pattern selection summary

| Need | Start with | Main implementation decision |
| --- | --- | --- |
| Overview grid becomes a focused arrangement | `Flip` + `ScrollTrigger` | Capture the final CSS layout, then animate the measured state inside a pinned timeline |
| An object should visit responsive content landmarks | `MotionPathPlugin` | Measure DOM waypoints and convert them to offsets relative to the moving object |
| A finite chapter sequence should keep cycling | Layered `ScrollTrigger` pins | Clone the first panel, snap to increments, and wrap the scroll boundaries carefully |
| SVG primitives need to become morphable geometry | `MorphSVGPlugin.convertToPath()` | Normalize primitives before morphing and keep a semantic fallback |
| A headline needs multiple animation granularities | `SplitText` | Split once, animate the appropriate array, revert before replay, and rebuild on resize |

## Shared rules extracted from the demos

Use a single source of truth for measured state and rebuild responsive scenes after layout changes. Use `gsap.context()` or `gsap.matchMedia()` so resize, route changes, and component unmounts revert created effects. Keep scroll-driven transforms on children of pinned elements, use `ease: "none"` when a tween is a direct scroll-position mapping, and reserve looping for experiences that remain understandable when revisited. Preserve semantic text, keyboard access, focus order, and reduced-motion fallbacks in every pattern.

## Sources

[1]: https://codepen.io/GreenSock/pen/vYMzKZx "Scrubbed Bento Gallery"
[2]: https://codepen.io/GreenSock/pen/raerLaK "MotionPath - plot through points"
[3]: https://codepen.io/GreenSock/pen/VwbywPd "Layered pinning with infinite looping - ScrollTrigger"
[4]: https://codepen.io/GreenSock/pen/gagNeR "MorphSVG: convertToPath()"
[5]: https://codepen.io/GreenSock/pen/xxmaNYj "SplitText Demo"
[6]: https://gsap.com/docs/v3/Plugins/Flip/ "Flip documentation"
[7]: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/ "MotionPathPlugin documentation"
[8]: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/ "MorphSVGPlugin documentation"
[9]: https://gsap.com/docs/v3/Plugins/SplitText/ "SplitText documentation"
[10]: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ "ScrollTrigger documentation"

*The CodePen examples are used as implementation references. Adapt assets, semantics, licensing, and accessibility behavior to the target project rather than copying demo-only markup unchanged.*

## Extraction notes

The source patterns were extracted from the public CodePen editor views on 2026-08-16. The scrubbed gallery uses eight image tiles, a temporary `.gallery--final` class, `Flip.getState()`, `Flip.to()`, and a pinned scrubbed trigger. The waypoint example computes relative centers from `.marker` elements. The loop example duplicates the first panel and wraps at `maxScroll`. The SVG example calls `MorphSVGPlugin.convertToPath("circle, rect, polygon")` before morphing `#triangle`, `#square`, and `#circle`. The text example creates `chars`, `words`, and `lines` arrays and reverts the split on resize.

When the upstream demo evolves, re-check the source link and update the snippets instead of assuming the public pen remains byte-for-byte identical.

## Implementation cautions

The infinite-loop scroll handler uses a non-passive listener so it can preventDefault at the boundaries. Treat that as a specialized interaction, verify browser behavior on touch devices, and provide an explicit linear navigation alternative. The demos use direct DOM selectors for clarity; framework implementations must scope selectors and clean up listeners, triggers, contexts, and cloned nodes.

## Accessibility checklist for these patterns

| Pattern | Minimum fallback |
| --- | --- |
| Scrubbed gallery | The gallery remains understandable as a normal grid and images have useful alternative text |
| Motion path | Waypoints and sequence are represented by headings, labels, or a list in the DOM |
| Infinite loop | Users can identify the active section, exit the loop, and navigate without relying on scroll wrapping |
| SVG morph | State changes have an accessible name or text equivalent |
| SplitText | The original readable copy remains available to assistive technology and does not depend on split spans |

## Performance checklist for these patterns

Reserve image and font dimensions before measuring. Animate transforms and opacity instead of layout properties when possible. Call `ScrollTrigger.refresh()` after real content changes, not on every pointer or scroll event. Reuse timelines for repeated interactions, clear inline styles during teardown, and test low-power devices, narrow screens, touch input, keyboard navigation, and `prefers-reduced-motion`.
