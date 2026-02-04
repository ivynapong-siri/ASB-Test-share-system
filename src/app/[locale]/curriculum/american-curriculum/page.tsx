import AmericanDetail from "@/components/pages/curriculum/american-curriculum/AmericanDetail";
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
    path: "curriculum/american-curriculum",
    title: "Curriculum - American Curriculum - American School Bangkok",
    description: "Curriculum - American Curriculum - XCL Education",
    useWordPressSEO: true,
    pageSlug: "american-curriculum",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const americanCurriculumSlug = "american-curriculum";

  try {
    const americanCurriculumData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: americanCurriculumSlug,
      locale,
    });

    if (!americanCurriculumData) {
      redirect("/404");
    }

    return <AmericanDetail data={americanCurriculumData} />;
  } catch (error) {
    redirect("/404");
  }
}
