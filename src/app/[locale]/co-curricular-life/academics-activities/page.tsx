import AcademicActivitiesDetail from "@/components/pages/co-curricular-life/academics-activities/AcademicsActivitiesDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchCoCurricularLifePage } from "@/server/fetches/pages/co-curricular-life";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 1800; // 30 minutes
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "co-curricular-life/academics-activities",
    title: "Co Curricular Life - Academics Activities - American School Bangkok",
    description: "Co Curricular Life - Academics Activities - XCL Education",
    useWordPressSEO: true,
    pageSlug: "academics-activities",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const academicsActivitiesSlug = "academics-activities";

  try {
    const academicsActivitiesData = await fetchWithLocaleFallback(fetchCoCurricularLifePage, {
      slug: academicsActivitiesSlug,
      locale,
    });

    if (!academicsActivitiesData) {
      redirect("/404");
    }

    return <AcademicActivitiesDetail data={academicsActivitiesData} />;
  } catch (error) {
    redirect("/404");
  }
}
