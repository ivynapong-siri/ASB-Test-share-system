import SchoolFacilitiesDetail from "@/components/pages/about-us/school-facilities/SchoolFacilitiesDetail";
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
    path: "about-us/school-facilities",
    title: "About Us - School Facilities - American School Bangkok",
    description: "About Us - School Facilities - XCL Education",
    useWordPressSEO: true,
    pageSlug: "school-facilities",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;

  try {
    const schoolFacilitiesData = await fetchWithLocaleFallback(fetchAboutUsPage, {
      slugAboutUs: "school-facilities",
      locale,
    });

    if (!schoolFacilitiesData) {
      redirect("/404");
    }
    return <SchoolFacilitiesDetail schoolFacilitiesData={schoolFacilitiesData} />;
  } catch (error) {
    redirect("/404");
  }
}
