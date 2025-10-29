const CACHE_NAME = 'neurohack-cache';

console.log('🔧 Service Worker carregando...');

self.addEventListener('install', e => {
  console.log('✅ Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('🚀 Service Worker ativado');
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  console.log('📡 Fetch interceptado:', event.request.url);
  event.respondWith(
    fetch(event.request).catch(() => {
      console.log('📦 Servindo do cache:', event.request.url);
      return caches.match(event.request);
    })
  );
});

console.log('✅ Service Worker carregado');
