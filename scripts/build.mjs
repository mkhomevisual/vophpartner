import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { renderToString } from '@vue/server-renderer'
import { createSeoHead } from '../src/seo.js'

const root = process.cwd()
const distDir = resolve(root, 'dist')
const serverDir = resolve(root, '.ssr')
const locales = ['cs', 'en', 'pl', 'de', 'hu', 'fr', 'nl']
const marker = '<!--ssg:app-->'
const teleportMarker = '<!--ssg:teleports-->'
const seoStart = '<!--ssg:seo:start-->'
const seoEnd = '<!--ssg:seo:end-->'

const runVite = (args) =>
  execFileSync(process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), ...args], {
    cwd: root,
    stdio: 'inherit',
  })

rmSync(serverDir, { recursive: true, force: true })

try {
  runVite(['build'])
  runVite(['build', '--ssr', 'src/entry-server.js', '--outDir', '.ssr'])

  const templatePath = resolve(distDir, 'index.html')
  if (!existsSync(templatePath)) throw new Error('Client build did not create dist/index.html.')

  const template = readFileSync(templatePath, 'utf8')
  if (!template.includes(marker) || !template.includes(teleportMarker) || !template.includes(seoStart) || !template.includes(seoEnd)) {
    throw new Error('The Vite HTML template is missing its prerender placeholders.')
  }

  const serverEntry = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')).href)
  for (const locale of locales) {
    const context = {}
    const appHtml = await renderToString(serverEntry.createApp(locale), context)
    const assetPrefix = locale === 'cs' ? './assets/' : '../assets/'
    const page = template
      .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
      .replace(new RegExp(`${seoStart}[\\s\\S]*?${seoEnd}`), createSeoHead(locale))
      .replace(marker, appHtml)
      .replace(teleportMarker, context.teleports?.['#teleports'] ?? '')
      .replaceAll('./assets/', assetPrefix)
      .replace('<div id="app">', '<div id="app" data-prerendered="true">')

    const destination = locale === 'cs'
      ? resolve(distDir, 'index.html')
      : resolve(distDir, locale, 'index.html')
    mkdirSync(dirname(destination), { recursive: true })
    writeFileSync(destination, page)
  }
} finally {
  rmSync(serverDir, { recursive: true, force: true })
}
