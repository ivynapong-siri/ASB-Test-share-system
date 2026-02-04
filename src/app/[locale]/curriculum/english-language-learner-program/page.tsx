import EnglishLanguageLearnerProgramDetail from "@/components/pages/curriculum/english-language-learner-program/EnglishLanguageLearnerProgramDetail";
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
    path: "curriculum/english-language-learner-program",
    title: "Curriculum - English Language Learner Program - American School Bangkok",
    description: "Curriculum - English Language Learner Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "english-language-learner-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const englishLanguageLearnerProgramSlug = "english-language-learner-program";

  try {
    const englishLanguageLearnerProgramData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: englishLanguageLearnerProgramSlug,
      locale,
    });

    if (!englishLanguageLearnerProgramData) {
      redirect("/404");
    }

    return <EnglishLanguageLearnerProgramDetail data={englishLanguageLearnerProgramData} />;
  } catch (error) {
    redirect("/404");
  }
}
