import { chromium } from 'playwright-core'
const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`
const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1.5 })
await page.goto('http://localhost:4173', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: 'scripts/shots/reduced-motion.png' })
// content must be visible without any scrolling/animation
const visible = await page.evaluate(() => {
  const h1 = document.querySelector('h1')
  const chip = document.querySelectorAll('.reveal').length
  return { h1Opacity: getComputedStyle(h1.querySelector('.line-mask > span')).transform, revealCount: chip }
})
console.log(JSON.stringify(visible))
await browser.close()
