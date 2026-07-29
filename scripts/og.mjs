/* Generate public/og.png (1200×630) from an inline brand card */
import { chromium } from 'playwright-core'
const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`

const html = `<!doctype html><html><head><style>
  @font-face { font-family: SG; src: local('Space Grotesk'); }
  * { margin:0; box-sizing:border-box }
  body { width:1200px; height:630px; background:#0a0908; color:#f7f5f1;
    font-family:'Space Grotesk','Inter',system-ui,sans-serif; overflow:hidden; position:relative }
  .glow { position:absolute; left:-15%; top:-40%; width:900px; height:900px;
    background:radial-gradient(closest-side, rgba(238,95,7,.16), transparent 70%) }
  svg.routes { position:absolute; right:0; top:0; height:100% }
  .wrap { position:relative; padding:84px 90px; height:100% ; display:flex; flex-direction:column; justify-content:space-between }
  .mark { display:flex; align-items:center; gap:18px }
  .sq { width:56px; height:56px; border-radius:12px; background:#ff7a26; display:grid; place-items:center }
  .logo { font-size:34px; font-weight:600; letter-spacing:-0.02em }
  .logo span { color:#8a8277; font-weight:400; letter-spacing:.18em; font-size:22px; text-transform:uppercase; margin-left:12px }
  h1 { font-size:76px; line-height:1.04; letter-spacing:-0.03em; font-weight:600; max-width:820px }
  h1 i { color:#ff7a26; font-style:normal }
  .sub { font-size:28px; color:#b8b1a6; letter-spacing:.01em }
</style></head><body>
  <div class="glow"></div>
  <svg class="routes" viewBox="0 0 600 630" fill="none">
    <circle cx="620" cy="315" r="240" stroke="rgba(247,245,241,.05)"/>
    <circle cx="620" cy="315" r="380" stroke="rgba(247,245,241,.05)"/>
    <path d="M80 560 C 250 470, 330 380, 470 280 S 600 160, 640 120" stroke="rgba(247,245,241,.12)"/>
    <path d="M80 560 C 250 470, 330 380, 470 280 S 600 160, 640 120" stroke="rgba(255,122,38,.55)" stroke-dasharray="5 10"/>
    <circle cx="470" cy="280" r="5" fill="#ff7a26"/>
    <circle cx="640" cy="120" r="5" fill="#ff7a26"/>
  </svg>
  <div class="wrap">
    <div class="mark">
      <div class="sq"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0a0908" stroke-width="3"><path d="M5.5 5.5 12 19l6.5-13.5"/></svg></div>
      <div class="logo">VOPH<span>Partners</span></div>
    </div>
    <h1>FMCG trading<br/>&amp; sourcing<i>.</i></h1>
    <div class="sub">Global brands. Competitive prices. Long-term partnerships.</div>
  </div>
</body></html>`

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: 'public/og.png' })
await browser.close()
console.log('og done')
