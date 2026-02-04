import WorkWithUsDetail from "@/components/pages/our-community/work-with-us/WorkWithUsDetails";
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
    path: "our-community/work-with-us",
    title: "Our Community - Work With Us - American School Bangkok",
    description: "Our Community - Work With Us - XCL Education",
    useWordPressSEO: true,
    pageSlug: "work-with-us",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const workWithUsSlug = "work-with-us";

  try {
    const workWithUsData = await fetchWithLocaleFallback(fetchOurCommunityPage, {
      slugOurCommunity: workWithUsSlug,
      locale,
    });

    if (!workWithUsData) {
      redirect("/404");
    }

    return <WorkWithUsDetail data={workWithUsData} />;
  } catch (error) {
    redirect("/404");
  }
}
