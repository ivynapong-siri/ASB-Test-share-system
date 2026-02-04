import MiddleSchoolProgramDetail from "@/components/pages/curriculum/middle-school-program/MiddleSchoolProgramDetail";
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
    path: "curriculum/middle-school-program",
    title: "Curriculum - Middle School Program - American School Bangkok",
    description: "Curriculum - Middle School Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "middle-school-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const middleSchoolProgramSlug = "middle-school-program";

  try {
    const middleSchoolProgramData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: middleSchoolProgramSlug,
      locale,
    });

    if (!middleSchoolProgramData) {
      redirect("/404");
    }
    return <MiddleSchoolProgramDetail data={middleSchoolProgramData} />;
  } catch (error) {
    redirect("/404");
  }
}
