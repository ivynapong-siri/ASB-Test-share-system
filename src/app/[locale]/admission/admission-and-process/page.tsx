import AdmissionAndProcessDetail from "@/components/pages/admission/admission-process/AdmissionAndProcessDetail";
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
    path: "admission/admission-and-process",
    title: "Admission - Admission And Process - American School Bangkok",
    description: "Admission - Admission And Process - XCL Education",
    useWordPressSEO: true,
    pageSlug: "admission-and-process",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const admissionProcessSlug = "admission-and-process";

  try {
    // Fetch with automatic fallback to English if locale-specific content doesn't exist
    const admissionProcessData = await fetchWithLocaleFallback(fetchAdmissionPage, {
      slug: admissionProcessSlug,
      locale,
    });

    if (!admissionProcessData) {
      redirect("/404");
    }

    return <AdmissionAndProcessDetail data={admissionProcessData} />;
  } catch (error) {
    redirect("/404");
  }
}
