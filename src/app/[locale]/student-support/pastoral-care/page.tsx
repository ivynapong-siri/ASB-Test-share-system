import PastoralCareDetails from "@/components/pages/student-support/pastoral-care/PastoralCareDetails";
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
    path: "student-support/pastoral-care",
    title: "Student Support - Pastoral Care - American School Bangkok",
    description: "Student Support - Pastoral Care - XCL Education",
    useWordPressSEO: true,
    pageSlug: "pastoral-care",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const pastoralCareSlug = "pastoral-care";

  try {
    const pastoralCareData = await fetchWithLocaleFallback(fetchStudentSupportPage, { slug: pastoralCareSlug, locale });

    if (!pastoralCareData) {
      redirect("/404");
    }

    return <PastoralCareDetails data={pastoralCareData} />;
  } catch (error) {
    redirect("/404");
  }
}
