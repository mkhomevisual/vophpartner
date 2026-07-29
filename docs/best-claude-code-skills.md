# Best Claude Code Skills for This Project

This package includes project-specific skills under `.claude/skills/`.

## Recommended skills included

### 1. `voph-project-guardian`

Use for every major task. It protects the brief, positioning, tone and constraints.

Best prompt:

```text
Use the VOPH project guardian skill. Review the current implementation against the brief and tell me what is off-brand before making changes.
```

### 2. `voph-frontend-design`

Use when building or redesigning UI.

Best prompt:

```text
Use the VOPH frontend design skill. Redesign the current landing page into a premium dark one-page B2B website. Inspect stack first, then implement.
```

### 3. `voph-design-system`

Use before page building. It creates tokens, spacing, typography and reusable UI patterns.

Best prompt:

```text
Use the VOPH design system skill. Create the tokens and reusable section/card/button styles before implementing the landing page.
```

### 4. `voph-copywriter`

Use for short B2B copy and section text.

Best prompt:

```text
Use the VOPH copywriter skill. Rewrite all landing page copy to be shorter, more premium, more B2B and less generic.
```

### 5. `voph-asset-direction`

Use for images, icons and visual placeholders.

Best prompt:

```text
Use the VOPH asset direction skill. Create an image/icon direction plan for the site that avoids fake corporate stock and AI people.
```

### 6. `voph-motion-interactions`

Use after the base design is working.

Best prompt:

```text
Use the VOPH motion interactions skill. Add subtle premium motion with reduced-motion support and no heavy dependencies.
```

### 7. `voph-seo-accessibility`

Use near the end.

Best prompt:

```text
Use the VOPH SEO accessibility skill. Audit and fix semantic HTML, contrast, focus states, metadata and accessible labels.
```

### 8. `voph-qa-review`

Use before delivery.

Best prompt:

```text
Use the VOPH QA review skill. Run the final responsive, build and brief-alignment review. Fix critical issues only.
```

## Global workflow for best results

Run the project in passes instead of asking Claude to do everything in one huge prompt:

1. Inspect.
2. Plan.
3. Design system.
4. Implement sections.
5. Responsive pass.
6. Motion pass.
7. SEO/accessibility pass.
8. Art direction review.
9. Build/lint/typecheck.
10. Final summary.

## Safety note

Read any downloaded third-party skill before using it. Skills can shape agent behavior, so only use skills you trust and keep project skills narrow and explicit.
