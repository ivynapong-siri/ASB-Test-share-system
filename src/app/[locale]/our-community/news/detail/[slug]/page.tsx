import NewsDetailDetails from "@/components/pages/our-community/news-datail/NewsDetailDetails";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchNewsGroup } from "@/server/fetches/news-group";
import { fetchPageSettings } from "@/server/fetches/page-settings";
import { fetchNews } from "@/server/fetches/pages/news";
import { fetchOurCommunityPage } from "@/server/fetches/pages/our-community";
import { fetchWordPressSEO } from "@/server/fetches/seo";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 900; // 15 minutes
export const dynamic = "force-static";

type DetailPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const newsData = await fetchWithLocaleFallback(fetchNews, { slug, locale });
    const seoData = await fetchWithLocaleFallback(({ slug, locale }) => fetchWordPressSEO(slug, locale), {
      slug,
      locale,
    });

    const title = seoData?.title || newsData.title || "News Detail - American School Bangkok";
    const description =
      seoData?.description ||
      newsData.description ||
      newsData.badge ||
      "Read the latest news from American School Bangkok";

    return await generateSEOMetadata({
      locale,
      path: `our-community/news/detail/${slug}`,
      title,
      description,
    });
  } catch (error) {
    return await generateSEOMetadata({
      locale,
      path: `our-community/news/detail/${slug}`,
      title: "News Detail - American School Bangkok",
      description: "Read the latest news from American School Bangkok",
    });
  }
}

export default async function NewsDetail({ params }: DetailPageProps) {
  const { slug, locale } = await params;

  const limit = 6;
  const newsSlug = "community-news";

  if (!slug) {
    redirect("/404");
  }

  try {
    // Fetch with automatic fallback to English if locale-specific content doesn't exist
    const [mainNewsPageData, newsData, newsGroupData, bannerSharedSection] = await Promise.all([
      fetchWithLocaleFallback(fetchOurCommunityPage, { slugOurCommunity: newsSlug, locale }),
      fetchWithLocaleFallback(fetchNews, { slug, locale }),
      fetchWithLocaleFallback(fetchNewsGroup, { limit, locale }),
      fetchWithLocaleFallback(fetchPageSettings, { locale }),
    ]);

    const otherSection = {
      otherLabel: mainNewsPageData.otherCarouselLabel ?? "",
      cardButtonLabel: mainNewsPageData.newsCardButtonLabel ?? "",
    };

    return (
      <NewsDetailDetails
        otherSection={otherSection}
        data={newsData}
        newsGroupData={newsGroupData}
        bannerSharedSection={bannerSharedSection.pageSetting.newsSharedSetting}
      />
    );
  } catch (error) {
    redirect("/404");
  }
}
