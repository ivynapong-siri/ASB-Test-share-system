import VisionAndMissionDetail from "@/components/pages/about-us/vision-and-mission/VisionAndMissionDetail";
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
    path: "about-us/vision-and-mission",
    title: "About Us - Vision And Mission - American School Bangkok",
    description: "About Us - Vision And Mission - XCL Education",
    useWordPressSEO: true,
    pageSlug: "vision-and-mission",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;

  try {
    const visionAndMissionData = await fetchWithLocaleFallback(fetchAboutUsPage, {
      slugAboutUs: "vision-and-mission",
      locale,
    });

    if (!visionAndMissionData) {
      redirect("/404");
    }
    return <VisionAndMissionDetail visionAndMissionData={visionAndMissionData} />;
  } catch (error) {
    redirect("/404");
  }
}
