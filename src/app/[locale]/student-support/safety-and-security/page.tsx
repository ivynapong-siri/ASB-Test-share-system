import SafetyAndSecurityDetails from "@/components/pages/student-support/safety-security/SafetyAndSecurityDetails";
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
    path: "student-support/safety-and-security",
    title: "Student Support - Safety And Security - American School Bangkok",
    description: "Student Support - Safety And Security - XCL Education",
    useWordPressSEO: true,
    pageSlug: "safety-and-security",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const safetyAndSecuritySlug = "safety-and-security";

  try {
    const safetyAndSecurityData = await fetchWithLocaleFallback(fetchStudentSupportPage, {
      slug: safetyAndSecuritySlug,
      locale,
    });

    if (!safetyAndSecurityData) {
      redirect("/404");
    }

    return <SafetyAndSecurityDetails data={safetyAndSecurityData} />;
  } catch (error) {
    redirect("/404");
  }
}
