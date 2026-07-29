/* Light/dark theme verification at key breakpoints */
import { chromium } from 'playwright-core'
const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`
const browser = await chromium.launch({ executablePath })
const forceReveals = '.reveal{opacity:1!important;transform:none!important;transition:none!important}'

const shots = [
  { name: 'light-desktop-hero', w: 1440, h: 900, theme: 'light' },
  { name: 'dark-desktop-hero', w: 1440, h: 900, theme: 'dark' },
]
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1.5 })
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' })
  if (s.theme === 'dark') {
    await page.evaluate(() => localStorage.setItem('voph-theme', 'dark'))
    await page.reload({ waitUntil: 'networkidle' })
  }
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `scripts/shots/${s.name}.png` })
  await page.close()
}

// light full pages, desktop + mobile
for (const vp of [{ n: 'light-desktop-full', w: 1440, h: 900 }, { n: 'light-mobile-full', w: 360, h: 780 }]) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1.5 })
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: forceReveals })
  await page.waitForTimeout(1600)
  await page.screenshot({ path: `scripts/shots/${vp.n}.png`, fullPage: true })
  await page.close()
}

// toggle interaction: click the theme button, confirm class flips live
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:4173', { waitUntil: 'networkidle' })
const before = await page.evaluate(() => document.documentElement.className)
await page.getByRole('button', { name: /tmavý/i }).click()
await page.waitForTimeout(500)
const after = await page.evaluate(() => ({ cls: document.documentElement.className, stored: localStorage.getItem('voph-theme'), meta: document.querySelector('meta[name=theme-color]').content }))
console.log(JSON.stringify({ before, after }))
await page.screenshot({ path: 'scripts/shots/toggled-dark-live.png' })
await browser.close()
