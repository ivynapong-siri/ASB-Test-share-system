import ProjectBasedDetail from "@/components/pages/curriculum/project-based-learning-activities/ProjectBasedDetail";
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
    path: "curriculum/project-based-learning-activities",
    title: "Curriculum - Project Based Learning Activities - American School Bangkok",
    description: "Curriculum - Project Based Learning Activities - XCL Education",
    useWordPressSEO: true,
    pageSlug: "project-based-learning-activities",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const projectBasedLearningActivitiesSlug = "project-based-learning-activities";

  try {
    const projectBasedLearningActivitiesData = await fetchWithLocaleFallback(fetchCurriculumPage, {
      slugCurriculum: projectBasedLearningActivitiesSlug,
      locale,
    });

    if (!projectBasedLearningActivitiesData) {
      redirect("/404");
    }

    return <ProjectBasedDetail data={projectBasedLearningActivitiesData} />;
  } catch (error) {
    redirect("/404");
  }
}
