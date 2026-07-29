---
name: voph-design-system
description: Use when creating or refactoring VOPH Partners design tokens, CSS variables, typography, spacing, buttons, cards, grids and reusable UI foundations.
---

# voph-design-system

## Required context

Before acting, read:

- `CLAUDE.md`
- `references/voph-project-brief.md`

If the repository has existing code, inspect it before editing.

## Non-negotiables

- The audience is B2B professionals, not consumers.
- The website is one-page unless instructed otherwise.
- The style is dark, premium, minimalist, spacious and modern.
- Copy must be short and confident.
- Do not invent contact data, certifications, legal claims or specific business relationships.
- Avoid AI-generated people, handshake imagery, cheap stock-photo style and generic FMCG web design.


## Purpose

Build or improve the visual foundation before section implementation.

## Create or normalize

- color tokens,
- background/surface hierarchy,
- text colors,
- accent colors,
- typography scale,
- line heights,
- spacing scale,
- section padding,
- container widths,
- button styles,
- card styles,
- grid patterns,
- focus states,
- icon sizing.

## Suggested aesthetic

**Client decision (2026-07): LIGHT is the primary theme.** Dark is
kept as a secondary toggle. Both themes share one semantic token set
(`ink-*` surfaces, `paper-*` text, `ember-*` accent) — never hardcode
theme-specific colors in components; extend the tokens instead.

Light theme direction:

- warm paper-white background,
- near-white elevated cards with soft lift,
- warm near-black text,
- ember-orange accent (kept identical across themes for brand),
- thin dark hairlines,
- no loud gradients.

Dark theme (via `.dark` on `<html>`):

- near-black main background,
- slightly lighter elevated surfaces,
- soft warm-white text,
- same ember accent,
- subtle glass/border effects.

## Rules

- Do not hardcode random values across components.
- Avoid low contrast.
- Avoid too many font sizes.
- Avoid inconsistent border radii.
- Keep the system simple enough to maintain.

## Output

Return the token plan and implement it if requested.
