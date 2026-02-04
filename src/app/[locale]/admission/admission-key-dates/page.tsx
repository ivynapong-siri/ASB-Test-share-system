import AdmissionKeyDatesDetails from "@/components/pages/admission/key-dates/AdmissionKeyDatesDetails";
import { fetchAdmissionPage } from "@/server/fetches/pages/admission";
import { PageProps } from "@/server/models/model-types";
import { redirect } from "next/navigation";

import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";

export const revalidate = 1800; // 30 minutes
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "admission/admission-key-dates",
    title: "Admission - Admission Key Dates - American School Bangkok",
    description: "Admission - Admission Key Dates - XCL Education",
    useWordPressSEO: true,
    pageSlug: "admission-key-dates",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const admissionKeyDateSlug = "admission-key-dates";

  try {
    const admissionKeyDateData = await fetchWithLocaleFallback(fetchAdmissionPage, {
      slug: admissionKeyDateSlug,
      locale,
    });

    if (!admissionKeyDateData) {
      redirect("/404");
    }
    return <AdmissionKeyDatesDetails data={admissionKeyDateData} />;
  } catch (error) {
    redirect("/404");
  }
}
