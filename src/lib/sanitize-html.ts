/**
 * Sanitizes HTML content by removing meta tags, title tags, and other head-only elements
 * that should not appear in the body of the document.
 *
 * This prevents SEO issues caused by meta/title tags appearing outside of the <head> element.
 *
 * @param html The HTML content to sanitize
 * @returns The sanitized HTML content
 */
export function sanitizeHtmlContent(html: string): string {
  if (!html) return "";

  let sanitized = html;

  // Remove <title> tags and their content
  sanitized = sanitized.replace(/<title[^>]*>.*?<\/title>/gi, "");

  // Remove all <meta> tags (self-closing and with closing tags)
  sanitized = sanitized.replace(/<meta[^>]*\/?>/gi, "");

  // Remove <head> tags and their content
  sanitized = sanitized.replace(/<head[^>]*>.*?<\/head>/gis, "");

  // Remove other head-only elements that might appear
  sanitized = sanitized.replace(/<link[^>]*\/?>/gi, "");
  sanitized = sanitized.replace(/<style[^>]*>.*?<\/style>/gis, "");
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gis, "");
  sanitized = sanitized.replace(/<base[^>]*\/?>/gi, "");

  // Remove any duplicate whitespace that might have been introduced
  sanitized = sanitized.replace(/\s{2,}/g, " ").trim();

  return sanitized;
}
