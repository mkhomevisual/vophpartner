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

const schemaLanguages = {
  cs: 'cs-CZ',
  en: 'en',
  pl: 'pl',
  de: 'de',
  hu: 'hu',
  fr: 'fr',
  nl: 'nl',
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
  const dictionary = getDictionary(currentLocale)
  const { meta } = dictionary
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const canonical = localeUrl(currentLocale)
  const hreflang = LANGUAGES.map(
    ({ code }) => `<link rel="alternate" hreflang="${code}" href="${localeUrl(code)}" />`,
  )
  const ogAlternates = LANGUAGES.filter(({ code }) => code !== currentLocale).map(
    ({ code }) => `<meta property="og:locale:alternate" content="${ogLocales[code]}" />`,
  )
  const organizationId = `${SITE_ORIGIN}/#organization`
  const websiteId = `${SITE_ORIGIN}/#website`
  const pageId = `${canonical}#webpage`
  const organization = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'VOPH Partners',
        alternateName: 'VOPH',
        url: localeUrl('cs'),
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_ORIGIN}/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_ORIGIN}/og.png`,
        description: 'Czech B2B partner for FMCG trading, sourcing and distribution across European markets.',
        email: 'info@voph.cz',
        telephone: '+420 775 372 979',
        areaServed: [
          { '@type': 'Country', name: 'Czech Republic' },
          { '@type': 'Continent', name: 'Europe' },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+420 775 372 979',
          email: 'info@voph.cz',
          availableLanguage: LANGUAGES.map(({ name }) => name),
          areaServed: ['CZ', 'EU'],
        },
        knowsAbout: [
          'FMCG Czech Republic',
          'FMCG trading',
          'FMCG sourcing',
          'FMCG distribution',
          'wholesale sourcing',
          'retail sourcing',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: localeUrl('cs'),
        name: 'VOPH Partners',
        publisher: { '@id': organizationId },
        inLanguage: LANGUAGES.map(({ code }) => schemaLanguages[code]),
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: canonical,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE_ORIGIN}/og.png`,
          width: 1200,
          height: 630,
        },
        inLanguage: schemaLanguages[currentLocale],
      },
      {
        '@type': 'Service',
        '@id': `${canonical}#fmcg-services`,
        name: dictionary.services.items.map(({ title: serviceTitle }) => serviceTitle).join(', '),
        description: meta.description,
        provider: { '@id': organizationId },
        areaServed: [
          { '@type': 'Country', name: 'Czech Republic' },
          { '@type': 'Continent', name: 'Europe' },
        ],
        serviceType: ['FMCG trading', 'FMCG sourcing', 'FMCG distribution'],
      },
    ],
  }
  const structuredData = JSON.stringify(organization).replaceAll('<', '\\u003c')

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    '<meta name="author" content="VOPH Partners" />',
    '<meta name="theme-color" content="#f6f3ee" />',
    `<link rel="canonical" href="${canonical}" />`,
    ...hreflang,
    `<link rel="alternate" hreflang="x-default" href="${localeUrl('cs')}" />`,
    `<link rel="icon" type="image/svg+xml" href="${relativePublicPath(currentLocale, 'favicon.svg')}" />`,
    `<link rel="icon" type="image/png" sizes="96x96" href="${relativePublicPath(currentLocale, 'favicon-96x96.png')}" />`,
    `<link rel="icon" type="image/x-icon" sizes="any" href="${relativePublicPath(currentLocale, 'favicon.ico')}" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="${relativePublicPath(currentLocale, 'apple-touch-icon.png')}" />`,
    `<link rel="manifest" href="${relativePublicPath(currentLocale, 'site.webmanifest')}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="VOPH Partners" />',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="${ogLocales[currentLocale]}" />`,
    ...ogAlternates,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE_ORIGIN}/og.png" />`,
    '<meta property="og:image:alt" content="VOPH Partners — FMCG Czech Republic" />',
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:image" content="${SITE_ORIGIN}/og.png" />`,
    '<meta name="twitter:image:alt" content="VOPH Partners — FMCG Czech Republic" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<script type="application/ld+json">${structuredData}</script>`,
  ].join('\n    ')
}
