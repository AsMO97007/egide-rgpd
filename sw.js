/* Égide : fonctionnement hors connexion.
   L'application elle-même est mise en cache ; vos données ne passent jamais par ici
   (elles restent dans le navigateur et dans votre fichier egide-donnees.json). */
const VERSION = "egide-2026-11-13e";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "favicon-32.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, {cache: "reload"})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // Réseau d'abord : vous recevez toujours la dernière version publiée, le cache sert hors connexion.
    // « no-cache » : on redemande toujours au serveur s'il y a une nouvelle version (GitHub garde sinon 10 minutes l'ancienne).
    const fresh = req.mode === "navigate" ? fetch(req.url, {cache: "no-cache", credentials: "same-origin"}) : fetch(req, {cache: "no-cache"});
    e.respondWith(fresh.then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  // Bibliothèques et polices (jsDelivr, Google Fonts) : cache d'abord.
  if (/(^|\.)jsdelivr\.net$|fonts\.(googleapis|gstatic)\.com$|cdnjs\.cloudflare\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })));
  }
});
