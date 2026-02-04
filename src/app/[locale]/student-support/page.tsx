import StudentSupportDetail from "@/components/pages/student-support/support/StudentSupportDetail";
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
    path: "student-support",
    title: "Student Support - American School Bangkok",
    description: "Student Support - XCL Education",
    useWordPressSEO: true,
    pageSlug: "student-support",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const studentSupportSlug = "student-support";

  try {
    const studentSupportData = await fetchWithLocaleFallback(fetchStudentSupportPage, {
      slug: studentSupportSlug,
      locale,
    });

    if (!studentSupportData) {
      redirect("/404");
    }

    return <StudentSupportDetail data={studentSupportData} />;
  } catch (error) {
    redirect("/404");
  }
}
