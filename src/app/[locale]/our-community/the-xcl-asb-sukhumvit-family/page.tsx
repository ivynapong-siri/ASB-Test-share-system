import FamilyDetail from "@/components/pages/our-community/the-xcl-asb-family/FamilyDetail";
import { Metadata } from "next";
import { PageProps } from "@/server/models/model-types";
import { fetchNewsGroup } from "@/server/fetches/news-group";
import { fetchOurCommunityPage } from "@/server/fetches/pages/our-community";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { generateSEOMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "our-community/the-xcl-asb-sukhumvit-family",
    title: "Our Community - The Xcl Asb Sukhumvit Family - American School Bangkok",
    description: "Our Community - The Xcl Asb Sukhumvit Family - XCL Education",
    useWordPressSEO: true,
    pageSlug: "the-xcl-asb-sukhumvit-family",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const familySlug = "the-xcl-asb-sukhumvit-family";
  const limit = 12;

  const [familyData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchOurCommunityPage, {
      slugOurCommunity: familySlug,
      locale,
    }),
    fetchWithLocaleFallback(fetchNewsGroup, { limit, locale }),
  ]);

  if (!familyData) {
    redirect("/404");
  }

  return <FamilyDetail data={familyData} newsGroupData={newsGroupData} />;
}
