# EDM Editor Design Intent — Design QA

## Evidence

- Layout source: `/var/folders/f2/gyw0k1vn1bs_mbksy6wr38r40000gn/T/codex-clipboard-946865d7-aa93-442b-82de-d1c22b105c4e.png`
- Implementation screenshots: `/Users/ff-sheji/Documents/CV 2/qa-edm-design-intent-final.jpg` and `/Users/ff-sheji/Documents/CV 2/qa-edm-design-intent-lower.jpg`
- Route: `http://127.0.0.1:5173/project/ai-edm-editor`
- Browser viewport: 1280 × 720 CSS px
- Source pixels: 2400 × 13145
- State: default desktop page, project-context section

## Content and layout check

The four requested design intentions are now visible as one coherent 2 × 2 principle grid: reducing repetitive design work, constraining operator-made graphics, giving text and price ownership to operations, and allowing color editing while keeping design guidance. The same ownership model is reinforced in the hero, product-strategy modules, workflow copy, AI-collaboration process, and outcome note.

## Findings

No actionable P0, P1, or P2 issues remain. The longer Chinese copy stays within each card, preserves the existing hierarchy, and does not introduce clipping or overflow at the checked desktop state.

## Comparison history

1. Reframed the project from generic template reuse to a clear division of responsibility between design and operations.
2. Replaced the three generic pain points and the statement card with the four user-specified intentions.
3. Propagated the new intent into product decisions, workflow, implementation process, and the delivery-round result note.
4. Verified both rows of the principle grid in the browser; typography, spacing, card height, and alignment passed.

## Runtime checks

- Automated tests: 31 passed.
- Production build: passed.
- Browser console errors: 0.

final result: passed

---

# Material Collector Cover — Design QA

## Evidence

- Source visual truth: `/var/folders/f2/gyw0k1vn1bs_mbksy6wr38r40000gn/T/codex-clipboard-3f6e078f-98ef-4cd2-8552-f24a02434ba7.png`
- Browser-rendered implementation: `/Users/ff-sheji/Documents/CV 2/design-qa-cover-implementation.png`
- Combined comparison: `/Users/ff-sheji/Documents/CV 2/design-qa-cover-comparison.png`
- Route: `http://127.0.0.1:5173/ai`
- State: AI project list, default cover state
- Browser viewport: 541 × 1052 CSS px, device pixel ratio 2
- Source pixels: 1080 × 1920; normalized comparison crop: 1080 × 1080, resized to 517 × 517
- Implementation pixels and CSS size: 517 × 517
- Density normalization: both comparison panels normalized to 517 × 517 pixels

## Full-view comparison

The implementation preserves the reference's three-column rounded-tile field, centered elevated square, white frame, soft shadow, low-contrast gray palette, and cropped outer columns. Per the user's instruction, the reference photo, button, heading, and footer text are intentionally removed and replaced by the supplied Xie Xiaotun application logo.

## Focused region comparison

The centered card was checked separately because logo scale, frame thickness, corner radius, and shadow carry the cover's visual hierarchy. The cover-only vector is cropped to the black plate itself, so sizing and alignment no longer depend on transparent SVG padding. The black plate is centered against the actual white-card bounds with an even inset and a matching corner-radius ratio.

## Required fidelity surfaces

- Fonts and typography: no cover typography remains by request; no unintended text is present.
- Spacing and layout rhythm: tile proportions, cropped outer columns, narrow gutters, central-card scale, matched nested radii, and elevation match the reference structure. The visible black plate measures 197.5 × 197.5 CSS px inside the 517 × 517 cover and is positioned at 49.1% vertically to follow the generated white card's true center.
- Colors and visual tokens: white canvas, light-gray tiles, white focus card, and neutral shadow match the reference's restrained palette.
- Image quality and asset fidelity: the grid and elevated blank card are supplied as a project-local raster asset generated from the visual reference; the logo is a cover-specific SVG derived directly from the supplied application asset and remains sharp without a raster substitute or approximation.
- Copy and content: all reference-image headings, footer copy, body text, and button labels are removed as requested.

## Findings

No actionable P0, P1, or P2 differences remain.

## Comparison history

1. Initial pass: the focus card was smaller than the reference and grid gutters were too wide (P2).
2. Fix: increased the focus card from 35.5% to 45% of the cover, expanded the background grid inset, and reduced gutters from 5.4% to 3%.
3. Asset-fidelity pass: replaced the temporary code-drawn grid with `/Users/ff-sheji/Documents/CV 2/public/assets/material-collector/cover-grid-background.png`, generated from the supplied visual reference with all text, buttons, and photography removed. The original SVG application logo remains a separate exact overlay.
4. First logo refinement remained inaccurate (P2): the SVG still contained a 100-unit transparent inset, so the CSS box did not correspond to the visible black plate; the black plate also sat slightly low and its radius was too round.
5. Fix: cropped the cover-only SVG viewBox to the 824 × 824 black plate, set the visible plate to 38.2% of the cover, aligned it to the white card at 49.1% vertically, and changed the radius to 115 SVG units (13.96%).
6. Post-fix evidence: `/Users/ff-sheji/Documents/CV 2/design-qa-cover-comparison.png` shows even white spacing on all four sides, concentric rounded corners, and the requested logo-only content.

## Interaction and runtime checks

- Cover remains linked to `/project/ai-material-collector`.
- Horizontal overflow: 0 px.
- Browser console errors: 0.
- Automated tests: 30 passed.
- Production build: passed.

## Follow-up polish

- P3: shadow softness can be tuned slightly after reviewing the cover alongside neighboring projects, but it does not block fidelity.

final result: passed
