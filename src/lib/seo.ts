import { SEOData, fetchWordPressSEO } from "@/server/fetches/seo";

import { Metadata } from "next";
import { headers } from "next/headers";
import { supportedLocales } from "@/i18n/config";

type GenerateSEOMetadataParams = {
  locale: string;
  path?: string;
  title?: string;
  description?: string;
  autoDetectPath?: boolean;
  useWordPressSEO?: boolean;
  pageSlug?: string;
};

function stripHtml(html: string): string {
  let text = html.replace(/<[^>]*>/g, " ");

  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-z]+;/gi, " ");

  text = text.replace(/\s+/g, " ").trim();

  if (text.length > 160) {
    text = text.substring(0, 157) + "...";
  }

  return text;
}

export async function generateSEOMetadata({
  locale,
  path = "",
  title = "ASB - American School Bangkok",
  description = "XCL - ASB - American School Bangkok",
  autoDetectPath = false,
  useWordPressSEO = true,
  pageSlug,
}: GenerateSEOMetadataParams): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.asbsk.ac.th";

  let seoData: SEOData | null = null;

  if (useWordPressSEO && pageSlug) {
    seoData = await fetchWordPressSEO(pageSlug, locale);
  }

  const finalTitle = seoData?.title || title;
  const finalDescription = seoData?.description || description;
  const cleanDescription = stripHtml(finalDescription);

  let normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  if (autoDetectPath && !path) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}/?`), "");
    normalizedPath = pathWithoutLocale;
  }

  const canonicalUrl =
    seoData?.canonical || (normalizedPath ? `${baseUrl}/${locale}/${normalizedPath}` : `${baseUrl}/${locale}`);

  const languages: Record<string, string> = {};
  supportedLocales.forEach((loc) => {
    const altUrl = normalizedPath ? `${baseUrl}/${loc}/${normalizedPath}` : `${baseUrl}/${loc}`;
    languages[loc] = altUrl;
  });

  languages["x-default"] = normalizedPath ? `${baseUrl}/en/${normalizedPath}` : `${baseUrl}/en`;

  const metadata: Metadata = {
    title: finalTitle,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: seoData?.robots
      ? {
          index: seoData.robots.index,
          follow: seoData.robots.follow,
          "max-snippet": seoData.robots["max-snippet"] === "large" ? -1 : undefined,
          "max-image-preview": seoData.robots["max-image-preview"] === "large" ? "large" : undefined,
          "max-video-preview": seoData.robots["max-video-preview"] === "large" ? -1 : undefined,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: seoData?.openGraph || {
      title: finalTitle,
      description: cleanDescription,
      url: canonicalUrl,
      siteName: "American School Bangkok",
      locale,
      type: "website",
    },
  };
  if (seoData?.keywords) {
    metadata.keywords = seoData.keywords;
  }
  if (seoData?.twitter) {
    if (seoData.twitter.card === "summary") {
      metadata.twitter = { card: "summary" };
    } else if (seoData.twitter.card === "summary_large_image") {
      metadata.twitter = { card: "summary_large_image" };
    }
  }

  return metadata;
}