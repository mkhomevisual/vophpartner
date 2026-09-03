import { LANGUAGES } from './i18n.js'

const messages = {
  cs: { title: 'Stránka nenalezena | VOPH Partners', heading: 'Stránka nenalezena', body: 'Omlouváme se, požadovaná stránka neexistuje nebo byla přesunuta.', action: 'Zpět na úvod' },
  en: { title: 'Page not found | VOPH Partners', heading: 'Page not found', body: 'Sorry, the page you requested does not exist or has been moved.', action: 'Back to home' },
  pl: { title: 'Nie znaleziono strony | VOPH Partners', heading: 'Nie znaleziono strony', body: 'Przepraszamy, żądana strona nie istnieje lub została przeniesiona.', action: 'Wróć na stronę główną' },
  de: { title: 'Seite nicht gefunden | VOPH Partners', heading: 'Seite nicht gefunden', body: 'Die angeforderte Seite existiert nicht oder wurde verschoben.', action: 'Zur Startseite' },
  hu: { title: 'Az oldal nem található | VOPH Partners', heading: 'Az oldal nem található', body: 'Sajnáljuk, a keresett oldal nem létezik, vagy áthelyezték.', action: 'Vissza a főoldalra' },
  fr: { title: 'Page introuvable | VOPH Partners', heading: 'Page introuvable', body: 'La page demandée n’existe pas ou a été déplacée.', action: 'Retour à l’accueil' },
  nl: { title: 'Pagina niet gevonden | VOPH Partners', heading: 'Pagina niet gevonden', body: 'De gevraagde pagina bestaat niet of is verplaatst.', action: 'Terug naar home' },
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const getLocale = (locale) => (messages[locale] ? locale : 'cs')

export function getNotFoundMessage(locale) {
  return messages[getLocale(locale)]
}

export function createNotFoundPage(locale, { fallback = false } = {}) {
  const currentLocale = getLocale(locale)
  const faviconPath = fallback ? '/favicon.svg' : '../favicon.svg'
  const localeVariants = fallback ? LANGUAGES : LANGUAGES.filter(({ code }) => code === currentLocale)
  const content = localeVariants
    .map(({ code }) => {
      const message = messages[code]
      const isActive = code === currentLocale
      // GitHub Pages serves this root 404 document at the originally requested
      // URL. Use root-relative targets so a deep invalid URL cannot duplicate
      // its locale segment (for example /de/de/de/).
      const homeHref = fallback ? (code === 'cs' ? '/' : `/${code}/`) : './'
      return `<main class="page" data-locale="${code}" data-title="${escapeHtml(message.title)}"${isActive ? '' : ' hidden'}>
      <p class="brand">VOPH <span>Partners</span></p>
      <p class="code" aria-hidden="true">404</p>
      <h1>${escapeHtml(message.heading)}</h1>
      <p class="body">${escapeHtml(message.body)}</p>
      <a class="action" href="${homeHref}">${escapeHtml(message.action)}</a>
    </main>`
    })
    .join('\n    ')

  const localeDetection = fallback
    ? `<script>
      const supported = new Set(${JSON.stringify(LANGUAGES.map(({ code }) => code))})
      const requested = location.pathname.toLowerCase().split('/').filter(Boolean).find((part) => supported.has(part)) || 'cs'
      const current = document.querySelector('[data-locale="' + requested + '"]')
      if (current) {
        document.querySelectorAll('[data-locale]').forEach((page) => { page.hidden = page !== current })
        document.documentElement.lang = requested
        document.title = current.dataset.title
      }
    </script>`
    : ''

  return `<!doctype html>
<html lang="${currentLocale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <meta name="theme-color" content="#f6f3ee" />
    <title>${escapeHtml(messages[currentLocale].title)}</title>
    <link rel="icon" type="image/svg+xml" href="${faviconPath}" />
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #16130f; background: #f6f3ee; }
      * { box-sizing: border-box; }
      body { min-width: 0; min-height: 100vh; margin: 0; background: radial-gradient(circle at 90% 10%, rgb(255 122 38 / 0.14), transparent 26rem), #f6f3ee; }
      .page { min-height: 100vh; width: min(100% - 2.5rem, 44rem); margin: auto; display: grid; align-content: center; justify-items: start; padding: 4rem 0; }
      .brand { margin: 0 0 3rem; font-size: 1.1rem; font-weight: 700; letter-spacing: -0.03em; }
      .brand span { margin-left: .45rem; color: #6e675e; font-size: .7em; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; }
      .code { margin: 0; color: #ff7a26; font-size: clamp(5rem, 17vw, 9rem); font-weight: 700; letter-spacing: -.08em; line-height: .8; }
      h1 { max-width: 12ch; margin: 1.6rem 0 0; font-size: clamp(2.2rem, 5vw, 4rem); letter-spacing: -.045em; line-height: 1.05; }
      .body { max-width: 35rem; margin: 1.25rem 0 0; color: #4f4940; font-size: 1.05rem; line-height: 1.65; }
      .action { margin-top: 2rem; padding: .9rem 1.45rem; border-radius: 999px; background: #ff7a26; color: #0a0908; font-weight: 650; text-decoration: none; transition: transform .2s ease, background-color .2s ease; }
      .action:hover { background: #d85a04; transform: translateY(-2px); }
      .action:focus-visible { outline: 2px solid #b34a00; outline-offset: 4px; }
      [hidden] { display: none !important; }
    </style>
  </head>
  <body>
    ${content}
    ${localeDetection}
  </body>
</html>`
}
