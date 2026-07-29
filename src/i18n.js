import { computed, ref, watch } from 'vue'

/* ============================================================
   VOPH Partners — all visitor-facing copy lives here.
   Contact placeholders still need real launch data.
   ============================================================ */

export const LANGUAGES = [
  { code: 'cs', short: 'CZ', name: 'Čeština' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'pl', short: 'PL', name: 'Polski' },
  { code: 'de', short: 'DE', name: 'Deutsch' },
  { code: 'hu', short: 'HU', name: 'Magyar' },
  { code: 'fr', short: 'FR', name: 'Français' },
  { code: 'nl', short: 'NL', name: 'Nederlands' },
]

export const BRANDS = [
  ['Always', '/brands/Always_logo.png'],
  ['Ariel', '/brands/ariel-logo.png'],
  ['Axe', '/brands/Axe_logo_2016.svg'],
  ['Calgon', '/brands/calgon-logo.png'],
  ['Ceresit', '/brands/ceresit.png'],
  ['Cif', '/brands/CIF-Logo.jpg'],
  ['Cillit Bang', '/brands/Cillit_Bang_Logo_big.png'],
  ['Old Spice', '/brands/Current_Old_Spice_Logo_2016.svg.webp'],
  ['Dettol', '/brands/Dettol_logo.png'],
  ['Domestos', '/brands/Domestos_logo.png'],
  ['Dove', '/brands/Dove_logo.png'],
  ['Durex', '/brands/durex-logo-png_seeklogo-289476.png'],
  ['Fa', '/brands/Fa_(brand)_Logo.jpg'],
  ['Gillette', '/brands/Gillette.svg.webp'],
  ['Herbal Essences', '/brands/Herbal_Essences_Hair_Care.png'],
  ['Incognito', '/brands/Incognito-Clear-Bold.png'],
  ['Loctite', '/brands/Loctite-Logo.svg.webp'],
  ['Brit', '/brands/logo-brit.png'],
  ['Lux', '/brands/LUX_(soap)_logo.png'],
  ['Oral-B', '/brands/Oral-B_Logo_2024.svg.webp'],
  ['Pampers', '/brands/Pampers_logo.svg.webp'],
  ['Pantene', '/brands/Pantene.svg.webp'],
  ['Pattex', '/brands/pattex-logo.webp'],
  ['Persil', '/brands/Persil-Logo.svg.webp'],
  ['Pritt', '/brands/Pritt-Logo-aktuell.jpg'],
  ['Rexona', '/brands/Rexona_logo_2018.svg.webp'],
  ['Swiffer', '/brands/Swiffer_logo.svg.webp'],
  ['Syoss', '/brands/syoss-logo-png_seeklogo-321081.png'],
  ['TRESemmé', '/brands/Tresemme_new_logo.png'],
  ['Vaseline', '/brands/Vaseline_new_logo.png'],
  ['Veet', '/brands/Veet-Logo.png'],
  ['Zewa', '/brands/zewa-300x300.avif'],
].map(([name, src]) => ({ name, src: src.replace('/', import.meta.env.BASE_URL) }))

export const CONTACT = {
  phone: '+420 775 372 979',
  email: 'info@voph.cz',
  meeting: '[MEETING_LINK]',
  address: '[ADDRESS]',
}

const serviceItems = (items) =>
  items.map(([title, body], i) => ({
    num: `0${i + 1}`,
    icon: ['boxes', 'globe', 'exchange'][i],
    title,
    body,
  }))

const advantageItems = (items) =>
  items.map(([title, body], i) => ({
    icon: ['tag', 'bolt', 'globe', 'check', 'link', 'layers'][i],
    title,
    body,
  }))

const processSteps = (steps) => steps.map(([title, body]) => ({ title, body }))

const createDictionary = (data) => ({
  ...data,
  services: { ...data.services, items: serviceItems(data.services.items) },
  why: { ...data.why, items: advantageItems(data.why.items) },
  process: { ...data.process, steps: processSteps(data.process.steps) },
  contact: {
    ...data.contact,
    cards: [
      { icon: 'phone', label: data.contact.phone, value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
      { icon: 'mail', label: data.contact.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
      { icon: 'calendar', label: data.contact.meeting, value: data.contact.cta, href: CONTACT.meeting },
    ],
  },
})

const dictionaries = {
  cs: createDictionary({
    meta: {
      title: 'VOPH Partners — FMCG trading & sourcing',
      description: 'FMCG trading a sourcing s dlouhodobou perspektivou. Globální značky, logistika a trhy po celé Evropě.',
    },
    a11y: { skip: 'Přeskočit na obsah', menuOpen: 'Otevřít menu', menuClose: 'Zavřít menu', langLabel: 'Jazyk webu', home: 'VOPH Partners — úvod', themeToDark: 'Přepnout na tmavý režim', themeToLight: 'Přepnout na světlý režim' },
    nav: { links: [['about', 'O nás'], ['services', 'Služby'], ['why', 'Proč VOPH'], ['process', 'Spolupráce'], ['contact', 'Kontakt']].map(([id, label]) => ({ id, label })), cta: 'Kontaktovat nás' },
    hero: { badge: 'FMCG trading & sourcing', titleLines: ['Váš dlouhodobý', 'partner pro FMCG', 'trading a sourcing'], sub: 'Globální značky. Konkurenceschopné ceny. Dlouhodobá partnerství.', support: 'Propojujeme značky, logistiku a trhy — pro velkoobchody, retailové řetězce a velké e-shopy.', ctaPrimary: 'Kontaktovat nás', ctaSecondary: 'Zjistit více', chips: ['Sourcing v Evropě i mimo ni', 'Jedno kontaktní místo', 'Rychlá reakce'], scroll: 'Posunout dolů' },
    about: {
      label: 'O nás', title: 'FMCG trading a sourcing s dlouhodobou perspektivou.',
      lead: 'VOPH Partners je trading a sourcingový partner se zaměřením na FMCG. Propojujeme značky, logistiku a trhy po celé Evropě — a stavíme dlouhodobá partnerství, ne jednorázové obchody.',
      body: 'Součástí skupiny je franšíza 15 prodejen One-Shop.cz, velkoobchodní e-shop VOPH.cz a B2C e-shop Loopy.cz.',
      stats: [{ value: 5.9, decimals: 1, suffix: ' mil. Kč', label: 'obrat za rok 2025' }, { value: 50, suffix: '+', label: 'oboustranných partnerství' }, { value: 3468, suffix: '+', label: 'prodaných palet v roce 2025' }, { value: 10, suffix: '+', label: 'zemí spolupráce v Evropě' }],
      quote: 'Stavíme na důvěře, spolehlivosti a vztazích, které vydrží déle než jeden obchod.',
    },
    services: { label: 'Služby', title: 'V čem jsme silní.', items: [['FMCG distribuce', 'Produkty předních světových značek za konkurenceschopné ceny. Ve velkých objemech, se spolehlivým dodáním.'], ['Sourcing', 'Vyhledáváme produkty a dodavatele po celém světě. V Evropě i mimo ni — podle vašeho zadání.'], ['Trading', 'Propojujeme značky, distributory a trhy. Rychle, přehledně a bez zbytečné administrativy.']] },
    brands: { label: 'Značky v našem portfoliu' },
    why: { label: 'Proč VOPH Partners', title: 'Obchod postavený na objemech, rychlosti a vztazích.', items: [['Lepší ceny díky objemům', 'Nákupní síla, kterou poznáte na marži.'], ['Rychlá reakce', 'Poptávka u nás nezůstane ležet.'], ['Mezinárodní sourcing', 'Evropa i zámoří. Jedna dodavatelská síť.'], ['Jednoduchá spolupráce', 'Jedno kontaktní místo. Minimum administrativy.'], ['Dlouhodobé partnerství', 'Nestavíme na jednorázových obchodech.'], ['FMCG know-how', 'Známe kategorie, značky i trhy.']] },
    process: { label: 'Jak spolupráce probíhá', title: 'Od poptávky k partnerství. Ve čtyřech krocích.', steps: [['Poptávka', 'Pošlete nám, co hledáte — kategorie, značky, objemy.'], ['Nabídka', 'Připravíme konkrétní ceny a dostupnost.'], ['Logistika', 'Zajistíme dodání. Efektivně a spolehlivě.'], ['Partnerství', 'Z první objednávky stavíme dlouhodobou spolupráci.']] },
    logistics: { label: 'Logistika', title: 'Silné zázemí. Efektivní procesy.', body: 'Od dodavatele až k vám — rychle, přehledně a bez komplikací. Logistika je součást naší práce, ne dodatečná služba.', chips: ['Efektivita procesů', 'Rychlost', 'Jednoduchost'], diagram: { left: { title: 'Značky', sub: 'globální výrobci' }, hub: { title: 'VOPH Partners', sub: 'sourcing · trading · logistika' }, right: { title: 'Trhy', sub: 'velkoobchod · retail · e-commerce' } } },
    warehouse: { label: 'Sklad', title: 'Skladové zázemí, které drží obchod v pohybu.', body: 'Pro logistické operace využíváme sklad v síti CS Logistics group s.r.o. Přesnou polohu a trasu najdete v Mapách.', cta: 'Navigovat' },
    contact: { label: 'Kontakt', title: 'Pojďme obchodovat.', body: 'Ozvěte se nám. Odpovídáme rychle.', phone: 'Telefon', email: 'E-mail', meeting: 'Schůzka', cta: 'Kontaktovat nás' },
    footer: { tagline: 'Dlouhodobý partner pro FMCG trading a sourcing.', navLabel: 'Navigace', contactLabel: 'Kontakt', address: CONTACT.address, rights: 'Všechna práva vyhrazena.' },
  }),
  en: createDictionary({
    meta: { title: 'VOPH Partners — FMCG Trading & Sourcing', description: 'FMCG trading and sourcing for the long term. Brands, logistics and markets across Europe.' },
    a11y: { skip: 'Skip to content', menuOpen: 'Open menu', menuClose: 'Close menu', langLabel: 'Site language', home: 'VOPH Partners — home', themeToDark: 'Switch to dark mode', themeToLight: 'Switch to light mode' },
    nav: { links: [['about', 'About'], ['services', 'Services'], ['why', 'Why VOPH'], ['process', 'Partnership'], ['contact', 'Contact']].map(([id, label]) => ({ id, label })), cta: 'Contact us' },
    hero: { badge: 'FMCG trading & sourcing', titleLines: ['Your long-term', 'partner for FMCG', 'trading & sourcing'], sub: 'Global brands. Competitive prices. Long-term partnerships.', support: 'We connect brands, logistics and markets — for wholesalers, retail chains and major e-commerce players.', ctaPrimary: 'Contact us', ctaSecondary: 'Learn more', chips: ['Sourcing in Europe & beyond', 'One point of contact', 'Fast response'], scroll: 'Scroll down' },
    about: { label: 'About', title: 'FMCG trading and sourcing for the long term.', lead: 'VOPH Partners is an FMCG-focused trading and sourcing partner. We connect brands, logistics and markets across Europe — and build long-term partnerships, not one-off deals.', body: 'Our group includes the One-Shop.cz franchise with 15 stores, the VOPH.cz wholesale e-shop and the Loopy.cz B2C e-shop.', stats: [{ value: 5.9, decimals: 1, prefix: 'CZK ', suffix: 'm', label: 'turnover in 2025' }, { value: 50, suffix: '+', label: 'two-way partnerships' }, { value: 3468, suffix: '+', label: 'pallets sold in 2025' }, { value: 10, suffix: '+', label: 'countries across Europe' }], quote: 'We build on trust, reliability and relationships that last longer than a single deal.' },
    services: { label: 'Services', title: 'What we do best.', items: [['FMCG distribution', 'Products from the world’s leading brands at competitive prices. In volume, delivered reliably.'], ['Sourcing', 'We find products and suppliers worldwide. In Europe and beyond — to your specification.'], ['Trading', 'We connect brands, distributors and markets. Fast, transparent, no unnecessary admin.']] },
    brands: { label: 'Brands in our portfolio' },
    why: { label: 'Why VOPH Partners', title: 'Trade built on volume, speed and relationships.', items: [['Better prices through volume', 'Purchasing power you’ll see in your margin.'], ['Fast response', 'Your enquiry never sits in a queue.'], ['International sourcing', 'Europe and overseas. One supplier network.'], ['Simple cooperation', 'One point of contact. Minimal admin.'], ['Long-term partnership', 'We don’t build on one-off deals.'], ['FMCG know-how', 'We know the categories, brands and markets.']] },
    process: { label: 'How we work', title: 'From enquiry to partnership. In four steps.', steps: [['Enquiry', 'Tell us what you’re looking for — categories, brands, volumes.'], ['Offer', 'We prepare concrete prices and availability.'], ['Logistics', 'We handle delivery. Efficiently and reliably.'], ['Partnership', 'From the first order, we build long-term cooperation.']] },
    logistics: { label: 'Logistics', title: 'Strong backbone. Efficient processes.', body: 'From supplier to your door — fast, transparent, no friction. Logistics is part of how we work, not an add-on service.', chips: ['Process efficiency', 'Speed', 'Simplicity'], diagram: { left: { title: 'Brands', sub: 'global manufacturers' }, hub: { title: 'VOPH Partners', sub: 'sourcing · trading · logistics' }, right: { title: 'Markets', sub: 'wholesale · retail · e-commerce' } } },
    warehouse: { label: 'Warehouse', title: 'Warehouse support that keeps trade moving.', body: 'For logistics operations, we use a warehouse within the CS Logistics group s.r.o. network. Find the exact location and route in Maps.', cta: 'Navigate' },
    contact: { label: 'Contact', title: 'Let’s trade.', body: 'Get in touch. We respond fast.', phone: 'Phone', email: 'E-mail', meeting: 'Meeting', cta: 'Contact us' },
    footer: { tagline: 'Long-term partner for FMCG trading and sourcing.', navLabel: 'Navigation', contactLabel: 'Contact', address: CONTACT.address, rights: 'All rights reserved.' },
  }),
  pl: createDictionary({
    meta: { title: 'VOPH Partners — handel i sourcing FMCG', description: 'Długoterminowy handel i sourcing FMCG. Marki, logistyka i rynki w całej Europie.' },
    a11y: { skip: 'Przejdź do treści', menuOpen: 'Otwórz menu', menuClose: 'Zamknij menu', langLabel: 'Język strony', home: 'VOPH Partners — strona główna', themeToDark: 'Przełącz na tryb ciemny', themeToLight: 'Przełącz na tryb jasny' },
    nav: { links: [['about', 'O nas'], ['services', 'Usługi'], ['why', 'Dlaczego VOPH'], ['process', 'Współpraca'], ['contact', 'Kontakt']].map(([id, label]) => ({ id, label })), cta: 'Skontaktuj się z nami' },
    hero: { badge: 'FMCG trading & sourcing', titleLines: ['Twój długoterminowy', 'partner w handlu', 'i sourcingu FMCG'], sub: 'Globalne marki. Konkurencyjne ceny. Długoterminowe partnerstwa.', support: 'Łączymy marki, logistykę i rynki — dla hurtowni, sieci detalicznych i dużych e-commerce.', ctaPrimary: 'Skontaktuj się z nami', ctaSecondary: 'Dowiedz się więcej', chips: ['Sourcing w Europie i poza nią', 'Jeden punkt kontaktu', 'Szybka odpowiedź'], scroll: 'Przewiń w dół' },
    about: { label: 'O nas', title: 'Handel i sourcing FMCG z długoterminową perspektywą.', lead: 'VOPH Partners to partner handlowy i sourcingowy skoncentrowany na FMCG. Łączymy marki, logistykę i rynki w całej Europie — budując długoterminowe partnerstwa, a nie jednorazowe transakcje.', body: 'Do grupy należy franczyza 15 sklepów One-Shop.cz, hurtowy e-shop VOPH.cz oraz e-shop B2C Loopy.cz.', stats: [{ value: 5.9, decimals: 1, suffix: ' mln CZK', label: 'obrotu w 2025 roku' }, { value: 50, suffix: '+', label: 'dwustronnych partnerstw' }, { value: 3468, suffix: '+', label: 'sprzedanych palet w 2025 roku' }, { value: 10, suffix: '+', label: 'krajów współpracy w Europie' }], quote: 'Budujemy na zaufaniu, niezawodności i relacjach, które trwają dłużej niż jedna transakcja.' },
    services: { label: 'Usługi', title: 'Nasze mocne strony.', items: [['Dystrybucja FMCG', 'Produkty wiodących światowych marek w konkurencyjnych cenach. W dużych wolumenach i z niezawodną dostawą.'], ['Sourcing', 'Wyszukujemy produkty i dostawców na całym świecie. W Europie i poza nią — zgodnie z Twoim zapytaniem.'], ['Trading', 'Łączymy marki, dystrybutorów i rynki. Szybko, przejrzyście i bez zbędnej administracji.']] },
    brands: { label: 'Marki w naszym portfolio' },
    why: { label: 'Dlaczego VOPH Partners', title: 'Handel oparty na wolumenie, szybkości i relacjach.', items: [['Lepsze ceny dzięki wolumenom', 'Siła zakupowa widoczna w Twojej marży.'], ['Szybka odpowiedź', 'Twoje zapytanie nie czeka w kolejce.'], ['Międzynarodowy sourcing', 'Europa i rynki zamorskie. Jedna sieć dostawców.'], ['Prosta współpraca', 'Jeden punkt kontaktu. Minimum administracji.'], ['Długoterminowe partnerstwo', 'Nie budujemy na jednorazowych transakcjach.'], ['Know-how FMCG', 'Znamy kategorie, marki i rynki.']] },
    process: { label: 'Jak współpracujemy', title: 'Od zapytania do partnerstwa. W czterech krokach.', steps: [['Zapytanie', 'Prześlij nam, czego szukasz — kategorie, marki, wolumeny.'], ['Oferta', 'Przygotujemy konkretne ceny i dostępność.'], ['Logistyka', 'Zorganizujemy dostawę. Sprawnie i niezawodnie.'], ['Partnerstwo', 'Od pierwszego zamówienia budujemy długoterminową współpracę.']] },
    logistics: { label: 'Logistyka', title: 'Solidne zaplecze. Efektywne procesy.', body: 'Od dostawcy do Ciebie — szybko, przejrzyście i bez komplikacji. Logistyka jest częścią naszej pracy, a nie dodatkiem.', chips: ['Efektywność procesów', 'Szybkość', 'Prostota'], diagram: { left: { title: 'Marki', sub: 'globalni producenci' }, hub: { title: 'VOPH Partners', sub: 'sourcing · trading · logistyka' }, right: { title: 'Rynki', sub: 'hurt · retail · e-commerce' } } },
    warehouse: { label: 'Magazyn', title: 'Zaplecze magazynowe, które utrzymuje handel w ruchu.', body: 'W operacjach logistycznych korzystamy z magazynu w sieci CS Logistics group s.r.o. Dokładną lokalizację i trasę znajdziesz w Mapach.', cta: 'Nawiguj' },
    contact: { label: 'Kontakt', title: 'Porozmawiajmy o handlu.', body: 'Skontaktuj się z nami. Odpowiadamy szybko.', phone: 'Telefon', email: 'E-mail', meeting: 'Spotkanie', cta: 'Skontaktuj się z nami' },
    footer: { tagline: 'Długoterminowy partner w handlu i sourcingu FMCG.', navLabel: 'Nawigacja', contactLabel: 'Kontakt', address: CONTACT.address, rights: 'Wszelkie prawa zastrzeżone.' },
  }),
  de: createDictionary({
    meta: { title: 'VOPH Partners — FMCG-Handel & Sourcing', description: 'Langfristiger FMCG-Handel und Sourcing. Marken, Logistik und Märkte in ganz Europa.' },
    a11y: { skip: 'Zum Inhalt springen', menuOpen: 'Menü öffnen', menuClose: 'Menü schließen', langLabel: 'Sprache der Website', home: 'VOPH Partners — Startseite', themeToDark: 'Zum dunklen Modus wechseln', themeToLight: 'Zum hellen Modus wechseln' },
    nav: { links: [['about', 'Über uns'], ['services', 'Leistungen'], ['why', 'Warum VOPH'], ['process', 'Zusammenarbeit'], ['contact', 'Kontakt']].map(([id, label]) => ({ id, label })), cta: 'Kontakt aufnehmen' },
    hero: { badge: 'FMCG trading & sourcing', titleLines: ['Ihr langfristiger', 'Partner für FMCG-', 'Handel & Sourcing'], sub: 'Globale Marken. Wettbewerbsfähige Preise. Langfristige Partnerschaften.', support: 'Wir verbinden Marken, Logistik und Märkte — für Großhändler, Handelsketten und große E-Commerce-Unternehmen.', ctaPrimary: 'Kontakt aufnehmen', ctaSecondary: 'Mehr erfahren', chips: ['Sourcing in Europa und darüber hinaus', 'Ein Ansprechpartner', 'Schnelle Reaktion'], scroll: 'Nach unten scrollen' },
    about: { label: 'Über uns', title: 'FMCG-Handel und Sourcing mit langfristiger Perspektive.', lead: 'VOPH Partners ist ein auf FMCG spezialisierter Handels- und Sourcing-Partner. Wir verbinden Marken, Logistik und Märkte in ganz Europa — und bauen langfristige Partnerschaften statt einmaliger Geschäfte auf.', body: 'Zur Gruppe gehören die One-Shop.cz-Franchise mit 15 Filialen, der Großhandels-E-Shop VOPH.cz und der B2C-E-Shop Loopy.cz.', stats: [{ value: 5.9, decimals: 1, suffix: ' Mio. CZK', label: 'Umsatz im Jahr 2025' }, { value: 50, suffix: '+', label: 'beidseitige Partnerschaften' }, { value: 3468, suffix: '+', label: 'verkaufte Paletten im Jahr 2025' }, { value: 10, suffix: '+', label: 'Länder der Zusammenarbeit in Europa' }], quote: 'Wir setzen auf Vertrauen, Verlässlichkeit und Beziehungen, die länger halten als ein einzelnes Geschäft.' },
    services: { label: 'Leistungen', title: 'Unsere Stärken.', items: [['FMCG-Distribution', 'Produkte führender globaler Marken zu wettbewerbsfähigen Preisen. In großen Mengen und mit zuverlässiger Lieferung.'], ['Sourcing', 'Wir finden Produkte und Lieferanten weltweit. In Europa und darüber hinaus — nach Ihren Vorgaben.'], ['Handel', 'Wir verbinden Marken, Distributoren und Märkte. Schnell, transparent und ohne unnötige Administration.']] },
    brands: { label: 'Marken in unserem Portfolio' },
    why: { label: 'Warum VOPH Partners', title: 'Handel auf Basis von Volumen, Tempo und Beziehungen.', items: [['Bessere Preise durch Volumen', 'Einkaufskraft, die Sie in Ihrer Marge sehen.'], ['Schnelle Reaktion', 'Ihre Anfrage bleibt nicht liegen.'], ['Internationales Sourcing', 'Europa und Übersee. Ein Lieferantennetzwerk.'], ['Einfache Zusammenarbeit', 'Ein Ansprechpartner. Minimaler Aufwand.'], ['Langfristige Partnerschaft', 'Wir bauen nicht auf Einzelgeschäften auf.'], ['FMCG-Know-how', 'Wir kennen Kategorien, Marken und Märkte.']] },
    process: { label: 'So arbeiten wir', title: 'Von der Anfrage zur Partnerschaft. In vier Schritten.', steps: [['Anfrage', 'Senden Sie uns, was Sie suchen — Kategorien, Marken, Mengen.'], ['Angebot', 'Wir erstellen konkrete Preise und Verfügbarkeiten.'], ['Logistik', 'Wir organisieren die Lieferung. Effizient und zuverlässig.'], ['Partnerschaft', 'Aus der ersten Bestellung entwickeln wir eine langfristige Zusammenarbeit.']] },
    logistics: { label: 'Logistik', title: 'Starkes Fundament. Effiziente Prozesse.', body: 'Vom Lieferanten bis zu Ihnen — schnell, transparent und ohne Reibung. Logistik ist Teil unserer Arbeit, kein Zusatz.', chips: ['Prozesseffizienz', 'Geschwindigkeit', 'Einfachheit'], diagram: { left: { title: 'Marken', sub: 'globale Hersteller' }, hub: { title: 'VOPH Partners', sub: 'Sourcing · Handel · Logistik' }, right: { title: 'Märkte', sub: 'Großhandel · Retail · E-Commerce' } } },
    warehouse: { label: 'Lager', title: 'Lagerlogistik, die den Handel in Bewegung hält.', body: 'Für die Logistik nutzen wir ein Lager im Netzwerk der CS Logistics group s.r.o. Den genauen Standort und die Route finden Sie in Maps.', cta: 'Navigieren' },
    contact: { label: 'Kontakt', title: 'Lassen Sie uns handeln.', body: 'Melden Sie sich bei uns. Wir antworten schnell.', phone: 'Telefon', email: 'E-Mail', meeting: 'Termin', cta: 'Kontakt aufnehmen' },
    footer: { tagline: 'Langfristiger Partner für FMCG-Handel und Sourcing.', navLabel: 'Navigation', contactLabel: 'Kontakt', address: CONTACT.address, rights: 'Alle Rechte vorbehalten.' },
  }),
  hu: createDictionary({
    meta: { title: 'VOPH Partners — FMCG kereskedelem és sourcing', description: 'Hosszú távú FMCG kereskedelem és sourcing. Márkák, logisztika és piacok Európa-szerte.' },
    a11y: { skip: 'Ugrás a tartalomra', menuOpen: 'Menü megnyitása', menuClose: 'Menü bezárása', langLabel: 'Weboldal nyelve', home: 'VOPH Partners — kezdőlap', themeToDark: 'Váltás sötét módra', themeToLight: 'Váltás világos módra' },
    nav: { links: [['about', 'Rólunk'], ['services', 'Szolgáltatások'], ['why', 'Miért VOPH'], ['process', 'Együttműködés'], ['contact', 'Kapcsolat']].map(([id, label]) => ({ id, label })), cta: 'Kapcsolatfelvétel' },
    hero: { badge: 'FMCG trading & sourcing', titleLines: ['Hosszú távú', 'partnere az FMCG', 'kereskedelemben'], sub: 'Globális márkák. Versenyképes árak. Hosszú távú partnerségek.', support: 'Márkákat, logisztikát és piacokat kapcsolunk össze — nagykereskedők, üzletláncok és nagy e-kereskedők számára.', ctaPrimary: 'Kapcsolatfelvétel', ctaSecondary: 'Tudjon meg többet', chips: ['Sourcing Európában és azon túl', 'Egy kapcsolattartó', 'Gyors válasz'], scroll: 'Görgessen lejjebb' },
    about: { label: 'Rólunk', title: 'FMCG kereskedelem és sourcing hosszú távú szemlélettel.', lead: 'A VOPH Partners FMCG-fókuszú kereskedelmi és sourcing partner. Európa-szerte kapcsoljuk össze a márkákat, a logisztikát és a piacokat — hosszú távú partnerségeket építve, nem egyszeri üzleteket.', body: 'A csoporthoz tartozik a 15 One-Shop.cz üzletet működtető franchise, a VOPH.cz nagykereskedelmi e-shop és a Loopy.cz B2C e-shop.', stats: [{ value: 5.9, decimals: 1, suffix: ' millió CZK', label: 'árbevétel 2025-ben' }, { value: 50, suffix: '+', label: 'kétoldalú partnerség' }, { value: 3468, suffix: '+', label: 'eladott raklap 2025-ben' }, { value: 10, suffix: '+', label: 'együttműködési ország Európában' }], quote: 'Bizalomra, megbízhatóságra és olyan kapcsolatokra építünk, amelyek egy üzletnél tovább tartanak.' },
    services: { label: 'Szolgáltatások', title: 'Amiben erősek vagyunk.', items: [['FMCG disztribúció', 'Vezető globális márkák termékei versenyképes áron. Nagy volumenben, megbízható szállítással.'], ['Sourcing', 'Termékeket és beszállítókat keresünk világszerte. Európában és azon túl — az Ön igényei szerint.'], ['Kereskedelem', 'Márkákat, forgalmazókat és piacokat kötünk össze. Gyorsan, átláthatóan, felesleges adminisztráció nélkül.']] },
    brands: { label: 'Márkák a portfóliónkban' },
    why: { label: 'Miért VOPH Partners', title: 'Volumenre, gyorsaságra és kapcsolatokra épülő kereskedelem.', items: [['Jobb árak a volumennek köszönhetően', 'Beszerzési erő, amely a marginban is látszik.'], ['Gyors válasz', 'Az Ön megkeresése nem marad válasz nélkül.'], ['Nemzetközi sourcing', 'Európa és tengerentúl. Egy beszállítói hálózat.'], ['Egyszerű együttműködés', 'Egy kapcsolattartó. Minimális adminisztráció.'], ['Hosszú távú partnerség', 'Nem egyszeri üzletekre építünk.'], ['FMCG know-how', 'Ismerjük a kategóriákat, márkákat és piacokat.']] },
    process: { label: 'Hogyan dolgozunk', title: 'Az igénytől a partnerségig. Négy lépésben.', steps: [['Igény', 'Küldje el, mit keres — kategóriák, márkák, volumenek.'], ['Ajánlat', 'Konkrét árakat és elérhetőséget készítünk.'], ['Logisztika', 'Megszervezzük a szállítást. Hatékonyan és megbízhatóan.'], ['Partnerség', 'Az első rendelésből hosszú távú együttműködést építünk.']] },
    logistics: { label: 'Logisztika', title: 'Erős háttér. Hatékony folyamatok.', body: 'A beszállítótól Önhöz — gyorsan, átláthatóan és súrlódásmentesen. A logisztika munkánk része, nem kiegészítő szolgáltatás.', chips: ['Folyamathatékonyság', 'Gyorsaság', 'Egyszerűség'], diagram: { left: { title: 'Márkák', sub: 'globális gyártók' }, hub: { title: 'VOPH Partners', sub: 'sourcing · kereskedelem · logisztika' }, right: { title: 'Piacok', sub: 'nagykereskedelem · retail · e-commerce' } } },
    warehouse: { label: 'Raktár', title: 'Raktári háttér, amely mozgásban tartja a kereskedelmet.', body: 'Logisztikai műveleteinkhez a CS Logistics group s.r.o. hálózatában működő raktárt használjuk. A pontos helyszínt és útvonalat a Mapsben találja.', cta: 'Navigáció' },
    contact: { label: 'Kapcsolat', title: 'Dolgozzunk együtt.', body: 'Vegye fel velünk a kapcsolatot. Gyorsan válaszolunk.', phone: 'Telefon', email: 'E-mail', meeting: 'Találkozó', cta: 'Kapcsolatfelvétel' },
    footer: { tagline: 'Hosszú távú partner FMCG kereskedelemhez és sourcinghoz.', navLabel: 'Navigáció', contactLabel: 'Kapcsolat', address: CONTACT.address, rights: 'Minden jog fenntartva.' },
  }),
  fr: createDictionary({
    meta: { title: 'VOPH Partners — négoce et sourcing FMCG', description: 'Négoce et sourcing FMCG à long terme. Marques, logistique et marchés partout en Europe.' },
    a11y: { skip: 'Aller au contenu', menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu', langLabel: 'Langue du site', home: 'VOPH Partners — accueil', themeToDark: 'Passer au mode sombre', themeToLight: 'Passer au mode clair' },
    nav: { links: [['about', 'À propos'], ['services', 'Services'], ['why', 'Pourquoi VOPH'], ['process', 'Partenariat'], ['contact', 'Contact']].map(([id, label]) => ({ id, label })), cta: 'Nous contacter' },
    hero: { badge: 'FMCG trading & sourcing', titleLines: ['Votre partenaire', 'de long terme pour', 'le FMCG'], sub: 'Marques mondiales. Prix compétitifs. Partenariats durables.', support: 'Nous connectons marques, logistique et marchés — pour les grossistes, enseignes et grands acteurs e-commerce.', ctaPrimary: 'Nous contacter', ctaSecondary: 'En savoir plus', chips: ['Sourcing en Europe et au-delà', 'Un interlocuteur unique', 'Réponse rapide'], scroll: 'Faire défiler' },
    about: { label: 'À propos', title: 'Négoce et sourcing FMCG avec une vision de long terme.', lead: 'VOPH Partners est un partenaire de négoce et de sourcing spécialisé dans le FMCG. Nous connectons les marques, la logistique et les marchés dans toute l’Europe — et construisons des partenariats durables, pas des opérations ponctuelles.', body: 'Le groupe comprend la franchise One-Shop.cz de 15 magasins, l’e-shop de gros VOPH.cz et l’e-shop B2C Loopy.cz.', stats: [{ value: 5.9, decimals: 1, suffix: ' M CZK', label: 'de chiffre d’affaires en 2025' }, { value: 50, suffix: '+', label: 'partenariats réciproques' }, { value: 3468, suffix: '+', label: 'palettes vendues en 2025' }, { value: 10, suffix: '+', label: 'pays partenaires en Europe' }], quote: 'Nous nous appuyons sur la confiance, la fiabilité et des relations qui durent plus longtemps qu’une seule transaction.' },
    services: { label: 'Services', title: 'Nos points forts.', items: [['Distribution FMCG', 'Produits de grandes marques mondiales à des prix compétitifs. En volumes importants, avec une livraison fiable.'], ['Sourcing', 'Nous trouvons des produits et des fournisseurs dans le monde entier. En Europe et au-delà — selon votre besoin.'], ['Négoce', 'Nous connectons marques, distributeurs et marchés. Rapidement, clairement et sans administration superflue.']] },
    brands: { label: 'Marques de notre portefeuille' },
    why: { label: 'Pourquoi VOPH Partners', title: 'Un commerce fondé sur les volumes, la réactivité et les relations.', items: [['De meilleurs prix grâce aux volumes', 'Une puissance d’achat visible dans votre marge.'], ['Réponse rapide', 'Votre demande ne reste jamais en attente.'], ['Sourcing international', 'Europe et marchés lointains. Un seul réseau de fournisseurs.'], ['Collaboration simple', 'Un interlocuteur unique. Un minimum d’administration.'], ['Partenariat de long terme', 'Nous ne construisons pas sur des opérations ponctuelles.'], ['Savoir-faire FMCG', 'Nous connaissons les catégories, les marques et les marchés.']] },
    process: { label: 'Notre méthode', title: 'De la demande au partenariat. En quatre étapes.', steps: [['Demande', 'Dites-nous ce que vous recherchez — catégories, marques, volumes.'], ['Offre', 'Nous préparons des prix et disponibilités concrets.'], ['Logistique', 'Nous organisons la livraison. Efficacement et de manière fiable.'], ['Partenariat', 'De la première commande, nous construisons une collaboration durable.']] },
    logistics: { label: 'Logistique', title: 'Une base solide. Des processus efficaces.', body: 'Du fournisseur jusqu’à vous — rapidement, clairement et sans friction. La logistique fait partie de notre travail, ce n’est pas un service additionnel.', chips: ['Efficacité des processus', 'Rapidité', 'Simplicité'], diagram: { left: { title: 'Marques', sub: 'fabricants mondiaux' }, hub: { title: 'VOPH Partners', sub: 'sourcing · négoce · logistique' }, right: { title: 'Marchés', sub: 'grossistes · retail · e-commerce' } } },
    warehouse: { label: 'Entrepôt', title: 'Un soutien logistique qui maintient le commerce en mouvement.', body: 'Pour nos opérations logistiques, nous utilisons un entrepôt du réseau CS Logistics group s.r.o. Retrouvez l’emplacement exact et l’itinéraire dans Maps.', cta: 'Itinéraire' },
    contact: { label: 'Contact', title: 'Travaillons ensemble.', body: 'Contactez-nous. Nous répondons rapidement.', phone: 'Téléphone', email: 'E-mail', meeting: 'Rendez-vous', cta: 'Nous contacter' },
    footer: { tagline: 'Partenaire de long terme pour le négoce et le sourcing FMCG.', navLabel: 'Navigation', contactLabel: 'Contact', address: CONTACT.address, rights: 'Tous droits réservés.' },
  }),
  nl: createDictionary({
    meta: { title: 'VOPH Partners — FMCG-handel & sourcing', description: 'FMCG-handel en sourcing voor de lange termijn. Merken, logistiek en markten in heel Europa.' },
    a11y: { skip: 'Ga naar inhoud', menuOpen: 'Menu openen', menuClose: 'Menu sluiten', langLabel: 'Taal van de website', home: 'VOPH Partners — home', themeToDark: 'Naar donkere modus', themeToLight: 'Naar lichte modus' },
    nav: { links: [['about', 'Over ons'], ['services', 'Diensten'], ['why', 'Waarom VOPH'], ['process', 'Samenwerking'], ['contact', 'Contact']].map(([id, label]) => ({ id, label })), cta: 'Neem contact op' },
    hero: { badge: 'FMCG trading & sourcing', titleLines: ['Uw partner voor', 'FMCG-handel en', 'sourcing op lange termijn'], sub: 'Wereldwijde merken. Concurrerende prijzen. Langdurige partnerships.', support: 'We verbinden merken, logistiek en markten — voor groothandels, retailketens en grote e-commercepartijen.', ctaPrimary: 'Neem contact op', ctaSecondary: 'Meer informatie', chips: ['Sourcing in Europa en daarbuiten', 'Eén aanspreekpunt', 'Snelle reactie'], scroll: 'Scroll naar beneden' },
    about: { label: 'Over ons', title: 'FMCG-handel en sourcing met een langetermijnvisie.', lead: 'VOPH Partners is een op FMCG gerichte handels- en sourcingpartner. We verbinden merken, logistiek en markten in heel Europa — en bouwen langdurige partnerships, geen eenmalige transacties.', body: 'De groep omvat de One-Shop.cz-franchise met 15 winkels, de groothandelswebshop VOPH.cz en de B2C-webshop Loopy.cz.', stats: [{ value: 5.9, decimals: 1, prefix: 'CZK ', suffix: ' mln.', label: 'omzet in 2025' }, { value: 50, suffix: '+', label: 'wederzijdse partnerships' }, { value: 3468, suffix: '+', label: 'verkochte pallets in 2025' }, { value: 10, suffix: '+', label: 'landen van samenwerking in Europa' }], quote: 'We bouwen op vertrouwen, betrouwbaarheid en relaties die langer meegaan dan één transactie.' },
    services: { label: 'Diensten', title: 'Waar we sterk in zijn.', items: [['FMCG-distributie', 'Producten van toonaangevende wereldmerken tegen concurrerende prijzen. In grote volumes, met betrouwbare levering.'], ['Sourcing', 'We vinden producten en leveranciers over de hele wereld. In Europa en daarbuiten — volgens uw aanvraag.'], ['Handel', 'We verbinden merken, distributeurs en markten. Snel, transparant en zonder onnodige administratie.']] },
    brands: { label: 'Merken in onze portfolio' },
    why: { label: 'Waarom VOPH Partners', title: 'Handel gebaseerd op volume, snelheid en relaties.', items: [['Betere prijzen door volume', 'Inkoopkracht die u in uw marge ziet.'], ['Snelle reactie', 'Uw aanvraag blijft nooit liggen.'], ['Internationale sourcing', 'Europa en overzee. Eén leveranciersnetwerk.'], ['Eenvoudige samenwerking', 'Eén aanspreekpunt. Minimale administratie.'], ['Langdurig partnership', 'We bouwen niet op eenmalige transacties.'], ['FMCG-knowhow', 'We kennen de categorieën, merken en markten.']] },
    process: { label: 'Hoe we werken', title: 'Van aanvraag naar partnership. In vier stappen.', steps: [['Aanvraag', 'Vertel ons wat u zoekt — categorieën, merken, volumes.'], ['Offerte', 'We maken concrete prijzen en beschikbaarheid klaar.'], ['Logistiek', 'We regelen de levering. Efficiënt en betrouwbaar.'], ['Partnership', 'Van de eerste bestelling bouwen we aan langdurige samenwerking.']] },
    logistics: { label: 'Logistiek', title: 'Een sterke basis. Efficiënte processen.', body: 'Van leverancier tot aan uw deur — snel, transparant en zonder frictie. Logistiek is onderdeel van ons werk, geen extra service.', chips: ['Procesefficiëntie', 'Snelheid', 'Eenvoud'], diagram: { left: { title: 'Merken', sub: 'wereldwijde fabrikanten' }, hub: { title: 'VOPH Partners', sub: 'sourcing · handel · logistiek' }, right: { title: 'Markten', sub: 'groothandel · retail · e-commerce' } } },
    warehouse: { label: 'Magazijn', title: 'Magazijnondersteuning die handel in beweging houdt.', body: 'Voor logistieke activiteiten gebruiken we een magazijn in het netwerk van CS Logistics group s.r.o. Bekijk de exacte locatie en route in Maps.', cta: 'Navigeren' },
    contact: { label: 'Contact', title: 'Laten we samenwerken.', body: 'Neem contact op. We reageren snel.', phone: 'Telefoon', email: 'E-mail', meeting: 'Afspraak', cta: 'Neem contact op' },
    footer: { tagline: 'Partner voor FMCG-handel en sourcing op lange termijn.', navLabel: 'Navigatie', contactLabel: 'Contact', address: CONTACT.address, rights: 'Alle rechten voorbehouden.' },
  }),
}

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('voph-lang') : null
export const lang = ref(LANGUAGES.some(({ code }) => code === stored) ? stored : 'cs')

export function setLang(next) {
  if (dictionaries[next]) lang.value = next
}

export const t = computed(() => dictionaries[lang.value])

watch(
  lang,
  (value) => {
    if (typeof document === 'undefined') return
    localStorage.setItem('voph-lang', value)
    document.documentElement.lang = value
    document.title = dictionaries[value].meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', dictionaries[value].meta.description)
  },
  { immediate: true },
)
