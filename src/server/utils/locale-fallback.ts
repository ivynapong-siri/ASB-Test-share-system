/**
 * Locale Fallback Utility
 * Handles fetching content with fallback to default locale (en) if content doesn't exist
 */

/**
 * Fetch data with automatic fallback to English if locale-specific content doesn't exist
 * This ensures all hreflang URLs return 200 status instead of 404
 */
export async function fetchWithLocaleFallback<T>(
  fetchFn: (params: any) => Promise<T>,
  params: { locale: string; [key: string]: any }
): Promise<T> {
  try {
    // Try to fetch with requested locale
    const data = await fetchFn(params);
    return data;
  } catch (error) {
    // If fetch fails and locale is not English, try English fallback
    if (params.locale !== "en") {
      console.warn(
        `Content not found for locale '${params.locale}', falling back to 'en'`,
        error instanceof Error ? error.message : error
      );
      try {
        const fallbackData = await fetchFn({ ...params, locale: "en" });
        return fallbackData;
      } catch (fallbackError) {
        // If even English fails, throw the original error
        throw error;
      }
    }
    // If already English or fallback failed, throw original error
    throw error;
  }
}
