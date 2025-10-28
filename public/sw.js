const CACHE_NAME = 'neurohack-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icons/nh-icon-192x192.png',
  '/icons/nh-icon-512x512.png',
  '/icons/nh-icon-192x192-maskable.png',
  '/icons/nh-icon-512x512-maskable.png',
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Cache aberto');
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.error('❌ Erro ao instalar SW:', error);
    })
  );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker ativado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Retornar do cache se encontrado
      if (response) {
        console.log('📦 Servindo do cache:', event.request.url);
        return response;
      }
      
      // Buscar da rede
      return fetch(event.request).then(response => {
        // Verificar se é uma resposta válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clonar a resposta
        const responseToCache = response.clone();
        
        // Adicionar ao cache
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      }).catch(() => {
        // Retornar página offline se disponível
        if (event.request.destination === 'document') {
          return caches.match('/offline.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Mensagem para atualização
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('✅ Service Worker carregado');
