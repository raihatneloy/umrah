/* Umrah Companion — offline service worker.
   Cache-first: once installed, the app never needs the network again.
   Bump CACHE when the bundle changes; skipWaiting makes the new copy take over on the next launch. */
const CACHE = "umrah-v1.13.0";
const ASSETS = [
  "./", "./index.html", "./app.js", "./data.js", "./manifest.webmanifest",
  "./fonts/amiri.woff2", "./fonts/poppins-r.woff2", "./fonts/poppins-sb.woff2", "./fonts/poppins-b.woff2", "./fonts/bengali.woff2", "./vendor/pdf.min.js", "./vendor/pdf.worker.min.js",
  "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(a => c.add(new Request(a, { cache: "reload" })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          // never touch cross-origin
  if (url.pathname.endsWith("/version.json")) {         // always ask the server
    e.respondWith(fetch(req).catch(() => new Response('{"version":null}', { headers: { "Content-Type": "application/json" } })));
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});

/* a tap on a notification (not used yet) must still open the app */
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.openWindow("./"));
});
