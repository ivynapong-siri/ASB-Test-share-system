import OurNewDetail from "@/components/pages/our-community/news/OurNewsDetail";
import { fetchNewsGroup } from "@/server/fetches/news-group";
import { fetchOurCommunityPage } from "@/server/fetches/pages/our-community";
import { PageProps } from "@/server/models/model-types";
import { redirect } from "next/navigation";

import { generateSEOMetadata } from "@/lib/seo";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";

export const revalidate = 900; // 15 minutes
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "our-community/news",
    title: "Our Community - News - American School Bangkok",
    description: "Our Community - News - XCL Education",
    useWordPressSEO: true,
    pageSlug: "community-news",
  });
}

export default async function page(props: {
  params: PageProps & Promise<{ news_type: string; category: string; limit: number }>;
}) {
  const { locale, category, limit, news_type } = await props.params;

  const newsSlug = "community-news";
  const [newsData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchOurCommunityPage, {
      slugOurCommunity: newsSlug,
      locale,
    }),
    fetchWithLocaleFallback(fetchNewsGroup, { category, limit, news_type, locale }),
  ]);

  if (!newsData || !newsGroupData) {
    redirect("/404");
  }

  return <OurNewDetail mainData={newsData} newsGroupData={newsGroupData} />;
}
