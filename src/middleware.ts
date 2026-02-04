import { NextRequest, NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const isDev = process.env.NODE_ENV === "development";

export default async function middleware(request: NextRequest) {
  return handleMiddleware(request);
}

async function handleMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api")) {
    return NextResponse.next();
  }

  // Let next-intl handle root path - it will add locale prefix
  // Then redirect /{locale} to /{locale}/home below

  // Handle locale-less URLs (e.g., from JOTFORM)
  const supportedLocales = routing.locales;
  const hasLocalePrefix = supportedLocales.some((loc) => path.startsWith(`/${loc}`));

  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone();

    // Check if locale cookie exists (set by next-intl)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Otherwise, detect from browser Accept-Language
    const acceptLang = request.headers.get("accept-language")?.split(",")[0] || "en";
    const browserLocale =
      supportedLocales.find((loc) => acceptLang.toLowerCase().includes(loc)) || routing.defaultLocale || "en";

    const locale = cookieLocale || browserLocale;

    // Redirect to locale-prefixed URL
    url.pathname = `/${locale}${path}`;
    return NextResponse.redirect(url, 302);
  }

  // Redirect old ID-based news URLs to slug-based URLs
  // Pattern: /[locale]/our-community/news/detail/[numeric-id]
  const newsIdPattern = /^\/([^/]+)\/our-community\/news\/detail\/(\d+)$/;
  const newsIdMatch = path.match(newsIdPattern);

  if (newsIdMatch) {
    const [, locale, newsId] = newsIdMatch;

    try {
      // Fetch news data to get the slug
      const WordPressBaseUrl = process.env.WORDPRESS_URL || "https://dcb9450325.nxcli.io/wp-json/wp/v2";
      const response = await fetch(`${WordPressBaseUrl}/news/${newsId}`);

      if (response.ok) {
        const data = await response.json();
        if (data.slug) {
          const url = request.nextUrl.clone();
          url.pathname = `/${locale}/our-community/news/detail/${data.slug}`;
          return NextResponse.redirect(url, 301);
        }
      }
    } catch (error) {
      console.error("Error redirecting ID-based URL:", error);
    }
  }

  // Redirect old ID-based co-curricular URLs to slug-based URLs
  const coCurricularIdPattern = /^\/([^/]+)\/co-curricular-life\/all-detail\/(\d+)$/;
  const coCurricularIdMatch = path.match(coCurricularIdPattern);

  if (coCurricularIdMatch) {
    const [, locale, newsId] = coCurricularIdMatch;

    try {
      const WordPressBaseUrl = process.env.WORDPRESS_URL || "https://dcb9450325.nxcli.io/wp-json/wp/v2";
      const response = await fetch(`${WordPressBaseUrl}/news/${newsId}`);

      if (response.ok) {
        const data = await response.json();
        if (data.slug) {
          const url = request.nextUrl.clone();
          url.pathname = `/${locale}/co-curricular-life/all-detail/${data.slug}`;
          return NextResponse.redirect(url, 301);
        }
      }
    } catch (error) {
      console.error("Error redirecting ID-based URL:", error);
    }
  }

  const handleI18nRouting = createMiddleware(routing);
  const response = await handleI18nRouting(request);

  // Convert 307 temporary redirects to 301 permanent redirects for SEO
  if (response.status === 307 && response.headers.get("location")) {
    const location = response.headers.get("location")!;
    return NextResponse.redirect(location, 301);
  }

  // After i18n routing, redirect /{locale} to /{locale}/home in production
  if (!isDev) {
    const finalPath = response.headers.get("x-middleware-rewrite") || request.nextUrl.pathname;
    const localeOnlyPattern = /^\/([^/]+)$/;
    const localeOnlyMatch = finalPath.match(localeOnlyPattern);

    if (localeOnlyMatch && routing.locales.includes(localeOnlyMatch[1] as any)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeOnlyMatch[1]}/home`;
      return NextResponse.redirect(url, 301);
    }
  }

  return response;
}

export const config = { matcher: ["/((?!api/auth|__nextjs_original-stack-frame|_next|_vercel|.*\\..*).*)"] };
