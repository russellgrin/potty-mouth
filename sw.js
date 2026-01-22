const CACHE_NAME = 'potty-mouth-v2';
const urlsToCache = [
  './',
  './index.html',
  './words.json',
  './manifest.json',
  './sounds/fart1.mp3',
  './sounds/fart2.mp3',
  './sounds/fart3.mp3',
  './sounds/burp1.mp3',
  './sounds/burp2.mp3',
  './sounds/burp3.mp3',
  './sounds/ding.mp3',
  './sounds/bell.mp3',
  './sounds/slot_machine.mp3',
  './sounds/crowd_cheer.mp3',
  './sounds/applause.mp3'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
