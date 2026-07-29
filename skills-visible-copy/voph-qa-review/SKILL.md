---
name: voph-qa-review
description: Use before delivery to review VOPH Partners against the brief, responsive behavior, build status, accessibility, visual quality and remaining placeholders.
---

# voph-qa-review

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


## Final QA procedure

Inspect the implementation and check:

- brief alignment,
- premium B2B feel,
- one-page structure,
- CTA clarity,
- mobile layout,
- tablet layout,
- large desktop layout,
- section spacing,
- typography hierarchy,
- contrast,
- focus states,
- metadata,
- build/lint/typecheck if available.

## Scoring

Score 1–10:

- brief alignment,
- visual quality,
- clarity,
- trust,
- responsiveness,
- accessibility,
- implementation quality.

## Fixing rule

Fix critical issues first.

Do not redesign everything during QA unless the current output fundamentally misses the brief.

## Output

Return:

1. scores,
2. issues found,
3. fixes made,
4. commands run,
5. remaining manual tasks.
