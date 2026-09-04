---
name: taste
description: Design taste and motion conventions for the Montakhab Gold site — cinematic dark-gold luxury aesthetic, component structure, color/type tokens, and GSAP/Framer/Lenis motion rules. Load before any new UI, section, or animation work in this project.
---

# Taste — Montakhab Gold design system

This project is a cinematic, high-end luxury site (DESIGN_VARIANCE 8/10,
MOTION_INTENSITY 8/10, VISUAL_DENSITY 5/10). Every new section or component
should read as belonging to the same expensive, restrained world as the
existing ones — not as a bolted-on demo.

## Vibe

Deep cinematic dark backgrounds, warm champagne-gold accents, selective rim
lighting. Nothing loud, nothing saturated. Gold is a rare accent, not a fill
color — most of the page stays near-black with off-white text.

## Tokens (tailwind.config.ts)

- `ink` / `ink-900` / `ink-800` / `ink-700` / `ink-600` — background depths,
  darkest to lighter panel.
- `bone` / `bone-muted` / `bone-dim` — text, brightest to quietest.
- `gold` / `gold-bright` / `gold-dim` / `gold-line` — accent, brighter accent
  (headline emphasis), muted accent (borders/hover), and the near-invisible
  hairline used on almost every card/input border.
- `font-display` (Playfair Display, serif, italic for emphasis) for all
  headlines — oversized, `clamp()`-sized, weight 500–900.
- `font-body` (Manrope, weight 200–300) for supporting copy — always small
  and light, never competing with the display type.
- `.eyebrow` utility class in globals.css — the microscopic uppercase label
  that precedes every section heading ("ABOUT THE HOUSE", "OFFERINGS", etc.).
  Reuse it; don't reinvent a label style per-section.

## Component patterns to reuse, not reinvent

- **Reveal** (`src/components/Reveal.tsx`) — the standard scroll-in wrapper
  (GSAP ScrollTrigger, fade + rise, `start: "top 85%"`). Use this for any new
  section's entrance instead of writing a fresh IntersectionObserver or
  Framer `whileInView`.
- **ImagePlaceholder** (`src/components/ImagePlaceholder.tsx`) — the
  Double-Bezel image slot (outer `ink-800/60` shell + inner gradient core +
  inset highlight). Use for any placeholder media instead of a flat `<div>`.
- **Double-Bezel cards** — any card, input, or feature tile gets a hairline
  `border-gold-line`, a large radius (`rounded-[2rem]` family), and a subtle
  inner highlight — see `Products.tsx` offering tiles and `Contact.tsx`
  inputs. Never a flat `border border-gray-*` box.
- **Button-in-button CTA** — primary buttons are `rounded-full` pills with a
  nested circular icon well (`Contact.tsx` "Send Enquiry" button). Reuse this
  shape for any new CTA rather than a plain text-plus-arrow button.

## Motion rules

- **GSAP + ScrollTrigger** for anything scroll-driven: parallax, pins,
  scrubbed sequences, section reveals. **Framer Motion** for
  component-level micro-interactions (hover, tap, the mobile nav panel) and
  any state-driven (not scroll-driven) transition.
- **Lenis** already drives global smooth scroll (`SmoothScroll.tsx`) and is
  wired to `ScrollTrigger.update` — don't add a second smooth-scroll layer.
- Animate only `transform` and `opacity` (use `autoAlpha` over raw
  `opacity` so hidden elements drop `visibility` and pointer-events too).
  Never animate `top`/`left`/`width`/`height`.
- Custom easing, never linear/ease-in-out defaults. Scrubbed timelines use
  `ease: "none"` on the tweens themselves (the `scrub` number supplies the
  smoothing); discrete reveals use `power3.out` or a custom cubic-bezier
  (`ease-silk` / `ease-fluid` in tailwind.config.ts).
- `will-change` only while a section is actively animating — toggle it via
  ScrollTrigger's `onToggle`/`onEnter`/`onLeave`, not permanently.
- Section padding stays generous: `py-24` minimum, `py-40`+ for major
  sections. Let the page breathe.

## Anti-patterns (do not do these)

- No default system fonts (Arial/Helvetica/Roboto/Inter) — always
  `font-display` or `font-body`.
- No flat gray 1px borders or default `shadow-md`/harsh drop shadows.
- No symmetrical, cramped Bootstrap-style 3-column grids without generous
  gaps.
- No `window.addEventListener('scroll')` — always ScrollTrigger or
  `whileInView`.
- No permanent `will-change` on off-screen elements.
