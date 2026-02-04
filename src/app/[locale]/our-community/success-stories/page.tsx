import SuccessStoriesDetail from "@/components/pages/our-community/success-stories/SuccessStoriesDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchOurCommunityPage } from "@/server/fetches/pages/our-community";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "our-community/success-stories",
    title: "Our Community - Success Stories - American School Bangkok",
    description: "Our Community - Success Stories - XCL Education",
    useWordPressSEO: true,
    pageSlug: "success-stories",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const successStoriesSlug = "success-stories";

  try {
    const successStoriesData = await fetchWithLocaleFallback(fetchOurCommunityPage, {
      slugOurCommunity: successStoriesSlug,
      locale,
    });

    if (!successStoriesData) {
      redirect("/404");
    }

    return <SuccessStoriesDetail data={successStoriesData} />;
  } catch (error) {
    redirect("/404");
  }
}
