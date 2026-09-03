import { getDictionary, LANGUAGES, LOCALE_PATHS } from './i18n.js'

export const SITE_ORIGIN = 'https://partners.voph.cz'

const ogLocales = {
  cs: 'cs_CZ',
  en: 'en_US',
  pl: 'pl_PL',
  de: 'de_DE',
  hu: 'hu_HU',
  fr: 'fr_FR',
  nl: 'nl_NL',
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

export function localeUrl(locale) {
  return `${SITE_ORIGIN}${LOCALE_PATHS[locale] ?? LOCALE_PATHS.cs}`
}

const relativePublicPath = (locale, path) => `${locale === 'cs' ? './' : '../'}${path}`

export function createSeoHead(locale) {
  const currentLocale = LOCALE_PATHS[locale] ? locale : 'cs'
  const { meta } = getDictionary(currentLocale)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const canonical = localeUrl(currentLocale)
  const hreflang = LANGUAGES.map(
    ({ code }) => `<link rel="alternate" hreflang="${code}" href="${localeUrl(code)}" />`,
  )
  const ogAlternates = LANGUAGES.filter(({ code }) => code !== currentLocale).map(
    ({ code }) => `<meta property="og:locale:alternate" content="${ogLocales[code]}" />`,
  )
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'VOPH Partners',
    url: localeUrl('cs'),
    logo: `${SITE_ORIGIN}/favicon.svg`,
    description: 'FMCG trading and sourcing partner. Global brands, competitive prices, long-term partnerships.',
    email: 'info@voph.cz',
    telephone: '+420 775 372 979',
    knowsAbout: ['FMCG trading', 'FMCG sourcing', 'FMCG distribution', 'wholesale sourcing'],
  }
  const structuredData = JSON.stringify(organization).replaceAll('<', '\\u003c')

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    '<meta name="robots" content="index, follow" />',
    '<meta name="theme-color" content="#f6f3ee" />',
    `<link rel="canonical" href="${canonical}" />`,
    ...hreflang,
    `<link rel="alternate" hreflang="x-default" href="${localeUrl('cs')}" />`,
    `<link rel="icon" type="image/svg+xml" href="${relativePublicPath(currentLocale, 'favicon.svg')}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="VOPH Partners" />',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="${ogLocales[currentLocale]}" />`,
    ...ogAlternates,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE_ORIGIN}/og.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:image" content="${SITE_ORIGIN}/og.png" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json">${structuredData}</script>`,
  ].join('\n    ')
}
