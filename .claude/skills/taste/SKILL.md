---
name: taste
description: Design taste and motion conventions for the Montakhab Gold site — cinematic dark-gold luxury aesthetic, Persian (Farsi) RTL layout, component structure, color/type tokens, and GSAP/Framer/Lenis motion rules. Load before any new UI, section, or animation work in this project.
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
- `font-display` (Amiri, Persian/Arabic serif) for all headlines — oversized,
  `clamp()`-sized. **Only weights 400 and 700 exist** (that's all Amiri
  ships) — use `font-bold`, never `font-medium`/`font-semibold` on
  `font-display` text, or the browser fake-bolds and it looks soft.
- `font-body` (Vazirmatn, weight 200–300) for supporting copy — always small
  and light, never competing with the display type.
- `font-wordmark` (Cinzel, Latin, no italic form) — reserved *only* for the
  brand name "Montakhab Gold Company" wherever it appears in Latin script
  (Nav, Hero closing statement, Footer). Always set `uppercase
  tracking-[0.05em]` (large/Hero) or `tracking-[0.15em]` (small/Nav+Footer)
  — Cinzel is a Roman-inscription-style luxury display face, meant to be
  read as a tracked-out caps logotype, not run italic or in sentence case.
  Only weights 500/600 are loaded. Always pair it with `dir="ltr"` on that
  element so the bidi algorithm doesn't reorder it inside RTL flow. Never
  use `font-wordmark` for anything else, and never put Persian text in it —
  it has no Arabic glyphs.
- `.eyebrow` utility class in globals.css — the small gold label that
  precedes every section heading ("درباره خانه منتخب", "محصولات", etc.). No
  `letter-spacing` or `uppercase` on it — both break Perso-Arabic letter
  joining. Reuse it; don't reinvent a label style per-section.

## Language: Persian (Farsi), RTL

The whole site is `<html lang="fa" dir="rtl">` (`src/app/layout.tsx`). All
copy is Persian except the brand wordmark. When adding any new section:

- **No `italic` anywhere in this project.** Perso-Arabic fonts have no
  italic form — Amiri/Vazirmatn will either ignore it or the browser will
  synthesize a slant that breaks letter joining — and `font-wordmark`
  (Cinzel) has no italic either. Use `text-gold-bright` color, or
  `font-wordmark`'s uppercase+tracking treatment, for emphasis instead.
- **No `tracking-*` / `letter-spacing` on Persian text**, same reason —
  connected script, spacing breaks the connections. Fine on `font-wordmark`
  Latin text only.
- **Line-height runs looser than the Latin original.** Persian's taller
  ascenders/diacritics need more room — headlines use `leading-[1.5]` to
  `leading-[1.6]` (vs. the `leading-[1.05]` that worked for Latin caps),
  body copy uses `leading-loose`.
- **Most layout just works under `dir="rtl"` for free** — flexbox `row` and
  CSS Grid both respect `direction` and mirror automatically (confirmed:
  Nav's flex order, About's 2-col grid, Products' bento grid all flipped
  correctly with zero extra code). Only fix by hand what's provably broken:
  a directional icon (the Contact CTA arrow is `↖`, not `↗`), or Latin
  content that needs `dir="ltr"` so bidi doesn't reorder it (emails, the
  wordmark).
- **Numerals**: stat/label numbers use Persian digits (`٪۹۹.۹۹`, `+۳۰`) to
  match the rest of the Persian text — see `About.tsx`'s stats array.

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
