import HeadOfSchoolDetail from "@/components/pages/about-us/head-of-school/HeadOfSchoolDetail";
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
    path: "about-us/head-of-school",
    title: "About Us - Head Of School - American School Bangkok",
    description: "About Us - Head Of School - XCL Education",
    useWordPressSEO: true,
    pageSlug: "head-of-schools-welcome",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const headOfSchoolsPage = "head-of-schools-welcome";

  try {
    const headOfSchoolsPageData = await fetchWithLocaleFallback(fetchAboutUsPage, {
      slugAboutUs: headOfSchoolsPage,
      locale,
    });

    if (!headOfSchoolsPageData) {
      redirect("/404");
    }

    return <HeadOfSchoolDetail data={headOfSchoolsPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
