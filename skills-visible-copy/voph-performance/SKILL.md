---
name: voph-performance
description: Use when adding dependencies, fonts, images, animation or build config to the VOPH Partners website to keep it fast, light and smooth.
---

# voph-performance

## Required context

Before acting, read:

- `CLAUDE.md`
- `references/voph-project-brief.md`

## Purpose

A premium B2B site must feel instant. Slowness reads as unreliability — the opposite of the brand.

## Budgets

- JS shipped to the browser: under 120 kB gzipped total.
- No animation library unless CSS/rAF genuinely cannot do it.
- Fonts: self-hosted variable fonts only, max 2 families, `font-display: swap`.
- Images: SVG-first for graphics; no raster hero photos until real photography exists.
- Zero external network requests at runtime (no CDNs, no trackers, no embeds).

## Animation performance rules

- Animate only `transform` and `opacity`. Never `top/left/width/height/box-shadow` on scroll.
- Continuous animations (marquee, route dots) must be pure CSS keyframes — no rAF loops running forever.
- Scroll-linked effects use one shared IntersectionObserver / rAF, throttled, passive listeners.
- `will-change` only on elements that actually animate, removed when idle where practical.
- Everything pauses under `prefers-reduced-motion`.

## Build rules

- Keep Vite defaults unless measured reason to change.
- Check the `dist` size after build; report gzip numbers.
- No polyfills for evergreen browsers.

## Output

After changes, report bundle sizes and any budget violations.
