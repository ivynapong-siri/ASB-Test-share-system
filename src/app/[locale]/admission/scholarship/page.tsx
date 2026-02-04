import ScholarshipDetail from "@/components/pages/admission/scholarship/ScholarshipDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchAdmissionPage } from "@/server/fetches/pages/admission";
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
    path: "admission/scholarship",
    title: "Admission - Scholarship - American School Bangkok",
    description: "Admission - Scholarship - XCL Education",
    useWordPressSEO: true,
    pageSlug: "scholarship",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const scholarshipSlug = "scholarship";

  try {
    const scholarshipData = await fetchWithLocaleFallback(fetchAdmissionPage, { slug: scholarshipSlug, locale });

    if (!scholarshipData) {
      redirect("/404");
    }

    return <ScholarshipDetail data={scholarshipData} />;
  } catch (error) {
    redirect("/404");
  }
}
