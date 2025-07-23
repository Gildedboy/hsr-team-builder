const STATIC_CACHE = 'static-cache-v2';
const DYNAMIC_CACHE = 'dynamic-cache-v2';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  // Don't cache directories, only actual files
  // We'll cache images dynamically when they're requested
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache static assets for 1 year
  STATIC: { maxAge: 365 * 24 * 60 * 60 * 1000 },
  // Cache images for 30 days  
  IMAGES: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  // Cache API responses for 1 hour
  API: { maxAge: 60 * 60 * 1000 }
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets...');
        // Only cache actual files that exist
        return cache.addAll(STATIC_ASSETS).catch(error => {
          console.warn('Some static assets failed to cache:', error);
          // Continue even if some assets fail to cache
          return Promise.resolve();
        });
      })
      .catch(error => {
        console.error('Failed to open static cache:', error);
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        console.log('Cleaning up old caches...');
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .catch(error => {
        console.error('Failed to clean up caches:', error);
        return Promise.resolve();
      })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;

  // Handle images with long-term caching
  if (request.url.includes('/images/')) {
    event.respondWith(handleImageCache(request));
  }
  // Handle JS/CSS assets
  else if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleStaticAssets(request));
  }
  // Handle HTML pages
  else if (request.destination === 'document') {
    event.respondWith(handleDocumentCache(request));
  }
  // Handle other requests
  else {
    event.respondWith(handleDynamicCache(request));
  }
});

// Image caching strategy - Cache First
async function handleImageCache(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      // Check if cache is still valid
      const dateHeader = cached.headers.get('date');
      if (dateHeader) {
        const cachedDate = new Date(dateHeader);
        const now = new Date();
        const age = now.getTime() - cachedDate.getTime();
        
        if (age < CACHE_STRATEGIES.IMAGES.maxAge) {
          return cached;
        }
      } else {
        // If no date header, assume cache is valid for a short time
        return cached;
      }
    }
    
    const response = await fetch(request);
    if (response.ok) {
      // Only cache successful responses
      const responseClone = response.clone();
      try {
        await cache.put(request, responseClone);
      } catch (cacheError) {
        console.warn('Failed to cache image:', request.url, cacheError);
      }
      return response;
    }
    return response;
  } catch (error) {
    console.warn('Image cache error:', error);
    // Return cached version if available
    try {
      const cache = await caches.open(DYNAMIC_CACHE);
      const cached = await cache.match(request);
      return cached || fetch(request);
    } catch {
      return new Response('Image not available', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
}// Static assets strategy - Cache First with long expiry
async function handleStaticAssets(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.ok) {
      try {
        await cache.put(request, response.clone());
      } catch (cacheError) {
        console.warn('Failed to cache static asset:', request.url, cacheError);
      }
    }
    return response;
  } catch (error) {
    console.warn('Static asset error:', error);
    try {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      return cached || fetch(request);
    } catch {
      return new Response('Asset not available', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
}

// Document caching strategy - Network First
async function handleDocumentCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      try {
        const cache = await caches.open(DYNAMIC_CACHE);
        await cache.put(request, response.clone());
      } catch (cacheError) {
        console.warn('Failed to cache document:', request.url, cacheError);
      }
    }
    return response;
  } catch (error) {
    console.warn('Document cache error:', error);
    try {
      const cache = await caches.open(DYNAMIC_CACHE);
      const cached = await cache.match(request);
      return cached || new Response('Page not available offline', { 
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    } catch {
      return new Response('Page not available offline', { 
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }
}

// Dynamic content strategy - Network First with fallback
async function handleDynamicCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      try {
        const cache = await caches.open(DYNAMIC_CACHE);
        await cache.put(request, response.clone());
      } catch (cacheError) {
        console.warn('Failed to cache dynamic content:', request.url, cacheError);
      }
    }
    return response;
  } catch (error) {
    console.warn('Dynamic cache error:', error);
    try {
      const cache = await caches.open(DYNAMIC_CACHE);
      const cached = await cache.match(request);
      return cached || new Response('Content not available', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    } catch {
      return new Response('Content not available', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
}