---
name: voph-motion-interactions
description: Use when adding subtle animations, hover states, transitions, scroll reveal or premium microinteractions to the VOPH Partners frontend.
---

# voph-motion-interactions

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


## Motion principle

Motion should make the site feel premium and precise. It must not distract.

## Good motion

- subtle reveal on scroll,
- smooth CTA hover,
- card border glow,
- gentle background gradient shift,
- logistics path line animation,
- nav hover underline,
- soft opacity/translate transitions.

## Bad motion

- bouncing,
- spinning,
- aggressive parallax,
- loud animation,
- slow annoying entrances,
- animation that makes B2B trust worse.

## Technical rules

- Respect `prefers-reduced-motion`.
- Do not add heavy animation libraries unless already present.
- Keep animation performant.
- Avoid layout shift.
- Keep duration restrained.

## Output

Implement motion as a polish pass after the core layout works.
