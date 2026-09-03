/* Visual QA — full-page screenshots at key breakpoints (voph-qa-review) */
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const BASE = process.env.URL ?? 'http://localhost:4173'
const OUT = 'scripts/shots'
const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`

const viewports = [
  { name: 'mobile-360', width: 360, height: 780 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
]

mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ executablePath })

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1.5,
  })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1600) // let entrance animations settle

  // hero viewport shot
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` })

  // full page — force reveal states so the stitched shot shows final layout
  await page.addStyleTag({
    content:
      '.reveal{opacity:1!important;transform:none!important;transition:none!important}',
  })
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true })
  await page.close()
}

// EN variant, desktop hero only — test the actual static locale route.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(`${BASE.replace(/\/$/, '')}/en/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await page.screenshot({ path: `${OUT}/desktop-1440-hero-en.png` })
await page.close()

await browser.close()
console.log('done')
