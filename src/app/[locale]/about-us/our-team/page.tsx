import OurTeamDetail from "@/components/pages/about-us/our-team/OurTeamDetail";
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
    path: "about-us/our-team",
    title: "About Us - Our Team - American School Bangkok",
    description: "About Us - Our Team - XCL Education",
    useWordPressSEO: true,
    pageSlug: "our-team",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;

  try {
    const data = await fetchWithLocaleFallback(fetchAboutUsPage, { slugAboutUs: "our-team", locale });

    if (!data) {
      redirect("/404");
    }
    return <OurTeamDetail data={data} />;
  } catch (error) {
    redirect("/404");
  }
}
