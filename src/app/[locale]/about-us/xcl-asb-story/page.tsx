import XCLASBStoryDetail from "@/components/pages/about-us/xcl-asb-story/XCLASBStoryDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchAboutUsPage } from "@/server/fetches/pages/about-us";
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
    path: "about-us/xcl-asb-story",
    title: "About Us - Xcl Asb Story - American School Bangkok",
    description: "About Us - Xcl Asb Story - XCL Education",
    useWordPressSEO: true,
    pageSlug: "about-us",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const landingPage = "about-us";

  try {
    const landingPageData = await fetchWithLocaleFallback(fetchAboutUsPage, { slugAboutUs: landingPage, locale });

    if (!landingPageData) {
      redirect("/404");
    }
    return <XCLASBStoryDetail data={landingPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
