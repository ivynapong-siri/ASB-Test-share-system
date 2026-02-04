import { LRUCache } from "lru-cache";

// LRU Cache for WordPress API responses
// Max 500 items, 1-hour TTL
const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour in milliseconds
  allowStale: true, // Allow stale data during revalidation
  updateAgeOnGet: false,
  updateAgeOnHas: false,
});

const isDev = process.env.NODE_ENV === "development";
const disableCache = true; // TODO: Delete before launch product

cache.clear(); // TODO: Delete before launch product
console.log("🧹 Cache cleared on startup"); // TODO: Delete before launch product

/**
 * Generate cache key from endpoint and params
 */
export function generateCacheKey(endpoint: string, params?: Record<string, any>): string {
  const paramsString = params ? JSON.stringify(params) : "";
  return `${endpoint}:${paramsString}`;
}

/**
 * Get cached data
 */
export function getCachedData<T>(key: string): T | undefined {
  if (disableCache) {
    console.log("Disable cache now");
    return undefined;
  } // TODO: Delete before launch product
  const cached = cache.get(key);
  if (cached && isDev) {
    console.log(`✅ Cache HIT: ${key}`);
  } else if (isDev) {
    console.log(`❌ Cache MISS: ${key}`);
  }
  return cached;
}

/**
 * Set data in cache
 */
export function setCachedData<T>(key: string, data: T): void {
  if (disableCache) return undefined; // TODO: Delete before launch product
  cache.set(key, data);
  if (isDev) {
    console.log(`💾 Cache SET: ${key}`);
  }
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(key: string): void {
  cache.delete(key);
  if (isDev) {
    console.log(`🗑️ Cache CLEARED: ${key}`);
  }
}

/**
 * Clear all cache entries
 */
export function clearAllCache(): void {
  cache.clear();
  if (isDev) {
    console.log("🗑️ All cache CLEARED");
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: cache.size,
    maxSize: cache.max,
    keys: Array.from(cache.keys()),
  };
}

export default cache;
