import AdvancedPlacementDetail from "@/components/pages/curriculum/advanced-placement/AdvancedPlacementDetail";
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
    path: "curriculum/high-school-program/advanced-placement",
    title: "Curriculum - High School Program - Advanced Placement - American School Bangkok",
    description: "Curriculum - High School Program - Advanced Placement - XCL Education",
    useWordPressSEO: true,
    pageSlug: "advanced-placement",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const advancedPlacementSlug = "advanced-placement";

  try {
    const advancedPlacementData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: advancedPlacementSlug,
      locale,
    });

    if (!advancedPlacementData) {
      redirect("/404");
    }

    return <AdvancedPlacementDetail data={advancedPlacementData} />;
  } catch (error) {
    redirect("/404");
  }
}
