/* DOM-level a11y/SEO audit (voph-seo-accessibility checklist) */
import { chromium } from 'playwright-core'
const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`
const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto('http://localhost:4173', { waitUntil: 'networkidle' })

const report = await page.evaluate(() => {
  const r = {}
  r.title = document.title
  r.metaDesc = document.querySelector('meta[name="description"]')?.content?.length ?? 0
  r.htmlLang = document.documentElement.lang
  r.h1Count = document.querySelectorAll('h1').length
  r.headings = [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName).join(' ')
  r.landmarks = ['header', 'main', 'footer', 'nav'].map((s) => `${s}:${document.querySelectorAll(s).length}`).join(' ')
  r.imgsWithoutAlt = [...document.querySelectorAll('img')].filter((i) => !i.alt).length
  r.svgUnhidden = [...document.querySelectorAll('svg')].filter(
    (s) => !s.closest('[aria-hidden="true"]') && s.getAttribute('aria-hidden') !== 'true' && !s.getAttribute('role') && !s.closest('a,button')
  ).length
  r.buttonsUnnamed = [...document.querySelectorAll('button')].filter(
    (b) => !b.textContent.trim() && !b.getAttribute('aria-label')
  ).length
  r.linksUnnamed = [...document.querySelectorAll('a')].filter(
    (a) => !a.textContent.trim() && !a.getAttribute('aria-label')
  ).length
  r.linksEmptyHref = [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href')).length
  r.skipLink = !!document.querySelector('a[href="#main"]')
  r.sectionIds = [...document.querySelectorAll('section')].map((s) => s.id || '(none)').join(', ')
  return r
})

// keyboard: tab 8 times, record focus visibility
const focusTrail = []
for (let i = 0; i < 8; i++) {
  await page.keyboard.press('Tab')
  focusTrail.push(
    await page.evaluate(() => {
      const el = document.activeElement
      const st = getComputedStyle(el)
      return `${el.tagName}${el.getAttribute('aria-label') ? '[' + el.getAttribute('aria-label') + ']' : ''}:${(el.textContent || '').trim().slice(0, 22)}`
    }),
  )
}
report.focusTrail = focusTrail
console.log(JSON.stringify(report, null, 2))
await browser.close()
