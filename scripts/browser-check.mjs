import { chromium } from 'playwright-core'
import { getDictionary, LANGUAGES } from '../src/i18n.js'

const baseUrl = (process.env.URL ?? 'http://127.0.0.1:4173').replace(/\/$/, '')
const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`
const localePaths = Object.fromEntries(LANGUAGES.map(({ code }) => [code, code === 'cs' ? '/' : `/${code}/`]))
const browserErrors = []

const assert = (condition, message) => {
  if (!condition) throw new Error(message)
}

const attachErrorTracking = (page) => {
  page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error' || /hydration/i.test(message.text())) {
      browserErrors.push(`console ${message.type()}: ${message.text()}`)
    }
  })
  page.on('response', (response) => {
    const url = new URL(response.url())
    if (url.origin === baseUrl && response.status() >= 400) {
      browserErrors.push(`HTTP ${response.status()}: ${response.url()}`)
    }
  })
}

const openLocale = async (locale, options = {}) => {
  const context = await browser.newContext(options)
  await context.addInitScript((storedLocale) => localStorage.setItem('voph-lang', storedLocale), locale === 'cs' ? 'en' : 'cs')
  const page = await context.newPage()
  attachErrorTracking(page)
  const response = await page.goto(`${baseUrl}${localePaths[locale]}`, { waitUntil: 'domcontentloaded' })
  assert(response?.status() === 200, `${locale}: expected HTTP 200`)
  await page.waitForTimeout(200)

  const expected = getDictionary(locale)
  const result = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    appText: document.querySelector('#app')?.textContent?.trim().length ?? 0,
    reveals: document.querySelectorAll('.reveal').length,
    widthFits: document.documentElement.scrollWidth <= window.innerWidth + 1,
  }))
  assert(result.lang === locale, `${locale}: URL did not control html lang`)
  assert(result.title === expected.meta.title, `${locale}: incorrect localized title after hydration`)
  assert(result.h1?.includes(expected.hero.titleLines[0]), `${locale}: incorrect localized H1 after hydration`)
  assert(result.appText > 200, `${locale}: page rendered blank`)
  assert(result.reveals > 0, `${locale}: reveal interactions did not initialize`)
  assert(result.widthFits, `${locale}: horizontal overflow at ${options.viewport?.width ?? 1280}px`)

  const refreshed = await page.reload({ waitUntil: 'domcontentloaded' })
  assert(refreshed?.status() === 200, `${locale}: refresh did not return HTTP 200`)
  const refreshedLang = await page.locator('html').getAttribute('lang')
  assert(refreshedLang === locale, `${locale}: stale localStorage overrode locale after refresh`)

  await context.close()
}

const browser = await chromium.launch({ executablePath })

try {
  for (const { code } of LANGUAGES) await openLocale(code)

  await openLocale('fr', { viewport: { width: 360, height: 780 }, deviceScaleFactor: 1 })

  const interactionContext = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const interactionPage = await interactionContext.newPage()
  attachErrorTracking(interactionPage)
  await interactionPage.goto(`${baseUrl}/en/#services`, { waitUntil: 'domcontentloaded' })
  await interactionPage.locator('select').selectOption('de')
  await interactionPage.waitForURL(/\/de\/#services$/)
  assert(await interactionPage.locator('html').getAttribute('lang') === 'de', 'Language selector did not navigate to /de/#services')

  await interactionPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  await interactionPage.getByRole('button', { name: /tmavý/i }).click()
  const theme = await interactionPage.evaluate(() => ({
    dark: document.documentElement.classList.contains('dark'),
    stored: localStorage.getItem('voph-theme'),
  }))
  assert(theme.dark && theme.stored === 'dark', 'Theme switch did not activate dark mode')

  await interactionPage.locator('a[href="#about"]').first().click()
  await interactionPage.waitForFunction(() => window.location.hash === '#about')
  await interactionContext.close()

  const mobileMenuContext = await browser.newContext({ viewport: { width: 360, height: 780 } })
  const mobileMenuPage = await mobileMenuContext.newPage()
  attachErrorTracking(mobileMenuPage)
  await mobileMenuPage.goto(`${baseUrl}/fr/`, { waitUntil: 'domcontentloaded' })
  await mobileMenuPage.getByRole('button', { name: /menu/i }).click()
  await mobileMenuPage.locator('#mobile-menu').waitFor({ state: 'visible' })
  await mobileMenuPage.locator('#mobile-menu a[href="#about"]').click()
  await mobileMenuPage.waitForFunction(() => window.location.hash === '#about')
  await mobileMenuPage.locator('#mobile-menu').waitFor({ state: 'hidden' })
  await mobileMenuContext.close()

  const reducedMotionContext = await browser.newContext({ reducedMotion: 'reduce' })
  const reducedMotionPage = await reducedMotionContext.newPage()
  attachErrorTracking(reducedMotionPage)
  await reducedMotionPage.goto(`${baseUrl}/en/`, { waitUntil: 'domcontentloaded' })
  await reducedMotionPage.waitForTimeout(100)
  assert(await reducedMotionPage.locator('.brand-paths-trace').count() === 0, 'Reduced-motion route animation remained enabled')
  assert(await reducedMotionPage.locator('.process-step.is-reached').count() === 4, 'Reduced-motion process steps were not visible')
  await reducedMotionContext.close()

  if (browserErrors.length) throw new Error(browserErrors.join('\n'))
  console.log(`Browser check passed for ${LANGUAGES.length} locale URLs, selector, theme, hash navigation and reduced motion.`)
} finally {
  await browser.close()
}
