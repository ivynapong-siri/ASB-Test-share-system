import EarlyYearsProgramDetails from "@/components/pages/curriculum/early-years-program/EarlyYearsProgramDetail";
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
    path: "curriculum/early-years-program",
    title: "Curriculum - Early Years Program - American School Bangkok",
    description: "Curriculum - Early Years Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "early-years-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const earlyYearProgramSlug = "early-years-program";

  try {
    const earlyYearProgramData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: earlyYearProgramSlug,
      locale,
    });

    if (!earlyYearProgramData) {
      redirect("/404");
    }

    return <EarlyYearsProgramDetails data={earlyYearProgramData} />;
  } catch (error) {
    redirect("/404");
  }
}
