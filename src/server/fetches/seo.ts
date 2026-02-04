import { WordPressPage, WordPressYoastSEO } from "@/server/types/wordpress-type";

const WORDPRESS_API_BASE = process.env.WORDPRESS_URL;
const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;
const CANONICAL_URL = process.env.CANONICAL_URL;

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  robots: {
    index: boolean;
    follow: boolean;
    "max-snippet": "none" | "standard" | "large";
    "max-image-preview": "none" | "standard" | "large";
    "max-video-preview": "none" | "standard" | "large";
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    type: string;
    image?: string;
  };
  twitter: {
    card: "summary" | "summary_large_image" | "app" | "player";
    title?: string;
    description?: string;
  };
  schema?: any;
}

/**
 * Fetch SEO data from WordPress for a specific page
 */
export async function fetchWordPressSEO(slug: string, locale: string): Promise<SEOData | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_BASE}/pages?slug=${slug}-${locale}&acf_format=standard&lang=${locale}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch SEO data for slug: ${slug}`);
      return null;
    }

    const pages: WordPressPage[] = await response.json();
    if (!pages || pages.length === 0) {
      console.warn(`No page found for slug: ${slug}`);
      return null;
    }

    const page = pages[0];
    const yoastData = page.yoast_head_json;

    if (!yoastData) {
      console.warn(`No Yoast SEO data found for page: ${slug}`);
      return null;
    }

    return transformYoastToSEO(yoastData, page, locale);
  } catch (error) {
    console.error(`Error fetching SEO data for ${slug}:`, error);
    return null;
  }
}

/**
 * Transform Yoast SEO data to our SEO format
 */
function transformYoastToSEO(yoast: WordPressYoastSEO, page: WordPressPage, locale: string): SEOData {
  const description =
    yoast.description ||
    extractDescriptionFromSchema(yoast.schema) ||
    `Learn more about ${page.title.rendered} at American School Bangkok`;
  const keywords =
    extractKeywordsFromSchema(yoast) || "American School Bangkok, International School, Education, Bangkok";

  const canonical = yoast.canonical
    ? (() => {
        const path = yoast.canonical.replace(WORDPRESS_BASE_URL, "");
        const cleanedPath = path.replace(/^\/+/, "");
        return `${CANONICAL_URL}/${locale}/${cleanedPath}`;
      })()
    : `${CANONICAL_URL}/${locale}/${page.slug}`;

  return {
    title: yoast.title,
    description,
    keywords,
    canonical,
    robots: {
      index: yoast.robots.index === "index",
      follow: yoast.robots.follow === "follow",
      "max-snippet": parseRobotsValue(yoast.robots["max-snippet"]),
      "max-image-preview": parseRobotsValue(yoast.robots["max-image-preview"]),
      "max-video-preview": parseRobotsValue(yoast.robots["max-video-preview"]),
    },
    openGraph: {
      title: yoast.og_title,
      description: yoast.og_description || description,
      url: yoast.og_url,
      siteName: yoast.og_site_name,
      locale: yoast.og_locale,
      type: yoast.og_type,
      image: yoast.og_image,
    },
    twitter: {
      card: yoast.twitter_card as "summary" | "summary_large_image" | "app" | "player",
      title: yoast.twitter_title,
      description: yoast.twitter_description,
    },
    schema: yoast.schema,
  };
}

/**
 * Parse robots directive values to our format
 */
function parseRobotsValue(value: string): "none" | "standard" | "large" {
  if (value.includes(":")) {
    const directive = value.split(":")[1];
    if (directive === "-1") return "large";
    if (directive === "0") return "none";
    if (directive === "1") return "standard";
    return directive as "none" | "standard" | "large";
  }
  if (value === "none" || value === "standard" || value === "large") {
    return value;
  }
  return "large";
}

/**
 * Extract description from schema data
 */
function extractDescriptionFromSchema(schema: WordPressYoastSEO["schema"]): string | null {
  if (!schema || !schema["@graph"]) return null;

  const webPage = schema["@graph"].find((item) => item["@type"] === "WebPage");
  if (webPage && webPage.description) {
    return webPage.description;
  }

  return null;
}

/**
 * Extract keywords from Yoast SEO data
 */
function extractKeywordsFromSchema(yoast: WordPressYoastSEO): string | null {
  if (yoast.meta_keywords && yoast.meta_keywords.trim()) {
    return yoast.meta_keywords.trim();
  }
  if (yoast.focuskw && yoast.focuskw.trim()) {
    return yoast.focuskw.trim();
  }
  if (yoast.schema && yoast.schema["@graph"]) {
    const webPage = yoast.schema["@graph"].find((item) => item["@type"] === "WebPage");
    if (webPage && webPage.name) {
      const fullTitle = webPage.name;
      const titleWords = webPage.name
        .toLowerCase()
        .split(/[\s\-_]+/)
        .filter((word) => word.length > 2)
        .join(", ");

      if (titleWords) {
        return `${fullTitle}, ${titleWords}`;
      }
    }
  }

  if (yoast.title) {
    const fullTitle = yoast.title;
    const titleWords = yoast.title
      .toLowerCase()
      .split(/[\s\-_]+/)
      .filter((word) => word.length > 2)
      .join(", ");

    if (titleWords) {
      return `${fullTitle}, ${titleWords}`;
    }
  }

  return null;
}

/**
 * Get default SEO data for pages without WordPress data
 */
export function getDefaultSEO(title: string, description?: string): SEOData {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.asbsk.ac.th";

  return {
    title: `${title} - American School Bangkok`,
    description:
      description || "American School Bangkok - Providing quality international education in Bangkok, Thailand.",
    keywords: "American School Bangkok, International School, Education, Bangkok, Thailand",
    canonical: baseUrl,
    robots: {
      index: true,
      follow: true,
      "max-snippet": "large",
      "max-image-preview": "large",
      "max-video-preview": "large",
    },
    openGraph: {
      title: `${title} - American School Bangkok`,
      description:
        description || "American School Bangkok - Providing quality international education in Bangkok, Thailand.",
      url: baseUrl,
      siteName: "American School Bangkok",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
