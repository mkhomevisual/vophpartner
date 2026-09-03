# VOPH Partners — one-page website

Premium one-page B2B site for VOPH Partners, a modern FMCG trading & sourcing partner.
Built with **Vue 3 + Vite + Tailwind CSS v4**. Seven languages (CZ default), fully responsive,
motion-polished, zero runtime network requests.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # client build + static prerender → dist/
npm run seo:check  # validate prerendered HTML and SEO metadata
npm run preview    # serve the production build
npm run browser:check # local preview interaction check (requires preview)
```

## Stack & structure

- `index.html` — Vite shell with prerender placeholders
- `src/entry-server.js` + `scripts/build.mjs` — Vue SSR entry and build-time static generation for all locales
- `src/seo.js` — canonical locale URLs and static locale-specific metadata
- `src/style.css` — design tokens (`@theme`) + component layer (buttons, cards, reveals, keyframes)
- `src/i18n.js` — all seven locale dictionaries and locale URL helpers (nothing hardcoded in components)
- `src/motion.js` — reveal directive, counters, pointer glow, magnetic CTA, scroll progress/flow
- `src/components/` — one component per section + shared primitives (`UiIcon`, `SectionHead`, `BrandMark`)
- `scripts/` — build, SEO/static HTML and browser QA tooling via `playwright-core`
- `skills-visible-copy/` — Claude Code skills used to build & maintain the project
- `references/voph-project-brief.md` — source of truth for all content/visual decisions

## Before launch — replace placeholders

Search the repo for these tokens and replace with real data:

- `[MEETING_LINK]` · `[ADDRESS]`

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
