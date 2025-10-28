const CACHE_NAME = 'neurohack-cache';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
