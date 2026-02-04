import SchoolBusServiceDetails from "@/components/pages/student-support/school-bus-service/SchoolBusServiceDetails";
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
    path: "student-support/school-bus-service",
    title: "Student Support - School Bus Service - American School Bangkok",
    description: "Student Support - School Bus Service - XCL Education",
    useWordPressSEO: true,
    pageSlug: "school-bus-service",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const schoolBusServiceSlug = "school-bus-service";

  try {
    const schoolBusServiceData = await fetchWithLocaleFallback(fetchStudentSupportPage, {
      slug: schoolBusServiceSlug,
      locale,
    });

    if (!schoolBusServiceData) {
      redirect("/404");
    }

    return <SchoolBusServiceDetails data={schoolBusServiceData} />;
  } catch (error) {
    redirect("/404");
  }
}
