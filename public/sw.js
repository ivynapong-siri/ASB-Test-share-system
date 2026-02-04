// Service Worker for caching videos and images
// v3: Added proper error handling for illegal paths
// Cache strategy: 1 hour with revalidation
const CACHE_NAME = "asb-media-cache-v3";
const VIDEO_CACHE_NAME = "asb-video-cache-v3";
const IMAGE_CACHE_NAME = "asb-image-cache-v3";

// Development mode detection
const IS_DEV = self.location.hostname === "localhost" || self.location.hostname === "127.0.0.1";

// Cache size limits
const MAX_VIDEO_CACHE_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_IMAGE_CACHE_SIZE = 50 * 1024 * 1024; // 50MB

// Cache duration (1 hour)
const CACHE_MAX_AGE = 3600 * 1000; // 1 hour in milliseconds

// Helper function to check if cache is expired
function isCacheExpired(cachedResponse) {
  const cachedTime = cachedResponse.headers.get("sw-cache-time");
  if (!cachedTime) return true;

  const age = Date.now() - parseInt(cachedTime, 10);
  return age > CACHE_MAX_AGE;
}

// Helper function to add cache timestamp to response
function addCacheTimestamp(response) {
  const headers = new Headers(response.headers);
  headers.set("sw-cache-time", Date.now().toString());

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

// Install event - setup cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([caches.open(VIDEO_CACHE_NAME), caches.open(IMAGE_CACHE_NAME), caches.open(CACHE_NAME)]).then(() => {
      self.skipWaiting();
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  if (IS_DEV) console.log("Service Worker v3: Activating and cleaning up old caches");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete ALL old caches (including v1)
            if (cacheName !== CACHE_NAME && cacheName !== VIDEO_CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
              if (IS_DEV) console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        if (IS_DEV) console.log("Service Worker v3: Claiming clients");
        return self.clients.claim();
      })
  );
});

// Fetch event - handle caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip invalid requests
  if (!request.url || request.url.startsWith("chrome-extension://") || request.url.startsWith("moz-extension://")) {
    return;
  }

  try {
    const url = new URL(request.url);

    // Skip non-http(s) protocols
    if (!url.protocol.startsWith("http")) {
      return;
    }
  } catch (error) {
    console.error("Invalid URL in fetch event:", request.url);
    return;
  }

  // Video caching strategy with 1-hour expiration
  if (request.url.match(/\.(mp4|webm|ogg)$/)) {
    event.respondWith(
      caches
        .open(VIDEO_CACHE_NAME)
        .then((cache) => {
          return cache.match(request).then((cachedResponse) => {
            // Check if cache exists and is not expired
            if (cachedResponse && !isCacheExpired(cachedResponse)) {
              if (IS_DEV) console.log("✅ Video served from cache (fresh):", request.url);
              return cachedResponse;
            }

            // Cache expired or doesn't exist - fetch new
            if (cachedResponse && IS_DEV) {
              console.log("⏰ Video cache expired, fetching new:", request.url);
            }

            return fetch(request)
              .then((networkResponse) => {
                // Only cache successful responses
                if (networkResponse && networkResponse.ok) {
                  try {
                    // Add timestamp and cache the response
                    const responseToCache = addCacheTimestamp(networkResponse.clone());
                    cache.put(request, responseToCache);
                    if (IS_DEV) console.log("💾 Video cached (1 hour):", request.url);
                  } catch (error) {
                    if (IS_DEV) console.warn("Failed to cache video:", error);
                  }
                }
                return networkResponse;
              })
              .catch((error) => {
                if (IS_DEV) console.error("Video fetch failed:", error);
                // Return stale cache if available, better than nothing
                if (cachedResponse) {
                  if (IS_DEV) console.log("🔄 Using stale video cache (network failed):", request.url);
                  return cachedResponse;
                }
                // Return a basic response instead of throwing
                return new Response("Video not available", { status: 503 });
              });
          });
        })
        .catch((error) => {
          if (IS_DEV) console.error("Cache operation failed:", error);
          return fetch(request);
        })
    );
    return;
  }

  // Image caching strategy with 1-hour expiration
  if (request.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/) || request.url.includes("/_next/image")) {
    event.respondWith(
      caches
        .open(IMAGE_CACHE_NAME)
        .then((cache) => {
          return cache.match(request).then((cachedResponse) => {
            // Check if cache exists and is not expired
            if (cachedResponse && !isCacheExpired(cachedResponse)) {
              if (IS_DEV) console.log("✅ Image served from cache (fresh):", request.url);
              return cachedResponse;
            }

            // Cache expired or doesn't exist - fetch new
            if (cachedResponse && IS_DEV) {
              console.log("⏰ Image cache expired, fetching new:", request.url);
            }

            return fetch(request)
              .then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                  try {
                    // Add timestamp and cache the response
                    const responseToCache = addCacheTimestamp(networkResponse.clone());
                    cache.put(request, responseToCache);
                    if (IS_DEV) console.log("💾 Image cached (1 hour):", request.url);
                  } catch (error) {
                    if (IS_DEV) console.warn("Failed to cache image:", error);
                  }
                }
                return networkResponse;
              })
              .catch((error) => {
                if (IS_DEV) console.error("Image fetch failed:", error);
                // Return stale cache if available
                if (cachedResponse) {
                  if (IS_DEV) console.log("🔄 Using stale image cache (network failed):", request.url);
                  return cachedResponse;
                }
                // Return a placeholder or basic response
                return new Response("Image not available", { status: 503 });
              });
          });
        })
        .catch((error) => {
          if (IS_DEV) console.error("Cache operation failed:", error);
          return fetch(request);
        })
    );
    return;
  }

  // Default: network first, fallback to cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Helper function to check cache size and cleanup if needed
async function cleanupCache(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  let totalSize = 0;
  const sizes = await Promise.all(
    keys.map(async (key) => {
      const response = await cache.match(key);
      const blob = await response.blob();
      return { key, size: blob.size };
    })
  );

  // Sort by size (largest first)
  sizes.sort((a, b) => b.size - a.size);

  // Calculate total size
  totalSize = sizes.reduce((acc, item) => acc + item.size, 0);

  // Remove items if over limit
  if (totalSize > maxSize) {
    let currentSize = totalSize;
    for (const item of sizes) {
      if (currentSize <= maxSize) break;
      await cache.delete(item.key);
      currentSize -= item.size;
      if (IS_DEV) console.log("Removed from cache:", item.key.url);
    }
  }
}

// Periodic cleanup
self.addEventListener("message", (event) => {
  if (event.data.action === "CLEANUP_CACHE") {
    event.waitUntil(
      Promise.all([
        cleanupCache(VIDEO_CACHE_NAME, MAX_VIDEO_CACHE_SIZE),
        cleanupCache(IMAGE_CACHE_NAME, MAX_IMAGE_CACHE_SIZE),
      ])
    );
  }
});
