const CACHE_NAME = 'sj-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/home.html',
    '/profile.html',
    '/css/output.css',
    '/js/alpine.js',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache:', CACHE_NAME);
            return cache.addAll(urlsToCache);
        }).catch(error => {
            console.error('Failed to cache resources during service worker installation:', error);
        }
    ));
});

self.addEventListener('fetch', (e) => { 
    console.log(e.request.url)
    e.respondWith(
        caches.match(e.request).then(response => {
            console.log('Fetching resource:', e.request.url);
            return response || fetch(e.request)
        })
    )
});

// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(CACHE_NAME);

//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if (!cacheWhitelist.includes(cacheName)) {
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))

//     )
// });
