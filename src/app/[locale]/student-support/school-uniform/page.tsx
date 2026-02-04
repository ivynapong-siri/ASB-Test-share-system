import SchoolUniformDetail from "@/components/pages/student-support/school-uniform/SchoolUniformDetails";
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
    path: "student-support/school-uniform",
    title: "Student Support - School Uniform - American School Bangkok",
    description: "Student Support - School Uniform - XCL Education",
    useWordPressSEO: true,
    pageSlug: "school-uniform",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const schoolUniformSlug = "school-uniform";

  try {
    const schoolUniformData = await fetchWithLocaleFallback(fetchStudentSupportPage, {
      slug: schoolUniformSlug,
      locale,
    });

    if (!schoolUniformData) {
      redirect("/404");
    }

    return <SchoolUniformDetail data={schoolUniformData} />;
  } catch (error) {
    redirect("/404");
  }
}
