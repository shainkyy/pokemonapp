const CACHE_NAME = "pokemon-types-cache-v1";
const URLS_TO_CACHE = ["https://pokeapi.co/api/v2/type"];

// Install the service worker and cache the Pokémon types API
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Intercept network requests and serve from cache if available
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("https://pokeapi.co/api/v2/type")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // Return the cached data if present
          console.log("Serving from cache:", event.request.url);
          return response;
        }

        // Otherwise, fetch from the network and cache the response
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});
