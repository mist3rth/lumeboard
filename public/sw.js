const CACHE_NAME = 'lumeboard-cache-v1';

// Assets to precache immediately on install
const PRECACHE_ASSETS = [
  '/lumeboard/',
  '/lumeboard/index.html',
];

// Installation: precache shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activation: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Helper to handle Range Requests for video/audio assets from the Cache API
async function handleRangeRequest(request, cacheResponse) {
  try {
    const rangeHeader = request.headers.get('range');
    if (!rangeHeader) return cacheResponse;

    const blob = await cacheResponse.blob();
    const total = blob.size;
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : total - 1;

    // Validate ranges
    if (start >= total || end >= total) {
      return new Response('', {
        status: 416,
        statusText: 'Range Not Satisfiable',
        headers: { 'Content-Range': `bytes */${total}` }
      });
    }

    const chunk = blob.slice(start, end + 1);
    const responseHeaders = new Headers(cacheResponse.headers);
    responseHeaders.set('Content-Range', `bytes ${start}-${end}/${total}`);
    responseHeaders.set('Accept-Ranges', 'bytes');
    responseHeaders.set('Content-Length', chunk.size.toString());

    return new Response(chunk, {
      status: 206,
      statusText: 'Partial Content',
      headers: responseHeaders
    });
  } catch (error) {
    return fetch(request);
  }
}

// Fetch interception and caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin or specific static CDN assets
  if (url.origin !== self.location.origin) {
    return;
  }

  // Determine the asset type
  const isMedia = url.pathname.endsWith('.webm') || 
                  url.pathname.endsWith('.mp4') || 
                  url.pathname.endsWith('.mp3') || 
                  url.pathname.endsWith('.webp') || 
                  url.pathname.endsWith('.png') || 
                  url.pathname.endsWith('.jpg') || 
                  url.pathname.endsWith('.svg');

  const isFont = url.pathname.endsWith('.ttf') || 
                 url.pathname.endsWith('.woff') || 
                 url.pathname.endsWith('.woff2');

  // Strategy 1: Cache-First for Fonts and Media (Videos, Audio, Images)
  if (isFont || isMedia) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Check if range request is needed
            if (request.headers.has('range')) {
              return handleRangeRequest(request, cachedResponse);
            }
            return cachedResponse;
          }

          // If not cached, fetch and add to cache
          return fetch(request).then((networkResponse) => {
            // Only cache successful requests
            if (networkResponse.status === 200 || networkResponse.status === 206) {
              // We need a cloned response to store in cache
              const responseToCache = networkResponse.clone();
              // Cache 200 responses for range requests compatibility
              if (networkResponse.status === 200) {
                cache.put(request, responseToCache);
              }
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Strategy 2: Stale-While-Revalidate for JS, CSS, and other page assets
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Fallback if network fails
          return cachedResponse;
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
