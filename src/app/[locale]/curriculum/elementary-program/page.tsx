import ElementaryProgramDetails from "@/components/pages/curriculum/elementary-program/ElementaryProgramDetail";
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
    path: "curriculum/elementary-program",
    title: "Curriculum - Elementary Program - American School Bangkok",
    description: "Curriculum - Elementary Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "elementary-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const elementaryProgramSlug = "elementary-program";

  try {
    const elementaryProgramData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: elementaryProgramSlug,
      locale,
    });

    if (!elementaryProgramData) {
      redirect("/404");
    }

    return <ElementaryProgramDetails data={elementaryProgramData} />;
  } catch (error) {
    redirect("/404");
  }
}
