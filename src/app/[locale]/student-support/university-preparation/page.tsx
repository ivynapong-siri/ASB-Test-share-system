import UniversityPreparationDetails from "@/components/pages/student-support/university-preparation/UniversityPreparationDetails";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchStudentSupportPage } from "@/server/fetches/pages/student-support";
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
    path: "student-support/university-preparation",
    title: "Student Support - University Preparation - American School Bangkok",
    description: "Student Support - University Preparation - XCL Education",
    useWordPressSEO: true,
    pageSlug: "university-preparation",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const universityPreparationSlug = "university-preparation";

  try {
    const universityPreparationData = await fetchWithLocaleFallback(fetchStudentSupportPage, {
      slug: universityPreparationSlug,
      locale,
    });

    if (!universityPreparationData) {
      redirect("/404");
    }

    return <UniversityPreparationDetails data={universityPreparationData} />;
  } catch (error) {
    redirect("/404");
  }
}
