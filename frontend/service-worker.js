const CACHE_NAME = "travel-diary-v4";

// pliki statyczne
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",

  // skrypty
  "./js/app.js",
  "./js/state.js",
  "./js/ui.js",
  "./js/entries.js",
  "./js/details.js",
  "./js/gallery.js",
  "./js/camera.js",
  "./js/location.js",

  // ikony pwa
  "./images/icon-192.png",
  "./images/icon-512.png"
];

// instalacja
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); 
});

// akywacja i usuniecie starego cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// fetch
self.addEventListener("fetch", event => {
  const request = event.request;

  // nie cachuje poza https
  if (!request.url.startsWith("http")) return;

  // pliki statyczne - cahce first
  if (ASSETS.some(asset => request.url.includes(asset.replace("./", "")))) {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request);
      })
    );
    return;
  }

  // zdjecia- cache first
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;

        return fetch(request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // reszta - network first
  event.respondWith(
    fetch(request)
      .then(response => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, cloned));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
