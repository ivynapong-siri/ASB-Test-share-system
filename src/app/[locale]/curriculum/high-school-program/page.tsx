import HighSchoolProgramDetail from "@/components/pages/curriculum/high-school-program/HighSchoolProgramDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchCurriculumPage } from "@/server/fetches/pages/curriculum";
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
    path: "curriculum/high-school-program",
    title: "Curriculum - High School Program - American School Bangkok",
    description: "Curriculum - High School Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "high-school-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const highSchoolProgramSlug = "high-school-program";

  try {
    const highSchoolProgramData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: highSchoolProgramSlug,
      locale,
    });

    if (!highSchoolProgramData) {
      redirect("/404");
    }

    return <HighSchoolProgramDetail data={highSchoolProgramData} />;
  } catch (error) {
    redirect("/404");
  }
}
