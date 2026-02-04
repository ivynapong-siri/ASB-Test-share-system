import XCLEducationDetail from "@/components/pages/about-us/xcl-education/XCLEducationDetail";
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
    path: "about-us/xcl-education",
    title: "About Us - Xcl Education - American School Bangkok",
    description: "About Us - Xcl Education - XCL Education",
    useWordPressSEO: true,
    pageSlug: "xcl-education",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const educationPage = "xcl-education";

  try {
    const educationPageData = await fetchWithLocaleFallback(fetchAboutUsPage, {
      slugAboutUs: educationPage,
      locale,
    });

    if (!educationPageData) {
      redirect("/404");
    }
    return <XCLEducationDetail data={educationPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
