/* Interactive verification: scroll like a user, capture live states */
import { chromium } from 'playwright-core'
const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`
const browser = await chromium.launch({ executablePath })

// Desktop: about counters + process line after real scrolling
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })
await page.goto('http://localhost:4173', { waitUntil: 'networkidle' })
await page.locator('#about').scrollIntoViewIfNeeded()
await page.waitForTimeout(1800)
await page.screenshot({ path: 'scripts/shots/live-about.png' })
await page.locator('#process').scrollIntoViewIfNeeded()
await page.evaluate(() => window.scrollBy(0, 260))
await page.waitForTimeout(1400)
await page.screenshot({ path: 'scripts/shots/live-process.png' })
await page.close()

// Mobile nav after layer fix + open menu
const m = await browser.newPage({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 })
await m.goto('http://localhost:4173', { waitUntil: 'networkidle' })
await m.waitForTimeout(1200)
await m.screenshot({ path: 'scripts/shots/live-mobile-top.png' })
await m.getByRole('button', { name: /menu/i }).click()
await m.waitForTimeout(700)
await m.screenshot({ path: 'scripts/shots/live-mobile-menu.png' })
await m.close()
await browser.close()
console.log('done')
