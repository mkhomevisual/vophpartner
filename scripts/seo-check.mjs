import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getDictionary, LANGUAGES, LOCALE_PATHS } from '../src/i18n.js'
import { SITE_ORIGIN } from '../src/seo.js'

const root = process.cwd()
const dist = resolve(root, 'dist')
const localeCodes = LANGUAGES.map(({ code }) => code)
const failures = []
const ogLocales = { cs: 'cs_CZ', en: 'en_US', pl: 'pl_PL', de: 'de_DE', hu: 'hu_HU', fr: 'fr_FR', nl: 'nl_NL' }

const fail = (message) => failures.push(message)
const requireFile = (path) => {
  if (!existsSync(path)) {
    fail(`Missing ${path.replace(`${root}/`, '')}`)
    return null
  }
  return readFileSync(path, 'utf8')
}

const decodeHtml = (value = '') =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')

const stripTags = (value = '') => decodeHtml(value.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()
const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))
  return match ? decodeHtml(match[2]) : null
}
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([tag]) => tag)
const metaContent = (html, attribute, value) => {
  const tag = tags(html, 'meta').find((item) => getAttribute(item, attribute) === value)
  return tag ? getAttribute(tag, 'content') : null
}

const localeUrl = (locale) => `${SITE_ORIGIN}${LOCALE_PATHS[locale]}`

for (const locale of localeCodes) {
  const relativeFile = locale === 'cs' ? 'index.html' : `${locale}/index.html`
  const html = requireFile(resolve(dist, relativeFile))
  if (!html) continue

  const name = locale.toUpperCase()
  const dictionary = getDictionary(locale)
  const canonical = localeUrl(locale)
  const expectedPublicPrefix = locale === 'cs' ? './' : '../'
  const expectedAssetPrefix = locale === 'cs' ? './assets/' : '../assets/'
  const expectedBrandPrefix = locale === 'cs' ? './brands/' : '../brands/'

  const htmlLang = html.match(/<html\s+lang="([^"]+)"/i)?.[1]
  if (htmlLang !== locale) fail(`${name}: expected html lang=${locale}, received ${htmlLang ?? 'none'}`)

  const title = stripTags(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1])
  if (title !== dictionary.meta.title) fail(`${name}: incorrect or missing title`)

  const description = metaContent(html, 'name', 'description')
  if (description !== dictionary.meta.description) fail(`${name}: incorrect or missing meta description`)

  if (metaContent(html, 'name', 'robots') !== 'index, follow') fail(`${name}: robots must be index, follow`)
  if (/\bnoindex\b/i.test(html)) fail(`${name}: contains noindex`)
  if (/<meta\b[^>]*\bname=["']keywords["']/i.test(html)) fail(`${name}: must not use meta keywords`)

  const links = tags(html, 'link')
  const canonicalLinks = links.filter((tag) => getAttribute(tag, 'rel') === 'canonical')
  if (canonicalLinks.length !== 1 || getAttribute(canonicalLinks[0] ?? '', 'href') !== canonical) {
    fail(`${name}: expected exactly one self-canonical (${canonical})`)
  }

  const alternateLinks = links.filter(
    (tag) => getAttribute(tag, 'rel') === 'alternate' && getAttribute(tag, 'hreflang'),
  )
  if (alternateLinks.length !== localeCodes.length + 1) {
    fail(`${name}: expected ${localeCodes.length + 1} hreflang links, found ${alternateLinks.length}`)
  }
  const seenHreflangs = new Set()
  for (const target of localeCodes) {
    const link = alternateLinks.find((tag) => getAttribute(tag, 'hreflang') === target)
    const href = link ? getAttribute(link, 'href') : null
    if (href !== localeUrl(target)) fail(`${name}: invalid hreflang ${target}`)
    if (seenHreflangs.has(target)) fail(`${name}: duplicate hreflang ${target}`)
    seenHreflangs.add(target)
  }
  const defaultLink = alternateLinks.find((tag) => getAttribute(tag, 'hreflang') === 'x-default')
  if (getAttribute(defaultLink ?? '', 'href') !== localeUrl('cs')) fail(`${name}: invalid x-default hreflang`)

  const expectedIcons = [
    { href: `${expectedPublicPrefix}favicon.svg`, type: 'image/svg+xml', sizes: null },
    { href: `${expectedPublicPrefix}favicon-96x96.png`, type: 'image/png', sizes: '96x96' },
    { href: `${expectedPublicPrefix}favicon.ico`, type: 'image/x-icon', sizes: 'any' },
  ]
  for (const expectedIcon of expectedIcons) {
    const icon = links.find(
      (tag) =>
        getAttribute(tag, 'rel') === 'icon' &&
        getAttribute(tag, 'href') === expectedIcon.href &&
        getAttribute(tag, 'type') === expectedIcon.type &&
        getAttribute(tag, 'sizes') === expectedIcon.sizes,
    )
    if (!icon) fail(`${name}: missing favicon ${expectedIcon.href}`)
  }
  const appleTouchIcon = links.find((tag) => getAttribute(tag, 'rel') === 'apple-touch-icon')
  if (
    getAttribute(appleTouchIcon ?? '', 'href') !== `${expectedPublicPrefix}apple-touch-icon.png` ||
    getAttribute(appleTouchIcon ?? '', 'sizes') !== '180x180'
  ) {
    fail(`${name}: invalid apple touch icon URL`)
  }
  const manifest = links.find((tag) => getAttribute(tag, 'rel') === 'manifest')
  if (getAttribute(manifest ?? '', 'href') !== `${expectedPublicPrefix}site.webmanifest`) {
    fail(`${name}: invalid web app manifest URL`)
  }

  if (metaContent(html, 'property', 'og:title') !== dictionary.meta.title) fail(`${name}: missing localized og:title`)
  if (metaContent(html, 'property', 'og:description') !== dictionary.meta.description) fail(`${name}: missing localized og:description`)
  if (metaContent(html, 'property', 'og:url') !== canonical) fail(`${name}: incorrect og:url`)
  if (metaContent(html, 'property', 'og:locale') !== ogLocales[locale]) fail(`${name}: incorrect og:locale`)
  if (metaContent(html, 'property', 'og:image') !== `${SITE_ORIGIN}/og.png`) fail(`${name}: og:image must be absolute`)
  if (metaContent(html, 'property', 'og:image:width') !== '1200' || metaContent(html, 'property', 'og:image:height') !== '630') {
    fail(`${name}: incorrect Open Graph image dimensions`)
  }
  if (metaContent(html, 'name', 'twitter:card') !== 'summary_large_image') fail(`${name}: incorrect twitter:card`)
  if (metaContent(html, 'name', 'twitter:title') !== dictionary.meta.title) fail(`${name}: missing localized twitter:title`)
  if (metaContent(html, 'name', 'twitter:description') !== dictionary.meta.description) fail(`${name}: missing localized twitter:description`)
  if (metaContent(html, 'name', 'twitter:image') !== `${SITE_ORIGIN}/og.png`) fail(`${name}: twitter:image must be absolute`)

  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map(([, value]) => {
      try {
        return JSON.parse(value)
      } catch {
        fail(`${name}: invalid JSON-LD`)
        return null
      }
    })
    .find((value) => value?.['@type'] === 'Organization')
  if (!jsonLd || jsonLd.name !== 'VOPH Partners' || jsonLd.url !== localeUrl('cs') || jsonLd.email !== 'info@voph.cz' || jsonLd.telephone !== '+420 775 372 979') {
    fail(`${name}: missing or incorrect Organization JSON-LD`)
  }

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  const h1Text = stripTags(h1s[0]?.[1])
  if (h1s.length !== 1 || !h1Text) fail(`${name}: expected exactly one non-empty H1`)
  if (!h1Text.includes(dictionary.hero.titleLines.join(' '))) fail(`${name}: H1 words are not separated correctly`)
  if (!html.includes(dictionary.hero.titleLines[0]) || !html.includes(dictionary.about.lead) || !html.includes(dictionary.services.title)) {
    fail(`${name}: missing expected localized visible copy`)
  }
  if (!/<header\b/i.test(html) || !/<main\b/i.test(html) || !/<footer\b/i.test(html) || !/<nav\b/i.test(html)) {
    fail(`${name}: missing expected semantic landmarks`)
  }
  if (!/<div id="app" data-prerendered="true">[\s\S]*<h1\b/i.test(html) || /<div id="app"[^>]*><\/div>/i.test(html)) {
    fail(`${name}: app shell is not prerendered`)
  }
  if (html.includes('<!--ssg:app-->') || html.includes('<!--ssg:seo:')) fail(`${name}: prerender placeholder remains`)

  if (!html.includes(`src="${expectedAssetPrefix}`) || !html.includes(`href="${expectedAssetPrefix}`)) {
    fail(`${name}: client asset URLs do not use ${expectedAssetPrefix}`)
  }
  if (!html.includes(`src="${expectedBrandPrefix}`)) fail(`${name}: brand asset URLs do not use ${expectedBrandPrefix}`)
  if (locale !== 'cs' && (html.includes('src="./assets/') || html.includes('href="./assets/') || html.includes('src="./brands/') || html.includes('href="./favicon.svg"') || html.includes('href="./favicon-96x96.png"') || html.includes('href="./favicon.ico"') || html.includes('href="./apple-touch-icon.png"') || html.includes('href="./site.webmanifest"'))) {
    fail(`${name}: nested page contains root-only relative asset URL`)
  }
}

const robots = requireFile(resolve(dist, 'robots.txt'))
if (robots && (!robots.includes('User-agent: *') || !robots.includes('Allow: /') || !robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`))) {
  fail('robots.txt is not index-friendly or has the wrong sitemap URL')
}

const sitemap = requireFile(resolve(dist, 'sitemap.xml'))
if (sitemap) {
  for (const locale of localeCodes) {
    if (!sitemap.includes(`<loc>${localeUrl(locale)}</loc>`)) fail(`sitemap.xml is missing ${localeUrl(locale)}`)
  }
}

const ogPath = resolve(dist, 'og.png')
if (!existsSync(ogPath)) {
  fail('Missing dist/og.png')
} else {
  const og = readFileSync(ogPath)
  if (og.length < 24 || og.readUInt32BE(16) !== 1200 || og.readUInt32BE(20) !== 630) {
    fail('dist/og.png must be a 1200×630 PNG')
  }
}

const faviconFiles = [
  ['favicon.ico'],
  ['favicon.svg'],
  ['favicon-96x96.png', 96, 96],
  ['apple-touch-icon.png', 180, 180],
  ['web-app-manifest-192x192.png', 192, 192],
  ['web-app-manifest-512x512.png', 512, 512],
]
for (const [file, width, height] of faviconFiles) {
  const filePath = resolve(dist, file)
  if (!existsSync(filePath)) {
    fail(`Missing dist/${file}`)
    continue
  }
  if (width && height) {
    const image = readFileSync(filePath)
    if (image.length < 24 || image.readUInt32BE(16) !== width || image.readUInt32BE(20) !== height) {
      fail(`dist/${file} must be a ${width}×${height} PNG`)
    }
  }
}

const manifestPath = resolve(dist, 'site.webmanifest')
if (!existsSync(manifestPath)) {
  fail('Missing dist/site.webmanifest')
} else {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
    const icons = manifest.icons ?? []
    if (
      manifest.name !== 'VOPH Partners' ||
      manifest.short_name !== 'VOPH' ||
      manifest.display !== 'standalone' ||
      !icons.some((icon) => icon.src === './web-app-manifest-192x192.png' && icon.sizes === '192x192' && icon.type === 'image/png') ||
      !icons.some((icon) => icon.src === './web-app-manifest-512x512.png' && icon.sizes === '512x512' && icon.type === 'image/png')
    ) {
      fail('dist/site.webmanifest has invalid VOPH icon configuration')
    }
  } catch {
    fail('dist/site.webmanifest is not valid JSON')
  }
}

if (failures.length) {
  console.error(`SEO static check failed (${failures.length}):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`SEO static check passed for ${localeCodes.length} locale pages.`)
}
