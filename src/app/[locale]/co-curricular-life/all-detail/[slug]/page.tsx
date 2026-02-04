import AllDetailDetail from "@/components/pages/co-curricular-life/all-detail/AllDetailDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchNewsGroup } from "@/server/fetches/news-group";
import { fetchPageSettings } from "@/server/fetches/page-settings";
import { fetchCoCurricularLifePage } from "@/server/fetches/pages/co-curricular-life";
import { fetchNews } from "@/server/fetches/pages/news";
import { fetchWordPressSEO } from "@/server/fetches/seo";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 3600; // 1 hour
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

    const title = seoData?.title || newsData.title || "Co-Curricular Activity - American School Bangkok";
    const description =
      seoData?.description ||
      newsData.description ||
      newsData.badge ||
      "Discover our co-curricular activities at American School Bangkok";

    return await generateSEOMetadata({
      locale,
      path: `co-curricular-life/all-detail/${slug}`,
      title,
      description,
    });
  } catch (error) {
    return await generateSEOMetadata({
      locale,
      path: `co-curricular-life/all-detail/${slug}`,
      title: "Co-Curricular Activity - American School Bangkok",
      description: "Discover our co-curricular activities at American School Bangkok",
    });
  }
}

export default async function Page({ params }: DetailPageProps) {
  const { locale, slug } = await params;

  const limit = 6;
  const category = "news-field-trips";
  const fieldTripsSlug = "field-trips";

  if (!slug) {
    redirect("/404");
  }

  try {
    // Fetch with automatic fallback to English if locale-specific content doesn't exist
    const [newsData, newsGroupData, mainNewsPageData, bannerSharedSection] = await Promise.all([
      fetchWithLocaleFallback(fetchNews, { slug, locale }),
      fetchWithLocaleFallback(fetchNewsGroup, { category, limit, locale }),
      fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: fieldTripsSlug, locale }),
      fetchWithLocaleFallback(fetchPageSettings, { locale }),
    ]);

    const otherSection = {
      otherLabel: mainNewsPageData.otherCarouselLabel ?? "",
      cardButtonLabel: mainNewsPageData.newsCardButtonLabel ?? "",
    };

    return (
      <AllDetailDetail
        data={newsData}
        newsGroupData={newsGroupData}
        otherSection={otherSection}
        bannerSharedSection={bannerSharedSection.pageSetting.newsSharedSetting}
      />
    );
  } catch (error) {
    redirect("/404");
  }
}
