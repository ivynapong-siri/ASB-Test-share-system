import { generateCacheKey, getCachedData, setCachedData } from "./cache";

import { cache as reactCache } from "react";

export const defaultFetchOptions = {
  next: {
    tags: ["wordpress"],
    revalidate: 3600, // 1 hour
    cache: "force-cache", // Use cache for 1 hour
  },
  headers: {
    "User-Agent": "Next.js WordPress Client",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

// ตัวอย่างการดึงค่าที่ปลอดภัยขึ้น
const WordPressBaseUrl = process.env.WORDPRESS_API_URL;

if (!WordPressBaseUrl) {
  throw new Error("Missing WORDPRESS_API_URL environment variable");
}
const WordPressCustomUrl = process.env.WORDPRESS_CUSTOM_URL
  ? process.env.WORDPRESS_CUSTOM_URL
  : "https://dcb9450325.nxcli.io/wp-json/custom/v1";

const _fetchWordPressAPI = reactCache(async <T>(endpoint: string, next?: NextFetchRequestConfig): Promise<T> => {
  const cacheKey = generateCacheKey(endpoint, next);
  const cachedData = getCachedData<T>(cacheKey);

  if (cachedData) {
    return cachedData;
  }
  const requestUrl = `${WordPressBaseUrl}/${endpoint}`;
  const response = await fetch(requestUrl, { ...defaultFetchOptions, ...next });
  if (!response.ok) {
    throw new WordPressAPIError(`WordPress API request failed: ${response.statusText}`, response.status, requestUrl);
  }
  const data = await response.json();
  setCachedData(cacheKey, data);
  return data;
});

export async function fetchWordPressAPI<T>(endpoint: string, next?: NextFetchRequestConfig): Promise<T> {
  return _fetchWordPressAPI<T>(endpoint, next);
}

const _fetchWordPressCustomAPI = reactCache(async <T>(endpoint: string, next?: NextFetchRequestConfig): Promise<T> => {
  const cacheKey = generateCacheKey(`custom:${endpoint}`, next);
  const cachedData = getCachedData<T>(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  const requestUrl = `${WordPressCustomUrl}/${endpoint}`;
  const response = await fetch(requestUrl, { ...defaultFetchOptions, ...next });
  if (!response.ok) {
    throw new WordPressAPIError(`WordPress API request failed: ${response.statusText}`, response.status, requestUrl);
  }
  const data = await response.json();
  setCachedData(cacheKey, data);
  return data;
});

export async function fetchWordPressCustomAPI<T>(endpoint: string, next?: NextFetchRequestConfig): Promise<T> {
  return _fetchWordPressCustomAPI<T>(endpoint, next);
}

export function optimizeVideoUrl(videoUrl: string): string {
  if (!videoUrl) return videoUrl;
  try {
    const url = new URL(videoUrl);
    url.searchParams.set("cache", "max-age");
    return url.toString();
  } catch (error) {
    console.warn("Invalid video URL:", videoUrl);
    return videoUrl;
  }
}

export function prefetchVideo(videoUrl: string): void {
  if (typeof window === "undefined" || !videoUrl) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "video";
  link.href = videoUrl;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
  console.log("🎬 Prefetching video:", videoUrl);
}
