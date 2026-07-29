# VOPH Partners — one-page website

Premium one-page B2B site for VOPH Partners, a modern FMCG trading & sourcing partner.
Built with **Vue 3 + Vite + Tailwind CSS v4**. Seven languages (CZ default), fully responsive,
motion-polished, zero runtime network requests.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Stack & structure

- `index.html` — meta, Open Graph, JSON-LD
- `src/style.css` — design tokens (`@theme`) + component layer (buttons, cards, reveals, keyframes)
- `src/i18n.js` — all CZ/EN copy in one dictionary (nothing hardcoded in components)
- `src/motion.js` — reveal directive, counters, pointer glow, magnetic CTA, scroll progress/flow
- `src/components/` — one component per section + shared primitives (`UiIcon`, `SectionHead`, `BrandMark`)
- `scripts/` — QA tooling (screenshots, a11y audit, OG image generator) via `playwright-core`
- `skills-visible-copy/` — Claude Code skills used to build & maintain the project
- `references/voph-project-brief.md` — source of truth for all content/visual decisions

## Before launch — replace placeholders

Search the repo for these tokens and replace with real data:

- `[MEETING_LINK]` · `[ADDRESS]`
- `index.html`: prefix `og:image` / `twitter:image` with the production domain.

## GitHub Pages deployment

The project is ready to deploy through GitHub Actions. After creating a GitHub
repository and pushing this code to `main` (or `master`), open
**Settings → Pages** and select **GitHub Actions** as the source. The included
workflow in `.github/workflows/deploy-pages.yml` builds the site and publishes
the `dist/` folder automatically. Relative asset paths are configured, so the
site works under the repository URL as well as a custom domain.

## Design system (short)

- **Themes: light (default, per client) + dark via nav toggle.** One semantic
  token set — `ink-*` = surfaces, `paper-*` = text — light values live in
  `@theme`, dark overrides in `.dark {}` (`src/style.css`), choice persists in
  `localStorage` and applies pre-paint (inline script in `index.html`)
- Accent: single ember-orange ramp; `ember-500` identical in both themes
  (brand graphics, buttons), `ember-400/600` adapt per theme for contrast
- Type: Space Grotesk (display) + Inter (body), self-hosted variable fonts
- Motion: transform/opacity only, one shared IntersectionObserver, full
  `prefers-reduced-motion` support
