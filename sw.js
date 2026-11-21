/* Tennisplanlægger: gemmer appen på enheden, så den virker uden net.
   Ret VERSION, når du lægger en ny udgave af appen op, så telefonerne henter den.
   Øvelser fra Google Sheets hentes af appen selv og kræver ikke ny VERSION. */
const VERSION = 'tennisplanlaegger-v16';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './fonts/barlow-latin-400-normal.woff2',
  './fonts/barlow-latin-500-normal.woff2',
  './fonts/barlow-latin-600-normal.woff2',
  './fonts/barlow-latin-700-normal.woff2',
  './fonts/barlow-condensed-latin-500-normal.woff2',
  './fonts/barlow-condensed-latin-600-normal.woff2',
  './fonts/barlow-condensed-latin-700-normal.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req, key) {
  return fetch(req)
    .then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(key || req, copy)); }
      return res;
    })
    .catch(() => caches.match(key || req, { ignoreSearch: true }));
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // fx Google Sheets: håndteres af appen selv

  // Sider samt config.json og ovelser.csv: prøv nettet først, ellers den gemte kopi.
  if (req.mode === 'navigate') { event.respondWith(networkFirst(req, './index.html')); return; }
  if (/\/(config\.json|ovelser\.csv)$/.test(url.pathname)) { event.respondWith(networkFirst(req)); return; }

  // Øvrige filer: brug den gemte kopi, ellers hent og gem.
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
