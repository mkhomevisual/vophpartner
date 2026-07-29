---
name: voph-i18n
description: Use when writing, structuring or reviewing the bilingual Czech/English content layer of the VOPH Partners website.
---

# voph-i18n

## Required context

Before acting, read:

- `CLAUDE.md`
- `references/voph-project-brief.md`

## Why bilingual

VOPH Partners is international by positioning. Czech is the home market (the client brief is Czech); English serves foreign brands, suppliers and partners. Both languages are first-class — never machine-translation filler.

## Structure rules

- All copy lives in one typed dictionary module, never hardcoded in components.
- Czech is the default language. Persist the visitor's choice.
- `<html lang>` must update on switch.
- Keys are section-scoped (`hero.title`, `services.trading.body`), identical across languages.
- Meta title/description exist in both languages.

## Writing rules

- CZ and EN are written independently to sound native — same meaning, not word-for-word.
- Keep the brief's exact hero wording in Czech: "Váš dlouhodobý partner pro FMCG trading a sourcing."
- Czech B2B tone: vykání, sebevědomé krátké věty, žádné anglicismy navíc (FMCG, trading, sourcing jsou v pořádku — jsou to termíny oboru).
- English tone: direct, confident, international trade vocabulary; no startup buzzwords.
- Numbers, brand names and placeholders (`[PHONE]`, `[EMAIL]`, `[MEETING_LINK]`, `[ADDRESS]`) stay identical across languages.

## Layout guard

Czech runs ~15–20% longer than English. Check both languages at mobile widths for wrapping, button overflow and headline balance.

## Output

When copy changes, always deliver both languages together.
