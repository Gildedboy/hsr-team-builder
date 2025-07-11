const CACHE_NAME = 'hsr-team-builder-v1';
const STATIC_ASSETS = [
  '/images/element/',
  '/images/path/',
  '/images/avatar/'
];

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/images/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});